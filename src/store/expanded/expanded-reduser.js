import { SET_EXPAND } from "./expanded-actions";

const initialState = {
  isExpand: false,
};

export const expandReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EXPAND:
      return { ...state, isExpand: payload };
    default:
      return state;
  }
};
