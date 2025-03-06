import { AppState } from "./store";

export const getCourses = (state: AppState) => state.courses;
export const getAuthors = (state: AppState) => state.authors;
export const getUser = (state: AppState) => state.user.name;
