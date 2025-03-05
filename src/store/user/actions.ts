import {
  User,
  ADD_USER,
  REMOVE_USER,
  AddUserAction,
  RemoveUserAction,
} from "./types";

export const addUserAction = (User: User): AddUserAction => ({
  type: ADD_USER,
  payload: User,
});

export const removeUserAction = (): RemoveUserAction => ({
  type: REMOVE_USER,
});
