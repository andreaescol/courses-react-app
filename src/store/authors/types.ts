export const SAVE_AUTHORS = "SAVE_AUTHORS";
export const ADD_AUTHOR = "ADD_AUTHOR";
export const DELETE_AUTHOR = "DELETE_AUTHOR";

export interface Author {
  id: string;
  name: string;
}

export interface SaveAuthorsAction {
  type: typeof SAVE_AUTHORS;
  payload: Author[];
}

export interface AddAuthorAction {
  type: typeof ADD_AUTHOR;
  payload: Author;
}

export interface DeleteAuthorAction {
  type: typeof DELETE_AUTHOR;
  payload: string;
}

export type AuthorsActionTypes =
  | SaveAuthorsAction
  | AddAuthorAction
  | DeleteAuthorAction;
