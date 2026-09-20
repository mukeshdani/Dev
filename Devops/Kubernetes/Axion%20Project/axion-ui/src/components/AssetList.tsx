import { useState, useMemo, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Search, ChevronDown, ChevronRight, MapPin, ChevronsDown, ChevronsUp } from 'lucide-react';

interface AssetListProps {
  devices: any[];
  selectedDeviceId: string | null;
  onSelectDevice: (deviceId: string) => void;
}

export function AssetList({ devices, selectedDeviceId, onSelectDevice }: AssetListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());

  // Filter devices based on search and type
  const filteredDevices = useMemo(() => {
    return devices.filter(d => {
      const matchesSearch = d.device_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            d.refinery_region.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'ALL' || d.device_type === filterType;
      return matchesSearch && matchesType;
    });
  }, [devices, searchTerm, filterType]);

  // Group the filtered devices by region
  const groupedDevices = useMemo(() => {
    const groups: Record<string, any[]> = {};
    filteredDevices.forEach(d => {
      if (!groups[d.refinery_region]) groups[d.refinery_region] = [];
      groups[d.refinery_region].push(d);
    });
    return groups;
  }, [filteredDevices]);

  // Auto-expand regions when a search term is actively typing,
  // or if a newly filtered result requires it.
  useEffect(() => {
    if (searchTerm || filterType !== 'ALL') {
      setExpandedRegions(prev => {
        const next = new Set(prev);
        Object.keys(groupedDevices).forEach(r => next.add(r));
        return next;
      });
    }
  }, [searchTerm, filterType, groupedDevices]);

  // Auto-expand the region of the currently selected device
  useEffect(() => {
    if (selectedDeviceId && devices.length > 0) {
      const selectedDevice = devices.find(d => d.device_id === selectedDeviceId);
      if (selectedDevice) {
        setExpandedRegions(prev => {
          if (!prev.has(selectedDevice.refinery_region)) {
            const next = new Set(prev);
            next.add(selectedDevice.refinery_region);
            return next;
          }
          return prev;
        });
      }
    }
  }, [selectedDeviceId, devices]);

  const toggleRegion = (region: string) => {
    setExpandedRegions(prev => {
      const next = new Set(prev);
      if (next.has(region)) next.delete(region);
      else next.add(region);
      return next;
    });
  };

  const handleExpandAll = () => {
    setExpandedRegions(new Set(Object.keys(groupedDevices)));
  };

  const handleCollapseAll = () => {
    setExpandedRegions(new Set());
  };

  const getStatusColor = (status: string, isOnline: boolean) => {
    if (!isOnline) return 'bg-slate-500';
    if (status === 'critical') return 'bg-red-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getStatusGlow = (status: string, isOnline: boolean) => {
    if (!isOnline) return '';
    if (status === 'critical') return 'bg-red-400';
    if (status === 'warning') return 'bg-amber-400';
    return 'bg-green-400';
  };

  return (
    <div className="glass-card p-4 rounded-md animate-fade-up delay-300 flex flex-col h-full min-h-[600px]">
      <div className="flex items-center justify-between mb-3 px-2">
        <h3 className="text-xl font-bold text-white tracking-tight">Assets Hierarchy</h3>
        <div className="flex gap-1 bg-slate-800/50 p-1 rounded-md border border-slate-700/50">
          <button onClick={handleExpandAll} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Expand All Regions">
            <ChevronsDown className="w-4 h-4" />
          </button>
          <button onClick={handleCollapseAll} className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors" title="Collapse All Regions">
            <ChevronsUp className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-3 px-2">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-500" />
        </div>
        <input
          type="text"
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-sm pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-theme-base/50 focus:ring-1 focus:ring-theme-base/50 transition-all"
          placeholder="Search devices or regions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1 mb-4 px-2 overflow-x-auto custom-scrollbar pb-1">
        {['ALL', 'MOTOR', 'PUMP', 'COMPRESSOR'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === type 
                ? 'bg-fuchsia-600 text-white shadow-sm glow-primary' 
                : 'bg-slate-800/30 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {type === 'ALL' ? 'All' : type + 'S'}
          </button>
        ))}
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto px-2 custom-scrollbar">
        {Object.entries(groupedDevices).map(([region, regionDevices]) => {
          const isExpanded = expandedRegions.has(region);
          
          // Calculate Online/Offline counts for the badges
          const onlineCount = regionDevices.filter(d => {
            const lastSeenStr = d.last_seen.endsWith('Z') ? d.last_seen : `${d.last_seen}Z`;
            const timeDiffSeconds = (new Date().getTime() - new Date(lastSeenStr).getTime()) / 1000;
            return timeDiffSeconds < 120;
          }).length;
          const offlineCount = regionDevices.length - onlineCount;

          return (
            <div key={region} className="mb-2">
              {/* Region Node */}
              <button 
                onClick={() => toggleRegion(region)} 
                className="w-full flex items-center justify-between p-2 hover:bg-slate-800/30 rounded-md transition-colors border border-transparent hover:border-slate-700/50"
              >
                <div className="flex items-center gap-2">
                  {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  <MapPin className="w-4 h-4 text-theme-light" />
                  <span className="font-bold text-sm text-slate-200">{region}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black tracking-wider">
                  {onlineCount > 0 && <span className="bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded">{onlineCount} ON</span>}
                  {offlineCount > 0 && <span className="bg-slate-500/20 text-slate-400 px-1.5 py-0.5 rounded">{offlineCount} OFF</span>}
                </div>
              </button>

              {/* Children Nodes (Devices) */}
              {isExpanded && (
                <div className="pl-6 pr-1 py-1 mt-1 ml-3 border-l-2 border-slate-700/40 space-y-1.5 animate-fade-in-down origin-top">
                  {regionDevices.map((device) => {
                    const isSelected = device.device_id === selectedDeviceId;
                    const lastSeenStr = device.last_seen.endsWith('Z') ? device.last_seen : `${device.last_seen}Z`;
                    const lastSeenDate = new Date(lastSeenStr);
                    const timeDiffSeconds = (new Date().getTime() - lastSeenDate.getTime()) / 1000;
                    const isOnline = timeDiffSeconds < 120;
                    
                    let lastSeenText = '';
                    if (isOnline) {
                       lastSeenText = timeDiffSeconds < 60 ? Math.floor(timeDiffSeconds) + 's' : Math.floor(timeDiffSeconds/60) + 'm';
                    } else {
                       lastSeenText = formatDistanceToNow(lastSeenDate).replace('about ', '').replace('less than a minute', '<1m');
                    }

                    const statusColor = getStatusColor(device.status, isOnline);
                    const statusGlow = getStatusGlow(device.status, isOnline);

                    return (
                      <button
                        key={device.device_id}
                        onClick={() => onSelectDevice(device.device_id)}
                        className={`w-full text-left p-2.5 rounded-sm border transition-all duration-300 flex items-center gap-3 relative ${
                          isSelected 
                            ? 'bg-theme-base/10 border-l-4 border-l-theme-base border-y-theme-base/20 border-r-theme-base/20 shadow-[0_0_15px_rgba(var(--theme-rgb-base),0.15)]' 
                            : 'bg-slate-800/20 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50'
                        }`}
                      >
                        {/* Horizontal guide line from the parent left border */}
                        <div className="absolute -left-6 top-1/2 w-4 border-t-2 border-slate-700/40 pointer-events-none"></div>

                        <div className="shrink-0 flex items-center justify-center">
                          <span className="relative flex h-2.5 w-2.5">
                            {isOnline && (
                              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusGlow}`}></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${statusColor}`}></span>
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <h4 className={`font-semibold text-sm truncate pr-2 ${isSelected ? 'text-white' : 'text-slate-200'}`} title={device.device_id}>
                            {device.device_id}
                          </h4>
                          <p className={`text-[10px] font-medium shrink-0 ml-2 ${isOnline ? 'text-theme-light' : 'text-slate-500'}`}>
                            {lastSeenText}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {filteredDevices.length === 0 && (
          <div className="text-center py-8 text-slate-500 text-sm">
            No devices match your criteria
          </div>
        )}
      </div>
    </div>
  );
}
