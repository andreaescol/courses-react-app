import { AppDispatch } from "../store";
import { addAuthor, fetchAuthors } from "../../helpers/services";
import { addAuthorAction, saveAuthorsAction } from "./actions";
import { newAuthor } from "./types";

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

export const addAuthorThunk = (author: newAuthor) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const createdAuthor = await addAuthor({ ...author, token });

      if (createdAuthor) {
        dispatch(addAuthorAction(createdAuthor));
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };
};
