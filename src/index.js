// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc // Import the addDoc function
} from 'firebase/firestore/lite';

const appSetting  ={
    databaseURL: "https://classhel-da175-default-rtdb.firebaseio.com"
}
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_WRxTkKNU_byr484vOx7k9usHVb2HJ6Y",
  authDomain: "classhel-da175.firebaseapp.com",
  projectId: "classhel-da175",
  storageBucket: "classhel-da175.appspot.com",
  messagingSenderId: "1075696002533",
  appId: "1:1075696002533:web:5a6ca3560f855843507b0c",
  measurementId: "G-KBZBFZRHDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);



// Function to add a class to the "classes" collection
async function addClass(classData) {
    try {
      const docRef = await addDoc(collection(db, "classes"), classData);
      console.log("Class added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding class: ", e);
    }
  }
  
  // Event listener for the form submission
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('class-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const classData = {
        code: document.getElementById('code').value,
        title: document.getElementById('title').value,
        credits: parseInt(document.getElementById('credits').value, 10),
        prerequisites: document.getElementById('prerequisites').value.split(','),
        corequisites: document.getElementById('corequisites').value.split(','),
        description: document.getElementById('description').value,
      };
      addClass(classData);
    });
  });
  