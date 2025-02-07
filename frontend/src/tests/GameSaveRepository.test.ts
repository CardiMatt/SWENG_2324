import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GameSaveRepository } from '../repositories/GameSaveRepository';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { firebaseApp } from '../firebase'; // Assicurati che il path sia corretto

const db = getFirestore(firebaseApp);
const gameSavesCollection = collection(db, 'gameSaves');
const testSaveId = 'test-save-123'; // ID univoco per il test

const mockGameSave = {
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

// Funzione di normalizzazione per confrontare le date
const normalizeGameSave = (data: any) => ({
  ...data,
  saveDate: data.saveDate.toDate ? data.saveDate.toDate() : new Date(data.saveDate),
});

describe('GameSaveRepository (Firestore Prod)', () => {
  beforeEach(async () => {
    // Crea un salvataggio di test prima di ogni test
    await setDoc(doc(gameSavesCollection, testSaveId), mockGameSave);
  });

  afterEach(async () => {
    // Elimina il salvataggio di test dopo ogni test
    await deleteDoc(doc(gameSavesCollection, testSaveId));
  });

  it('should save a game save', async () => {
    // Usa addDoc per ottenere un ID generato automaticamente
    const newSaveId = await GameSaveRepository.saveGameSave(mockGameSave);

    // Attendi un breve tempo per garantire la propagazione
    await new Promise((resolve) => setTimeout(resolve, 500));

    const snapshot = await getDoc(doc(gameSavesCollection, newSaveId));
    expect(snapshot.exists()).toBe(true);

    const data = normalizeGameSave(snapshot.data());
    const expectedData = normalizeGameSave(mockGameSave);

    expect(data).toMatchObject(expectedData);

    await deleteDoc(doc(gameSavesCollection, newSaveId)); // Pulizia
  });

  it('should retrieve a game save by ID', async () => {
    const result = await GameSaveRepository.getGameSaveById(testSaveId);
    expect(result).not.toBeNull();
    
    const expectedData = normalizeGameSave(mockGameSave);
    const resultData = normalizeGameSave(result);

    expect(resultData).toMatchObject(expectedData);
  });

  it('should return null if game save not found', async () => {
    const result = await GameSaveRepository.getGameSaveById('non-existent-save');
    expect(result).toBeNull();
  });

  it('should retrieve all game saves for a user', async () => {
    const result = await GameSaveRepository.getGameSavesByUserId('user-123');

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    const resultData = normalizeGameSave(result[0]);
    const expectedData = normalizeGameSave(mockGameSave);

    // Confronto flessibile delle date (senza millisecondi)
    expect(resultData).toMatchObject({
        ...expectedData,
        saveDate: expect.any(Date), // Verifica che sia un oggetto Date valido
    });
  });


  it('should update a game save', async () => {
    await GameSaveRepository.updateGameSave(testSaveId, { progress: '60%' });

    const snapshot = await getDoc(doc(gameSavesCollection, testSaveId));
    expect(snapshot.exists()).toBe(true);
    expect(snapshot.data()).toMatchObject({ progress: '60%' });
  });

  it('should delete a game save by ID', async () => {
    await GameSaveRepository.deleteGameSaveById(testSaveId);

    const snapshot = await getDoc(doc(gameSavesCollection, testSaveId));
    expect(snapshot.exists()).toBe(false);
  });

  it('should return fake game saves', async () => {
    const fakeSaves = await GameSaveRepository.getFakeGameSave();

    expect(fakeSaves).toBeInstanceOf(Array);
    expect(fakeSaves.length).toBeGreaterThan(0);
    expect(fakeSaves[0]).toHaveProperty('id');
    expect(fakeSaves[0]).toHaveProperty('userId');
  });
});
