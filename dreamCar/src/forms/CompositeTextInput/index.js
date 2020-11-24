/**
*
* CompositeTextInput Component
*
*/
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TextInput,
} from 'react-native';
import {
  View,
} from 'native-base';

import Button from 'components/Button';

import styles from './styles';

class CompositeTextInput extends React.Component {
  // render
  renderTextInput = () => {
    const {
      value, secureTextEntry, onChangeText, textInputStyle,
      type, placeholder,
    } = this.props;
    return (
      <TextInput
        value={value}
        secureTextEntry={secureTextEntry}
        style={[styles.defaultTextInputStyle, textInputStyle]}
        onChangeText={(text) => onChangeText(text, type)}
        placeholder={(placeholder && translate(placeholder)) || translate(this.getPlaceholder())}
      />
    );
  }
  renderRightButton = () => {
    const { onSendVerificationCode } = this.props;
    return (
      <Button
        textLabel="sendVerificationCode"
        style={styles.verificationCodeButtonStyle}
        textStyle={styles.verificationCodeTextStyle}
        onPress={onSendVerificationCode}
      />
    );
  }

  // func
  getPlaceholder = () => {
    const { type } = this.props;
    let placeholder;
    if (type === 'phoneNumber') {
      placeholder = 'placeholderPhoneNumber';
    } else if (type === 'password') {
      placeholder = 'placeholderPassword';
    } else if (type === 'forgetPassword') {
      placeholder = 'placeholderVerificationCode';
    } else if (type === 'repeatPassword') {
      placeholder = 'placeholderRepeatPassword';
    } else {
      placeholder = '';
    }
    return placeholder;
  }

  render() {
    const {
      hasLeftImage, imageStyle, image, hasRight,
    } = this.props;
    return (
      <View style={styles.viewStyle}>
        {hasLeftImage && <Image style={imageStyle} source={image} />}
        { this.renderTextInput() }
        { hasRight && this.renderRightButton() }
      </View>
    );
  }
}

CompositeTextInput.defaultProps = {
  image: 0,
  value: '',
  type: 'phoneNumber',
  placeholder: '',
  hasRight: false,
  hasLeftImage: false,
  secureTextEntry: false,
  imageStyle: {},
  textInputStyle: {},
  onChangeText: undefined,
  onSendVerificationCode: undefined,
};

CompositeTextInput.propTypes = {
  image: PropTypes.number, // 图片
  type: PropTypes.string, // 复合框类型
  value: PropTypes.string, // 输入框的值
  placeholder: PropTypes.string, // 输入框的占位符
  hasLeftImage: PropTypes.bool, // 是否显示左侧图片
  secureTextEntry: PropTypes.bool, // 是否隐藏输入的值
  hasRight: PropTypes.bool, // 是否显示右侧按钮
  imageStyle: PropTypes.object, // 图片样式
  textInputStyle: PropTypes.object, // 输入框第二样式
  onChangeText: PropTypes.func, // 输入框改变值时调用
  onSendVerificationCode: PropTypes.func, // 发送验证码事件
};

export default CompositeTextInput;
