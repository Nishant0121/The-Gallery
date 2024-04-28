// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqm8uALvkmKU3q3XyB95hCadcxuFkGqXU",
  authDomain: "the-gallery-3c000.firebaseapp.com",
  projectId: "the-gallery-3c000",
  storageBucket: "the-gallery-3c000.appspot.com",
  messagingSenderId: "189683291138",
  appId: "1:189683291138:web:62fcb975e2217fba4c831b",
  measurementId: "G-RNNGJLCEDS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
