/**
 * Created by shiqian on 2017/3/28.
 */
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
  TextInput,
  View,
  WebView,
  TouchableOpacity
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Header, Button, Loading, ItemCheckbox } from '../components'
import {Utils, Device, Assets,API} from "../base";
import styles from '../common/styles';
import Icon from 'react-native-vector-icons/Ionicons'
export default class Home extends Component {
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title="首页" leftPress={()=>Actions.pop()} leftIcon={{name: "ios-arrow-back" ,size:Device.iOS?23:28}}/>
        <WebView

          style={{height: 600}}
          source={{uri: this.props.url}}
        />
     </View>
    );
  }
}

