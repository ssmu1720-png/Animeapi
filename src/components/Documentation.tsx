import React, { useState } from 'react';
import {
  BookOpen,
  Rocket,
  Copy,
  Check,
  Code2,
  Terminal,
  ExternalLink,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { ENDPOINTS_DATA } from '../data/endpoints.ts';

export const Documentation: React.FC = () => {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(id);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const vercelJsonContent = `{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.ts"
    },
    {
      "source": "/(.*)",
      "destination": "/dist/$1"
    }
  ]
}`;

  const vercelApiHandlerContent = `import express from 'express';
import { apiRouter } from '../src/server/routes.ts';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;`;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Overview Card */}
      <div className="p-6 bg-gradient-to-r from-[#041a12] via-[#05291e] to-[#041a12] rounded-2xl border border-emerald-900/50 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30">
                Official API Docs
              </span>
              <span className="text-xs text-slate-400 font-mono">· By lyrical</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              animelyrical REST API Reference
            </h2>
            <p className="text-xs text-slate-300 font-mono mt-1 max-w-2xl leading-relaxed">
              Clean, JSON-first anime scraper engine and stream resolver. Easily integrate anime search, episode metadata, server feeds, and video playback into your apps, bots, or streaming frontends.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/api/openapi.json"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold font-mono shadow-md shadow-emerald-800/40 transition-colors"
            >
              <span>Download OpenAPI Spec</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Vercel Deployment Section */}
      <div className="p-6 bg-[#03120c] rounded-2xl border border-emerald-900/40 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-[#062419] border border-emerald-800 flex items-center justify-center text-cyan-300">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Deploying animelyrical on Vercel
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Serverless execution ready with zero configuration
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          animelyrical includes native Vercel serverless function exports. You can deploy it in 30 seconds using the Vercel CLI or by pushing this repository directly to GitHub and importing it into Vercel.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CLI instructions */}
          <div className="p-4 bg-[#020b08] rounded-xl border border-emerald-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-emerald-400">
                  Step 1: Deploy with Vercel CLI
                </span>
                <button
                  onClick={() => copyText('npm i -g vercel\nvercel --prod', 'cli')}
                  className="text-slate-400 hover:text-emerald-300 text-xs flex items-center gap-1 font-mono"
                >
                  {copiedFile === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-3 bg-black/60 rounded-lg text-emerald-300 font-mono text-xs overflow-x-auto">
{`# Install CLI & Deploy
npm i -g vercel
vercel --prod`}
              </pre>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-3">
              Vercel automatically detects the Vite build output in <code>dist</code> and the serverless endpoint in <code>/api</code>.
            </p>
          </div>

          {/* vercel.json */}
          <div className="p-4 bg-[#020b08] rounded-xl border border-emerald-950 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  Included vercel.json
                </span>
                <button
                  onClick={() => copyText(vercelJsonContent, 'vercel_json')}
                  className="text-slate-400 hover:text-cyan-300 text-xs flex items-center gap-1 font-mono"
                >
                  {copiedFile === 'vercel_json' ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy</span>
                </button>
              </div>
              <pre className="p-3 bg-black/60 rounded-lg text-cyan-300 font-mono text-[11px] overflow-x-auto">
                {vercelJsonContent}
              </pre>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-3">
              Routes all <code>/api/*</code> requests directly to serverless execution.
            </p>
          </div>
        </div>
      </div>

      {/* Endpoints Reference Directory */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Full Endpoint Specifications</span>
        </h3>

        <div className="space-y-3">
          {ENDPOINTS_DATA.map((ep) => (
            <div
              key={ep.key}
              className="p-5 bg-[#03120c] rounded-xl border border-emerald-900/40 hover:border-emerald-800/80 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-950 mb-3">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900 font-mono text-xs font-bold">
                    {ep.method}
                  </span>
                  <code className="text-xs font-mono font-semibold text-white">
                    {ep.path}
                  </code>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {ep.name}
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                {ep.description}
              </p>

              {/* Params list */}
              {ep.params.length > 0 ? (
                <div className="bg-[#020b08] p-3 rounded-lg border border-emerald-950 font-mono text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">
                    Query Parameters:
                  </span>
                  <div className="space-y-1.5">
                    {ep.params.map((p) => (
                      <div key={p.name} className="flex items-center gap-2 text-xs">
                        <span className="text-cyan-300 font-semibold">{p.name}</span>
                        <span className="text-slate-500">({p.type})</span>
                        <span className="text-slate-400">— {p.label}</span>
                        {p.required ? (
                          <span className="text-[10px] text-rose-400">[Required]</span>
                        ) : (
                          <span className="text-[10px] text-slate-500">[Optional]</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-[11px] font-mono text-slate-500">
                  No query parameters required.
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Creator Credits */}
      <div className="p-6 bg-[#020b08] rounded-xl border border-emerald-950 text-center font-mono">
        <h4 className="text-sm font-bold text-slate-200">
          animelyrical · Powered by lyrical
        </h4>
        <p className="text-xs text-slate-400 mt-1">
          Scraper channel: <a href="https://whatsapp.com/channel/0029VawtjOXJpe8X3j3NCZ3j" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">WhatsApp Channel (Nabees Tech / lyrical)</a>
        </p>
      </div>
    </div>
  );
};
