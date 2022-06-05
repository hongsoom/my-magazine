import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMR6TvJJjSPUVEsboSaKhLNE0VWhmJMtY",
  authDomain: "my-magazine-d8224.firebaseapp.com",
  projectId: "my-magazine-d8224",
  storageBucket: "my-magazine-d8224.appspot.com",
  messagingSenderId: "955665413875",
  appId: "1:955665413875:web:af61de51340eafdeb1e986",
  measurementId: "G-W75Q0TC5RW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export default app;