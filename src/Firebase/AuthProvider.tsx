// AuthProvider.tsx
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "./firebase";
import firebase from "firebase/compat/app";

interface AuthContextProps {
  user: firebase.User | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
interface MyComponentProps {
  children?: ReactNode;
}

export const AuthProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = async () => {
    return auth.signOut();
  };

  const contextValue = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
