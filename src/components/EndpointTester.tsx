import React, { useState, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Copy,
  Check,
  Code2,
  Tv,
  FileJson,
  Layers,
  Activity,
  ArrowRight,
  Clock,
  Database,
  ExternalLink
} from 'lucide-react';
import { ENDPOINTS_DATA } from '../data/endpoints.ts';
import { EndpointDef, EndpointKey, ApiResponse } from '../types.ts';
import { Visualizer } from './Visualizer.tsx';
import { JsonViewer } from './JsonViewer.tsx';
import { CodeSnippets } from './CodeSnippets.tsx';

interface EndpointTesterProps {
  initialEndpoint?: EndpointKey;
  onNavigateToAnime?: (id: string) => void;
  onSelectEpisode?: (animeId: string, ep: number) => void;
  onSelectServer?: (linkId: string) => void;
}

export const EndpointTester: React.FC<EndpointTesterProps> = ({
  initialEndpoint = 'search',
  onNavigateToAnime,
  onSelectEpisode,
  onSelectServer,
}) => {
  const [selectedKey, setSelectedKey] = useState<EndpointKey>(initialEndpoint);
  const [params, setParams] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [statusInfo, setStatusInfo] = useState<{
    code: number;
    timeMs: number;
    sizeKb: number;
    source: string;
  } | null>(null);
  const [activeView, setActiveView] = useState<'visualizer' | 'json' | 'code' | 'headers'>('visualizer');
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Synchronize when initialEndpoint prop updates
  useEffect(() => {
    if (initialEndpoint) {
      setSelectedKey(initialEndpoint);
    }
  }, [initialEndpoint]);

  const currentEndpoint = ENDPOINTS_DATA.find((e) => e.key === selectedKey) || ENDPOINTS_DATA[0];

  // Set default params when switching endpoint
  useEffect(() => {
    const defaults: Record<string, any> = {};
    currentEndpoint.params.forEach((p) => {
      defaults[p.name] = p.default;
    });
    setParams(defaults);
  }, [selectedKey]);

  // Construct URL string
  const getBuiltUrl = () => {
    const queryParts = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== '')
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
    const queryStr = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    return `${currentEndpoint.path}${queryStr}`;
  };

  const handleSend = async () => {
    setLoading(true);
    const start = Date.now();
    const url = getBuiltUrl();

    try {
      const res = await fetch(url);
      const latency = Date.now() - start;
      const data = await res.json();
      const sizeBytes = new Blob([JSON.stringify(data)]).size;

      setResponse(data);
      setStatusInfo({
        code: res.status,
        timeMs: latency,
        sizeKb: Number((sizeBytes / 1024).toFixed(2)),
        source: data._source || (res.ok ? 'live' : 'error'),
      });
    } catch (err: any) {
      const latency = Date.now() - start;
      setResponse({ error: err.message, status: 500 });
      setStatusInfo({
        code: 500,
        timeMs: latency,
        sizeKb: 0,
        source: 'client_error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Run on initial mount
  useEffect(() => {
    handleSend();
  }, [selectedKey]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.origin + getBuiltUrl());
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Endpoint Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {ENDPOINTS_DATA.map((ep) => {
          const isActive = ep.key === selectedKey;
          return (
            <button
              key={ep.key}
              onClick={() => setSelectedKey(ep.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/40'
                  : 'bg-[#03140e] text-slate-300 hover:text-white hover:bg-[#06241a] border border-emerald-900/40'
              }`}
            >
              <span className={`text-[10px] font-bold px-1 py-0.2 rounded ${isActive ? 'bg-black/30 text-emerald-200' : 'text-emerald-400'}`}>
                {ep.method}
              </span>
              <span>{ep.name}</span>
            </button>
          );
        })}
      </div>

      {/* Query Builder Console */}
      <div className="bg-[#03120c] rounded-2xl border border-emerald-900/40 p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-emerald-900/40">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 font-mono text-xs font-bold">
                {currentEndpoint.method}
              </span>
              <h2 className="text-base font-bold font-display text-white">
                {currentEndpoint.name}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              {currentEndpoint.description}
            </p>
          </div>

          {/* Quick Preset Buttons */}
          {currentEndpoint.samplePresets && currentEndpoint.samplePresets.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-slate-500 mr-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> Presets:
              </span>
              {currentEndpoint.samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setParams(preset.params);
                  }}
                  className="px-2.5 py-1 bg-[#051c14] hover:bg-emerald-950 text-emerald-300 hover:text-white border border-emerald-900/60 rounded-lg text-xs font-mono transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input Parameters Row */}
        {currentEndpoint.params.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 pb-2">
            {currentEndpoint.params.map((p) => (
              <div key={p.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label className="text-slate-300 font-semibold">{p.label}</label>
                  <span className="text-[10px] text-cyan-400">{p.name}</span>
                </div>
                <input
                  type={p.type === 'number' ? 'number' : 'text'}
                  value={params[p.name] ?? ''}
                  onChange={(e) =>
                    setParams({
                      ...params,
                      [p.name]: p.type === 'number' ? Number(e.target.value) : e.target.value,
                    })
                  }
                  placeholder={p.placeholder}
                  className="px-3 py-2 bg-[#020b08] text-slate-100 placeholder-slate-600 rounded-xl border border-emerald-900/70 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 text-xs font-mono transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Live URL & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4 pt-4 border-t border-emerald-900/30">
          <div className="flex items-center gap-2 flex-1 min-w-0 bg-[#020b08] px-3.5 py-2 rounded-xl border border-emerald-950 font-mono text-xs">
            <span className="text-emerald-500 font-bold select-none">GET</span>
            <span className="text-slate-200 truncate select-all">{getBuiltUrl()}</span>
            <button
              onClick={handleCopyUrl}
              className="ml-auto text-slate-500 hover:text-emerald-400 transition-colors p-1"
              title="Copy endpoint full URL"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold font-mono tracking-wide shadow-lg shadow-emerald-950/60 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Executing...' : 'Send Request'}</span>
          </button>
        </div>
      </div>

      {/* Response Panel */}
      <div className="bg-[#03120c] rounded-2xl border border-emerald-900/40 overflow-hidden shadow-xl min-h-[500px] flex flex-col">
        {/* Response Subheader & Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 bg-[#041a12] border-b border-emerald-900/50">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveView('visualizer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeView === 'visualizer'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Visualizer</span>
            </button>

            <button
              onClick={() => setActiveView('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeView === 'json'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Raw JSON</span>
            </button>

            <button
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                activeView === 'code'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Snippets</span>
            </button>
          </div>

          {/* Response Metrics */}
          {statusInfo && (
            <div className="flex items-center gap-3 text-xs font-mono">
              <span
                className={`px-2 py-0.5 rounded font-bold ${
                  statusInfo.code === 200
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                    : 'bg-rose-950 text-rose-300 border border-rose-900'
                }`}
              >
                {statusInfo.code} OK
              </span>
              <span className="text-cyan-300 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="tabular-nums">{statusInfo.timeMs}ms</span>
              </span>
              <span className="text-slate-400 hidden sm:inline">
                {statusInfo.sizeKb} KB
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#020b08] text-[10px] text-slate-400 border border-emerald-950 uppercase">
                {statusInfo.source}
              </span>
            </div>
          )}
        </div>

        {/* Response Body Container */}
        <div className="flex-1 p-4 lg:p-6 overflow-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-72 space-y-3">
              <div className="w-10 h-10 border-2 border-emerald-500 border-t-cyan-400 rounded-full animate-spin" />
              <p className="text-xs font-mono text-emerald-400 animate-pulse">
                Querying animelyrical scraper engine...
              </p>
            </div>
          ) : activeView === 'visualizer' ? (
            <Visualizer
              endpointKey={selectedKey}
              data={response}
              onNavigateToAnime={(id) => {
                setSelectedKey('detail');
                setParams({ id });
              }}
              onSelectEpisode={(animeId, ep) => {
                setSelectedKey('servers');
                setParams({ id: animeId, ep });
              }}
              onSelectServer={(linkId) => {
                setSelectedKey('sources');
                setParams({ linkId });
              }}
            />
          ) : activeView === 'json' ? (
            <JsonViewer data={response} />
          ) : (
            <CodeSnippets endpoint={currentEndpoint} params={params} />
          )}
        </div>
      </div>
    </div>
  );
};
