/**
 *
 * SignUpScene Container
 *
 */
/* global toast */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  ImageBackground,
  View,
} from 'react-native';

import Button from 'components/Button';
import TranslateText from 'components/TranslateText';
import FullScreenScene from 'components/FullScreenScene';

import LoginForm from 'forms/LoginForm';

import formValidators from 'utils/formValidators';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { setIsOnline } from 'utils/helpers';
import auth from 'utils/auth';

import {
  onSignUpAction,
} from './actions';
import {
  selectIsSignUpLoading,
} from './selectors';

import reducer from './reducer';
import sagas from './sagas';

import styles from './styles';

const {
  isRequired,
  isPhone,
  isPassword,
  isPasswordLongEnough,
  isPasswordShortEnough,
  isVerificationCode,
  isRepeatNewPasswordSame,
} = formValidators;

class SignUpScene extends React.Component {
  // render
  renderLoginForm = (step) => {
    const allProps = [
      {
        type: 'step1',
        buttonText: 'nextStep',
        hasForgetPassword: true,
        bottomChildren: this.renderBottomChildren(step),
        onSubmit: this.onSubmitVerificationCode,
        onSendVerificationCode: this.onSendVerificationCode,
      },
      {
        type: 'step2',
        buttonText: 'signUp',
        hasPhoneNumber: false,
        hasPassword: true,
        hasRepeatPassword: true,
        onSubmit: this.onSubmitPassword,
        middleChildren: <TranslateText label="passwordTip" style={styles.passwordTip} />,
        bottomChildren: this.renderBottomChildren(step),
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm {...formProps} />
    );
  }
  renderBottomChildren = (step) => {
    let children;
    if (step > 1) {
      children = (
        <View style={styles.footer}>
          <View style={styles.row}>
            <TranslateText label="inputPasswordTipLineOne" style={styles.tipText} />
            <TranslateText label="serviceTerms" style={[styles.tipText, styles.brand]} onPress={this.onPressServiceTerms} />
            <TranslateText label="and" style={styles.tipText} />
            <TranslateText label="privacyPolicy" style={[styles.tipText, styles.brand]} onPress={this.onPressPrivacyPolicy} />
          </View>
          <TranslateText label="hasAccount" style={styles.noAccountText} />
          <Button style={styles.signUpButton} textStyle={styles.signUpText} textLabel="login" onPress={() => Actions.reset('login')} />
        </View>
      );
    } else {
      children = (
        <View style={styles.footer}>
          <TranslateText label="hasAccount" style={styles.noAccountText} />
          <Button style={styles.signUpButton} textStyle={styles.signUpText} textLabel="login" onPress={() => Actions.reset('login')} />
        </View>
      );
    }
    return children;
  }

  // func
  // 注册第一步
  // eslint-disable-next-line consistent-return
  onSubmitVerificationCode = (phoneNumber, forgetPassword) => {
    if (!isRequired(phoneNumber)) {
      return toast('phoneNumberIsRequired');
    }
    if (!isPhone(phoneNumber)) {
      return toast('notPhoneNumber');
    }
    if (!isRequired(forgetPassword)) {
      return toast('verificationCodeIsRequired');
    }
    if (!isVerificationCode(forgetPassword)) {
      return toast('notVerificationCode');
    }
    Actions.push('signUp', { step: 2, phoneNumber });
  }
  // 注册第二步
  // eslint-disable-next-line consistent-return
  onSubmitPassword = (password, repeatPassword) => {
    const { onSignUp, phoneNumber } = this.props;
    if (!isRequired(password)) {
      return toast('passwordIsRequired');
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
      return toast('newPasswordIsRequired');
    }
    if (!isRepeatNewPasswordSame(password, repeatPassword)) {
      return toast('isNotRepeatPasswordSame');
    }
    const onSuccess = (token) => {
      setIsOnline(); // 设置isOnLine 为true
      if (token) auth.setToken(token); // 存储token 到storage 中
      auth.setSceneKey('home'); // 存储sceneKey 到storage 中
      Actions.reset('home'); // 跳转首页
    };
    onSignUp(phoneNumber, password, onSuccess);
  }
  onPressServiceTerms = () => console.log('a');
  onPressPrivacyPolicy = () => console.log('b');
  // 发送验证码
  // eslint-disable-next-line consistent-return
  onSendVerificationCode = (phoneNumber) => {
    if (!isRequired(phoneNumber)) {
      return toast('phoneNumberIsRequired');
    }
    if (!isPhone(phoneNumber)) {
      return toast('notPhoneNumber');
    }
  }

  render() {
    const { isLoading, step } = this.props;
    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerStyle={styles.headerStyle}
          headerTitle="signUp"
          headerProps={{
            hasShadow: false,
            titleStyle: styles.titleStyle,
            leftIconStyle: styles.titleStyle,
            headerSettings: {
              transparent: false,
            },
          }}
          isLoading={isLoading}
          scrollEnabled={false}
          containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
        >
          { this.renderLoginForm(step) }
        </FullScreenScene>
      </ImageBackground>
    );
  }
}

SignUpScene.defaultProps = {
  step: 1,
  phoneNumber: '',
};

SignUpScene.propTypes = {
  step: PropTypes.number, // 步骤
  phoneNumber: PropTypes.string, // step1传过来的手机号，用在注册时验证
  isLoading: PropTypes.bool.isRequired, // 注册时loading状态
  onSignUp: PropTypes.func.isRequired, // 注册事件
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsSignUpLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onSignUp: (phoneNumber, password, onSuccess) => dispatch(onSignUpAction(phoneNumber, password, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'signUpScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
)(SignUpScene);
