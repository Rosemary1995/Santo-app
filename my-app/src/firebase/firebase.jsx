// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUjhjfMynsKeNRYMaVjIA0ki3d08Phg4w",
  authDomain: "nyokabi-bb86b.firebaseapp.com",
  projectId: "nyokabi-bb86b",
  storageBucket: "nyokabi-bb86b.firebasestorage.app",
  messagingSenderId: "764327495096",
  appId: "1:764327495096:web:d0105e15a907627926fb4d",
  measurementId: "G-GR8PGRWKRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export default app