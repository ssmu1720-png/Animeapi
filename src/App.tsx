/**
 * @license
 * animelyrical - Anime Data Scraper API & Interactive Testing Platform
 * Creator: lyrical
 */

import React, { useState, useEffect } from 'react';
import {
  Terminal,
  Activity,
  ShieldCheck,
  BookOpen,
  Rocket,
  Play,
  Search,
  Sparkles,
  ExternalLink,
  Flame,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { EndpointTester } from './components/EndpointTester.tsx';
import { HealthMonitor } from './components/HealthMonitor.tsx';
import { Documentation } from './components/Documentation.tsx';
import { Visualizer } from './components/Visualizer.tsx';
import { EndpointKey } from './types.ts';
import bannerImg from './assets/images/animelyrical_banner_1790978761638.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'visualizer' | 'health' | 'docs' | 'deploy'>('playground');
  const [selectedEndpointKey, setSelectedEndpointKey] = useState<EndpointKey>('search');
  const [systemHealth, setSystemHealth] = useState({ ok: true, latency: 38, checking: false });

  // Visualizer standalone explorer state
  const [visualSearchKw, setVisualSearchKw] = useState('naruto');
  const [visualData, setVisualData] = useState<any>(null);
  const [visualLoading, setVisualLoading] = useState(false);
  const [visualCurrentEp, setVisualCurrentEp] = useState<EndpointKey>('search');

  // Check health on launch
  const checkHealth = async () => {
    setSystemHealth((prev) => ({ ...prev, checking: true }));
    const start = Date.now();
    try {
      const res = await fetch('/api/health');
      const latency = Date.now() - start;
      const data = await res.json();
      setSystemHealth({
        ok: res.ok,
        latency: data.upstream?.latency_ms || latency,
        checking: false,
      });
    } catch {
      setSystemHealth({
        ok: false,
        latency: 0,
        checking: false,
      });
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  // Quick visual query runner
  const runVisualQuery = async (keyword: string) => {
    setVisualLoading(true);
    setVisualCurrentEp('search');
    try {
      const res = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
      const data = await res.json();
      setVisualData(data);
    } catch {
      // ignore
    } finally {
      setVisualLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'visualizer' && !visualData) {
      runVisualQuery('naruto');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020906] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemHealth={systemHealth}
        onRefreshHealth={checkHealth}
      />

      {/* Hero Visual Banner Strip */}
      <section className="relative overflow-hidden border-b border-emerald-950/80 bg-gradient-to-b from-[#041a12] to-[#020906]">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-mono text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next-Gen Anime Scraper & Stream Engine</span>
                <span className="text-slate-600">·</span>
                <span className="text-cyan-400">by lyrical</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                High-Speed Anime API & Real-Time Console
              </h1>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                Query search hits, rich episode metadata, sub/dub server feeds, and video player embeds in real-time. Built with resilient fallback caching and ready for instant Vercel deployment.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('playground');
                    setSelectedEndpointKey('pipeline');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold font-mono tracking-wide shadow-lg shadow-emerald-950/80 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>Test Full Pipeline</span>
                </button>

                <button
                  onClick={() => setActiveTab('visualizer')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#051c14] hover:bg-[#07291e] text-emerald-300 border border-emerald-800/60 rounded-xl text-xs font-mono transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Live Anime Explorer</span>
                </button>

                <button
                  onClick={() => setActiveTab('health')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#03140e] hover:bg-[#052118] text-cyan-300 border border-emerald-900/60 rounded-xl text-xs font-mono transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Run Diagnostics</span>
                </button>
              </div>

              {/* Feature Highlights */}
              <div className="flex flex-wrap items-center gap-4 pt-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> 11 REST Endpoints
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Sub & Dub Support
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Skip Intro/Outro Timestamps
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span> Vercel Ready
                </span>
              </div>
            </div>

            {/* Hero Right Banner Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-700/50 shadow-2xl shadow-emerald-950/80 group">
                <img
                  src={bannerImg}
                  alt="animelyrical Banner"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020906] via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-[#020b08]/80 backdrop-blur-md border border-emerald-900/60 text-xs font-mono">
                  <div>
                    <span className="text-white font-bold block">animelyrical Engine</span>
                    <span className="text-[10px] text-emerald-400">Active Node · Port 3000</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-cyan-300 border border-emerald-800 text-[11px] font-bold">
                    OPERATIONAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        {/* PLAYGROUND TAB */}
        {activeTab === 'playground' && (
          <EndpointTester
            initialEndpoint={selectedEndpointKey}
            onNavigateToAnime={(id) => {
              setSelectedEndpointKey('detail');
            }}
            onSelectEpisode={(animeId, ep) => {
              setSelectedEndpointKey('servers');
            }}
            onSelectServer={(linkId) => {
              setSelectedEndpointKey('sources');
            }}
          />
        )}

        {/* VISUALIZER EXPLORER TAB */}
        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            {/* Visualizer Header Search Bar */}
            <div className="p-6 bg-gradient-to-r from-[#041a12] via-[#05291e] to-[#041a12] rounded-2xl border border-emerald-900/50 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-display text-white">
                    Live Anime Visualizer
                  </h2>
                  <p className="text-xs text-slate-300 font-mono mt-0.5">
                    Query anime, browse episodes, and test stream playback in real-time
                  </p>
                </div>

                <div className="flex items-center gap-2 max-w-md w-full">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={visualSearchKw}
                      onChange={(e) => setVisualSearchKw(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && runVisualQuery(visualSearchKw)}
                      placeholder="Search title (e.g. naruto, jujutsu, bleach)..."
                      className="w-full pl-9 pr-3 py-2 bg-[#020b08] text-slate-100 placeholder-slate-500 rounded-xl border border-emerald-900/80 focus:outline-none focus:border-cyan-400 text-xs font-mono"
                    />
                  </div>
                  <button
                    onClick={() => runVisualQuery(visualSearchKw)}
                    disabled={visualLoading}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold font-mono transition-colors cursor-pointer"
                  >
                    {visualLoading ? 'Loading...' : 'Search'}
                  </button>
                </div>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-4 text-xs font-mono">
                <span className="text-slate-500">Trending Quick Picks:</span>
                {['Naruto', 'One Piece', 'Jujutsu Kaisen', 'Bleach TYBW', 'Solo Leveling'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => {
                      setVisualSearchKw(kw);
                      runVisualQuery(kw);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#020b08] hover:bg-emerald-950 text-emerald-300 border border-emerald-900/60 hover:border-cyan-500/50 transition-colors"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizer Display Area */}
            <div className="min-h-[500px]">
              <Visualizer
                endpointKey={visualCurrentEp}
                data={visualData}
                onNavigateToAnime={async (id) => {
                  setVisualLoading(true);
                  try {
                    const res = await fetch(`/api/detail?id=${id}`);
                    const data = await res.json();
                    setVisualData(data);
                    setVisualCurrentEp('detail');
                  } catch {
                    // ignore
                  } finally {
                    setVisualLoading(false);
                  }
                }}
                onSelectEpisode={async (animeId, ep) => {
                  setVisualLoading(true);
                  try {
                    const res = await fetch(`/api/servers?id=${animeId}&ep=${ep}`);
                    const data = await res.json();
                    setVisualData(data);
                    setVisualCurrentEp('servers');
                  } catch {
                    // ignore
                  } finally {
                    setVisualLoading(false);
                  }
                }}
                onSelectServer={async (linkId) => {
                  setVisualLoading(true);
                  try {
                    const res = await fetch(`/api/sources?linkId=${linkId}`);
                    const data = await res.json();
                    setVisualData(data);
                    setVisualCurrentEp('sources');
                  } catch {
                    // ignore
                  } finally {
                    setVisualLoading(false);
                  }
                }}
              />
            </div>
          </div>
        )}

        {/* HEALTH & DIAGNOSTICS TAB */}
        {activeTab === 'health' && <HealthMonitor />}

        {/* API DOCUMENTATION & VERCEL DEPLOY TAB */}
        {(activeTab === 'docs' || activeTab === 'deploy') && <Documentation />}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-950/80 bg-[#030d0a] px-4 lg:px-8 py-8 mt-12 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-extrabold text-base text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              animelyrical
            </span>
            <span className="text-slate-600">·</span>
            <span>Created by <span className="text-cyan-400 font-semibold">lyrical</span></span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('playground')}
              className="hover:text-emerald-400 transition-colors"
            >
              Playground
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className="hover:text-emerald-400 transition-colors"
            >
              Health Check
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className="hover:text-emerald-400 transition-colors"
            >
              API Reference
            </button>
            <a
              href="/api/openapi.json"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              OpenAPI 3.0
            </a>
            <a
              href="https://whatsapp.com/channel/0029VawtjOXJpe8X3j3NCZ3j"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Community Channel
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
