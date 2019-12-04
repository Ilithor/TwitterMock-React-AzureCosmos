import { SET_POSTS, LIKE_POST, UNLIKE_POST, LOADING_DATA } from '../types';

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
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.postList.findIndex(
        post => post.postId === action.payload.postId
      );
      state.postList[index] = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
}
