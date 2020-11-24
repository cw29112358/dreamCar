/*
 *
 * MemberScene actions
 *
 */

import {
  MEMBERSHIP_PRICE_LOAD,
  MEMBERSHIP_PRICE_LOAD_SUCCESS,
  MEMBERSHIP_PRICE_LOAD_FAIL,

  LOAD_MEMBER,
} from './constants';

export function loadMembershipPriceAction(id, onSuccess) {
  return {
    type: MEMBERSHIP_PRICE_LOAD,
    id,
    onSuccess,
  };
}
export function loadMembershipPriceSuccessAction(member) {
  return {
    type: MEMBERSHIP_PRICE_LOAD_SUCCESS,
    member,
  };
}
export function loadMembershipPriceFailAction() {
  return {
    type: MEMBERSHIP_PRICE_LOAD_FAIL,
  };
}

export function loadMemberAction(id) {
  return {
    type: LOAD_MEMBER,
    id,
  };
}
