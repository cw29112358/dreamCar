import {
  takeLatest,
  all,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { loadCarDetailSuccessAction } from 'containers/InventoryCarScene/actions';
import { loadInventorySuccessAction } from 'containers/InventoryScene/actions';

import { DAEMON } from 'utils/constants';

import {
  UPDATE_FAVOURITE_CAR,
  UPDATE_FAVOURITE_CARS,
} from './constants';
import {
  updateFavouriteCarSuccessAction, updateFavouriteCarFailAction,
  updateFavouriteCarsSuccessAction, updateFavouriteCarsFailAction,
} from './actions';

export function* updateFavouriteCar(action) {
  try {
    const { id, favorite } = action;
    const result = yield call(StrapiApi.updateFavouriteCar, id, favorite);
    // 把当前更新后的车辆信息（主要是收藏字段的改变）放入所有车辆信息
    // eslint-disable-next-line array-callback-return
    const updatedCars = result[1].map((item) => {
      if (item._id === result[0]._id) {
        return Object.assign({}, item, result[0]); // eslint-disable-line
      }
      return item;
    });
    yield all([
      // 关闭更新收藏loading状态
      put(updateFavouriteCarSuccessAction()),
      // 把更新结果存储在当前车辆详情中
      put(loadCarDetailSuccessAction(result[0])),
      // 把更新后的车辆列表存储在InventoryScene的inventories里面
      put(loadInventorySuccessAction(updatedCars)),
    ]);
  } catch (err) {
    yield put(updateFavouriteCarFailAction(err));
  }
}
export function* watchUpdateFavouriteCar() {
  yield takeLatest(UPDATE_FAVOURITE_CAR, updateFavouriteCar);
}

export function* updateFavouriteCars() {
  try {
    yield call(StrapiApi.updateFavouriteCars);
    yield put(updateFavouriteCarsSuccessAction());
  } catch (err) {
    yield put(updateFavouriteCarsFailAction(err));
  }
}
export function* watchUpdateFavouriteCars() {
  yield takeLatest(UPDATE_FAVOURITE_CARS, updateFavouriteCars);
}

export default [
  {
    key: 'watchUpdateFavouriteCar',
    saga: watchUpdateFavouriteCar,
    mode: DAEMON,
  },
  {
    key: 'watchUpdateFavouriteCars',
    saga: watchUpdateFavouriteCars,
    mode: DAEMON,
  },
];
