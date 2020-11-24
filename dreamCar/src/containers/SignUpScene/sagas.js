import {
  takeLatest,
  all,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { loggedInByUserAction } from 'containers/AppRouter/actions';
import { loadProfilesSuccessAction } from 'containers/ProfileScene/actions';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import {
  SIGN_UP,
} from './constants';
import {
  onSignUpSuccessAction, onSignUpFailAction,
} from './actions';

export function* onSignUp(action) {
  try {
    const { phoneNumber, password, onSuccess } = action;
    const result = yield call(StrapiApi.signUp, phoneNumber, password);

    yield all([
      // 关闭loading 状态
      put(onSignUpSuccessAction()),
      // 把profile的id存在AppRouter的profileId里面
      put(loggedInByUserAction(result[0])),
      // 把profile存在ProfileScene的profile里面
      put(loadProfilesSuccessAction(result[0])),
    ]);

    executeFunction(onSuccess, result[1]);
  } catch (err) {
    yield put(onSignUpFailAction(err));
  }
}
export function* watchSign() {
  yield takeLatest(SIGN_UP, onSignUp);
}

export default [
  {
    key: 'watchSign',
    saga: watchSign,
    mode: DAEMON,
  },
];
