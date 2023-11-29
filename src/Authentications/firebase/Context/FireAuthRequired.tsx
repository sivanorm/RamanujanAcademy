import { ReactNode, useContext } from "react";
import { FireBaseAuthContext } from "./firebase-auth-context";
import { Navigate, useLocation } from "react-router-dom";

function FireAuthRequired({ children }: { children: ReactNode }) {
  const { currentUser } = useContext(FireBaseAuthContext);
  let location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
export default FireAuthRequired;
