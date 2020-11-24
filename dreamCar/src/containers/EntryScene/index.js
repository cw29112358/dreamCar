/**
 *
 * EntryScene Container
 *
 */
/* global translate */

import React from 'react';
import { Actions } from 'react-native-router-flux';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'native-base';
import {
  ImageBackground,
  Image,
  StatusBar,
} from 'react-native';

import bg from 'assets/bg.png';
import logoTitle from 'assets/logoTitle.png';

import styles from './styles';

// eslint-disable-next-line react/prefer-stateless-function
export class EntryScene extends React.Component {
  render() {
    return (
      <ImageBackground source={bg} style={styles.backgroundImage}>
        <StatusBar barStyle="light-content" />
        <View style={styles.contentView}>
          <Button
            style={styles.lookButton}
            onPress={() => Actions.push('home')}
          >
            <Text style={styles.lookText}>{translate('takeLook')}</Text>
          </Button>

          <Image source={logoTitle} style={styles.logoImage} />
          <View style={styles.buttonGroup}>
            <Button style={[styles.button, styles.logInButton]} onPress={() => Actions.push('login')}>
              <Text style={[styles.buttonText, styles.logInText]}>{translate('login')}</Text>
            </Button>
            <Button
              style={[styles.button, styles.signButton]}
              onPress={() => Actions.push('signUp')}
            >
              <Text style={styles.signUpText}>{translate('signUp')}</Text>
            </Button>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

EntryScene.defaultProps = {
};

EntryScene.propTypes = {
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(EntryScene);
