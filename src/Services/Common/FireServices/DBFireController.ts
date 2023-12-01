import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Authentications/firebase/firebase";

export const FireHttp = {
  Get: async (collectionName: string) => {
    return await getDocs(collection(db, collectionName));
  },
  Post: async (collectionName: string, data: any) => {
    return await addDoc(collection(db, collectionName), data);
  },
  Put: async (collectionName: string, data: any) => {
    return await updateDoc(doc(db, collectionName, data.id), data);
  },
  Delete: async (collectionName: string, data: any) => {
    return await deleteDoc(doc(db, collectionName, data.id));
  },
};
