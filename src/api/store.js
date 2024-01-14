import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getUser = async (email) => {
    const ref = doc(db, "users", email);
    const user = await getDoc(ref);
    if(user.exists()){
        return user.data();
    }
    return false;
}

export const fetchDocsCollection = async (collection_name) => {
    const snapshot = await getDocs(collection(db, collection_name));
    let docs = [];
    snapshot.forEach(doc => {
        docs.push(doc.data());  
    })
    console.log(docs);
    return docs;
}

export const updateUser = async (user) => {
    const ref = doc(db, "users", user.email);
    await updateDoc(ref, user);
}