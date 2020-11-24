/*
 *
 * ChangePasswordScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function changePasswordSceneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return state.set('isChangePasswordLoading', true);
    case CHANGE_PASSWORD_SUCCESS:
      return state.set('isChangePasswordLoading', false);
    case CHANGE_PASSWORD_FAIL:
      return state.set('isChangePasswordLoading', false);
    default:
      return state;
  }
}

export default changePasswordSceneReducer;
