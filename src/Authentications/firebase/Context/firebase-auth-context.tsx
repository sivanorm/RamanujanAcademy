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
  appUserConfig: {} as AppUserConfig,
  currentUser: {} as User | null,
  setCurrentUser: (_user: User) => {},
  signOut: () => {},
});

export const FireBaseAuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [appUserConfig, setUserConfig] = useState<AppUserConfig>(
    {} as AppUserConfig
  );
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      if (user) {
        setCurrentUser(user);
        GetAppUserConfig(user).then((res) => {
          setUserConfig(res);
        });
      }
    });
    return unsubscribe;
  }, [setCurrentUser]);

  const signOut = () => {
    SignOutUser();
    setCurrentUser(null);
    setUserConfig(new AppUserConfig());
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
