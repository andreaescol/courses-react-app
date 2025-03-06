export const SAVE_COURSES = "SAVE_COURSES";
export const ADD_COURSE = "ADD_COURSE";
export const DELETE_COURSE = "DELETE_COURSE";
export const UPDATE_COURSE = "UPDATE_COURSE";

export interface Course {
  authors: string[];
  creationDate: string;
  description: string;
  duration: number;
  id: string;
  title: string;
}

export interface newCourse {
  title: string;
  description: string;
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

export interface UpdateCourseAction {
  type: typeof UPDATE_COURSE;
  payload: Course;
}

export type CoursesActionTypes =
  | SaveCoursesAction
  | AddCourseAction
  | DeleteCourseAction
  | UpdateCourseAction;
