import { SET_ERRORS, CLEAR_ERRORS, IS_UI_LOADING } from '../types';

const initialState = {
  isLoading: false,
  error: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        isLoading: false,
        error: {},
      };
    case IS_UI_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
