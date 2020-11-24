/**
*
* HomeHeader Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  Left,
  Body,
  Right,
  Title,
} from 'native-base';

import Avatar from 'components/Avatar';
import AppStatusBar from 'components/AppStatusBar';

import styles from './styles';

function HomeHeader(props) {
  const { onRightPress, profile } = props;

  const leftItem = () => <Left />;
  const centerItem = () => (
    <Body>
      <Title>{translate('dreamCar')}</Title>
    </Body>
  );
  const rightItem = () => (
    <Right>
      <TouchableOpacity onPress={onRightPress}>
        <Avatar
          url={profile.uri}
          avatarStyle={styles.avatar}
          showUserName={false}
        />
      </TouchableOpacity>
    </Right>
  );

  return (
    <Header style={styles.headerStyle}>
      <AppStatusBar transparent />
      { leftItem() }
      { centerItem() }
      { rightItem() }
    </Header>
  );
}

HomeHeader.defaultProps = {
};

HomeHeader.propTypes = {
  onRightPress: PropTypes.func.isRequired, // 右侧按钮事件
  profile: PropTypes.object.isRequired, // 用户信息
};

export default HomeHeader;
