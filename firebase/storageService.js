// storageService.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from './firebaseConfig';

const storage = getStorage(app);

export const uploadImageAndGetURL = async (file) => {
  const storageRef = ref(storage, `uploads/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
