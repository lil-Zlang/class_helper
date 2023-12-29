
    // Import the functions you need from the SDKs you need
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
    import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';
    
    // Your Firebase configuration
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);

    // Reference to your data
    const jobRef = ref(database, 'job2');

    // Get the data using dot notation (conceptually)
    onValue(jobRef, (snapshot) => {
      const data = snapshot.val(); // data is now the job object
      // Now you can use dot notation to access data properties
      document.getElementById('title').textContent = data.title;
      document.getElementById('description').textContent = data.description;
      document.getElementById('image').src = data.imageUrl;
    }, {
      onlyOnce: true
    });