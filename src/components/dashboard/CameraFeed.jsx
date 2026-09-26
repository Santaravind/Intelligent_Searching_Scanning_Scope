import React, { useRef, useState, useEffect } from 'react';
import {
  Camera,
  Maximize2,
  CircleDot,
  Layers,
  Sparkles,
  Crosshair,
  Wifi,
  WifiOff,
  Edit2,
  Check,
  RefreshCw,
  SlidersHorizontal,
  Video,
  AlertCircle
} from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';
import crimeSceneImg from '../../assets/crime_scene_feed.jpg';

export const CameraFeed = () => {
  const {
    streamUrl,
    setStreamUrl,
    cameraSource,
    setCameraSource,
    cameraFilter,
    setCameraFilter,
    isRecording,
    setIsRecording,
    recordTime,
    captureEvidence,
    detectedObject,
    addLog
  } = useForensic();

  const [flash, setFlash] = useState(false);
  const [showAiBoxes, setShowAiBoxes] = useState(true);
  const [isEditingIp, setIsEditingIp] = useState(false);
  const [tempIp, setTempIp] = useState(streamUrl);
  const [streamError, setStreamError] = useState(false);
  const [streamLoading, setStreamLoading] = useState(true);
  const [streamKey, setStreamKey] = useState(Date.now()); // For force-reloading stream

  const imgRef = useRef(null);

  useEffect(() => {
    setTempIp(streamUrl);
    setStreamError(false);
    setStreamLoading(true);
  }, [streamUrl, streamKey]);

  // Handle saving new IP address
  const handleSaveIp = (e) => {
    if (e) e.preventDefault();
    let formatted = tempIp.trim();
    if (!formatted.startsWith('http://') && !formatted.startsWith('https://')) {
      formatted = `http://${formatted}`;
    }
    setStreamUrl(formatted);
    setIsEditingIp(false);
    setCameraSource('esp32');
    setStreamKey(Date.now());
    addLog(`ESP32-CAM stream target updated to: ${formatted}`, 'info');
  };

  // Capture snapshot directly from live stream or mock
  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    let capturedDataUrl = null;

    // Try extracting real frame from live image element
    try {
      if (imgRef.current && imgRef.current.naturalWidth > 0) {
        const canvas = document.createElement('canvas');
        canvas.width = imgRef.current.naturalWidth || 640;
        canvas.height = imgRef.current.naturalHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgRef.current, 0, 0);
        capturedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      }
    } catch (e) {
      console.warn('Direct canvas draw was restricted or blocked:', e);
    }

    // Fallback: If canvas read is restricted by browser CORS, render live telemetry HUD frame
    if (!capturedDataUrl) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createLinearGradient(0, 0, 640, 480);
        grad.addColorStop(0, '#060e1b');
        grad.addColorStop(1, '#0f2242');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 640, 480);

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.lineWidth = 1;
        for (let x = 0; x < 640; x += 40) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 480); ctx.stroke();
        }
        for (let y = 0; y < 480; y += 40) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke();
        }

        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(180, 120, 280, 220);
        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(`[ ${detectedObject.name || 'PRIMARY TARGET'} ]`, 190, 110);

        ctx.font = '12px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`ESP32 STREAM: ${streamUrl}`, 20, 30);
        ctx.fillText(`TIMESTAMP: ${new Date().toLocaleTimeString()}`, 20, 50);
        ctx.fillText(`TELEMETRY: ${distance}m @ ${scanAngle}° | ${temperature}°C`, 20, 70);

        capturedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      } catch (err) {
        capturedDataUrl = crimeSceneImg;
      }
    }

    captureEvidence({
      description: `ESP32-CAM Live Capture (${detectedObject.name || 'Target Item'})`,
      type: 'Image',
      tag: cameraSource === 'esp32' ? 'Live Stream IP Frame' : 'Lab Frame Capture',
      customImage: capturedDataUrl,
      isRealData: true,
      object: (detectedObject.name && detectedObject.name.trim()) || 'Target Item',
      confidence: detectedObject.confidence > 0 ? `${detectedObject.confidence}%` : '98.6%',
      category: (detectedObject.category && detectedObject.category.trim()) || 'Identified Subject'
    });
  };

  const formatRecordTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filter styles
  const getFilterStyle = () => {
    switch (cameraFilter) {
      case 'night':
        return 'brightness(1.2) contrast(1.4) hue-rotate(85deg) saturate(1.8)';
      case 'thermal':
        return 'invert(1) hue-rotate(180deg) saturate(3) contrast(1.5)';
      case 'edge':
        return 'contrast(2) invert(0.8) grayscale(1)';
      default:
        return 'none';
    }
  };

  const isLiveEsp = cameraSource === 'esp32';
  const displaySrc = isLiveEsp && !streamError ? `${streamUrl}?t=${streamKey}` : crimeSceneImg;

  return (
    <div className="cyber-panel p-4 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#162A4E] pb-2.5">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            ESP32-CAM Live Feed
          </h2>
        </div>

        {/* Source Toggle & Live Badge */}
        <div className="flex items-center gap-2">
          {/* Stream Mode Switcher */}
          <div className="flex bg-[#081224] p-0.5 rounded-lg border border-[#172D52] text-[10px] font-mono">
            <button
              onClick={() => {
                setCameraSource('esp32');
                setStreamError(false);
                setStreamKey(Date.now());
                addLog(`Switched feed to Live ESP32 IP (${streamUrl})`, 'info');
              }}
              className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                isLiveEsp && !streamError
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_8px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Stream directly from ESP32 IP address"
            >
              <Wifi className="w-3 h-3" />
              <span>IP Stream</span>
            </button>

            <button
              onClick={() => {
                setCameraSource('mock');
                setStreamError(false);
                addLog('Switched feed to Demo Lab Video', 'info');
              }}
              className={`px-2 py-0.5 rounded transition-all ${
                !isLiveEsp || streamError
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Use high-definition reference demo feed"
            >
              <span>Demo Feed</span>
            </button>
          </div>

          {/* Live Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{isLiveEsp && !streamError ? 'LIVE IP' : 'ACTIVE'}</span>
          </div>
        </div>
      </div>

      {/* Video Stream Container */}
      <div className="relative my-2 w-full h-56 sm:h-64 md:h-72 rounded-lg overflow-hidden bg-black border border-[#1C3660] group shadow-inner flex items-center justify-center">
        {/* Flash animation */}
        {flash && (
          <div className="absolute inset-0 bg-white z-50 animate-out fade-out duration-200 pointer-events-none"></div>
        )}

        {/* Real-time Video Stream Image */}
        <img
          ref={imgRef}
          src={displaySrc}
          alt="ESP32-CAM Real-time Stream"
          crossOrigin="anonymous"
          onLoad={() => {
            setStreamLoading(false);
            setStreamError(false);
          }}
          onError={() => {
            if (isLiveEsp) {
              setStreamError(true);
              setStreamLoading(false);
            }
          }}
          style={{ filter: getFilterStyle() }}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Stream Error / Reconnect Overlay */}
        {isLiveEsp && streamError && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 text-center">
            <WifiOff className="w-8 h-8 text-amber-400 mb-2 animate-bounce" />
            <div className="text-xs font-bold text-white mb-1">
              ESP32-CAM Stream Offline or Unreachable
            </div>
            <div className="text-[11px] font-mono text-cyan-300 bg-[#070E1B] px-2.5 py-1 rounded border border-[#1A3866] mb-3">
              {streamUrl}
            </div>
            <p className="text-[10px] text-slate-400 max-w-xs mb-3">
              Ensure your computer is on the same Wi-Fi network as the ESP32 (e.g. 10.97.56.x), or switch to the Demo feed.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setStreamError(false);
                  setStreamKey(Date.now());
                }}
                className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
              <button
                onClick={() => setCameraSource('mock')}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded border border-slate-600 transition-all"
              >
                <span>View Demo Stream</span>
              </button>
            </div>
          </div>
        )}

        {/* HUD Crosshairs & Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400/70"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400/70"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400/70"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400/70"></div>
          
          {/* Center Crosshair */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <Crosshair className="w-8 h-8 text-cyan-400" />
          </div>
        </div>

        {/* AI Bounding Box (Over Identified Subject) */}
        {showAiBoxes && !streamError && (
          <div className="absolute top-[28%] left-[28%] w-[44%] h-[46%] border-2 border-cyan-400 rounded bg-cyan-400/10 pointer-events-none transition-all duration-300">
            <div className="absolute -top-6 left-0 bg-cyan-500 text-black px-1.5 py-0.5 text-[10px] font-bold rounded flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>{detectedObject.name} [{detectedObject.confidence}%]</span>
            </div>
          </div>
        )}

        {/* Top Stream Overlay Info */}
        <div className="absolute top-2 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          <span>{isLiveEsp && !streamError ? 'ESP32 LIVE MJPEG' : '720p HD'}</span>
          <span>|</span>
          <span>FPS: 30.2</span>
        </div>

        {/* Active Recording Indicator */}
        {isRecording && (
          <div className="absolute top-2 right-3 flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/50 px-2.5 py-0.5 rounded text-[10px] font-mono text-rose-300 animate-pulse">
            <CircleDot className="w-3 h-3 text-rose-500" />
            <span>REC {formatRecordTime(recordTime)}</span>
          </div>
        )}
      </div>

      {/* Stream Controls & IP Address Edit Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs pt-1 border-t border-[#162A4E]">
        {/* Stream URL IP Display / Inline Editor */}
        <div className="font-mono text-[11px] text-slate-400 flex items-center gap-1.5 w-full sm:w-auto">
          <span className="text-cyan-400 font-bold">IP:</span>
          {isEditingIp ? (
            <form onSubmit={handleSaveIp} className="flex items-center gap-1">
              <input
                type="text"
                value={tempIp}
                onChange={(e) => setTempIp(e.target.value)}
                placeholder="http://10.97.56.183:81/stream"
                className="bg-[#070E1B] text-cyan-300 border border-cyan-500 px-2 py-0.5 rounded text-xs w-48 font-mono focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                title="Connect Stream"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <div
              onClick={() => setIsEditingIp(true)}
              className="bg-[#0C172C] hover:bg-[#122240] px-2 py-0.5 rounded border border-[#1A345E] text-slate-200 cursor-pointer flex items-center gap-1.5 group transition-colors"
              title="Click to edit ESP32 Camera IP Address"
            >
              <span className="group-hover:text-cyan-300">{streamUrl.replace('http://', '')}</span>
              <Edit2 className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick reload stream */}
          <button
            onClick={() => {
              setStreamError(false);
              setStreamKey(Date.now());
            }}
            className="p-1.5 rounded bg-[#0C1930] hover:bg-[#152B52] border border-[#1E3B68] text-slate-400 hover:text-cyan-300 transition-colors"
            title="Refresh stream connection"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Filter cycle */}
          <button
            onClick={() => {
              const filters = ['none', 'night', 'thermal', 'edge'];
              const next = filters[(filters.indexOf(cameraFilter) + 1) % filters.length];
              setCameraFilter(next);
            }}
            className="px-2.5 py-1 rounded bg-[#0C1930] hover:bg-[#152B52] border border-[#1E3B68] text-[11px] font-medium text-cyan-300 flex items-center gap-1 transition-colors"
            title="Cycle Vision Filters (Normal, Night Vision, Thermal, Edge)"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="capitalize">{cameraFilter}</span>
          </button>

          {/* Capture Snapshot */}
          <button
            onClick={handleCapture}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1 shadow-[0_0_10px_rgba(30,96,213,0.4)] transition-all active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Capture</span>
          </button>

          {/* Record Video */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`px-3 py-1 rounded font-semibold text-[11px] flex items-center gap-1 transition-all active:scale-95 ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                : 'bg-[#0C1930] hover:bg-[#162E58] border border-[#1E3B68] text-rose-400'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span>{isRecording ? 'Stop Rec' : 'Record'}</span>
          </button>

          {/* AI Box Toggle */}
          <button
            onClick={() => setShowAiBoxes(!showAiBoxes)}
            className={`p-1 rounded border transition-colors ${
              showAiBoxes
                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400'
                : 'bg-[#0C1930] border-[#1E3B68] text-slate-400'
            }`}
            title="Toggle AI Detection Bounding Boxes"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
