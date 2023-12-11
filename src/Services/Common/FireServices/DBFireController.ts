import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../Authentications/firebase/firebase";

export const FireHttp = {
  Post: async (collectionName: string, data: any) => {
    return await addDoc(collection(db, collectionName), data);
  },
  Put: async (collectionName: string, data: any) => {
    return await updateDoc(doc(db, collectionName, data.docId), data);
  },
  Delete: async (collectionName: string, docId: string) => {
    return await deleteDoc(doc(db, collectionName, docId));
  },
};
