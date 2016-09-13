/**
 * Created by jiangsong on 16/7/9.
 */

'use strict';
import React, { Component } from 'react';
import {
    View,
    WebView,
    Platform
} from 'react-native';

class JDWebView extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1, paddingTop:Platform.os === 'ios'?20:0}}>
                <WebView startInLoadingState={true}
                         javaScriptEnabled={true}
                         source={{uri:this.props.url, method:'GET'}}/>
            </View>
        );
    }
}
module.exports = JDWebView;