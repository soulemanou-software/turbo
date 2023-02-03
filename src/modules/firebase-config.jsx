// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU3V-mL-JQa5CR2ASLQ8SD1rGnpA2gzsk",
  authDomain: "turbo-app-fastdevz.firebaseapp.com",
  projectId: "turbo-app-fastdevz",
  storageBucket: "turbo-app-fastdevz.appspot.com",
  messagingSenderId: "717542229878",
  appId: "1:717542229878:web:45c1409ffe5a5b7dda9c57",
  measurementId: "G-XZM2QS2WCC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
