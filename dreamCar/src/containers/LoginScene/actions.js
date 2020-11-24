/*
 *
 * LoginScene actions
 *
 */

import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from './constants';

export function loginAction(phoneNumber, password, onSuccess) {
  return {
    type: USER_LOGIN,
    phoneNumber,
    password,
    onSuccess,
  };
}
export function loginSuccessAction() {
  return {
    type: USER_LOGIN_SUCCESS,
  };
}
export function loginFailAction(error) {
  return {
    type: USER_LOGIN_FAIL,
    error,
  };
}
