import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';

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

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };