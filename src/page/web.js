/**
 * Created by shiqian on 2017/3/14.
 */
/**
 * Created by shiqian on 2017/3/13.
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
  TouchableOpacity
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Header, Button, Loading, ItemCheckbox } from '../components'
import {Utils, Device, Assets,API} from "../base";
import styles from '../common/styles';
import Icon from 'react-native-vector-icons/Ionicons'
export default class Web extends Component {
  constructor(props) {
    super(props)
    this.state = {
      company:'',
      username: '',
      agent: '',
      iPhone:'',
      url:'',
      dataLoged: false,
    }
  }

  async componentDidMount() {
  }
  _upDateVersionTip(res){
    let updateContent= '';
    let currentVersion = Device.version;
    let releaseVersion = Device.iOS ? res.ios.version : res.android.version;
    if(currentVersion < releaseVersion){
      this.setState({isUpdateVersion:true});
      let content = Device.iOS ? res.ios.content : res.android.content;
      lodash.each(content,function(data,i){
        if(content.length-1 == i){
          return updateContent =updateContent+ data
        }else{
          //对数据进行换行处理
          return updateContent =updateContent+ data+'\n'
        }
      });
      Utils.showMsg('有新的版本',updateContent,'updateVersion','马上更新')
    }
  }
  _loginSuccess(index) {
    if(Device.iOS){
      this.refs.username.blur()
      this.refs.password.blur()
    }
    Actions.tabbar({type:'replace'})
  }
  _submit() {
    // Actions.web();
    let me = {
      login: this.state.username,
      pwd: this.state.password,
    }
    if(me.login.length >= 5 && me.pwd.length >= 5){
      // this.setState({loading: true})
      Utils.fetch(Utils.api.login, 'post', me).then((res) => {
         console.log(res)
      })
    }
  }
  _onPassSafe() {
    this.setState({passSafe: !this.state.passSafe})
    this.setState({ password : this.state.password + ' ' });
    setTimeout(() => {this.setState({ password : this.state.password.substring(0, this.state.password.length - 1)})}, 0)
  }
  render() {
    return (
      <View style={styles.container}>
        <Header leftPress={()=>Actions.pop()} leftIcon={{name:Device.iOS ? "ios-arrow-back" : "md-arrow-back",size: 23}} title="基本信息"  />
        <View style={styles.viewContainer}>
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-podium-outline' size={20} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="company"  style={styles.inputs}   onChangeText={(company) =>{this.setState({company:company})}}   placeholder="请输入平台名称" autoCorrect={false} autoCapitalize="none" returnKeyType='next' keyboardType="default"  underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-person-add-outline' size={18} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="agent"  style={styles.inputs}  onChangeText={(agent) =>{this.setState({agent:agent})}}  placeholder="请输入代理级别" returnKeyType='done' underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-globe-outline' size={18} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="URL"  style={styles.inputs} onChangeText={(URL) =>{this.setState({URL:URL})}} placeholder="请输入URL" returnKeyType='done' underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-person-outline' size={18} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="userName"  style={styles.inputs} onChangeText={(userName) =>{this.setState({userName:userName})}}  placeholder="请输入申请人" secureTextEntry={this.state.passSafe} returnKeyType='done' underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-phone-portrait-outline' size={18} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="iPhone"  style={styles.inputs}  placeholder="请输入联系方式" onChangeText={(iPhone) =>{this.setState({iPhone:iPhone})}} returnKeyType='done' underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={[styles.btnGroup,{marginTop:40}]}>
                <Button value="提 交" pattern={{outLine:"fullButton",text:"fullText"}} onPress={() => this._submit()} />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const localStyle = StyleSheet.create({
  // 忘记密码和记住密码
  operateBar: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  forgetText: {
    color: '#888',
    fontSize: 15
  }
})
