/**
 *
 * InventoryScene Container
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
} from 'native-base';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { loadCarDetailAction } from 'containers/InventoryCarScene/actions';
import {
  withReducer as inventoryCarReducer,
  withSagas as inventoryCarSagas,
} from 'containers/InventoryCarScene';

import AppHeader from 'components/AppHeader';
import ProductList from './components/ProductList';

import {
  selectOrderedSearchedFilterInventory,
  selectIsLoading,
} from './selectors';
import {
  loadInventoryAction,
} from './actions';
import reducer from './reducer';
import sagas from './sagas';
import styles from './styles';

export class InventoryScene extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      showSearchHeader: true,
      isFirstLoading: true,
    };
  }
  // list press event
  onPressList = (item) => {
    const { loadCarDetailCar } = this.props;
    Actions.inventoryCar({ carInfo: item });
    loadCarDetailCar(item._id);
  }
  // list pull refresh
  onRefresh = () => {
    const { loadInventory } = this.props;
    loadInventory();
    this.setState({ isFirstLoading: false });
  }

  // render content
  renderProductList = () => {
    const { inventories, isLoading } = this.props;
    const { showSearchHeader, isFirstLoading } = this.state;
    return (
      <ProductList
        showSearchHeader={showSearchHeader}
        list={inventories}
        refreshing={isLoading}
        isFirstLoading={isFirstLoading}
        onRefresh={this.onRefresh}
        onPress={this.onPressList}
      />
    );
  }

  renderHeader = () => <AppHeader title="carList" />

  render() {
    return (
      <Container style={styles.container}>
        { this.renderHeader() }
        { this.renderProductList() }
      </Container>
    );
  }
}

InventoryScene.defaultProps = {
};

InventoryScene.propTypes = {
  isLoading: PropTypes.bool.isRequired, // 获取车库存loading状态
  inventories: PropTypes.array.isRequired, // 车库存
  loadInventory: PropTypes.func.isRequired, // 获取车库存
  loadCarDetailCar: PropTypes.func.isRequired, // 加载当前车辆的详情，
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoading,
  inventories: selectOrderedSearchedFilterInventory,
});

const mapDispatchToProps = (dispatch) => ({
  loadInventory: (params) => dispatch(loadInventoryAction(params)),
  loadCarDetailCar: (id) => dispatch(loadCarDetailAction(id)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'inventoryScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withReducer,
  ...withSagas,
  inventoryCarReducer,
  ...inventoryCarSagas,
  withConnect,
)(InventoryScene);
