import { AppDispatch } from "../store";
import { deleteCourse, fetchCourses } from "../../helpers/services";
import { deleteCourseAction, saveCoursesAction } from "./actions";

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

export const deleteCourseThunk = (courseId: string) => {
  return async (dispatch: AppDispatch) => {
    await deleteCourse(courseId);
    dispatch(deleteCourseAction(courseId));
  };
};
