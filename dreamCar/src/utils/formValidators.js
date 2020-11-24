/* eslint no-restricted-globals: ["error", "event"] */

/* global window translate */

import {
  isEmail,
  isAlphanumeric,
  isLength,
} from 'validator';
import {
  isEmpty,
  isBoolean,
  isNumber,
} from 'lodash';

// validator
const isRequired = (value) => (
  !isEmpty(value) // covers array, object and string
  || (isNumber(value) && !isNaN(value)) // covers number
  || isBoolean(value)
);
const validators = {
  // 必填写
  isRequired,
  // 密码
  isPassword: (value) => isAlphanumeric(value),
  // 密码最少数位
  isPasswordLongEnough: (value) => isLength(value, { min: 6, max: undefined }),
  // 密码最多数位
  isPasswordShortEnough: (value) => isLength(value, { min: undefined, max: 32 }),
  // 再次输入的密码与之前的密码相同
  isRepeatPasswordSame: (value, allValues) => allValues.get('password') === value,
  // 新密码与之前的密码相同
  isRepeatNewPasswordSame: (value, newValues) => newValues === value,
  // 邮箱地址
  isEmail: (value) => isEmail(value),
  // 手机号
  isPhone: (value) => !isNaN(value) && /^1[3-9]\d{9}$/.test(value),
  // 验证码
  isVerificationCode: (value) => !isNaN(value) && isLength(value, { min: 4, max: 4 }),
  // 邮编
  isZipCode: (value) => isLength(value, { min: 6, max: 6 }),
  // 正数
  isPositiveNumber: (value) => parseFloat(value) > 0,
  // 非负数
  isNonNegative: (value) => parseFloat(value) >= 0,
  // 有效年份
  isValidYear: (value) => !(parseFloat(value) < 1900 || parseFloat(value) > 2100),
};

// 验证不通过的提示的函数
export const toast = (tip) => window.toast(translate(tip));

// eslint-disable-next-line consistent-return
export const passwordValidators = (value) => {
  if (!isRequired(value)) {
    window.toast(translate('passwordIsRequired'));
    return false;
  }
  if (!validators.isPassword(value)) {
    window.toast(translate('passwordIsNotPassword'));
    return false;
  }
};

export default validators;
