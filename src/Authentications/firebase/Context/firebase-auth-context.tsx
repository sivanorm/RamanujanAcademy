import { User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../firebase";

interface Props {
  children?: ReactNode;
}

export const FireBaseAuthContext = createContext({
  // "User" comes from firebase auth-public.d.ts
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
});

export const FireBaseAuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  // As soon as setting the current user to null,
  // the user will be redirected to the home page.
  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return (
    <FireBaseAuthContext.Provider value={value}>
      {children}
    </FireBaseAuthContext.Provider>
  );
};
