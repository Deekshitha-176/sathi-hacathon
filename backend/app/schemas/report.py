from typing import List, Optional, Literal
from pydantic import BaseModel, Field

FlagType = Literal["normal", "low", "high", "abnormal", "critical"]

class TestItem(BaseModel):
    name: str = Field(description="Name of the medical test or biomarker, e.g. 'Hemoglobin', 'LDL Cholesterol'")
    value: str = Field(description="Reported value, formatted as string to preserve precision/units")
    unit: Optional[str] = Field(default=None, description="Measurement unit, e.g. 'g/dL', 'mg/dL'")
    reference_range: Optional[str] = Field(default=None, description="Normal reference interval, e.g. '13.8 - 17.2'")
    flag: FlagType = Field(default="normal", description="Flag indicating if the value is normal, low, high, etc.")
    simple_explanation: str = Field(description="1-2 sentences explaining what this biomarker does and what this result means in simple terms")

class ReportExplanation(BaseModel):
    report_title: str = Field(description="Title or inferred test category, e.g. 'Complete Blood Count (CBC)'")
    patient_summary: str = Field(description="Plain-English, compassionate summary of the overall report (2-4 sentences)")
    key_takeaways: List[str] = Field(default_factory=list, description="Top 3-4 bullet points summarizing overall status")
    tests: List[TestItem] = Field(default_factory=list, description="Structured list of tests found in the report")
    lifestyle_and_wellness: List[str] = Field(default_factory=list, description="General, non-prescriptive lifestyle tips (e.g. hydration, balanced meals)")
    questions_for_doctor: List[str] = Field(default_factory=list, description="3-5 recommended questions for the patient to ask their physician")
    disclaimer: str = Field(
        default="Disclaimer: ReportSaathi is an educational and information tool designed to help you understand medical terminology. It does NOT provide medical advice, diagnosis, or treatment recommendations. Always consult a qualified healthcare professional with any questions regarding your medical condition or lab results.",
        description="Mandatory educational and medical disclaimer"
    )
    raw_text_preview: Optional[str] = Field(default=None, description="Truncated preview of the extracted raw text")

class ExtractionResponse(BaseModel):
    success: bool
    filename: str
    method: str
    page_count: int
    char_count: int
    extracted_text: str
    preview: str
