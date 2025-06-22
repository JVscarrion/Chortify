
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCkB_xNYU0ht25v0Get9L5YMhZ4GtaZxkA",
  authDomain: "chordify-97344.firebaseapp.com",
  projectId: "chordify-97344",
  storageBucket: "chordify-97344.firebasestorage.app",
  messagingSenderId: "323860478959",
  appId: "1:323860478959:web:480d9550b9b8931a86141a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;