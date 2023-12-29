// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";


// Your web app's Firebase configuration
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

const firebase = require("firebase/app");
require("firebase/analytics");
require("firebase/storage");



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

//Function to handle file uploads to Firebase Storage
function uploadFile(file) {
  // Create a storage reference with the file name in the 'uploads' folder
  const uploadRef = storageRef(storage, `uploads/${file.name}`);

  // Upload the file to Firebase Storage
  uploadBytes(uploadRef, file)
    .then((snapshot) => {
      console.log(`Successfully uploaded file: ${file.name}`);
      // Get the download URL
      return getDownloadURL(uploadRef);
    })
    .then((downloadURL) => {
      console.log(`File available at: ${downloadURL}`);
    })
    .catch((error) => {
      console.error(`Error uploading file: ${error.message}`);
    });
}

// //Event listener for the file input change event
// document.addEventListener('DOMContentLoaded', () => {
//   const fileInputElement = document.getElementById('fileInput');
//   fileInputElement.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       uploadFile(file);
//     }
//   });
// });

function loadImageAndInfo() {
  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/classhel-da175.appspot.com/o/uploads%2Fhardware_eng.png?alt=media&token=917dc003-fcb7-4339-bf7d-469219f935c6";

  // Update the HTML image element with the new ID
  document.getElementById("firebaseImage").src = imageUrl;
}

// // Ensure this function is called when the page loads or at the appropriate time
// document.addEventListener('DOMContentLoaded', function() {
//   loadImageAndInfo();
// });

// Get a database reference to our posts
const db = getDatabase();
const ref = db.ref('https://classhel-da175-default-rtdb.firebaseio.com/');

// Attach an asynchronous callback to read the data at our posts reference
ref.on('value', (snapshot) => {
  console.log(snapshot.val());
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
}); 
