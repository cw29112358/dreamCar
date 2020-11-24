import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectLoginScene = (state) => state.get('loginScene', Immutable.Map());

export const selectIsLoginLoading = createGetSelector(
  selectLoginScene, 'isUserLoginLoading', false
);
