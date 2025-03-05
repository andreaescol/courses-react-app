import {
  Author,
  SAVE_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  SaveAuthorsAction,
  AddAuthorAction,
  DeleteAuthorAction,
} from "./types";

export const saveCoursesAction = (courses: Author[]): SaveAuthorsAction => ({
  type: SAVE_AUTHORS,
  payload: courses,
});

export const addCourseAction = (course: Author): AddAuthorAction => ({
  type: ADD_AUTHOR,
  payload: course,
});

export const deleteCourseAction = (courseId: string): DeleteAuthorAction => ({
  type: DELETE_AUTHOR,
  payload: courseId,
});
