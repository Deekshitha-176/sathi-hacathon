import logging
from typing import Optional, List
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Query
from ..schemas.report import ExtractionResponse, ReportExplanation
from ..services.extractor import extract_document_text
from ..services.gemini_service import explain_report_with_gemini
from ..services.supabase_client import save_report_to_history, get_user_reports

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/reports", tags=["reports"])

SAMPLE_REPORTS = [
    {
        "id": "cbc",
        "title": "Complete Blood Count (CBC) with Differential",
        "description": "Standard routine blood panel checking red blood cells, white blood cells, and platelets.",
        "text": """METROPOLIS DIAGNOSTIC HEALTHCARE
PATIENT LAB REPORT: John Doe | Age: 36 | Gender: Male
Date of Collection: 12-Nov-2026 | Ref By: Dr. A. Sharma

TEST NAME                      RESULT   UNIT        REFERENCE INTERVAL   STATUS
---------------------------------------------------------------------------------
Hemoglobin (Hb)                13.4     g/dL        13.0 - 17.0          NORMAL
RBC Count                      4.82     mil/cumm    4.50 - 5.50          NORMAL
Packed Cell Volume (PCV/HCT)   41.0     %           40.0 - 50.0          NORMAL
Mean Corpuscular Volume (MCV)  85.0     fL          80.0 - 100.0         NORMAL
Total Leukocyte Count (WBC)    6,800    /cumm       4,000 - 11,000       NORMAL
Neutrophils                    58       %           40 - 75              NORMAL
Lymphocytes                    32       %           20 - 45              NORMAL
Monocytes                      6        %           2 - 10               NORMAL
Eosinophils                    4        %           1 - 6                NORMAL
Platelet Count                 225,000  /cumm       150,000 - 450,000    NORMAL
Erythrocyte Sedimentation (ESR)12       mm/hr       0 - 15               NORMAL
"""
    },
    {
        "id": "lipid",
        "title": "Comprehensive Lipid & Cholesterol Panel",
        "description": "Fasting lipid profile assessing cardiovascular risk markers.",
        "text": """APEX PATHOLOGY LABORATORIES
PATIENT REPORT: Sarah Miller | Age: 48 | Gender: Female
Sample Type: Serum | Fasting Status: 12 Hours Fasting

TEST NAME                      RESULT   UNIT        DESIRABLE RANGE      INTERPRETATION
---------------------------------------------------------------------------------------
Total Cholesterol              224      mg/dL       < 200                BORDERLINE HIGH
Triglycerides                  168      mg/dL       < 150                BORDERLINE HIGH
HDL Cholesterol (Good)         48       mg/dL       > 50                 SLIGHTLY LOW
LDL Cholesterol (Bad)          142      mg/dL       < 100                ELEVATED
VLDL Cholesterol               34       mg/dL       < 30                 SLIGHTLY HIGH
Total Chol / HDL Ratio         4.66     ratio       < 4.5                ELEVATED
Non-HDL Cholesterol            176      mg/dL       < 130                ELEVATED
"""
    },
    {
        "id": "metabolic",
        "title": "Comprehensive Metabolic & Kidney Panel",
        "description": "Evaluation of blood glucose, electrolytes, and kidney filtration.",
        "text": """GLOBAL DIAGNOSTICS & RESEARCH CENTER
PATIENT: Robert Chen | Age: 54 | Gender: Male

TEST PARAMETER                 VALUE    UNIT        NORMAL INTERVAL      FLAG
--------------------------------------------------------------------------------
Fasting Blood Sugar (Glucose)  114      mg/dL       70 - 99              HIGH (IMPAIRED FASTING)
Blood Urea Nitrogen (BUN)      18       mg/dL       7 - 20               NORMAL
Serum Creatinine               1.02     mg/dL       0.70 - 1.30          NORMAL
eGFR (CKD-EPI)                 88       mL/min/1.73 > 60                 NORMAL
Serum Sodium                   141      mEq/L       135 - 145            NORMAL
Serum Potassium                4.3      mEq/L       3.5 - 5.1            NORMAL
Serum Chloride                 102      mEq/L       96 - 106             NORMAL
Serum Calcium                  9.4      mg/dL       8.6 - 10.2           NORMAL
Total Bilirubin                0.8      mg/dL       0.2 - 1.2            NORMAL
"""
    }
]

@router.get("/samples")
async def get_sample_reports():
    """Return catalog of instant test sample lab reports."""
    return [
        {"id": s["id"], "title": s["title"], "description": s["description"]}
        for s in SAMPLE_REPORTS
    ]

@router.get("/samples/{sample_id}")
async def get_single_sample(sample_id: str):
    """Retrieve full text of a specific sample report."""
    for s in SAMPLE_REPORTS:
        if s["id"] == sample_id:
            return s
    raise HTTPException(status_code=404, detail="Sample report not found")

@router.post("/extract", response_model=ExtractionResponse)
async def extract_report(file: UploadFile = File(...)):
    """
    Upload a PDF or image report to extract text via native PDF parsing or Tesseract OCR.
    """
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        
        result = extract_document_text(file.filename or "unknown.pdf", content)
        
        return ExtractionResponse(
            success=True,
            filename=file.filename or "document",
            method=result["method"],
            page_count=result["page_count"],
            char_count=result["char_count"],
            extracted_text=result["text"],
            preview=result["preview"]
        )
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Failed to extract report: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

@router.post("/analyze", response_model=ReportExplanation)
async def analyze_report(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    user_id: Optional[str] = Form(None)
):
    """
    Analyze lab report text (either provided directly or extracted from an uploaded PDF/image)
    and return an educational, plain-language patient explanation.
    """
    text_to_process = ""

    if file and file.filename:
        content = await file.read()
        if content:
            extracted = extract_document_text(file.filename, content)
            text_to_process = extracted["text"]
    elif raw_text and raw_text.strip():
        text_to_process = raw_text.strip()

    if not text_to_process:
        raise HTTPException(
            status_code=400,
            detail="Please provide a valid document file (PDF, PNG, JPG) or enter report text to analyze."
        )

    # Send to Gemini or fallback generator
    explanation = await explain_report_with_gemini(text_to_process)

    # If Supabase is configured and user_id is provided, optionally save record
    try:
        if user_id:
            save_report_to_history(user_id, explanation.model_dump())
    except Exception as e:
        logger.warning(f"Could not save to history: {e}")

    return explanation

@router.get("/history")
async def get_history(user_id: str = Query(..., description="User ID to retrieve history for")):
    """Get previously analyzed reports for a user if Supabase is active."""
    return get_user_reports(user_id)
