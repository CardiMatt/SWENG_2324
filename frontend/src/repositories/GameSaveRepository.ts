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
  /**
   * Crea un nuovo salvataggio:
   * - Non riceve un id (si affida a Firestore)
   * - Ritorna l’id generato
   */
  static async saveGameSave(gameSave: Omit<GameSave, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(gameSaveCollection, gameSave);
      return docRef.id;
    } catch (error) {
      console.error('Errore durante la creazione del salvataggio:', error);
      throw new Error('Non è stato possibile creare il salvataggio.');
    }
  }

  /**
   * Recupera un singolo salvataggio, in base al docId.
   */
  static async getGameSaveById(saveId: string): Promise<GameSave | null> {
    try {
      const gameSaveRef = doc(gameSaveCollection, saveId);
      const docSnapshot = await getDoc(gameSaveRef);

      if (!docSnapshot.exists()) {
        return null;
      }

      const data = docSnapshot.data();

      // Se vuoi includere l’ID dentro l’oggetto
      return {
        id: saveId,
        userId: data.userId,
        storyId: data.storyId,
        state: data.state,
        progress: data.progress,
        inventory: data.inventory,
        saveDate: new Date(data.saveDate),
      } as GameSave;
    } catch (error) {
      console.error('Errore durante il recupero del salvataggio:', error);
      throw new Error('Non è stato possibile recuperare il salvataggio.');
    }
  }

  /**
   * Recupera tutti i salvataggi di un utente.
   */
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
          state: data.state,
          progress: data.progress,
          inventory: data.inventory,
          saveDate: new Date(data.saveDate),
        } as GameSave;
      });
    } catch (error) {
      console.error('Errore durante il recupero dei salvataggi:', error);
      throw new Error('Non è stato possibile recuperare i salvataggi.');
    }
  }
}
