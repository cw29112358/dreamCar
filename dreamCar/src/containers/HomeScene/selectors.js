import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectHomeScene = (state) => state.get('homeScene', Immutable.Map());

export const selectExample = createGetSelector(
  selectHomeScene, 'example', Immutable.Map()
);
export const selectIsExampleLoading = createGetSelector(
  selectHomeScene, 'isExampleLoading', false
);
