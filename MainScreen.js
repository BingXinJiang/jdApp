/**
 * Created by tlab on 16/7/6.
 */

'use strict';

import React, { Component } from 'react';
import {
    Image,
    TextInput,
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    Navigator
} from 'react-native';

import Header from './Header';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './HomePage';
import Category from './Category';
import FaXian from './faxian/FaXian';

import Storage from 'react-native-storage';

import Login from './Me/Login';
import FunComp from './FunctionComponent/FunComp';

const HOME = 'home';
const HOME_NORMAL = require('./images/tabs/home_normal.png');
const HOME_FOCUS = require('./images/tabs/home_focus.png');
const CATEGORY = 'category';
const CATEGORY_NORMAL = require('./images/tabs/category_normal.png');
const CATEGORY_FOCUS = require('./images/tabs/category_focus.png');
const FAXIAN = 'faxian';
const FAXIAN_NORMAL = require('./images/tabs/faxian_normal.png');
const FAXIAN_FOCUS = require('./images/tabs/faxian_focus.png');
const CART = 'cart';
const CART_NORMAL = require('./images/tabs/cart_normal.png');
const CART_FOCUS = require('./images/tabs/cart_focus.png');
const PERSONAL = 'personal';
const PERSONAL_NORMAL = require('./images/tabs/personal_normal.png');
const PERSONAL_FOCUS = require('./images/tabs/personal_focus.png');

let storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:1000*3600*24,
    enableCache:true,
    sync:{
    }
})

class MainScreen extends Component {
    constructor(props){
       super(props);
        this.state = {
            selectedTag:HOME,
            isLogin:false
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Header/>
                <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                    {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage nav={this.props.nav}/>)}
                    {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, <Category/>)}
                    {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, <FaXian/>)}
                    {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, this._createChildView(CART))}
                    {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, this._createChildView(PERSONAL))}
                </TabNavigator>
            </View>
        );
    }
    _renderTabItem(img, selectedImg, tag, childView){
        return (
            <TabNavigator.Item
                selected={this.state.selectedTag === tag}
                renderIcon={() => <Image style={styles.tabIcon} source={img}/> }
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/> }
                onPress={() => this.setState({selectedTag:tag})}>
                {childView}
            </TabNavigator.Item>
        );
    }
    _createChildView(tag){
        let me = this;
        if(this.state.selectedTag === CART){
            return (
                <Navigator
                    initialRoute={{name:'FuncComp', component:FunComp}}
                    configureScene={(route) => {
                     return Navigator.SceneConfigs.VerticalDownSwipeJump;
                    }}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator}/>
                    }}
                />
            );
        }
        if(this.state.selectedTag === PERSONAL){
            storage.load({
                key:'loginState',
                autoSync:true,
                syncInBackground:true
            }).then(ret => {
                if(!me.state.isLogin){
                    me.setState({
                        isLogin:true
                    })
                }
            }).catch(err => {

            })
            if(this.state.isLogin){
                return (
                    <View style={{flex:1,backgroundColor:'#00baff', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:48}}>{tag}</Text>
                    </View>
                );
            }else{
                return (
                    <Login/>
                );
            }
        }else{
            return (
                <View style={{flex:1,backgroundColor:'#00baff', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:48}}>{tag}</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    tab:{
        height:52,
        backgroundColor:'#333333',
        alignItems:'center'
    },
    tabIcon:{
        width:30,
        height:35,
        resizeMode:'stretch',
        marginTop:10
    }
});

module.exports = MainScreen;