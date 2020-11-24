/* global window */

import React from 'react';
import I18n from 'react-native-i18n';
import {
  Linking,
} from 'react-native';
import _ from 'lodash';
import Immutable, { fromJS /* Map */ } from 'immutable';
import variables from 'platform';
import DollarText from 'components/DollarText';
import auth from 'utils/auth';
import zh from 'translations/zh';
import {
  DEV_STRAPI_BASE,
  PROD_STRAPI_BASE,
  IMG_SERVER_URL,
} from 'configs/strapi-config';

const { isPad } = variables;

I18n.fallbacks = true;
I18n.translations = {
  zh,
};

// 返回null的函数
export const nullFunction = () => null;

// 执行callback函数
export const executeFunction = (callback, ...params) => {
  if (typeof callback === 'function') {
    return callback(...params);
  }
  return null;
};

// 中文翻译
export const translate = (value, type, priceStyle, isFixed) => {
  if (type) {
    switch (type) {
      case 'number': {
        if (typeof value !== 'number') return value;

        return value.toLocaleString();
      }
      case 'dollar':
        return <DollarText value={value} priceStyle={priceStyle} isFixed={isFixed} />;
      default:
        return value;
    }
  }

  if (!value) return value;
  const label = I18n.t(`${value}`);
  if (label.indexOf('[missing') === 0) {
    console.warn(label);
    return _.startCase(value);
  }
  // const label = zh[value];
  // if (!label) {
  //   console.warn(`${value} is not found，please complete in zh.js!`);
  //   return _.startCase(value);
  // }
  return label;
};

// iPad 的字体大小
export const getScaleSize = (normalSize) => isPad ? normalSize * 1.5 : normalSize;
export function getPadSize(fontSize, base = 1.5, isPadSize) {
  if (!isPad) return fontSize;

  return isPadSize ? base : fontSize * base;
}

// 合并对象的函数
export const objectMerge = (object, other) => _.merge({}, object, other);

// 链接网页
export const openURLByLinking = (url, supportedErrorId = 'notSupportUrl') => {
  Linking
    .canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        window.alert(supportedErrorId);
        return;
      }

      Linking
        .openURL(url)
        .catch((err) => {
          console.warn('openURL error', err);
        });
    })
    .catch((err) => {
      console.warn('An unexpected error happened', err);
    });
};

// image
const isAbsoluteURL = (url = '') => (
  !url
  || url.slice(0, 4) === 'http'
  || url.slice(0, 5) === 'data:'
);

// 获取库存调整大小的图像URL
export function getInventoryResizedImageUrl(url) {
  if (isAbsoluteURL(url)) return url;

  const mobileDimension = '640x480';
  return `${IMG_SERVER_URL}/${mobileDimension}/inventories/${url}?1`;
}
export const getUserLogoUrl = (logo) => {
  const isMap = Map.isMap(logo);
  if (!logo || (isMap && !logo.size)) return '';
  if (isMap) return getImageUrl(logo.get('url'));

  const { url } = logo;
  return getImageUrl(url);
};
export const getUserDisplayName = (user = {}) => {
  const authUser = user || {};
  const displayName = `${authUser.lastName || ''} ${authUser.firstName || ''}`.trim();
  if (displayName) return displayName;

  return authUser.username || '';
};
export function getImageUrl(image, dimension) {
  const url = typeof image === 'object' ? image.url : image;

  const imageServerBase = IMG_SERVER_URL.replace(/http:\/\/|https:\/\//g, '');
  const imageUrl = (url.split(imageServerBase))[1].replace(/^\/|\/$/g, ''); // remove leading and trailing '/'

  if (!dimension) return `${IMG_SERVER_URL}/${imageUrl}`;
  return `${IMG_SERVER_URL}/${dimension}/${imageUrl}`;
}

// strapi database
export function getEnvironment() {
  return __DEV__ ? 'dev' : 'prod';
}
export function isDevEnvironment() {
  return __DEV__;
}
export function getStrapiBase() {
  if (getEnvironment() === 'dev') return DEV_STRAPI_BASE;
  return PROD_STRAPI_BASE;
}

// 把不可变数据转化为js
export const getImmutableData = (result) => Immutable.Iterable.isIterable(result) ? result : fromJS(result);

// 把storage里面的isOnLine设置为true
export function setIsOnline() {
  auth.set('true', 'isOnline');
}
export function clearLoginAuthKey() {
  auth.clearToken();
  auth.clear('isOnline');
}

// export const getCalculatedPrice = (price, scale = 1000) => Math.ceil((price + 0.01) / scale) * scale - 1;
// export function getCalculatedString(make) {
//   return (make && make.trim())
//     ? make.match(/[a-z]+/ig).join('')
//     : '';
// }

// about date & time
export const doubleDigitize = (number) => {
  if (number < 10) { return `0${number}`; }
  return number.toString();
};
