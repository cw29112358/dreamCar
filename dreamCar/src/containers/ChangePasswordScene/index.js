/**
 *
 * ChangePasswordScene Container
 *
 */
/* global translate toast */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  ImageBackground, Image,
} from 'react-native';
import {
  View,
  Text,
} from 'native-base';

import successImage from 'assets/checkout.png';

import Button from 'components/Button';
import TranslateText from 'components/TranslateText';
import FullScreenScene from 'components/FullScreenScene';

import {
  withReducer as loginReducer,
  withSagas as loginSagas,
} from 'containers/LoginScene';
import { loginAction } from 'containers/LoginScene/actions';
import { selectIsLoginLoading } from 'containers/LoginScene/selectors';

import { selectProfile } from 'containers/ProfileScene/selectors';

import LoginForm from 'forms/LoginForm';

import formValidators from 'utils/formValidators';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { clearLoginAuthKey } from 'utils/helpers';

import { changePasswordAction } from './actions';
import { selectIsChangePasswordLoading } from './selectors';
import reducer from './reducer';
import sagas from './sagas';

import styles from './styles';

const {
  isRequired,
  isPassword,
  isPasswordLongEnough,
  isPasswordShortEnough,
  isRepeatNewPasswordSame,
} = formValidators;

export class ChangePasswordScene extends React.Component {
  // render
  renderLoginForm = (step) => {
    const allProps = [
      {
        type: 'changePassword',
        buttonText: 'nextStep',
        hasPhoneNumber: false,
        hasPassword: true,
        formStyle: styles.formStyle,
        passwordPlaceholder: 'placeholderCurrentPassword',
        onSubmit: this.onSubmitCurrentPassword,
        middleChildren: this.renderForgetPasswordText(),
      },
      {
        type: 'step2',
        buttonText: 'nextStep',
        passwordPlaceholder: 'placeholderNewPassword',
        repeatPasswordPlaceholder: 'placeholderRepeatNewPassword',
        hasPhoneNumber: false,
        hasPassword: true,
        hasRepeatPassword: true,
        onSubmit: this.onSubmitPassword,
        middleChildren: <TranslateText label="passwordTip" style={styles.passwordTip} />,
      },
      {
        type: 'step3',
        buttonText: 'toLogin',
        hasPhoneNumber: false,
        onSubmit: this.onSubmit,
        middleChildren: (
          <View>
            <Image style={styles.successImage} source={successImage} />
            <Text style={styles.changeSuccess}>{translate('changeSuccess')}</Text>
          </View>
        ),
        bottomChildren: <Text style={styles.changePasswordTip}>{translate('changePasswordTip')}</Text>,
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm {...formProps} />
    );
  }
  renderForgetPasswordText = () => (
    <View style={styles.passwordView}>
      <Button
        style={styles.button}
        textLabel="forgetPassword"
        textStyle={styles.forgetPasswordTextStyle}
        onPress={() => Actions.push('forgetPassword', { headerTitle: 'changePassword' })}
      />
    </View>
  );

  // func
  // eslint-disable-next-line consistent-return
  onSubmitCurrentPassword = (password) => {
    const { onLogin, profile } = this.props;
    if (!isRequired(password)) {
      return toast('currentPasswordIsRequired');
    }
    if (!isPassword(password)) {
      return toast('notPassword');
    }
    if (!isPasswordLongEnough(password)) {
      return toast('notPasswordLongEnough');
    }
    if (!isPasswordShortEnough(password)) {
      return toast('notPasswordShortEnough');
    }

    const onSuccess = () => Actions.push('changePassword', { step: 2, phoneNumber: profile.phoneNumber });

    // 这里有错误，如果输入的密码不正确，会强制刷新页面然后isLoggedIn变为false，跳转登录页。具体以后解决
    onLogin(profile.phoneNumber, password, onSuccess);
  }
  // eslint-disable-next-line consistent-return
  onSubmitPassword = (password, repeatPassword) => {
    const { changePassword, phoneNumber } = this.props;
    if (!isRequired(password)) {
      return toast('currentPasswordIsRequired');
    }
    if (!isPassword(password)) {
      return toast('notPassword');
    }
    if (!isPasswordLongEnough(password)) {
      return toast('notPasswordLongEnough');
    }
    if (!isPasswordShortEnough(password)) {
      return toast('notPasswordShortEnough');
    }
    if (!isRequired(repeatPassword)) {
      return toast('repeatNewPasswordIsRequired');
    }
    if (!isRepeatNewPasswordSame(password, repeatPassword)) {
      return toast('isNotRepeatPasswordSame');
    }

    const onSuccess = () => Actions.reset('changePassword', { step: 3 });
    changePassword(phoneNumber, repeatPassword, onSuccess);
  }
  onSubmit = () => {
    clearLoginAuthKey();
    Actions.reset('login');
  }

  render() {
    const { isLoginLoading, isChangeLoading, step } = this.props;
    const isLoading = isChangeLoading || isLoginLoading;
    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerStyle={styles.headerStyle}
          headerTitle="changePassword"
          headerProps={{
            hasLeft: step !== 3,
            hasShadow: false,
            titleStyle: styles.titleStyle,
            leftIconStyle: styles.titleStyle,
            headerSettings: {
              transparent: false,
            },
          }}
          isLoading={isLoading}
          scrollEnabled={false}
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          { this.renderLoginForm(step) }
        </FullScreenScene>
      </ImageBackground>
    );
  }
}

ChangePasswordScene.defaultProps = {
  step: 1,
  phoneNumber: '',
};

ChangePasswordScene.propTypes = {
  step: PropTypes.number, // 步骤
  phoneNumber: PropTypes.string, // 修改密码第二步骤的changePassword需要用
  isLoginLoading: PropTypes.bool.isRequired, // 登录loading状态
  isChangeLoading: PropTypes.bool.isRequired, // 修改密码loading状态
  profile: PropTypes.object.isRequired, // 用户信息
  onLogin: PropTypes.func.isRequired, // 登录事件
  changePassword: PropTypes.func.isRequired, // 修改密码事件
};

const mapStateToProps = createPropsSelector({
  isLoginLoading: selectIsLoginLoading,
  isChangeLoading: selectIsChangePasswordLoading,
  profile: selectProfile,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (phoneNumber, password, onSuccess) => dispatch(loginAction(phoneNumber, password, onSuccess)),
  changePassword: (phoneNumber, newPassword, onSuccess) => dispatch(changePasswordAction(phoneNumber, newPassword, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'changePasswordScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
  loginReducer,
  ...loginSagas,
)(ChangePasswordScene);
