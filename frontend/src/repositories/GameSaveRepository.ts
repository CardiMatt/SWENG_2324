import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { GameSave } from '../models/GameSave';

const gameSaveCollection = collection(db, 'gameSaves');

export class GameSaveRepository {
  /**
   * Crea un nuovo salvataggio o aggiorna un salvataggio esistente.
   * @param gameSave Oggetto GameSave da salvare.
   * @returns L'ID del documento salvato.
   */
  static async saveGameSave(gameSave: Omit<GameSave, 'id'>): Promise<string> {
    try {
      // Usa addDoc per salvare un nuovo documento e lasciare che Firebase generi l'ID
      const docRef = await addDoc(gameSaveCollection, gameSave);
      return docRef.id; // Restituisci l'ID generato da Firebase
    } catch (error) {
      console.error('Errore durante la creazione del salvataggio:', error);
      throw new Error('Non è stato possibile salvare il salvataggio.');
    }
  }

  /**
   * Recupera un salvataggio tramite ID.
   * @param saveId L'ID del salvataggio.
   * @returns L'oggetto GameSave o null se non trovato.
   */
  static async getGameSaveById(saveId: string): Promise<GameSave | null> {
    try {
      const gameSaveRef = doc(gameSaveCollection, saveId);
      const docSnapshot = await getDoc(gameSaveRef);

      if (!docSnapshot.exists()) {
        return null;
      }

      const data = docSnapshot.data();
      return {
        id: saveId,
        userId: data.userId,
        storyId: data.storyId,
        progress: data.progress,
        inventory: data.inventory,
        saveDate: new Date(data.saveDate),
        memoriConfig: data.memoriConfig,
      } as GameSave;
    } catch (error) {
      console.error('Errore durante il recupero del salvataggio:', error);
      throw new Error('Non è stato possibile recuperare il salvataggio.');
    }
  }

  /**
   * Recupera tutti i salvataggi di un determinato utente.
   * @param userId L'ID dell'utente.
   * @returns Una lista di oggetti GameSave.
   */
  static async getGameSavesByUserId(userId: string): Promise<GameSave[]> {
    try {
      const userQuery = query(gameSaveCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(userQuery);

      return querySnapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data();
        return {
          id: docSnapshot.id,
          userId: data.userId,
          storyId: data.storyId,
          progress: data.progress,
          inventory: data.inventory,
          saveDate: new Date(data.saveDate),
          memoriConfig: data.memoriConfig,
        } as GameSave;
      });
    } catch (error) {
      console.error('Errore durante il recupero dei salvataggi dell\'utente:', error);
      throw new Error('Non è stato possibile recuperare i salvataggi.');
    }
  }

  /**
   * Elimina un salvataggio tramite ID.
   * @param saveId L'ID del salvataggio da eliminare.
   */
  static async deleteGameSaveById(saveId: string): Promise<void> {
    try {
      const gameSaveRef = doc(gameSaveCollection, saveId);
      await deleteDoc(gameSaveRef);
    } catch (error) {
      console.error('Errore durante l\'eliminazione del salvataggio:', error);
      throw new Error('Non è stato possibile eliminare il salvataggio.');
    }
  }

  /**
   * Aggiorna un salvataggio esistente.
   * @param saveId L'ID del salvataggio.
   * @param updatedFields Campi da aggiornare.
   */
  static async updateGameSave(saveId: string, updatedFields: Partial<GameSave>): Promise<void> {
    try {
      const gameSaveRef = doc(gameSaveCollection, saveId);
      await updateDoc(gameSaveRef, updatedFields);
    } catch (error) {
      console.error('Errore durante l\'aggiornamento del salvataggio:', error);
      throw new Error('Non è stato possibile aggiornare il salvataggio.');
    }
  }

  /**
   * Restituisce salvataggi di esempio per scopi di test o debug.
   * @returns Una lista di salvataggi fittizi.
   */
  static async getFakeGameSave(): Promise<GameSave[]> {
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
    ];
  }
}
