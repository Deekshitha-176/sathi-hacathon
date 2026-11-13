import React from 'react';
import { FileQuestion, Upload, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  onOpenUpload: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onOpenUpload,
  onSelectSample
}) => {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-14 text-center max-w-xl mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center mx-auto mb-5">
        <FileQuestion className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        No Reports Analyzed Yet
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
        Your dashboard is empty. Upload your PDF or photo of a medical laboratory report, or load one of our realistic demo datasets to see ReportSaathi in action.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onOpenUpload}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-700/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Report Now</span>
        </button>

        <button
          onClick={() => onSelectSample('cbc')}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-xs sm:text-sm border border-slate-300 transition-colors flex items-center justify-center space-x-1.5"
        >
          <Sparkles className="w-4 h-4 text-teal-700" />
          <span>Load Demo CBC</span>
        </button>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-[11px] text-slate-400">
        All processing is educational and strictly client-side for this demo.
      </div>
    </div>
  );
};
