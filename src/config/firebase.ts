import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Replace with your own Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6gveBLf_D9P-WUgD_ZTzOKllLFZwAdIY",
  authDomain: "socialmediaapp-772e3.firebaseapp.com",
  projectId: "socialmediaapp-772e3",
  storageBucket: "socialmediaapp-772e3.firebasestorage.app",
  messagingSenderId: "349576857309",
  appId: "1:349576857309:web:8de59a5b792c7681f4bd34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
