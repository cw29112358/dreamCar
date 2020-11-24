/*
 *
 * InventoryCarScene actions
 *
 */

import {
  INVENTORY_CAR_LOAD_ACTION,
  INVENTORY_CAR_LOAD_SUCCESS_ACTION,
  INVENTORY_CAR_LOAD_FAIL_ACTION,
} from './constants';

export function loadCarDetailAction(id) {
  return {
    type: INVENTORY_CAR_LOAD_ACTION,
    id,
  };
}
export function loadCarDetailSuccessAction(detailCar) {
  return {
    type: INVENTORY_CAR_LOAD_SUCCESS_ACTION,
    detailCar,
  };
}
export function loadCarDetailFailAction(error) {
  return {
    type: INVENTORY_CAR_LOAD_FAIL_ACTION,
    error,
  };
}
