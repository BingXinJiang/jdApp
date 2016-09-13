/**
 * Created by tlab on 16/7/14.
 */
'use strict';
import React, { Component,PropTypes } from 'react';
import {
    ListView,
    Text,
    View,
    Image
} from 'react-native';

import ImageListView from './ImageListView';

class RightList extends Component {
    static protoTypes = {
        icon: PropTypes.number.required,
        data:PropTypes.array
    };
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource:ds.cloneWithRows(this.props.data)
        }
        this._renderRow = this._renderRow.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }
    render(){
        return(
            <View style={{flex:1}}>
                <ListView style={{flex:1, padding:5}}
                          dataSource={this.state.dataSource}
                          renderRow={this._renderRow}
                          renderHeader={this._renderHeader}/>
            </View>
        );
    }
    _renderRow(rowData){
        return(
            <View>
                <Text>{rowData.name}</Text>
                <ImageListView
                data={rowData.catelogyList}
                width={285}/>
            </View>
        );
    }
    _renderHeader(){
        return (
            <Image style={{width:285, height:120}}
            source={this.props.icon}/>
        );
    }
}

module.exports = RightList;