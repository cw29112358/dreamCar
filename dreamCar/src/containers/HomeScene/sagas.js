import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  LOAD_EXAMPLE,
} from './constants';
import {
  loadExampleSuccessAction, loadExampleFailAction,
} from './actions';

export function* loadExample() {
  try {
    const result = yield call(StrapiApi.loadExample);
    yield put(loadExampleSuccessAction(result));
  } catch (err) {
    yield put(loadExampleFailAction(err));
  }
}
export function* watchLoadExample() {
  yield takeLatest(LOAD_EXAMPLE, loadExample);
}

export default [
  {
    key: 'watchLoadExample',
    saga: watchLoadExample,
    mode: DAEMON,
  },
];
