// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "goofy-or-regular-leaderboard.firebaseapp.com",
  projectId: "goofy-or-regular-leaderboard",
  storageBucket: "goofy-or-regular-leaderboard.appspot.com",
  messagingSenderId: "282101220169",
  appId: "1:282101220169:web:fd1cd3a0634e32a02d5098"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);