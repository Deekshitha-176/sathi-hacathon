import sys
import asyncio
from backend.app.services.gemini_service import explain_report_with_gemini
from backend.app.services.extractor import extract_document_text

async def main():
    print("Testing mock explanation...")
    exp = await explain_report_with_gemini("Hemoglobin: 13.5 g/dL")
    print(f"Title: {exp.report_title}")
    print(f"Tests: {len(exp.tests)}")
    print("Success!")

if __name__ == "__main__":
    asyncio.run(main())
