import {
  Course,
  SAVE_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  CoursesActionTypes,
} from "./types";

const coursesInitialState: Course[] = [];

const coursesReducer = (
  state = coursesInitialState,
  action: CoursesActionTypes
): Course[] => {
  switch (action.type) {
    case SAVE_COURSES:
      return action.payload;

    case ADD_COURSE:
      return [...state, action.payload];

    case DELETE_COURSE:
      return state.filter((course) => course.id !== action.payload);

    default:
      return state;
  }
};

export default coursesReducer;
