// databaseService.js
import { getDatabase, ref, set, get } from "firebase/database";
import app from './firebaseConfig';

const database = getDatabase(app);

export const saveData = async (dataPath, data) => {
    const dataRef = ref(database, dataPath);
    await set(dataRef, data);
};

export const getData = async (dataPath) => {
    const dataRef = ref(database, dataPath);
    const snapshot = await get(dataRef);
    if (snapshot.exists()) {
    return snapshot.val();
    } else {
    throw new Error('No data available');
    }
};

// Function to add an image and its metadata to the Realtime Database
    const addImageToDatabase = async (imageData) => {
    const database = getDatabase(app);
    const imagesRef = ref(database, 'images'); // 'images' is the node where you store all images

  // Push a new child node under 'images' with the image data
  // Firebase will automatically generate a unique key for each new child
    const newImageRef = push(imagesRef);

  // Set the data at the new reference
    await set(newImageRef, {
    title: imageData.title,
    description: imageData.description,
    imageUrl: imageData.url // This is the URL you got from Firebase Storage
    });

    console.log(`Added image with title: ${imageData.title}`);
};

// Example usage:
const myImage = {
    description: "software developer",
    title: "swd",
    url: "https://firebasestorage.googleapis.com/v0/b/classhel-da175.appspot.com/o/uploads%2Fswd.png?alt=media&token=ab19a95d-046a-474b-a57b-9d3004c23d2e"
};



addImageToDatabase(myImage).catch(console.error);
