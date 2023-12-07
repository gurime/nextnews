// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';




const firebaseConfig = {
  apiKey: "AIzaSyCwLlsM3nOgVUXk5XAIUsktNn1a5rpbvA8",
  authDomain: "itnews-16f37.firebaseapp.com",
  projectId: "itnews-16f37",
  storageBucket: "itnews-16f37.appspot.com",
  messagingSenderId: "610481367872",
  appId: "1:610481367872:web:4704e4bb1fe4cd874768a5",
  measurementId: "G-ESY4W9JVYZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };