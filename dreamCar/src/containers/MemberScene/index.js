/**
 *
 * MemberScene Container
 *
 */

// /* global translate */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  Container,
  Content,
} from 'native-base';

import AppHeader from 'components/AppHeader';
import Loader from 'components/Loader';
import Mask from 'components/Mask';

import { selectProfile } from 'containers/ProfileScene/selectors';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import MemberCard from './components/MemberCard';

import reducer from './reducer';
import sagas from './sagas';
import { loadMembershipPriceAction } from './actions';
import { selectLoading } from './selectors';

import styles from './styles';

export class MemberScene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  // componentWillMount() {
  //   const { loadMembershipPrice } = this.props;
  //   loadMembershipPrice();
  // }

  // func
  // 打开权益弹窗
  openPrivilegeModal = () => this.setState({ modalVisible: true })
  // 关闭权益弹窗
  hidePrivilegeModal = () => this.setState({ modalVisible: false })
  // 获取会员级别
  getLevelNumber = (isMembership, level) => {
    if (!isMembership) return 0;

    const levelObj = {
      basic: 0,
      premium: 1,
      deluxe: 2,
    };
    return levelObj[level] || 0;
  }
  joinMember = () => {
    const { joinMember, profile } = this.props;
    const onSuccess = () => Actions.pop();
    joinMember(profile._id, onSuccess);
  }
  render() {
    const { modalVisible } = this.state;
    const { authUserMembership, isLoading } = this.props;
    const { isMembership, level } = authUserMembership;
    const levelNumber = this.getLevelNumber(isMembership, level);

    return (
      <Container>
        <AppHeader title="member" />

        <Content contentContainerStyle={styles.content}>
          <MemberCard
            onPress={this.joinMember}
            isMembership={isMembership}
            levelNumber={levelNumber}
            openPrivilegeModal={this.openPrivilegeModal}
            closeModal={this.hidePrivilegeModal}
            modalVisible={modalVisible}
          />
        </Content>
        { isLoading && <Loader />}
        { modalVisible && <Mask />}
      </Container>
    );
  }
}

MemberScene.defaultProps = {
  authUserMembership: {
    isMembership: false,
    level: '',
  },
};

MemberScene.propTypes = {
  isLoading: PropTypes.bool.isRequired, // loading状态
  authUserMembership: PropTypes.object, // 用户会员情况
  profile: PropTypes.object.isRequired, // 用户信息
  joinMember: PropTypes.func.isRequired, // 加入会员事件
};

const mapStateToProps = createPropsSelector({
  isLoading: selectLoading,
  profile: selectProfile,
});

const mapDispatchToProps = (dispatch) => ({
  joinMember: (id, onSuccess) => dispatch(loadMembershipPriceAction(id, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'memberScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
)(MemberScene);
