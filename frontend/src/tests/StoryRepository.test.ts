import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { StoryRepository } from '../repositories/StoryRepository';
import {
  getFirestore,
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
import { firebaseApp } from '../firebase'; // Assicurati che il path sia corretto

const db = getFirestore(firebaseApp);
const storiesCollection = collection(db, 'stories');
const testStoryId = 'test-story-123'; // ID univoco per il test

const mockStory = {
  title: 'A Great Story',
  description: 'This is a test story',
  image: 'image_url',
  author: 'John Doe',
  genre: 'Adventure',
};

describe('StoryRepository (Firestore Prod)', () => {
  beforeEach(async () => {
    // Crea una storia di test prima di ogni test
    await setDoc(doc(storiesCollection, testStoryId), mockStory);
  });

  afterEach(async () => {
    // Elimina la storia di test dopo ogni test
    await deleteDoc(doc(storiesCollection, testStoryId));
  });

  it('should save a story', async () => {
    // Usa addDoc per ottenere un ID generato automaticamente
    const newStoryId = await StoryRepository.saveStory(mockStory);

    // Attendi un breve tempo per permettere la propagazione in Firestore
    await new Promise((resolve) => setTimeout(resolve, 500));

    const snapshot = await getDoc(doc(storiesCollection, newStoryId));
    expect(snapshot.exists()).toBe(true);
    expect(snapshot.data()).toMatchObject(mockStory);

    await deleteDoc(doc(storiesCollection, newStoryId)); // Pulizia
  });

  it('should retrieve a story by ID', async () => {
    const result = await StoryRepository.getStoryById(testStoryId);

    expect(result).not.toBeNull();
    expect(result).toMatchObject(mockStory);
  });

  it('should return null if story not found', async () => {
    const result = await StoryRepository.getStoryById('non-existent-story');
    expect(result).toBeNull();
  });

  it('should retrieve all stories', async () => {
    const result = await StoryRepository.getAllStories();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should update a story', async () => {
    await StoryRepository.updateStory(testStoryId, { title: 'Updated Story Title' });

    const snapshot = await getDoc(doc(storiesCollection, testStoryId));
    expect(snapshot.data()).toMatchObject({ title: 'Updated Story Title' });
  });

  it('should delete a story', async () => {
    await StoryRepository.deleteStory(testStoryId);

    const snapshot = await getDoc(doc(storiesCollection, testStoryId));
    expect(snapshot.exists()).toBe(false);
  });

  it('should retrieve stories by genre', async () => {
    const result = await StoryRepository.getStoriesByGenre('Adventure');

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject(mockStory);
  });

  it('should retrieve stories by author', async () => {
    const result = await StoryRepository.getStoriesByAuthor('John Doe');

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject(mockStory);
  });
});
