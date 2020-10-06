import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './store';
import settings from './appSettings';
import HttpsClient from './helpers/HttpsClient';
import { AppLoading } from 'expo';

const themeColor = settings.themeColor
const statusBarStyle = settings.statusBarStyle
const url = settings.url

const appLoad=async()=>{
  await Font.loadAsync({'OpenSans-Regular':require('./assets/fonts/OpenSans-Regular.ttf')});
}
export default function App() {
  return (
    <Provider store = {store}>
      <View style={styles.container}>
        <StatusBar style={statusBarStyle} backgroundColor={themeColor} />
        {appLoad}
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
