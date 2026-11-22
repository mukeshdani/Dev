
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from 'recharts';

interface ThroughputProps {
  data: any[];
}

export function Throughput({ data }: ThroughputProps) {
  return (
    <div className="glass-card p-6 rounded-md animate-fade-up delay-400">
      <h3 className="text-lg font-bold text-white tracking-tight mb-4">Telemetry Throughput</h3>
      <p className="text-sm text-slate-400 mb-6">Records per Minute (Last Hour)</p>
      
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="minute" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              minTickGap={15}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
              cursor={{ fill: '#334155', opacity: 0.4 }}
            />
            <Bar 
              dataKey="count" 
              fill="#3B82F6" 
              radius={[4, 4, 0, 0]} 
              className="fill-theme-base hover:fill-blue-400 transition-all duration-300"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
