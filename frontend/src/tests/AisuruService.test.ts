import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AisuruService } from '../services/AisuruService';

// Mock the memoriApiClient function and its methods
vi.mock('@memori.ai/memori-api-client', () => {
  return {
    __esModule: true,
    default: () => {
      return {
        initSession: vi.fn().mockResolvedValue({ sessionID: 'testSessionID' }),
        deleteSession: vi.fn().mockResolvedValue({}),
        getSession: vi.fn().mockResolvedValue({ sessionID: 'testSessionID' }),
        getMemory: vi.fn().mockResolvedValue({ memory: { memoryID: 'testMemoryID', answers: [] } }),
        getMemories: vi.fn().mockResolvedValue({ memories: [] }),
        patchMemory: vi.fn().mockResolvedValue({}),
        deleteMemory: vi.fn().mockResolvedValue({}),
        postMemory: vi.fn().mockResolvedValue({ memoryID: 'newMemoryID' }),
      };
    },
  };
});


describe('AisuruService', () => {
  let aisuruService: AisuruService;
  
  beforeEach(() => {
    aisuruService = new AisuruService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should open a new session if none is active', async () => {
    await aisuruService.checkEnsureSession();
    // The session should now be set
    expect((aisuruService as any).sessionID).toBe('testSessionID');
  });

  it('should not open a new session if one is already active', async () => {
    // First call ensures we open the session
    await aisuruService.checkEnsureSession();
    const firstSessionID = (aisuruService as any).sessionID;

    // Second call should keep the same session
    await aisuruService.checkEnsureSession();
    const secondSessionID = (aisuruService as any).sessionID;

    expect(firstSessionID).toBe(secondSessionID);
  });

  it('should get a memory using the current session', async () => {
    await aisuruService.checkEnsureSession();
    const memory = await aisuruService.getMemory('testMemoryID');
    expect(memory).toStrictEqual({ memory: { memoryID: 'testMemoryID', answers: [] } });
  });

  it('should add a memory and return its new ID', async () => {
    await aisuruService.checkEnsureSession();
    const newID = await aisuruService.addMemory({ title: 'New Memory', answers: [] });
    expect(newID).toBe('newMemoryID');
  });

  it('should close the session', async () => {
    await aisuruService.checkEnsureSession();
    await aisuruService.closeSession();
    expect((aisuruService as any).sessionID).toBe(null);
  });
  
});
