import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  USER_LOGOUT,
} from './constants';
import {
  logoutByUserSuccessAction, logoutByUserFailAction,
} from './actions';

export function* logoutByUser() {
  try {
    const result = yield call(StrapiApi.signOut);
    yield put(logoutByUserSuccessAction(result));
  } catch (err) {
    yield put(logoutByUserFailAction(err));
  }
}
export function* watchLogoutByUser() {
  yield takeLatest(USER_LOGOUT, logoutByUser);
}

export default [
  {
    key: 'watchLogoutByUser',
    saga: watchLogoutByUser,
    mode: DAEMON,
  },
];
