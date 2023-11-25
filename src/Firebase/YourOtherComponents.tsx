// YourOtherComponents.tsx
import React from "react";
import { useAuth } from "./AuthProvider";

const YourOtherComponents: React.FC = () => {
  const { user, signIn, signOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn("sivanormsoft@gmail.com", "Prasanth@24");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <p>Please sign in:</p>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default YourOtherComponents;
