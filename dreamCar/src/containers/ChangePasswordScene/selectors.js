import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectChangePasswordScene = (state) => state.get('changePasswordScene', Immutable.Map());

export const selectIsChangePasswordLoading = createGetSelector(
  selectChangePasswordScene, 'isChangePasswordLoading', false
);
