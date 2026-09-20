import { MapPin, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RegionsProps {
  devices: any[]; // Kept for backwards compatibility if needed, but we should probably use the new endpoint
  regionSummary?: any[]; 
}

export function Regions({ regionSummary }: RegionsProps) {
  if (!regionSummary || regionSummary.length === 0) {
     return (
        <div className="glass-card p-4 rounded-md animate-fade-up delay-500">
          <div className="flex items-center gap-2 mb-4 px-2">
            <MapPin className="text-theme-base w-5 h-5" />
            <h3 className="text-lg font-bold text-white tracking-tight">Regions</h3>
          </div>
          <div className="text-sm text-slate-500 text-center py-4">Waiting for regional data...</div>
        </div>
     )
  }

  return (
    <div className="glass-card p-4 rounded-md animate-fade-up delay-500">
      <div className="flex items-center gap-2 mb-4 px-2">
        <MapPin className="text-theme-base w-5 h-5" />
        <h3 className="text-lg font-bold text-white tracking-tight">Regions</h3>
      </div>
      
      <div className="space-y-3 px-2">
        {regionSummary.map((region) => (
          <div key={region.region} className="bg-slate-800/30 border border-slate-700/50 p-3 rounded-sm">
            <h4 className="font-semibold text-slate-200 mb-2">{region.region}</h4>
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                <span className="text-slate-300">{region.online} Online</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertCircle className={`w-3.5 h-3.5 ${region.alerts > 0 ? 'text-red-500' : 'text-slate-500'}`} />
                <span className={region.alerts > 0 ? 'text-red-400 font-medium' : 'text-slate-500'}>
                  {region.alerts} Alert{region.alerts !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
