import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhtEspoX7RnIoHhTzD99XbABYuB4LzUZE",
  authDomain: "heepzy.firebaseapp.com",
  projectId: "heepzy",
  storageBucket: "heepzy.firebasestorage.app",
  messagingSenderId: "403583993426",
  appId: "1:403583993426:web:517f56ea47cc0d8834818b",
  measurementId: "G-ESFLTENH5R"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
