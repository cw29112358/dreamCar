/**
*
* TextInput Component
*
*/
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
} from 'react-native';

import styles from './styles';

function CompositeTextInput({
  value, textInputStyle, onChangeText, source, placeholder, autoFocus, caretHidden, onFocus, editable,
}) {
  return (
    <TextInput
      value={value}
      editable={editable}
      caretHidden={caretHidden}
      clearButtonMode="while-editing"
      autoFocus={autoFocus}
      onFocus={onFocus}
      style={[styles.defaultTextInputStyle, textInputStyle]}
      onChangeText={(text) => onChangeText(text, source)}
      placeholder={translate(placeholder)}
    />
  );
}

CompositeTextInput.defaultProps = {
  value: '',
  source: '',
  placeholder: '',
  editable: true,
  autoFocus: false,
  caretHidden: false,
  textInputStyle: {},
  onFocus: undefined,
  onChangeText: undefined,
};

CompositeTextInput.propTypes = {
  source: PropTypes.string, // 复合框来源
  value: PropTypes.string, // 输入框的值
  placeholder: PropTypes.string, // 输入框的占位符
  editable: PropTypes.bool, // 输入框是否可编辑状态
  autoFocus: PropTypes.bool, // 输入框自动回的焦点
  caretHidden: PropTypes.bool, // 是否隐藏光标
  textInputStyle: PropTypes.object, // 输入框第二样式
  onFocus: PropTypes.func, // 获得焦点时的事件
  onChangeText: PropTypes.func, // 输入框改变值时调用
};

export default CompositeTextInput;
