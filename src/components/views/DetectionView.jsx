import React, { useState } from 'react';
import { ScanSearch, Sparkles, Box, ShieldCheck, Tag, Upload, RefreshCw } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const DetectionView = () => {
  const { detectedObject, setDetectedObject, aiConfidence, setAiConfidence, addLog } = useForensic();
  const [threshold, setThreshold] = useState(70);

  const testClasses = [
    { name: 'Book / Bag', category: 'Education Material', conf: 92.4 },
    { name: 'Microcontroller Breadboard', category: 'Electronic Hardware', conf: 96.8 },
    { name: 'Laptop Keyboard', category: 'Computing Equipment', conf: 94.1 },
    { name: 'Evidence Marker #2', category: 'Forensic Marker', conf: 98.2 },
  ];

  const handleClassSelect = (item) => {
    setDetectedObject({
      name: item.name,
      category: item.category,
      confidence: item.conf,
      box: { x: 30, y: 20, w: 40, h: 40 }
    });
    setAiConfidence(item.conf);
    addLog(`AI Model classified target as [${item.name}] with ${item.conf}% confidence`, 'success');
  };

  return (
    <div className="space-y-4 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A1428] p-4 rounded-xl border border-[#172E54]">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ScanSearch className="w-5 h-5 text-cyan-400" />
            AI Computer Vision & Object Identification Laboratory
          </h2>
          <p className="text-xs text-slate-400">
            Real-time YOLOv8 Embedded Neural Network Inference Engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#070E1B] border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-mono">
            <span>INFERENCE: </span>
            <span className="font-bold text-cyan-300">18.4 ms</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Detection Viewport */}
        <div className="lg:col-span-8 cyber-panel p-4 flex flex-col justify-between">
          <div className="relative w-full h-80 sm:h-[440px] rounded-xl overflow-hidden bg-black border border-[#1A3866] flex items-center justify-center group shadow-lg">
            <img
              src={crimeSceneImg}
              alt="Object Detection Field"
              className="w-full h-full object-cover"
            />

            {/* Bounding Box for Book */}
            <div className="absolute top-[28%] left-[28%] w-[44%] h-[46%] border-2 border-cyan-400 bg-cyan-400/10 pointer-events-none transition-all duration-300">
              <div className="absolute -top-7 left-0 bg-cyan-500 text-black px-2 py-0.5 text-xs font-bold rounded flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{detectedObject.name} [{detectedObject.confidence}%]</span>
              </div>
            </div>

            {/* Secondary Bounding Box for Circuit Board */}
            <div className="absolute top-[68%] left-[24%] w-[50%] h-[24%] border-2 border-emerald-400/80 bg-emerald-500/10 pointer-events-none">
              <div className="absolute -top-6 left-0 bg-emerald-500 text-black px-2 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 shadow">
                <span>Breadboard Circuit [96.8%]</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono pt-3 mt-2 border-t border-[#162A4E] text-slate-300">
            <span>Active Model: <strong>YOLOv8-Nano-Forensic</strong></span>
            <span>Objects Detected: <strong className="text-cyan-400">2 In-Frame</strong></span>
          </div>
        </div>

        {/* AI Control Suite & Class Selector */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Object Card */}
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Box className="w-4 h-4 text-cyan-400" />
              Primary Object Classification
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52]">
                <div className="text-[10px] font-sans text-slate-400 uppercase">Label</div>
                <div className="text-lg font-bold text-white mt-0.5">{detectedObject.name}</div>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52]">
                <div className="text-[10px] font-sans text-slate-400 uppercase">Category</div>
                <div className="text-sm font-bold text-cyan-300 mt-0.5">{detectedObject.category}</div>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52]">
                <div className="text-[10px] font-sans text-slate-400 uppercase">Confidence Score</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">{detectedObject.confidence}%</div>
              </div>
            </div>
          </div>

          {/* Quick Object Classifier Simulator */}
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Tag className="w-4 h-4 text-cyan-400" />
              Simulate Detected Class
            </h3>

            <div className="space-y-2">
              {testClasses.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleClassSelect(item)}
                  className={`w-full p-2.5 rounded-lg text-xs font-medium border text-left transition-all flex items-center justify-between ${
                    detectedObject.name === item.name
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                      : 'bg-[#070E1B] border-[#162D52] text-slate-300 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">{item.category}</div>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">{item.conf}%</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
