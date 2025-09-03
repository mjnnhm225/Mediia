"use client";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "promotepro-s7pwp",
  "appId": "1:513788917921:web:b6212f419a43aacb7fd8e0",
  "storageBucket": "promotepro-s7pwp.firebasestorage.app",
  "apiKey": "AIzaSyAEhtJXIdEDqHxhy6qJYsB9hs7Sp36IPEg",
  "authDomain": "promotepro-s7pwp.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "513788917921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
};

export const signUpWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const sendPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export { auth };
