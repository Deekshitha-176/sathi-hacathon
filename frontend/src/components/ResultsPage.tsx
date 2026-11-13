import React, { useState } from 'react';
import {
  Printer,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  FileCode,
  Calendar,
  Building,
  User
} from 'lucide-react';
import { MockReport, Biomarker } from '../data/mockReports';
import { DisclaimerBanner } from './DisclaimerBanner';

interface ResultsPageProps {
  report: MockReport;
  onUploadAnother: () => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({
  report,
  onUploadAnother
}) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'raw_text'>('explanation');
  const [filter, setFilter] = useState<'all' | 'flagged' | 'normal'>('all');
  const [copiedQuestions, setCopiedQuestions] = useState(false);

  const handleCopyQuestions = () => {
    const text = report.doctorQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  const filteredBiomarkers = report.biomarkers.filter((b) => {
    if (filter === 'flagged') return b.flag !== 'normal';
    if (filter === 'normal') return b.flag === 'normal';
    return true;
  });

  const flaggedCount = report.biomarkers.filter((b) => b.flag !== 'normal').length;
  const normalCount = report.biomarkers.filter((b) => b.flag === 'normal').length;

  const renderBadge = (flag: Biomarker['flag']) => {
    switch (flag) {
      case 'normal':
        return (
          <span className="inline-flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Normal</span>
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-semibold">
            <ArrowDownRight className="w-3.5 h-3.5 text-amber-700" />
            <span>Below Range</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-900 border border-rose-300 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5 text-rose-700" />
            <span>Elevated</span>
          </span>
        );
      case 'critical':
        return (
          <span className="inline-flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-950 border border-red-400 font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
            <span>Review Advised</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 1. Mandatory Clear Disclaimer */}
      <DisclaimerBanner customText={report.disclaimer} />

      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 print:hidden">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'explanation'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Plain-Language Explanation
          </button>
          <button
            onClick={() => setActiveTab('raw_text')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              activeTab === 'raw_text'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Raw Extracted Text
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={onUploadAnother}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Upload Another</span>
          </button>
        </div>
      </div>

      {activeTab === 'explanation' ? (
        <>
          {/* Report Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-teal-800 uppercase tracking-wider mb-1">
                  <span>Educational Translation</span>
                  <span>&bull;</span>
                  <span>Verified Template</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {report.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {report.subtitle}
                </p>
              </div>

              <div className="flex md:flex-col items-start md:items-end justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Overall Impression
                </span>
                {report.overallStatus === 'normal' ? (
                  <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Values Within Normal Range</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 bg-amber-50 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>{flaggedCount} Parameter(s) Need Review</span>
                  </span>
                )}
              </div>
            </div>

            {/* Demographics row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs text-slate-600">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Patient</span>
                  <span className="font-semibold text-slate-800">
                    {report.patientName} ({report.patientAge}y, {report.patientGender})
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Diagnostic Center</span>
                  <span className="font-semibold text-slate-800 truncate block max-w-[150px]">
                    {report.labName}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Sample Collected</span>
                  <span className="font-semibold text-slate-800">
                    {report.collectionDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Total Biomarkers</span>
                  <span className="font-semibold text-slate-800">
                    {report.biomarkers.length} Parameters Evaluated
                  </span>
                </div>
              </div>
            </div>

            {/* Plain English Summary */}
            <div className="mt-6 p-5 bg-teal-50/70 border border-teal-200/80 rounded-xl">
              <h2 className="text-sm font-bold text-teal-950 mb-1.5 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-teal-700" />
                <span>Executive Patient Summary</span>
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {report.plainSummary}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Insights & Findings
              </h3>
              <ul className="space-y-2">
                {report.keyTakeaways.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Extracted Values & Biomarkers Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Extracted Biomarkers & Reference Ranges
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison against standard clinical reference intervals with plain-language explanations
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filter === 'all'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All ({report.biomarkers.length})
                </button>
                <button
                  onClick={() => setFilter('flagged')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filter === 'flagged'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Needs Attention ({flaggedCount})
                </button>
                <button
                  onClick={() => setFilter('normal')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filter === 'normal'
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Normal ({normalCount})
                </button>
              </div>
            </div>

            {/* Biomarker Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBiomarkers.map((b) => (
                <div
                  key={b.id}
                  className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                    b.flag === 'normal'
                      ? 'bg-slate-50/60 border-slate-200 hover:border-slate-300'
                      : b.flag === 'low'
                      ? 'bg-amber-50/30 border-amber-200 hover:border-amber-300'
                      : 'bg-rose-50/30 border-rose-200 hover:border-rose-300'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {b.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base leading-snug">
                          {b.name}
                        </h4>
                      </div>
                      {renderBadge(b.flag)}
                    </div>

                    {/* Numeric value & interval */}
                    <div className="flex items-baseline space-x-2 my-2">
                      <span
                        className={`text-2xl font-extrabold tracking-tight ${
                          b.flag === 'normal'
                            ? 'text-slate-900'
                            : b.flag === 'low'
                            ? 'text-amber-800'
                            : 'text-rose-800'
                        }`}
                      >
                        {b.value}
                      </span>
                      <span className="text-xs text-slate-500 font-medium font-mono">
                        {b.unit}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 mb-3 flex items-center space-x-1.5">
                      <span className="text-slate-400">Standard Interval:</span>
                      <span className="font-mono font-medium text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {b.referenceRange} {b.unit}
                      </span>
                    </div>
                  </div>

                  {/* Plain Language Interpretation */}
                  <div className="pt-3 border-t border-slate-200/70 space-y-1.5 text-xs text-slate-700">
                    <p className="leading-relaxed">
                      <strong className="text-slate-900">What it means: </strong>
                      {b.simpleExplanation}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-normal">
                      <span className="font-semibold text-slate-600">Function in body: </span>
                      {b.whatItDoes}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredBiomarkers.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No biomarkers match the selected filter.
              </div>
            )}
          </div>

          {/* 3. Questions to Ask Your Doctor */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Questions for Your Doctor
                  </h3>
                  <p className="text-xs text-slate-400">
                    Take these tailored questions to your consultation to advocate for your health.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyQuestions}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-lg transition-colors self-start sm:self-auto"
              >
                {copiedQuestions ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>Copy Questions</span>
                  </>
                )}
              </button>
            </div>

            <ol className="space-y-3">
              {report.doctorQuestions.map((q, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-3 text-xs sm:text-sm text-slate-200 bg-slate-800/60 p-4 rounded-xl border border-slate-800 leading-relaxed"
                >
                  <span className="font-bold text-teal-400 shrink-0 w-5">
                    {idx + 1}.
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* 4. Supportive Lifestyle & General Wellness */}
          <div className="bg-emerald-50/60 rounded-2xl border border-emerald-200 p-6 sm:p-8">
            <h3 className="text-base sm:text-lg font-bold text-emerald-950 mb-1 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <span>General Wellness & Supportive Habits</span>
            </h3>
            <p className="text-xs text-emerald-800 mb-4">
              Non-prescriptive, everyday habits to discuss with your healthcare provider.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {report.lifestyleTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed shadow-2xs"
                >
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Raw Extracted Text Tab */
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold mb-3 text-sm">
            <FileCode className="w-4 h-4 text-teal-700" />
            <span>Verbatim Extracted Document Text</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Below is the exact text read from the document prior to plain-language translation:
          </p>
          <pre className="text-xs font-mono bg-slate-900 text-slate-200 p-5 rounded-xl overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {report.rawTextPreview}
          </pre>
        </div>
      )}
    </div>
  );
};
