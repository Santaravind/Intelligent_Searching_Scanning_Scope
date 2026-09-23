import React, { useState } from 'react';
import { X, Plus, FileText, Camera, Tag, MapPin } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const AddEvidenceModal = () => {
  const {
    isAddEvidenceOpen,
    setIsAddEvidenceOpen,
    captureEvidence,
    distance,
    scanAngle,
    location,
    detectedObject
  } = useForensic();

  const [description, setDescription] = useState('');
  const [type, setType] = useState('Note');
  const [tag, setTag] = useState('Field Note');
  const [objectName, setObjectName] = useState(detectedObject.name);

  if (!isAddEvidenceOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    captureEvidence({
      description: description || 'Field Observation Logged',
      type,
      tag,
      object: objectName,
    });
    setDescription('');
    setIsAddEvidenceOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A1428] border border-[#1E3B68] rounded-2xl w-full max-w-lg overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.25)] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#162A4E] bg-[#070E1B]">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Add Forensic Observation / Evidence
            </h3>
          </div>
          <button
            onClick={() => setIsAddEvidenceOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Evidence Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#070E1B] border border-[#1A3763] rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
            >
              <option value="Image">Image / Visual Capture</option>
              <option value="Note">Field Observation / Note</option>
              <option value="Telemetry">Sonar & Telemetry Grid</option>
              <option value="Thermal">Thermal & Infrared Scan</option>
              <option value="Bio">Biometric / Identity Match</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">
              Description / Observation Notes
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter detailed forensic description, physical markers, ambient conditions..."
              className="w-full bg-[#070E1B] border border-[#1A3763] rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Identified Object / Target
              </label>
              <input
                type="text"
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                className="w-full bg-[#070E1B] border border-[#1A3763] rounded-lg px-3 py-2 text-white font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Evidence Tag
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. Primary, Secondary, Trace"
                className="w-full bg-[#070E1B] border border-[#1A3763] rounded-lg px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Telemetry Snapshot Attached */}
          <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52] space-y-1 text-slate-400 font-mono text-[11px]">
            <div className="text-cyan-400 font-sans font-bold text-xs mb-1">
              Attached Sensor Telemetry (Auto-Stamped)
            </div>
            <div className="flex justify-between">
              <span>Current Angle / Distance:</span>
              <span className="text-white font-bold">{scanAngle}° | {distance} m</span>
            </div>
            <div className="flex justify-between">
              <span>Location:</span>
              <span className="text-slate-300 truncate max-w-[240px]">{location.name}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#162A4E]">
            <button
              type="button"
              onClick={() => setIsAddEvidenceOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Record to Vault</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
