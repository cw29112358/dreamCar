/*
 *
 * SettingScene constants
 *
 */
import DeviceInfo from 'react-native-device-info';

export const USER_LOGOUT = 'src/SettingScene/USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'src/SettingScene/USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAIL = 'src/SettingScene/USER_LOGOUT_FAIL';

const readableVersion = DeviceInfo.getReadableVersion();

export const SETTING_LIST = [
  {
    key: 'update',
    value: 'updatePassword',
    hasRightIcon: true,
    linkUrl: 'changePassword',
  },
  {
    key: 'feedBack',
    value: 'feedBack',
    hasRightIcon: true,
    linkUrl: 'settingSceneFeedBack',
  },
  {
    key: 'faq',
    value: 'faq',
    hasRightIcon: true,
    linkUrl: 'faq',
  },
  {
    key: 'version',
    value: 'version',
    hasRightIcon: true,
    hasRightText: true,
    linkUrl: 'version',
    rightText: `V${readableVersion}`,
  },
];
