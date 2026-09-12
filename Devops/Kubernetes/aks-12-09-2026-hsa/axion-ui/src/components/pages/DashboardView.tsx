import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AssetList } from '../AssetList';
import { KPIStrip } from '../KPIStrip';
import { LiveTrend } from '../LiveTrend';
import { Throughput } from '../Throughput';
import { DigitalTwin } from '../DigitalTwin';
import { ThermalCamera } from '../ThermalCamera';

const API_BASE = 'https://api.axionsystems.de';

interface DashboardViewProps {
  devices: any[];
  throughput: any[];
  isLoggedIn: boolean;
  refreshInterval: number | null;
  timezone: string;
}

export function DashboardView({ devices, throughput, isLoggedIn, refreshInterval, timezone }: DashboardViewProps) {
  const { region, deviceId } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTimeRange = parseInt(searchParams.get('hours') || '1');
  const initialMetric = (searchParams.get('metric') as 'temperature' | 'vibration' | 'current') || 'temperature';

  const [latestData, setLatestData] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<number>(initialTimeRange);
  const [metric, setMetric] = useState<'temperature' | 'vibration' | 'current'>(initialMetric);

  const updateUrlParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams, { replace: true });
  };

  const handleTimeRangeChange = (newHours: number) => {
    setTimeRange(newHours);
    updateUrlParam('hours', newHours.toString());
  };

  const handleMetricChange = (newMetric: 'temperature' | 'vibration' | 'current') => {
    setMetric(newMetric);
    updateUrlParam('metric', newMetric);
  };

  useEffect(() => {
    // Ensure default parameters are always present in the URL for sharing
    const currentHours = searchParams.get('hours');
    const currentMetric = searchParams.get('metric');
    
    if (!currentHours || !currentMetric) {
      const newParams = new URLSearchParams(searchParams);
      if (!currentHours) newParams.set('hours', initialTimeRange.toString());
      if (!currentMetric) newParams.set('metric', initialMetric);
      setSearchParams(newParams, { replace: true });
    }
  }, [deviceId, searchParams, initialTimeRange, initialMetric, setSearchParams]);

  const fetchSelectedDeviceData = async (id: string) => {
    if (!isLoggedIn) return;
    try {
      const [latestRes, trendRes] = await Promise.all([
        fetch(`${API_BASE}/devices/${id}/latest`),
        fetch(`${API_BASE}/devices/${id}/trends?hours=${timeRange}`)
      ]);
      setLatestData(await latestRes.json());
      setTrendData(await trendRes.json());
    } catch (err) {
      console.error(`Failed to fetch data for ${id}`, err);
    }
  };

  useEffect(() => {
    if (deviceId && isLoggedIn) {
      fetchSelectedDeviceData(deviceId);
      if (refreshInterval !== null) {
        const intervalId = setInterval(() => fetchSelectedDeviceData(deviceId), refreshInterval);
        return () => clearInterval(intervalId);
      }
    }
  }, [deviceId, timeRange, isLoggedIn, refreshInterval]);

  // Auto-redirect if no deviceId but devices are loaded
  useEffect(() => {
    if (!deviceId && devices.length > 0) {
      // Check for legacy/query string deviceId first (from chatbot links)
      const queryDeviceId = searchParams.get('deviceId');
      if (queryDeviceId) {
        const dev = devices.find((d: any) => d.device_id === queryDeviceId);
        if (dev) {
          // Remove deviceId from searchParams to avoid polluting the target URL, keep others like hours/metric
          const newParams = new URLSearchParams(searchParams);
          newParams.delete('deviceId');
          navigate(`/device/${dev.refinery_region}/${dev.device_id}?${newParams.toString()}`, { replace: true });
          return;
        }
      }
      
      if (region) {
        const regionDevice = devices.find((d: any) => d.refinery_region === region);
        if (regionDevice) {
          navigate(`/device/${regionDevice.refinery_region}/${regionDevice.device_id}`, { replace: true });
          return;
        }
      }
      const first = devices[0];
      navigate(`/device/${first.refinery_region}/${first.device_id}`, { replace: true });
    }
  }, [deviceId, region, devices, navigate, searchParams]);

  const handleSelectDevice = (id: string) => {
    const dev = devices.find((d: any) => d.device_id === id);
    if (dev) navigate(`/device/${dev.refinery_region}/${id}`);
  };

  if (!deviceId || !latestData) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500">
        <div className="animate-pulse">Loading device telemetry...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 custom-scrollbar relative">
      <div className="max-w-[1600px] mx-auto bg-[#09090b] pt-6">
        <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-4">
          <div className="flex flex-col gap-4 h-full">
            <AssetList 
              devices={devices} 
              selectedDeviceId={deviceId}
              onSelectDevice={handleSelectDevice}
            />
          </div>
          <div id="main-dashboard-content" className="flex flex-col gap-4 bg-[#09090b] rounded-md p-1">
            <KPIStrip device={latestData} />
            
            {/* Top Row: Digital Twin and Thermal CCTV */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="h-[400px] flex flex-col relative rounded-md overflow-hidden bg-black border border-[#262626]">
                <DigitalTwin deviceId={deviceId} deviceType={latestData.device_type} temperature={latestData.temperature} status={latestData.status} />
              </div>
              <div className="h-[400px] flex flex-col relative rounded-md overflow-hidden bg-black border border-[#262626]">
                <ThermalCamera deviceId={deviceId} deviceType={latestData.device_type} temperature={latestData.temperature} status={latestData.status} />
              </div>
            </div>

            {/* Bottom Row: Live Trend and Throughput */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4">
              <div className="h-[400px] flex flex-col">
                <LiveTrend 
                  data={trendData} 
                  timeRange={timeRange} 
                  onTimeRangeChange={handleTimeRangeChange} 
                  metric={metric}
                  onMetricChange={handleMetricChange}
                  timezone={timezone}
                />
              </div>
              <Throughput data={throughput} />
            </div>

            {/* Device Information Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4 mt-2 bg-[#0a0a0a] border border-[#262626] rounded-md shadow-inner">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Device Type</span>
                <span className="text-xs font-medium text-slate-300">{latestData.device_type}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Region</span>
                <span className="text-xs font-medium text-slate-300">{latestData.refinery_region}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">First Seen</span>
                <span className="text-xs font-medium text-slate-300">
                  {latestData.first_seen ? new Date(latestData.first_seen.endsWith('Z') ? latestData.first_seen : `${latestData.first_seen}Z`).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Total Records</span>
                <span className="text-xs font-medium text-slate-300">
                  {latestData.total_records ? latestData.total_records.toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
