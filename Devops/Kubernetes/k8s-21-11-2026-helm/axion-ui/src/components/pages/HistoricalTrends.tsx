import { useState, useEffect, useMemo } from 'react';
import { Search, LineChart as LineChartIcon, Droplets, Wind, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSearchParams } from 'react-router-dom';
import { ShareLinkButton } from '../ShareLinkButton';

const API_BASE = 'https://api.axionsystems.de';

// A set of distinct colors for the correlation lines
const COLORS = [
  '#8b5cf6', // Violet
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#ec4899', // Pink
  '#06b6d4', // Cyan
];

interface HistoricalTrendsProps {
  devices?: any[];
}

export function HistoricalTrends({ devices = [] }: HistoricalTrendsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Sync state with URL params
  const selectedDeviceIds = useMemo(() => {
    const devicesParam = searchParams.get('devices');
    return devicesParam ? devicesParam.split(',') : [];
  }, [searchParams]);

  const metric = (searchParams.get('metric') as 'temperature' | 'vibration' | 'current') || 'temperature';
  const timeRange = parseInt(searchParams.get('time') || '1', 10);

  // Update URL params
  const setMetric = (m: string) => {
    setSearchParams(prev => {
      prev.set('metric', m);
      return prev;
    }, { replace: true });
  };

  const setTimeRange = (t: number) => {
    setSearchParams(prev => {
      prev.set('time', t.toString());
      return prev;
    }, { replace: true });
  };

  const setSelectedDeviceIds = (ids: string[]) => {
    setSearchParams(prev => {
      if (ids.length === 0) {
        prev.delete('devices');
      } else {
        prev.set('devices', ids.join(','));
      }
      return prev;
    }, { replace: true });
  };

  const filteredDevices = useMemo(() => {
    return devices.filter(d => 
      d.device_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      d.device_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [devices, searchTerm]);

  const toggleDevice = (deviceId: string) => {
    const current = [...selectedDeviceIds];
    if (current.includes(deviceId)) {
      setSelectedDeviceIds(current.filter(id => id !== deviceId));
    } else {
      if (current.length >= 7) return; // Limit to 7 devices to prevent chart clutter
      setSelectedDeviceIds([...current, deviceId]);
    }
  };

  useEffect(() => {
    const fetchTrends = async () => {
      if (selectedDeviceIds.length === 0) {
        setChartData([]);
        return;
      }

      setLoading(true);
      try {
        const promises = selectedDeviceIds.map(id => 
          fetch(`${API_BASE}/devices/${id}/trends?hours=${timeRange}`).then(res => res.json())
        );
        const results = await Promise.all(promises);
        
        // Merge data for recharts
        const deviceDataMap: Record<string, any[]> = {};
        selectedDeviceIds.forEach((id, index) => {
          deviceDataMap[id] = results[index];
        });

        const timeMap = new Map<number, any>();
        
        for (const [deviceId, data] of Object.entries(deviceDataMap)) {
          if (!data || !Array.isArray(data)) continue;
          data.forEach(point => {
            if (!point.timestamp) return;
            const date = new Date(point.timestamp.endsWith('Z') ? point.timestamp : point.timestamp + 'Z');
            date.setSeconds(0, 0); // Round to minute
            const timeKey = date.getTime();
            
            if (!timeMap.has(timeKey)) {
              timeMap.set(timeKey, { 
                timeKey, 
                time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
              });
            }
            timeMap.get(timeKey)![deviceId] = point[metric];
          });
        }
        
        const mergedData = Array.from(timeMap.values()).sort((a, b) => a.timeKey - b.timeKey);
        setChartData(mergedData);
      } catch (err) {
        console.error("Failed to fetch correlation trends", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [selectedDeviceIds, metric, timeRange]);

  const yAxisLabel = metric === 'temperature' ? '°C' : metric === 'vibration' ? 'mm/s' : 'A';

  return (
    <div id="correlation-dashboard" className="p-6 flex-1 min-h-0 flex flex-col bg-[#09090b]">
      <div className="mb-6 border-b border-[#262626] pb-4 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Correlation Engine</h2>
          <p className="text-sm text-slate-400">Select multiple devices to overlay and correlate their telemetry data.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <ShareLinkButton />
          <div className="flex bg-[#0a0a0a] rounded-md border border-[#404040] p-1">
            {['temperature', 'vibration', 'current'].map(m => (
              <button
                key={m}
                onClick={() => setMetric(m as any)}
                className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  metric === m ? 'bg-theme-deep text-white shadow-sm border border-theme-base/50' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex bg-[#0a0a0a] rounded-md border border-[#404040] p-1">
            {[1, 6, 24].map(h => (
              <button
                key={h}
                onClick={() => setTimeRange(h)}
                className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
                  timeRange === h ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {h}H
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Plot Browser (Device Selector) */}
        <div className="w-80 bg-[#171717]/80 backdrop-blur-md border border-[#262626] rounded-md flex flex-col shadow-lg overflow-hidden shrink-0">
          <div className="p-4 border-b border-[#404040] bg-[#0a0a0a]">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search devices..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-theme-base/50 focus:ring-1 focus:ring-theme-base/50 transition-all"
              />
            </div>
            <div className="mt-3 flex justify-between items-center text-xs text-slate-400">
              <span>{selectedDeviceIds.length} / 7 selected</span>
              {selectedDeviceIds.length > 0 && (
                <button onClick={() => setSelectedDeviceIds([])} className="hover:text-white transition-colors">Clear All</button>
              )}
            </div>
          </div>
          
          <div className="flex-1 p-2 overflow-y-auto custom-scrollbar space-y-1">
            {filteredDevices.map(device => {
              const isSelected = selectedDeviceIds.includes(device.device_id);
              const colorIndex = selectedDeviceIds.indexOf(device.device_id);
              const color = colorIndex >= 0 ? COLORS[colorIndex % COLORS.length] : 'transparent';
              
              return (
                <button
                  key={device.device_id}
                  onClick={() => toggleDevice(device.device_id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded text-left transition-all border ${
                    isSelected 
                      ? 'bg-slate-800/80 border-slate-600 shadow-sm' 
                      : 'hover:bg-[#262626] border-transparent text-slate-400'
                  }`}
                >
                  <div 
                    className={`w-3.5 h-3.5 rounded-sm shrink-0 border flex items-center justify-center transition-colors`}
                    style={{ 
                      backgroundColor: isSelected ? color : 'transparent',
                      borderColor: isSelected ? color : '#52525b'
                    }}
                  >
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {device.device_type.toLowerCase().includes('pump') && <Droplets className="w-3.5 h-3.5 text-blue-400 opacity-80 shrink-0" />}
                      {device.device_type.toLowerCase().includes('compressor') && <Wind className="w-3.5 h-3.5 text-slate-300 opacity-80 shrink-0" />}
                      {device.device_type.toLowerCase().includes('motor') && <Settings className="w-3.5 h-3.5 text-amber-500 opacity-80 shrink-0" />}
                      <div className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {device.device_id}
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase">{device.refinery_region}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 glass-card border border-[#262626] rounded-md p-6 flex flex-col relative min-w-0">
          {selectedDeviceIds.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
              <LineChartIcon className="w-16 h-16 mb-4 opacity-30" />
              <h3 className="text-xl font-bold text-slate-400">No Devices Selected</h3>
              <p className="text-sm mt-2 text-center max-w-md">Select up to 7 devices from the panel on the left to overlay their historical telemetry data and identify correlations.</p>
            </div>
          ) : (
            <>
              {loading && (
                <div className="absolute top-4 right-4 bg-theme-base/20 text-theme-light px-3 py-1 rounded text-xs font-bold animate-pulse z-10 border border-theme-base/30">
                  Fetching High-Res Trends...
                </div>
              )}
              
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest pl-2">
                {metric} Overlay Analysis
              </h3>
              
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="#52525b" 
                      tick={{ fill: '#71717a', fontSize: 11 }}
                      tickMargin={15}
                      minTickGap={30}
                    />
                    <YAxis 
                      stroke="#52525b" 
                      tick={{ fill: '#71717a', fontSize: 11 }}
                      tickFormatter={(val) => `${val}${yAxisLabel}`}
                      width={60}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#262626', color: '#fff', borderRadius: '6px', fontSize: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                      itemStyle={{ fontWeight: 'bold' }}
                      labelStyle={{ color: '#a1a1aa', marginBottom: '8px', borderBottom: '1px solid #262626', paddingBottom: '4px' }}
                    />
                    <Legend 
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{ paddingBottom: '20px', fontSize: '12px' }}
                      iconType="circle"
                    />
                    
                    {selectedDeviceIds.map((id, index) => (
                      <Line 
                        key={id}
                        type="monotone" 
                        dataKey={id} 
                        stroke={COLORS[index % COLORS.length]} 
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        isAnimationActive={true}
                        connectNulls
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
