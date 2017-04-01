/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Login from './page/login';
import Web from './page/web';
import Home from './page/home';
import Storage from 'react-native-storage'
let storage = new Storage({
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null
})
global.storage = storage
export default class Entry extends Component {
  render() {
    return (
      <Router>
        <Scene key="root"  hideNavBar hideTabBar>
          <Scene key="home" component={Home}/>
          <Scene initial="true" key="login" component={Login}/>
          <Scene key="web" component={Web}/>
        </Scene>
      </Router>
    );
  }
}

