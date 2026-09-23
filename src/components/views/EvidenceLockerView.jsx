import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Plus,
  Eye,
  Camera,
  Download,
  Filter,
  ShieldCheck,
  Hash,
  MapPin,
  Calendar
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const EvidenceLockerView = () => {
  const {
    evidenceList,
    setIsAddEvidenceOpen,
    setSelectedEvidence,
    setIsPrintReportOpen,
    captureEvidence
  } = useForensic();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredEvidence = evidenceList.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.object.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === 'ALL' || item.type.toUpperCase() === filterType.toUpperCase();

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A1428] p-4 rounded-xl border border-[#172E54]">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            Cryptographic Digital Evidence Locker & Chain of Custody
          </h2>
          <p className="text-xs text-slate-400">
            Immutable forensic storage with SHA-256 hashes and GPS geotagging
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddEvidenceOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Observation</span>
          </button>

          <button
            onClick={() => setIsPrintReportOpen(true)}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(30,96,213,0.4)] transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#081224] p-3 rounded-xl border border-[#162A4E]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, Object or Notes..."
            className="w-full bg-[#070E1B] border border-[#1A3866] pl-9 pr-3 py-1.5 rounded-lg text-xs text-white focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto w-full sm:w-auto">
          {['ALL', 'IMAGE', 'NOTE', 'TELEMETRY'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                filterType === type
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#0B1A33] text-slate-400 hover:text-white border border-[#162C50]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Evidence Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidence.map((item) => (
          <div
            key={item.id}
            className="cyber-panel p-4 flex flex-col justify-between space-y-3 group hover:border-cyan-500/60 transition-all"
          >
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-[#162A4E] pb-2">
              <span className="font-mono font-bold text-cyan-400 text-xs bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {item.id}
              </span>
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-cyan-400" />
                <span>{item.time}</span>
              </span>
            </div>

            {/* Thumbnail Preview for Images */}
            {item.type === 'Image' && (
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-[#1A3866] bg-black">
                <img
                  src={crimeSceneImg}
                  alt="Evidence Item"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-black/70 text-cyan-300 text-[9px] font-mono px-2 py-0.5 rounded border border-cyan-500/30">
                  {item.object}
                </div>
              </div>
            )}

            {/* Description & Metadata */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.description}
              </h4>
              <div className="text-slate-400 font-mono text-[11px] flex justify-between">
                <span>Classification: <strong className="text-slate-200">{item.object}</strong></span>
                <span>Type: <strong className="text-cyan-400">{item.type}</strong></span>
              </div>
              <div className="text-slate-400 font-mono text-[11px] flex justify-between">
                <span>Distance / Angle: <strong className="text-slate-200">{item.distance || '2.46m'} @ {item.angle || '124°'}</strong></span>
                <span>Tag: <strong className="text-emerald-400">{item.tag || 'Field'}</strong></span>
              </div>
            </div>

            {/* Hash Stamp & Inspector Button */}
            <div className="pt-2 border-t border-[#162A4E] flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono text-slate-500 truncate max-w-[150px]">
                {item.hash || 'sha256:8f4c2e...'}
              </span>

              <button
                onClick={() => setSelectedEvidence(item)}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
