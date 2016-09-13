/**
 * Created by jiangsong on 16/7/17.
 */

'use strict';
import React, { Component } from 'react';
import {
    View,
    PixelRatio
} from 'react-native';
import Dimensions from 'Dimensions';

const Util = {
    retio:PixelRatio.get(),
    pixel:1/PixelRatio.get(),
    size:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    post(url,data,callback){
        const fetchOptions = {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        };
        fetch(url, fetchOptions)
            .then((response)=>{
                return response.json()
            })
            .then((responseData)=>{
                callback(responseData);
            });
    },
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE'
};

export default Util;