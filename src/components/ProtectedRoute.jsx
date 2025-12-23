import { useUser } from "../context/UserContext";
import { Navigate,Outlet } from "react-router";
const ProtectedRoute = ({ roles, children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
