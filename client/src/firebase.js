// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-89c36.firebaseapp.com",
  projectId: "mern-blog-89c36",
  storageBucket: "mern-blog-89c36.firebasestorage.app",
  messagingSenderId: "514815203755",
  appId: "1:514815203755:web:64ac08d9aaf02139861aee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);