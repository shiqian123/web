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
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      logined: true,
      loading: true,
      passSafe: true,
      isUpdateVersion:false,
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

  _getUser() {
    // 重置密码后，默认显示重置时的用户名
    if (this.props.account) {
      this.setState({username: this.props.account, loading: false})
      return ;
    }

    storage.load({
      key: "User"
    }).then(res => {
      if(res.loginname && res.password && res.token && res.isLogin){
        this._loginSuccess(res.homeIndex)
      }else {
        this._checkSys();
      }
      //如果点击退出  并且勾选了记住密码  读取密码
    }).catch(err => {
      this._checkSys();
    })
  }
  _checkSys(){
    storage.load({
      key: 'System'
    }).then(res => {
      this.setState({
        loading: false,
        username: res.loginname,
        password: res.remember && res.password ? res.password : '',
        remember: res.remember,
        dataLoged: true
      })

    }).catch(err => {
      this.setState({loading: false, username: '',dataLoged: true})
    })
  }

  _onLogin() {
     Actions.home({url:'https://www.baidu.com'})
    let me = {
      login: this.state.username,
      pwd: this.state.password,
      version: Device.version
    }

      // this.setState({loading: true})
      Utils.fetch(Utils.api.login, 'post', me).then((res) => {
        if(res) {
          console.log(res)
        }

      })
  }
  _goWeb(){
     Actions.web()
  }
  _onPassSafe() {
    this.setState({passSafe: !this.state.passSafe})
    this.setState({ password : this.state.password + ' ' });
    setTimeout(() => {this.setState({ password : this.state.password.substring(0, this.state.password.length - 1)})}, 0)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Header  title="查找网址"  />
        <View style={styles.viewContainer}>
          <View style={styles.loginContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-globe-outline' size={20} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="username"  style={styles.inputs} defaultValue={this.state.username} onChangeText={(username) => this.setState({username: username, usernameShow: username?true:false})} placeholder="请输入平台名称" autoCorrect={false} autoCapitalize="none" returnKeyType='next' keyboardType="default"  underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={styles.iconContainer}>
                <View style={styles.inputLeftIcon}><Icon name='ios-podium-outline' size={18} color="#BBB" onPress={() => this._onPassSafe()}/></View>
                <TextInput ref="username"
                           onFocus={()=> this.state.password && this.setState({passwordShow: true})}
                           onBlur={()=>this.setState({passwordShow: false})}  style={styles.inputs}
                           onChangeText={(password) => this.setState({password: password,passwordShow:password?true:false})}
                           placeholder="请输入公司名称" defaultValue={this.state.password} secureTextEntry={this.state.passSafe}
                           returnKeyType='done' underlineColorAndroid="transparent"/>
              </View>
              <View style={styles.line}></View>
              <View style={[styles.btnGroup,{marginTop:40}]}>
                <Button value="确  定" pattern={{outLine:"fullButton",text:"fullText"}} onPress={() => this._onLogin()} />
              </View>
            </View>
          </View>
          <View >
            <TouchableOpacity style={[styles.buttonshadow]} onPress={() => this._goWeb()}>
              <Text style={{color:'#387ff5',fontSize:Utils.normalize(16)}}>申请接入</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonshadow,{left:Utils.width/2,borderLeftWidth:0.5,borderLeftColor:'#ccc'}]} onPress={()=>this._addCart(data)}>
              <Text style={{color:'#387ff5',fontSize:Utils.normalize(16)}}>待定</Text>
            </TouchableOpacity>
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
