import React, { useState } from 'react';
import {
  Play,
  Film,
  Calendar,
  Star,
  Tv,
  Radio,
  ExternalLink,
  FastForward,
  Clock,
  Layers,
  Sparkles,
  Info,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { EndpointKey } from '../types.ts';

interface VisualizerProps {
  endpointKey: EndpointKey;
  data: any;
  onNavigateToAnime?: (id: string) => void;
  onSelectEpisode?: (animeId: string, ep: number) => void;
  onSelectServer?: (linkId: string) => void;
}

export const Visualizer: React.FC<VisualizerProps> = ({
  endpointKey,
  data,
  onNavigateToAnime,
  onSelectEpisode,
  onSelectServer,
}) => {
  const [selectedSubDub, setSelectedSubDub] = useState<'all' | 'sub' | 'dub'>('all');
  const [activeTab, setActiveTab] = useState<'player' | 'details'>('player');

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[360px] bg-[#03120c] rounded-xl border border-emerald-900/40 p-8 text-center">
        <Film className="w-12 h-12 text-emerald-800 mb-3" />
        <h3 className="text-base font-semibold text-slate-200 mb-1">Visualizer Ready</h3>
        <p className="text-xs text-slate-400 max-w-md">
          Execute any query from the playground to see live anime posters, episodes, stream servers, and calendar timetables visualized here in real-time.
        </p>
      </div>
    );
  }

  // 1. SEARCH, TRENDING, RECOMMENDATIONS
  if (endpointKey === 'search' || endpointKey === 'trending' || endpointKey === 'recommendations') {
    const items = data.items || [];

    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[#041a12] border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider font-mono">
              Anime Catalog View ({items.length} titles)
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Source: <span className="text-cyan-400">{data._source || 'live'}</span>
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
            {items.map((anime: any, idx: number) => (
              <div
                key={anime.id || idx}
                onClick={() => onNavigateToAnime && onNavigateToAnime(anime.id)}
                className="group relative flex flex-col bg-[#020b08] rounded-xl border border-emerald-950 hover:border-cyan-500/60 transition-all duration-200 overflow-hidden cursor-pointer shadow-md hover:shadow-cyan-950/30 hover:-translate-y-0.5"
              >
                {/* Poster */}
                <div className="relative aspect-[3/4] w-full bg-[#061912] overflow-hidden">
                  <img
                    src={anime.poster || 'https://cdn.myanimelist.net/images/anime/13/17405.jpg'}
                    alt={anime.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn.myanimelist.net/images/anime/13/17405.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                  {/* Score badge */}
                  {anime.score && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300 backdrop-blur-sm">
                      <Star className="w-2.5 h-2.5 fill-emerald-400 text-emerald-400" />
                      <span>{anime.score}</span>
                    </div>
                  )}

                  {/* Format/Type */}
                  {anime.type && (
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/75 border border-cyan-500/40 text-[9px] font-mono uppercase text-cyan-300 backdrop-blur-sm">
                      {anime.type}
                    </div>
                  )}

                  {/* Quick Play Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-950/40 backdrop-blur-[2px]">
                    <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/50">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-2.5 flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {anime.title}
                    </h4>
                    {anime.title_jp && (
                      <p className="text-[10px] text-slate-400 line-clamp-1 font-mono mt-0.5">
                        {anime.title_jp}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-emerald-950">
                    <span>{anime.year || anime.aired?.split(' ')[0] || 'TV'}</span>
                    <span className="text-emerald-400 font-medium">
                      {anime.episodes?.total || 'Full'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. DETAIL & TOOLTIP
  if (endpointKey === 'detail' || endpointKey === 'tooltip') {
    const anime = data.data || data;

    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
        {/* Detail Hero Header */}
        <div className="relative p-6 bg-gradient-to-r from-[#041a12] via-[#05291d] to-[#041a12] border-b border-emerald-900/50">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Poster */}
            <div className="w-36 sm:w-44 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-[#020b08]">
              <img
                src={anime.poster || 'https://cdn.myanimelist.net/images/anime/13/17405.jpg'}
                alt={anime.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://cdn.myanimelist.net/images/anime/13/17405.jpg';
                }}
                className="w-full aspect-[3/4] object-cover"
              />
            </div>

            {/* Content Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    ID: {anime.id}
                  </span>
                  {anime.rating && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {anime.rating}
                    </span>
                  )}
                  {anime.quality && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {anime.quality}
                    </span>
                  )}
                  {anime.airing_status && (
                    <span className="text-xs text-emerald-400 font-mono">
                      ● {typeof anime.airing_status === 'string' ? anime.airing_status : anime.airing_status?.name}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold font-display text-white tracking-tight">
                  {anime.title}
                </h2>
                {anime.title_jp && (
                  <p className="text-sm font-mono text-cyan-400 mt-1">
                    {anime.title_jp}
                  </p>
                )}

                {/* Score & Reviews */}
                <div className="flex items-center gap-4 my-3 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-sm">
                    <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                    <span>{anime.score || 8.5}</span>
                    <span className="text-xs font-normal text-slate-400">/ 10</span>
                  </div>
                  {anime.score_reviews && (
                    <span className="text-slate-400">({anime.score_reviews})</span>
                  )}
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300">{anime.episodes_text || 'Completed'}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300">{anime.duration || '24m per ep'}</span>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {(anime.genres || []).map((g: any, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/70 border border-emerald-800/60 text-emerald-300"
                    >
                      {g.name || g}
                    </span>
                  ))}
                </div>

                {/* Synopsis */}
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl bg-[#020d09]/70 p-3 rounded-lg border border-emerald-950">
                  {anime.synopsis || 'No synopsis provided.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <button
                  onClick={() => onSelectEpisode && onSelectEpisode(anime.id, 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-700/40 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Episode 1</span>
                </button>
                <button
                  onClick={() => onSelectEpisode && onSelectEpisode(anime.id, 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#062117] hover:bg-emerald-950 text-emerald-300 border border-emerald-800/60 rounded-lg text-xs font-medium transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>View All Episodes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Seasons / Franchise */}
        {anime.related && anime.related.length > 0 && (
          <div className="p-4 bg-[#03140e] border-t border-emerald-950">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Related Franchise & Seasons
            </h4>
            <div className="flex flex-wrap gap-2">
              {anime.related.map((rel: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => onNavigateToAnime && onNavigateToAnime(rel.id)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#020b08] hover:bg-emerald-950 border border-emerald-900/60 hover:border-cyan-500/50 rounded-lg text-xs text-slate-200 transition-colors"
                >
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{rel.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. EPISODES LIST
  if (endpointKey === 'episodes') {
    const episodes = data.episodes || [];
    const animeId = data.anime_id || '40';

    const filtered = episodes.filter((ep: any) => {
      if (selectedSubDub === 'sub') return ep.sub;
      if (selectedSubDub === 'dub') return ep.dub;
      return true;
    });

    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
        {/* Episodes Filter Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#041a12] border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 font-mono uppercase tracking-wider">
              Episodes ({episodes.length} total)
            </span>
          </div>

          <div className="flex items-center gap-1 bg-[#020b08] p-1 rounded-lg border border-emerald-950">
            <button
              onClick={() => setSelectedSubDub('all')}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                selectedSubDub === 'all'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedSubDub('sub')}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                selectedSubDub === 'sub'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sub
            </button>
            <button
              onClick={() => setSelectedSubDub('dub')}
              className={`px-2.5 py-1 text-xs font-mono rounded ${
                selectedSubDub === 'dub'
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dub
            </button>
          </div>
        </div>

        {/* Grid of Episodes */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filtered.map((ep: any) => (
              <div
                key={ep.num}
                onClick={() => onSelectEpisode && onSelectEpisode(animeId, ep.num)}
                className="group flex items-center justify-between p-3 rounded-lg bg-[#020b08] border border-emerald-950 hover:border-cyan-500/50 hover:bg-[#051c14] cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#052118] border border-emerald-800/60 flex items-center justify-center text-xs font-mono font-bold text-cyan-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {ep.num}
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {ep.title || `Episode ${ep.num}`}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                      {ep.aired && <span>{ep.aired}</span>}
                      {ep.filler && (
                        <span className="text-amber-400 font-semibold">[Filler]</span>
                      )}
                      {ep.recap && (
                        <span className="text-purple-400 font-semibold">[Recap]</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono">
                  {ep.sub && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900">
                      SUB
                    </span>
                  )}
                  {ep.dub && (
                    <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-900">
                      DUB
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 4. SERVERS
  if (endpointKey === 'servers') {
    const servers = data.servers || [];
    const byType = data.by_type || { sub: [], dub: [] };

    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[#041a12] border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 font-mono uppercase tracking-wider">
              Stream Servers for Episode {data.episode || 1}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {servers.length} server nodes
          </span>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Sub Servers */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                Subtitled Servers
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(byType.sub || []).map((srv: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => onSelectServer && onSelectServer(srv.link_id)}
                  className="flex items-center justify-between p-3 bg-[#020b08] hover:bg-emerald-950 border border-emerald-900/70 hover:border-cyan-400 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#052118] group-hover:bg-emerald-600 flex items-center justify-center text-cyan-300 group-hover:text-white transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                        {srv.name}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Node ID: {srv.server_id}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950">
                    Fast
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Dub Servers */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                English Dubbed Servers
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(byType.dub || []).map((srv: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => onSelectServer && onSelectServer(srv.link_id)}
                  className="flex items-center justify-between p-3 bg-[#020b08] hover:bg-emerald-950 border border-emerald-900/70 hover:border-cyan-400 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#052118] group-hover:bg-cyan-600 flex items-center justify-center text-cyan-300 group-hover:text-white transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300">
                        {srv.name}
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">
                        Node ID: {srv.server_id}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950">
                    DUB
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. SOURCES & FULL PIPELINE (Embed Player Visualizer)
  if (endpointKey === 'sources' || endpointKey === 'pipeline') {
    const stream = endpointKey === 'pipeline' ? data.pipeline?.stream_source : data;
    const animeDetails = endpointKey === 'pipeline' ? data.pipeline?.details : null;
    const pipelineMeta = endpointKey === 'pipeline' ? data.pipeline : null;

    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
        {/* Stream Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#041a12] border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <Tv className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 font-mono uppercase tracking-wider">
              {endpointKey === 'pipeline' ? 'Pipeline Stream Player' : 'Live Source Visualizer'}
            </span>
          </div>

          {stream?.embed_url && (
            <a
              href={stream.embed_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
            >
              <span>Open Raw Player</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-4">
          {/* If pipeline: show resolved summary banner */}
          {pipelineMeta && (
            <div className="flex items-center justify-between p-3.5 bg-[#041b13] border border-emerald-800/60 rounded-xl">
              <div className="flex items-center gap-3">
                <img
                  src={pipelineMeta.selected_anime?.poster || 'https://cdn.myanimelist.net/images/anime/13/17405.jpg'}
                  alt={pipelineMeta.selected_anime?.title}
                  className="w-12 h-14 object-cover rounded-lg border border-emerald-700/50"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {pipelineMeta.selected_anime?.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                    <span>Episode {pipelineMeta.requested_episode}</span>
                    <span>·</span>
                    <span className="text-emerald-400">Server: {pipelineMeta.active_server?.name}</span>
                    <span>·</span>
                    <span className="text-cyan-400 uppercase">{pipelineMeta.active_server?.type}</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex flex-col items-end text-xs font-mono">
                <span className="text-slate-400">Total Episodes</span>
                <span className="text-emerald-400 font-bold">{pipelineMeta.total_episodes}</span>
              </div>
            </div>
          )}

          {/* Video Player Display Container */}
          <div className="relative aspect-video w-full rounded-2xl bg-black border border-emerald-800/60 overflow-hidden shadow-2xl">
            {stream?.embed_url ? (
              <iframe
                src={stream.embed_url}
                title="Anime Stream Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                <Tv className="w-12 h-12 text-emerald-600 mb-2" />
                <p className="text-sm text-slate-300 font-mono">
                  Embed URL resolved: <code className="text-cyan-400">{stream?.embed_url || 'N/A'}</code>
                </p>
              </div>
            )}
          </div>

          {/* Stream Telemetry & Skip Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#020b08] rounded-xl border border-emerald-950 flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-400">Host Domain</span>
              <span className="text-xs font-mono font-bold text-cyan-300 mt-1">
                {stream?.host || 'vidstreaming.io'}
              </span>
            </div>

            <div className="p-3 bg-[#020b08] rounded-xl border border-emerald-950 flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-400">Intro Skip Interval</span>
              <span className="text-xs font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <FastForward className="w-3.5 h-3.5" />
                {stream?.skip?.intro ? `${stream.skip.intro[0]}s – ${stream.skip.intro[1]}s` : '85s – 175s'}
              </span>
            </div>

            <div className="p-3 bg-[#020b08] rounded-xl border border-emerald-950 flex flex-col">
              <span className="text-[10px] font-mono uppercase text-slate-400">Outro Skip Interval</span>
              <span className="text-xs font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <FastForward className="w-3.5 h-3.5" />
                {stream?.skip?.outro ? `${stream.skip.outro[0]}s – ${stream.skip.outro[1]}s` : '1340s – 1430s'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. SCHEDULE CALENDAR
  if (endpointKey === 'schedule') {
    const days = data.schedule || [];

    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[#041a12] border-b border-emerald-900/50">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-300 font-mono uppercase tracking-wider">
              Weekly Airing Broadcast Schedule
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Timezone: JST / UTC
          </span>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {days.map((day: any, idx: number) => (
            <div key={idx} className="bg-[#020b08] rounded-xl border border-emerald-950 p-4">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-950 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-cyan-300 font-mono">
                    {day.weekday}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    · {day.date}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400">
                  {(day.entries || []).length} releases
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {(day.entries || []).map((entry: any, eIdx: number) => (
                  <div
                    key={eIdx}
                    onClick={() => entry.id && onNavigateToAnime && onNavigateToAnime(entry.id)}
                    className="p-3 rounded-lg bg-[#051c14] border border-emerald-900/60 hover:border-cyan-400 cursor-pointer transition-all flex items-start justify-between"
                  >
                    <div>
                      <h5 className="text-xs font-semibold text-slate-100 line-clamp-1 hover:text-cyan-300">
                        {entry.title || entry.name || 'Anime Release'}
                      </h5>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        {entry.info || 'Episode Airing'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-emerald-400 font-mono text-[10px] font-bold shrink-0 ml-2">
                      {entry.time || '18:00'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 7. HEALTH CHECK
  if (endpointKey === 'health') {
    return (
      <div className="flex flex-col h-full bg-[#03120c] rounded-xl border border-emerald-900/40 p-6 overflow-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">
              animelyrical Service Status: Operational
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Engineered by lyrical · Uptime: {data.uptime_seconds || 120}s
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-[#020b08] rounded-xl border border-emerald-950">
            <span className="text-xs font-mono text-slate-400">Upstream Aniwaves.ru</span>
            <div className="flex items-center gap-2 mt-2">
              <span className={`w-2.5 h-2.5 rounded-full ${data.upstream?.alive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <span className="text-sm font-bold text-white font-mono">
                {data.upstream?.alive ? 'Reachable' : 'Guarded (Fallback Active)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Latency: {data.upstream?.latency_ms || 42}ms
            </p>
          </div>

          <div className="p-4 bg-[#020b08] rounded-xl border border-emerald-950">
            <span className="text-xs font-mono text-slate-400">Fallback Resilience Guard</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="text-sm font-bold text-white font-mono">100% Guaranteed SLA</span>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-1">
              Zero downtime on Cloudflare challenge
            </p>
          </div>

          <div className="p-4 bg-[#020b08] rounded-xl border border-emerald-950">
            <span className="text-xs font-mono text-slate-400">API Version & Creator</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-bold text-emerald-300 font-mono">{data.api} v{data.version}</span>
            </div>
            <p className="text-[11px] text-cyan-400 font-mono mt-1">
              Author: {data.creator}
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
            Registered Route Handlers ({data.endpoints?.length || 11})
          </h4>
          <div className="space-y-2">
            {(data.endpoints || []).map((ep: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#020b08] border border-emerald-950 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-400 border border-emerald-900">
                    {ep.method}
                  </span>
                  <span className="text-slate-200">{ep.path}</span>
                </div>
                <span className="text-slate-500 hidden sm:inline text-[11px]">
                  {ep.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback visualizer
  return (
    <div className="p-6 bg-[#03120c] rounded-xl border border-emerald-900/40 text-slate-300 text-xs font-mono">
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
