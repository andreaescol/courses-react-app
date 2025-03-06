import { AppDispatch } from "../store";
import { fetchUser } from "../../helpers/services";
import { addUserAction } from "./actions";
import { User } from "./types";

export const getUserThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const userData = await fetchUser(token);

      const userRole = userData.email === "admin@email.com" ? "ADMIN" : "USER";

      const newUser: User = {
        isAuth: true,
        name: userData.name,
        email: userData.email,
        token: token,
        role: userRole,
      };

      dispatch(addUserAction(newUser));
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };
};
