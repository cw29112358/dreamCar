import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';
import { createSelector } from 'reselect';

export const selectAppRouter = (state) => state.get('appRouter', Immutable.Map());

export const selectProfileId = createGetSelector(selectAppRouter, 'profileId', '');

export const selectIsLoggedIn = createSelector(selectProfileId, (subState) => !!subState);
