import { useState } from 'react';
import { Lock, Shield, ArrowRight, Bot, Activity, Globe, Cpu, Zap } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'info@devopsinsiders.com' && password === 'P@ssw01rd@123') {
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300 font-sans flex relative overflow-hidden noise-bg">
      {/* Giant Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-0 select-none pointer-events-none opacity-[0.02]">
        <h1 className="text-[25rem] font-black whitespace-nowrap tracking-tighter">AXION</h1>
      </div>

      {/* Ambient Premium Glows for entire page */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-theme-deep/30 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-theme-deep/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
      
      <div className="w-full flex z-10">
        
        {/* Left Side - Branding & Visuals */}
        <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-16 border-r border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
          
          {/* Abstract Data Rings to fill empty space */}
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-theme-base/10 rounded-full animate-[spin_120s_linear_infinite] pointer-events-none"></div>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border-2 border-dashed border-theme-base/10 rounded-full animate-[spin_90s_linear_infinite_reverse] pointer-events-none"></div>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-indigo-500/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-blue-900/10 to-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 animate-fade-up">
            <img src="/logo.png" alt="AXION Systems" className="h-16 object-contain mb-12 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
              Axion Intelligence <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-grad-start to-theme-grad-end">Platform</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-xl font-medium leading-relaxed mb-12">
              Agentic AI-driven predictive maintenance and real-time telemetry analytics for global industrial operations.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-3xl">
              {/* Badge 1: Agentic AI */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up delay-200 group hover:-translate-y-1 transition-transform bg-[#0a0a0a]/50 flex flex-col gap-3 items-start">
                <div className="p-2.5 rounded-xl bg-theme-base/10 border border-theme-base/20">
                  <Bot className="w-5 h-5 text-theme-light" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Agentic AI</h3>
                  <p className="text-xs text-slate-400 leading-snug">Autonomous anomaly detection.</p>
                </div>
              </div>

              {/* Badge 2: Predictive Analytics */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up delay-300 group hover:-translate-y-1 transition-transform bg-[#0a0a0a]/50 flex flex-col gap-3 items-start">
                <div className="p-2.5 rounded-xl bg-theme-base/10 border border-theme-base/20">
                  <Activity className="w-5 h-5 text-theme-light" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Predictive AI</h3>
                  <p className="text-xs text-slate-400 leading-snug">Stop failures before they occur.</p>
                </div>
              </div>

              {/* Badge 3: Global Scale */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up delay-400 group hover:-translate-y-1 transition-transform bg-[#0a0a0a]/50 flex flex-col gap-3 items-start">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Globe className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Global Scale</h3>
                  <p className="text-xs text-slate-400 leading-snug">Manage millions of IoT sensors.</p>
                </div>
              </div>

              {/* Badge 4: Zero-Trust */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up delay-500 group hover:-translate-y-1 transition-transform bg-[#0a0a0a]/50 flex flex-col gap-3 items-start">
                <div className="p-2.5 rounded-xl bg-slate-500/10 border border-slate-500/20">
                  <Shield className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Zero-Trust</h3>
                  <p className="text-xs text-slate-400 leading-snug">Military-grade encryption.</p>
                </div>
              </div>

              {/* Badge 5: Digital Twin */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up delay-[600ms] group hover:-translate-y-1 transition-transform bg-[#0a0a0a]/50 flex flex-col gap-3 items-start">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Digital Twin</h3>
                  <p className="text-xs text-slate-400 leading-snug">Virtualize your entire fleet.</p>
                </div>
              </div>

              {/* Badge 6: Real-Time Edge */}
              <div className="glass-card p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-up delay-[700ms] group hover:-translate-y-1 transition-transform bg-[#0a0a0a]/50 flex flex-col gap-3 items-start">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Real-Time Edge</h3>
                  <p className="text-xs text-slate-400 leading-snug">Sub-second alerting pipeline.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Prominent DevOps Insiders Logo Area */}
          <div className="relative z-10 mt-auto pt-10 animate-fade-up delay-[800ms]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-gradient-to-r from-theme-base to-theme-base rounded-full"></div>
                <span className="text-[11px] text-slate-400 uppercase tracking-[0.3em] font-bold">Architected & Engineered By</span>
              </div>
              <div className="w-fit">
                <img 
                  src="/devopsinsiders-logo-light.png" 
                  alt="DevOps Insiders" 
                  className="h-12 object-contain opacity-90 hover:opacity-100 hover:scale-[1.02] transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] cursor-pointer" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-12 animate-fade-up delay-100 relative">
          {/* Subtle Dot Grid Background for right side to fill space */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="w-full max-w-md relative z-10">
            {/* Ambient massive glow directly behind form */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-theme-grad-start/10 via-blue-600/10 to-transparent blur-[80px] -z-10 rounded-full"></div>
            
            <div className="lg:hidden text-center mb-10 flex flex-col items-center">
              <img src="/logo.png" alt="AXION Systems" className="h-14 object-contain mb-5 drop-shadow-md" />
              <p className="text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px]">Axion Intelligence Platform</p>
            </div>

            <div className="glass-card border border-white/10 rounded-[2rem] p-8 lg:p-12 shadow-[0_0_80px_rgba(0,0,0,0.4)] relative overflow-hidden bg-[#050505]/80 backdrop-blur-3xl">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-theme-base/0 via-blue-500/50 to-theme-base/0"></div>
              
              <div className="mb-12 text-center lg:text-left">
                <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Welcome Back</h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">Securely sign in to access your enterprise dashboard and live telemetry.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3 ml-1">
                    Enterprise Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#000000] border border-white/10 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-theme-base focus:ring-1 focus:ring-theme-base/50 transition-all shadow-inner placeholder:text-slate-600 font-medium"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#000000] border border-white/10 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-theme-base focus:ring-1 focus:ring-theme-base/50 transition-all shadow-inner placeholder:text-slate-600 font-medium"
                    placeholder="••••••••••••"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm font-bold bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-3 animate-fade-up">
                    <Lock className="w-5 h-5 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-theme-grad-start to-theme-grad-end hover:from-theme-grad-start-hover hover:to-theme-grad-end-hover text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_0_30px_rgba(var(--theme-rgb-base),0.3)] hover:shadow-[0_0_40px_rgba(var(--theme-rgb-base),0.5)] overflow-hidden hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-flowPulse"></div>
                    <span className="relative z-10 tracking-wider text-[15px]">Secure Sign In</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
            
            <div className="text-center mt-12 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] flex items-center justify-center gap-4">
              <span>&copy; 2026 Axion Systems</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
