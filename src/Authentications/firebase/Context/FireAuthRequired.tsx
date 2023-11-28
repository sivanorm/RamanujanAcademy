import { useContext } from "react";
import { FireBaseAuthContext } from "./firebase-auth-context";
import { Navigate, useLocation } from "react-router-dom";

function FireAuthRequired({ children }: { children: JSX.Element }) {
  const { currentUser } = useContext(FireBaseAuthContext);
  let location = useLocation();

  if (!currentUser) {
    // Redirect the user to the home page.
    // Please! Close the mustache {{}}
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default FireAuthRequired;
