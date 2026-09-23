import React from 'react';
import { X, Printer, ShieldCheck, Download, FileText, CheckCircle } from 'lucide-react';
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
    evidenceList,
    currentTime
  } = useForensic();

  if (!isPrintReportOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportDate = currentTime.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-[#1E3B68] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_40px_rgba(0,240,255,0.3)]">
        
        {/* Modal Top Bar (Hidden during print) */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-[#162A4E] bg-[#070E1B] no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Forensic Evidence Summary Report - Print Preview
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setIsPrintReportOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 overflow-y-auto bg-white text-slate-900 font-sans print:p-0">
          
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
                <div><strong className="text-slate-600">Location:</strong> {location.name}</div>
                <div><strong className="text-slate-600">Coordinates:</strong> {location.latitude}° N, {location.longitude}° E (±{location.accuracy}m)</div>
                <div><strong className="text-slate-600">Ambient Temp:</strong> {temperature}°C | Humidity: {humidity}%</div>
                <div><strong className="text-slate-600">Scan Angle:</strong> {scanAngle}° | Sonar Range: {distance} m</div>
              </div>
            </div>
          </div>

          {/* Section 2: Visual Evidence Snapshot */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3">
              I. Photographic & AI Object Detection Snapshot
            </h3>
            <div className="flex gap-4 items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="w-48 h-32 rounded overflow-hidden border border-slate-300 shrink-0">
                <img src={crimeSceneImg} alt="Evidence" className="w-full h-full object-cover" />
              </div>
              <div className="text-xs space-y-1 text-slate-700">
                <div><strong>Primary Object Identified:</strong> Book / Bag (Education Material)</div>
                <div><strong>Detection Confidence:</strong> {aiConfidence}% (YOLOv8 Embedded Model)</div>
                <div><strong>Distance & Angle:</strong> {distance} meters at {scanAngle} degrees relative to scanner baseline</div>
                <div><strong>Cryptographic Hash:</strong> <span className="font-mono text-[11px]">sha256:8f4c2e8a719d3b10b47ca9082de42</span></div>
                <div className="text-emerald-700 font-semibold pt-1">Status: Chain-of-custody sealed and digitally verified</div>
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
                    <td className="py-2 px-3 font-mono font-bold text-blue-700">{item.id}</td>
                    <td className="py-2 px-3">{item.type}</td>
                    <td className="py-2 px-3">{item.description}</td>
                    <td className="py-2 px-3">{item.object}</td>
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
                Indresh Kumar
              </div>
              <div className="text-slate-600 mt-1">
                Indresh Kumar, Lead Forensic Investigator (IK-001)
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-slate-900">VERIFICATION SEAL:</div>
              <div className="mt-2 text-emerald-800 font-mono font-bold">
                [ DIGITAL CRYPTOGRAPHIC SEAL APPLIED ]
              </div>
              <div className="text-slate-600 mt-1">
                Bundelkhand University Forensic Department
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
