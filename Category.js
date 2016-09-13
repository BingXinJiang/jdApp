/**
 * Created by jiangsong on 16/7/12.
 */
'use strict';
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableWithoutFeedback,
    Alert,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import RightListView from './RightListView';

let self_ListView : ListView;
const deviceHeight=Dimensions.get('window').height;
const LIST_ZUO = [
    '推荐分类','潮流女装','品牌男装','个护化妆','家用电器',
    '电脑办公','手机数码','母婴童装','图书音像','家居家纺',
    '居家生活','家居建材','食品生鲜','酒水饮料','运动户外',
    '鞋靴箱包','奢品礼品','钟表珠宝','玩具乐器','内衣配饰',
    '汽车用品','医药保健','计生情趣','京东金融','生活旅行',
    '宠物农资'
];
const LIST_YOU = [
    {title:'推荐品牌',list:['欧时力']},
    {title:'热点导购',list:['自营女装','精品女装']},
    {title:'热卖品类',list:['连衣裙','阔腿裤','牛仔短裤']},
    {title:'裙装',   list:['长袖连衣裙','绣花连衣裙','长裙','套装裙']},
    {title:'上装',   list:['雪纺衫','打底衫','针织外套','卫衣','短外套']},
    {title:'下装',   list:['短裤','休闲裤','牛仔裤','连体裤','正装裤','半身裙']},
    {title:'特色类目',list:['妈妈装','婚纱','礼服','气泡唐装','大码女装','设计师朝服','婚纱']},
    {title:'热卖品牌',list:['韩都衣舍','妖精的口袋','茵曼','拉夏贝尔','百图','季候风','圣迪奥','阿依莲']}
];

class MenuButton extends Component {
    constructor(props){
        super(props);
        let dataSource_zuo = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2
        });
        let ds = [];
        for(let i=0; i<LIST_ZUO.length; i++){
            let da = LIST_ZUO[i];
            var dads = [];
            dads.push(da);
            dads.push(i);
            dads.push(0);
            ds.push(dads);
        }
        this.state = {
            dataSource_zuo:dataSource_zuo.cloneWithRows(ds),
            dataSource_you:[],
            selectedId:-1,
            offset_y:0
        }
        this._renderRow = this._renderRow.bind(this);
        this._onChoose = this._onChoose.bind(this);
        this._listViewScroll = this._listViewScroll.bind(this);
    }
    componentWillMount(){
        fetch('http://api.m.jd.com/client.action?functionId=newSubCatalog&uuid=hjudwgohxzVu96krv%2FT6Hg%3D%3D&body=%7B%22catelogyId%22%3A%22100001852%22%7D&sign=7f43c6787e65197e4366814c30c21281&d_model=iPhone7%2C2&st=1468823647866&clientVersion=5.1.0&screen=750%2A1334&osVersion=9.3.2&area=2_2824_51911_0&partner=apple&openudid=7d82d90c8b1267819ba959dd52e070887528f6b4&networkType=wifi&sv=100&d_brand=apple&client=apple&adid=DBF1EF76-F12F-4934-A290-DC9909DFA7CC&build=103689')
            .then((res)=>res.json())
            .then((str)=>{
                let arr = JSON.parse(str).data;
                this.setState({dataSource_you:arr});
            })
    }
    _onChoose(rowData){
        let num = this.state.offset_y / 40;
        if(num > 0 && rowData[1] <= 6){
            self_ListView.scrollTo({y:0});
        }
        if(rowData[1]>=19){

        }
        if(rowData[1]>=7 && rowData[1]<19){
            self_ListView.scrollTo({y:40*(rowData[1]-6)});
        }

        let ds = [];
        for (let i=0; i<LIST_ZUO.length; i++){
            let d = [];
            d.push(LIST_ZUO[i]);
            d.push(i);
            if(rowData[1] == i){
                d.push(1);
            }else {
                d.push(0);
            }
            ds.push(d);
        }
        this.setState({
            dataSource_zuo:this.state.dataSource_zuo.cloneWithRows(ds),
            selectedId:rowData[1]
        });
    }
    _listViewScroll(e){
        this.state.offset_y = e.nativeEvent.contentOffset.y;
    }
    _renderRow(rowData){
        if(rowData[2]){
            return (
                <TouchableHighlight onPress={()=>{this._onChoose(rowData)}}>
                    <View style={{height:40,backgroundColor:'orange'}}>
                        <Text style={styles.text_zuo}>{rowData[0]}</Text>
                        <View style={{width:80,height:1,backgroundColor:'green',margnBottom:6}}/>
                    </View>
                </TouchableHighlight>);
        }
        return (
            <TouchableHighlight onPress={()=>{this._onChoose(rowData)}}>
                <View style={{height:40}}>
                    <Text style={styles.text_zuo}>{rowData[0]}</Text>
                    <View style={{width:80,height:1,backgroundColor:'green',margnBottom:6}}/>
                </View>
            </TouchableHighlight>);
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{width:80}}>
                    <ListView
                        ref={(listView)=>{self_ListView = listView;}}
                        style={styles.list_zuo}
                        dataSource={this.state.dataSource_zuo}
                        renderRow={this._renderRow}
                        alwaysBounceVertical={true}
                        showsVerticalScrollIndicator={false}
                        onScroll={this._listViewScroll}/>
                </View>
                <RightListView
                icon={require('./images/banner/1.jpg')}
                data={this.state.dataSource_you}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'red',
        flexDirection:'row'
    },
    list_zuo:{
        width:80,
        backgroundColor:'white'
    },
    text_zuo:{
        flex:1,
        fontSize:18,
        paddingTop:8
    }
});

module.exports = MenuButton;