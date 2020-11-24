/**
 *
 * LoginScene Container
 *
 */
/* global toast */

import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createPropsSelector } from 'reselect-immutable-helpers';
import {
  ImageBackground, View,
} from 'react-native';

import Button from 'components/Button';
import TranslateText from 'components/TranslateText';
import FullScreenScene from 'components/FullScreenScene';

import LoginForm from 'forms/LoginForm';

import formValidators from 'utils/formValidators';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import auth from 'utils/auth';
import { setIsOnline } from 'utils/helpers';

import {
  loginAction,
} from './actions';
import {
  selectIsLoginLoading,
} from './selectors';

import reducer from './reducer';
import sagas from './sagas';

import styles from './styles';

const {
  isRequired,
  isPhone,
  isPassword,
  isPasswordLongEnough,
  isPasswordShortEnough,
} = formValidators;

class LoginScene extends React.Component {
  // render
  renderForgetPasswordText = () => (
    <View style={styles.passwordView}>
      <Button
        textLabel="forgetPassword"
        style={styles.button}
        textStyle={styles.forgetPasswordTextStyle}
        onPress={() => Actions.push('forgetPassword')}
      />
    </View>
  );
  renderBottomChildren = () => (
    <View style={styles.footer}>
      <TranslateText label="noAccount" style={styles.noAccountText} />
      <Button style={styles.signUpButton} textStyle={styles.signUpText} textLabel="signUp" onPress={() => Actions.push('signUp')} />
    </View>
  )

  // func
  // eslint-disable-next-line consistent-return
  onSubmit = (phoneNumber, password) => {
    const { onLogin } = this.props;
    if (!isRequired(phoneNumber)) {
      return toast('phoneNumberIsRequired');
    }
    if (!isPhone(phoneNumber)) {
      return toast('notPhoneNumber');
    }
    if (!isRequired(password)) {
      return toast('passwordIsRequired');
    }
    if (!isPassword(password)) {
      return toast('notPassword');
    }
    if (!isPasswordLongEnough(password)) {
      return toast('notPasswordLongEnough');
    }
    if (!isPasswordShortEnough(password)) {
      return toast('notPasswordShortEnough');
    }
    const onSuccess = (token) => {
      setIsOnline(); // 设置isOnLine 为true
      if (token) auth.setToken(token); // 存储token 到storage 中
      auth.setSceneKey('home'); // 存储sceneKey 到storage 中
      Actions.reset('home');
    };
    onLogin(phoneNumber, password, onSuccess);
  };

  render() {
    const { isLoading } = this.props;
    return (
      <ImageBackground {...styles.bgImageProps}>
        <FullScreenScene
          headerStyle={styles.headerStyle}
          headerTitle="login"
          headerProps={{
            hasLeft: false,
            hasShadow: false,
            titleStyle: styles.titleStyle,
            headerSettings: {
              transparent: false,
            },
          }}
          isLoading={isLoading}
          scrollEnabled={false}
          containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
        >
          <LoginForm
            hasTakeLook
            hasPassword
            middleChildren={this.renderForgetPasswordText()}
            bottomChildren={this.renderBottomChildren()}
            onSubmit={this.onSubmit}
          />
        </FullScreenScene>
      </ImageBackground>
    );
  }
}

LoginScene.defaultProps = {
};

LoginScene.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired, // 登录事件
};

const mapStateToProps = createPropsSelector({
  isLoading: selectIsLoginLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (phoneNumber, password, onSuccess) => dispatch(loginAction(phoneNumber, password, onSuccess)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export const withReducer = injectReducer({ key: 'loginScene', reducer });

export const withSagas = sagas.map((saga) => injectSaga(saga));

export default compose(
  withConnect,
  withReducer,
  ...withSagas,
)(LoginScene);
