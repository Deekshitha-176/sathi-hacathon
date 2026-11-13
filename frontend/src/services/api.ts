import { ReportExplanation, SampleReportMeta, SampleReportDetail, HealthStatus } from '../types/report';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function checkBackendHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}

export async function fetchSampleReports(): Promise<SampleReportMeta[]> {
  const res = await fetch(`${API_BASE}/api/reports/samples`);
  if (!res.ok) throw new Error('Failed to fetch sample reports');
  return res.json();
}

export async function fetchSampleDetail(sampleId: string): Promise<SampleReportDetail> {
  const res = await fetch(`${API_BASE}/api/reports/samples/${sampleId}`);
  if (!res.ok) throw new Error('Failed to fetch sample detail');
  return res.json();
}

export async function analyzeReportFile(file: File): Promise<ReportExplanation> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE}/api/reports/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to analyze report' }));
    throw new Error(err.detail || 'Analysis request failed');
  }

  return res.json();
}

export async function analyzeReportText(rawText: string): Promise<ReportExplanation> {
  const formData = new FormData();
  formData.append('raw_text', rawText);

  const res = await fetch(`${API_BASE}/api/reports/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Failed to analyze report' }));
    throw new Error(err.detail || 'Analysis request failed');
  }

  return res.json();
}
