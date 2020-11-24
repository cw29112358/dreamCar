/**
*
* Avatar Stateless Component
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'native-base';

import LazyImage from 'components/LazyImage';

import avatarImage from 'assets/avatar.png';

import styles from './styles';

function Avatar(props) {
  const {
    isLocal, url, avatarProps,
    userName, showUserName,
    viewStyle, avatarStyle, nameStyle,
  } = props;

  const imageStyle = [styles.avatar, avatarStyle];

  return (
    <View style={[styles.content, viewStyle]}>
      <LazyImage
        isLazyLoad
        defaultSource={avatarImage}
        isLocal={isLocal}
        url={url}
        imageProps={avatarProps}
        style={imageStyle}
      />
      { showUserName && <Text style={[styles.avatarName, nameStyle]}>{ userName || ''}</Text> }
    </View>
  );
}

Avatar.defaultProps = {
  isLocal: false,
  url: '',
  userName: '',
  showUserName: true,
  avatarProps: {},
  viewStyle: {},
  avatarStyle: {},
  nameStyle: {},
};

Avatar.propTypes = {
  isLocal: PropTypes.bool,
  url: PropTypes.any, // avatar的图片
  userName: PropTypes.string, // 用户姓名
  showUserName: PropTypes.bool, // 是否显示用户姓名
  avatarProps: PropTypes.object, // avatarProps
  viewStyle: PropTypes.any, // 右侧View样式
  avatarStyle: PropTypes.any, // avatar样式
  nameStyle: PropTypes.object, // 用户姓名样式
};

export default Avatar;
