/*
 *
 * MemberScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';
import { executeFunction } from 'utils/helpers';

import { MEMBERSHIP_PRICE_LOAD, LOAD_MEMBER } from './constants';
import {
  loadMembershipPriceSuccessAction, loadMembershipPriceFailAction,
} from './actions';

export function* loadMembershipPrice(action) {
  try {
    const { id, onSuccess } = action;
    const result = yield call(StrapiApi.joinMember, id);
    yield put(loadMembershipPriceSuccessAction(result));
    executeFunction(onSuccess);
  } catch (err) {
    yield put(loadMembershipPriceFailAction(err));
  }
}
export function* watchLoadMembershipPrice() {
  yield takeLatest(MEMBERSHIP_PRICE_LOAD, loadMembershipPrice);
}

export function* loadMember(action) {
  try {
    const { id } = action;
    const result = yield call(StrapiApi.loadMember, id);
    yield put(loadMembershipPriceSuccessAction(result || {}));
  } catch (err) {
    yield put(loadMembershipPriceFailAction(err));
  }
}
export function* watchLoadMember() {
  yield takeLatest(LOAD_MEMBER, loadMember);
}

export default [
  {
    key: 'watchLoadMembershipPrice',
    saga: watchLoadMembershipPrice,
    mode: DAEMON,
  },
  {
    key: 'watchLoadMember',
    saga: watchLoadMember,
    mode: DAEMON,
  },
];
