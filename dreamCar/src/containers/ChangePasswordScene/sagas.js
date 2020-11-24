import {
  takeLatest,
  all,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { loadProfilesSuccessAction } from 'containers/ProfileScene/actions';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { CHANGE_PASSWORD } from './constants';
import {
  changePasswordSuccessAction, changePasswordFailAction,
} from './actions';

export function* changePassword(action) {
  try {
    const { phoneNumber, newPassword, onSuccess } = action;
    const result = yield call(StrapiApi.changePassword, phoneNumber, newPassword);
    yield all([
      // 关闭loading状态
      put(changePasswordSuccessAction()),
      // 保存用户信息到ProfileScene的profile
      put(loadProfilesSuccessAction(result)),
    ]);

    executeFunction(onSuccess);
  } catch (err) {
    yield put(changePasswordFailAction(err));
  }
}
export function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}

export default [
  {
    key: 'watchChangePassword',
    saga: watchChangePassword,
    mode: DAEMON,
  },
];
