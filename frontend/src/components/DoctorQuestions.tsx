import React, { useState } from 'react';
import { HelpCircle, Copy, Check } from 'lucide-react';

interface DoctorQuestionsProps {
  questions: string[];
}

export const DoctorQuestions: React.FC<DoctorQuestionsProps> = ({ questions }) => {
  const [copied, setCopied] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleCopy = () => {
    const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 my-8 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold">
              Questions to Ask Your Doctor
            </h3>
            <p className="text-xs text-slate-400">
              Take these to your next consultation to get the most out of your visit.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center space-x-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-300" />
              <span>Copy Questions</span>
            </>
          )}
        </button>
      </div>

      <ol className="space-y-3 mt-4">
        {questions.map((q, idx) => (
          <li
            key={idx}
            className="flex items-start space-x-3 text-sm text-slate-200 bg-slate-800/60 p-3.5 rounded-xl border border-slate-800"
          >
            <span className="font-bold text-teal-400 shrink-0 w-5">
              {idx + 1}.
            </span>
            <span className="leading-relaxed">{q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};
