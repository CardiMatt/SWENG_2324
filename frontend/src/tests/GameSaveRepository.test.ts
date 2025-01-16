import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { deleteDoc, doc } from 'firebase/firestore';
import { GameSaveRepository } from '../repositories/GameSaveRepository';
import { db } from '../firebase';
import type { GameSave } from '../models/GameSave';

describe('GameSaveRepository Tests', () => {
  // Salvataggio di test (senza id, perché Firestore lo genera automaticamente)
  let testSaveId = '';
  const testGameSave = {
    userId: 'testUser',
    storyId: 'storyTest',
    state: 'ACTIVE',
    progress: '42',
    inventory: 'sword',
    saveDate: new Date(),
  } satisfies Omit<GameSave, 'id'>;

  /**
   * 1. Creazione di un nuovo salvataggio
   */
  it('saveGameSave dovrebbe creare un nuovo salvataggio e ritornarne l\'ID', async () => {
    testSaveId = await GameSaveRepository.saveGameSave(testGameSave);
    expect(testSaveId).toBeDefined();
    expect(typeof testSaveId).toBe('string');
  });

  /**
   * 2. Recupero del salvataggio tramite ID
   */
  it('getGameSaveById dovrebbe restituire i dati corretti del salvataggio', async () => {
    const retrievedSave = await GameSaveRepository.getGameSaveById(testSaveId);

    // Ci aspettiamo che esista
    expect(retrievedSave).not.toBeNull();
    // E che contenga i dati che abbiamo salvato
    expect(retrievedSave?.id).toBe(testSaveId);
    expect(retrievedSave?.userId).toBe(testGameSave.userId);
    expect(retrievedSave?.storyId).toBe(testGameSave.storyId);
    expect(retrievedSave?.state).toBe(testGameSave.state);
    expect(retrievedSave?.progress).toBe(testGameSave.progress);
    expect(retrievedSave?.inventory).toEqual(testGameSave.inventory);
    expect(retrievedSave?.saveDate).toBeInstanceOf(Date);
  });

  /**
   * 3. Recupero di tutti i salvataggi per un userId
   */
  it('getGameSavesByUserId dovrebbe restituire un array di salvataggi per lo userId specificato', async () => {
    // Recuperiamo i salvataggi creati dall’utente 'testUser'
    const userSaves = await GameSaveRepository.getGameSavesByUserId('testUser');

    // Controlliamo che l’array non sia vuoto
    expect(userSaves.length).toBeGreaterThan(0);

    // Verifichiamo che all’interno ci sia quello che abbiamo appena creato
    const foundSave = userSaves.find(save => save.id === testSaveId);
    expect(foundSave).toBeDefined();
    expect(foundSave?.userId).toBe(testGameSave.userId);
  });

  /**
   * 4. Pulizia finale: cancella il documento che abbiamo creato
   *    per evitare di lasciare dati sporchi nel DB.
   */
  afterAll(async () => {
    if (testSaveId) {
      await deleteDoc(doc(db, 'gameSaves', testSaveId));
    }
  });
});
