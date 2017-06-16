import {
  FETCH_POSTS,
  POSTS_ERROR,
} from './types';

import {ValidateResponse, GetJson} from './../utils/request';

export function actionsFetchPosts(delay) {
  return function(dispatch) {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    fetch(url)
    .then(ValidateResponse)
    .then(GetJson)
    .then(posts => {
      setTimeout(() => {
        dispatch ({
          type: FETCH_POSTS,
          payload: posts,
        });
      }, delay);
    })
    .catch(e => {
      dispatch(postsError(e.message));
    });
  }
}

export function postsError(error) {
  return {
    type: POSTS_ERROR,
    payload: error
  };
}
