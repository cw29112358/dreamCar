import { createGetSelector } from 'reselect-immutable-helpers';
import Immutable from 'immutable';

export const selectSettingScene = (state) => state.get('settingScene', Immutable.Map());

export const selectExample = createGetSelector(
  selectSettingScene, 'example', ''
);
export const selectIsExampleLoading = createGetSelector(
  selectSettingScene, 'isExampleLoading', false
);
