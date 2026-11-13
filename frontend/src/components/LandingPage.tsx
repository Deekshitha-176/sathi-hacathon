import React from 'react';
import {
  FileText,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { DisclaimerBanner } from './DisclaimerBanner';

interface LandingPageProps {
  onGetStarted: () => void;
  onSelectSample: (sampleId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onSelectSample
}) => {
  return (
    <div className="space-y-16 py-4">
      {/* Educational Purpose Disclaimer */}
      <DisclaimerBanner />

      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full shadow-2xs">
          <HeartHandshake className="w-4 h-4 text-teal-700" />
          <span>Patient Health Literacy & Educational Tool</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Understand your lab reports in <span className="text-teal-700">plain language</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Medical reports are full of dense clinical abbreviations like <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">eGFR</span>, <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">MCV</span>, and <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">VLDL</span>. 
          ReportSaathi translates test values into clear, compassionate educational summaries and actionable questions for your doctor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-md shadow-teal-700/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02]"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectSample('cbc')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-300 shadow-2xs transition-all hover:border-slate-400"
          >
            <span>Try Sample Report (CBC)</span>
          </button>
        </div>
      </section>

      {/* Core Educational Mission */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Why Educational Translation Matters
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Most patients experience anxiety when seeing an "out of range" flag. ReportSaathi helps bridge that gap before your doctor appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">
              Demystify Medical Jargon
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explains what each biomarker (e.g. Hemoglobin, Platelets, Creatinine) actually does in your body in simple, everyday metaphors.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">
              Contextualize Reference Ranges
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides standard population intervals so you know whether a value is slightly off or well within normal boundaries.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1.5">
              Doctor Consultation Prep
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatically formulates 3 to 5 targeted questions so you make the most of your 15 minutes with your healthcare provider.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How It Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Three simple steps to health report clarity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm mb-4 mx-auto sm:mx-0">
              1
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Upload Any Format
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload a digital PDF from your clinic portal, or snap a photo of a printed paper report (JPG, PNG).
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm mb-4 mx-auto sm:mx-0">
              2
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Automated Extraction
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              The engine identifies test names, numeric quantities, units, and normal reference ranges.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm mb-4 mx-auto sm:mx-0">
              3
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">
              Educational Breakdown
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Receive a calm, color-coded breakdown with clear explanations and discussion points for your doctor.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Reports Showcase */}
      <section className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Explore Realistic Sample Reports
            </h3>
            <p className="text-xs text-slate-600">
              Click any sample below to view a fully parsed interactive explanation:
            </p>
          </div>
          <button
            onClick={onGetStarted}
            className="text-xs font-semibold text-teal-800 hover:text-teal-900 underline self-start sm:self-auto"
          >
            Go to Full Dashboard &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => onSelectSample('cbc')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full inline-block mb-2">
              Mild Anemia
            </span>
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
              Complete Blood Count (CBC)
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Analyzes red blood cells, hemoglobin, white blood cells, and platelets.
            </p>
          </div>

          <div
            onClick={() => onSelectSample('lipid')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-200 px-2 py-0.5 rounded-full inline-block mb-2">
              High Cholesterol
            </span>
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
              Lipid & Cholesterol Profile
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Evaluates total cholesterol, LDL, HDL, and cardiovascular risk indicators.
            </p>
          </div>

          <div
            onClick={() => onSelectSample('metabolic')}
            className="bg-white p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all cursor-pointer group"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-full inline-block mb-2">
              Pre-Diabetes Alert
            </span>
            <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
              Metabolic & Kidney Panel
            </h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              Covers fasting glucose, creatinine, eGFR, and electrolyte balances.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
