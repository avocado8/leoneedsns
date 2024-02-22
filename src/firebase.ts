import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBduoCfJF9-sB9U3axt9KsNa4mIMi4ykJI",
  authDomain: "ln-sns.firebaseapp.com",
  projectId: "ln-sns",
  storageBucket: "ln-sns.appspot.com",
  messagingSenderId: "156812086845",
  appId: "1:156812086845:web:265dda046b1296f6862454"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);