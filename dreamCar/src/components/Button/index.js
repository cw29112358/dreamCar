/**
*
* Button Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Button as NBButton,
} from 'native-base';

import TranslateText from 'components/TranslateText';

import styles from './styles';

const Button = (props) => {
  const {
    shadowStyle, leftChildren, rightChildren, children,
    textStyle, textLabel, textTranslate, textOtherProps,
    style,
    ...otherProps
  } = props;

  // 1.children
  let button;
  if (children) {
    button = (
      <NBButton style={[styles.buttonStyle, style]} transparent {...otherProps}>
        {children }
      </NBButton>
    );
  } else {
    button = (
      <NBButton style={[styles.buttonStyle, style]} transparent {...otherProps}>
        { leftChildren }
        { <TranslateText
          style={textStyle}
          label={textLabel}
          isTranslate={textTranslate}
          {...textOtherProps}
        /> }
        { rightChildren }
      </NBButton>
    );
  }

  // 3.阴影
  if (shadowStyle) {
    button = (
      <View style={shadowStyle}>
        { button }
      </View>
    );
  }

  return button;
};

Button.defaultProps = {
  shadowStyle: undefined,
  leftChildren: undefined,
  rightChildren: undefined,
  children: undefined,
  otherProps: {},
  textLabel: '',
  textStyle: undefined,
  textTranslate: true,
  textOtherProps: {},
  style: {},
};

Button.propTypes = {
  shadowStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  leftChildren: PropTypes.any,
  rightChildren: PropTypes.any,
  children: PropTypes.any,
  otherProps: PropTypes.object,
  textLabel: PropTypes.string,
  textStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  textTranslate: PropTypes.bool,
  textOtherProps: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default Button;
