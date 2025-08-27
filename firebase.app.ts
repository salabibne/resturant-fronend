// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyC7aeWPGTbpbQXw9SFX8j5IZXczLLdFuoo",
  authDomain: "food-1471a.firebaseapp.com",
  projectId: "food-1471a",
  storageBucket: "food-1471a.firebasestorage.app",
  messagingSenderId: "672985522919",
  appId: "1:672985522919:web:c1fe3a8912581a0d1fb842",
  measurementId: "G-DHCBQ98JEC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);