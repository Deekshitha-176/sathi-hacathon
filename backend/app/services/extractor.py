import io
import os
import logging
from typing import Tuple, Dict, Any
from PIL import Image
import pytesseract
from pypdf import PdfReader
from ..config import settings

logger = logging.getLogger(__name__)

# Configure Tesseract path & tessdata directory
backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
local_tessdata = os.path.join(backend_dir, "tessdata")
if os.path.exists(local_tessdata):
    os.environ["TESSDATA_PREFIX"] = local_tessdata

if os.path.exists(settings.tesseract_cmd):
    pytesseract.pytesseract.tesseract_cmd = settings.tesseract_cmd
else:
    logger.warning("Tesseract binary not found at %s. OCR might fail.", settings.tesseract_cmd)


def extract_text_from_image(image_bytes: bytes) -> str:
    """Extract text from raw image bytes using Tesseract OCR."""
    try:
        image = Image.open(io.BytesIO(image_bytes))
        # Convert RGBA / P to RGB for clean OCR
        if image.mode not in ("L", "RGB"):
            image = image.convert("RGB")
        text = pytesseract.image_to_string(image)
        return text.strip()
    except Exception as e:
        logger.error(f"Image OCR failed: {e}")
        raise RuntimeError(f"OCR processing failed: {str(e)}")

def extract_text_from_pdf(pdf_bytes: bytes) -> Tuple[str, str, int]:
    """
    Extract text from a PDF.
    First attempts native text extraction with pypdf.
    If no text is found (e.g. scanned document), falls back to extracting
    and OCR-ing embedded images from each page.
    Returns: (extracted_text, method, page_count)
    """
    reader = PdfReader(io.BytesIO(pdf_bytes))
    page_count = len(reader.pages)
    native_text = []

    for page_idx, page in enumerate(reader.pages):
        try:
            page_text = page.extract_text() or ""
            if page_text.strip():
                native_text.append(page_text.strip())
        except Exception as e:
            logger.warning(f"Failed extracting text from page {page_idx + 1}: {e}")

    combined_text = "\n\n".join(native_text).strip()

    # If native text extraction produced meaningful output (> 60 characters)
    if len(combined_text) >= 60:
        return combined_text, "digital_pdf", page_count

    # Fallback to OCR on embedded page images
    ocr_text_parts = []
    logger.info("Native text yield too low (%d chars). Falling back to image OCR for PDF.", len(combined_text))
    
    for page_idx, page in enumerate(reader.pages):
        try:
            for img_file in page.images:
                img_data = img_file.data
                img = Image.open(io.BytesIO(img_data))
                if img.mode not in ("L", "RGB"):
                    img = img.convert("RGB")
                page_ocr = pytesseract.image_to_string(img)
                if page_ocr.strip():
                    ocr_text_parts.append(page_ocr.strip())
        except Exception as e:
            logger.warning(f"Error extracting images for OCR on page {page_idx + 1}: {e}")

    ocr_combined = "\n\n".join(ocr_text_parts).strip()
    if ocr_combined:
        return ocr_combined, "ocr_scanned_pdf", page_count

    # If both yielded little, return whatever was found
    return combined_text, "digital_pdf", page_count

def extract_document_text(filename: str, file_bytes: bytes) -> Dict[str, Any]:
    """
    Unified extraction handler for PDF and image files.
    """
    ext = os.path.splitext(filename)[1].lower()
    
    if ext == ".pdf":
        text, method, page_count = extract_text_from_pdf(file_bytes)
    elif ext in [".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tiff"]:
        text = extract_text_from_image(file_bytes)
        method = "ocr_image"
        page_count = 1
    else:
        raise ValueError(f"Unsupported file format '{ext}'. Please upload a PDF or image (PNG, JPG, WEBP).")

    return {
        "text": text,
        "method": method,
        "page_count": page_count,
        "char_count": len(text),
        "preview": text[:300] + "..." if len(text) > 300 else text
    }
