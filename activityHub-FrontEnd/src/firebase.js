// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "activity-hub-e75f1.firebaseapp.com",
  projectId: "activity-hub-e75f1",
  storageBucket: "activity-hub-e75f1.appspot.com",
  messagingSenderId: "893994249995",
  appId: "1:893994249995:web:6e5a328155b2efda70fc0e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the authentication object
export const auth = getAuth(app);
