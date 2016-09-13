/**
 * Created by tlab on 16/7/6.
 */
'use strict';
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    ScrollView,
    Alert,
    ListView,
    TouchableWithoutFeedback,
    RefreshControl,
    Dimensions,
    PixelRatio
} from 'react-native';

import ViewPager from 'react-native-viewpager';
import MenuButton from './MenuButton';
import RefreshableListView from 'react-native-refreshable-listview';

const BANER_IMGS = [
    require('./images/banner/1.jpg'),
    require('./images/banner/2.jpg'),
    require('./images/banner/3.jpg'),
    require('./images/banner/4.jpg')
];

const  len = 160;

class HomePage extends Component {
    constructor(props){
        super(props);
        let dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2
        });
        let ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2
        });
        this._renderRow = this._renderRow.bind(this);
        this._onMenuClick = this._onMenuClick.bind(this);
        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._reloadCommities = this._reloadCommities.bind(this);
        this.state = {
            dataSource:dataSource.cloneWithPages(BANER_IMGS),
            listData:ds,
            listDataNum:0
        }
    }
    componentWillMount(){
        fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1')
            .then((res)=>res.json())
            .then((str)=>{
                let arr = JSON.parse(str.recommend).wareInfoList;
                var rows = [];
                for(let i=0; i<arr.length; i+=2){
                    var item = {id:i, left:null, right:null};
                    item.left = (arr[i]);
                    if(i<arr.length-1){
                        item.right = (arr[i+1]);
                    }
                    rows.push(item);
                }
                var ds = this.state.listData.cloneWithRows(rows);
                this.setState({listData:ds, listDataNum:rows.length});
            })
    }

    _onMenuClick(title, tag){
        Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }
    _onRecommendClick(wareId){
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';
        this.props.nav.push({
            id:'webview',
            title:'webview',
            url:url
        });
    }
    _reloadCommities(){
        fetch('http://m.jd.com/index/recommend.action?_format_=json&page=1')
            .then((res)=>res.json())
            .then((str)=>{
                let arr = JSON.parse(str.recommend).wareInfoList;
                var rows = [];
                for(let i=0; i<arr.length; i+=2){
                    var item = {id:i, left:null, right:null};
                    item.left = (arr[i]);
                    if(i<arr.length-1){
                        item.right = (arr[i+1]);
                    }
                    rows.push(item);
                }
                var ds = this.state.listData.cloneWithRows(rows);
                this.setState({listData:ds, listDataNum:rows.length});
            })
    }
    _renderRow(rowData){
        if(rowData.id+2 >= this.state.listDataNum*2){
            return (
                <View style={{flexDirection:'row'}}>

                    <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                              onPress={()=>{this._onRecommendClick(rowData.left.wareId)}}>
                        <View style={{flex:1,alignItems:'center'}}>
                            <Image resizeMode={'stretch'} source={{uri:rowData.left.imageurl}}
                                   style={{width:len,height:len}}/>
                            <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.left.wname}</Text>
                            <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                            <View style={{flexDirection:'row', width:len,marginTop:6,
                                        marginBottom:22, alignItems:'flex-start'}}>
                                <Text style={styles.priceText}>${rowData.left.jdPrice}</Text>
                                <TouchableWithoutFeedback>
                                    <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',
                                               borderRadius:3,justifyContent:'center',
                                                alignItems:'center'}}>
                                        <Text style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}>
                        <View style={{flex:1,alignItems:'center'}}>

                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        return (
            <View style={{flexDirection:'row'}}>

                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                            onPress={()=>{this._onRecommendClick(rowData.left.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.left.imageurl}}
                                style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.left.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View style={{flexDirection:'row', width:len,marginTop:6,
                                        marginBottom:22, alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>${rowData.left.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',
                                               borderRadius:3,justifyContent:'center',
                                                alignItems:'center'}}>
                                    <Text style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.right.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={{uri:rowData.right.imageurl}}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.right.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View style={{flexDirection:'row', width:len,marginTop:6,
                                        marginBottom:22, alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>${rowData.right.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',
                                               borderRadius:3,justifyContent:'center',
                                                alignItems:'center'}}>
                                    <Text style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    render() {
        return (
                <RefreshableListView
                    style={{flex:1,backgroundColor:'white'}}
                    dataSource={this.state.listData}
                    renderRow={this._renderRow}
                    loadData={this._reloadCommities}
                    refreshDescription="Refreshing items"
                    renderHeader={()=>{
                return (
                    <View>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true} />
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('./images/home_icons/wdgz.png')}
                                    showText={'我的关注'} tag={'wdgz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('./images/home_icons/wlcx.png')}
                                    showText={'物流查询'} tag={'wlcx'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('./images/home_icons/cz.png')}
                                    showText={'充值'} tag={'cz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('./images/home_icons/dyp.png')}
                                    showText={'电影票'} tag={'dyp'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('./images/home_icons/yxcz.png')}
                                    showText={'游戏充值'} tag={'yxcz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('./images/home_icons/xjk.png')}
                                    showText={'小金库'} tag={'xjk'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('./images/home_icons/ljd.png')}
                                    showText={'领京豆'} tag={'ljd'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('./images/home_icons/gd.png')}
                                    showText={'更多'} tag={'gd'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={{marginTop:15, borderWidth:0.5,borderColor:'#ccc'}}/>
                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>猜你喜欢</Text>
                </View>
                )}}/>

        );
    }

    _renderPage(data, pageId){
        return(
            <Image source={data} style={styles.page}/>
        );
    }
}

const styles = StyleSheet.create({
    page:{
        flex:1,
        height:130,
        resizeMode:'stretch'
    },
    menuView:{
        flexDirection:'row',
        marginTop:10
    },
    recommendTitle:{
        width:len,
        flexWrap:'wrap',
        fontSize:12,
        color:'black',
        flex:1,
        marginTop:8,
        marginBottom:8,
        height:30
    },
    priceText:{
        flex:1,
        alignSelf:'flex-start',
        textAlign:'left',
        fontSize:13,
        color:'#f15353'
    }
});

module.exports = HomePage;