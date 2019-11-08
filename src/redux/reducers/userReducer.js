import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from '../types';

const initialState = {
  authenticated: false,
  isLoading: false,
  userInfo: {},
  likes: [],
  notifications: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
