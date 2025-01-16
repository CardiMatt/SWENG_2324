// src/repositories/GameSaveRepository.ts
import { collection, doc, setDoc, getDoc, getFirestore, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { GameSave } from '../models/GameSave';

const gameSaveCollection = collection(db, 'gameSaves');

export class GameSaveRepository {
  // Salva un nuovo salvataggio
  static async saveGameSave(gameSave: GameSave): Promise<void> {
    const gameSaveRef = doc(gameSaveCollection, gameSave.id);
    await setDoc(gameSaveRef, { ...gameSave, saveDate: gameSave.saveDate.toISOString() });
  }

  // Ottiene un salvataggio per ID
  static async getGameSaveById(saveId: string): Promise<GameSave | null> {
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
  }

  // Ottiene tutti i salvataggi di un utente
  static async getGameSavesByUserId(userId: string): Promise<GameSave[]> {
    const q = query(gameSaveCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        saveDate: new Date(data.saveDate),
      } as GameSave;
    });
  }
}
