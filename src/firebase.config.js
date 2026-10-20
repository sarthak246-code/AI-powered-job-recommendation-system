// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuIadiILHBiUKSYI8rcWHe4ZlfsGqkc5A",
  authDomain: "online-job-portal-7101d.firebaseapp.com",
  projectId: "online-job-portal-7101d",
  storageBucket: "online-job-portal-7101d.firebasestorage.app",
  messagingSenderId: "1088971950026",
  appId: "1:1088971950026:web:ad6d952cbd915781cab133",
  measurementId: "G-YDQNHBR9R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};