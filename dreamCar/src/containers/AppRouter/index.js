/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
/* global window */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
// import DeviceInfo from 'react-native-device-info';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Alert,
} from 'react-native';

import AppRoutes from 'src/AppRoutes';

import RNToast from 'components/RNToast';
import {
  translate,
  executeFunction,
  // clearLoginAuthKey,
} from 'utils/helpers';
// import auth from 'utils/auth';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

// import { logInByJwtTokenAction } from './actions';
import { selectIsLoggedIn } from './selectors';
import reducer from './reducer';
import sagas from './sagas';

// 注册全局翻译函数
window.translate = translate;

// 注册全局 alert 函数
window.alert = (title, message, buttons, options = {}, type) => {
  const {
    titleTranslate = true,
    messageTranslate = true,
    buttonTranslate = true,
    ...otherOptions
  } = options;

  const translateText = (label, isTranslate) => isTranslate ? window.translate(label) : label;

  const alertButtons = buttons || [{ text: 'confirm' }];
  const translateButtons = alertButtons.map((item) => {
    const { text, buttonTranslate: itemButtonTranslate = true } = item;

    return {
      ...item,
      text: translateText(text, buttonTranslate && itemButtonTranslate),
    };
  });

  Alert.alert(
    translateText(title, titleTranslate),
    translateText(message, messageTranslate),
    translateButtons,
    otherOptions,
    type,
  );
};

// 注册全局 toast 函数
window.toast = (title = '', message = '', type = '', duration = 2500, isTranslate = true) => {
  RNToast.show({
    duration,
    position: 'middle',
    type,
    text: isTranslate ? translate(`${title}${message ? `\n ${message}` : ''}`) : `${title}${message ? `\n ${message}` : ''}`,
  });
};

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sceneKey: '', // router 的 key
    };

    window.validIsLoggedIn = this.validIsLoggedIn; // 注册验证用户是否登录函数

    I18n.locale = 'zh'; // 设置语言

    // this.getSceneKey(); // 从storage获取sceneKey，判断用户应该进入哪一个页面
  }

  // componentWillMount() {
  //   this.onLogInByJwtToken(); // 刷新时自动登陆
  // }

  // func
  validIsLoggedIn = (loginCallback, backToEntry = true) => {
    const isLoggedIn = this.getIsLoggedIn();
    if (isLoggedIn) {
      executeFunction(loginCallback);
    } else if (backToEntry) {
      Actions.reset('login');
    }
  }
  // 判断是否登陆
  getIsLoggedIn = () => {
    const { isLoggedIn } = this.props;
    return isLoggedIn;
  }
  // //  从storage获取sceneKey
  // getSceneKey = async () => {
  //   let sceneKey = await auth.getSceneKey();
  //   if (!sceneKey) sceneKey = 'home';
  //   this.setState({ sceneKey });
  // }
  // 判断进入app显示哪一页面
  // getInitialKey = () => {
  //   const { sceneKey } = this.state;
  //   const isLoggedIn = this.getIsLoggedIn();
  //   if (!isLoggedIn) return 'login';
  //   return sceneKey;
  // }
  // 刷新登陆
  // onLogInByJwtToken = async () => {
  //   const { logInByJwtToken } = this.props;
  //   const accessToken = await auth.getToken(); // 从storage获取token
  //   const isOnline = await auth.get('isOnline'); // 从storage获取isOnline
  //
  //   if (isOnline === 'true' && accessToken) {
  //     logInByJwtToken(this.clearLoginAuthKey);
  //   } else {
  //     this.clearLoginAuthKey();
  //   }
  // }
  // clearLoginAuthKey = () => clearLoginAuthKey()

  render() {
    // const initialKey = this.getInitialKey();
    return <AppRoutes />;
  }
}

AppRouter.defaultProps = {
  isLoggedIn: false,
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool,
  // logInByJwtToken: PropTypes.func.isRequired,
};

const mapStateToProps = createPropsSelector({
  isLoggedIn: selectIsLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  // logInByJwtToken: (onFail) => dispatch(logInByJwtTokenAction(onFail)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'appRouter', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
)(AppRouter);
