/**
 *
 * FavouriteCarScene Container
 *
 */

/*  global translate */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import { ScrollView, Animated } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  List,
  Tabs,
  Tab,
  CheckBox,
  Footer,
  FooterTab,
  View,
} from 'native-base';
import { remove } from 'lodash';

import AppHeader from 'components/AppHeader';
import SeparatorText from 'components/SeparatorText';
import EmptyList from 'components/EmptyList';

import { selectRootInventory } from 'containers/InventoryScene/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import FavouriteCarItem from './components/FavouriteCarItem';

import sagas from './sagas';
import reducer from './reducer';
import { updateFavouriteCarAction, updateFavouriteCarsAction } from './actions';

import styles from './styles';

export class FavouriteCarScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      listViewData: [], // 收藏列表
      favouriteCarId: [], // 收藏列表所有id
      carId: [], // 选中的车辆
      edit: false, // 编辑状态
      allChecked: false, // 是否全部选择
      disabledEdit: false, // 不可编辑状态
      translateX: new Animated.Value(0), // tab页x轴方向的平移
    };
  }
  componentDidMount() {
    const { inventories } = this.props;
    const ids = [];
    inventories.forEach((item) => {
      if (item.isFavorite) {
        ids.push(item._id);
      }
    });
    this.setState({
      listViewData: inventories.filter((item) => item.isFavorite),
      // eslint-disable-next-line array-callback-return
      favouriteCarId: ids,
    });
  }
  onEdit = () => {
    const { edit } = this.state;
    if (edit) {
      this.setState({
        carId: [],
        allChecked: false,
      });
    }
    this.setState({ edit: !edit });
  }
  changeTab = (value) => {
    const { translateX } = this.state;

    const tab = value.i;
    if (tab === 0) {
      Animated.timing(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      this.setState({
        // listViewData: inventories.filter((item) => item.isFavorite),
        // favouriteCarId: [],
        edit: false,
        carId: [],
        allChecked: false,
      });
    } else {
      Animated.timing(translateX, {
        toValue: styles.deviceWidth / 2,
        useNativeDriver: true,
      }).start();
      this.setState({
        // listViewData: inventories.filter((item) => item.isFavorite),
        // favouriteCarId: [],
        edit: false,
        carId: [],
        allChecked: false,
      });
    }
  }
  linkTo = (data) => {
    const { edit } = this.state;
    if (edit) {
      const { id } = data;
      this.changeCheckoutBox(id);
    } else {
      // const { loadCarInfo } = this.props;
      // loadCarInfo(data, 0);
      // Actions.inventoryCar({
      //   carInfo: data,
      // });
    }
  }
  changeCheckoutBox = (id) => {
    const { carId, favouriteCarId } = this.state;
    const checked = carId.includes(id);
    const carIdLength = carId.length;
    const favouriteCarIdLength = favouriteCarId.length;
    if (checked) {
      remove(carId, (n) => n === id);
      this.setState({ carId });
      if (carIdLength === favouriteCarIdLength) {
        this.setState({ allChecked: false });
      }
    } else {
      this.setState({ carId: [...carId, id] });
      if (carIdLength + 1 === favouriteCarIdLength) {
        this.setState({ allChecked: true });
      }
    }
  }
  allChecked = () => {
    const { allChecked, favouriteCarId } = this.state;
    if (allChecked) {
      this.setState({
        allChecked: false,
        carId: [],
      });
    } else {
      this.setState({
        allChecked: true,
        carId: [...favouriteCarId],
      });
    }
  }
  // 取消收藏
  deleteFavouriteCar = () => {
    const { carId, listViewData, favouriteCarId } = this.state;
    const { inventories, updateFavouriteCar, updateFavouriteCars } = this.props;
    remove(listViewData, (item) => carId.includes(item._id));
    remove(favouriteCarId, (id) => carId.includes(id));
    if (carId.length > 1) {
      updateFavouriteCars();
    } else {
      updateFavouriteCar(carId[0], inventories.find((item) => item._id === carId[0]).isFavorite);
    }
    this.onEdit();
  }
  renderHeader = () => {
    const { edit, disabledEdit } = this.state;
    const rightText = edit ? 'done' : 'edit';
    const rightButton = (
      <Button
        style={styles.rightButton}
        onPress={this.onEdit}
        disabled={disabledEdit}
      >
        <Text style={styles.rightText}>{translate(rightText)}</Text>
      </Button>
    );
    return (
      <AppHeader
        title="favourite"
        hasRight
        rightButton={rightButton}
      />
    );
  }
  renderFooter = () => {
    const { allChecked, carId } = this.state;
    const { isIphoneX } = styles;
    const carIdLength = carId.length;
    const footerButtonStyle = carIdLength === 0
      ? [styles.footerDisableButtonStyle]
      : [styles.footerButtonStyle];
    if (isIphoneX) footerButtonStyle.push(styles.iPhoneXFooterButton);
    const unAllCheckBoxStyle = allChecked ? {} : styles.unAllCheckBox;
    return (
      <Footer style={styles.footerShadow}>
        <FooterTab style={[styles.allChecked, styles.buttonFooter]}>
          <CheckBox
            checked={allChecked}
            onPress={this.allChecked}
            style={[styles.allCheckedBox, unAllCheckBoxStyle]}
          />
          <Text style={styles.selectAll}>{translate('selectAll')}</Text>
        </FooterTab>
        <FooterTab style={styles.buttonFooter}>
          <Button
            onPress={this.deleteFavouriteCar}
            disabled={carIdLength === 0}
            style={footerButtonStyle}
          >
            <Text style={styles.footerButtonText}>{translate('unFavourite')}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
  renderTabs = () => {
    const { translateX } = this.state;
    const available = translate('available');
    const notAvailable = translate('notAvailable');
    return (
      <View>
        <Tabs
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          style={styles.tabsStyle}
          onChangeTab={(value) => this.changeTab(value)}
          initialPage={0}
        >
          <Tab
            tabStyle={styles.tab}
            activeTabStyle={styles.tab}
            heading={available}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          />
          <Tab
            tabStyle={styles.tab}
            activeTabStyle={styles.tab}
            heading={notAvailable}
            textStyle={styles.tabTextStyle}
            activeTextStyle={styles.tabActiveTextStyle}
          />
        </Tabs>
        <Animated.View
          style={[styles.tabBarStyle, {
            transform: [{ translateX }],
          }]}
        >
        </Animated.View>
      </View>
    );
  }
  renderContent = () => {
    const { listViewData } = this.state;
    if (listViewData.length > 0) {
      return (
        <ScrollView style={styles.scrollView}>
          <List
            style={styles.list}
          >
            {
              listViewData.map((item) => this.renderRow(item))
            }
          </List>
          <SeparatorText
            label="noMoreCar"
            showSeparate
            separatorStyle={styles.separatorStyle}
          />
        </ScrollView>
      );
    }
    return (
      <EmptyList
        type="car"
        label="noFavourite"
        imageViewStyle={styles.imageViewStyle}
        activeOpacity={0.5}
        onPressFunc={this.linkToDriver}
      />
    );
  }
  renderRow = (data) => {
    const { carId, edit } = this.state;
    return (
      <FavouriteCarItem
        key={data._id}
        data={data}
        carId={carId}
        edit={edit}
        linkTo={this.linkTo}
        changeCheckoutBox={this.changeCheckoutBox}
      />
    );
  }
  render() {
    const { edit, listViewData } = this.state;
    return (
      <Container>
        { this.renderHeader() }
        <Content
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
          scrollEnabled={false}
        >
          { this.renderTabs() }
          { this.renderContent() }
        </Content>
        { (edit && listViewData.length > 0) && this.renderFooter()}
      </Container>
    );
  }
}

FavouriteCarScene.defaultProps = {
};

FavouriteCarScene.propTypes = {
  updateFavouriteCar: PropTypes.func.isRequired, // 更新车辆收藏状态
  updateFavouriteCars: PropTypes.func.isRequired, // 取消所有车辆收藏状态
  inventories: PropTypes.array.isRequired, // 库存列表
};

const mapStateToProps = createPropsSelector({
  inventories: selectRootInventory,
});

const mapDispatchToProps = (dispatch) => ({
  updateFavouriteCar: (id, favorite) => dispatch(updateFavouriteCarAction(id, favorite)),
  updateFavouriteCars: () => dispatch(updateFavouriteCarsAction()),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'favouriteCarScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
)(FavouriteCarScene);
