import {
  Course,
  ADD_COURSE,
  DELETE_COURSE,
  SAVE_COURSES,
  SaveCoursesAction,
  AddCourseAction,
  DeleteCourseAction,
} from "./types";

export const saveCoursesAction = (courses: Course[]): SaveCoursesAction => ({
  type: SAVE_COURSES,
  payload: courses,
});

export const addCourseAction = (course: Course): AddCourseAction => ({
  type: ADD_COURSE,
  payload: course,
});

export const deleteCourseAction = (courseId: string): DeleteCourseAction => ({
  type: DELETE_COURSE,
  payload: courseId,
});
