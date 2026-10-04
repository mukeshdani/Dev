import { useState, useEffect } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';

interface ThermalCameraProps {
  deviceId: string;
  deviceType?: string;
  temperature: number;
  status?: string;
}

export function ThermalCamera({ deviceId, deviceType = 'MOTOR', temperature, status = 'healthy' }: ThermalCameraProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').slice(0, 19));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine thermal color mapping based on status and temperature
  let filterString = 'sepia(1) hue-rotate(180deg) saturate(200%) contrast(150%) brightness(80%)';
  let isCritical = false;

  if (status === 'critical' || temperature > 80) {
    filterString = 'sepia(1) hue-rotate(-30deg) saturate(300%) contrast(180%) brightness(90%)';
    isCritical = true;
  } else if (status === 'warning' || temperature > 60) {
    filterString = 'sepia(1) hue-rotate(10deg) saturate(250%) contrast(160%) brightness(85%)';
  }

  return (
    <div className="w-full h-full min-h-[300px] bg-black rounded-md border border-[#262626] overflow-hidden relative group">
      
      {/* CCTV Overlay UI */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
          <span className="text-red-500 font-mono text-sm font-bold tracking-widest uppercase shadow-black drop-shadow-md">
            REC
          </span>
        </div>
        <span className="text-white/80 font-mono text-xs tracking-wider shadow-black drop-shadow-md">
          CAM-04 : {deviceId}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span className="text-white/80 font-mono text-xs tracking-wider shadow-black drop-shadow-md">
          {time}
        </span>
      </div>

      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <div className="flex items-center gap-2 text-white/80 font-mono text-xs">
          <Camera className="w-4 h-4" />
          <span>THERMAL VISION ACTIVE</span>
        </div>
        <div className="text-white/60 font-mono text-[10px] mt-1">
          TEMP: {temperature.toFixed(1)}°C
        </div>
      </div>

      {isCritical && (
        <div className="absolute inset-0 z-10 border-4 border-red-600 animate-pulse pointer-events-none"></div>
      )}

      {isCritical && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 text-red-500 bg-black/50 px-2 py-1 rounded border border-red-900/50">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span className="font-mono text-xs font-bold animate-pulse">CRITICAL HEAT</span>
          </div>
        </div>
      )}

      {/* Crosshair Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-30">
        <div className="w-[1px] h-full bg-white/50"></div>
        <div className="w-full h-[1px] bg-white/50 absolute top-1/2"></div>
        <div className="w-16 h-16 border border-white/50 rounded-full absolute"></div>
        <div className="w-2 h-2 border-t border-l border-white absolute top-1/3 left-1/3"></div>
        <div className="w-2 h-2 border-t border-r border-white absolute top-1/3 right-1/3"></div>
        <div className="w-2 h-2 border-b border-l border-white absolute bottom-1/3 left-1/3"></div>
        <div className="w-2 h-2 border-b border-r border-white absolute bottom-1/3 right-1/3"></div>
      </div>

      {/* Scanline Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)',
        backgroundSize: '100% 4px'
      }}></div>

      {/* Static Noise Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
      }}></div>

        {/* Simulated Video Feed (CSS Abstract Machinery Animation) */}
      <div 
        className="w-full h-full absolute inset-0 bg-[#0f172a] overflow-hidden"
        style={{ filter: filterString, transition: 'filter 1s ease-in-out' }}
      >
        {/* Device-Specific Geometry */}
        {deviceType === 'MOTOR' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-md opacity-70">
            {/* Outer Stator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border-[40px] border-slate-400 mix-blend-screen"></div>
            {/* Inner Rotor Spinning */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-white animate-[spin_2s_linear_infinite] flex items-center justify-center">
              <div className="w-[200px] h-[40px] bg-slate-500 rounded-full"></div>
              <div className="absolute w-[40px] h-[200px] bg-slate-500 rounded-full"></div>
            </div>
          </div>
        )}

        {deviceType === 'PUMP' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-md opacity-70">
            {/* Pump Casing */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-slate-300 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] border-[20px] border-slate-500"></div>
            {/* Impeller Spinning */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] animate-[spin_1s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-[100px] bg-white rounded-full origin-bottom"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-[100px] bg-white rounded-full origin-bottom rotate-[120deg]"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30px] h-[100px] bg-white rounded-full origin-bottom rotate-[240deg]"></div>
            </div>
            {/* Central Shaft */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] bg-slate-600 rounded-full"></div>
          </div>
        )}

        {deviceType === 'COMPRESSOR' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-md opacity-70 flex flex-col items-center justify-center gap-4">
            {/* Twin Screws / Multiple stages */}
            <div className="flex gap-4">
              <div className="w-[120px] h-[300px] bg-slate-400 rounded-full overflow-hidden relative">
                 <div className="absolute top-[-50px] w-full h-[400px] bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,white_20px,white_40px)] animate-[bounce_1s_infinite]"></div>
              </div>
              <div className="w-[120px] h-[300px] bg-slate-400 rounded-full overflow-hidden relative">
                 <div className="absolute top-[-50px] w-full h-[400px] bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,white_20px,white_40px)] animate-[bounce_1s_infinite_0.5s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
