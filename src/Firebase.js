// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyBTiw479NOnUH0z1pxvLKBt4RTlHt6mNhM",
  authDomain: "practice-70fb0.firebaseapp.com",
  projectId: "practice-70fb0",
  storageBucket: "practice-70fb0.appspot.com",
  messagingSenderId: "910462763903",
  appId: "1:910462763903:web:2fdf8469cc5ec3a0ab504a",
  measurementId: "G-6KGGWRPNT1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
