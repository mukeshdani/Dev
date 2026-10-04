import { LayoutDashboard, Server, AlertTriangle, LineChart, Settings, Network } from 'lucide-react';

import { NavLink, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: '/fleet', icon: LayoutDashboard, label: 'Fleet Summary' },
    { path: '/device', icon: Server, label: 'Device Diagnostics' },
    { path: '/hierarchy', icon: Server, label: 'Asset Hierarchy' },
    { path: '/topology', icon: Network, label: 'System Topology' },
    { path: '/alarms', icon: AlertTriangle, label: 'Alarms & Events' },
    { path: '/correlation', icon: LineChart, label: 'Correlation Engine' },
    { path: '/settings', icon: Settings, label: 'System Settings' },
  ];

  return (
    <div className="w-16 lg:w-64 bg-[#0a0a0a] border-r border-[#262626] flex flex-col h-screen fixed left-0 top-0">
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#262626]">
        <img src="/logo.png" alt="AXION Systems" className="h-10 object-contain hidden lg:block" />
        <img src="/logo.png" alt="AXION Systems" className="h-8 object-contain lg:hidden" style={{ objectPosition: 'left', width: '32px', overflow: 'hidden' }} />
      </div>

      <div className="flex-1 py-6 flex flex-col gap-2">
        {menuItems.map((item) => {
          // Special active check for /device to cover /device/:region/:deviceId
          const isActive = currentPath.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`w-full flex items-center gap-4 px-4 lg:px-6 py-3 transition-colors ${
                isActive 
                  ? 'bg-[#171717] border-r-2 border-theme-base' 
                  : 'hover:bg-[#171717]/50 border-r-2 border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-theme-base' : ''}`} />
              <span className={`hidden lg:block font-medium text-sm ${isActive ? 'text-white' : ''}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Branding */}
      <div className="mt-auto p-4">
        <a 
          href="https://devopsinsiders.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-[#262626] hover:border-theme-base/50 hover:shadow-[0_0_20px_rgba(var(--theme-rgb-base),0.1)] transition-all duration-500 overflow-hidden"
        >
          {/* Subtle background animated shine */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-flowPulse bg-gradient-to-r from-transparent via-theme-base/10 to-transparent pointer-events-none"></div>

          <div className="flex items-center gap-2 mb-1">
            <span className="h-[1px] w-4 bg-gradient-to-r from-transparent to-slate-600 hidden lg:block transition-all group-hover:w-6 group-hover:to-theme-base/80"></span>
            <span className="text-[10px] text-slate-500 group-hover:text-theme-light uppercase tracking-[0.25em] font-medium transition-colors duration-300 hidden lg:block">Developed By</span>
            <span className="h-[1px] w-4 bg-gradient-to-l from-transparent to-slate-600 hidden lg:block transition-all group-hover:w-6 group-hover:to-theme-base/80"></span>
          </div>
          
          <div className="relative w-full flex justify-center py-1">
            <div className="absolute inset-0 bg-theme-base/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src="/devopsinsiders-logo-light.png" 
              alt="DevOps Insiders" 
              className="h-10 w-auto max-w-[95%] object-contain opacity-75 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 relative z-10 hidden lg:block drop-shadow-md" 
            />
          </div>

          {/* Mobile mini version */}
          <div className="lg:hidden relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#333] group-hover:border-theme-base/50 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(var(--theme-rgb-base),0.2)]">
            <span className="text-sm font-black text-slate-400 group-hover:text-theme-light drop-shadow-sm">DI</span>
          </div>
        </a>
      </div>
    </div>
  );
}
