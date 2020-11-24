/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';

import AppRouter from './containers/AppRouter';
import RNToast from './components/RNToast';

import configureStore from './store';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}
const store = configureStore();

const App = () => (
  <Provider store={store}>
    <Root>
      <AppRouter />
      <RNToast ref={(c) => { if (c) RNToast.toastInstance = c; }} />
    </Root>
  </Provider>
);

export default App;
