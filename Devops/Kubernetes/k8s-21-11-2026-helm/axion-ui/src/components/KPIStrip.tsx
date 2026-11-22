import { ShieldAlert, ShieldCheck, Shield, Droplets, Wind, Settings } from 'lucide-react';
import { ShareLinkButton } from './ShareLinkButton';

interface KPIStripProps {
  device: any;
}

export function KPIStrip({ device }: KPIStripProps) {
  if (!device) return null;

  const getStatusDisplay = (status: string, score: number) => {
    if (status === 'critical') {
      return (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-sm">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-red-500 font-bold uppercase tracking-wider text-xs">Critical</div>
            <div className="text-slate-300 text-[10px]">Health Score: {score}%</div>
          </div>
        </div>
      );
    }
    if (status === 'warning') {
      return (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-sm">
          <Shield className="w-5 h-5 text-amber-500" />
          <div>
            <div className="text-amber-500 font-bold uppercase tracking-wider text-xs">Warning</div>
            <div className="text-slate-300 text-[10px]">Health Score: {score}%</div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-sm">
        <ShieldCheck className="w-5 h-5 text-green-500" />
        <div>
          <div className="text-green-500 font-bold uppercase tracking-wider text-xs">Healthy</div>
          <div className="text-slate-300 text-[10px]">Health Score: {score}%</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-theme-base/10 border border-theme-base/20 rounded-sm text-white font-bold tracking-wider shadow-[0_0_15px_rgba(var(--theme-rgb-base),0.1)] flex items-center gap-2">
            {device.device_type.toLowerCase().includes('pump') && <Droplets className="w-4 h-4 text-blue-400 opacity-80" />}
            {device.device_type.toLowerCase().includes('compressor') && <Wind className="w-4 h-4 text-slate-300 opacity-80" />}
            {device.device_type.toLowerCase().includes('motor') && <Settings className="w-4 h-4 text-amber-500 opacity-80" />}
            {device.device_id}
          </span>
          <ShareLinkButton deviceName={device.device_id} />
        </div>
        
        {getStatusDisplay(device.status, device.health_score)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-md animate-fade-up">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Temperature</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {device.temperature ? device.temperature.toFixed(1) : '--'}
            </span>
            <span className="text-base text-slate-500 font-medium">°C</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-md animate-fade-up delay-100">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Vibration</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {device.vibration ? device.vibration.toFixed(1) : '--'}
            </span>
            <span className="text-base text-slate-500 font-medium">mm/s</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-md animate-fade-up delay-200">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white tracking-tight">
              {device.current ? device.current.toFixed(1) : '--'}
            </span>
            <span className="text-base text-slate-500 font-medium">A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
