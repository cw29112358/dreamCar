import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectMemberSceneReducer = (state) => state.get('memberScene', Immutable.Map());

export const selectLoading = createGetSelector(
  selectMemberSceneReducer, 'isLoading', false,
);
export const selectMember = createGetSelector(
  selectMemberSceneReducer, 'member', Immutable.Map(),
);
