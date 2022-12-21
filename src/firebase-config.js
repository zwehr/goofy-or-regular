import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // References a secret environment variable on Netlify
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "goofy-or-regular-leaderboard.firebaseapp.com",
  projectId: "goofy-or-regular-leaderboard",
  storageBucket: "goofy-or-regular-leaderboard.appspot.com",
  messagingSenderId: "282101220169",
  appId: "1:282101220169:web:fd1cd3a0634e32a02d5098"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);