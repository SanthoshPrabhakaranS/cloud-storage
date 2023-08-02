import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "cloud-storage-app-317db.firebaseapp.com",
  projectId: "cloud-storage-app-317db",
  storageBucket: "cloud-storage-app-317db.appspot.com",
  messagingSenderId: "890157712662",
  appId: "1:890157712662:web:327c1e40d07de5b8097c37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)