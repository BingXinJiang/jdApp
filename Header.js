/**
 * Created by tlab on 16/7/6.
 */
'use strict';

import React, { Component } from 'react';
import {
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

import QRScreen from './QRCodeScreen';

class Header extends Component {

    constructor(props){
        super(props);
        this._ORCodeGet = this._ORCodeGet.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./images/header/header_logo.png')} style={styles.logo}/>
                <View style={styles.searchBox}>
                    <Image source={require('./images/header/icon_search.png')} style={styles.searchIcon}/>
                    <TextInput
                        keyboardType="web-search"
                        placeholder="搜索京东商品"
                        style={styles.inputText}
                        />
                    <Image source={require('./images/header/icon_voice.png')} style={styles.voiceIcon}/>
                </View>
                <TouchableOpacity onPress={this._ORCodeGet}>
                    <Image source={require('./images/header/icon_qr.png')} style={styles.scanIcon}/>
                </TouchableOpacity>
            </View>
        );
    }

    _ORCodeGet(){
        this.props.nav.push({
            id:'qrscreen',
            title:'QRScreen',
            component:QRScreen
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20,
        height:68,
        backgroundColor:'#d74047',
        alignItems:'center'
    },
    logo:{
        height:24,
        width:64,
        resizeMode:'stretch'
    },
    searchBox:{
        height:30,
        flexDirection:'row',
        flex:1,
        borderRadius:5,
        backgroundColor:'white',
        alignItems:'center',
        marginLeft:8,
        marginRight:12
    },
    scanIcon:{
        height:26.7,
        width:26.7,
        resizeMode:'stretch'
    },
    searchIcon:{
        marginLeft:6,
        marginRight:6,
        width:16.7,
        height:16.7,
        resizeMode:'stretch'
    },
    voiceIcon:{
        marginLeft:5,
        marginRight:8,
        width:15,
        height:20,
        resizeMode:'stretch'
    },
    inputText:{
        flex:1,
        backgroundColor:'transparent',
        fontSize:14
    }
});

module.exports = Header;