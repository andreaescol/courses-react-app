import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUser } from "../../store/selectors";
import { removeUserAction } from "../../store/user/actions";
import { logoutUser } from "../../helpers/services";
import Logo from "./components/Logo/Logo";
import Button from "../../common/Button/Button";
import styles from "./header.module.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(getUser);
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeUserAction());
    logoutUser(user.token);
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
          <span>{user.name}</span>
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
