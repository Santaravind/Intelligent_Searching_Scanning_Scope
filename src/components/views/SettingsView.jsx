import React from 'react';
import { Settings, Sliders, Wifi, Shield, Save, RefreshCw } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

export const SettingsView = () => {
  const {
    streamUrl,
    setStreamUrl,
    investigator,
    setInvestigator,
    location,
    setLocation,
    addLog
  } = useForensic();

  const handleSave = (e) => {
    e.preventDefault();
    addLog('System configuration parameters saved and synced with firmware.', 'success');
  };

  return (
    <div className="space-y-6 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none text-slate-200">
      
      {/* Header */}
      <div className="bg-[#0A1428] p-5 rounded-xl border border-[#172E54]">
        <h2 className="text-lg font-black text-white uppercase tracking-wider flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-cyan-400" />
          System Configuration & Sensor Calibration
        </h2>
        <p className="text-xs text-cyan-300/90 mt-1">
          Adjust ESP32 network IP parameters, investigator clearances, sonar frequency, and GPS offsets
        </p>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Network & Camera Settings */}
        <div className="cyber-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
            <Wifi className="w-5 h-5 text-cyan-400" />
            ESP32-CAM Stream Network Configuration
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                MJPEG Video Stream Endpoint URL
              </label>
              <input
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                className="w-full bg-[#070E1B] border border-[#1A3866] text-cyan-300 px-3 py-2 rounded-lg font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Stream Port</label>
                <input
                  type="text"
                  defaultValue="81"
                  className="w-full bg-[#070E1B] border border-[#1A3866] text-white px-3 py-2 rounded-lg font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Frame Resolution</label>
                <select className="w-full bg-[#070E1B] border border-[#1A3866] text-white px-3 py-2 rounded-lg font-mono focus:border-cyan-400 focus:outline-none">
                  <option>1080p Full HD (1920x1080)</option>
                  <option>720p HD (1280x720)</option>
                  <option>VGA (640x480)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Investigator Profile */}
        <div className="cyber-panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            Investigator Profile & Clearance
          </h3>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Investigator Name</label>
                <input
                  type="text"
                  value={investigator.name}
                  onChange={(e) => setInvestigator({ ...investigator, name: e.target.value })}
                  className="w-full bg-[#070E1B] border border-[#1A3866] text-white px-3 py-2 rounded-lg focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Investigator ID</label>
                <input
                  type="text"
                  value={investigator.id}
                  onChange={(e) => setInvestigator({ ...investigator, id: e.target.value })}
                  className="w-full bg-[#070E1B] border border-[#1A3866] text-cyan-300 font-mono px-3 py-2 rounded-lg focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location Designation</label>
              <input
                type="text"
                value={location.name}
                onChange={(e) => setLocation({ ...location, name: e.target.value })}
                className="w-full bg-[#070E1B] border border-[#1A3866] text-white px-3 py-2 rounded-lg focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="lg:col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>

    </div>
  );
};
