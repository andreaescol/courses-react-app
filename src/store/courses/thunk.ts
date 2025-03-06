import { AppDispatch } from "../store";
import { fetchCourses } from "../../helpers/services";
import { saveCoursesAction } from "./actions";

export const getCoursesThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const coursesData = await fetchCourses(token);
      dispatch(saveCoursesAction(coursesData));
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };
};
