import React from 'react';
import { TestItem, FlagType } from '../types/report';
import { Check, AlertTriangle, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface TestCardProps {
  test: TestItem;
}

const getFlagBadge = (flag: FlagType) => {
  switch (flag) {
    case 'normal':
      return {
        label: 'Normal',
        icon: <Check className="w-3.5 h-3.5" />,
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        valueClass: 'text-slate-900',
      };
    case 'low':
      return {
        label: 'Low',
        icon: <ArrowDownRight className="w-3.5 h-3.5" />,
        badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
        valueClass: 'text-amber-700 font-semibold',
      };
    case 'high':
      return {
        label: 'High',
        icon: <ArrowUpRight className="w-3.5 h-3.5" />,
        badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
        valueClass: 'text-rose-700 font-semibold',
      };
    case 'critical':
      return {
        label: 'Attention',
        icon: <AlertTriangle className="w-3.5 h-3.5" />,
        badgeClass: 'bg-red-100 text-red-800 border-red-300 font-bold',
        valueClass: 'text-red-700 font-bold',
      };
    default:
      return {
        label: 'Reviewed',
        icon: <Info className="w-3.5 h-3.5" />,
        badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        valueClass: 'text-slate-900',
      };
  }
};

export const TestCard: React.FC<TestCardProps> = ({ test }) => {
  const badge = getFlagBadge(test.flag);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h4 className="font-semibold text-slate-900 text-base leading-snug">
            {test.name}
          </h4>
          <span
            className={`inline-flex items-center space-x-1 text-xs px-2.5 py-0.5 rounded-full border ${badge.badgeClass} shrink-0`}
          >
            {badge.icon}
            <span>{badge.label}</span>
          </span>
        </div>

        <div className="flex items-baseline space-x-2 my-2">
          <span className={`text-2xl font-bold tracking-tight ${badge.valueClass}`}>
            {test.value}
          </span>
          {test.unit && (
            <span className="text-xs text-slate-500 font-medium">
              {test.unit}
            </span>
          )}
        </div>

        {test.reference_range && (
          <div className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
            <span className="text-slate-400">Standard Interval:</span>
            <span className="font-mono font-medium text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
              {test.reference_range} {test.unit || ''}
            </span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-slate-100 mt-2">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {test.simple_explanation}
        </p>
      </div>
    </div>
  );
};
