import {
  Author,
  SAVE_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  SaveAuthorsAction,
  AddAuthorAction,
  DeleteAuthorAction,
} from "./types";

export const saveAuthorsAction = (authors: Author[]): SaveAuthorsAction => ({
  type: SAVE_AUTHORS,
  payload: authors,
});

export const addAuthorAction = (author: Author): AddAuthorAction => ({
  type: ADD_AUTHOR,
  payload: author,
});

export const deleteAuthorAction = (authorId: string): DeleteAuthorAction => ({
  type: DELETE_AUTHOR,
  payload: authorId,
});
