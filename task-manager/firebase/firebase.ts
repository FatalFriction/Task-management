// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc8tanQnhOrYxQs37VbP1HN4nPT3F96Ac",
  authDomain: "taskify-410720.firebaseapp.com",
  projectId: "taskify-410720",
  storageBucket: "taskify-410720.appspot.com",
  messagingSenderId: "354997298143",
  appId: "1:354997298143:web:6f69b39c6f675cbf99da6a",
  measurementId: "G-TDGCYW30YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage }