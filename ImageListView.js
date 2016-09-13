/**
 * Created by tlab on 16/7/15.
 */
'use strict';
import React, { Component,PropTypes } from 'react';
import {
    ListView,
    Text,
    StyleSheet,
    ScrollView,
    View,
    Image
} from 'react-native';

class ImageListView extends Component {
    static protoTypes = {
        data:PropTypes.array.required,
        width:PropTypes.number.required
    };
    constructor(props){
        super(props);
        this.state = {
            dataSource:this.props.data
        }
    }
    render(){
        let boxes = this.state.dataSource.map((ele)=>{
            let imageUrl = ele.icon;
            let imageTitle = ele.name;
            return (
                <Image
                    source={{uri:{imageUrl}}}
                    style={{width:this.props.width/3, height:this.props.width/3, justifyContent:'center'}}
                >
                    <Text>{imageTitle}</Text>
                </Image>
            );
        });
        return(
            <ScrollView>
                <View style={[styles.container, {width:this.props.width}]}>
                    {boxes}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    }
});

module.exports = ImageListView;