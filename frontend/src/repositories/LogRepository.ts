// src/repositories/LogRepository.ts
import { collection, addDoc, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { db } from '../firebase';
import type { Log } from '../models/Log';

const logCollection = collection(db, 'logs');

export class LogRepository {
  static async saveLog(log: Omit<Log, 'id'>): Promise<string> {
    const docRef = await addDoc(logCollection, log);
    return docRef.id;
  }

  static async getLogsByUserId(userId: string): Promise<Log[]> {
    const logsQuery = query(logCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(logsQuery);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Log[];
  }

  static async getAllLogs(): Promise<Log[]> {
    const querySnapshot = await getDocs(logCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Log[];
  }
}
