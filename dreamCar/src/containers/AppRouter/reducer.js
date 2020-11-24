/*
 *
 * AppRouter reducer
 *
 */
import { fromJS } from 'immutable';

import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,

  CHANGE_LANGUAGE_SUCCESS,
} from './constants';

const initialState = fromJS({
});

function appRouterReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return state.set('profileId', action.profile._id);
    case USER_LOGIN_FAIL:
      return state.set('profileId', '');

    case CHANGE_LANGUAGE_SUCCESS: {
      return state.set('language', action.language);
    }

    default:
      return state;
  }
}

export default appRouterReducer;
