import {
  FETCH_POSTS,
  POSTS_ERROR,
} from './../actions/types';

const INITIAL_STATE = {
  data: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_POSTS:
      return {...state, data: action.payload, error: null };
    case POSTS_ERROR:
      return {...state, data: null, error: action.payload };
    default:
      return state;
  }
};
