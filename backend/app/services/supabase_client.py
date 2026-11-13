import logging
from typing import Optional, List, Dict, Any
from ..config import settings

logger = logging.getLogger(__name__)

supabase_client = None

def get_supabase():
    """Initializes and returns the Supabase client if configured."""
    global supabase_client
    if supabase_client is not None:
        return supabase_client

    if settings.supabase_url and settings.supabase_key:
        try:
            from supabase import create_client, Client
            supabase_client = create_client(settings.supabase_url, settings.supabase_key)
            logger.info("Supabase client initialized successfully.")
            return supabase_client
        except Exception as e:
            logger.warning(f"Failed to initialize Supabase client: {e}")
            return None
    return None

def save_report_to_history(user_id: Optional[str], report_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Save an analyzed report to Supabase history if available."""
    client = get_supabase()
    if not client:
        return None
    try:
        record = {
            "user_id": user_id or "anonymous",
            "report_title": report_data.get("report_title"),
            "patient_summary": report_data.get("patient_summary"),
            "data": report_data
        }
        res = client.table("reports").insert(record).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        logger.error(f"Error saving report to Supabase: {e}")
        return None

def get_user_reports(user_id: str) -> List[Dict[str, Any]]:
    """Retrieve previous reports for a user."""
    client = get_supabase()
    if not client:
        return []
    try:
        res = client.table("reports").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return res.data or []
    except Exception as e:
        logger.error(f"Error fetching user reports from Supabase: {e}")
        return []
