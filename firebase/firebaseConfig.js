// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD_WRxTkKNU_byr484vOx7k9usHVb2HJ6Y",
    authDomain: "classhel-da175.firebaseapp.com",
    databaseURL: "https://classhel-da175-default-rtdb.firebaseio.com",
    projectId: "classhel-da175",
    storageBucket: "classhel-da175.appspot.com",
    messagingSenderId: "1075696002533",
    appId: "1:1075696002533:web:5a6ca3560f855843507b0c",
    measurementId: "G-KBZBFZRHDH"
  };
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

export default app;
