/*
 *
 * ChangePasswordScene actions
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
} from './constants';

export function changePasswordAction(phoneNumber, newPassword, onSuccess) {
  return {
    type: CHANGE_PASSWORD,
    phoneNumber,
    newPassword,
    onSuccess,
  };
}
export function changePasswordSuccessAction(profile) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    profile,
  };
}
export function changePasswordFailAction(error) {
  return {
    type: CHANGE_PASSWORD_FAIL,
    error,
  };
}
