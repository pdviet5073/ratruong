// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWcJgqtEoqRXNIWp5Yvn3p9RcO-oevTH8",
  authDomain: "booking-hotel-d7c8b.firebaseapp.com",
  databaseURL: "https://booking-hotel-d7c8b-default-rtdb.firebaseio.com",
  projectId: "booking-hotel-d7c8b",
  storageBucket: "booking-hotel-d7c8b.appspot.com",
  messagingSenderId: "869294388637",
  appId: "1:869294388637:web:f3cb4c9d7b805dd194eb74",
  measurementId: "G-EL6Y06GNX9"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseProviders = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export { firebaseApp, firebaseProviders }
