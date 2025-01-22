// src/repositories/GameSaveRepository.ts
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';
import type { GameSave } from '../models/GameSave';

const gameSaveCollection = collection(db, 'gameSaves');

export class GameSaveRepository {
  static async saveGameSave(gameSave: Omit<GameSave, 'id'>): Promise<string> {
    try {
      console.log(gameSave);
      const docRef = await addDoc(gameSaveCollection, gameSave);
      return docRef.id;
    } catch (error) {
      console.error('Errore durante la creazione del salvataggio:', error);
      throw new Error('Non è stato possibile creare il salvataggio.');
    }
  }

  static async getGameSaveById(saveId: string): Promise<GameSave | null> {
    try {
      const gameSaveRef = doc(gameSaveCollection, saveId);
      const docSnapshot = await getDoc(gameSaveRef);

      if (!docSnapshot.exists()) {
        return null;
      }

      const data = docSnapshot.data();

      // Ritorna l’oggetto con memoriConfig ridotto
      return {
        id: saveId,
        userId: data.userId,
        storyId: data.storyId,
        progress: data.progress,
        inventory: data.inventory,
        saveDate: new Date(data.saveDate),
        memoriConfig: data.memoriConfig
      } as GameSave;
    } catch (error) {
      console.error('Errore durante il recupero del salvataggio:', error);
      throw new Error('Non è stato possibile recuperare il salvataggio.');
    }
  }

  static async getGameSavesByUserId(userId: string): Promise<GameSave[]> {
    try {
      const q = query(gameSaveCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();

        return {
          id: docSnapshot.id,
          userId: data.userId,
          storyId: data.storyId,
          progress: data.progress,
          inventory: data.inventory,
          saveDate: new Date(data.saveDate),
          memoriConfig: data.memoriConfig
        } as GameSave;
      });
    } catch (error) {
      console.error('Errore durante il recupero dei salvataggi:', error);
      throw new Error('Non è stato possibile recuperare i salvataggi.');
    }
  }

  static async getFakeGameSave(): Promise<GameSave[]> {
    // Restituisce un array di salvataggi fittizi
    return [
      {
        id: '1',
        userId: 'user-123',
        storyId: 'CUOREDILUCE',
        progress: '50%',
        inventory: 'sword, shield',
        saveDate: new Date(),
        memoriConfig: {
          context: 'AUTH:AUTENTICATO,STORIA:CUOREDILUCE',
          initialQuestion: '00001',
        },
      },
      {
        id: '2',
        userId: 'user-123',
        storyId: 'OMBREDELBUCO',
        progress: '30%',
        inventory: 'torch, map',
        saveDate: new Date(),
        memoriConfig: {
          context: 'AUTH:AUTENTICATO,STORIA:OMBREDELBUCO',
          initialQuestion: 'Hai lasciato qualcosa indietro.',
        },
      },
      {
        id: '3',
        userId: 'user-456',
        storyId: 'FIAMMADIAVVENTURA',
        progress: '100%',
        inventory: 'golden crown',
        saveDate: new Date(),
        memoriConfig: {
          context: 'AUTH:AUTENTICATO,STORIA:FIAMMADIAVVENTURA',
          initialQuestion: 'Congratulazioni, eroe!',
        },
      },
      {
        id: '4',
        userId: 'user-789',
        storyId: 'TERRADISOGNI',
        progress: '70%',
        inventory: 'magic potion',
        saveDate: new Date(),
        memoriConfig: {
          context: 'AUTH:AUTENTICATO,STORIA:TERRADISOGNI',
          initialQuestion: 'Pronto per l’ultimo passo?',
        },
      },
      {
        id: '5',
        userId: 'user-123',
        storyId: 'LABIRINTODIMISTERI',
        progress: '10%',
        inventory: 'key fragment',
        saveDate: new Date(),
        memoriConfig: {
          context: 'AUTH:AUTENTICATO,STORIA:LABIRINTODIMISTERI',
          initialQuestion: 'Riuscirai a risolvere l’enigma?',
        },
      },
    ];
  }
}
