import { useNavigate, useLocation } from "react-router-dom";
import styles from "./header.module.css";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/selectors";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "REMOVE_USER" });
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/registration";

  return (
    <header className={styles.header}>
      <Logo />
      {!isAuthPage && user && (
        <div>
          <span>{user}</span>
          <Button
            buttonText="Logout"
            onClick={handleLogout}
            className="btn btn-info"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
