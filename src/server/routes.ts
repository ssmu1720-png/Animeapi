/**
 * @license
 * animelyrical Express Router
 * Author: lyrical
 */

import { Router } from 'express';
import {
  searchAnime,
  animeDetail,
  episodeList,
  serverList,
  sources,
  schedule,
  trending,
  recommendations,
  tooltip,
  fullPipeline,
  pingUpstream,
} from './aniwaves.ts';

export const apiRouter = Router();

// CORS & custom headers
apiRouter.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('X-Powered-By', 'animelyrical by lyrical');
  next();
});

const APP_START_TIME = Date.now();

// Health check endpoint
apiRouter.get('/health', async (_req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - APP_START_TIME) / 1000);
  const upstreamStatus = await pingUpstream();
  
  res.json({
    status: 'ok',
    api: 'animelyrical',
    version: '1.4.0',
    creator: 'lyrical',
    uptime_seconds: uptimeSeconds,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    server_time: new Date().toUTCString(),
    upstream: {
      target: 'https://aniwaves.ru',
      alive: upstreamStatus.ok,
      http_status: upstreamStatus.status,
      latency_ms: upstreamStatus.latency_ms,
      cloudflare_challenge: upstreamStatus.waf_challenge,
      fallback_guard_active: true,
    },
    endpoints: [
      { method: 'GET', path: '/api/health', desc: 'Real-time API health status and diagnostics' },
      { method: 'GET', path: '/api/search?keyword={query}', desc: 'Search anime by title, romaji or alternate names' },
      { method: 'GET', path: '/api/detail?id={id}', desc: 'Full anime details, synopsis, genres, studios & related series' },
      { method: 'GET', path: '/api/episodes?id={id}', desc: 'Complete episode list with sub/dub, filler and recap tags' },
      { method: 'GET', path: '/api/servers?id={id}&ep={num}', desc: 'Available stream servers grouped by Sub and Dub' },
      { method: 'GET', path: '/api/sources?linkId={linkId}', desc: 'Stream player embed URL and intro/outro timestamps' },
      { method: 'GET', path: '/api/pipeline?keyword={q}&ep={num}', desc: 'Single-call end-to-end resolution pipeline' },
      { method: 'GET', path: '/api/schedule', desc: 'Airing anime calendar schedule' },
      { method: 'GET', path: '/api/trending', desc: 'Currently trending anime catalog' },
      { method: 'GET', path: '/api/recommendations?id={id}', desc: 'Recommended anime titles' },
      { method: 'GET', path: '/api/tooltip?id={id}', desc: 'Hovercard quick preview metadata' },
      { method: 'GET', path: '/api/openapi.json', desc: 'OpenAPI 3.0 specification download' },
    ],
  });
});

// Search
apiRouter.get('/search', async (req, res) => {
  const keyword = String(req.query.keyword || req.query.q || '').trim();
  if (!keyword) {
    res.status(400).json({ error: 'Query parameter "keyword" or "q" is required.', status: 400 });
    return;
  }
  const result = await searchAnime(keyword);
  res.json(result);
});

// Anime Detail
apiRouter.get(['/detail', '/detail/:id', '/anime/:id'], async (req, res) => {
  const id = String(req.params.id || req.query.id || req.query.slug || '40').trim();
  const result = await animeDetail(id);
  res.json(result);
});

// Episode List
apiRouter.get(['/episodes', '/episodes/:id'], async (req, res) => {
  const id = String(req.params.id || req.query.id || '40').trim();
  const result = await episodeList(id);
  res.json(result);
});

// Server List
apiRouter.get('/servers', async (req, res) => {
  const id = String(req.query.id || '40').trim();
  const ep = String(req.query.ep || '1').trim();
  const result = await serverList(id, ep);
  res.json(result);
});

// Sources
apiRouter.get('/sources', async (req, res) => {
  const linkId = String(req.query.linkId || req.query.id || 'link-vidstream-sub-41').trim();
  const result = await sources(linkId);
  res.json(result);
});

// Schedule
apiRouter.get('/schedule', async (req, res) => {
  const date = req.query.date ? String(req.query.date) : undefined;
  const result = await schedule(date);
  res.json(result);
});

// Trending
apiRouter.get('/trending', async (_req, res) => {
  const result = await trending();
  res.json(result);
});

// Recommendations
apiRouter.get('/recommendations', async (req, res) => {
  const id = String(req.query.id || '40').trim();
  const result = await recommendations(id);
  res.json(result);
});

// Tooltip
apiRouter.get(['/tooltip', '/tooltip/:id'], async (req, res) => {
  const id = String(req.params.id || req.query.id || '40').trim();
  const result = await tooltip(id);
  res.json(result);
});

// Full Pipeline
apiRouter.get('/pipeline', async (req, res) => {
  const keyword = String(req.query.keyword || req.query.q || 'naruto').trim();
  const ep = Number(req.query.ep || 1);
  const result = await fullPipeline(keyword, ep);
  res.json(result);
});

// OpenAPI Spec
apiRouter.get('/openapi.json', (_req, res) => {
  res.json({
    openapi: '3.0.3',
    info: {
      title: 'animelyrical API',
      version: '1.4.0',
      description: 'High-performance anime data scraper API by lyrical, providing fast catalog searches, rich episode metadata, server feeds, and streaming player embeds.',
      contact: {
        name: 'lyrical',
        url: 'https://whatsapp.com/channel/0029VawtjOXJpe8X3j3NCZ3j',
      },
    },
    servers: [
      { url: '/api', description: 'Current animelyrical instance' },
      { url: 'https://animelyrical.vercel.app/api', description: 'Production Vercel deployment' },
    ],
    paths: {
      '/health': {
        get: {
          summary: 'Service health & diagnostic stats',
          responses: { '200': { description: 'API is running smoothly' } },
        },
      },
      '/search': {
        get: {
          summary: 'Search anime catalog',
          parameters: [{ name: 'keyword', in: 'query', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Matching anime items list' } },
        },
      },
      '/detail': {
        get: {
          summary: 'Get anime details',
          parameters: [{ name: 'id', in: 'query', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Complete anime metadata' } },
        },
      },
      '/episodes': {
        get: {
          summary: 'Get episode listing',
          parameters: [{ name: 'id', in: 'query', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Episodes with air dates & duration' } },
        },
      },
      '/servers': {
        get: {
          summary: 'Get servers for an episode',
          parameters: [
            { name: 'id', in: 'query', required: true, schema: { type: 'string' } },
            { name: 'ep', in: 'query', required: true, schema: { type: 'integer', default: 1 } },
          ],
          responses: { '200': { description: 'Sub & Dub server list' } },
        },
      },
      '/sources': {
        get: {
          summary: 'Get video source embed link',
          parameters: [{ name: 'linkId', in: 'query', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Embed player URL and intro/outro timestamps' } },
        },
      },
      '/pipeline': {
        get: {
          summary: 'Full end-to-end resolution pipeline',
          parameters: [
            { name: 'keyword', in: 'query', required: true, schema: { type: 'string', default: 'naruto' } },
            { name: 'ep', in: 'query', required: false, schema: { type: 'integer', default: 1 } },
          ],
          responses: { '200': { description: 'All-in-one parsed bundle' } },
        },
      },
    },
  });
});
