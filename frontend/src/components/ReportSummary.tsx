import React from 'react';
import { HeartPulse, CheckCircle2, Printer } from 'lucide-react';
import { ReportExplanation } from '../types/report';

interface ReportSummaryProps {
  explanation: ReportExplanation;
  onPrint: () => void;
}

export const ReportSummary: React.FC<ReportSummaryProps> = ({ explanation, onPrint }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-teal-600 text-xs font-semibold uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Educational Analysis</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {explanation.report_title}
          </h1>
        </div>

        <button
          onClick={onPrint}
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors print:hidden self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Patient Summary */}
      <div className="my-6 p-5 bg-teal-50/60 rounded-xl border border-teal-100">
        <h3 className="text-sm font-semibold text-teal-950 mb-2">
          Plain-English Summary
        </h3>
        <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
          {explanation.patient_summary}
        </p>
      </div>

      {/* Key Takeaways */}
      {explanation.key_takeaways && explanation.key_takeaways.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Key Insights
          </h4>
          <ul className="space-y-2.5">
            {explanation.key_takeaways.map((item, index) => (
              <li key={index} className="flex items-start space-x-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
