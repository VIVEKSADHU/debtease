// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, type User } from "firebase/auth";

// Your web app's Firebase configuration
// IMPORTANT: Replace with your own Firebase configuration
const firebaseConfig: FirebaseOptions = {
  "projectId": "studio-8912600015-d3e57",
  "appId": "1:611951108730:web:60c8744c875cf1fab0d1c3",
  "apiKey": "AIzaSyDKS2BUzj2SDfLU0P75XiyWC4RTh5zlvI4",
  "authDomain": "studio-8912600015-d3e57.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "611951108730"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { 
  app, 
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
};
