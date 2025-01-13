import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GameSaveRepository } from '../repositories/GameSaveRepository';
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';
import type { GameSave } from '../models/GameSave';

// Mock delle funzioni di Firestore
vi.mock('firebase/firestore', () => {
  const collectionMock = vi.fn();
  const docMock = vi.fn();
  const setDocMock = vi.fn();
  const getFirestoreMock = vi.fn();

  return {
    collection: collectionMock,
    doc: docMock,
    setDoc: setDocMock,
    getFirestore: getFirestoreMock,
  };
});

// Mock del modulo 'firebase' che contiene 'db'
vi.mock('../firebase', () => {
  const mockedDb = {} as ReturnType<typeof getFirestore>;
  return {
    db: mockedDb,
  };
});

describe('GameSaveRepository', () => {
  const mockGameSave: GameSave = {
    id: 'testId',
    userId: 'user123',
    storyId: 'story456',
    state: 'inProgress',
    progress: 'scene1',
    inventory: 'empty',
    saveDate: new Date(),
  };

  let collectionMock: ReturnType<typeof vi.fn>;
  let docMock: ReturnType<typeof vi.fn>;
  let setDocMock: ReturnType<typeof vi.fn>;
  let getFirestoreMock: ReturnType<typeof vi.fn>;
  let mockedDb: ReturnType<typeof getFirestore>;

  beforeEach(async () => {
    vi.clearAllMocks();
    collectionMock = vi.mocked(collection);
    docMock = vi.mocked(doc);
    setDocMock = vi.mocked(setDoc);
    getFirestoreMock = vi.mocked(getFirestore);

    // Importare il mock di 'db' dopo aver impostato i mock di Firestore
    const firebase = await import('../firebase');
    mockedDb = firebase.db;
    getFirestoreMock.mockReturnValue(mockedDb);
    collectionMock.mockReturnValue({} as any);
  });

  it('should save a game save successfully', async () => {
    const mockDocRef = {};
    docMock.mockReturnValue(mockDocRef);
    setDocMock.mockResolvedValue(undefined);

    await GameSaveRepository.saveGameSave(mockGameSave);

    console.log('mockedDb:', mockedDb);
    console.log('mockDocRef:', mockDocRef);
    console.log('mockGameSave:', mockGameSave);

    expect(collectionMock).toHaveBeenCalledWith(mockedDb, 'gameSaves');
    expect(docMock).toHaveBeenCalledWith({}, mockGameSave.id);
    expect(setDocMock).toHaveBeenCalledWith(mockDocRef, {
      id: 'testId',
      userId: 'user123',
      storyId: 'story456',
      state: 'inProgress',
      progress: 'scene1',
      inventory: 'empty',
      saveDate: mockGameSave.saveDate,
    });
    console.log('Game save successful!');
  });

  it('should throw an error if saving fails', async () => {
    setDocMock.mockRejectedValue(new Error('Firebase error'));

    await expect(GameSaveRepository.saveGameSave(mockGameSave)).rejects.toThrow(
      'Non è stato possibile salvare la partita.'
    );
    console.log('Error during game save as expected.');
  });
});
