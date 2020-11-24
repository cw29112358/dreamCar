import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectFavouriteCarScene = (state) => state.get('favouriteCarScene', Immutable.Map());

export const selectFavourites = createGetSelector(
  selectFavouriteCarScene, 'favourites', ''
);
export const selectIsUpdateLoading = createGetSelector(
  selectFavouriteCarScene, 'isUpdateLoading', false
);
