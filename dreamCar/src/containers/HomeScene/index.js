/**
 *
 * HomeScene Container
 *
 */

/* global window */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Image } from 'react-native';
import {
  Container,
  View,
  Text,
} from 'native-base';

import Loader from 'components/Loader';
import Button from 'components/Button';

import { selectIsLoggedIn } from 'containers/AppRouter/selectors';

import {
  withReducer as inventoryReducers,
  withSagas as inventorySagas,
} from 'containers/InventoryScene';
import {
  loadInventoryAction,
  changeFilterAction,
} from 'containers/InventoryScene/actions';
import {
  selectIsLoading as selectIsInventoryLoading,
  selectInventoryByType,
} from 'containers/InventoryScene/selectors';

import {
  withReducer as profileReducer,
  withSagas as profileSagas,
} from 'containers/ProfileScene';
import { selectProfile } from 'containers/ProfileScene/selectors';

import {
  withReducer as memberReducer,
  withSagas as memberSagas,
} from 'containers/MemberScene';
import { selectLoading } from 'containers/MemberScene/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomeHeader from './components/HomeHeader';
import CarTypeList from './components/CarTypeList';

import { loadExampleAction } from './actions';
import { selectExample, selectIsExampleLoading } from './selectors';
import sagas from './sagas';
import reducer from './reducer';

import styles from './styles';

export class HomeScene extends React.Component {
  componentDidMount() {
    const { loadInventory } = this.props;
    loadInventory(); // 加载库存列表
  }

  // render
  renderHeader = () => {
    const { profile, isLoggedIn } = this.props;
    return (
      <HomeHeader
        profile={profile}
        isLoggedIn={isLoggedIn}
        onRightPress={this.onRightPress}
      />
    );
  }
  renderContent = () => (
    <View style={styles.contentContainer}>
      {/* {this.renderFilterPrice()} */}
      {this.renderCarTypeList()}
    </View>
  )
  renderCarTypeList = () => {
    const { typeOfInventory } = this.props;
    return (
      <CarTypeList
        typeOfInventory={typeOfInventory}
        onFilterCarTypeChange={this.onFilterCarTypeChange}
      />
    );
  }

  // func
  // 右侧头像按钮点击事件
  onRightPress = () => window.validIsLoggedIn(Actions.push('profileCenter'));
  onFilterCarTypeChange = (value) => {
    const { changeFilter } = this.props;
    const linkTo = () => {
      const carType = value === 'all' ? '' : value;
      changeFilter('carType', carType);
      Actions.push('inventory');
    };
    window.validIsLoggedIn(linkTo);
  }

  loadImages = () => {
    const { loadExample } = this.props;
    loadExample();
  }

  render() {
    const {
      isInventoryLoading, isMemberLoading, isExampleLoading, example,
    } = this.props;
    const isLoading = isInventoryLoading || isMemberLoading || isExampleLoading;
    return (
      <Container>
        { isLoading && <Loader /> }
        { this.renderHeader() }
        <Button onPress={this.loadImages}>
          <Text>
            获取图片
          </Text>
        </Button>
        {
          example.uri && <Image source={{ uri: example.uri }} style={{ width: 50, height: 50 }} />
        }
        { !isLoading && this.renderContent() }
      </Container>
    );
  }
}

HomeScene.defaultProps = {
};

HomeScene.propTypes = {
  isInventoryLoading: PropTypes.bool.isRequired, // 加载库存车loading状态
  isMemberLoading: PropTypes.bool.isRequired, // 加载用户会员信息loading状态
  isLoggedIn: PropTypes.bool.isRequired, // 是否登录状态
  profile: PropTypes.object.isRequired, // 用户信息
  changeFilter: PropTypes.func.isRequired, // 改变价格，筛选车库存
  loadInventory: PropTypes.func.isRequired, // 加载车库存
  typeOfInventory: PropTypes.array.isRequired, // 车类型列表
  loadExample: PropTypes.func.isRequired,
  example: PropTypes.object.isRequired,
  isExampleLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = createPropsSelector({
  profile: selectProfile,
  isLoggedIn: selectIsLoggedIn,
  isInventoryLoading: selectIsInventoryLoading,
  isMemberLoading: selectLoading,
  typeOfInventory: selectInventoryByType,
  example: selectExample,
  isExampleLoading: selectIsExampleLoading,
});

const mapDispatchToProps = (dispatch) => ({
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
  changeFilter: (name, value) => dispatch(changeFilterAction(name, value)),
  loadExample: () => dispatch(loadExampleAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'homeScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  withConnect,
  ...withSagas,
  profileReducer,
  ...profileSagas,
  inventoryReducers,
  ...inventorySagas,
  memberReducer,
  ...memberSagas,
)(HomeScene);
