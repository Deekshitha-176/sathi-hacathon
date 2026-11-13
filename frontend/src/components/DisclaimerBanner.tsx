import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  customText?: string;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ customText, compact = false }) => {
  return (
    <div
      role="alert"
      className={`bg-amber-50 border-l-4 border-amber-600 rounded-r-xl shadow-xs ${
        compact ? 'p-3 text-xs' : 'p-4 sm:p-5 text-xs sm:text-sm'
      } text-amber-950 mb-6`}
    >
      <div className="flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="leading-relaxed">
          <strong className="font-semibold text-amber-900 block sm:inline">
            Educational Purpose Only:{' '}
          </strong>
          {customText || (
            <span>
              ReportSaathi is an educational platform designed to decode clinical laboratory terminology. 
              <strong> It does not provide medical diagnoses, treatment decisions, or clinical recommendations. </strong>
              Never alter prescriptions, start therapies, or delay medical consultation based on this tool. Always consult a licensed healthcare practitioner.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
