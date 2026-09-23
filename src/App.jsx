import React from 'react';
import { ForensicProvider, useForensic } from './context/ForensicContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Views
import { DashboardView } from './components/views/DashboardView';
import { LiveFeedView } from './components/views/LiveFeedView';
import { RadarView } from './components/views/RadarView';
import { DetectionView } from './components/views/DetectionView';
import { LocationView } from './components/views/LocationView';
import { TempAnalyticsView } from './components/views/TempAnalyticsView';
import { EvidenceLockerView } from './components/views/EvidenceLockerView';
import { DocumentationView } from './components/views/DocumentationView';
import { SettingsView } from './components/views/SettingsView';

// Modals
import { AddEvidenceModal } from './components/modals/AddEvidenceModal';
import { EvidenceDetailModal } from './components/modals/EvidenceDetailModal';
import { PrintReportModal } from './components/modals/PrintReportModal';

const AppContent = () => {
  const { activeView } = useForensic();

  const renderActiveView = () => {
    switch (activeView) {
      case 'live-feed':
        return <LiveFeedView />;
      case 'scan-measure':
        return <RadarView />;
      case 'object-detection':
        return <DetectionView />;
      case 'location-tracking':
        return <LocationView />;
      case 'temperature':
        return <TempAnalyticsView />;
      case 'evidence-log':
        return <EvidenceLockerView />;
      case 'documentation':
        return <DocumentationView />;
      case 'settings':
        return <SettingsView />;
      case 'dashboard':
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050B14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <Header />

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Dynamic Center Stage View */}
        <main className="flex-1 overflow-y-auto bg-[#050B14] p-2 sm:p-4">
          {renderActiveView()}
        </main>
      </div>

      {/* Bottom Status Bar */}
      <Footer />

      {/* Global Interactive Modals */}
      <AddEvidenceModal />
      <EvidenceDetailModal />
      <PrintReportModal />
    </div>
  );
};

export function App() {
  return (
    <ForensicProvider>
      <AppContent />
    </ForensicProvider>
  );
}

export default App;
