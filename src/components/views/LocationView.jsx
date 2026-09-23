import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Compass, Layers, Globe, Radio } from 'lucide-react';
import { useForensic } from '../../context/ForensicContext';

// Fix Leaflet Default Icon in React
const customMarker = new L.DivIcon({
  className: 'custom-pin',
  html: `<div style="
    width: 24px;
    height: 24px;
    background: #00f0ff;
    border-radius: 50%;
    border: 3px solid #ffffff;
    box-shadow: 0 0 15px #00f0ff, 0 0 25px #00f0ff;
    display: flex;
    align-items: center;
    justify-content: center;
  "><div style="width: 6px; height: 6px; background: #050b14; border-radius: 50%;"></div></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export const LocationView = () => {
  const { location } = useForensic();
  const [mapType, setMapType] = useState('dark'); // 'dark' | 'osm' | 'satellite'

  const getTileUrl = () => {
    if (mapType === 'satellite') {
      return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }
    if (mapType === 'dark') {
      return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    }
    return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  };

  const center = [location.latitude, location.longitude];

  return (
    <div className="space-y-4 p-4 max-w-[1920px] mx-auto animate-in fade-in duration-300 select-none">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0A1428] p-4 rounded-xl border border-[#172E54]">
        <div>
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Geographical Information System (GIS) Crime Scene Mapping
          </h2>
          <p className="text-xs text-slate-400">
            Real-time GNSS Satellite Positioning & Forensic Geo-Fencing Perimeter
          </p>
        </div>

        {/* Map Style Switcher */}
        <div className="flex items-center gap-2 bg-[#070E1B] p-1 rounded-lg border border-[#1A3866]">
          <button
            onClick={() => setMapType('dark')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              mapType === 'dark' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Cyber Dark
          </button>
          <button
            onClick={() => setMapType('satellite')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              mapType === 'satellite' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Satellite
          </button>
          <button
            onClick={() => setMapType('osm')}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              mapType === 'osm' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Street Map
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Main Leaflet Map View */}
        <div className="lg:col-span-8 cyber-panel p-4 flex flex-col justify-between">
          <div className="w-full h-80 sm:h-[460px] rounded-xl overflow-hidden border border-[#1A3866] relative z-0">
            <MapContainer
              center={center}
              zoom={16}
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a> / OpenStreetMap'
                url={getTileUrl()}
              />

              {/* Crime Scene Marker */}
              <Marker position={center} icon={customMarker}>
                <Popup>
                  <div className="p-1 text-slate-900 font-sans">
                    <strong className="text-blue-600 block">Active Forensic Device</strong>
                    <span>Bundelkhand University, Jhansi</span>
                    <br />
                    <span className="font-mono text-xs">25.4531° N, 78.5695° E</span>
                  </div>
                </Popup>
              </Marker>

              {/* Forensic Perimeter Radius (50m) */}
              <Circle
                center={center}
                radius={50}
                pathOptions={{
                  color: '#00f0ff',
                  fillColor: '#00f0ff',
                  fillOpacity: 0.15,
                  weight: 2,
                  dashArray: '4, 4'
                }}
              />
            </MapContainer>
          </div>

          <div className="flex justify-between items-center text-xs font-mono pt-3 mt-2 border-t border-[#162A4E] text-slate-300">
            <span>Grid Reference: <strong>UTM 43R 658100 2816200</strong></span>
            <span>Elevation: <strong className="text-cyan-400">{location.altitude}</strong></span>
          </div>
        </div>

        {/* GPS Telemetry Metadata */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="cyber-panel p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 border-b border-[#162A4E] pb-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              GNSS Telemetry Status
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52]">
                <div className="text-[10px] font-sans text-slate-400 uppercase">Latitude</div>
                <div className="text-base font-bold text-white mt-0.5">{location.latitude}° N</div>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52]">
                <div className="text-[10px] font-sans text-slate-400 uppercase">Longitude</div>
                <div className="text-base font-bold text-white mt-0.5">{location.longitude}° E</div>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52] flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-sans text-slate-400 uppercase">Horizontal Accuracy</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">± {location.accuracy} meters</div>
                </div>
                <div>
                  <div className="text-[10px] font-sans text-slate-400 uppercase">Satellites Locked</div>
                  <div className="text-sm font-bold text-cyan-300 mt-0.5">{location.satellites} Fixed (GPS/NavIC)</div>
                </div>
              </div>

              <div className="bg-[#070E1B] p-3 rounded-lg border border-[#172D52]">
                <div className="text-[10px] font-sans text-slate-400 uppercase">Location Designation</div>
                <div className="text-xs font-semibold text-slate-200 mt-0.5">{location.name}</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
