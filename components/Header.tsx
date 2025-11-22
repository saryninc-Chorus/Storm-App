import React, { useState, useEffect } from 'react';
import { Zap, Wifi, Globe, Play, Pause, Maximize2, Minimize2 } from 'lucide-react';

interface HeaderProps {
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isPresentationMode, togglePresentationMode }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      document.exitFullscreen().catch(e => console.error(e));
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/30 bg-[#050510]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-black border border-cyan-500 p-2 rounded-lg">
              <Globe className="text-cyan-400 w-6 h-6" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              CRYSTALLINE <span className="text-white text-sm tracking-[0.3em] font-light">5G</span>
            </h1>
            <p className="text-[10px] text-cyan-300/70 tracking-widest uppercase">Ghana Prototype // Node Alpha-1</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
           {/* Presentation Controls */}
           <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
             <button 
                onClick={togglePresentationMode}
                className={`p-2 rounded-md transition-all ${isPresentationMode ? 'bg-cyan-500/20 text-cyan-400' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}
                title={isPresentationMode ? "Pause Presentation (Space)" : "Start Presentation Mode (Space)"}
             >
               {isPresentationMode ? <Pause size={18} /> : <Play size={18} />}
             </button>
             <button 
                onClick={toggleFullscreen}
                className="p-2 rounded-md hover:bg-white/5 text-slate-400 hover:text-white transition-all"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
             >
               {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
             </button>
           </div>

          {/* System Metrics - Hidden on small screens */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">System Status</span>
              <span className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                OPTIMAL
              </span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Frequency</span>
              <span className="text-cyan-400 font-mono text-sm flex items-center gap-1">
                <Zap size={12} /> 88.4 THz
              </span>
            </div>
            <div className="h-8 w-px bg-white/10"></div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Coverage</span>
              <span className="text-purple-400 font-mono text-sm flex items-center gap-1">
                <Wifi size={12} /> 99.9%
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};