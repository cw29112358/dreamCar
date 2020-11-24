/**
 *
 * ProfileCenterScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  View,
  Text,
  List,
  ListItem,
  Icon,
  Button,
} from 'native-base';

import membershipImage from 'assets/membership.png';

import Avatar from 'components/Avatar';
import FullScreenScene from 'components/FullScreenScene';

import { selectMember } from 'containers/MemberScene/selectors';

import { selectProfile } from 'containers/ProfileScene/selectors';

import messageImage from './assets/message.png';

import {
  SIDE_LINKS,
  MAIN_TAGS,
} from './constants';

import styles from './styles';

export class ProfileCenterScene extends React.Component {
  setHeaderProps = () => ({
    hasShadow: false,
    hasRight: true,
    rightButton: this.renderRightButton(),
    rightFieldStyle: styles.rightFieldStyle,
  })
  renderRightButton = () => (
    <Button
      style={styles.button}
      onPress={() => Actions.push('myNews')}
    >
      <Image source={messageImage} style={styles.headerIcon} />
      <View style={styles.badge} />
    </Button>
  )
  renderAvatar = () => {
    const { profile } = this.props;
    return (
      <TouchableOpacity
        style={styles.avatarView}
        onPress={() => Actions.push('profile')}
      >
        <Avatar
          url={profile.uri}
          userName={profile.name || ''}
          avatarStyle={styles.avatar}
          nameStyle={styles.userName}
        />
      </TouchableOpacity>
    );
  }
  renderMembership = () => {
    const { authUserMembership } = this.props;
    const { isMembership, level } = authUserMembership;
    let membershipText;
    if (isMembership) {
      if (level === 'basic') {
        membershipText = 'basicMember';
      } else if (level === 'premium') {
        membershipText = 'premiumMember';
      } else if (level === 'deluxe') {
        membershipText = 'deluxeMember';
      }
    } else {
      membershipText = 'toBeMemberShip';
    }
    return (
      <TouchableOpacity
        style={styles.membership}
        onPress={() => { Actions.push('member'); }}
      >
        { isMembership && <Image source={membershipImage} style={styles.membershipImage} />}
        <Text style={styles.membershipText}>{ translate(membershipText) }</Text>
        <Icon style={styles.iconStyle} name="ios-arrow-forward" />
      </TouchableOpacity>
    );
  };
  renderTopPart = () => (
    <View style={styles.topPart}>
      { this.renderAvatar() }
      { this.renderMembership() }
    </View>
  )
  // scene bottom part (list)
  renderItem = (sideMenu, Component = ListItem, isShowArrow = true, isHorizontal = true) => {
    /**
      * @param {object} sideMenu displays the set of required parameters
      * @param {Component} Component outer components
      * @param {bool} isShowArrow whether to display arrow. default is true
      * @param {bool} isHorizontal whether to display inline. default is true
      */
    const {
      label, action, iconName, itemStyle = {}, imageStyle, textStyle,
    } = sideMenu;

    const itemLeftStyles = [];
    if (isHorizontal) {
      itemLeftStyles.push(styles.itemLeft);
    }
    if (label === 'refId') {
      return null;
    }
    return (
      <Component key={label} style={[styles.listItem, itemStyle]} onPress={action}>
        <View style={itemLeftStyles}>
          <Image source={iconName} style={imageStyle} />
          <Text style={textStyle}>{translate(label)}</Text>
        </View>
        { isShowArrow && <Icon name="ios-arrow-forward" style={styles.arrowStyles} />}
      </Component>
    );
  };
  renderMainTags = () => (
    <View style={styles.mainTags}>
      { MAIN_TAGS.map((tag) => this.renderItem(tag, TouchableOpacity, false, false)) }
    </View>
  )
  renderList = () => (
    <List style={styles.list}>
      {SIDE_LINKS.map((sideMenu) => this.renderItem(sideMenu))}
    </List>
  );
  renderBottomPart = () => (
    <View style={styles.bottomPart}>
      { this.renderMainTags() }
      { this.renderList() }
    </View>
  );
  render() {
    return (
      <FullScreenScene
        headerTitle="profileCenter"
        headerProps={this.setHeaderProps()}
        contentStyle={styles.content}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      >
        { this.renderTopPart() }
        { this.renderBottomPart() }
      </FullScreenScene>
    );
  }
}

ProfileCenterScene.defaultProps = {
};

ProfileCenterScene.propTypes = {
  authUserMembership: PropTypes.object.isRequired, // 是否是会员
  profile: PropTypes.object.isRequired, // 用户信息
};

const mapStateToProps = createPropsSelector({
  profile: selectProfile,
  authUserMembership: selectMember,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect
)(ProfileCenterScene);
