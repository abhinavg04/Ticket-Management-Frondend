import { useUser } from "../context/UserContext";
import { Navigate,Outlet } from "react-router";
import { toast } from "react-toastify";
const ProtectedRoute = ({ roles, children }) => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    toast.error("You are not authorized!");
    return <Navigate to="/unauthorized" replace />;
  }

    return <Outlet />;
};

export default ProtectedRoute;
