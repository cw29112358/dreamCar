/*
 *
 * SettingScene actions
 *
 */

import {
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
} from './constants';

export function logoutByUserAction() {
  return {
    type: USER_LOGOUT,
  };
}
export function logoutByUserSuccessAction(example) {
  return {
    type: USER_LOGOUT_SUCCESS,
    example,
  };
}
export function logoutByUserFailAction(error) {
  return {
    type: USER_LOGOUT_FAIL,
    error,
  };
}
