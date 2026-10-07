import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // You will need to get this from Firebase Console
  authDomain: "heepzy.firebaseapp.com",
  projectId: "heepzy",
  storageBucket: "heepzy.appspot.com",
  messagingSenderId: "403583993426",
  appId: "YOUR_APP_ID" // You will need to get this from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
