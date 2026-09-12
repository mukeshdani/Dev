import { useMemo, useState } from 'react';
import { Server, MapPin, Wind, Droplets, Settings, ZoomIn, ZoomOut } from 'lucide-react';

interface SystemTopologyProps {
  devices: any[];
}

export function SystemTopology({ devices }: SystemTopologyProps) {
  // Calculate default layout only (stable across telemetry updates)
  const { defaultEnterprise, defaultRegions, defaultDeviceNodes } = useMemo(() => {
    const grouped = devices.reduce((acc, device) => {
      if (!acc[device.refinery_region]) acc[device.refinery_region] = [];
      acc[device.refinery_region].push(device);
      return acc;
    }, {} as Record<string, any[]>);

    let currentY = 50;
    const regionNodes: any[] = [];
    const devNodes: any[] = [];

    Object.entries(grouped).forEach(([region, regionDevicesList]) => {
      const regionDevices = regionDevicesList as any[];
      const regionHeight = regionDevices.length * 55;
      const regionCenterY = currentY + (regionHeight / 2);

      regionNodes.push({ id: `region-${region}`, name: region, defaultX: 400, defaultY: regionCenterY });

      regionDevices.forEach((device: any, index: number) => {
        const deviceY = currentY + (index * 55) + 27.5;
        devNodes.push({
          id: `device-${device.device_id}`,
          device,
          defaultX: 800,
          defaultY: deviceY,
          regionId: `region-${region}`
        });
      });

      currentY += regionHeight + 80;
    });

    const height = Math.max(600, currentY);
    const entNode = { id: 'enterprise-core', name: "Axion Global", defaultX: 100, defaultY: height / 2 };

    return { defaultEnterprise: entNode, defaultRegions: regionNodes, defaultDeviceNodes: devNodes, svgHeight: height };
  }, [devices]);

  // State to hold dragging offsets
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragOffsets, setDragOffsets] = useState<Record<string, { dx: number, dy: number }>>({});
  
  const [dragState, setDragState] = useState<{ id: string, startX: number, startY: number, initialDx: number, initialDy: number } | null>(null);
  const [panState, setPanState] = useState<{ startX: number, startY: number, initialPanX: number, initialPanY: number } | null>(null);

  const handleContainerMouseDown = (e: React.MouseEvent) => {
    setPanState({
      startX: e.clientX,
      startY: e.clientY,
      initialPanX: pan.x,
      initialPanY: pan.y
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Zoom toward mouse
    const zoomFactor = e.deltaY < 0 ? 1.05 : 0.95;
    const newZoom = Math.max(0.4, Math.min(zoom * zoomFactor, 2.5));
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setPan(prev => ({
      x: mouseX - ((mouseX - prev.x) / zoom) * newZoom,
      y: mouseY - ((mouseY - prev.y) / zoom) * newZoom,
    }));
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    const offset = dragOffsets[id] || { dx: 0, dy: 0 };
    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialDx: offset.dx,
      initialDy: offset.dy
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState) {
      const dx = dragState.initialDx + ((e.clientX - dragState.startX) / zoom);
      const dy = dragState.initialDy + ((e.clientY - dragState.startY) / zoom);
      setDragOffsets(prev => ({ ...prev, [dragState.id]: { dx, dy } }));
    } else if (panState) {
      const dx = e.clientX - panState.startX;
      const dy = e.clientY - panState.startY;
      setPan({ x: panState.initialPanX + dx, y: panState.initialPanY + dy });
    }
  };

  const handleMouseUp = () => {
    setDragState(null);
    setPanState(null);
  };

  // Helper to get actual position
  const getPos = (id: string, defaultX: number, defaultY: number) => {
    const offset = dragOffsets[id] || { dx: 0, dy: 0 };
    return { x: defaultX + offset.dx, y: defaultY + offset.dy };
  };

  // Calculate live positions
  const entPos = getPos(defaultEnterprise.id, defaultEnterprise.defaultX, defaultEnterprise.defaultY);

  const regionsMap = new Map<string, { x: number, y: number }>();
  const regionsLive = defaultRegions.map(r => {
    const pos = getPos(r.id, r.defaultX, r.defaultY);
    regionsMap.set(r.id, pos);
    return { ...r, ...pos };
  });

  const devicesLive = defaultDeviceNodes.map(d => {
    const pos = getPos(d.id, d.defaultX, d.defaultY);
    const regionPos = regionsMap.get(d.regionId)!;
    return { ...d, ...pos, regionX: regionPos.x, regionY: regionPos.y };
  });

  const getStatusColor = (status: string, lastSeen: string) => {
    if (!lastSeen) return '#64748b'; // slate-500
    const lastSeenStr = lastSeen.endsWith('Z') ? lastSeen : `${lastSeen}Z`;
    const timeDiffSeconds = (new Date().getTime() - new Date(lastSeenStr).getTime()) / 1000;

    if (timeDiffSeconds >= 120) return '#64748b'; // offline
    if (status === 'critical') return '#ef4444'; // red-500
    if (status === 'warning') return '#f59e0b'; // amber-500
    return '#22c55e'; // green-500
  };

  return (
    <div className="p-6 flex-1 min-h-0 flex flex-col">
      <div className="mb-6 border-b border-[#262626] pb-4 flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Topology</h2>
          <p className="text-sm text-slate-400">Interactive live network graph. You can drag the nodes around to reorganize the view.</p>
        </div>
        {Object.keys(dragOffsets).length > 0 && (
          <button
            onClick={() => setDragOffsets({})}
            className="text-xs bg-[#171717] hover:bg-[#262626] border border-[#404040] text-slate-300 px-3 py-1.5 rounded transition-colors"
          >
            Reset Layout
          </button>
        )}
      </div>

      <div
        className="flex-1 min-h-0 glass-card rounded-md overflow-hidden relative bg-[#09090b] select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col bg-theme-deep/80 backdrop-blur-md border border-theme-base/30 rounded-lg shadow-xl z-50 overflow-hidden">
          <button onClick={() => setZoom(z => Math.min(z + 0.15, 2.5))} className="p-2.5 hover:bg-theme-base/20 transition-colors border-b border-theme-base/20" title="Zoom In">
            <ZoomIn className="w-5 h-5 text-theme-base" />
          </button>
          <button onClick={() => { setZoom(1); setPan({x:0, y:0}); setDragOffsets({}); }} className="p-2 hover:bg-theme-base/20 transition-colors border-b border-theme-base/20 text-xs font-bold text-theme-base" title="Reset Layout">
            {Math.round(zoom * 100)}%
          </button>
          <button onClick={() => setZoom(z => Math.max(z - 0.15, 0.4))} className="p-2.5 hover:bg-theme-base/20 transition-colors" title="Zoom Out">
            <ZoomOut className="w-5 h-5 text-theme-base" />
          </button>
        </div>

        <div className="w-full h-full overflow-hidden relative" onWheel={handleWheel} onMouseDown={handleContainerMouseDown}>
          <svg width="100%" height="100%" className="min-w-full min-h-full" style={{ cursor: panState ? 'grabbing' : 'grab' }}>
            <g style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0', transition: (dragState || panState) ? 'none' : 'transform 0.1s ease-out' }}>
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Links: Enterprise -> Regions */}
            {regionsLive.map((region, i) => (
              <g key={`ent-link-group-${i}`}>
                <path
                  id={`ent-link-${i}`}
                  d={`M ${entPos.x + 80} ${entPos.y} C ${entPos.x + 200} ${entPos.y}, ${region.x - 150} ${region.y}, ${region.x - 60} ${region.y}`}
                  fill="none"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  className="opacity-50 transition-all duration-75"
                  style={{ animation: `fadeIn 0.5s ease-out ${i * 0.15}s both` }}
                />
                <polygon points="-6,-6 6,0 -6,6" fill="#8b5cf6" className="opacity-80 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
                  <animateMotion dur={`${3 + (i % 2)}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#ent-link-${i}`} />
                  </animateMotion>
                </polygon>
              </g>
            ))}

            {/* Links: Regions -> Devices */}
            {devicesLive.map((node, i) => {
              const isOffline = !node.device.last_seen || ((new Date().getTime() - new Date(node.device.last_seen.endsWith('Z') ? node.device.last_seen : `${node.device.last_seen}Z`).getTime()) / 1000 >= 120);

              return (
                <g key={`dev-link-group-${i}`}>
                  <path
                    id={`dev-link-${i}`}
                    d={`M ${node.regionX + 80} ${node.regionY} C ${node.regionX + 200} ${node.regionY}, ${node.x - 200} ${node.y}, ${node.x - 120} ${node.y}`}
                    fill="none"
                    stroke={isOffline ? '#334155' : '#10b981'}
                    strokeWidth={isOffline ? "1" : "2"}
                    strokeDasharray={isOffline ? "5,5" : "none"}
                    className="opacity-60 transition-all duration-75"
                    style={{ animation: `fadeIn 0.5s ease-out ${(regionsLive.length * 0.15) + (i * 0.04)}s both` }}
                  />
                  {!isOffline && (
                    <polygon points="-4,-4 4,0 -4,4" fill="#10b981" className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                      <animateMotion dur={`${2 + (i % 2)}s`} repeatCount="indefinite" rotate="auto">
                        <mpath href={`#dev-link-${i}`} />
                      </animateMotion>
                    </polygon>
                  )}
                </g>
              )
            })}

            {/* Render Enterprise */}
            <foreignObject x={entPos.x - 80} y={entPos.y - 40} width="160" height="80" className="overflow-visible">
              <div
                onMouseDown={(e) => handleMouseDown(e, defaultEnterprise.id)}
                style={{ animation: `fadeSlideIn 0.5s ease-out both` }}
                className={`bg-theme-deep/80 backdrop-blur-md border border-theme-base shadow-[0_0_20px_rgba(var(--theme-rgb-base),0.3)] rounded-lg p-3 text-center flex flex-col items-center justify-center cursor-grab active:cursor-grabbing animate-pulse-slow`}
              >
                <Server className="w-6 h-6 text-theme-base mb-1 pointer-events-none" />
                <span className="text-white font-bold text-sm tracking-tight pointer-events-none">{defaultEnterprise.name}</span>
              </div>
            </foreignObject>

            {/* Render Regions */}
            {regionsLive.map((region, i) => (
              <foreignObject key={`region-${i}`} x={region.x - 60} y={region.y - 30} width="160" height="60" className="overflow-visible">
                <div
                  onMouseDown={(e) => handleMouseDown(e, region.id)}
                  style={{ animation: `fadeSlideIn 0.5s ease-out ${i * 0.15}s both` }}
                  className="bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:border-theme-base/50 transition-colors shadow-lg rounded-lg p-2 flex items-center gap-3 w-max pr-4 cursor-grab active:cursor-grabbing"
                >
                  <div className="bg-slate-800 p-2 rounded-md pointer-events-none">
                    <MapPin className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="flex flex-col pointer-events-none">
                    <span className="text-white font-bold text-sm">{region.name}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Site Region</span>
                  </div>
                </div>
              </foreignObject>
            ))}

            {/* Render Devices */}
            {devicesLive.map((node, i) => {
              const color = getStatusColor(node.device.status, node.device.last_seen);
              const isOffline = color === '#64748b';
              const isCritical = color === '#ef4444';

              return (
                <foreignObject key={`device-${i}`} x={node.x - 120} y={node.y - 20} width="280" height="40" className="overflow-visible">
                  <div
                    onMouseDown={(e) => handleMouseDown(e, node.id)}
                    style={{ animation: `fadeSlideIn 0.5s ease-out ${(regionsLive.length * 0.15) + (i * 0.04)}s both` }}
                    className={`group flex items-center gap-3 bg-[#0a0a0a] border border-slate-800 hover:border-slate-500 transition-colors rounded-full px-1 py-1 w-max shadow-md relative cursor-grab active:cursor-grabbing ${!isOffline ? 'bg-gradient-to-r from-slate-900 to-transparent' : ''}`}
                  >
                    <div className="relative flex items-center justify-center w-8 h-8 shrink-0 pointer-events-none">
                      {!isOffline && (
                        <span className={`absolute inline-flex h-full w-full rounded-full opacity-40 ${isCritical ? 'animate-ping bg-red-500' : 'bg-green-500'}`}></span>
                      )}
                      <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: color, boxShadow: isOffline ? 'none' : `0 0 10px ${color}` }}></span>
                    </div>

                    <div className="flex flex-col pr-4 pb-0.5 pointer-events-none">
                      <div className="flex items-center gap-2">
                        {node.device.device_type.toLowerCase().includes('pump') && <Droplets className="w-3.5 h-3.5 text-blue-400" />}
                        {node.device.device_type.toLowerCase().includes('compressor') && <Wind className="w-3.5 h-3.5 text-slate-300" />}
                        {node.device.device_type.toLowerCase().includes('motor') && <Settings className="w-3.5 h-3.5 text-amber-500" />}
                        <span className="text-slate-200 font-bold text-sm group-hover:text-white">{node.device.device_id}</span>
                        <span className="text-[9px] bg-slate-800 border border-slate-700 text-slate-400 px-1.5 py-0 rounded uppercase">{node.device.device_type}</span>
                      </div>

                      {/* Metric Peek on Hover */}
                      <div className="absolute left-[105%] top-1/2 -translate-y-1/2 ml-2 bg-slate-800 border border-slate-700 rounded-md p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 w-max flex gap-4 backdrop-blur-xl">
                        {!isOffline ? (
                          <>
                            <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold">Temp</span><span className={`text-xs font-mono font-bold ${node.device.temperature > 85 ? 'text-amber-500' : 'text-slate-200'}`}>{node.device.temperature?.toFixed(1)}°C</span></div>
                            <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold">Vib</span><span className={`text-xs font-mono font-bold ${node.device.vibration > 6 ? 'text-amber-500' : 'text-slate-200'}`}>{node.device.vibration?.toFixed(1)} mm/s</span></div>
                            <div className="flex flex-col"><span className="text-[10px] text-slate-500 uppercase font-bold">Health</span><span className="text-xs font-mono font-bold text-theme-light">{node.device.health_score}%</span></div>
                          </>
                        ) : (
                          <div className="text-xs text-slate-500 italic px-2">Device is offline</div>
                        )}
                      </div>
                    </div>
                  </div>
                </foreignObject>
              )
            })}
            </g>
          </svg>

          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes dash {
              to { stroke-dashoffset: -100; }
            }
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateX(-30px); }
              to { opacity: 1; transform: translateX(0); }
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          `}} />
        </div>
      </div>
    </div>
  );
}
