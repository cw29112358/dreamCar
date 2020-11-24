import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectSignUpScene = (state) => state.get('signUpScene', Immutable.Map());

export const selectIsSignUpLoading = createGetSelector(
  selectSignUpScene, 'isSignUpLoading', false
);
