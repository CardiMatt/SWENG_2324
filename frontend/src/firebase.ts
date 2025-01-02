import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAKqdvOqt3S7RriDTb8xMZ4mxAJdeZc0Bg",
    authDomain: "sweng-2324.firebaseapp.com",
    projectId: "sweng-2324",
    storageBucket: "sweng-2324.firebasestorage.app",
    messagingSenderId: "619282552515",
    appId: "1:619282552515:web:0b74eb7387abf69ef63476"
};

// Inizializza Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Esporta il servizio Auth
export const auth = getAuth(firebaseApp);

// Esporta il servizio Database
export const db = getFirestore(firebaseApp);

// Esporta il servizio Storage
export const storage = getStorage(firebaseApp);
