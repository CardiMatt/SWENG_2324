import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
  };

// Inizializza Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Esporta il servizio Auth
export const auth = getAuth(firebaseApp);

// Esporta il servizio Database
export const db = getFirestore(firebaseApp);

// Esporta il servizio Storage
export const storage = getStorage(firebaseApp);
