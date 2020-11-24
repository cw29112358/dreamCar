/* global FormData */

import { request } from 'utils/request';

export function getStrapi(url) {
  return request({
    method: 'GET',
    url,
  });
}
export function createStrapi(url, body) {
  return request({
    method: 'POST',
    url,
    data: body,
  });
}
export function updateStrapi(url, body) {
  return request({
    method: 'PUT',
    url,
    data: body,
  });
}
export function deleteStrapi(url) {
  return request({
    method: 'DELETE',
    url,
  });
}

// AppRouter
export function logInByJwtToken() {
  return getStrapi('/api/auth/local');
}

// LoginScene
export function login(phoneNumber, password) {
  const params = {
    phoneNumber,
    password,
  };
  return createStrapi('/api/auth/local', params);
}

// ForgetPasswordScene
export function changePassword(phoneNumber, password) {
  const params = {
    phoneNumber,
    password,
  };
  return createStrapi('/api/auth/local/changePassword', params);
}

// SignUpScene
export function signUp(phoneNumber, password) {
  const params = {
    phoneNumber,
    password,
  };
  return createStrapi('/api/auth/local/register', params);
}

// HomeScene
export function loadExample() {
  return getStrapi('/api/example');
}

// InventoryScene
export function loadInventory() {
  return getStrapi('/api/car/inventory');
}

// InventoryCarScene
export function loadCarDetail(id) {
  return getStrapi(`/api/car/inventory/${id}`);
}

// ProfileScene
export function loadProfile() {
  return getStrapi('/api/profiles');
}
export function updateProfile(params) {
  return createStrapi('/api/profiles', params);
}
// 上传图片
export function uploadRefFile(fileBuffer) {
  const body = new FormData();
  body.append('avatar', fileBuffer);
  return createStrapi('/api/profiles/upload', body);
}

// FavouriteCarScene
export function updateFavouriteCar(id, favorite) {
  const body = {
    favorite,
  };
  return updateStrapi(`/api/car/inventory/changeFavourite/${id}`, body);
}

export function updateFavouriteCars() {
  return updateStrapi('/api/car/inventory/changeFavourites');
}

// MemberScene
export function joinMember(id) {
  const body = {
    id,
    level: 'basic',
  };
  return createStrapi('/api/member', body);
}

export function loadMember(id) {
  getStrapi(`/api/member/${id}`);
}
