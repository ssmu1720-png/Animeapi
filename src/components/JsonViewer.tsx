import React, { useState } from 'react';
import { Copy, Check, Search, Download } from 'lucide-react';

interface JsonViewerProps {
  data: any;
  title?: string;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data, title = 'Response Payload' }) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `animelyrical-response-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Basic syntax highlighter
  const renderHighlightedJson = () => {
    if (!jsonString) return null;

    const lines = jsonString.split('\n');

    return lines.map((line, idx) => {
      let isMatch = searchTerm && line.toLowerCase().includes(searchTerm.toLowerCase());

      // Simple regex coloring for keys and values
      let formattedLine = line
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
          let cls = 'text-cyan-300'; // number
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-emerald-400 font-semibold'; // key
            } else {
              cls = 'text-teal-200'; // string value
            }
          } else if (/true|false/.test(match)) {
            cls = 'text-emerald-300 font-bold'; // boolean
          } else if (/null/.test(match)) {
            cls = 'text-slate-400 italic'; // null
          }
          return `<span class="${cls}">${match}</span>`;
        });

      return (
        <div
          key={idx}
          className={`flex items-start font-mono text-xs leading-5 hover:bg-emerald-950/30 px-2 rounded ${
            isMatch ? 'bg-cyan-950/60 ring-1 ring-cyan-500/50' : ''
          }`}
        >
          <span className="w-10 select-none text-right pr-4 text-emerald-800/80 font-mono text-[11px]">
            {idx + 1}
          </span>
          <span
            className="flex-1 whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden shadow-inner">
      {/* Action Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#041a12] border-b border-emerald-900/50 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-emerald-300 font-semibold">{title}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">
            {(new Blob([jsonString]).size / 1024).toFixed(2)} KB
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Search inside JSON */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find key/val..."
              className="pl-8 pr-2.5 py-1 text-xs bg-[#020b08] text-slate-200 placeholder-slate-500 rounded-md border border-emerald-900/60 focus:outline-none focus:border-cyan-500 w-32 sm:w-44 transition-all"
            />
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-cyan-300 border border-emerald-800/50 rounded-md transition-colors"
            title="Download JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="text-[11px]">JSON</span>
          </button>
        </div>
      </div>

      {/* Code Container */}
      <div className="flex-1 overflow-auto p-3 text-slate-300">
        {data ? (
          <div className="font-mono">{renderHighlightedJson()}</div>
        ) : (
          <div className="text-center py-12 text-slate-500 text-sm font-mono">
            No response data yet. Execute a query above.
          </div>
        )}
      </div>
    </div>
  );
};
