import { Server, ChevronRight, ChevronDown, MapPin, Search, Wind, Droplets, Settings, ChevronsDown, ChevronsUp } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface AssetHierarchyProps {
  devices: any[];
}

export function AssetHierarchy({ devices }: AssetHierarchyProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRegions, setExpandedRegions] = useState<Record<string, boolean>>({});

  // Group devices by region and filter by search
  const { grouped, filteredCount } = useMemo(() => {
    const acc: Record<string, any[]> = {};
    let count = 0;
    
    devices.forEach(device => {
      const matchesSearch = 
        device.device_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        device.refinery_region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.device_type.toLowerCase().includes(searchTerm.toLowerCase());
        
      if (matchesSearch) {
        if (!acc[device.refinery_region]) {
          acc[device.refinery_region] = [];
        }
        acc[device.refinery_region].push(device);
        count++;
      }
    });
    return { grouped: acc, filteredCount: count };
  }, [devices, searchTerm]);

  // Auto-expand regions when searching
  useEffect(() => {
    if (searchTerm) {
      const allExpanded: Record<string, boolean> = {};
      Object.keys(grouped).forEach(region => {
        allExpanded[region] = true;
      });
      setExpandedRegions(allExpanded);
    }
  }, [searchTerm, grouped]);

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => ({ 
      ...prev, 
      [region]: prev[region] === undefined ? false : !prev[region] 
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    Object.keys(grouped).forEach(region => {
      allExpanded[region] = true;
    });
    setExpandedRegions(allExpanded);
  };

  const handleCollapseAll = () => {
    const allCollapsed: Record<string, boolean> = {};
    Object.keys(grouped).forEach(region => {
      allCollapsed[region] = false;
    });
    setExpandedRegions(allCollapsed);
  };

  const getStatusPill = (status: string, isOnline: boolean) => {
    if (!isOnline) {
      return <span className="bg-slate-500/20 text-slate-400 border border-slate-500/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Offline</span>;
    }
    if (status === 'critical') {
      return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider animate-pulse">Critical</span>;
    }
    if (status === 'warning') {
      return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Warning</span>;
    }
    return <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Healthy</span>;
  };

  return (
    <div className="p-6 flex-1 min-h-0 flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Global Asset Hierarchy</h2>
            <p className="text-sm text-slate-400">Deep-dive structural overview of all plant telemetry.</p>
          </div>
          <div className="flex gap-1 bg-slate-800/50 p-1 rounded-md border border-slate-700/50">
            <button onClick={handleExpandAll} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Expand All Regions">
              <ChevronsDown className="w-5 h-5" />
            </button>
            <button onClick={handleCollapseAll} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Collapse All Regions">
              <ChevronsUp className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="w-full bg-slate-800/50 border border-slate-700/50 rounded-sm pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-theme-base/50 focus:ring-1 focus:ring-theme-base/50 transition-all"
            placeholder="Search devices or regions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 min-h-0 glass-card rounded-md overflow-hidden flex flex-col animate-fade-up">
        {/* Table Header */}
        <div className="grid grid-cols-[3fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-4 bg-[#0a0a0a]/80 border-b border-[#404040] p-4 text-xs font-bold text-slate-400 uppercase tracking-wider backdrop-blur-sm sticky top-0 z-10 shadow-md">
          <div className="pl-2">Asset / Structure</div>
          <div>Type</div>
          <div>Status</div>
          <div>Temp (°C)</div>
          <div>Vib (mm/s)</div>
          <div>Current (A)</div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          
          <div className="flex items-center gap-3 text-white font-bold mb-4 mt-2 p-3 bg-theme-deep/20 border border-theme-base/30 rounded-md w-full shadow-[0_0_15px_rgba(var(--theme-rgb-base),0.1)]">
            <Server className="w-5 h-5 text-theme-base" />
            <span className="text-lg tracking-wide">Enterprise: Axion Global</span>
            <div className="ml-auto flex items-center gap-2">
               <span className="text-xs text-theme-light bg-theme-deep/50 px-2 py-1 rounded">Total Devices: {filteredCount}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {Object.entries(grouped).map(([region, regionDevices], index) => {
              const isExpanded = expandedRegions[region] !== false; // default expanded
              const delayClass = `delay-${Math.min((index % 10) * 100, 800)}`;
              
              // Calculate Online/Offline counts
              const onlineCount = regionDevices.filter(d => {
                const lastSeenStr = d.last_seen?.endsWith('Z') ? d.last_seen : `${d.last_seen}Z`;
                const timeDiffSeconds = (new Date().getTime() - new Date(lastSeenStr).getTime()) / 1000;
                return timeDiffSeconds < 120;
              }).length;
              
              return (
                <div key={region} className={`animate-fade-up ${delayClass} bg-slate-900/40 rounded-md border border-slate-700/50 overflow-hidden`}>
                  
                  {/* Region Node (Parent Row) */}
                  <div 
                    onClick={() => toggleRegion(region)}
                    className="flex items-center justify-between bg-slate-800/80 hover:bg-slate-800 p-3 cursor-pointer transition-all select-none border-b border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-0.5 rounded-sm bg-black/30 border border-slate-600">
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-theme-base" /> : <ChevronRight className="w-4 h-4 text-theme-base" />}
                      </div>
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="font-bold text-slate-200 tracking-wide">{region} <span className="text-slate-500 font-normal text-xs ml-1 uppercase">Site</span></span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-wider">
                      <span className="text-slate-400 bg-black/40 px-2 py-1 rounded">{regionDevices.length} Total</span>
                      {onlineCount > 0 && <span className="text-green-400 bg-green-500/10 px-2 py-1 rounded">{onlineCount} Online</span>}
                    </div>
                  </div>
                  
                  {/* Children Nodes (Devices Rows) */}
                  {isExpanded && (
                    <div className="divide-y divide-slate-700/30">
                      {regionDevices.map((device: any) => {
                        const lastSeenStr = device.last_seen?.endsWith('Z') ? device.last_seen : `${device.last_seen}Z`;
                        const lastSeenDate = new Date(lastSeenStr);
                        const timeDiffSeconds = (new Date().getTime() - lastSeenDate.getTime()) / 1000;
                        const isOnline = timeDiffSeconds < 120;
                        
                        return (
                          <div 
                            key={device.device_id}
                            onClick={() => navigate(`/device/${device.refinery_region}/${device.device_id}`)}
                            className="grid grid-cols-[3fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-4 p-3 items-center hover:bg-slate-800/50 cursor-pointer transition-colors group"
                          >
                            {/* Asset Column */}
                            <div className="pl-10 flex items-center gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-theme-base shadow-[0_0_8px_rgba(var(--theme-rgb-base),0.8)]' : 'bg-slate-600'}`}></div>
                              {device.device_type.toLowerCase().includes('pump') && <Droplets className="w-4 h-4 text-blue-400 opacity-80" />}
                              {device.device_type.toLowerCase().includes('compressor') && <Wind className="w-4 h-4 text-slate-300 opacity-80" />}
                              {device.device_type.toLowerCase().includes('motor') && <Settings className="w-4 h-4 text-amber-500 opacity-80" />}
                              <div>
                                <div className="font-bold text-slate-300 group-hover:text-white transition-colors">{device.device_id}</div>
                                <div className="text-[10px] text-slate-500">
                                  {isOnline ? 'Active logging' : `Last seen ${formatDistanceToNow(lastSeenDate, { addSuffix: true })}`}
                                </div>
                              </div>
                            </div>

                            {/* Type Column */}
                            <div>
                              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 uppercase font-semibold">
                                {device.device_type}
                              </span>
                            </div>

                            {/* Status Column */}
                            <div>
                              {getStatusPill(device.status, isOnline)}
                            </div>

                            {/* Temp Column */}
                            <div className={`font-mono text-sm ${device.temperature > 100 ? 'text-red-400 font-bold' : device.temperature > 85 ? 'text-amber-400' : 'text-slate-300'}`}>
                              {isOnline && device.temperature ? device.temperature.toFixed(1) : '-'}
                            </div>

                            {/* Vib Column */}
                            <div className={`font-mono text-sm ${device.vibration > 10 ? 'text-red-400 font-bold' : device.vibration > 6 ? 'text-amber-400' : 'text-slate-300'}`}>
                              {isOnline && device.vibration ? device.vibration.toFixed(1) : '-'}
                            </div>

                            {/* Current Column */}
                            <div className="font-mono text-sm text-slate-300">
                              {isOnline && device.current ? device.current.toFixed(1) : '-'}
                            </div>
                            
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            
            {Object.keys(grouped).length === 0 && (
              <div className="text-slate-500 text-sm italic py-8 text-center bg-slate-900/20 rounded-md border border-slate-800 border-dashed">
                No assets match your search criteria...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
