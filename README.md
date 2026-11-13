# ReportSaathi (रिपोर्ट साथी) 🩺

> An empathetic, AI-powered medical laboratory report educator that simplifies complex clinical reports into plain, reassuring, and structured educational insights.

---

## 🌟 Key Features

1. **Dual Extraction Engine**:
   - **Digital PDF Extraction**: Ultra-fast direct parsing with `pypdf`.
   - **OCR Fallback**: Automatically invokes **Tesseract OCR** on scanned documents and mobile phone photos.
2. **Patient-Centered Medical Explanations**:
   - Structured plain-English summaries.
   - Color-coded biomarker indicators (`Normal`, `Low`, `High`, `Attention`).
   - Standard reference interval comparisons.
3. **Doctor Consultation Enablement**:
   - Prepares 3-5 specific questions the patient can ask their physician.
   - 1-click clipboard copy for doctor visits.
4. **Strict Ethical Guardrails**:
   - Prominent, persistent medical disclaimer.
   - Non-diagnostic and non-prescriptive language.
5. **Instant Testing**:
   - Built-in 1-click sample reports (Complete Blood Count, Lipid Panel, Comprehensive Metabolic Panel).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide React Icons
- **Backend**: FastAPI, Python 3.14, Uvicorn
- **Extraction & OCR**: PyPDF, Tesseract OCR (`C:\Program Files\Tesseract-OCR\tesseract.exe`), Pillow
- **AI Engine**: Gemini 2.5 Flash via official `google-genai` SDK (with instant offline demo fallback)
- **Database / Auth**: Optional Supabase integration for report history

---

## 🚀 Getting Started

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm
- Tesseract OCR installed

### 2. Backend Setup
```powershell
# From the root directory:
.\venv\Scripts\Activate.ps1
uvicorn backend.app.main:app --reload --port 8000
```
API Documentation will be accessible at: `http://localhost:8000/docs`

### 3. Frontend Setup
```powershell
cd frontend
npm.cmd run dev
```
Open your browser at: `http://localhost:5173`

---

## 🔒 Medical & Legal Advisory
ReportSaathi is intended strictly for educational and informational purposes. It does not provide medical diagnoses, treatment plans, or prescriptions. Always consult a qualified physician for clinical advice.
