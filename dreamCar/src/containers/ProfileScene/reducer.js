/*
 *
 * ProfileScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
  LOAD_PROFILES_FAIL,

  SAVE_PROFILES,

  UPLOAD_REF_FILE,
  UPLOAD_REF_FILE_SUCCESS,
  UPLOAD_REF_FILE_FAIL,
} from './constants';

const initialState = getImmutableData({
});

function homeSceneReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROFILES:
      return state.set('isProfilesLoading', true);
    case LOAD_PROFILES_SUCCESS: {
      return state
        .set('profile', getImmutableData(action.profile))
        .set('isProfilesLoading', false);
    }
    case LOAD_PROFILES_FAIL:
      return state.set('isProfilesLoading', false);

    case SAVE_PROFILES:
      return state.set('isProfilesLoading', true);

    case UPLOAD_REF_FILE:
      return state.set('isUploading', true);
    case UPLOAD_REF_FILE_SUCCESS: {
      return state
        .set('isUploading', false);
    }
    case UPLOAD_REF_FILE_FAIL:
      return state.set('isUploading', false);

    default:
      return state;
  }
}

export default homeSceneReducer;
