import { AlertTriangle, Bell, Info } from 'lucide-react';
import { formatAppDate } from '../../utils/date';

interface AlarmsEventsProps {
  devices: any[];
  timezone: string;
}

export function AlarmsEvents({ devices, timezone }: AlarmsEventsProps) {
  const alarms = devices.map((d, i) => {
    let level = 'WARNING';
    let msg = 'Warning threshold reached';
    if (d.temperature > 100) {
      level = 'CRITICAL';
      msg = `Temperature exceeded 100°C (${d.temperature.toFixed(1)}°C)`;
    } else if (d.vibration > 10) {
      level = 'CRITICAL';
      msg = `Vibration exceeded 10mm/s (${d.vibration.toFixed(1)} mm/s)`;
    } else if (d.temperature > 85) {
      msg = `Temperature warning (${d.temperature.toFixed(1)}°C)`;
    } else if (d.vibration > 6) {
      msg = `Vibration warning (${d.vibration.toFixed(1)} mm/s)`;
    }

    return {
      id: `ALM-${(i+1).toString().padStart(3, '0')}`,
      time: formatAppDate(d.last_seen, timezone),
      level: level,
      device: d.device_id,
      message: msg
    };
  });

  const getLevelColor = (level: string) => {
    if (level === 'CRITICAL') return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (level === 'WARNING') return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    return 'text-theme-base bg-theme-base/10 border-theme-base/20';
  };

  const getLevelIcon = (level: string) => {
    if (level === 'CRITICAL') return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (level === 'WARNING') return <Bell className="w-4 h-4 text-amber-500" />;
    return <Info className="w-4 h-4 text-theme-base" />;
  };

  return (
    <div className="p-6 flex-1 min-h-0 flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Alarms & Events</h2>
          <p className="text-sm text-slate-400">Historical log of system alerts and state changes.</p>
        </div>
      </div>

      <div className="flex-1 glass-card rounded-md overflow-hidden flex flex-col animate-fade-up">
        <div className="grid grid-cols-[100px_100px_120px_150px_1fr] gap-4 bg-[#0a0a0a]/80 border-b border-[#404040] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider backdrop-blur-sm">
          <div>ID</div>
          <div>Time</div>
          <div>Level</div>
          <div>Device</div>
          <div>Message</div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {alarms.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No active alarms or events to display.</div>
          ) : (
            alarms.map((alarm, idx) => {
              const delayClass = `delay-${Math.min((idx % 10) * 100, 800)}`;
              return (
              <div key={idx} className={`grid grid-cols-[100px_100px_120px_150px_1fr] gap-4 p-4 border-b border-[#262626] hover:bg-[#262626]/50 transition-colors text-sm items-center animate-fade-up ${delayClass}`}>
                <div className="text-slate-500 font-mono">{alarm.id}</div>
                <div className="text-slate-300">{alarm.time}</div>
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold border ${getLevelColor(alarm.level)}`}>
                    {getLevelIcon(alarm.level)}
                    {alarm.level}
                  </span>
                </div>
                <div className="text-white font-medium">{alarm.device}</div>
                <div className="text-slate-400">{alarm.message}</div>
              </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
