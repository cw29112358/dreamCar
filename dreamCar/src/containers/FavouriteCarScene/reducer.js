/*
 *
 * FavouriteCarScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  UPDATE_FAVOURITE_CAR,
  UPDATE_FAVOURITE_CAR_SUCCESS,
  UPDATE_FAVOURITE_CAR_FAIL,

  UPDATE_FAVOURITE_CARS,
  UPDATE_FAVOURITE_CARS_SUCCESS,
  UPDATE_FAVOURITE_CARS_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function favouriteCarSceneReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FAVOURITE_CAR:
      return state.set('isUpdateLoading', true);
    case UPDATE_FAVOURITE_CAR_SUCCESS: {
      return state
        .set('isUpdateLoading', false);
    }
    case UPDATE_FAVOURITE_CAR_FAIL:
      return state.set('isUpdateLoading', false);

    case UPDATE_FAVOURITE_CARS:
      return state.set('isUpdateLoading', true);
    case UPDATE_FAVOURITE_CARS_SUCCESS: {
      return state
        .set('isUpdateLoading', false);
    }
    case UPDATE_FAVOURITE_CARS_FAIL:
      return state.set('isUpdateLoading', false);

    default:
      return state;
  }
}

export default favouriteCarSceneReducer;
