import { Activity, AlertTriangle, Building, ArrowRight, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapWidget } from '../MapWidget';

interface FleetSummaryProps {
  regionSummary: any[];
}

export function FleetSummary({ regionSummary }: FleetSummaryProps) {
  const navigate = useNavigate();
  // Aggregate totals across all regions
  const totalAssets = regionSummary.reduce((acc, r) => acc + r.total_devices, 0);
  const totalOnline = regionSummary.reduce((acc, r) => acc + r.online_devices, 0);
  const totalAlerts = regionSummary.reduce((acc, r) => acc + r.alert_devices, 0);

  return (
    <div className="p-6 h-full flex flex-col overflow-auto custom-scrollbar">
      <div className="mb-6 border-b border-[#262626] pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Fleet Summary</h2>
        <p className="text-sm text-slate-400">High-level overview of all global assets and plant health.</p>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glass-card rounded-md p-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-5 h-5 text-theme-base" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Assets</h3>
          </div>
          <div className="text-4xl font-black text-white">{totalAssets}</div>
        </div>
        
        <div className="glass-card rounded-md p-6 animate-fade-up delay-100">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Assets Online</h3>
          </div>
          <div className="text-4xl font-black text-white">{totalOnline}</div>
        </div>

        <div className="glass-card rounded-md p-6 relative overflow-hidden animate-fade-up delay-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Alerts</h3>
          </div>
          <div className="text-4xl font-black text-white">{totalAlerts}</div>
          {totalAlerts > 0 && (
            <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
          )}
        </div>
      </div>

      {/* Global Interactive Map */}
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Map className="w-5 h-5 text-theme-base" /> Global Operations Map
      </h3>
      <div className="mb-8 animate-fade-up delay-300">
        <MapWidget regionSummary={regionSummary} />
      </div>

      {/* Region Cards */}
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Building className="w-5 h-5 text-theme-base" /> Plant Operations
      </h3>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {regionSummary.map((region, index) => {
          const delayClass = `delay-${Math.min((index + 3) * 100, 800)}`; // Stagger animations after KPIs
          return (
          <div key={region.region} className={`glass-card rounded-md flex flex-col group animate-fade-up ${delayClass}`}>
            <div className="p-5 border-b border-[#262626] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#0a0a0a] border border-[#404040] flex items-center justify-center">
                  <Building className="w-5 h-5 text-theme-base" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white tracking-tight">{region.region}</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Refinery</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => navigate('/device')}
                  className="flex items-center gap-2 text-theme-light text-sm font-bold hover:text-white transition-colors group/btn"
                >
                  View Devices <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 divide-x divide-[#262626] p-5">
              <div className="text-center">
                <div className="text-2xl font-black text-white mb-1">{region.total_devices}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-green-500 mb-1">{region.online_devices}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Online</div>
              </div>
              <div className="text-center relative">
                <div className={`text-2xl font-black mb-1 ${region.alert_devices > 0 ? 'text-red-500' : 'text-white'}`}>
                  {region.alert_devices}
                </div>
                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Alerts</div>
              </div>
            </div>
          </div>
          );
        })}

        {regionSummary.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-medium">
            No plant data available. Ensure simulator is running.
          </div>
        )}
      </div>
    </div>
  );
}
