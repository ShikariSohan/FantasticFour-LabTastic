import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCoweuwRoPOASEqZSWLWGM6FlPRazrw2MQ",
  authDomain: "labtastic-bb2ce.firebaseapp.com",
  projectId: "labtastic-bb2ce",
  storageBucket: "labtastic-bb2ce.appspot.com",
  messagingSenderId: "248962414160",
  appId: "1:248962414160:web:ad4b750e52b71cf69b8355",
  measurementId: "G-0XGVV6K90B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
