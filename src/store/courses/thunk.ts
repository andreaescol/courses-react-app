import { AppDispatch } from "../store";
import { addCourse, deleteCourse, fetchCourses } from "../../helpers/services";
import {
  addCourseAction,
  deleteCourseAction,
  saveCoursesAction,
} from "./actions";
import { newCourse } from "./types";

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

export const addCourseThunk = (course: newCourse) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const createdCourse = await addCourse({
        ...course,
        token,
      });

      if (createdCourse) {
        dispatch(addCourseAction(createdCourse));
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };
};

export const deleteCourseThunk = (courseId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await deleteCourse(courseId, token);

      dispatch(deleteCourseAction(courseId));
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };
};
