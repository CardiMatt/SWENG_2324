// src/repositories/GameSaveRepository.ts
import { collection, doc, setDoc, getDoc, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { GameSave } from '../models/GameSave';

/*interfaccia per comunicare con il database Firebase*/

//const gameSaveCollection = collection(db, 'gameSaves');

export class GameSaveRepository {
  // Salva un nuovo salvataggio
  // static async saveGameSave(gameSave: GameSave): Promise<void> {
  //   try{
  //     const gameSaveRef = doc(gameSaveCollection, gameSave.id);
  //   await setDoc(gameSaveRef, { ...gameSave, saveDate: gameSave.saveDate.toISOString() });
  //   } catch(error) {
  //     console.error('Errore durante il salvataggio della partita:', error);
  //     throw new Error('Non è stato possibile salvare la partita.');
  //   }
  static async saveGameSave(gameSave: any) {
    try {
      //const db = getFirestore();
      const gameSaveRef = doc(collection(db, 'gameSaves'), gameSave.id);
     await setDoc(gameSaveRef, gameSave);
    // await setDoc(gameSaveRef, { ...gameSave, saveDate: gameSave.saveDate.toISOString() });
   
    } catch (error) {
      console.error('Errore durante il salvataggio della partita:', error);
      throw error;
    }
  
  }

  // Ottiene un salvataggio per ID
  /*
  static async getGameSaveById(saveId: string): Promise<GameSave | null> {
    try{
      const gameSaveRef = doc(gameSaveCollection, saveId);
    const docSnapshot = await getDoc(gameSaveRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return {
        ...data,
        saveDate: new Date(data.saveDate),
      } as GameSave;
    }
      return null;
    } catch (error) {
      console.error('Errore durante il recupero del salvataggio:', error);
      throw new Error('Non è stato possibile recuperare il salvataggio.');
    }
  }*/

  // Ottiene tutti i salvataggi di un utente
  /*
  static async getGameSavesByUserId(userId: string): Promise<GameSave[]> {
    try{
      const q = query(gameSaveCollection, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          saveDate: new Date(data.saveDate),
        } as GameSave;
      });
    } catch (error) {
      console.error('Errore durante il recupero dei salvataggi:', error);
      throw new Error('Non è stato possibile recuperare i salvataggi.');
    }
  }*/
}
