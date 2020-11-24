import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectProfileScene = (state) => state.get('profileScene', Immutable.Map());

export const selectProfile = createGetSelector(
  selectProfileScene, 'profile', Immutable.Map()
);
export const selectIsProfileLoading = createGetSelector(
  selectProfileScene, 'isProfilesLoading', false
);
export const selectIsUploading = createGetSelector(
  selectProfileScene, 'isUploading', false
);
