import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBVn9bKxu3pGCh26lNp-Xlrm3FaOUmLqJY",
//   authDomain: "photowalk-dev.firebaseapp.com",
//   projectId: "photowalk-dev",
//   storageBucket: "photowalk-dev.appspot.com",
//   messagingSenderId: "128426281749",
//   appId: "1:128426281749:web:810b8f5d59b354da17b71c",
//   measurementId: "G-M6MKKR25Z3"
// };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);