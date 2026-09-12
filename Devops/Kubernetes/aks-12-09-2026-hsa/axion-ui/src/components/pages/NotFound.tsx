import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
      <div className="relative text-center max-w-lg">
        {/* Giant 404 watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.04]">
          <span className="text-[18rem] font-black tracking-tighter leading-none text-theme-base">404</span>
        </div>

        {/* Icon */}
        <div className="relative z-10 mb-6 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-theme-base/10 border border-theme-base/20">
          <AlertTriangle className="w-10 h-10 text-theme-base" />
        </div>

        <h1 className="relative z-10 text-4xl font-black text-white mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="relative z-10 text-slate-400 text-lg mb-8 leading-relaxed">
          The route you're looking for doesn't exist in the Axion Intelligence Platform. 
          It may have been moved or the URL might be incorrect.
        </p>

        <div className="relative z-10 flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#333] text-slate-300 hover:text-white hover:border-[#555] transition-all duration-300 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <button
            onClick={() => navigate('/fleet')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-theme-base text-black font-semibold hover:brightness-110 transition-all duration-300 text-sm shadow-lg shadow-theme-base/20"
          >
            <Home className="w-4 h-4" />
            Fleet Summary
          </button>
        </div>
      </div>
    </div>
  );
}
