/**
 * Created by jiangsong on 16/7/17.
 */

'use strict';
import React, { Component } from 'react';
import {
    View
} from 'react-native';

import ScanView from './ScanView';
import FaXianDetail from './FaXianDetail';


class FaXian extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={{flex:1}}>
                <ScanView style={{height:80}}/>
                <FaXianDetail/>
            </View>
        );
    }
}
module.exports = FaXian;