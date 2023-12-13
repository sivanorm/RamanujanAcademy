import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../Authentications/firebase/firebase";

export const FireHttp = {
  Get: async (collectionName: string) => {
    return await getDocs(collection(db, collectionName));
  },
  GetById: async (collectionName: string, userId: string) => {
    const strQuery = query(
      collection(db, collectionName),
      where("userid", "==", userId)
    );
    const querySnapshot = await getDocs(strQuery);
    if (querySnapshot.docs.length > 0) {
      return querySnapshot.docs[0];
    } else {
      return null;
    }
  },

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
