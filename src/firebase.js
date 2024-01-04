import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqh2s54gCRXLs6gro4_nK6xK0oc9evZUQ",
  authDomain: "twitter-reloaded-261b7.firebaseapp.com",
  projectId: "twitter-reloaded-261b7",
  storageBucket: "twitter-reloaded-261b7.appspot.com",
  messagingSenderId: "115730512944",
  appId: "1:115730512944:web:71233c55fdca64eff4c1f5",
  measurementId: "G-BT1ZZD900V",
};

//create firebase app with configuration options
const app = initializeApp(firebaseConfig);
//create auth instance for the app and export it
export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
