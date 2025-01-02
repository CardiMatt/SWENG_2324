// src/repositories/UserRepository.ts
import { collection, doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from '../models/User';

const userCollection = collection(db, 'users');

export class UserRepository {
  static async saveUser(user: User): Promise<void> {
    const userRef = doc(userCollection, user.id);
    await setDoc(userRef, user);
  }

  static async getUserById(userId: string): Promise<User | null> {
    const userRef = doc(userCollection, userId);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
    }
    return null;
  }
}
