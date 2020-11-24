/*
 *
 * SignUpScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function signUpSceneReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return state.set('isSignUpLoading', true);
    case SIGN_UP_SUCCESS:
      return state.set('isSignUpLoading', false);
    case SIGN_UP_FAIL:
      return state.set('isSignUpLoading', false);
    default:
      return state;
  }
}

export default signUpSceneReducer;
