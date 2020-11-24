import {
  takeLatest,
  all,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { loggedInByUserAction, loggedInByUserFailAction } from 'containers/AppRouter/actions';
import { loadProfilesSuccessAction } from 'containers/ProfileScene/actions';
import { loadMembershipPriceSuccessAction } from 'containers/MemberScene/actions';

import {
  USER_LOGIN,
} from './constants';
import {
  loginSuccessAction, loginFailAction,
} from './actions';

export function* loginByUser(action) {
  try {
    const {
      phoneNumber, password, onSuccess,
    } = action;
    const result = yield call(StrapiApi.login, phoneNumber, password);

    yield all([
      // 关闭loading状态
      put(loginSuccessAction()),
      // 把profile的id存在AppRouter的profileId里面
      put(loggedInByUserAction(result[0])),
      // 把profile存在ProfileScene的profile里面
      put(loadProfilesSuccessAction(result[0])),
      // 把member存在MemberScene的member里面
      put(loadMembershipPriceSuccessAction(result[2] || {})),
    ]);

    executeFunction(onSuccess, result[1]);
  } catch (err) {
    yield all([
      put(loginFailAction(err)),
      put(loggedInByUserFailAction(err)),
    ]);
  }
}
export function* watchLogin() {
  yield takeLatest(USER_LOGIN, loginByUser);
}

export default [
  {
    key: 'watchLogin',
    saga: watchLogin,
    mode: DAEMON,
  },
];
