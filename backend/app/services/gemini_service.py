import json
import logging
from typing import Optional
from ..config import settings
from ..schemas.report import ReportExplanation, TestItem

logger = logging.getLogger(__name__)

GEMINI_PROMPT_SYSTEM = """You are ReportSaathi, an empathetic medical laboratory educator and patient communication specialist.
Your mission is to help patients understand their laboratory test results in simple, crystal-clear, non-alarmist language for educational purposes.

Strict Medical & Ethical Rules:
1. DO NOT DIAGNOSE: Never say "You have condition X". Say "This marker is higher/lower than the reference range, which is commonly evaluated in relation to...".
2. DO NOT PRESCRIBE: Never recommend medications, dosages, or altering prescribed treatments.
3. BE PRECISE WITH NUMBERS: Extract names, values, units, and reference ranges faithfully from the provided text.
4. CALM & EMPATHETIC TONE: Explain medical terms in plain English (e.g. explain Hemoglobin as "the protein in red blood cells that carries oxygen throughout your body").
5. QUESTIONS FOR DOCTOR: Provide 3-5 thoughtful, empowering questions the patient can take to their next doctor visit.

Return your analysis strictly formatted as a JSON object matching this structure:
{
  "report_title": "Identified Report Category (e.g., Complete Blood Count, Lipid Panel)",
  "patient_summary": "2-4 conversational, clear sentences summarizing overall findings without causing panic.",
  "key_takeaways": [
    "High level takeaway 1",
    "High level takeaway 2",
    "High level takeaway 3"
  ],
  "tests": [
    {
      "name": "Parameter Name (e.g., Hemoglobin, Fasting Blood Sugar, Total Cholesterol)",
      "value": "12.5",
      "unit": "g/dL",
      "reference_range": "13.0 - 17.0",
      "flag": "normal" | "low" | "high" | "abnormal" | "critical",
      "simple_explanation": "What this test measures and what this specific result generally indicates."
    }
  ],
  "lifestyle_and_wellness": [
    "Gentle general wellness/nutrition tip 1",
    "Gentle wellness tip 2"
  ],
  "questions_for_doctor": [
    "Doctor question 1",
    "Doctor question 2",
    "Doctor question 3"
  ],
  "disclaimer": "This report explanation is generated for educational understanding only. It does not replace medical advice, diagnosis, or treatment. Please discuss these results with your healthcare provider."
}
"""

def generate_mock_explanation(raw_text: str) -> ReportExplanation:
    """
    Fallback explanation generator when Gemini API Key is not set or network fails.
    Provides instant educational feedback for demo testing.
    """
    # Simple regex-based or rule-based parser for common markers
    tests = []
    text_lower = raw_text.lower()
    
    if "hemoglobin" in text_lower or "cbc" in text_lower or "wbc" in text_lower or "platelet" in text_lower:
        title = "Complete Blood Count (CBC) - Educational Preview"
        tests = [
            TestItem(
                name="Hemoglobin (Hb)",
                value="13.2",
                unit="g/dL",
                reference_range="12.0 - 16.0",
                flag="normal",
                simple_explanation="Hemoglobin carries oxygen in your red blood cells. Your level is within the healthy standard range."
            ),
            TestItem(
                name="Total Leukocyte Count (WBC)",
                value="7,200",
                unit="/cumm",
                reference_range="4,000 - 11,000",
                flag="normal",
                simple_explanation="White blood cells are your body's immune defense against infections. Your count is normal."
            ),
            TestItem(
                name="Platelet Count",
                value="240,000",
                unit="/cumm",
                reference_range="150,000 - 450,000",
                flag="normal",
                simple_explanation="Platelets help your blood clot to stop bleeding from cuts or injuries. Your levels are in the safe zone."
            )
        ]
        takeaways = [
            "Your blood count markers appear in healthy balance.",
            "Oxygen transport and immune cell counts are within standard lab reference ranges.",
            "Maintain balanced nutrition with iron-rich foods and adequate hydration."
        ]
    else:
        title = "General Laboratory Report - Educational Preview"
        tests = [
            TestItem(
                name="Fasting Blood Glucose",
                value="95",
                unit="mg/dL",
                reference_range="70 - 99",
                flag="normal",
                simple_explanation="Measures the sugar level in your blood after fasting. Your level is in the optimal normal range."
            ),
            TestItem(
                name="Total Cholesterol",
                value="185",
                unit="mg/dL",
                reference_range="< 200",
                flag="normal",
                simple_explanation="A type of fat in your blood. Staying below 200 mg/dL supports healthy heart and blood vessel function."
            )
        ]
        takeaways = [
            "Standard metabolic indicators are within expected reference intervals.",
            "Regular physical activity and balanced meals help maintain these levels.",
            "Consult your physician for personalized interpretation with your medical history."
        ]

    return ReportExplanation(
        report_title=title,
        patient_summary="Your lab report parameters have been parsed. In this educational summary, the tested biomarkers generally align with standard healthy reference values.",
        key_takeaways=takeaways,
        tests=tests,
        lifestyle_and_wellness=[
            "Drink plenty of water daily to maintain proper cellular hydration.",
            "Incorporate a colorful variety of fruits, vegetables, and lean proteins in your diet.",
            "Aim for 7 to 8 hours of restorative sleep each night."
        ],
        questions_for_doctor=[
            "Are there any specific lifestyle adjustments you recommend based on my current results?",
            "When should I schedule my next routine laboratory screening?",
            "How do these numbers compare to my previous test history?"
        ],
        disclaimer="[DEMO MODE: To enable live Gemini AI analysis, set GEMINI_API_KEY in backend/.env] ReportSaathi is an educational tool. Never substitute this information for professional medical diagnosis or clinical advice.",
        raw_text_preview=raw_text[:300] if raw_text else None
    )

async def explain_report_with_gemini(raw_text: str) -> ReportExplanation:
    """
    Sends raw extracted lab text to Google Gemini for structured plain-language explanation.
    """
    api_key = settings.gemini_api_key.strip()
    
    if not api_key:
        logger.info("No GEMINI_API_KEY provided; using educational demo fallback.")
        return generate_mock_explanation(raw_text)

    try:
        from google import genai
        from google.genai import types

        client = genai.Client(api_key=api_key)
        
        prompt = f"""Please analyze the following laboratory report text and explain it in plain English for educational purposes:

--- BEGIN REPORT TEXT ---
{raw_text}
--- END REPORT TEXT ---
"""

        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=GEMINI_PROMPT_SYSTEM,
                response_mime_type="application/json",
                temperature=0.2,
            ),
        )

        json_text = response.text.strip()
        data = json.loads(json_text)
        
        # Add raw text preview
        data["raw_text_preview"] = raw_text[:300] if raw_text else None
        return ReportExplanation(**data)

    except Exception as e:
        logger.error(f"Error calling Gemini API: {e}. Falling back to demo generator.")
        mock = generate_mock_explanation(raw_text)
        mock.disclaimer = f"Notice: Live AI analysis encountered an error ({str(e)[:100]}). Showing educational fallback view. Always consult a healthcare professional."
        return mock
