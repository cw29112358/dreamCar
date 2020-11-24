/*
 *
 * ProfileScene actions
 *
 */

import {
  LOAD_PROFILES,
  LOAD_PROFILES_SUCCESS,
  LOAD_PROFILES_FAIL,

  SAVE_PROFILES,

  UPLOAD_REF_FILE,
  UPLOAD_REF_FILE_SUCCESS,
  UPLOAD_REF_FILE_FAIL,
} from './constants';

export function loadProfilesAction() {
  return {
    type: LOAD_PROFILES,
  };
}
export function loadProfilesSuccessAction(profile) {
  return {
    type: LOAD_PROFILES_SUCCESS,
    profile,
  };
}
export function loadProfilesFailAction(error) {
  return {
    type: LOAD_PROFILES_FAIL,
    error,
  };
}

export function saveProfilesAction(params) {
  return {
    type: SAVE_PROFILES,
    params,
  };
}

export function uploadRefFileAction(fileBuffer) {
  return {
    type: UPLOAD_REF_FILE,
    fileBuffer,
  };
}
export function uploadRefFileSuccessAction() {
  return {
    type: UPLOAD_REF_FILE_SUCCESS,
  };
}
export function uploadRefFileFaifAction(error) {
  return {
    type: UPLOAD_REF_FILE_FAIL,
    error,
  };
}
