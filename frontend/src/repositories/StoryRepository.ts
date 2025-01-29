import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Story } from '../models/Story';

const storyCollection = collection(db, 'stories');

export class StoryRepository {
  /**
   * Crea o aggiorna una storia.
   * @param story Oggetto Story da salvare (senza id) o aggiornare (con id).
   * @returns L'id del documento salvato o aggiornato.
   */
  static async saveStory(story: Omit<Story, 'id'> | Story): Promise<string> {
    try {
      if ('id' in story && story.id) {
        // Aggiorna una storia esistente
        const storyRef = doc(storyCollection, story.id);
        await setDoc(storyRef, story);
        return story.id;
      } else {
        // Crea una nuova storia e genera l'id automaticamente
        const docRef = await addDoc(storyCollection, story);
        return docRef.id;
      }
    } catch (error) {
      console.error('Errore durante la creazione o aggiornamento della storia:', error);
      throw new Error('Non è stato possibile salvare la storia.');
    }
  }

  /**
   * Recupera una storia tramite ID.
   * @param storyId ID della storia.
   * @returns Oggetto Story se trovato, altrimenti null.
   */
  static async getStoryById(storyId: string): Promise<Story | null> {
    const storyRef = doc(storyCollection, storyId);
    const docSnapshot = await getDoc(storyRef);
    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id, // Aggiungi l'id del documento
        ...(docSnapshot.data() as Omit<Story, 'id'>)
      };
    }
    return null;
  }

  /**
   * Recupera tutte le storie.
   * @returns Lista di oggetti Story.
   */
  static async getAllStories(): Promise<Story[]> {
    const snapshot = await getDocs(storyCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id, // Aggiungi l'id del documento
      ...(doc.data() as Omit<Story, 'id'>) // Spread degli altri campi della storia
    }));
  }

  /**
   * Aggiorna una storia (update parziale).
   * @param storyId ID della storia da aggiornare.
   * @param updatedFields Campi aggiornati.
   */
  static async updateStory(storyId: string, updatedFields: Partial<Story>): Promise<void> {
    const storyRef = doc(storyCollection, storyId);
    await updateDoc(storyRef, updatedFields);
  }

  /**
   * Elimina una storia tramite ID.
   * @param storyId ID della storia da eliminare.
   */
  static async deleteStory(storyId: string): Promise<void> {
    const storyRef = doc(storyCollection, storyId);
    await deleteDoc(storyRef);
  }

  /**
   * Recupera storie filtrate per genere.
   * @param genre Genere da filtrare.
   * @returns Lista di oggetti Story corrispondenti al genere.
   */
  static async getStoriesByGenre(genre: string): Promise<Story[]> {
    const genreQuery = query(storyCollection, where('genre', '==', genre));
    const snapshot = await getDocs(genreQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Story, 'id'>)
    }));
  }

  /**
   * Recupera storie filtrate per autore.
   * @param author Autore da filtrare.
   * @returns Lista di oggetti Story corrispondenti all'autore.
   */
  static async getStoriesByAuthor(author: string): Promise<Story[]> {
    const authorQuery = query(storyCollection, where('author', '==', author));
    const snapshot = await getDocs(authorQuery);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Story, 'id'>)
    }));
  }
}
