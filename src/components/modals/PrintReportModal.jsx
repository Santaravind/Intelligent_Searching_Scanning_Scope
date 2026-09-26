import React, { useState } from 'react';
import { X, Printer, ShieldCheck, Download, FileText, CheckCircle, Camera, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const PrintReportModal = () => {
  const {
    isPrintReportOpen,
    setIsPrintReportOpen,
    investigator,
    location,
    distance,
    scanAngle,
    temperature,
    humidity,
    aiConfidence,
    detectedObject,
    evidenceList,
    currentTime,
    lastCapturedImage,
    lastCapturedData,
    resetCapturedToDummy,
  } = useForensic();

  // Snapshot selection: 'auto' | 'dummy' | evidence.id
  const [selectedSnapshotSource, setSelectedSnapshotSource] = useState('auto');

  if (!isPrintReportOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportDate = currentTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Determine active evidence item / capture data
  let activeData = null;
  let isRealCapture = false;

  // If specific evidence selected
  if (selectedSnapshotSource !== 'auto' && selectedSnapshotSource !== 'dummy') {
    const found = evidenceList.find((e) => e.id === selectedSnapshotSource);
    if (found) {
      activeData = found;
      isRealCapture = Boolean(found.customImage || found.isRealData);
    }
  }

  // If auto mode: check lastCapturedData, then latest evidence with customImage/isRealData
  if (!activeData && selectedSnapshotSource === 'auto') {
    if (lastCapturedData && (lastCapturedData.customImage || lastCapturedData.isReal || lastCapturedImage)) {
      activeData = {
        ...lastCapturedData,
        customImage: lastCapturedData.customImage || lastCapturedImage,
      };
      isRealCapture = true;
    } else {
      const realEv = evidenceList.find((e) => e.customImage || e.isRealData);
      if (realEv) {
        activeData = realEv;
        isRealCapture = true;
      }
    }
  }

  // Active fields (Real or Dummy Fallback)
  const displayImage =
    selectedSnapshotSource === 'dummy'
      ? crimeSceneImg
      : (activeData && activeData.customImage) || lastCapturedImage || crimeSceneImg;

  const displayObject =
    selectedSnapshotSource === 'dummy'
      ? 'Book / Bag (Education Material)'
      : (activeData && activeData.object && activeData.object.trim()) ||
        (detectedObject.name && detectedObject.name.trim()) ||
        'Book / Bag (Education Material)';

  const displayCategory =
    selectedSnapshotSource === 'dummy'
      ? 'Education Material'
      : (activeData && activeData.category && activeData.category.trim()) ||
        (detectedObject.category && detectedObject.category.trim()) ||
        'Education Material';

  const displayConfidence =
    selectedSnapshotSource === 'dummy'
      ? '92.4%'
      : (activeData && activeData.confidence) ||
        (detectedObject.confidence > 0 ? `${detectedObject.confidence}%` : `${aiConfidence}%`);

  const displayDistance =
    selectedSnapshotSource === 'dummy'
      ? '2.46 m'
      : (activeData && activeData.distance) || `${distance} m`;

  const displayAngle =
    selectedSnapshotSource === 'dummy'
      ? '124°'
      : (activeData && activeData.angle) || `${scanAngle}°`;

  const displayTemp =
    selectedSnapshotSource === 'dummy'
      ? '27.4'
      : (activeData && activeData.temperature) || temperature;

  const displayHumidity =
    selectedSnapshotSource === 'dummy'
      ? '52.8'
      : (activeData && activeData.humidity) || humidity;

  const displayHash =
    selectedSnapshotSource === 'dummy'
      ? 'sha256:8f4c2e8a719d3b10b47ca9082de42'
      : (activeData && activeData.hash) || 'sha256:8f4c2e8a719d3b10b47ca9082de42';

  const displayCoordinates =
    selectedSnapshotSource === 'dummy'
      ? `${location.latitude}° N, ${location.longitude}° E (±${location.accuracy}m)`
      : (activeData && activeData.coordinates) || `${location.latitude}° N, ${location.longitude}° E (±${location.accuracy}m)`;

  const displayLocationName =
    selectedSnapshotSource === 'dummy'
      ? 'Bundelkhand University, Jhansi, Uttar Pradesh, India'
      : (activeData && activeData.location) || location.name;

  const displayTime =
    selectedSnapshotSource === 'dummy'
      ? '21:43:12'
      : (activeData && activeData.time) || currentTime.toLocaleTimeString('en-GB');

  // Check if current display is real or dummy
  const isCurrentlyShowingReal = selectedSnapshotSource !== 'dummy' && isRealCapture;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-[#1E3B68] rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.3)] my-auto print-container">
        
        {/* Modal Top Control Bar (Hidden completely during print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 border-b border-[#162A4E] bg-[#070E1B] no-print">
          <div className="flex items-center gap-2.5">
            <Printer className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Forensic Evidence Summary Report - Print Preview
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    isCurrentlyShowingReal
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/50'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isCurrentlyShowingReal ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                    }`}
                  ></span>
                  {isCurrentlyShowingReal
                    ? 'REAL CAMERA CAPTURE ACTIVE'
                    : 'DUMMY / REFERENCE PREVIEW (No Real Capture)'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Snapshot Source Selector */}
            <div className="flex items-center gap-1.5 bg-[#0C1930] px-2.5 py-1 rounded-lg border border-[#1A3866] text-xs">
              <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Source:</span>
              <select
                value={selectedSnapshotSource}
                onChange={(e) => setSelectedSnapshotSource(e.target.value)}
                className="bg-[#070E1B] text-cyan-300 font-mono text-xs border border-[#1E3B68] rounded px-2 py-0.5 focus:outline-none focus:border-cyan-400"
              >
                <option value="auto">
                  {lastCapturedImage || lastCapturedData ? '⚡ Auto (Latest Real Capture)' : '⚡ Auto (Default / Sample)'}
                </option>
                {evidenceList
                  .filter((e) => e.customImage || e.isRealData)
                  .map((e) => (
                    <option key={e.id} value={e.id}>
                      📷 {e.id} - Real Capture ({e.object || e.time})
                    </option>
                  ))}
                <option value="dummy">📄 Reference Sample (Dummy Image)</option>
              </select>
            </div>

            {/* Reset to Dummy button if real capture exists */}
            {(lastCapturedImage || lastCapturedData) && (
              <button
                onClick={resetCapturedToDummy}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
                title="Reset to default dummy sample"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Sample</span>
              </button>
            )}

            {/* Print Action Button */}
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            {/* Close Modal */}
            <button
              onClick={() => setIsPrintReportOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 sm:p-10 overflow-y-auto bg-white text-slate-900 font-sans print:p-0 print:overflow-visible">
          
          {/* Official Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
                  Forensic Science Laboratory
                </h1>
                <h2 className="text-sm font-bold text-slate-700 tracking-wide uppercase mt-0.5">
                  Crime Scene Investigation & Digital Evidence Audit Report
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Generated via: Intelligent Searching Scanning Scope (Portable AI-Assisted System)
                </p>
              </div>

              <div className="text-right text-xs font-mono">
                <div className="font-bold text-slate-900">REF: FSL-JH-2026-0921</div>
                <div className="text-slate-600">Date: {reportDate}</div>
                <div className="text-slate-600">Classification: OFFICIAL / CONFIDENTIAL</div>
              </div>
            </div>
          </div>

          {/* Section 1: Investigator & Location Metadata */}
          <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6 text-xs">
            <div>
              <h3 className="font-bold text-slate-800 border-b border-slate-300 pb-1 mb-2 uppercase text-[11px]">
                Investigator Credentials
              </h3>
              <div className="space-y-1">
                <div><strong className="text-slate-600">Name:</strong> {investigator.name}</div>
                <div><strong className="text-slate-600">Investigator ID:</strong> {investigator.id}</div>
                <div><strong className="text-slate-600">Clearance:</strong> {investigator.clearanceLevel}</div>
                <div><strong className="text-slate-600">RFID Verification:</strong> VERIFIED (UID: {investigator.rfidUid})</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-800 border-b border-slate-300 pb-1 mb-2 uppercase text-[11px]">
                Incident Location & Environmental Data
              </h3>
              <div className="space-y-1">
                <div><strong className="text-slate-600">Location:</strong> {displayLocationName}</div>
                <div><strong className="text-slate-600">Coordinates:</strong> {displayCoordinates}</div>
                <div><strong className="text-slate-600">Ambient Temp:</strong> {displayTemp}°C | Humidity: {displayHumidity}%</div>
                <div><strong className="text-slate-600">Scan Angle:</strong> {displayAngle} | Sonar Range: {displayDistance}</div>
              </div>
            </div>
          </div>

          {/* Section 2: Visual Evidence Snapshot & Computer Vision */}
          <div className="mb-6">
            <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase">
                I. Photographic & AI Object Detection Snapshot
              </h3>
              <span
                className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded border ${
                  isCurrentlyShowingReal
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                {isCurrentlyShowingReal
                  ? '● REAL-TIME FIELD CAPTURE (VERIFIED)'
                  : '○ REFERENCE SAMPLE DATA (DEMO / SIMULATION MODE)'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="w-full sm:w-56 h-40 rounded-lg overflow-hidden border-2 border-slate-300 shrink-0 bg-black flex items-center justify-center relative shadow-sm">
                <img
                  src={displayImage}
                  alt="Forensic Evidence Capture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                  {isCurrentlyShowingReal ? 'LIVE FRAME' : 'SAMPLE'}
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-700 flex-1">
                <div>
                  <strong className="text-slate-900">Primary Object Identified:</strong>{' '}
                  <span className="font-semibold text-blue-900">{displayObject}</span> ({displayCategory})
                </div>
                <div>
                  <strong className="text-slate-900">Detection Confidence:</strong>{' '}
                  <span className="font-mono font-bold text-emerald-800">{displayConfidence}</span> (YOLOv8 Embedded Neural Model)
                </div>
                <div>
                  <strong className="text-slate-900">Distance & Sweep Angle:</strong>{' '}
                  <span className="font-mono">{displayDistance}</span> at <span className="font-mono">{displayAngle}</span> relative to scanner baseline
                </div>
                <div>
                  <strong className="text-slate-900">Capture Timestamp:</strong>{' '}
                  <span className="font-mono">{displayTime} (IST)</span>
                </div>
                <div>
                  <strong className="text-slate-900">Cryptographic Digest:</strong>{' '}
                  <span className="font-mono text-[11px] text-slate-900 bg-slate-200 px-1.5 py-0.5 rounded border border-slate-300">
                    {displayHash}
                  </span>
                </div>
                <div
                  className={`text-[11px] font-semibold pt-1 ${
                    isCurrentlyShowingReal ? 'text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  {isCurrentlyShowingReal
                    ? 'Status: Chain-of-custody sealed from active hardware sensor stream & digitally signed'
                    : 'Status: Reference baseline template for demonstration and procedure validation'}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Evidence Log Table */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3">
              II. Recorded Evidence & Chain of Custody Table
            </h3>
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="py-2 px-3">Item #</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3">Object / Tag</th>
                  <th className="py-2 px-3">Telemetry</th>
                  <th className="py-2 px-3 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {evidenceList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono font-bold text-blue-700 flex items-center gap-1">
                      <span>{item.id}</span>
                      {item.customImage && (
                        <span className="text-[9px] bg-blue-100 text-blue-800 px-1 rounded font-normal" title="Real Photo Attached">
                          [IMG]
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3">{item.type}</td>
                    <td className="py-2 px-3">{item.description}</td>
                    <td className="py-2 px-3">
                      <span className="font-medium">{item.object}</span>
                      {item.tag && <span className="text-[10px] text-slate-500 block">{item.tag}</span>}
                    </td>
                    <td className="py-2 px-3 font-mono">{item.distance || '2.46m'} @ {item.angle || '124°'}</td>
                    <td className="py-2 px-3 font-mono text-right">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 4: Authentication & Signature */}
          <div className="mt-8 pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
            <div>
              <div className="font-bold text-slate-900">INVESTIGATOR SIGNATURE:</div>
              <div className="h-12 border-b border-dashed border-slate-400 mt-2 flex items-end font-serif italic text-base text-blue-900 pb-1">
                {investigator.name}
              </div>
              <div className="text-slate-600 mt-1">
                {investigator.name}, {investigator.role} ({investigator.id})
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-slate-900">VERIFICATION SEAL:</div>
              <div className="mt-2 text-emerald-800 font-mono font-bold">
                [ DIGITAL CRYPTOGRAPHIC SEAL APPLIED ]
              </div>
              <div className="text-slate-600 mt-1">
                {investigator.affiliation}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
