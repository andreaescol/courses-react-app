import { AppDispatch } from "../store";
import { fetchAuthors } from "../../helpers/services";
import { saveAuthorsAction } from "./actions";

export const getAuthorsThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const authorsData = await fetchAuthors(token);
      dispatch(saveAuthorsAction(authorsData));
    } catch (error) {
      console.error("Failed to fetch authors:", error);
    }
  };
};
