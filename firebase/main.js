
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


window.addEventListener('DOMContentLoaded', () => {
    const databaseRef = ref(database);

    onValue(databaseRef, (snapshot) => {
        const allJobs = snapshot.val();
        ['EE', 'CE','BME','ME'].forEach(category => {
        if (allJobs[category]) {
            allJobs[category].forEach((job, index) => {
            const titleElementId = `${category}-${index}-title`;
            const descriptionElementId = `${category}-${index}-description`;
            const salaryRangeElementId = `${category}-${index}-salaryRange`;
            const imageElementId = `${category}-${index}-image`;

            const titleElement = document.getElementById(titleElementId);
            const descriptionElement = document.getElementById(descriptionElementId);
            const salaryRangeElement = document.getElementById(salaryRangeElementId);
            const imageElement = document.getElementById(imageElementId);

            if (titleElement) titleElement.textContent = job.title;
            if (descriptionElement) descriptionElement.textContent = job.description;
            if (salaryRangeElement) salaryRangeElement.textContent = job.salaryRange;
            if (imageElement) imageElement.src = job.image;
            });
        }
        });
    }, {
        onlyOnce: true
    });
    });