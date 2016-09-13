/**
 * Created by tlab on 16/9/9.
 */
'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    LayoutAnimation
} from 'react-native';

class MyAnimate extends Component {
    constructor(props){
        super(props);
        this.state = {
            views:[]
        }
        this._onPressAddView = this._onPressAddView.bind(this);
        this._onPressRemoveView = this._onPressRemoveView.bind(this);
    }
    componentWillUpdate(){
        LayoutAnimation.easeInEaseOut();
    }
    _onPressAddView(){
        this.setState((state) => ({views:[...state.views, {}]}));
    }
    _onPressRemoveView(){
        this.setState((state) => ({views: state.views.slice(0, -1)}));
    }
    render() {
        const views = this.state.views.map((views, i) =>
            <View key={i} style={styles.view}>
                <Text>{i}</Text>
            </View>
        )
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressAddView}>
                    <View style={styles.button}>
                        <Text>Add View</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onPressRemoveView}>
                    <View style={styles.button}>
                        <Text>Remove View</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.viewContainer}>
                    {views}
                </View>
            </View>
        );
    }
}

const GreenSquare = () =>
    <View style={styles.greenSquare}>
        <Text>Green Square</Text>
    </View>

const BlueSquare = () =>
    <View style={styles.blueSquare}>
        <Text>Blue Square</Text>
    </View>

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    button:{
        borderRadius:5,
        backgroundColor:'#eeeeee',
        padding:10,
        marginBottom:10
    },
    viewContainer:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    view:{
        height:54,
        width:54,
        backgroundColor:'red',
        margin:8,
        alignItems:'center',
        justifyContent:'center'
    },
    greenSquare:{
        width:150,
        height:150,
        backgroundColor:'green',
        alignItems:'center',
        justifyContent:'center'
    },
    blueSquare:{
        width:150,
        height:150,
        backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center'
    }
});

module.exports = MyAnimate;