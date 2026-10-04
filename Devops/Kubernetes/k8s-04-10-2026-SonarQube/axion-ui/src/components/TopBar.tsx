import { Database, Server, Wifi, User, LogOut, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  onlineAssets: number;
  lastUpdate: string;
  onLogout: () => void;
}

export function TopBar({ onlineAssets, lastUpdate, onLogout }: TopBarProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#262626] px-6 py-3 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-40">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-theme-grad-start via-blue-600 to-theme-base opacity-80"></div>

      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight uppercase">AXION INTELLIGENCE PLATFORM</h1>
          <p className="text-xs text-slate-400 font-medium">Agentic AI Predictive Insights</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-4 text-xs font-medium px-4 py-1.5 bg-[#0a0a0a] rounded border border-[#262626]">
          <span className="text-slate-500 uppercase tracking-widest">System Health:</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3 h-3 text-green-500" />
            <span className="text-slate-300">API</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3 text-green-500" />
            <span className="text-slate-300">DB</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Server className="w-3 h-3 text-green-500" />
            <span className="text-slate-300">Sim</span>
          </div>
        </div>

        <div className="text-right flex flex-col items-end border-r border-[#262626] pr-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-2 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
              <span className="text-[9px] uppercase font-bold text-red-400 tracking-widest">Live Stream</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-200">{onlineAssets} Assets Online</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-wider">Last Update: {lastUpdate}</p>
        </div>

        {/* AI Assistant Button */}
        <a
          href="https://chat.axionsystems.de"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-theme-grad-start to-theme-grad-end hover:from-theme-grad-start-hover hover:to-theme-grad-end-hover text-white px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(var(--theme-rgb-base),0.6)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--theme-rgb-base),0.9)] border border-theme-light/50"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-yellow-300" />
          <span className="tracking-wide">Ask AI Assistant</span>
        </a>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 hover:bg-[#262626] p-2 rounded transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-[#404040] flex items-center justify-center">
              <User className="w-4 h-4 text-slate-300" />
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-64 bg-[#171717] border border-[#262626] rounded-md shadow-2xl overflow-hidden py-2">
              <div className="px-4 py-3 border-b border-[#262626] mb-1">
                <p className="text-xs font-bold text-white">System Admin</p>
                <p className="text-[10px] text-slate-400 truncate">info@devopsinsiders.com</p>
              </div>
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#262626] flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
