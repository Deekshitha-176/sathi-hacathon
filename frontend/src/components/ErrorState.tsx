import React from 'react';
import { AlertOctagon, RotateCcw, FileText } from 'lucide-react';

interface ErrorStateProps {
  errorMessage: string;
  onRetry: () => void;
  onUseSample: (sampleId: string) => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  errorMessage,
  onRetry,
  onUseSample
}) => {
  return (
    <div
      role="alert"
      className="bg-white rounded-2xl border border-rose-200 shadow-sm p-8 sm:p-12 max-w-xl mx-auto text-center my-8"
    >
      <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto mb-4">
        <AlertOctagon className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        Could Not Process Report
      </h3>

      <div className="my-4 p-4 rounded-xl bg-rose-50/70 border border-rose-100 text-xs sm:text-sm text-rose-900 font-medium leading-relaxed">
        {errorMessage || 'An unexpected issue occurred while parsing the medical document.'}
      </div>

      {/* Troubleshooting Tips */}
      <div className="text-left bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2 mb-6">
        <p className="font-semibold text-slate-800">Quick Tips for Reliable Parsing:</p>
        <ul className="list-disc list-inside space-y-1 text-slate-600">
          <li>Ensure document is in <strong>PDF, JPG, or PNG</strong> format.</li>
          <li>For photos, avoid glare, strong shadows, or skewed angles.</li>
          <li>Verify the file size is under <strong>10 MB</strong>.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center space-x-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Another File</span>
        </button>

        <button
          onClick={() => onUseSample('cbc')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm border border-slate-300 transition-colors flex items-center justify-center space-x-1.5"
        >
          <FileText className="w-4 h-4 text-slate-500" />
          <span>Load Working Demo (CBC)</span>
        </button>
      </div>
    </div>
  );
};
