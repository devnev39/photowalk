import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const dev = process.env.NEXT_PUBLIC_ENV === "development";

const firebaseConfig = {
  apiKey: dev
    ? process.env.NEXT_PUBLIC_APIKEY
    : process.env.NEXT_PUBLIC_APIKEY_PRD,
  authDomain: dev
    ? process.env.NEXT_PUBLIC_AUTHDOMAIN
    : process.env.NEXT_PUBLIC_AUTHDOMAIN_PRD,
  projectId: dev
    ? process.env.NEXT_PUBLIC_PROJECTID
    : process.env.NEXT_PUBLIC_PROJECTID_PRD,
  storageBucket: dev
    ? process.env.NEXT_PUBLIC_STORAGEBUCKET
    : process.env.NEXT_PUBLIC_STORAGEBUCKET_PRD,
  messagingSenderId: dev
    ? process.env.NEXT_PUBLIC_MESSAGINGSENDERID
    : process.env.NEXT_PUBLIC_MESSAGINGSENDERID_PRD,
  appId: dev
    ? process.env.NEXT_PUBLIC_APPID
    : process.env.NEXT_PUBLIC_APPID_PRD,
  measurementId: dev
    ? process.env.NEXT_PUBLIC_MEASUREMENTID
    : process.env.NEXT_PUBLIC_MEASUREMENTID_PRD,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
