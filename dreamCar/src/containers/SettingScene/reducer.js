/*
 *
 * SettingScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function settingSceneReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return state.set('isLogoutLoading', true);
    case USER_LOGOUT_SUCCESS: {
      return state
        .set('example', getImmutableData(action.example))
        .set('isLogoutLoading', false);
    }
    case USER_LOGOUT_FAIL:
      return state.set('isLogoutLoading', false);
    default:
      return state;
  }
}

export default settingSceneReducer();
