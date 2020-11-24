import {
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';

import { DAEMON } from 'utils/constants';

import * as StrapiApi from 'apis/strapi';


import {
  INVENTORY_CAR_LOAD_ACTION,
} from './constants';
import {
  loadCarDetailSuccessAction,
  loadCarDetailFailAction,
} from './actions';

export function* loadCarDetail(action) {
  try {
    const { id } = action;
    const result = yield call(StrapiApi.loadCarDetail, id);
    yield put(loadCarDetailSuccessAction(result));
  } catch (error) {
    yield put(loadCarDetailFailAction(error));
  }
}

export function* watchLoadCarDetail() {
  yield takeLatest(INVENTORY_CAR_LOAD_ACTION, loadCarDetail);
}

export default [
  {
    key: 'watchLoadCarDetail',
    saga: watchLoadCarDetail,
    mode: DAEMON,
  },
];
