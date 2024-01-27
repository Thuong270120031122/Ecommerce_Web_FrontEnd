import { HIDE_ALERT, SHOW_ALERT } from "./ActionType";

const initialState = {
  isVisible: false,
  message: "",
  type: "",
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        isVisible: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    case HIDE_ALERT:
      return initialState;
    default:
      return state;
  }
};
