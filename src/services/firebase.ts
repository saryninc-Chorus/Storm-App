// Firebase configuration and initialization for your Vite React app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAVqT8m4rPXo6xPVKKuIfe4RMFloR32SGM",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "chorus-storm",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
