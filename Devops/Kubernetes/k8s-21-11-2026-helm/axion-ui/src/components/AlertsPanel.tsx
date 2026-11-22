import { AlertTriangle, TrendingUp, Droplets, Wind, Settings, Thermometer } from 'lucide-react';

interface AlertsPanelProps {
  devices: any[];
  onSelectDevice: (deviceId: string) => void;
}

export function AlertsPanel({ devices, onSelectDevice }: AlertsPanelProps) {
  if (!devices || devices.length === 0) {
    return (
      <div className="glass-card p-6 rounded-md animate-fade-up h-full flex flex-col">
        <h3 className="text-xl font-bold text-white tracking-tight mb-4">Active Alerts</h3>
        <div className="flex-1 flex items-center justify-center text-slate-500">
          No active alerts
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 rounded-md animate-fade-up h-full min-h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-500 w-5 h-5" />
        <h3 className="text-xl font-bold text-white tracking-tight">Active Alerts</h3>
      </div>
      
      <div className="space-y-3 overflow-y-auto custom-scrollbar pr-2 flex-1">
        {devices.map((device, idx) => {
          // Determine main anomaly reason for display
          let reason = '';
          let Icon = AlertTriangle;
          let colorClass = 'text-red-500';
          
          if (device.temperature > 100 || device.vibration > 10) {
            colorClass = 'text-red-500';
            if (device.temperature > 100) {
              reason = `Critical Temp: ${device.temperature?.toFixed(1)}°C`;
              Icon = Thermometer;
            } else {
              reason = `Critical Vib: ${device.vibration?.toFixed(1)} mm/s`;
              Icon = TrendingUp;
            }
          } else if (device.temperature > 85 || device.vibration > 6) {
            colorClass = 'text-amber-500';
            if (device.temperature > 85) {
              reason = `High Temp: ${device.temperature?.toFixed(1)}°C`;
              Icon = Thermometer;
            } else {
              reason = `High Vib: ${device.vibration?.toFixed(1)} mm/s`;
              Icon = TrendingUp;
            }
          } else {
             reason = `Warning State`;
             colorClass = 'text-yellow-500';
          }

          return (
            <button
              key={device.device_id}
              onClick={() => onSelectDevice(device.device_id)}
              className="w-full text-left bg-slate-800/30 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-500/50 p-3 rounded-sm transition-all flex items-start gap-3 group"
            >
              <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700 mt-0.5 shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  {device.device_type.toLowerCase().includes('pump') && <Droplets className="w-3.5 h-3.5 text-blue-400 opacity-80 shrink-0" />}
                  {device.device_type.toLowerCase().includes('compressor') && <Wind className="w-3.5 h-3.5 text-slate-300 opacity-80 shrink-0" />}
                  {device.device_type.toLowerCase().includes('motor') && <Settings className="w-3.5 h-3.5 text-amber-500 opacity-80 shrink-0" />}
                  <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors truncate">{device.device_id}</h4>
                </div>
                <p className="text-xs text-slate-400 truncate mb-2">{device.refinery_region}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className={`w-3.5 h-3.5 ${colorClass} opacity-80 shrink-0`} />
                    <span className={`text-[11px] font-bold ${colorClass} truncate`}>{reason}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 shrink-0 ml-2">Health: {device.health_score}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
