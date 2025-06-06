// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCIuD32WV5pZHep0ha418-UmLuxhOTjM-4",
    authDomain: "task-manager-5dc11.firebaseapp.com",
    projectId: "task-manager-5dc11",
    storageBucket: "task-manager-5dc11.firebasestorage.app",
    messagingSenderId: "888444985766",
    appId: "1:888444985766:web:509923e89263228cd5af67",
    measurementId: "G-L7G5KLPYC9"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
