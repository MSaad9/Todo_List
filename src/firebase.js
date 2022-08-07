// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT6gWBZ-zEIvcVQBd3VfK81rL1ArRViwI",
  authDomain: "todo-list-6fee4.firebaseapp.com",
  databaseURL: "https://todo-list-6fee4-default-rtdb.firebaseio.com",
  projectId: "todo-list-6fee4",
  storageBucket: "todo-list-6fee4.appspot.com",
  messagingSenderId: "376325501666",
  appId: "1:376325501666:web:5a0b85a704dac28b7de4bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();