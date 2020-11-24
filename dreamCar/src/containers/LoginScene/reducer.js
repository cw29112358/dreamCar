/*
 *
 * LoginScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function homeSceneReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return state.set('isUserLoginLoading', true);
    case USER_LOGIN_SUCCESS:
      return state.set('isUserLoginLoading', false);
    case USER_LOGIN_FAIL:
      return state.set('isUserLoginLoading', false);

    default:
      return state;
  }
}

export default homeSceneReducer;
