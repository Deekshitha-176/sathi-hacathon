import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ResultsPage } from './components/ResultsPage';
import { UploadModal } from './components/UploadModal';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { MOCK_REPORTS, MockReport } from './data/mockReports';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'results'>('landing');
  const [currentState, setCurrentState] = useState<'normal' | 'loading' | 'error' | 'empty'>('normal');
  const [selectedReport, setSelectedReport] = useState<MockReport>(MOCK_REPORTS.cbc);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle Starting Analysis (Simulate Loading State -> Success)
  const handleStartAnalysis = (fileName: string, sampleId?: string) => {
    setIsUploadOpen(false);
    setCurrentFileName(fileName);
    setCurrentState('loading');
    setCurrentView('results');

    // Simulate realistic 2.2-second parsing pipeline
    setTimeout(() => {
      const reportKey = sampleId || 'cbc';
      const reportToDisplay = MOCK_REPORTS[reportKey] || MOCK_REPORTS.cbc;
      setSelectedReport(reportToDisplay);
      setCurrentState('normal');
    }, 2200);
  };

  // Handle Selecting a Report directly from Dashboard or Landing
  const handleSelectReport = (report: MockReport) => {
    setSelectedReport(report);
    setCurrentState('normal');
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSampleById = (sampleId: string) => {
    const report = MOCK_REPORTS[sampleId] || MOCK_REPORTS.cbc;
    handleSelectReport(report);
  };

  // Handle Triggering Error State
  const handleTriggerError = (message: string) => {
    setIsUploadOpen(false);
    setErrorMessage(message);
    setCurrentState('error');
    setCurrentView('dashboard');
  };

  // Handle Demo State Simulator
  const handleSimulateState = (state: 'empty' | 'error' | 'loading') => {
    if (state === 'loading') {
      setCurrentFileName('blood_test_cbc_nov2026.pdf');
      setCurrentState('loading');
      setTimeout(() => {
        setSelectedReport(MOCK_REPORTS.cbc);
        setCurrentState('normal');
        setCurrentView('results');
      }, 2500);
    } else if (state === 'error') {
      setErrorMessage('OCR Extraction Notice: Document image was low contrast or blurry. Could not reliably identify test reference intervals.');
      setCurrentState('error');
    } else if (state === 'empty') {
      setCurrentState('empty');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          setCurrentState('normal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* State Renderers */}
        {currentState === 'loading' ? (
          <LoadingState fileName={currentFileName} />
        ) : currentState === 'error' ? (
          <ErrorState
            errorMessage={errorMessage}
            onRetry={() => {
              setCurrentState('normal');
              setIsUploadOpen(true);
            }}
            onUseSample={(sampleId) => {
              setCurrentState('normal');
              handleSelectSampleById(sampleId);
            }}
          />
        ) : currentState === 'empty' ? (
          <EmptyState
            onOpenUpload={() => {
              setCurrentState('normal');
              setIsUploadOpen(true);
            }}
            onSelectSample={(sampleId) => {
              setCurrentState('normal');
              handleSelectSampleById(sampleId);
            }}
          />
        ) : (
          /* View Renderers */
          <>
            {currentView === 'landing' && (
              <LandingPage
                onGetStarted={() => {
                  setCurrentView('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectSample={handleSelectSampleById}
              />
            )}

            {currentView === 'dashboard' && (
              <Dashboard
                onOpenUpload={() => setIsUploadOpen(true)}
                onSelectReport={handleSelectReport}
                onSimulateState={handleSimulateState}
              />
            )}

            {currentView === 'results' && (
              <ResultsPage
                report={selectedReport}
                onUploadAnother={() => setIsUploadOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Upload Modal with File Type & Size Validation */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onStartAnalysis={handleStartAnalysis}
        onTriggerError={handleTriggerError}
      />

      {/* Accessible Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            ReportSaathi &bull; Educational Medical Laboratory Report Educator
          </p>
          <p className="text-[11px] text-slate-400">
            Strictly for patient health literacy. Not intended for diagnosis, medical advice, or treatment decisions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
