import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // 👈 ADICIONA ISSO

const firebaseConfig = {
  apiKey: "AIzaSyD8b-GSXtmdJrtKTTpKhL2j9vOl6Mh7Afs",
  authDomain: "adriele-joias-af0fc.firebaseapp.com",
  projectId: "adriele-joias-af0fc",
  storageBucket: "adriele-joias-af0fc.appspot.com",
  messagingSenderId: "979756469617",
  appId: "1:979756469617:web:ca64faba63ee4853bf3ad0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// 🔥 AQUI ESTÁ O QUE FALTAVA
export const storage = getStorage(app);