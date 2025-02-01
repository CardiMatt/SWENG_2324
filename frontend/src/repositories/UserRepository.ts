// src/repositories/UserRepository.ts
import {
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  where,
  getFirestore,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '../models/User';

const userCollection = collection(db, 'users');

export class UserRepository {
  /**
   * Crea o aggiorna un utente nel database.
   * @param user L'oggetto User da salvare o aggiornare.
   */
  static async saveUser(user: User): Promise<void> {
    const userRef = doc(userCollection, user.id);
    await setDoc(userRef, user);
  }

  /**
   * Recupera un utente per ID.
   * @param userId L'ID dell'utente da cercare.
   * @returns L'oggetto User o null se non trovato.
   */
  static async getUserById(userId: string): Promise<User | null> {
    const userRef = doc(userCollection, userId);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
    }
    return null;
  }

  /**
   * Recupera tutti gli utenti.
   * @returns Una lista di utenti.
   */
  static async getAllUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(userCollection);
    return querySnapshot.docs.map(doc => doc.data() as User);
  }

  /**
   * Aggiorna un utente nel database.
   * @param userId L'ID dell'utente da aggiornare.
   * @param data I dati da aggiornare.
   */
  static async updateUser(userId: string, data: Partial<User>): Promise<void> {
    const userRef = doc(userCollection, userId);
    await updateDoc(userRef, data);
  }

  /**
   * Elimina un utente dal database.
   * @param userId L'ID dell'utente da eliminare.
   */
  static async deleteUser(userId: string): Promise<void> {
    const userRef = doc(userCollection, userId);
    await deleteDoc(userRef);
  }

  /**
   * Cerca utenti con un criterio specifico.
   * @param fieldName Il nome del campo su cui effettuare il filtro.
   * @param value Il valore da cercare.
   * @returns Una lista di utenti che corrispondono al criterio.
   */
  static async findUsersByField(fieldName: string, value: any): Promise<User[]> {
    const q = query(userCollection, where(fieldName, '==', value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as User);
  }
}
