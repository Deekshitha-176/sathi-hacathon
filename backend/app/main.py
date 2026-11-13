import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .api.routes_reports import router as reports_router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("reportsaathi")

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="ReportSaathi Backend - Medical Laboratory Report Simplifier API"
)

# Configure CORS
origins = [origin.strip() for origin in settings.allowed_origins.split(",") if origin.strip()]
if not origins:
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(reports_router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to ReportSaathi API - Plain-language medical report educator",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health")
async def health_check():
    import os
    tesseract_exists = os.path.exists(settings.tesseract_cmd)
    gemini_configured = bool(settings.gemini_api_key.strip())
    supabase_configured = bool(settings.supabase_url.strip() and settings.supabase_key.strip())
    
    return {
        "status": "healthy",
        "app_name": settings.app_name,
        "tesseract_ocr": {
            "available": tesseract_exists,
            "path": settings.tesseract_cmd
        },
        "gemini_api": {
            "configured": gemini_configured,
            "model": settings.gemini_model
        },
        "supabase": {
            "configured": supabase_configured
        }
    }
