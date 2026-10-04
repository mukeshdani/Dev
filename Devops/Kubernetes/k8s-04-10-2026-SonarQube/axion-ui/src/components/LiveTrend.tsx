import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { formatAppDate } from '../utils/date';

interface LiveTrendProps {
  data: any[];
  timeRange: number;
  onTimeRangeChange: (hours: number) => void;
  metric: 'temperature' | 'vibration' | 'current';
  onMetricChange: (metric: 'temperature' | 'vibration' | 'current') => void;
  timezone: string;
}

export function LiveTrend({ data, timeRange, onTimeRangeChange, metric, onMetricChange, timezone }: LiveTrendProps) {

  const formatTime = (timeStr: any) => {
    return formatAppDate(timeStr, timezone, true);
  };

  const getMetricColor = () => {
    if (metric === 'temperature') return '#ef4444'; // Red
    if (metric === 'vibration') return '#f59e0b'; // Amber
    return '#3b82f6'; // Blue
  };
  
  const getThresholds = () => {
    if (metric === 'temperature') return { warning: 85, critical: 100 };
    if (metric === 'vibration') return { warning: 6, critical: 10 };
    return null;
  };

  const thresholds = getThresholds();

  return (
    <div className="glass-card p-6 rounded-md flex flex-col h-[400px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-xl font-bold text-white tracking-tight">Live Trend</h3>
        
        <div className="flex gap-4">
          <div className="flex bg-slate-800/50 p-1 rounded-sm border border-slate-700/50">
            {(['temperature', 'vibration', 'current'] as const).map(m => (
              <button
                key={m}
                onClick={() => onMetricChange(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  metric === m ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-800/50 p-1 rounded-sm border border-slate-700/50">
            {[
              { label: '1H', value: 1 },
              { label: '24H', value: 24 },
              { label: '7D', value: 168 }
            ].map(tr => (
              <button
                key={tr.label}
                onClick={() => onTimeRangeChange(tr.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  timeRange === tr.value ? 'bg-fuchsia-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tr.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        {data.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            Waiting for telemetry data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatTime}
                stroke="#64748b"
                fontSize={10}
                tickMargin={10}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={10}
                tickFormatter={(val) => Math.round(val).toString()}
              />
              <Tooltip
                labelFormatter={formatTime}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              
              {thresholds && (
                <>
                  <ReferenceLine y={thresholds.critical} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Critical', fill: '#ef4444', fontSize: 10 }} />
                  <ReferenceLine y={thresholds.warning} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Warning', fill: '#f59e0b', fontSize: 10 }} />
                </>
              )}

              <Area 
                type="monotone" 
                dataKey={metric} 
                stroke={getMetricColor()} 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorMetric)"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
