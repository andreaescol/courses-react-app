import {
  Author,
  SAVE_AUTHORS,
  ADD_AUTHOR,
  DELETE_AUTHOR,
  AuthorsActionTypes,
} from "./types";

const authorsInitialState: Author[] = [];

const authorsReducer = (
  state = authorsInitialState,
  action: AuthorsActionTypes
): Author[] => {
  switch (action.type) {
    case SAVE_AUTHORS:
      return action.payload;

    case ADD_AUTHOR:
      return [...state, action.payload];

    case DELETE_AUTHOR:
      return state.filter((author) => author.id !== action.payload);

    default:
      return state;
  }
};

export default authorsReducer;
