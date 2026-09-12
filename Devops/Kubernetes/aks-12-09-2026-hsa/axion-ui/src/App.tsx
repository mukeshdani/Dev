import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Login';
import { formatAppDate } from './utils/date';

// Import pages
import { FleetSummary } from './components/pages/FleetSummary';
import { AssetHierarchy } from './components/pages/AssetHierarchy';
import { AlarmsEvents } from './components/pages/AlarmsEvents';
import { HistoricalTrends } from './components/pages/HistoricalTrends';
import { SystemTopology } from './components/pages/SystemTopology';
import { SystemSettings } from './components/pages/SystemSettings';
import { DashboardView } from './components/pages/DashboardView';
import { NotFound } from './components/pages/NotFound';

const API_BASE = 'https://api.axionsystems.de';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('axion_auth') === 'true';
  });
  
  const [refreshInterval, setRefreshInterval] = useState<number | null>(5000);

  const [summary, setSummary] = useState({ onlineAssets: 0, lastUpdateRaw: '' });
  const [devices, setDevices] = useState<any[]>([]);
  const [throughput, setThroughput] = useState<any[]>([]);
  const [topAnomalous, setTopAnomalous] = useState<any[]>([]);
  const [regionSummary, setRegionSummary] = useState<any[]>([]);

  const handleLogin = () => {
    localStorage.setItem('axion_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('axion_auth');
    setIsLoggedIn(false);
  };

  // Dynamically update document.title based on route
  useEffect(() => {
    if (!isLoggedIn) {
      document.title = 'Axion | Login';
      return;
    }

    const path = location.pathname;
    if (path.startsWith('/device/')) {
      const parts = path.split('/');
      if (parts.length >= 4) {
        document.title = `Axion | ${parts[3]}`;
      } else if (parts.length === 3) {
        const regionName = parts[2].replace(/_/g, ' ');
        document.title = `Axion | ${regionName}`;
      } else {
        document.title = 'Axion | Device Dashboard';
      }
    } else if (path === '/fleet') {
      document.title = 'Axion | Fleet Summary';
    } else if (path === '/hierarchy') {
      document.title = 'Axion | Asset Hierarchy';
    } else if (path === '/alarms') {
      document.title = 'Axion | Alarms & Events';
    } else if (path === '/correlation') {
      document.title = 'Axion | Correlation Engine';
    } else if (path === '/topology') {
      document.title = 'Axion | Global Topology';
    } else if (path === '/settings') {
      document.title = 'Axion | Settings';
    } else {
      document.title = 'Axion Intelligence Platform';
    }
  }, [location, isLoggedIn]);

  const fetchDashboardData = async () => {
    if (!isLoggedIn) return;
    try {
      const [sumRes, devRes, thruRes, anomRes, regRes] = await Promise.all([
        fetch(`${API_BASE}/dashboard/summary`),
        fetch(`${API_BASE}/devices`),
        fetch(`${API_BASE}/dashboard/throughput`),
        fetch(`${API_BASE}/devices/top-anomalous`),
        fetch(`${API_BASE}/dashboard/regions`)
      ]);
      
      const [sumData, devData, thruData, anomData, regData] = await Promise.all([
        sumRes.json(),
        devRes.json(),
        thruRes.json(),
        anomRes.json(),
        regRes.json()
      ]);

      setSummary({
        onlineAssets: sumData.onlineAssets,
        lastUpdateRaw: sumData.lastUpdate || ''
      });
      setDevices(devData);
      setThroughput(thruData);
      setTopAnomalous(anomData);
      setRegionSummary(regData);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    }
  };

  const [theme, setTheme] = useState(() => localStorage.getItem('axion_theme') || 'blue');
  const [density, setDensity] = useState(() => localStorage.getItem('axion_density') || 'premium');
  const [animation, setAnimation] = useState(() => localStorage.getItem('axion_animation') || 'cinematic');
  const [timezone, setTimezone] = useState(() => localStorage.getItem('axion_timezone') || 'local');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-density', density);
    document.documentElement.setAttribute('data-animation', animation);
    localStorage.setItem('axion_theme', theme);
    localStorage.setItem('axion_density', density);
    localStorage.setItem('axion_animation', animation);
    localStorage.setItem('axion_timezone', timezone);
  }, [theme, density, animation, timezone]);

  // Main Dashboard Data Loop
  useEffect(() => {
    fetchDashboardData();
    if (refreshInterval !== null) {
      const intervalId = setInterval(fetchDashboardData, refreshInterval);
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn, refreshInterval]);


  return (
    <Routes>
      {/* Login route — only accessible when NOT logged in */}
      <Route path="/login" element={
        isLoggedIn ? <Navigate to="/fleet" replace /> : <Login onLogin={handleLogin} />
      } />

      {/* All protected routes share the dashboard shell */}
      <Route path="*" element={
        !isLoggedIn ? (
          <Navigate to="/login" replace />
        ) : (
          <div className="min-h-screen bg-[#09090b] text-slate-300 font-sans flex relative overflow-hidden noise-bg">
            {/* Giant Watermark */}
            <div className="fixed top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] z-0">
              <h1 className="text-[25rem] font-black whitespace-nowrap tracking-tighter">AXION</h1>
            </div>

            {/* Ambient Premium Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-theme-deep/20 blur-[150px] rounded-full pointer-events-none z-0"></div>
            <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-theme-deep/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* Abstract Data Rings */}
            <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-theme-base/10 rounded-full animate-[spin_120s_linear_infinite] pointer-events-none z-0 opacity-40"></div>
            <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border-2 border-dashed border-theme-base/10 rounded-full animate-[spin_90s_linear_infinite_reverse] pointer-events-none z-0 opacity-40"></div>
            
            {/* Subtle Dot Grid Background */}
            <div className="fixed inset-0 opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="z-10 flex w-full relative">
              <Sidebar />
              
              <div className="flex-1 lg:ml-64 ml-16 min-w-0 flex flex-col h-screen overflow-hidden">
                <TopBar onlineAssets={summary.onlineAssets} lastUpdate={formatAppDate(summary.lastUpdateRaw, timezone)} onLogout={handleLogout} />
                
                <Routes>
                  <Route path="/" element={<Navigate to="/fleet" replace />} />
                  
                  <Route path="/fleet" element={
                    <FleetSummary regionSummary={regionSummary} />
                  } />
                  
                  <Route path="/device/:region/:deviceId" element={
                    <DashboardView 
                      devices={devices} 
                      throughput={throughput} 
                      isLoggedIn={isLoggedIn} 
                      refreshInterval={refreshInterval} 
                      timezone={timezone} 
                    />
                  } />
                  
                  <Route path="/device/:region" element={
                    <DashboardView 
                      devices={devices} 
                      throughput={throughput} 
                      isLoggedIn={isLoggedIn} 
                      refreshInterval={refreshInterval} 
                      timezone={timezone} 
                    />
                  } />
                  
                  <Route path="/device" element={
                    <DashboardView 
                      devices={devices} 
                      throughput={throughput} 
                      isLoggedIn={isLoggedIn} 
                      refreshInterval={refreshInterval} 
                      timezone={timezone} 
                    />
                  } />
                  
                  <Route path="/hierarchy" element={<AssetHierarchy devices={devices} />} />
                  <Route path="/topology" element={<SystemTopology devices={devices} />} />
                  <Route path="/alarms" element={<AlarmsEvents devices={topAnomalous} timezone={timezone} />} />
                  <Route path="/correlation" element={<HistoricalTrends devices={devices} />} />
                  
                  <Route path="/settings" element={
                    <SystemSettings 
                      refreshInterval={refreshInterval} 
                      onRefreshIntervalChange={setRefreshInterval}
                      theme={theme}
                      onThemeChange={setTheme}
                      density={density}
                      onDensityChange={setDensity}
                      animation={animation}
                      onAnimationChange={setAnimation}
                      timezone={timezone}
                      onTimezoneChange={setTimezone}
                    />
                  } />

                  {/* 404 catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        )
      } />
    </Routes>
  );
}

export default App;
