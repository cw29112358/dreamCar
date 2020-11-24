/*
 *
 * AppRouter actions
 *
 */

import {
  // USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_JWTTOKEN,

  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_SUCCESS,
} from './constants';

export function loggedInByUserAction(profile) {
  return {
    type: USER_LOGIN_SUCCESS,
    profile,
  };
}
export function loggedInByUserFailAction(error) {
  return {
    type: USER_LOGIN_FAIL,
    error,
  };
}
export function logInByJwtTokenAction(onFail) {
  return {
    type: USER_LOGIN_JWTTOKEN,
    onFail,
  };
}

export function changeLanguageAction(language) {
  return {
    type: CHANGE_LANGUAGE,
    language,
  };
}
export function changeLanguageSuccessAction(language) {
  return {
    type: CHANGE_LANGUAGE_SUCCESS,
    language,
  };
}
