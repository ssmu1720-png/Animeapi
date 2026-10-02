import React from 'react';
import { Activity, Terminal, BookOpen, Rocket, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'playground' | 'visualizer' | 'health' | 'docs' | 'deploy';
  setActiveTab: (tab: 'playground' | 'visualizer' | 'health' | 'docs' | 'deploy') => void;
  systemHealth: { ok: boolean; latency: number; checking: boolean };
  onRefreshHealth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  systemHealth,
  onRefreshHealth,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#030d0a]/90 backdrop-blur-md border-b border-emerald-900/40 px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-600 p-[1px] shadow-lg shadow-emerald-950/50">
            <div className="w-full h-full bg-[#041610] rounded-[11px] flex items-center justify-center text-cyan-400 font-display font-bold text-lg tracking-wider">
              AL
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#041610] animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                animelyrical
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400">
                v1.4 API
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono tracking-tight">
              crafted by <span className="text-cyan-400 font-medium">lyrical</span>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#051a13] p-1 rounded-xl border border-emerald-900/50">
          <button
            onClick={() => setActiveTab('playground')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'playground'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                : 'text-slate-300 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Playground</span>
          </button>

          <button
            onClick={() => setActiveTab('visualizer')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'visualizer'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                : 'text-slate-300 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Visualizer</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'health'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                : 'text-slate-300 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Health & Diagnostics</span>
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'docs'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                : 'text-slate-300 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>API Docs</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'deploy'
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/50'
                : 'text-slate-300 hover:text-white hover:bg-emerald-900/30'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Vercel Deploy</span>
          </button>
        </nav>

        {/* Status & Primary Action */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onRefreshHealth}
            title="Click to re-ping API health"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#062117] border border-emerald-800/60 hover:border-cyan-500/50 transition-colors text-xs font-mono"
          >
            {systemHealth.checking ? (
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            ) : systemHealth.ok ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden sm:inline text-slate-300">
              {systemHealth.checking ? 'Pinging...' : systemHealth.ok ? 'API Nominal' : 'Fallback Active'}
            </span>
            <span className="text-cyan-400 tabular-nums font-semibold">
              {systemHealth.latency}ms
            </span>
          </button>

          <a
            href="/api/openapi.json"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-700/50 rounded-lg transition-colors"
          >
            OpenAPI Spec
          </a>
        </div>
      </div>
    </header>
  );
};
