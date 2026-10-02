/**
 * animelyrical Frontend Type Definitions
 */

export type EndpointKey =
  | 'search'
  | 'detail'
  | 'episodes'
  | 'servers'
  | 'sources'
  | 'pipeline'
  | 'schedule'
  | 'trending'
  | 'recommendations'
  | 'tooltip'
  | 'health';

export interface EndpointDef {
  key: EndpointKey;
  name: string;
  method: 'GET';
  path: string;
  description: string;
  params: Array<{
    name: string;
    label: string;
    type: 'text' | 'number';
    default: string | number;
    placeholder: string;
    required: boolean;
    options?: string[];
  }>;
  samplePresets?: Array<{
    label: string;
    params: Record<string, any>;
  }>;
}

export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  _source?: 'upstream' | 'fallback_cache';
  _latency_ms?: number;
  _author?: string;
  _api?: string;
  [key: string]: any;
}

export interface HealthCheckResult {
  endpoint: string;
  method: string;
  status: 'pending' | 'success' | 'warning' | 'error';
  statusCode?: number;
  latencyMs?: number;
  error?: string;
}
