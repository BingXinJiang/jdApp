/**
 * Created by tlab on 16/7/7.
 */
'use strict';
import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,   
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

class MenuButton extends Component {
    static protoTypes = {
        renderIcon: PropTypes.number.isRequired,
        showText:PropTypes.string,
        tag:PropTypes.string,
        onClick:PropTypes.func
    };
    constructor(props){
        super(props);
        this._onClick = this._onClick.bind(this);
    }
    _onClick(){
        if(this.props.onClick){
            this.props.onClick(this.props.showText, this.props.tag);
        }
    }
    render(){
        return(
            <TouchableWithoutFeedback onPress={this._onClick}>
                <View style={{alignItems:'center',flex:1}}>
                    <Image style={styles.iconImg} source={this.props.renderIcon}/>
                    <Text style={styles.showText}>{this.props.showText}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    iconImg:{
        width:38,
        height:38,
        marginBottom:2
    },
    showText:{
        fontSize:12
    }
});

module.exports = MenuButton;