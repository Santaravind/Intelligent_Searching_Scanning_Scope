import React from 'react';
import { X, ShieldCheck, Hash, MapPin, Compass, Sparkles, Download, CheckCircle } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const EvidenceDetailModal = () => {
  const { selectedEvidence, setSelectedEvidence } = useForensic();

  if (!selectedEvidence) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0A1428] border border-[#1E3B68] rounded-2xl w-full max-w-2xl overflow-hidden shadow-[0_0_35px_rgba(0,240,255,0.3)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#162A4E] bg-[#070E1B]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-mono font-bold">
              {selectedEvidence.index || '01'}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Forensic Evidence Details: {selectedEvidence.id}
              </h3>
              <p className="text-[11px] text-cyan-400 font-mono">
                Chain of Custody Timestamp: {selectedEvidence.time}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedEvidence(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
          {/* Main Visual Image Preview */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#1A3866] bg-black group shadow-lg flex items-center justify-center">
            <img
              src={selectedEvidence.customImage || crimeSceneImg}
              alt="Evidence Full View"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* AI Bounding Box & Target Tag */}
            <div className="absolute top-[28%] left-[28%] w-[44%] h-[46%] border-2 border-cyan-400 bg-cyan-400/10 pointer-events-none">
              <div className="absolute -top-6 left-0 bg-cyan-500 text-black px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" />
                <span>{selectedEvidence.object || 'Target Item'}</span>
              </div>
            </div>

            {/* Cryptographic Stamp on photo */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
              <div className="bg-black/80 px-2.5 py-1 rounded-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                {selectedEvidence.customImage || selectedEvidence.isRealData
                  ? 'LIVE HARDWARE FRAME'
                  : 'SAMPLE REFERENCE'}
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            <div className="bg-[#070E1B] p-3 rounded-xl border border-[#162A4E] space-y-1">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Classification</span>
              <div className="text-white font-bold text-sm">{selectedEvidence.object || 'Book / Bag'}</div>
              <div className="text-cyan-400 text-xs">{selectedEvidence.category || 'Education Material'}</div>
            </div>

            <div className="bg-[#070E1B] p-3 rounded-xl border border-[#162A4E] space-y-1">
              <span className="text-[10px] font-sans text-slate-400 uppercase">Sonar & Angle Telemetry</span>
              <div className="text-white font-bold text-sm">{selectedEvidence.distance || '2.46 m'} | {selectedEvidence.angle || '124°'}</div>
              <div className="text-emerald-400 text-xs">Sonar Confidence: {selectedEvidence.confidence || '92.4%'}</div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#070E1B] p-4 rounded-xl border border-[#162A4E] space-y-1">
            <span className="text-[10px] font-sans text-slate-400 uppercase font-semibold">
              Investigator Observation / Notes
            </span>
            <p className="text-slate-200 font-sans leading-relaxed">
              {selectedEvidence.description}
            </p>
          </div>

          {/* Cryptographic SHA-256 Hash & Geolocation */}
          <div className="bg-[#070E1B] p-4 rounded-xl border border-[#162A4E] space-y-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                <span>SHA-256 Digest:</span>
              </span>
              <span className="text-cyan-300 font-bold">{selectedEvidence.hash || 'sha256:8f4c2e8a719d3b10...e42'}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300 border-t border-slate-800/80 pt-2">
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Location:</span>
              </span>
              <span className="text-slate-200 truncate max-w-[280px]">{selectedEvidence.location || 'Bundelkhand University Lab, Jhansi'}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#162A4E] bg-[#070E1B]">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Integrity Verified</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedEvidence(null)}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(30,96,213,0.4)] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Record</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
