import React from 'react';
import { AuthCard } from '../dashboard/AuthCard';
import { CameraFeed } from '../dashboard/CameraFeed';
import { SystemStatusCard } from '../dashboard/SystemStatusCard';
import { RadarScan } from '../dashboard/RadarScan';
import { UltrasonicCard } from '../dashboard/UltrasonicCard';
import { HumanDetectCard } from '../dashboard/HumanDetectCard';
import { ObjectDetectCard } from '../dashboard/ObjectDetectCard';
import { LocationCard } from '../dashboard/LocationCard';
import { TemperatureCard } from '../dashboard/TemperatureCard';
import { SensorMetrics } from '../dashboard/SensorMetrics';
import { EvidenceTable } from '../dashboard/EvidenceTable';
import { SecurityCard } from '../dashboard/SecurityCard';
import { SequenceStepper } from '../dashboard/SequenceStepper';
import { ActivityLog } from '../dashboard/ActivityLog';
import { EvidencePreviewCard } from '../dashboard/EvidencePreviewCard';

export const DashboardView = () => {
  return (
    <div className="space-y-4 p-2 sm:p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300">
      
      {/* ROW 1: Auth Card | Live Camera Feed | System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-3 flex flex-col">
          <AuthCard />
        </div>
        <div className="lg:col-span-6 flex flex-col">
          <CameraFeed />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <SystemStatusCard />
        </div>
      </div>

      {/* ROW 2: Scanning & Sensor Telemetry Grid (6 Columns on large screens) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
        <div>
          <RadarScan />
        </div>
        <div>
          <UltrasonicCard />
        </div>
        <div>
          <HumanDetectCard />
        </div>
        <div>
          <ObjectDetectCard />
        </div>
        <div>
          <LocationCard />
        </div>
        <div>
          <TemperatureCard />
        </div>
      </div>

      {/* ROW 3: Live Sensor Data Gauges | Evidence Documentation Table | Security & Access Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <SensorMetrics />
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <EvidenceTable />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <SecurityCard />
        </div>
      </div>

      {/* ROW 4: Operational Sequence Stepper | Recent Activity Log | Digital Evidence Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        <div className="lg:col-span-6 flex flex-col">
          <SequenceStepper />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <ActivityLog />
        </div>
        <div className="lg:col-span-3 flex flex-col">
          <EvidencePreviewCard />
        </div>
      </div>

    </div>
  );
};
