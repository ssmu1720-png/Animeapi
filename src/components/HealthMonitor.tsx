import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Server,
  Activity,
  Zap,
  Cpu,
  Layers
} from 'lucide-react';
import { HealthCheckResult } from '../types.ts';

interface EndpointPingTest {
  name: string;
  method: string;
  path: string;
  expectedStatus: number;
}

const TESTS_SUITE: EndpointPingTest[] = [
  { name: 'System Health Manifest', method: 'GET', path: '/api/health', expectedStatus: 200 },
  { name: 'Anime Catalog Search', method: 'GET', path: '/api/search?keyword=naruto', expectedStatus: 200 },
  { name: 'Metadata & Synopsis Detail', method: 'GET', path: '/api/detail?id=40', expectedStatus: 200 },
  { name: 'Episode Index Catalog', method: 'GET', path: '/api/episodes?id=40', expectedStatus: 200 },
  { name: 'Streaming Server Nodes', method: 'GET', path: '/api/servers?id=40&ep=1', expectedStatus: 200 },
  { name: 'Video Player Embed Sources', method: 'GET', path: '/api/sources?linkId=link-vidstream-sub-41', expectedStatus: 200 },
  { name: 'Full Resolution Pipeline', method: 'GET', path: '/api/pipeline?keyword=naruto&ep=1', expectedStatus: 200 },
  { name: 'Airing Broadcast Schedule', method: 'GET', path: '/api/schedule', expectedStatus: 200 },
  { name: 'Trending Series Feed', method: 'GET', path: '/api/trending', expectedStatus: 200 },
  { name: 'OpenAPI Specification', method: 'GET', path: '/api/openapi.json', expectedStatus: 200 },
];

export const HealthMonitor: React.FC = () => {
  const [results, setResults] = useState<HealthCheckResult[]>([]);
  const [testing, setTesting] = useState(false);
  const [systemUptime, setSystemUptime] = useState<number>(0);
  const [lastCheckTime, setLastCheckTime] = useState<string>('');

  const runAllTests = async () => {
    setTesting(true);
    const initial: HealthCheckResult[] = TESTS_SUITE.map((t) => ({
      endpoint: t.name,
      method: t.method,
      status: 'pending',
    }));
    setResults(initial);

    const updated: HealthCheckResult[] = [];

    for (let i = 0; i < TESTS_SUITE.length; i++) {
      const test = TESTS_SUITE[i];
      const start = Date.now();
      try {
        const res = await fetch(test.path);
        const latency = Date.now() - start;

        if (test.path === '/api/health') {
          const body = await res.clone().json();
          if (body.uptime_seconds) {
            setSystemUptime(body.uptime_seconds);
          }
        }

        updated.push({
          endpoint: test.name,
          method: test.method,
          status: res.ok ? 'success' : 'error',
          statusCode: res.status,
          latencyMs: latency,
        });
      } catch (err: any) {
        updated.push({
          endpoint: test.name,
          method: test.method,
          status: 'error',
          statusCode: 500,
          latencyMs: Date.now() - start,
          error: err.message,
        });
      }
      setResults([...updated, ...initial.slice(updated.length)]);
    }

    setLastCheckTime(new Date().toLocaleTimeString());
    setTesting(false);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const totalSuccess = results.filter((r) => r.status === 'success').length;
  const avgLatency =
    results.length > 0
      ? Math.round(
          results.reduce((acc, curr) => acc + (curr.latencyMs || 0), 0) / (results.length || 1)
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & Trigger */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#041a12] via-[#05291e] to-[#041a12] rounded-2xl border border-emerald-900/50 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#06291d] border border-emerald-700/60 flex items-center justify-center text-cyan-300 shadow-lg shadow-emerald-950/60">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white tracking-tight">
              animelyrical Diagnostics & Health Monitor
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              Live telemetry monitoring by <span className="text-cyan-400 font-semibold">lyrical</span> · Automated self-healing fallbacks
            </p>
          </div>
        </div>

        <button
          onClick={runAllTests}
          disabled={testing}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold font-mono tracking-wide shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${testing ? 'animate-spin' : ''}`} />
          <span>{testing ? 'Testing Diagnostics...' : 'Run Full Suite Diagnostics'}</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#03140e] rounded-xl border border-emerald-900/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400">Endpoint Availability</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
              {results.length > 0 ? `${Math.round((totalSuccess / results.length) * 100)}%` : '100%'}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
              {totalSuccess} of {TESTS_SUITE.length} healthy
            </span>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500/80" />
        </div>

        <div className="p-4 bg-[#03140e] rounded-xl border border-emerald-900/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400">Mean Latency</span>
            <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">
              {avgLatency} <span className="text-sm font-normal text-slate-400">ms</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
              Low-latency edge caching
            </span>
          </div>
          <Zap className="w-8 h-8 text-cyan-500/80" />
        </div>

        <div className="p-4 bg-[#03140e] rounded-xl border border-emerald-900/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400">Engine Creator</span>
            <div className="text-2xl font-bold font-display text-white mt-1">
              lyrical
            </div>
            <span className="text-[11px] font-mono text-emerald-400 mt-0.5 block">
              animelyrical v1.4
            </span>
          </div>
          <Cpu className="w-8 h-8 text-emerald-500/80" />
        </div>

        <div className="p-4 bg-[#03140e] rounded-xl border border-emerald-900/40 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-slate-400">Last Telemetry Ping</span>
            <div className="text-xl font-bold font-mono text-slate-200 mt-1">
              {lastCheckTime || 'Just now'}
            </div>
            <span className="text-[11px] font-mono text-slate-400 mt-0.5 block">
              Auto-updates on trigger
            </span>
          </div>
          <Clock className="w-8 h-8 text-slate-500" />
        </div>
      </div>

      {/* Tests Results Table */}
      <div className="bg-[#03120c] rounded-2xl border border-emerald-900/40 overflow-hidden shadow-lg">
        <div className="px-6 py-4 bg-[#041a12] border-b border-emerald-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-300">
              Target Endpoint Ping Diagnostics
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {TESTS_SUITE.length} automated tests
          </span>
        </div>

        <div className="divide-y divide-emerald-950/80">
          {TESTS_SUITE.map((test, idx) => {
            const res = results[idx];
            const isPending = !res || res.status === 'pending';
            const isSuccess = res && res.status === 'success';

            return (
              <div
                key={idx}
                className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#051c14]/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#020b08] flex items-center justify-center">
                    {isPending ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                    ) : isSuccess ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        {test.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900">
                        {test.method}
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-slate-400 mt-0.5 block">
                      {test.path}
                    </code>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:justify-end">
                  {/* Latency Bar */}
                  {res?.latencyMs !== undefined && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-[#020b08] overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                          style={{
                            width: `${Math.min(100, Math.max(10, (res.latencyMs / 400) * 100))}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono text-cyan-300 tabular-nums w-12 text-right">
                        {res.latencyMs}ms
                      </span>
                    </div>
                  )}

                  {/* Status Code */}
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isPending
                        ? 'bg-slate-800 text-slate-400'
                        : isSuccess
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    {isPending ? 'PENDING' : `${res.statusCode || 200} OK`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
