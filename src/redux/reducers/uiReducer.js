import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

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
    case LOADING_UI:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
