/*
 *
 * SignUpScene actions
 *
 */

import {
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from './constants';

export function onSignUpAction(phoneNumber, password, onSuccess) {
  return {
    type: SIGN_UP,
    phoneNumber,
    password,
    onSuccess,
  };
}
export function onSignUpSuccessAction(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  };
}
export function onSignUpFailAction(error) {
  return {
    type: SIGN_UP_FAIL,
    error,
  };
}
