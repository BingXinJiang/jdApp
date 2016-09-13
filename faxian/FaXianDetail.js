/**
 * Created by jiangsong on 16/7/17.
 */

'use strict';
import React, { Component } from 'react';
import {
    View,
    Image
} from 'react-native';

import ScrollableTabView ,{ ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Search from '../search/Search';

class FaXianDetail extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <ScrollableTabView
                initialPage={0}
                renderTabBar={()=>{return (
                    <ScrollableTabBar/>
                )}}>
                <View tabLabel="精选" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                            source={require('../images/faxian/content/1.jpg')}/>
                </View>
                <View tabLabel="穿搭" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/2.jpg')}/>
                </View>
                <View tabLabel="智能" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/3.jpg')}/>
                </View>
                <View tabLabel="生活家" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/4.jpg')}/>
                </View>
                <View tabLabel="美妆" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/5.jpg')}/>
                </View>
                <View tabLabel="母婴" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/6.jpg')}/>
                </View>
                <View tabLabel="数码" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/7.jpg')}/>
                </View>
                <View tabLabel="旅游" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/8.jpg')}/>
                </View>
                <View tabLabel="理财" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/9.jpg')}/>
                </View>
                <View tabLabel="品牌街" style={{flex:1, justifyContent:'center'}}>
                    <Image style={{width:200, height:300, alignSelf:'center'}}
                           source={require('../images/faxian/content/10.jpg')}/>
                </View>
                <View tabLabel="Search" style={{flex:1, justifyContent:'center'}}>
                    <Search/>
                </View>
            </ScrollableTabView>
        );
    }
}
module.exports = FaXianDetail;
