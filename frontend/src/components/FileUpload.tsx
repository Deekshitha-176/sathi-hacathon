import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, ArrowRight, Sparkles, FileSpreadsheet } from 'lucide-react';
import { SampleReportMeta } from '../types/report';

interface FileUploadProps {
  onFileSubmit: (file: File) => void;
  onTextSubmit: (text: string) => void;
  onSelectSample: (sampleId: string) => void;
  sampleReports: SampleReportMeta[];
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSubmit,
  onTextSubmit,
  onSelectSample,
  sampleReports,
  isLoading
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'upload' | 'text'>('upload');
  const [pastedText, setPastedText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

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
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (mode === 'upload' && selectedFile) {
      onFileSubmit(selectedFile);
    } else if (mode === 'text' && pastedText.trim()) {
      onTextSubmit(pastedText.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
      <div className="text-center max-w-xl mx-auto mb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Upload Your Lab Report
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Supports digital PDFs, scanned documents, and lab report photos (PNG, JPG).
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              mode === 'upload'
                ? 'bg-white text-teal-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Upload Document / Photo
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              mode === 'text'
                ? 'bg-white text-teal-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Paste Report Text
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-teal-500 bg-teal-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-teal-400 bg-slate-50/50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            {selectedFile ? (
              <div className="flex items-center space-x-2 text-slate-800">
                <FileText className="w-5 h-5 text-teal-600" />
                <span className="font-medium text-sm">{selectedFile.name}</span>
                <span className="text-xs text-slate-400">
                  ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            ) : (
              <>
                <p className="text-sm font-medium text-slate-700">
                  <span className="text-teal-600 font-semibold underline">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-400">PDF, PNG, JPG, or WEBP (Max 15MB)</p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={6}
            placeholder="Paste your lab report text here (e.g. Hemoglobin: 13.5 g/dL, Total Cholesterol: 210 mg/dL...)"
            className="w-full text-sm p-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-mono text-slate-700 placeholder:text-slate-400 outline-none"
          />
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAnalyze}
          disabled={isLoading || (mode === 'upload' ? !selectedFile : !pastedText.trim())}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium text-sm shadow-md shadow-teal-600/20 flex items-center justify-center space-x-2 transition-all"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing with ReportSaathi...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Explain My Report</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>

      {/* Sample Reports Quick Selection */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">
          Or try instantly with a sample report:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleReports.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample.id)}
              disabled={isLoading}
              className="p-3 text-left rounded-xl border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition-all group"
            >
              <div className="flex items-center space-x-2 text-slate-800 font-medium text-xs mb-1 group-hover:text-teal-700">
                <FileSpreadsheet className="w-3.5 h-3.5 text-teal-600" />
                <span>{sample.title}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                {sample.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
