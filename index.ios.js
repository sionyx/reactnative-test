/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import NewsApp from './NewsApp';
import configureStore from './store/configureStore'

const store = configureStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NewsApp />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('App', () => App);
