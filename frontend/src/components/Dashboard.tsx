import React from 'react';
import {
  PlusCircle,
  FileSpreadsheet,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sliders
} from 'lucide-react';
import { MOCK_REPORTS, MockReport } from '../data/mockReports';
import { DisclaimerBanner } from './DisclaimerBanner';

interface DashboardProps {
  onOpenUpload: () => void;
  onSelectReport: (report: MockReport) => void;
  onSimulateState: (state: 'empty' | 'error' | 'loading') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onOpenUpload,
  onSelectReport,
  onSimulateState
}) => {
  const reportsList = Object.values(MOCK_REPORTS);

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4">
      {/* Disclaimer */}
      <DisclaimerBanner compact />

      {/* Dashboard Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full inline-block mb-2">
            Patient Portal Demo
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Medical Lab Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Upload new pathology or diagnostic reports to receive plain-language summaries, reference range comparisons, and doctor consultation questions.
          </p>
        </div>

        {/* Clear Primary "Upload Report" Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={onOpenUpload}
            className="px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm shadow-md shadow-teal-700/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Upload Report</span>
          </button>
        </div>
      </div>

      {/* State Demonstration Toolbar */}
      <div className="bg-slate-100/80 rounded-xl p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2 text-slate-600 font-medium">
          <Sliders className="w-4 h-4 text-slate-500" />
          <span>Demo State Switcher:</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onSimulateState('loading')}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium shadow-2xs transition-colors"
          >
            Preview Loading State
          </button>
          <button
            onClick={() => onSimulateState('error')}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-rose-700 border border-slate-200 font-medium shadow-2xs transition-colors"
          >
            Preview Error State
          </button>
          <button
            onClick={() => onSimulateState('empty')}
            className="px-2.5 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium shadow-2xs transition-colors"
          >
            Preview Empty State
          </button>
        </div>
      </div>

      {/* Reports Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Available Medical Reports ({reportsList.length})
          </h2>
          <span className="text-xs text-slate-500">
            Click any report below to view full educational breakdown
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reportsList.map((report) => {
            const flaggedCount = report.biomarkers.filter((b) => b.flag !== 'normal').length;

            return (
              <div
                key={report.id}
                onClick={() => onSelectReport(report)}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all p-6 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                      {report.labName}
                    </span>
                    {report.overallStatus === 'normal' ? (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>All Normal</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        <span>{flaggedCount} Out of Range</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {report.subtitle}
                  </p>

                  <div className="my-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="flex items-center space-x-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{report.collectionDate.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-teal-700" />
                      <span>{report.biomarkers.length} Parameters</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-800 group-hover:text-teal-900">
                  <span>View Breakdown</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
