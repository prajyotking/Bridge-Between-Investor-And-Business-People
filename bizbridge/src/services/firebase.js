// src/services/firebase.js

// --- EXTRA DEBUGGING LOGS ---
console.log('[firebase.js] File is being read.');
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

if (!apiKey) {
  console.error('[firebase.js] ERROR: VITE_FIREBASE_API_KEY is UNDEFINED or EMPTY.');
  console.error('[firebase.js] This is the cause of the white screen.');
  console.error('[firebase.js] Check your .env.local file and RESTART the server.');
} else {
  console.log('[firebase.js] SUCCESS: VITE_FIREBASE_API_KEY was found.');
}
// ------------------------------

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log('[firebase.js] Firebase has been successfully initialized.');

export { auth, db };