import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';

import * as StrapiApi from 'apis/strapi';

import { DAEMON } from 'utils/constants';

import {
  LOAD_PROFILES,
  SAVE_PROFILES,
  UPLOAD_REF_FILE,
} from './constants';
import {
  loadProfilesSuccessAction, loadProfilesFailAction,
  uploadRefFileSuccessAction, uploadRefFileFaifAction,
} from './actions';

export function* loadProfiles() {
  try {
    const result = yield call(StrapiApi.loadProfile);
    yield put(loadProfilesSuccessAction(result));
  } catch (err) {
    yield put(loadProfilesFailAction(err));
  }
}
export function* saveProfiles(action) {
  try {
    const { params } = action;
    const result = yield call(StrapiApi.updateProfile, params);
    yield put(loadProfilesSuccessAction(result));
  } catch (err) {
    yield put(loadProfilesFailAction(err));
  }
}
export function* uploadRefFile(action) {
  try {
    const { fileBuffer } = action;
    const result = yield call(StrapiApi.uploadRefFile, fileBuffer);
    yield put(uploadRefFileSuccessAction(result));
  } catch (err) {
    yield put(uploadRefFileFaifAction(err));
  }
}

export function* watchLoadProfiles() {
  yield takeLatest(LOAD_PROFILES, loadProfiles);
}
export function* watchSaveProfiles() {
  yield takeLatest(SAVE_PROFILES, saveProfiles);
}
export function* watchUploadRefFile() {
  yield takeLatest(UPLOAD_REF_FILE, uploadRefFile);
}

export default [
  {
    key: 'watchLoadProfiles',
    saga: watchLoadProfiles,
    mode: DAEMON,
  },
  {
    key: 'watchSaveProfiles',
    saga: watchSaveProfiles,
    mode: DAEMON,
  },
  {
    key: 'watchUploadRefFile',
    saga: watchUploadRefFile,
    mode: DAEMON,
  },
];
