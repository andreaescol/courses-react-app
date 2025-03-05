export const SAVE_COURSES = "SAVE_COURSES";
export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
}

export interface SaveCoursesAction {
  type: typeof SAVE_COURSES;
  payload: Course[];
}

export interface AddCourseAction {
  type: typeof ADD_COURSE;
  payload: Course;
}

export interface DeleteCourseAction {
  type: typeof DELETE_COURSE;
  payload: string;
}

export type CoursesActionTypes =
  | SaveCoursesAction
  | AddCourseAction
  | DeleteCourseAction;
