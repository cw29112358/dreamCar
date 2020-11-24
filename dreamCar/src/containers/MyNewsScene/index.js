/**
 *
 * MyNewsScene Container
 *
 */
/* global translate */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
// import { Actions } from 'react-native-router-flux';
// import moment from 'moment';
import { TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import {
  Container,
  Text,
  View,
} from 'native-base';

import AppHeader from 'components/AppHeader';
import EmptyList from 'components/EmptyList';
import Loader from 'components/Loader';
import CarImage from 'components/CarImage';
import SeparatorText from 'components/SeparatorText';
import Mask from 'components/Mask';

import styles from './styles';

export class MyNewsScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true,
      isShowNotice: false,
      // notice: null,
    };
    this.scrollTask = {};
    this.layoutItem = {};
  }

  componentWillUnmount() {
    this.onClearScrollTask();
  }

  getNotifications = () => null
  // scroll to notification
  onClearScrollTask = () => {
    this.scrollTask.cycleTimes = 0;
    clearInterval(this.scrollTask.timer);
  }
  // onScrollTask = (id) => {
  //   if (!id || this.scrollTask.beginId === id) return;
  //
  //   this.onClearScrollTask();
  //   this.scrollTask.beginId = id;
  //   this.scrollTask.timer = setInterval(() => {
  //     this.scrollTask.cycleTimes += 1;
  //     if (this.scrollTask.endId === this.scrollTask.beginId // 任务结束
  //       || this.scrollTask.cycleTimes > 20 // 任务时间超过10s
  //     ) {
  //       this.onClearScrollTask();
  //     }
  //     this.onScrollToNotification(id);
  //   }, 500);
  // }
  // onScrollToNotification = (id) => {
  //   const index = this.getNotificationIndex(id);
  //   const layout = this.layoutItem[index];
  //   if (!layout) return;
  //
  //   const { y } = layout;
  //   if (!this.scrollView) return;
  //
  //   this.scrollTask.endId = id;
  //   this.scrollView.scrollTo({ x: 0, y, animated: false });
  // }
  onLayoutItem = (e, index) => {
    this.layoutItem[index] = e.nativeEvent.layout;
  }
  // getNotificationIndex = (id) => {
  //   const { notifications } = this.props;
  //   const index = notifications.findIndex((item) => (
  //     this.getItemId(item) === id
  //   ));
  //   return index;
  // }

  onTouchMyNewsItem = () => null

  closeNotice = () => {
    this.setState({ isShowNotice: false });
  }

  renderTag = (value, label) => (
    <View style={styles.tag}>
      <Text style={styles.tagText}>
        {` ${translate(label)}`}
        {translate(value, 'number', styles.priceStyle)}
        {translate('yuan')}
      </Text>
    </View>
  )
  renderTime = (createdTime) => (<Text style={styles.time}>{createdTime}</Text>)
  renderImage = (firstImage) => {
    const imageStyles = styles.notMask;
    return (
      firstImage && (
        <CarImage url={firstImage} style={imageStyles} />
      )
    );
  }
  renderItemTitle = (title, createdTime) => (
    <View style={styles.titleLine}>
      {title && <Text style={styles.padTitle} numberOfLines={1}>{title}</Text>}
      { this.renderTime(createdTime) }
    </View>
  )
  renderContentLeft = (item, firstImage) => {
    const { type, carId } = item;
    let numberOfLines = 3;
    if (type === 'car' || carId)numberOfLines = 2;

    const messageStyles = [styles.padNote];
    if (!firstImage) messageStyles.push(styles.noImage);
    if (type === 'car' || carId) messageStyles.push(styles.carText);
    return (
      <View style={styles.contentLeft}>
        {item.message && <Text style={messageStyles} numberOfLines={numberOfLines}>{item.message}</Text>}
        {(item.carId || item.type === 'car') && (
          <View style={styles.tagLine}>
            {this.renderTag(item.metadata.price, 'startPay')}
          </View>
        )}
      </View>
    );
  }

  renderItemContent = (item) => {
    const {
      images = [], metadata = { images: [] },
    } = item;
    const firstImage = (images[0] && images[0].url) || metadata.images[0];

    return (
      <View style={styles.content}>
        { this.renderImage(firstImage) }
        { this.renderContentLeft(item, firstImage) }
      </View>
    );
  }

  renderList(item, index) {
    const { title, createdTime } = item;
    const itemStyle = [styles.padItem];
    return (
      <View style={itemStyle} onLayout={(e) => { this.onLayoutItem(e, index); }}>
        {this.renderItemTitle(title, createdTime)}
        {this.renderItemContent(item)}
      </View>
    );
  }

  renderNotifications(notifications, isLoading) {
    if (!notifications.length && !isLoading) return <EmptyList label="noMessage" />;
    return notifications
      .map((item, index) => {
        const activeOpacity = item.carId ? 0.5 : 1;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={activeOpacity}
            onPress={() => this.onTouchMyNewsItem(item)}
            style={styles.touchableOpacity}
          >
            {this.renderList(item, index)}
          </TouchableOpacity>
        );
      });
  }
  renderContent = () => {
    const { isLoading } = this.props;
    const { isFirstLoading } = this.state;
    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={isLoading && !isFirstLoading}
            onRefresh={this.getNotifications}
            title={translate('loading')}
          />
        )}
        // ref={(scrollView) => { this.scrollView = scrollView; }}
      >
        { this.renderNotifications(
          [
            {
              id: 1,
              title: '奔驰 G500',
              createdTime: moment().format('YYYY-MM-DD HH:mm'),
              images: [
                {
                  url: '',
                },
              ],
              type: 'car',
              carId: '7878787878',
              message: '奔驰大G，的挥洒的感觉阿说古道今个撒娇蛋糕大噶好结果的挥洒的感觉阿说古道今个撒娇蛋糕大噶好结果',
              metadata: {
                price: 10000,
                images: [
                  {
                    url: '',
                  },
                ],
              },
            },
          ],
          isLoading
        ) }
        { !isLoading && <SeparatorText label="noNews" showSeparate="true" />}
      </ScrollView>
    );
  }
  render() {
    const { isLoading } = this.props;
    const { isFirstLoading, isShowNotice } = this.state;
    return (
      <Container>
        <AppHeader
          title="myNews"
        />
        { (isLoading && isFirstLoading) && <Loader />}
        { this.renderContent()}
        { isShowNotice && <Mask onPress={() => this.closeNotice()} />}
      </Container>
    );
  }
}

MyNewsScene.defaultProps = {
  isLoading: false,
};

MyNewsScene.propTypes = {
  isLoading: PropTypes.bool,
};

// const mapStateToProps = createPropsSelector({
// });
//
// const mapDispatchToProps = (dispatch) => ({
// });
//
// const withConnect = connect(mapStateToProps, mapDispatchToProps);
//
// export const withReducer = injectReducer({ key: 'myNewsScene', reducer });
//
// export const withSagas = sagas.map((saga) => injectSaga(saga));
//
// export default compose(
//   withReducer,
//   ...withSagas,
//   carReducer,
//   withConnect,
// )(MyNewsScene);
export default MyNewsScene;
