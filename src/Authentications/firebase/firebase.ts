import { initializeApp } from "firebase/app";
import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { config as Fireconfig } from "./fire-config";

const app = initializeApp(Fireconfig);
const auth = getAuth(app);

export const signInUser = async (email: string, password: string) => {
  if (!email && !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
export const CreateUser = async (email: string, password: string) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const userStateListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

export const SignOutUser = async () => await signOut(auth);
