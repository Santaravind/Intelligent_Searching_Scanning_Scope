import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_INVESTIGATOR,
  INITIAL_EVIDENCE_LIST,
  INITIAL_ACTIVITY_LOGS,
  OPERATIONAL_SEQUENCE,
  INITIAL_TEMPERATURE_HISTORY,
  RADAR_BLIPS
} from '../utils/mockData';

const ForensicContext = createContext();

export const ForensicProvider = ({ children }) => {
  // Navigation
  const [activeView, setActiveView] = useState('dashboard');
  
  // Investigator Info
  const [investigator, setInvestigator] = useState(INITIAL_INVESTIGATOR);
  
  // ESP32-CAM Feed & Stream Config
  const [streamUrl, setStreamUrl] = useState('http://10.97.56.183:81/stream');
  const [cameraSource, setCameraSource] = useState('esp32'); // 'esp32' | 'mock' | 'webcam'
  const [cameraFilter, setCameraFilter] = useState('none'); // 'none' | 'night' | 'thermal' | 'edge' | 'grid'
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  
  // Real-time Telemetry
  const [distance, setDistance] = useState(2.46);
  const [scanAngle, setScanAngle] = useState(124);
  const [temperature, setTemperature] = useState(27.4);
  const [humidity, setHumidity] = useState(52.8);
  const [aiConfidence, setAiConfidence] = useState(98.6);
  const [humanDetected, setHumanDetected] = useState(false);
  const [humanConfidence, setHumanConfidence] = useState(98.6);
  const [detectedObject, setDetectedObject] = useState({
    name: 'Book / Bag',
    confidence: 92.4,
    category: 'Education Material',
    box: { x: 35, y: 15, w: 30, h: 40 }
  });
  
  // GPS Location
  const [location, setLocation] = useState({
    latitude: 25.4531,
    longitude: 78.5695,
    name: 'Bundelkhand University, Jhansi, Uttar Pradesh, India',
    accuracy: 3,
    satellites: 9,
    altitude: '214 m MSL'
  });

  // System Matrix Status
  const [systemStatus, setSystemStatus] = useState({
    device: 'Online',
    rfid: 'Connected',
    gps: 'Connected',
    aiCamera: 'Active',
    ultrasonic: 'Active',
    temperature: 'Normal',
    locationTrack: 'Active'
  });

  // Security
  const [securityStatus, setSecurityStatus] = useState({
    authorized: true,
    rfidVerified: true,
    deviceLock: true,
    encryption: true,
    unauthorizedAlert: false
  });

  // Evidence & Logs
  const [evidenceList, setEvidenceList] = useState(INITIAL_EVIDENCE_LIST);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOGS);
  const [tempHistory, setTempHistory] = useState(INITIAL_TEMPERATURE_HISTORY);
  const [operationalSteps, setOperationalSteps] = useState(OPERATIONAL_SEQUENCE);
  const [radarBlips, setRadarBlips] = useState(RADAR_BLIPS);

  // Modals & UI States
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isPrintReportOpen, setIsPrintReportOpen] = useState(false);
  const [isLiveSimulation, setIsLiveSimulation] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  // Time ticker
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recording counter
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Live sensor simulation
  useEffect(() => {
    if (!isLiveSimulation) return;

    const sensorInterval = setInterval(() => {
      // Subtle sweep oscillation
      setScanAngle((prev) => {
        const next = prev + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2));
        return Math.min(180, Math.max(0, next));
      });

      // Subtle ultrasonic distance jitter
      setDistance((prev) => {
        const delta = (Math.random() - 0.5) * 0.02;
        return Number((prev + delta).toFixed(2));
      });

      // Subtle temp drift
      setTemperature((prev) => {
        const delta = (Math.random() - 0.5) * 0.05;
        return Number((prev + delta).toFixed(1));
      });
    }, 3000);

    return () => clearInterval(sensorInterval);
  }, [isLiveSimulation]);

  // Append new log entry
  const addLog = (text, type = 'info') => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    setActivityLogs((prev) => [{ time: timeStr, text, type }, ...prev.slice(0, 40)]);
  };

  // Capture photo into evidence
  const captureEvidence = (customData = {}) => {
    const timeStr = new Date().toTimeString().split(' ')[0];
    const newIdx = String(evidenceList.length + 1).padStart(3, '0');
    const newId = `EV-${newIdx}`;
    
    const newEvidence = {
      id: newId,
      index: newIdx,
      type: customData.type || 'Image',
      description: customData.description || `Captured at Angle ${scanAngle}° (${distance}m)`,
      time: timeStr,
      object: customData.object || detectedObject.name,
      distance: `${distance} m`,
      angle: `${scanAngle}°`,
      confidence: `${detectedObject.confidence}%`,
      category: customData.category || detectedObject.category,
      tag: customData.tag || 'Field Capture',
      hash: `sha256:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      location: location.name,
      ...customData
    };

    setEvidenceList((prev) => [newEvidence, ...prev]);
    addLog(`Evidence record [${newId}] stored to secure cryptographic vault`, 'success');
    return newEvidence;
  };

  return (
    <ForensicContext.Provider
      value={{
        activeView,
        setActiveView,
        investigator,
        setInvestigator,
        streamUrl,
        setStreamUrl,
        cameraSource,
        setCameraSource,
        cameraFilter,
        setCameraFilter,
        isRecording,
        setIsRecording,
        recordTime,
        distance,
        setDistance,
        scanAngle,
        setScanAngle,
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        aiConfidence,
        setAiConfidence,
        humanDetected,
        setHumanDetected,
        humanConfidence,
        setHumanConfidence,
        detectedObject,
        setDetectedObject,
        location,
        setLocation,
        systemStatus,
        setSystemStatus,
        securityStatus,
        setSecurityStatus,
        evidenceList,
        setEvidenceList,
        activityLogs,
        addLog,
        tempHistory,
        setTempHistory,
        operationalSteps,
        setOperationalSteps,
        radarBlips,
        isAddEvidenceOpen,
        setIsAddEvidenceOpen,
        selectedEvidence,
        setSelectedEvidence,
        isPrintReportOpen,
        setIsPrintReportOpen,
        isLiveSimulation,
        setIsLiveSimulation,
        isMuted,
        setIsMuted,
        currentTime,
        captureEvidence
      }}
    >
      {children}
    </ForensicContext.Provider>
  );
};

export const useForensic = () => {
  const context = useContext(ForensicContext);
  if (!context) {
    throw new Error('useForensic must be used within a ForensicProvider');
  }
  return context;
};
