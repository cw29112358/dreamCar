/**
*
* AppStatusBar Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

const AppStatusBar = (props) => {
  const { transparent } = props;
  return (
    <StatusBar
      barStyle={transparent ? 'dark-content' : 'light-content'}
      translucent
      backgroundColor="transparent"
    />
  );
};

AppStatusBar.defaultProps = {
  transparent: false,
};

AppStatusBar.propTypes = {
  transparent: PropTypes.bool,
};

export default AppStatusBar;
