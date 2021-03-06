/**
*
* SizeList Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
} from 'native-base';
import { Image } from 'react-native';

import { nullFunction } from 'utils/helpers';
import TranslateText from 'components/TranslateText';

import styles from './styles';

const SizeList = (props) => {
  const { options, selectedOption, onSelect } = props;

  const renderListItem = (item) => {
    const { url, label, imageStyle = {} } = item;
    const textStyle = [styles.text];
    const active = label === selectedOption;
    if (active) {
      textStyle.push(styles.activeText);
    }

    return (
      <ListItem
        key={label}
        onPress={() => onSelect(item, active, selectedOption)}
        style={styles.listItem}
      >
        <Image style={imageStyle} source={url} />
        <TranslateText label={label} style={textStyle} />
      </ListItem>
    );
  };

  return (
    <List style={styles.list}>
      {
        options.map((item) => renderListItem(item))
      }
    </List>
  );
};

SizeList.defaultProps = {
  options: [],
  selectedOption: '',
  onSelect: nullFunction,
};

SizeList.propTypes = {
  options: PropTypes.array,
  selectedOption: PropTypes.string,
  onSelect: PropTypes.func,
};

export default SizeList;
