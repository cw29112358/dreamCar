/**
*
* SeparatorText Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import styles from './styles';

const SeparatorText = (props) => {
  const {
    label, showSeparate,
    labelStyle, separatorStyle,
  } = props;

  const separator = showSeparate
    ? <View style={[styles.separator, separatorStyle]} />
    : null;

  return (
    <View style={styles.content}>
      { separator }
      <Text style={[styles.footerTitle, labelStyle]}>
        {translate(label)}
      </Text>
      { separator }
    </View>
  );
};

SeparatorText.defaultProps = {
  label: '',
  showSeparate: '',
  separatorStyle: {},
  labelStyle: {},
};

SeparatorText.propTypes = {
  label: PropTypes.string,
  showSeparate: PropTypes.any,
  separatorStyle: PropTypes.object,
  labelStyle: PropTypes.object,
};

export default SeparatorText;
