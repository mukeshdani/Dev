import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Building } from 'lucide-react';

interface MapWidgetProps {
  regionSummary: any[];
}

// Coordinates mapping based on our regions
const REGION_COORDS: Record<string, [number, number]> = {
  'WEST_REFINERY': [35.3733, -119.0187], // Bakersfield, CA
  'SOUTH_PLANT': [29.7604, -95.3698],    // Houston, TX
  'EAST_REFINERY': [25.2048, 55.2708],   // Dubai, UAE
  'NORTH_PLANT': [57.1497, -2.0943],     // Aberdeen, UK (North Sea)
  'CENTRAL_REFINERY': [41.8781, -87.6298], // Chicago, IL
};

// Create a custom glowing icon function
const createCustomIcon = (status: 'critical' | 'healthy') => {
  const color = status === 'critical' ? '#ef4444' : '#10b981';
  const shadowColor = status === 'critical' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
  
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 15px ${shadowColor}, 0 0 30px ${shadowColor};
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid ${color};
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        "></div>
      </div>
      <style>
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

function MapBounds({ regions }: { regions: any[] }) {
  const map = useMap();
  useEffect(() => {
    if (regions.length > 0) {
      const bounds = L.latLngBounds(regions.map(r => REGION_COORDS[r.region] || [0, 0]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 });
    }
  }, [map, regions]);
  return null;
}

export function MapWidget({ regionSummary }: MapWidgetProps) {
  const navigate = useNavigate();

  const regionsWithCoords = useMemo(() => {
    return regionSummary.filter(r => REGION_COORDS[r.region]);
  }, [regionSummary]);

  return (
    <div className="w-full h-full min-h-[400px] rounded-md overflow-hidden border border-[#262626] relative z-0">
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
        zoomControl={false}
      >
        {/* Dark Matter TileLayer */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapBounds regions={regionsWithCoords} />

        {regionsWithCoords.map((region) => {
          const coords = REGION_COORDS[region.region];
          const isCritical = region.alert_devices > 0;
          
          return (
            <Marker 
              key={region.region} 
              position={coords} 
              icon={createCustomIcon(isCritical ? 'critical' : 'healthy')}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[220px]">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-white pr-6 border-b border-white/10 pb-2">
                    <Building className="w-4 h-4 text-[#00AEEF]" />
                    <span className="tracking-wide">{region.region}</span>
                  </h3>
                  
                  <div className="flex justify-between items-center mb-4 px-1">
                    <div className="flex flex-col">
                      <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase mb-1">Online</span>
                      <span className="text-emerald-400 font-mono text-xl font-bold leading-none">{region.online_devices}</span>
                    </div>
                    <div className="w-[1px] h-8 bg-white/10"></div>
                    <div className="flex flex-col text-right">
                      <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase mb-1">Alerts</span>
                      <span className={`font-mono text-xl font-bold leading-none ${isCritical ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-slate-300'}`}>
                        {region.alert_devices}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/device')}
                    className="w-full py-2.5 bg-gradient-to-r from-[rgba(0,174,239,0.15)] to-[rgba(0,174,239,0.05)] hover:from-[rgba(0,174,239,0.3)] hover:to-[rgba(0,174,239,0.1)] border border-[rgba(0,174,239,0.4)] text-[#00AEEF] rounded-full text-sm font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(0,174,239,0.1)] hover:shadow-[0_0_20px_rgba(0,174,239,0.3)]"
                  >
                    View Devices
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Custom CSS to hide default leaflet UI and style popups */}
      <style>{`
        .leaflet-container { background: #0a0a0a; }
        .leaflet-popup-content-wrapper { 
            background: rgba(15, 23, 42, 0.75) !important; 
            backdrop-filter: blur(16px) !important;
            -webkit-backdrop-filter: blur(16px) !important;
            color: #f8fafc !important; 
            border: 1px solid rgba(255, 255, 255, 0.1) !important; 
            border-radius: 16px !important; 
            box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(0, 174, 239, 0.1) inset !important; 
            padding: 0 !important;
        }
        .leaflet-popup-content { margin: 8px !important; }
        .leaflet-popup-tip-container { margin-top: -1px !important; }
        .leaflet-popup-tip { 
            background: rgba(15, 23, 42, 0.9) !important; 
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; 
            border-right: 1px solid rgba(255, 255, 255, 0.1) !important; 
            box-shadow: 2px 2px 5px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-close-button {
            color: rgba(255, 255, 255, 0.5) !important;
            padding: 12px 12px 0 0 !important;
            font-size: 18px !important;
            transition: color 0.2s !important;
        }
        .leaflet-popup-close-button:hover {
            color: #fff !important;
            background: transparent !important;
        }
        .leaflet-control-attribution { background: rgba(0,0,0,0.5) !important; color: #888 !important; }
        .leaflet-control-attribution a { color: #aaa !important; }
      `}</style>
    </div>
  );
}
