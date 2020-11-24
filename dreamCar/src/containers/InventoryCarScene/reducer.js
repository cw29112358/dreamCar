/*
 *
 * InventoryCarScene reducer
 *
 */

import { fromJS } from 'immutable';

import {
  INVENTORY_CAR_LOAD_ACTION,
  INVENTORY_CAR_LOAD_SUCCESS_ACTION,
  INVENTORY_CAR_LOAD_FAIL_ACTION,
} from './constants';

const initialState = fromJS({
  carId: [],
  carInfoGroup: [],
});

function inventoryCarSceneReducer(state = initialState, action) {
  switch (action.type) {
    case INVENTORY_CAR_LOAD_ACTION:
      return state.set('isDetailLoading', true);

    case INVENTORY_CAR_LOAD_SUCCESS_ACTION:
      return state
        .set('detailCar', action.detailCar)
        .set('isDetailLoading', false);
    case INVENTORY_CAR_LOAD_FAIL_ACTION:
      return state.set('isDetailLoading', false);

    default:
      return state;
  }
}

export default inventoryCarSceneReducer;
