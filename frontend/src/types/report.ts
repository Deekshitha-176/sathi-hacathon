export type FlagType = 'normal' | 'low' | 'high' | 'abnormal' | 'critical';

export interface TestItem {
  name: string;
  value: string;
  unit?: string | null;
  reference_range?: string | null;
  flag: FlagType;
  simple_explanation: string;
}

export interface ReportExplanation {
  report_title: string;
  patient_summary: string;
  key_takeaways: string[];
  tests: TestItem[];
  lifestyle_and_wellness: string[];
  questions_for_doctor: string[];
  disclaimer: string;
  raw_text_preview?: string | null;
}

export interface SampleReportMeta {
  id: string;
  title: string;
  description: string;
}

export interface SampleReportDetail extends SampleReportMeta {
  text: string;
}

export interface HealthStatus {
  status: string;
  app_name: string;
  tesseract_ocr: {
    available: boolean;
    path: string;
  };
  gemini_api: {
    configured: boolean;
    model: string;
  };
  supabase: {
    configured: boolean;
  };
}
