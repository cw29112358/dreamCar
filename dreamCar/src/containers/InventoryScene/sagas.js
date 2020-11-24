/*
 *
 * InventoryScene sagas
 *
 */
import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import { INVENTORY_LOAD } from './constants';
import {
  loadInventorySuccessAction, loadInventoryFailAction,
} from './actions';

export function* loadInventory() {
  try {
    const result = yield call(StrapiApi.loadInventory);

    yield put(loadInventorySuccessAction(result));
  } catch (err) {
    yield put(loadInventoryFailAction(err));
  }
}

export function* watchInventory() {
  yield takeLatest(INVENTORY_LOAD, loadInventory);
}

export default [
  {
    key: 'inventoryScene',
    saga: watchInventory,
    mode: DAEMON,
  },
];
