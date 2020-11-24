/*
 *
 * AppRouter sagas
 *
 */

import {
  takeLatest,
  call,
  put,
  all,
} from 'redux-saga/effects';

import I18n from 'react-native-i18n';
import { Actions } from 'react-native-router-flux';

import * as StrapiApi from 'apis/strapi';

import { loadProfilesSuccessAction } from 'containers/ProfileScene/actions';

import auth from 'utils/auth';
import { DAEMON } from 'utils/constants';
import {
  executeFunction,
} from 'utils/helpers';

import {
  USER_LOGIN_JWTTOKEN,

  CHANGE_LANGUAGE,
} from './constants';

import {
  changeLanguageSuccessAction,
  loggedInByUserAction,
  loggedInByUserFailAction,
} from './actions';

export function* logInByJwtToken(action) {
  const { onFail } = action;
  try {
    const profile = yield call(StrapiApi.logInByJwtToken);
    // yield all([
    //   // 把profile的id存在AppRouter的profileId里面
    //   put(loggedInByUserAction(profile)),
    //   // 把profile存在ProfileScene的profile里面
    //   put(loadProfilesSuccessAction(profile)),
    // ]);
    yield put(loggedInByUserAction(profile));
    yield put(loadProfilesSuccessAction(profile));
    Actions.reset('home');
  } catch (err) {
    executeFunction(onFail);
    loggedInByUserFailAction(err);
  }
}
export function* watchlogInByJwtToken() {
  yield takeLatest(USER_LOGIN_JWTTOKEN, logInByJwtToken);
}

export function* changeLanguage(action) {
  try {
    const { language } = action;
    const hasLanguage = I18n.translations[language];
    if (hasLanguage) {
      I18n.locale = language;
      auth.set(language, 'language');
      yield put(changeLanguageSuccessAction(language));
    } else {
      console.warn('Don\'t have this language!');
    }
  } catch (err) {
    console.warn('change language error', err);
  }
}
export function* watchChangeLanguage() {
  yield takeLatest(CHANGE_LANGUAGE, changeLanguage);
}

export function* rootSaga() {
  yield all([
    watchlogInByJwtToken(),
    watchChangeLanguage(),
  ]);
}

export default [
  {
    key: 'rootSaga',
    saga: rootSaga,
    mode: DAEMON,
  },
];
