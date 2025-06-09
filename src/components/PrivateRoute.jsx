import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";

export default function PrivateRoute({ children }) {
  const user = getCurrentUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
