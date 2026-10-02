import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2, Globe } from 'lucide-react';
import { EndpointDef } from '../types.ts';

interface CodeSnippetsProps {
  endpoint: EndpointDef;
  params: Record<string, any>;
}

export const CodeSnippets: React.FC<CodeSnippetsProps> = ({ endpoint, params }) => {
  const [lang, setLang] = useState<'curl' | 'js' | 'python' | 'axios'>('curl');
  const [copied, setCopied] = useState(false);

  // Construct query string
  const queryParts = Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const fullUrl = `https://animelyrical.vercel.app${endpoint.path}${queryString}`;
  const relativeUrl = `${endpoint.path}${queryString}`;

  const getSnippet = () => {
    switch (lang) {
      case 'curl':
        return `# Execute GET query with animelyrical
curl -X GET "${fullUrl}" \\
  -H "Accept: application/json" \\
  -H "User-Agent: animelyrical-client"`;

      case 'js':
        return `// Modern JavaScript / TypeScript (fetch)
async function fetchAnimeData() {
  try {
    const response = await fetch("${fullUrl}", {
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const result = await response.json();
    console.log("AnimeLyrical response:", result);
    return result;
  } catch (error) {
    console.error("Failed to query animelyrical:", error);
  }
}

fetchAnimeData();`;

      case 'python':
        return `# Python 3 with 'requests' library
import requests

url = "${fullUrl}"
headers = {
    "Accept": "application/json",
    "User-Agent": "animelyrical-python"
}

try:
    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()
    data = response.json()
    print("Fetched anime payload:")
    print(data)
except requests.exceptions.RequestException as e:
    print(f"Request failed: {e}")`;

      case 'axios':
        return `// Node.js or React with Axios
import axios from 'axios';

async function queryAnimeLyrical() {
  try {
    const { data } = await axios.get("${fullUrl}", {
      headers: {
        'Accept': 'application/json'
      },
      timeout: 8000
    });
    
    console.log("Status:", data.status);
    console.log("Payload:", data);
    return data;
  } catch (err) {
    console.error("Axios query error:", err.message);
  }
}

queryAnimeLyrical();`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#041a12] border-b border-emerald-900/50">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setLang('curl')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              lang === 'curl'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>cURL</span>
          </button>
          <button
            onClick={() => setLang('js')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              lang === 'js'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Fetch (JS)</span>
          </button>
          <button
            onClick={() => setLang('axios')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              lang === 'axios'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Axios</span>
          </button>
          <button
            onClick={() => setLang('python')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-md transition-colors ${
              lang === 'python'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python</span>
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 rounded-md text-xs font-mono transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied Snippet' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Code Display */}
      <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-6 text-slate-200 bg-[#020d08]">
        <pre className="text-emerald-300 whitespace-pre font-mono select-all">
          {getSnippet()}
        </pre>
      </div>
    </div>
  );
};
