/*
 *
 * FavouriteCarScene actions
 *
 */

import {
  UPDATE_FAVOURITE_CAR,
  UPDATE_FAVOURITE_CAR_SUCCESS,
  UPDATE_FAVOURITE_CAR_FAIL,

  UPDATE_FAVOURITE_CARS,
  UPDATE_FAVOURITE_CARS_SUCCESS,
  UPDATE_FAVOURITE_CARS_FAIL,
} from './constants';

export function updateFavouriteCarAction(id, favorite) {
  return {
    type: UPDATE_FAVOURITE_CAR,
    id,
    favorite,
  };
}
export function updateFavouriteCarSuccessAction(favourites) {
  return {
    type: UPDATE_FAVOURITE_CAR_SUCCESS,
    favourites,
  };
}
export function updateFavouriteCarFailAction(error) {
  return {
    type: UPDATE_FAVOURITE_CAR_FAIL,
    error,
  };
}

export function updateFavouriteCarsAction() {
  return {
    type: UPDATE_FAVOURITE_CARS,
  };
}
export function updateFavouriteCarsSuccessAction() {
  return {
    type: UPDATE_FAVOURITE_CARS_SUCCESS,
  };
}
export function updateFavouriteCarsFailAction(error) {
  return {
    type: UPDATE_FAVOURITE_CARS_FAIL,
    error,
  };
}
