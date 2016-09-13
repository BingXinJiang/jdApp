/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    Text
} from 'react-native';

import MainScreen from './MainScreen';
import JDWebView from './WebVIew';
import QRScreen from './QRCodeScreen';

class jdApp extends Component {
  render() {
    return (
        <Navigator
            initialRoute={{name: 'main', index: 0, id:'main'}}
            renderScene={(route, navigator)=>jdApp._renderPage(route,navigator)}
        />
    );
  }
  static _renderPage(route, nav){
        switch(route.id){
          case 'main':
                return (<MainScreen nav={nav}/>);
          break;
            case 'qrscreen':
                return (<QRScreen/>);
            break;
          case 'webview':
                return (<JDWebView url={route.url}/>);
        }
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('jdApp', () => jdApp);
