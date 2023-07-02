import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDDB7mEvyxVAAXoqbeHV4GQTlFqS8vmah0",
  authDomain: "foodexpress-6ad9a.firebaseapp.com",
  projectId: "foodexpress-6ad9a",
  storageBucket: "foodexpress-6ad9a.appspot.com",
  messagingSenderId: "773924915654",
  appId: "1:773924915654:web:5064d7b1cceaad41b38ac7",
  measurementId: "G-WSJV4KYR2V",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
