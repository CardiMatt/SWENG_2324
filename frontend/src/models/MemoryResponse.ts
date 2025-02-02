import type { Memory } from '@memori.ai/memori-api-client/dist/types';

export interface MemoryResponse {
  count: number;
  matches: Array<{
    memory: Memory;  // Ogni oggetto "memory" sarà tipizzato come Memory
    confidence: number;
    confidenceLevel: string;
  }>;
  requestID: string;
  requestDateTime: string;
  resultCode: number;
  resultMessage: string;
}
