/**
*
* ProductList Stateless Component
*
*/

/* global translate */

import React from 'react';
import PropTypes from 'prop-types';
import {
  RefreshControl,
} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';

import { nullFunction } from 'utils/helpers';

import EmptyList from 'components/EmptyList';
import SeparatorText from 'components/SeparatorText';

import ProductListItem from '../ProductListItem';
import styles from './styles';

const {
  isPad,
  deviceWidth,
} = styles;
const ViewTypes = {
  OTHER: 1,
};

const itemHeight = isPad ? 229 : 166;

export class ProductList extends React.Component {
  dataProvider = new DataProvider((r1, r2) => r1 !== r2);
  layoutProvider = new LayoutProvider(
    () => ViewTypes.OTHER,
    (type, dimOriginal) => {
      const dim = dimOriginal;
      switch (type) {
        case ViewTypes.OTHER:
          dim.width = deviceWidth - 8;
          dim.height = itemHeight;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    }
  );
  onEndReached = () => {
    this.endReach = true;
  }

  renderEmptyList = () => <EmptyList type="car" label="noCar" imageViewStyle={styles.emptyList} />;
  renderListItem = (type, item) => {
    const { onPress } = this.props;
    return (
      <ProductListItem
        item={item}
        onPress={onPress}
      />
    );
  }
  renderFooter(length, endReach) {
    if (!length) return this.renderEmptyList();

    const label = endReach ? 'noMoreCar' : 'loadingCar';
    return <SeparatorText label={label} showSeparate={endReach} />;
  }

  render() {
    const {
      refreshing, list, isFirstLoading, onRefresh,
    } = this.props;

    const listLength = list.length;
    return (
      <RecyclerListView
        renderAheadOffset={itemHeight * 15}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing && !isFirstLoading}
            onRefresh={onRefresh}
            title={translate('loading')}
          />
        )}
        layoutProvider={this.layoutProvider}
        dataProvider={this.dataProvider.cloneWithRows(list)}
        rowRenderer={this.renderListItem}
        renderFooter={() => this.renderFooter(listLength, this.endReach)}
        scrollEnabled={listLength > 0}
        onEndReachedThreshold={0.5}
        onEndReached={this.onEndReached}
      />
    );
  }
}

ProductList.defaultProps = {
  list: [],
  isFirstLoading: true,
  onRefresh: nullFunction,
  onPress: nullFunction,
  refreshing: false,
};

ProductList.propTypes = {
  list: PropTypes.array,
  isFirstLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onPress: PropTypes.func,
  refreshing: PropTypes.bool,
};

export default ProductList;
