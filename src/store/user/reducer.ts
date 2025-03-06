import { User, ADD_USER, REMOVE_USER, UserActionTypes } from "./types";

const userInitialState: User = {
  isAuth: false,
  name: "",
  email: "",
  token: "",
  role: "",
};

const userReducer = (
  state = userInitialState,
  action: UserActionTypes
): User => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;

    case REMOVE_USER:
      return userInitialState;

    default:
      return state;
  }
};

export default userReducer;
