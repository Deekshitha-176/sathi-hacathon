import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Image as ImageIcon,
  AlertCircle,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: (fileName: string, sampleId?: string) => void;
  onTriggerError: (errorMessage: string) => void;
}

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis,
  onTriggerError
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateAndSetFile = (file: File) => {
    setValidationError(null);

    // 1. Validate File Extension & MIME Type
    const fileName = file.name.toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const hasValidMime = ALLOWED_TYPES.includes(file.type) || hasValidExt;

    if (!hasValidMime) {
      const err = `Invalid file format "${file.name}". ReportSaathi only accepts PDF, JPG, and PNG medical reports.`;
      setValidationError(err);
      setSelectedFile(null);
      return false;
    }

    // 2. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const err = `File exceeds the 10MB size limit (${sizeMB} MB). Please choose a compressed file or a clearer single page.`;
      setValidationError(err);
      setSelectedFile(null);
      return false;
    }

    setSelectedFile(file);
    return true;
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;
    onStartAnalysis(selectedFile.name);
  };

  const handleSelectSample = (sampleId: string, sampleTitle: string) => {
    onStartAnalysis(sampleTitle, sampleId);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close upload modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mx-auto mb-3 border border-teal-200">
            <Upload className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Upload Medical Report
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Accepts PDF documents and photos (JPG, PNG) up to 10MB
          </p>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div
            role="alert"
            className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-2.5 text-xs leading-relaxed"
          >
            <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
            <div className="flex-1">{validationError}</div>
          </div>
        )}

        {/* Dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-teal-600 bg-teal-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-teal-500 bg-slate-50/60 hover:bg-slate-50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg"
            onChange={handleChange}
            className="hidden"
          />

          {selectedFile ? (
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="text-sm font-semibold text-slate-900 flex items-center justify-center gap-1.5">
                {selectedFile.type.includes('pdf') ? (
                  <FileText className="w-4 h-4 text-teal-700" />
                ) : (
                  <ImageIcon className="w-4 h-4 text-teal-700" />
                )}
                <span>{selectedFile.name}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB &bull; Validated
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="text-xs text-rose-600 hover:text-rose-800 underline font-medium pt-1"
              >
                Change file
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                <Upload className="w-5 h-5 text-slate-600" />
              </div>
              <p className="text-sm text-slate-700 font-medium">
                <span className="text-teal-700 font-semibold underline">Click to browse</span> or drag and drop
              </p>
              <p className="text-xs text-slate-400">
                PDF, JPG, or PNG (Max size: 10MB)
              </p>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="w-full py-3 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-teal-700/20 flex items-center justify-center space-x-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Process & Explain Report</span>
          </button>
        </div>

        {/* Sample Reports Alternative */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-3">
            Or choose a realistic demo report:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSelectSample('cbc', 'CBC Report (Demo)')}
              className="p-2.5 text-center rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-xs text-slate-700 font-medium transition-colors"
            >
              CBC Panel
            </button>
            <button
              onClick={() => handleSelectSample('lipid', 'Lipid Panel (Demo)')}
              className="p-2.5 text-center rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-xs text-slate-700 font-medium transition-colors"
            >
              Lipid Profile
            </button>
            <button
              onClick={() => handleSelectSample('metabolic', 'Metabolic Panel (Demo)')}
              className="p-2.5 text-center rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 text-xs text-slate-700 font-medium transition-colors"
            >
              Metabolic Panel
            </button>
          </div>
        </div>

        {/* Quick Test Demo Trigger */}
        <div className="mt-4 pt-3 border-t border-dashed border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
          <span>Testing state handling?</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onTriggerError('Simulated OCR extraction error: Text in document was too blurry or skewed to extract with confidence.');
            }}
            className="text-amber-700 hover:underline font-medium"
          >
            Simulate Error State
          </button>
        </div>
      </div>
    </div>
  );
};
