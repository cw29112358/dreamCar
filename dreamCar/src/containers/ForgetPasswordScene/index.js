/**
 *
 * ForgetPasswordScene Container
 *
 */
/* global toast */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';

import TranslateText from 'components/TranslateText';
import FullScreenScene from 'components/FullScreenScene';

import {
  withReducer as changePasswordReducers,
  withSagas as changePasswordSagas,
} from 'containers/ChangePasswordScene';
import { changePasswordAction } from 'containers/ChangePasswordScene/actions';
import { selectIsChangePasswordLoading } from 'containers/ChangePasswordScene/selectors';

import LoginForm from 'forms/LoginForm';

import formValidators from 'utils/formValidators';

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

export class ForgetPasswordScene extends React.Component {
  // render
  renderLoginForm = (step) => {
    const allProps = [
      {
        type: 'step1',
        buttonText: 'nextStep',
        hasForgetPassword: true,
        onSubmit: this.onSubmitVerificationCode,
        onSendVerificationCode: this.onSendVerificationCode,
      },
      {
        type: 'step2',
        buttonText: 'done',
        passwordPlaceholder: 'placeholderCurrentPassword',
        repeatPasswordPlaceholder: 'placeholderNewPassword',
        hasPhoneNumber: false,
        hasPassword: true,
        hasRepeatPassword: true,
        onSubmit: this.onSubmitPassword,
        middleChildren: <TranslateText label="passwordTip" style={styles.passwordTip} />,
      },
    ];
    const formProps = allProps[step - 1] || {};

    return (
      <LoginForm {...formProps} />
    );
  }

  // func
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

    Actions.push('forgetPassword', { step: 2, phoneNumber });
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
      return toast('repeatPasswordIsRequired');
    }
    if (!isRepeatNewPasswordSame(password, repeatPassword)) {
      return toast('isNotRepeatPasswordSame');
    }
    const onSuccess = () => {
      toast('passwordResetComplete', '', '', 1000);
      setTimeout(() => Actions.reset('login'), 1000);
    };
    changePassword(phoneNumber, password, onSuccess);
  }
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
    const { isChangeLoading, headerTitle, step } = this.props;
    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerStyle={styles.headerStyle}
          headerTitle={headerTitle}
          headerProps={{
            hasShadow: false,
            titleStyle: styles.titleStyle,
            leftIconStyle: styles.titleStyle,
            headerSettings: {
              transparent: false,
            },
          }}
          isLoading={isChangeLoading}
          scrollEnabled={false}
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          { this.renderLoginForm(step) }
        </FullScreenScene>
      </ImageBackground>
    );
  }
}

ForgetPasswordScene.defaultProps = {
  step: 1,
  phoneNumber: '',
  headerTitle: 'forgetPasswordTitle',
};

ForgetPasswordScene.propTypes = {
  step: PropTypes.number, // 修改密码的步骤
  phoneNumber: PropTypes.string, // 手机号，用于传入 changePassword 接口
  headerTitle: PropTypes.string, // 头部文本
  isChangeLoading: PropTypes.bool.isRequired, // 改变密码的loading状态
  changePassword: PropTypes.func.isRequired, // 修改密码事件
};

const mapStateToProps = createPropsSelector({
  isChangeLoading: selectIsChangePasswordLoading,
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (phoneNumber, password, onSuccess) => dispatch(changePasswordAction(phoneNumber, password, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  changePasswordReducers,
  ...changePasswordSagas,
)(ForgetPasswordScene);
