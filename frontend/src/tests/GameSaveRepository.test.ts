import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GameSaveRepository } from '../repositories/GameSaveRepository';
import { collection, doc, setDoc, getDoc, getDocs, query, where, deleteDoc, updateDoc } from 'firebase/firestore';

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  setDoc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
}));

describe('GameSaveRepository', () => {
  const mockGameSave = {
    id: 'save123',
    userId: 'user-123',
    storyId: 'story-123',
    progress: '50%',
    inventory: 'sword, shield',
    saveDate: new Date(),
    memoriConfig: {
      context: 'AUTH:AUTENTICATO,STORIA:STORY123',
      initialQuestion: '00001',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Reset dei mock prima di ogni test
  });

  it('should save a game save', async () => {
    const setDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (setDoc as any).mockImplementation(setDocMock);

    const saveId = await GameSaveRepository.saveGameSave(mockGameSave);

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'save123');
    expect(setDocMock).toHaveBeenCalledWith({}, mockGameSave);
    expect(saveId).toBe('save123');
  });

  it('should retrieve a game save by ID', async () => {
    const getDocMock = vi.fn().mockResolvedValue({
      exists: () => true,
      data: () => mockGameSave,
    });
    (doc as any).mockReturnValue({});
    (getDoc as any).mockImplementation(getDocMock);

    const result = await GameSaveRepository.getGameSaveById('save123');

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'save123');
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(mockGameSave);
  });

  it('should return null if game save not found', async () => {
    const getDocMock = vi.fn().mockResolvedValue({ exists: () => false });
    (doc as any).mockReturnValue({});
    (getDoc as any).mockImplementation(getDocMock);

    const result = await GameSaveRepository.getGameSaveById('save123');

    expect(getDoc).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it('should retrieve all game saves for a user', async () => {
    const getDocsMock = vi.fn().mockResolvedValue({
      docs: [
        { id: 'save123', data: () => mockGameSave },
        { id: 'save124', data: () => ({ ...mockGameSave, id: 'save124', progress: '30%' }) },
      ],
    });
    (getDocs as any).mockImplementation(getDocsMock);

    const result = await GameSaveRepository.getGameSavesByUserId('user-123');

    expect(query).toHaveBeenCalledWith(expect.anything(), where('userId', '==', 'user-123'));
    expect(getDocs).toHaveBeenCalled();
    expect(result).toEqual([
      { ...mockGameSave, id: 'save123' },
      { ...mockGameSave, id: 'save124', progress: '30%' },
    ]);
  });

  it('should update a game save', async () => {
    const updateDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (updateDoc as any).mockImplementation(updateDocMock);

    await GameSaveRepository.updateGameSave('save123', { progress: '60%' });

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'save123');
    expect(updateDocMock).toHaveBeenCalledWith({}, { progress: '60%' });
  });

  it('should delete a game save by ID', async () => {
    const deleteDocMock = vi.fn();
    (doc as any).mockReturnValue({});
    (deleteDoc as any).mockImplementation(deleteDocMock);

    await GameSaveRepository.deleteGameSaveById('save123');

    expect(doc).toHaveBeenCalledWith(expect.anything(), 'save123');
    expect(deleteDocMock).toHaveBeenCalledWith({});
  });

  it('should return fake game saves', async () => {
    const fakeSaves = await GameSaveRepository.getFakeGameSave();

    expect(fakeSaves).toBeInstanceOf(Array);
    expect(fakeSaves.length).toBeGreaterThan(0);
    expect(fakeSaves[0]).toHaveProperty('id');
    expect(fakeSaves[0]).toHaveProperty('userId');
  });
});
