/**
 *
 * SettingScene Container
 *
 */

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Actions } from 'react-native-router-flux';
import {
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Text,
  Button,
} from 'native-base';

import FullScreenScene from 'components/FullScreenScene';
import Mask from 'components/Mask';

import { clearLoginAuthKey } from 'utils/helpers';

import LogoOutModal from './components/LogOutModal';

import { SETTING_LIST } from './constants';
// import { logoutByUserAction } from './actions';
import styles from './styles';

export class SettingScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  closeLogOutModal = () => this.setState({ modalVisible: false })
  openLogOutModal = () => this.setState({ modalVisible: true })
  getOnPressItem = (item) => {
    const link = item.linkUrl;
    if (!link) return null;
    return () => Actions.push(link);
  }

  renderItemLeft = (item) => (
    <Left>
      <Text style={styles.labelStyle} numberOfLines={1}>
        {translate(item.value)}
      </Text>
    </Left>
  )
  renderItemRight = (item) => (
    <Right style={styles.rightStyle}>
      {item.hasRightText && (
        <Text style={styles.rightTextStyle}>
          {item.rightText}
        </Text>
      )}
      {item.hasRightIcon && (
        <Icon style={styles.rightIconStyle} name="ios-arrow-forward" />
      )}
    </Right>
  )
  renderList = () => (
    <List>
      {
        SETTING_LIST.map((item) => (
          <ListItem
            key={item.key}
            onPress={this.getOnPressItem(item)}
            style={styles.listItem}
          >
            { this.renderItemLeft(item) }
            { this.renderItemRight(item) }
          </ListItem>
        ))
      }
    </List>
  )

  renderLogoutButton = () => (
    <Button
      transparent
      onPress={this.openLogOutModal}
      style={styles.logOutButton}
    >
      <Text style={styles.logOutText}>{translate('logOut')}</Text>
    </Button>
  )
  renderModal = () => {
    const { modalVisible } = this.state;
    return (
      <LogoOutModal
        modalVisible={modalVisible}
        closeModal={this.closeLogOutModal}
        logOut={this.logOut}
      />
    );
  }
  renderOutsideContent = () => {
    const { modalVisible } = this.state;
    return modalVisible ? <Mask /> : null;
  }

  // func
  logOut = () => {
    clearLoginAuthKey(); // 清空authKey
    Actions.reset('login');
  }

  render() {
    const { isLoading } = this.props;
    const { modalVisible } = this.state;

    return (
      <FullScreenScene
        isLoading={isLoading}
        headerTitle="setting"
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
        renderOutsideContent={this.renderOutsideContent}
      >
        {this.renderList()}
        { !modalVisible && this.renderLogoutButton()}
        { this.renderModal() }
      </FullScreenScene>
    );
  }
}

SettingScene.defaultProps = {
  isLoading: false,
};

SettingScene.propTypes = {
  isLoading: PropTypes.bool,
};

const mapStateToProps = createPropsSelector({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SettingScene);
