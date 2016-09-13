/**
 * Created by tlab on 16/9/8.
 */
'use strict';
import React, { Component } from 'react';
import {
    Modal,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    Dimensions,
    AsyncStorage
} from 'react-native';

import Storage from 'react-native-storage';

const {height, width} = Dimensions.get('window');

let storage = new Storage({
    size:1000,
    storageBackend:AsyncStorage,
    defaultExpires:1000*3600*24,
    enableCache:true,
    sync:{
    }
})

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            animationType:'slide',
            modalVisible:true,
            transparent:false,
            name:'',
            pass:''
        };
        this._onPressButton = this._onPressButton.bind(this);
        this._loginClick = this._loginClick.bind(this);
    }
    _setModalVisible(visible){
        this.setState({
            modalVisible:visible
        });
    }
    _setAnimationType(type){
        this.setState({
            animationType:type
        });
    }
    _toggleTransparent(){
        this.setState({
            transparent:!this.state.transparent
        });
    }
    _onPressButton(){
        this._setModalVisible(false);
    }
    _loginClick(){
        let userName = this.state.name;
        let userPass = this.state.pass;
        if(userName && userPass){
            storage.save({
                key:'loginState',
                userData:{
                    userName:userName,
                    password:userPass
                },
                expires: 1000 * 3600
            })
        }
        this._setModalVisible(false);
    }
    render() {
        return (
            <Modal
                animationType={this.state.animationType}
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={()=>{this._setModalVisible(false)}}
            >
                <View style={styles.me}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.close} onPress={this._onPressButton}>
                            <Image
                                style={styles.close}
                                source={require('../images/me/close.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.title}>
                            <Text style={{fontSize:24}}>请您登陆</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={{flexDirection:'row', height:45, alignItems:'center'}}>
                            <Text style={{fontSize:24}}>姓名:</Text>
                            <TextInput
                                onChangeText={(text)=>{
                                    this.setState({name:text});
                                }}
                                style={{width:200,height:40,borderColor: 'gray', borderWidth: 1, borderRadius:8}}
                                placeholder="请输入姓名"/>
                        </View>
                        <View style={{flexDirection:'row', height:45, alignItems:'center'}}>
                            <Text style={{fontSize:24}}>密码:</Text>
                            <TextInput
                                onChangeText={(text)=>{
                                    this.setState({pass:text});
                                }}
                                style={{width:200,height:40,borderColor: 'gray', borderWidth: 1, borderRadius:8}}
                                placeholder="请输入密码"/>
                        </View>
                        <View style={{width:width, height: 60, alignItems:'center'}}>
                            <TouchableOpacity onPress={this._loginClick}>
                                <Text style={styles.button}>
                                    登录
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

}

const styles = StyleSheet.create({
    me:{
        flex:1
    },
    header:{
        flexDirection:'row',
        height:60,
        paddingTop:20,
        paddingLeft:10,
        alignItems:'center'
    },
    close:{
        width:40,
        height:40,
        alignSelf:'flex-start'
    },
    title:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        flex:1,
        height:40,
        paddingTop:20,
        fontSize:20
    }
});

module.exports = Login;