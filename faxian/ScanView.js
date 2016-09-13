/**
 * Created by jiangsong on 16/7/17.
 */

'use strict';
import React, { Component } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image
} from 'react-native';

let IMGS = [
    require('../images/faxian/Header/1.jpg'),
    require('../images/faxian/Header/2.jpg'),
    require('../images/faxian/Header/3.jpg'),
    require('../images/faxian/Header/4.jpg'),
    require('../images/faxian/Header/5.jpg'),
    require('../images/faxian/Header/6.jpg'),
    require('../images/faxian/Header/7.jpg'),
    require('../images/faxian/Header/8.jpg'),
    require('../images/faxian/Header/9.jpg'),
    require('../images/faxian/Header/10.jpg'),
    require('../images/faxian/Header/11.jpg'),
    require('../images/faxian/Header/12.jpg')
];

class ScanView extends Component {

    constructor(props){
        super(props);
    }

    render(){
        let boxes = IMGS.map((ele)=>{
            return (<Image 
                style={{width:80, height:80, borderWidth:3, borderColor:'orange'}}
                source={ele}/>);
        });
        return(
            <View style={{height:80}}>
                <ScrollView
                    style={styles.scroll}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {boxes}
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    scroll:{
        flexDirection:'row',
        height:80
    }
});
module.exports = ScanView;
