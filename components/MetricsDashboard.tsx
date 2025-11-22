import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ShieldCheck, Cpu, Radio, Leaf, Brain, Activity } from 'lucide-react';

const generateData = () => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: i,
      latency: Math.max(0.5, 1.2 + Math.random() * 0.4 - 0.2),
      energy: 150 + Math.random() * 40,
      stability: 95 + Math.random() * 5,
    });
  }
  return data;
};

export const MetricsDashboard: React.FC = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        const lastTime = prev[prev.length - 1].time;
        newData.push({
          time: lastTime + 1,
          latency: Math.max(0.5, 1.2 + (Math.random() * 0.8 - 0.4)), // Fluctuate around 1.2ms
          energy: 170 + (Math.random() * 10 - 5),
          stability: Math.min(100, 98 + (Math.random() * 3 - 1)),
        });
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-cyan-500/20 w-32 h-32 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Signal Strength</p>
              <h3 className="text-3xl font-bold text-white">98% <span className="text-sm font-normal text-cyan-400 ml-2">ENHANCED</span></h3>
            </div>
            <div className="bg-cyan-500/20 p-3 rounded-xl border border-cyan-500/30 text-cyan-400">
              <Radio size={24} />
            </div>
          </div>
          <div className="mt-4 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[98%] shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-purple-500/20 w-32 h-32 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Latency</p>
              <h3 className="text-3xl font-bold text-white">1.2ms <span className="text-sm font-normal text-purple-400 ml-2">QUANTUM</span></h3>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/30 text-purple-400">
              <Activity size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <span className="text-green-400">▼ 0.02ms</span> since last cycle
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-amber-500/20 w-32 h-32 rounded-full blur-3xl group-hover:bg-amber-500/30 transition-all"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Ancestral Encoding</p>
              <h3 className="text-3xl font-bold text-white">ONLINE</h3>
            </div>
            <div className="bg-amber-500/20 p-3 rounded-xl border border-amber-500/30 text-amber-400">
              <Brain size={24} />
            </div>
          </div>
          <div className="mt-4 flex gap-1">
             {[1,2,3,4,5].map(i => (
               <div key={i} className={`h-1 flex-1 rounded-full ${i < 5 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`}></div>
             ))}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latency Chart */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Activity className="text-purple-500" size={18} />
            Latency Fluctuation (ms)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 3]} tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px'}}
                  itemStyle={{color: '#a855f7'}}
                />
                <Line type="monotone" dataKey="latency" stroke="#a855f7" strokeWidth={2} dot={false} activeDot={{r: 6, fill: '#a855f7'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Energy Efficiency Chart */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Leaf className="text-green-500" size={18} />
            Energy Harvest Ratio (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis domain={[100, 200]} tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px'}}
                   itemStyle={{color: '#22c55e'}}
                />
                <Area type="monotone" dataKey="energy" stroke="#22c55e" fillOpacity={1} fill="url(#colorEnergy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-cyan-500/50 transition-colors">
          <div className="bg-slate-800 p-3 rounded-lg">
            <ShieldCheck className="text-blue-400" size={20} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Protocol Security</p>
            <p className="text-white font-mono">QUANTUM-SECURE</p>
          </div>
        </div>
        
        <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-purple-500/50 transition-colors">
          <div className="bg-slate-800 p-3 rounded-lg">
            <Cpu className="text-purple-400" size={20} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Core Temp</p>
            <p className="text-white font-mono">0.004 K</p>
          </div>
        </div>

         <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-pink-500/50 transition-colors">
          <div className="bg-slate-800 p-3 rounded-lg">
            <Activity className="text-pink-400" size={20} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Harmonics</p>
            <p className="text-white font-mono">RESONANT</p>
          </div>
        </div>

         <div className="glass-panel p-4 rounded-xl flex items-center gap-4 hover:border-amber-500/50 transition-colors">
          <div className="bg-slate-800 p-3 rounded-lg">
            <Brain className="text-amber-400" size={20} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Cultural Data</p>
            <p className="text-white font-mono">PRESERVED</p>
          </div>
        </div>
      </div>

    </div>
  );
};
