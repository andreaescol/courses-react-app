import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../store/selectors";

interface props {
  Component: React.ComponentType;
  requiredRole?: string;
}

const PrivateRoute = ({ Component, requiredRole }: props) => {
  const user = useSelector(getUser);
  const token = localStorage.getItem("token");

  if (!token || !user || !user.isAuth) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/courses" />;
  }

  return <Component />;
};

export default PrivateRoute;
