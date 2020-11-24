/**
*
* AppHeader Component
*
*/
/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Icon,
  Text,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import AppStatusBar from 'components/AppStatusBar';

import styles from './styles';

const AppHeader = (props) => {
  const {
    headerSettings, hasShadow, hiddenBorder, hasStatusBar,
    hasLeft, leftPress, leftIcon, leftIconName, backMessage, leftIconStyle,
    hasRight, rightPress, rightButton, rightText, rightTextStyle, rightButtonStyle,
    hasTitle, title, titleStyle, headerStyle,
    ...otherProps
  } = props;
  const { transparent } = headerSettings;

  const headerDefaultStyle = [styles.headerStyle];
  if (hasShadow) headerDefaultStyle.push(styles.shadow);
  if (hiddenBorder) headerDefaultStyle.push(styles.headerBorder);

  let buttonSettings;
  let defaultTitleStyle = {};
  if (transparent) {
    buttonSettings = {
      dark: true,
      transparent: true,
    };
    defaultTitleStyle = styles.transparentTitle;
  }

  const iconStyle = [styles.iconNormal];
  if (leftIconName === 'close' && styles.isIOS) iconStyle.push(styles.iconLarge);
  const leftButton = (
    <Button
      onPress={leftPress}
      {...buttonSettings}
      style={styles.button}
    >
      {
        leftIcon
          ? <Image source={leftIcon} style={styles.imageSize} />
          : <Icon name={leftIconName} style={[iconStyle, leftIconStyle]} />
      }
      <Text>{backMessage}</Text>
    </Button>
  );
  const newRightButton = rightButton || (
    <Button
      onPress={rightPress}
      style={[styles.button, rightButtonStyle]}
      {...buttonSettings}
    >
      {
        rightText ? <Text style={rightTextStyle}>{translate(rightText)}</Text> : <Icon ios="ios-menu" android="md-menu" />
      }
    </Button>
  );
  const titleBody = (
    <Title style={[defaultTitleStyle, titleStyle]}>
      {translate(title)}
    </Title>
  );

  return (
    <Header {...otherProps} style={[headerDefaultStyle, headerStyle]}>
      { hasStatusBar && <AppStatusBar transparent={transparent} /> }
      <Left>
        { hasLeft && leftButton }
      </Left>
      <Body>
        { hasTitle && titleBody }
      </Body>
      <Right>
        { hasRight && newRightButton }
      </Right>
    </Header>
  );
};

AppHeader.defaultProps = {
  hasStatusBar: true,
  // header left params
  hasLeft: true,
  leftPress: () => Actions.pop(),
  leftIcon: null,
  leftIconName: 'ios-arrow-back',
  leftIconStyle: {},
  backMessage: '',
  // header center params
  hasTitle: true,
  title: '',
  titleStyle: {},
  // header right params
  hasRight: false,
  rightPress: undefined,
  rightText: '',
  rightTextStyle: {},
  rightButton: null,
  rightButtonStyle: {},
  // header container params
  hasShadow: true,
  hiddenBorder: true,
  headerSettings: {
    transparent: true,
  },
  headerStyle: {},
};

AppHeader.propTypes = {
  hasStatusBar: PropTypes.bool,
  // header left params
  hasLeft: PropTypes.bool,
  leftPress: PropTypes.func,
  leftIcon: PropTypes.any,
  leftIconName: PropTypes.string,
  leftIconStyle: PropTypes.object,
  backMessage: PropTypes.string,
  // header center params
  hasTitle: PropTypes.bool,
  title: PropTypes.string,
  titleStyle: PropTypes.object,
  // header right params
  hasRight: PropTypes.bool,
  rightPress: PropTypes.func,
  rightText: PropTypes.string,
  rightTextStyle: PropTypes.object,
  rightButton: PropTypes.any,
  rightButtonStyle: PropTypes.object,
  // header container params
  hasShadow: PropTypes.bool,
  hiddenBorder: PropTypes.bool,
  headerSettings: PropTypes.object,
  headerStyle: PropTypes.object,
};

export default AppHeader;
