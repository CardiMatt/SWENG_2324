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
  Firestore
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Story } from '../models/Story';

const storyCollection = collection(db, 'stories');

export class StoryRepository {

  // Create or update a story
  static async saveStory(story: Story): Promise<string> {
    const storyRef = doc(storyCollection);
    await setDoc(storyRef, story);
    return storyRef.id
  }

  // Retrieve a story by ID
  static async getStoryById(storyId: number): Promise<Story | null> {
    const storyRef = doc(storyCollection, storyId.toString());
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
    const stories = snapshot.docs.map((doc) => ({
      ...(doc.data() as Omit<Story, 'id'>), // Spread degli altri campi della storia
      id: doc.id, // Aggiungi l'id del documento
    }));
    console.log(stories);
    return stories
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
      id: doc.id,  // ID del documento Firestore
      title: doc.data().title || '',  // Fallback se 'title' non esiste
      description: doc.data().description || '',  
      image: doc.data().image || '',  
      author: doc.data().author || '',  
      genre: doc.data().genre || '',  
    }));
    
  }
}
