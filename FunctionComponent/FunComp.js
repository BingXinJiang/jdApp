/**
 * Created by tlab on 16/9/9.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Navigator
} from 'react-native';
import MyAnimate from './MyAnimate';
class FunComp extends Component {
    constructor(props){
        super(props);
        this._animateClick = this._animateClick.bind(this);
        this._shareClick = this._shareClick.bind(this);
    }
    _animateClick(){
        const { navigator } = this.props;
        if(navigator){
            navigator.push({
                name:'MyAnimate',
                component:MyAnimate
            });
        }
    }
    _shareClick(){

    }
    render() {
        return (
            <View style={styles.fun}>
                <TouchableOpacity onPress={this._animateClick}>
                    <Text>动画</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._shareClick}>
                    <Text>微信好友分享功能</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    fun:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});

module.exports = FunComp;