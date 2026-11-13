import os
from pathlib import Path
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load .env file from backend directory if present
backend_dir = Path(__file__).resolve().parent.parent
load_dotenv(backend_dir / ".env")

class Settings(BaseSettings):
    app_name: str = "ReportSaathi API"
    environment: str = "development"
    port: int = 8000
    allowed_origins: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000"
    
    # OCR Settings
    tesseract_cmd: str = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    
    # Gemini API Key
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-flash"
    
    # Supabase (Optional)
    supabase_url: str = ""
    supabase_key: str = ""

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
