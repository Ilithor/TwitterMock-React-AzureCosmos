import {
  SET_POSTS,
  NEW_POST,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
} from '../types';

const initialState = {
  postList: [],
  post: {},
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case SET_POSTS:
      return {
        ...state,
        postList: action.payload,
        isLoading: false,
      };
    case NEW_POST:
      return {
        ...state,
        postList: [action.payload, ...state.postList],
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let likeIndex = state.postList.findIndex(
        post => post.postId === action.payload.postId
      );
      if (likeIndex < 0) {
        return state;
      }
      state.postList[likeIndex] = {
        ...state.postList[likeIndex],
        ...action.payload,
      };
      return {
        ...state,
      };
    case DELETE_POST:
      let deleteIndex = state.postList.findIndex(
        post => post.postId === action.payload
      );
      if (deleteIndex < 0) {
        return state;
      }
      state.postList.splice(deleteIndex, 1);
      return {
        ...state,
      };
    default:
      return state;
  }
}
