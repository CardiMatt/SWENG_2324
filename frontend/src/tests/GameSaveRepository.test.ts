import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GameSaveRepository } from '../repositories/GameSaveRepository';
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';
import type { GameSave } from '../models/GameSave';

const collectionMock = vi.fn();
const docMock = vi.fn();
const setDocMock = vi.fn();
const getFirestoreMock = vi.fn();

vi.mock('firebase/firestore', () => ({
  collection: collectionMock,
  doc: docMock,
  setDoc: setDocMock,
  getFirestore: getFirestoreMock, // Mock per getFirestore
}));

// vi.mock('firebase/firestore', () => ({
//   collection: vi.fn(),
//   doc: vi.fn(),
//   setDoc: vi.fn(),
// }));




// Mock delle funzioni Firebase
// vi.mock('firebase/firestore', () => ({
//   collection: vi.fn(),
//   doc: vi.fn(),
//   setDoc: vi.fn(),
// }));
// vi.mock('firebase/firestore', async () => {
//   const actual = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore');
//   return {
//     ...actual,
//     collection: vi.fn(),
//     doc: vi.fn(),
//     setDoc: vi.fn(),
//     getFirestore: vi.fn(),
//   };
// });
// vi.mock('firebase/firestore', async () => {
//   const actual = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore');
//   return {
//     ...actual,
//     collection: vi.fn(),
//     doc: vi.fn(),
//     setDoc: vi.fn(),
//     getFirestore: vi.fn(() => ({})), // Mock di getFirestore
//   };
// });




describe('GameSaveRepository', () => {
  const mockGameSave: GameSave = {
    id: 'testId',
    userId: 'user123',
    storyId: 'story456',
    state: 'inProgress',
    progress: 'scene1',
    inventory: 'empty'/*JSON.stringify({ item: 'sword', quantity: 1 })*/,
    saveDate: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });


  // it('should save a game save successfully', async () => {
  //   // Tipizzazione dei mock
  //   const collectionMock = collection as ReturnType<typeof vi.fn>;
  //   const docMock = doc as ReturnType<typeof vi.fn>;
  //   const setDocMock = setDoc as ReturnType<typeof vi.fn>;

  //   collectionMock.mockReturnValue({} as any);
  //   docMock.mockReturnValue({} as any);
  //   setDocMock.mockResolvedValue(undefined);

  //   await GameSaveRepository.saveGameSave(mockGameSave);

  //   // Verifica che le funzioni Firebase siano state chiamate con i parametri corretti
  //   expect(collectionMock).toHaveBeenCalledWith(expect.anything(), 'gameSaves');
  //   expect(docMock).toHaveBeenCalledWith(expect.anything(), mockGameSave.id);
  //   expect(setDocMock).toHaveBeenCalledWith(expect.anything(), {
  //     ...mockGameSave,
  //     saveDate: mockGameSave.saveDate.toISOString(),
  //   });
  // });
  // it('should save a game save successfully', async () => {
  //   const collectionMock = collection as unknown as ReturnType<typeof vi.fn>;
  //   const docMock = doc as unknown as ReturnType<typeof vi.fn>;
  //   const setDocMock = setDoc as unknown as ReturnType<typeof vi.fn>;
  //   const getFirestoreMock = getFirestore as unknown as ReturnType<typeof vi.fn>;

  //   collectionMock.mockReturnValue({} as any);
  //   docMock.mockReturnValue({} as any);
  //   setDocMock.mockResolvedValue(undefined);
  //   getFirestoreMock.mockReturnValue({} as any);

  //   await GameSaveRepository.saveGameSave(mockGameSave);

  //   expect(collectionMock).toHaveBeenCalledWith(expect.anything(), 'gameSaves');
  //   expect(docMock).toHaveBeenCalledWith(expect.anything(), mockGameSave.id);
  //   expect(setDocMock).toHaveBeenCalledWith(expect.anything(), {
  //     ...mockGameSave,
  //     saveDate: mockGameSave.saveDate.toISOString(),
  //   });
  // });
  it('should save a game save successfully', async () => {
    // const collectionMock = collection as unknown as ReturnType<typeof vi.fn>;
    // const docMock = doc as unknown as ReturnType<typeof vi.fn>;
    // const setDocMock = setDoc as unknown as ReturnType<typeof vi.fn>;
    // //@ts-ignore
    // const collectionMock = collection as vi.Mock;
    // //@ts-ignore
    // const docMock = doc as vi.Mock;
    // //@ts-ignore    
    // const setDocMock = setDoc as vi.Mock;

    collectionMock.mockReturnValue({} as any);
    docMock.mockReturnValue({} as any);
    setDocMock.mockResolvedValue(undefined);
    getFirestoreMock.mockReturnValue({} as any);

    await GameSaveRepository.saveGameSave(mockGameSave);

    expect(collectionMock).toHaveBeenCalledWith(expect.anything(), 'gameSaves');
    expect(docMock).toHaveBeenCalledWith(expect.anything(), mockGameSave.id);
    expect(setDocMock).toHaveBeenCalledWith(expect.anything(), {
      ...mockGameSave,
      saveDate: mockGameSave.saveDate.toISOString(),
    });
  });

  it('should throw an error if saving fails', async () => {
   // const setDocMock = setDoc as unknown as ReturnType<typeof vi.fn>;
    setDocMock.mockRejectedValue(new Error('Firebase error'));

    await expect(GameSaveRepository.saveGameSave(mockGameSave)).rejects.toThrow(
      'Non è stato possibile salvare la partita.'
    );
  });
  // it('should throw an error if saving fails', async () => {
  //   // Mock delle funzioni Firebase per simulare un errore
  //   const setDocMock = setDoc as ReturnType<typeof vi.fn>;
  //   setDocMock.mockRejectedValue(new Error('Firebase error'));

  //   await expect(GameSaveRepository.saveGameSave(mockGameSave)).rejects.toThrow(
  //     'Non è stato possibile salvare la partita.'
  //   );
  // });
});
