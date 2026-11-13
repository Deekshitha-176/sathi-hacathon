import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  fileName?: string;
  onComplete?: () => void;
}

const STEPS = [
  'Validating document format and reading structure...',
  'Extracting text and identifying biomarker lines...',
  'Normalizing reference intervals and measurement units...',
  'Synthesizing plain-language explanations...',
  'Formulating key questions for your physician...'
];

export const LoadingState: React.FC<LoadingStateProps> = ({ fileName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12 max-w-xl mx-auto text-center my-8"
    >
      {/* Pulse circle */}
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-teal-100 animate-ping opacity-75" />
        <div className="relative w-16 h-16 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-lg shadow-teal-700/20">
          <Activity className="w-8 h-8 animate-pulse stroke-[2.5]" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        Analyzing Report
      </h3>
      {fileName && (
        <p className="text-xs text-slate-500 font-mono mt-1">
          Processing: {fileName}
        </p>
      )}

      {/* Progress bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden my-6">
        <div
          className="bg-teal-700 h-full transition-all duration-500 rounded-full"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Steps list */}
      <div className="text-left space-y-2.5 max-w-sm mx-auto">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={idx}
              className={`flex items-center space-x-2.5 text-xs transition-opacity duration-300 ${
                isDone
                  ? 'text-slate-800 font-medium'
                  : isCurrent
                  ? 'text-teal-800 font-bold'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-teal-700 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
              )}
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 mt-8">
        Educational demonstration &bull; Simulating pipeline extraction
      </p>
    </div>
  );
};
