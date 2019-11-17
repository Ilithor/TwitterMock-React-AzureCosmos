import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
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
        userInfo: { ...action.payload.user },
        likes: { ...action.payload.like },
      };
    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.userHandle,
            postId: action.payload.postId,
          },
        ],
      };
    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.postId === action.payload.postId
        ),
      };
    default:
      return state;
  }
}
