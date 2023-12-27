import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqh2s54gCRXLs6gro4_nK6xK0oc9evZUQ",
  authDomain: "twitter-reloaded-261b7.firebaseapp.com",
  projectId: "twitter-reloaded-261b7",
  storageBucket: "twitter-reloaded-261b7.appspot.com",
  messagingSenderId: "115730512944",
  appId: "1:115730512944:web:71233c55fdca64eff4c1f5",
  measurementId: "G-BT1ZZD900V",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
