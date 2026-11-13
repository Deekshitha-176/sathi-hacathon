import React from 'react';
import { Apple, Sparkles } from 'lucide-react';

interface LifestyleSectionProps {
  tips: string[];
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({ tips }) => {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 sm:p-8 mb-8">
      <div className="flex items-center space-x-2.5 mb-4 text-emerald-900">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Apple className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold">
            General Wellness & Supportive Habits
          </h3>
          <p className="text-xs text-emerald-700">
            Everyday lifestyle practices to support your overall health.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 bg-white/80 p-4 rounded-xl border border-emerald-100/80 text-sm text-slate-700 leading-relaxed shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
