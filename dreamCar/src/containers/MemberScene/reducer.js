/*
 *
 * MemberScene reducer
 *
 */

import { getImmutableData } from 'utils/helpers';

import {
  MEMBERSHIP_PRICE_LOAD,
  MEMBERSHIP_PRICE_LOAD_SUCCESS,
  MEMBERSHIP_PRICE_LOAD_FAIL,

  LOAD_MEMBER,
} from './constants';

const initialState = getImmutableData({
});

function memberSceneReducer(state = initialState, action) {
  switch (action.type) {
    case MEMBERSHIP_PRICE_LOAD:
      return state.set('isLoading', true);
    case MEMBERSHIP_PRICE_LOAD_SUCCESS: {
      return state
        .set('member', getImmutableData(action.member))
        .set('isLoading', false);
    }
    case MEMBERSHIP_PRICE_LOAD_FAIL:
      return state
        .set('isLoading', false);

    case LOAD_MEMBER:
      return state.set('isLoading', true);

    default:
      return state;
  }
}

export default memberSceneReducer;
