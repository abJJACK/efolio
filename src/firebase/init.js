// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGgtD3MjhuhBjBa8zHYl8INWftKsRbJcE",
  authDomain: "week7-taimin.firebaseapp.com",
  projectId: "week7-taimin",
  storageBucket: "week7-taimin.appspot.com",
  messagingSenderId: "734508010628",
  appId: "1:734508010628:web:c3a18addb5f58eaee506d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db= getFirestore()
export default db