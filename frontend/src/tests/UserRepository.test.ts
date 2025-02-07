import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { UserRepository } from '../repositories/UserRepository';
import { getFirestore, collection, doc, setDoc, getDoc, deleteDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';
import { firebaseApp } from '../firebase';  // Assicurati che il path sia corretto

const db = getFirestore(firebaseApp);
const usersCollection = collection(db, 'users');
const testUserId = 'test-user-123'; // ID univoco per il test

describe('UserRepository (Firestore Prod)', () => {
  beforeEach(async () => {
    // Resetta il database prima di ogni test (se necessario)
    await setDoc(doc(usersCollection, testUserId), { email: 'test@example.com' });
  });

  afterEach(async () => {
    // Pulisce il database dopo ogni test per evitare dati sporchi
    await deleteDoc(doc(usersCollection, testUserId));
  });

  it('should save a user', async () => {
    const userRef = doc(usersCollection, 'user-save-test');
    const userData = { email: 'newuser@example.com' };

    await UserRepository.saveUser({ id: 'user-save-test', ...userData });

    const snapshot = await getDoc(userRef);
    expect(snapshot.exists()).toBe(true);
    expect(snapshot.data()).toMatchObject(userData);

    await deleteDoc(userRef); // Pulizia
  });

  it('should retrieve a user by ID', async () => {
    const result = await UserRepository.getUserById(testUserId);

    expect(result).not.toBeNull();
    expect(result).toMatchObject({ email: 'test@example.com' });
  });

  it('should return null if user not found', async () => {
    const result = await UserRepository.getUserById('non-existent-user');
    expect(result).toBeNull();
  });

  it('should delete a user', async () => {
    await UserRepository.deleteUser(testUserId);

    const snapshot = await getDoc(doc(usersCollection, testUserId));
    expect(snapshot.exists()).toBe(false);
  });

  it('should update a user', async () => {
    await UserRepository.updateUser(testUserId, { email: 'updated@example.com' });

    const snapshot = await getDoc(doc(usersCollection, testUserId));
    expect(snapshot.data()).toMatchObject({ email: 'updated@example.com' });
  });

  it('should retrieve all users', async () => {
    const result = await UserRepository.getAllUsers();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should find users by field', async () => {
    const result = await UserRepository.findUsersByField('email', 'test@example.com');

    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toMatchObject({ email: 'test@example.com' });
  });
});
