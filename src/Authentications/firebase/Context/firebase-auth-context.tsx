import { User } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignOutUser, userStateListener } from "../firebase";
import {
  AppUserConfig,
  GetAppUserConfig,
} from "../../../Services/Auth/AppUserConfig";

interface Props {
  children?: ReactNode;
}

export const FireBaseAuthContext = createContext({
  appUserConfig: {} as AppUserConfig | null,
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
});

export const FireBaseAuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appUserConfig, setUserConfig] = useState<AppUserConfig | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
        setUserConfig(GetAppUserConfig(user));
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  // As soon as setting the current user to null,
  // the user will be redirected to the home page.
  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    setUserConfig(null);
    navigate("/");
  };

  const value = {
    appUserConfig,
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
