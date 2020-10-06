import React from 'react';
import { Platform,StyleSheet, View,Text } from 'react-native';
import { AppLoading } from 'expo';
import   * as Font  from 'expo-font';
import * as Icon   from '@expo/vector-icons';
import {  Asset } from 'expo-asset';
import AppNavigator from './navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import store from './store';
import settings from './appSettings';
import HttpsClient from './helpers/HttpsClient';

const themeColor = settings.themeColor
const statusBarStyle = settings.statusBarStyle
const url = settings.url
const fontFamily=settings.fontFamily
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store = {store}>
              <View style={styles.container}>
                <StatusBar style={statusBarStyle} backgroundColor={themeColor} />

                <AppNavigator />
              </View>
            </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({'OpenSans-Regular':fontFamily}),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
