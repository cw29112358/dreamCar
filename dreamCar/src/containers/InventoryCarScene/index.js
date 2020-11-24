/**
 *
 * InventoryCarScene Container
 *
 */
/* global window */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { Animated, ScrollView } from 'react-native';
import {
  Container,
  View,
  Button,
  Icon, Text,
} from 'native-base';

import {
  withReducer as favouriteCarReducers,
  withSagas as favouriteCarSagas,
} from 'containers/FavouriteCarScene';
import { updateFavouriteCarAction } from 'containers/FavouriteCarScene/actions';

import { selectMember } from 'containers/MemberScene/selectors';

import Loader from 'components/Loader';
import BookingFooter from 'components/BookingFooter';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import ConfigurationModal from './components/ConfigurationModal';
import CarouselImages from './components/CarouselImages';
import ConfigurationInfo from './components/ConfigurationInfo';
import CarFeatures from './components/CarFeatures';

import { selectDetailCar, selectIsDetailLoading } from './selectors';

import reducer from './reducer';
import sagas from './sagas';

import styles from './styles';

export class InventoryCarScene extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerOpacity: new Animated.Value(0),
    };
  }

  onScroll = (event) => {
    const { headerOpacity } = this.state;
    const scrollY = event.nativeEvent.contentOffset.y;
    Animated.timing(headerOpacity, {
      toValue: scrollY,
      duration: 50,
    }).start();
  }
  getHeaderStyles() {
    const {
      headerOpacity,
    } = this.state;
    const backgroundColor = headerOpacity.interpolate({
      inputRange: [0, 100],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    });
    const shadowOpacity = headerOpacity.interpolate({
      inputRange: [0, 100, 101],
      outputRange: [0, 1, 1],
    });
    const elevation = headerOpacity.interpolate({
      inputRange: [0, 100, 10000],
      outputRange: [0, 3, 3],
    });
    return {
      backgroundColor,
      shadowOpacity,
      elevation,
    };
  }

  openFeaturesModal = () => {
    Actions.modal({
      component: ConfigurationModal,
      headerStyle: { marginTop: 18 },
      scrollEnabled: true,
    });
  }

  openCalendarModal = () => {
    window.validIsLoggedIn(() => {
      this.openCalendarModalAfterLoggedIn();
    });
  }
  openCalendarModalAfterLoggedIn = () => {
    const { authUserMembership, detailCar } = this.props;
    const { isMembership, status } = authUserMembership;
    if (isMembership && status === 'active') {
      Actions.push('bookingDetails', {
        pickDate: moment(),
        carInfo: detailCar,
      });
    } else {
      Actions.push('member');
    }
  }

  onPressBack = () => Actions.pop();
  onPressHeart = () => {
    const { updateFavouriteCar, detailCar } = this.props;
    updateFavouriteCar(detailCar._id, detailCar.isFavorite);
  }

  // render
  renderHeader = () => {
    const { detailCar } = this.props;
    const headerStyle = [
      styles.header,
      this.getHeaderStyles(),
      styles.headerShadow,
    ];
    const heartIconStyles = [styles.heartIcon];
    if (detailCar.isFavorite) {
      heartIconStyles.push(styles.activeHeart);
    }
    return (
      <Animated.View style={headerStyle}>
        <Button
          transparent
          style={styles.button}
          onPress={this.onPressBack}
        >
          <Icon active name="ios-arrow-back" style={styles.backIcon} />
        </Button>
        <Text style={styles.headerText}>{detailCar.make} {detailCar.model}</Text>
        <Button
          transparent
          style={styles.buttonHeart}
          onPress={this.onPressHeart}
        >
          <Icon active name="heart" type="FontAwesome" style={heartIconStyles} />
        </Button>
      </Animated.View>
    );
  }
  renderCarousel = (detailCar) => (
    <View>
      <CarouselImages carData={detailCar} />
      <ConfigurationInfo carInfo={detailCar} />
    </View>
  );
  renderCarFeatures = (detailCar) => (
    <CarFeatures
      carInfo={detailCar}
      showDetails={this.openFeaturesModal}
    />
  );
  // renderInstallmentPayment = () => <InstallmentPayment />
  // renderLocation = (currentArea) => <Location currentArea={currentArea} />;

  renderChildrenContent = () => {
    const { detailCar } = this.props;
    return (
      <View>
        {this.renderCarousel(detailCar)}
        <View style={styles.separator} />

        {/* { this.renderInstallmentPayment() } */}
        {/* <View style={styles.separator} /> */}

        {this.renderCarFeatures(detailCar)}
        <View style={styles.separator} />

        {/* <View style={styles.separator} /> */}
        {/* {this.renderLocation(currentInfo.Area)} */}

      </View>
    );
  }
  renderChildren = (isLoading) => (
    <ScrollView
      ref={(scrollView) => { this.scrollView = scrollView; }}
      contentContainerStyle={styles.contentContainer}
      style={styles.content}
      scrollEventThrottle={1}
      onScroll={this.onScroll}
    >
      { !isLoading && this.renderChildrenContent() }
    </ScrollView>
  )

  renderFooter = () => {
    const { detailCar } = this.props;
    return (
      <BookingFooter
        bookingPrice={detailCar.price}
        buttonPress={this.openCalendarModal}
        buttonLabel="booking"
      />
    );
  }

  render() {
    const { isDetailLoading } = this.props;
    const isLoading = isDetailLoading;
    return (
      <Container>
        { isLoading && <Loader /> }
        {this.renderHeader()}

        {this.renderChildren(isLoading)}

        {this.renderFooter()}
      </Container>
    );
  }
}

InventoryCarScene.defaultProps = {
  isDetailLoading: false,
  authUserMembership: {
    isMembership: false,
    status: 'active',
  },
};

InventoryCarScene.propTypes = {
  // isUpdateLoading: PropTypes.bool.isRequired, // 更新当前车辆收藏loading状态
  isDetailLoading: PropTypes.bool, // 加载当前车辆详情loading状态
  authUserMembership: PropTypes.object, // 用户会员信息
  detailCar: PropTypes.object.isRequired, // 当前车辆详情
  updateFavouriteCar: PropTypes.func.isRequired, // 更新当前车辆收藏与否
};

const mapStateToProps = createPropsSelector({
  isDetailLoading: selectIsDetailLoading,
  authUserMembership: selectMember,
  // isUpdateLoading: selectIsUpdateLoading,
  detailCar: selectDetailCar,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavouriteCar: (carId, favorite) => dispatch(updateFavouriteCarAction(carId, favorite)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'inventoryCarScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
  favouriteCarReducers,
  ...favouriteCarSagas,
)(InventoryCarScene);
