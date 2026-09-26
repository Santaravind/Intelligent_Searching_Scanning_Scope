import React from 'react';
import { Eye, FileText, ExternalLink } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const EvidencePreviewCard = () => {
  const { evidenceList, setSelectedEvidence, lastCapturedImage, lastCapturedData } = useForensic();
  const primaryEvidence = evidenceList[0] || {
    id: 'EV-001',
    object: 'Book / Bag (Nearby)',
    distance: '2.46 m',
    angle: '124°',
    time: '21:45:32',
    category: 'Education Material'
  };

  const previewImage = primaryEvidence.customImage || lastCapturedImage || crimeSceneImg;

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Digital Evidence Preview
          </h2>
        </div>
        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-[#0A1A33] px-2 py-0.5 rounded border border-[#173562]">
          {primaryEvidence.id}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center my-auto py-2">
        {/* Evidence Thumbnail */}
        <div className="sm:col-span-5 relative h-20 rounded-lg overflow-hidden border border-[#1C3660] bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)] group flex items-center justify-center">
          <img
            src={previewImage}
            alt="Evidence Snapshot"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-1 left-1 bg-black/70 text-cyan-300 font-mono text-[9px] px-1 rounded border border-cyan-500/30">
            {primaryEvidence.id}
          </div>
          {(primaryEvidence.customImage || primaryEvidence.isRealData) && (
            <div className="absolute bottom-1 right-1 bg-emerald-950/80 text-emerald-300 font-mono text-[8px] px-1 rounded border border-emerald-500/40">
              LIVE
            </div>
          )}
        </div>

        {/* Evidence Metadata */}
        <div className="sm:col-span-7 space-y-1 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-sans text-[11px]">Object</span>
            <span className="text-slate-200 font-bold truncate">: {primaryEvidence.object}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-sans text-[11px]">Distance</span>
            <span className="text-cyan-300 font-bold">: {primaryEvidence.distance}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-sans text-[11px]">Angle</span>
            <span className="text-cyan-300 font-bold">: {primaryEvidence.angle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-sans text-[11px]">Time</span>
            <span className="text-slate-300">: {primaryEvidence.time}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-[#162A4E] flex justify-end">
        <button
          onClick={() => setSelectedEvidence(primaryEvidence)}
          className="w-full sm:w-auto px-4 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(30,96,213,0.4)] transition-all active:scale-95"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
      </div>
    </div>
  );
};
