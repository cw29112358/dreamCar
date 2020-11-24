/**
*
* LoginForm
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import {
  View,
} from 'react-native';

import Button from 'components/Button';
import phoneImage from 'assets/phone.png';
import passwordImage from 'assets/password.png';

import CompositeTextInput from '../CompositeTextInput';

import styles from './styles';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '', // 手机号
      password: '', // 密码
      forgetPassword: '', // 忘记密码
      repeatPassword: '', // 再次输入密码
    };
  }

  // render
  renderButton = () => {
    const { buttonText } = this.props;
    return (
      <Button
        textLabel={buttonText}
        style={styles.loginButtonStyle}
        textStyle={styles.buttonTextStyle}
        onPress={this.onPress}
      />
    );
  }

  // func
  onPress = () => {
    const {
      phoneNumber, password, forgetPassword, repeatPassword,
    } = this.state;
    const { onSubmit, type } = this.props;
    if (type === 'login') { // LoginScheme
      onSubmit(phoneNumber, password);
    } else if (type === 'step1') { // SignUpScheme
      onSubmit(phoneNumber, forgetPassword);
    } else if (type === 'step2') { // SignUpScheme
      onSubmit(password, repeatPassword);
    } else if (type === 'changePassword') {
      onSubmit(password);
    } else {
      onSubmit(phoneNumber, forgetPassword);
    }
  }
  onChangeText = (text, type) => this.setState({ [type]: text });

  render() {
    const {
      phoneNumber, password, forgetPassword, repeatPassword,
    } = this.state;
    const {
      hasTakeLook, hasPhoneNumber, hasPassword, hasForgetPassword, hasRepeatPassword,
      passwordPlaceholder, repeatPasswordPlaceholder,
      middleChildren, bottomChildren,
      onSendVerificationCode, formStyle,
    } = this.props;
    return (
      <View style={[styles.formStyle, formStyle]}>
        {hasTakeLook && (
          <Button
            textLabel="takeLook"
            style={styles.takeLookButton}
            textStyle={styles.takeLookStyle}
            onPress={() => Actions.push('home')}
          />
        )}
        {
          // phoneNumber
          hasPhoneNumber && (
            <CompositeTextInput
              hasLeftImage
              type="phoneNumber"
              value={phoneNumber}
              image={phoneImage}
              imageStyle={styles.phoneImageStyle}
              onChangeText={this.onChangeText}
            />
          )
        }
        {
          // password TextInput
          hasPassword && (
            <CompositeTextInput
              hasLeftImage
              secureTextEntry
              type="password"
              placeholder={passwordPlaceholder}
              value={password}
              image={passwordImage}
              imageStyle={styles.passwordImageStyle}
              onChangeText={this.onChangeText}
            />
          )
        }
        {
          // forgetPassword TextInput
          hasForgetPassword && (
            <CompositeTextInput
              hasRight
              type="forgetPassword"
              value={forgetPassword}
              textInputStyle={styles.textInputStyle}
              onChangeText={this.onChangeText}
              onSendVerificationCode={() => onSendVerificationCode(phoneNumber)}
            />
          )
        }
        {
          // repeatPassword TextInput
          hasRepeatPassword && (
            <CompositeTextInput
              hasLeftImage
              secureTextEntry
              type="repeatPassword"
              value={repeatPassword}
              image={passwordImage}
              placeholder={repeatPasswordPlaceholder}
              imageStyle={styles.passwordImageStyle}
              onChangeText={this.onChangeText}
            />
          )
        }
        { middleChildren }
        { this.renderButton() }
        { bottomChildren }
      </View>
    );
  }
}

LoginForm.defaultProps = {
  type: 'login',
  buttonText: 'login',
  passwordPlaceholder: '',
  repeatPasswordPlaceholder: '',
  hasTakeLook: false,
  hasPhoneNumber: true,
  hasPassword: false,
  hasRepeatPassword: false,
  hasForgetPassword: false,
  formStyle: {},
  onSubmit: undefined,
  onSendVerificationCode: undefined,
  middleChildren: undefined,
  bottomChildren: undefined,
};

LoginForm.propTypes = {
  type: PropTypes.string, // 区别目前是哪个页面，以传入不同的参数到主按钮
  buttonText: PropTypes.string, // 按钮文本
  passwordPlaceholder: PropTypes.string, // 密码输入框的占位符
  repeatPasswordPlaceholder: PropTypes.string, // 新密码输入框的占位符
  hasTakeLook: PropTypes.bool, // 有无先去转转按钮
  hasPhoneNumber: PropTypes.bool, // 有无手机号输入框
  hasPassword: PropTypes.bool, // 有无密码输入框
  hasForgetPassword: PropTypes.bool, // 有无忘记密码输入框
  hasRepeatPassword: PropTypes.bool, // 有无确认密码输入框
  formStyle: PropTypes.object, // 页面的样式
  onSubmit: PropTypes.func, // 主按钮事件
  onSendVerificationCode: PropTypes.func, // 发送验证码事件
  middleChildren: PropTypes.node,
  bottomChildren: PropTypes.node,
};

export default LoginForm;
