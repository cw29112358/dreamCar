/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// react && redux module
import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Router,
  Scene,
} from 'react-native-router-flux';

import LoginScene from 'containers/LoginScene';
import SignUpScene from 'containers/SignUpScene';
import ForgetPasswordScene from 'containers/ForgetPasswordScene';

import HomeScene from 'containers/HomeScene';
import InventoryScene from 'containers/InventoryScene';
import InventoryCarScene from 'containers/InventoryCarScene';

import ProfileCenterScene from 'containers/ProfileCenterScene';
import MyNewsScene from 'containers/MyNewsScene';
import ProfileScene from 'containers/ProfileScene';
import FavouriteCarScene from 'containers/FavouriteCarScene';

import MemberScene from 'containers/MemberScene';

import SettingScene from 'containers/SettingScene';
import ChangePasswordScene from 'containers/ChangePasswordScene';
import SettingSceneFeedBack from 'containers/SettingScene/components/SettingSceneFeedBack';
import FaqScene from 'containers/FaqScene';
import VersionScene from 'containers/VersionScene';
import ModalScene from 'components/ModalScene';
// import AgentScene from 'containers/AgentScene';

export default function AppRoutes(props) {
  const { initialKey } = props;
  const prefix = 'dreamCar';
  return (
    <Router uriPrefix={prefix}>
      <Stack key="root" hideNavBar>
        {/* <Scene key="entry" path="entry" component={EntryScene} initial={initialKey === 'entry'} /> */}
        <Scene key="login" component={LoginScene} initial={initialKey === 'login'} />
        <Scene key="signUp" component={SignUpScene} initial={initialKey === 'signUp'} />
        <Scene key="forgetPassword" component={ForgetPasswordScene} initial={initialKey === 'forgetPassword'} />

        <Scene key="home" component={HomeScene} initial={initialKey === 'home'} />
        <Scene key="inventory" component={InventoryScene} initial={initialKey === 'inventory'} />
        <Scene key="inventoryCar" path="inventoryCar/:carId" component={InventoryCarScene} />

        <Scene key="profileCenter" component={ProfileCenterScene} initial={initialKey === 'profileCenter'} />
        <Scene key="myNews" component={MyNewsScene} initial={initialKey === 'myNews'} />
        <Scene key="profile" component={ProfileScene} initial={initialKey === 'profile'} />
        <Scene key="favouriteCar" component={FavouriteCarScene} initial={initialKey === 'favouriteCar'} />
        {/* <Scene key="agent" component={AgentScene} /> */}

        <Scene key="member" component={MemberScene} initial={initialKey === 'member'} />

        <Scene key="setting" component={SettingScene} initial={initialKey === 'setting'} />
        <Scene key="changePassword" component={ChangePasswordScene} initial={initialKey === 'changePassword'} />
        <Scene key="settingSceneFeedBack" component={SettingSceneFeedBack} initial={initialKey === 'settingSceneFeedBack'} />
        <Scene key="faq" component={FaqScene} initial={initialKey === 'faq'} />
        <Scene key="version" component={VersionScene} initial={initialKey === 'version'} />
        <Scene key="modal" component={ModalScene} initial={initialKey === 'modal'} />
      </Stack>
    </Router>
  );
}

AppRoutes.defaultProps = {
  initialKey: 'login',
};

AppRoutes.propTypes = {
  initialKey: PropTypes.string, // 默认进入的页面
};
