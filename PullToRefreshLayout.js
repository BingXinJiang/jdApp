/**
 * Created by jiangsong on 16/7/10.
 */

'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    PanResponder,
    LayoutAnimation,
    ProgressViewIOS,
    Dimensions,
    Text,
    AsyncStorage,
    Image
} from 'react-native';

let self;
const PULL_REFRESH_LAYOUT="pullLayout";
const deviceWidth=Dimensions.get('window').width;
const factor = 1.8;
const MAX_PULL_LENGTH=170;
const REFRESH_PULL_LENGTH=70;
const BACK_TIME = 400;
const REFRESH_LAST_TIME_KEY="refresh_last";

const RefreshStatus={
    Refresh_None:0,
    Refresh_Drag_Down:1,
    Refresh_Loading:2,
    Refresh_Reset:3
};

const ShowLoadingStatus={
    SHOW_DOWN:0,
    SHOW_UP:1,
    SHOW_LOADING:2
};

class PullToRefreshLayout extends Component {

    _PanResponder:{}

    constructor(props){
        super(props);
        this.state = {
            currentDistance:0,
            pullRefreshStatus:RefreshStatus.Refresh_None,
            showPullStatus:ShowLoadingStatus.SHOW_DOWN,
            showPullLastTime:'NONE'
        };
        this.resetHeader=this.resetHeader.bind(this);
        this.refreshStateHeader=this.refreshStateHeader.bind(this);
        this.getTime=this.getTime.bind(this);
        this.addZeroAtFront=this.addZeroAtFront.bind(this);
    }

    _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }

    _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
        return true;
    }

    _handlePanResponderGrant(e: Object, gestureState: Object){

    }

    _handlePanResponderMove(e: Object, gestureState: Object) {
        if(self.state.currentDistance>REFRESH_PULL_LENGTH){
            if(self.state.showPullStatus===ShowLoadingStatus.SHOW_DOWN){
                self.setState({
                    showPullStatus:ShowLoadingStatus.SHOW_UP
                });
            }
        }
        else{
            if (self.state.showPullStatus===ShowLoadingStatus.SHOW_UP){
                self.setState({
                    showPullStatus:ShowLoadingStatus.SHOW_DOWN
                });
            }
        }
        if (self.state.pullRefreshStatus===RefreshStatus.Refresh_Loading){
            self.setState({
                currentDistance:REFRESH_PULL_LENGTH+gestureState.dy/factor,
                
            });
            self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
                style:{
                    marginTop:self.state.currentDistance
                }
            });
            return;
        }
        if (gestureState.dy>0&&self.state.currentDistance<MAX_PULL_LENGTH){
            self.setState({
                currentDistance:gestureState.dy/factor,
                pullRefreshStatus:RefreshStatus.Refresh_Drag_Down
            });
            self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
                style:{
                    marginTop:self.state.currentDistance
                }
            });
        }
        else if(gestureState.dy>0&&self.state.currentDistance>MAX_PULL_LENGTH){//则不再往下移动
            self.setState({
                currentDistance:MAX_PULL_LENGTH,
                pullRefreshStatus:RefreshStatus.Refresh_Drag_Down
            });
            self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
                style:{
                    marginTop:self.state.currentDistance
                }
            });
        }
    }

    resetHeader(){
        LayoutAnimation.configureNext({
            duration: BACK_TIME,
            update: {
                type: 'linear'
            }
        });
        self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
            style:{
                marginTop:0
            }
        });
        self.setState({
            currentDistance:0,
            pullRefreshStatus:RefreshStatus.Refresh_Reset,
            showPullStatus:ShowLoadingStatus.SHOW_DOWN
        });
    }

    refreshStateHeader(){
        self.setState({
            pullRefreshStatus:RefreshStatus.Refresh_Loading,
            currentDistance:REFRESH_PULL_LENGTH,
            showPullStatus:ShowLoadingStatus.SHOW_LOADING
        },()=>{
            if(self.props.onRefresh){
                self.props.onRefresh();
            }
        });
        LayoutAnimation.configureNext({
            duration: BACK_TIME,
            update: {
                type: 'linear',
            }
        });
        self.refs[PULL_REFRESH_LAYOUT].setNativeProps({
            style:{
                marginTop:REFRESH_PULL_LENGTH
            }
        });
    }

    addZeroAtFront(count){
        if (count<10){
            count="0"+count;
        }
        return count;
    }

    getTime(){
        let date=new Date();

        let mMonth=this.addZeroAtFront(date.getMonth()+1);

        let mDate=this.addZeroAtFront(date.getDate());

        let mHours=this.addZeroAtFront(date.getHours());

        let mMinutes=this.addZeroAtFront(date.getMinutes());

        return mMonth+"-"+mDate+"  "+mHours+":"+mMinutes;
    }

    stopRefresh(){
        let savedDate=this.getTime();
        self.setState({
            showPullLastTime:savedDate,
        });
        AsyncStorage.setItem(REFRESH_LAST_TIME_KEY,savedDate,()=>{

        });
        this.resetHeader();
    }

    _handlePanResponderEnd(e: Object, gestureState: Object) {
        if (self.state.currentDistance>=REFRESH_PULL_LENGTH){
            self.refreshStateHeader();
        }
        else{
            self.resetHeader();
        }
    }

    componentDidMount() {
        AsyncStorage.getItem(REFRESH_LAST_TIME_KEY,(err,result)=>{
            if (result){
                self.setState({
                    showPullLastTime:result
                });
            }
        });
    }

    componentWillMount() {
        self=this;
        this._panResponder=PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
    }


    shouldComponentUpdate(nextProps,nextState) {
        if (nextState.showPullStatus!==self.state.showPullStatus){
            return true;
        }
        if (self.state.showPullLastTime!==nextState.showPullLastTime){
            return true;
        }
        return false;
    }

    render(){
        let pullText;
        let indicatorView;
        if (this.state.showPullStatus===ShowLoadingStatus.SHOW_DOWN){
            indicatorView=<Image
                style={{height:30,width:30,marginRight:10}}
                source={require('./images/loading/ptr_rotate_arrow.jpg')}
                resizeMode={Image.resizeMode.contain}
            />;
            pullText="下拉刷新";
        }
        else if (this.state.showPullStatus===ShowLoadingStatus.SHOW_UP){
            indicatorView=<Image
                style={{height:30,width:30,marginRight:10,transform:[{rotate:"180deg"}]}}
                source={require('./images/loading/ptr_rotate_arrow.jpg')}
                resizeMode={Image.resizeMode.contain}
            />;
            pullText="释放刷新";
        }
        else if(this.state.showPullStatus===ShowLoadingStatus.SHOW_LOADING){
            indicatorView=<ProgressViewIOS style={{marginRight:10,width:30,height:30}} />
            pullText="刷新中......";
        }
        return(
            <View style={styles.base}>
                <View style={{backgroundColor:'white',position:'absolute'}}>
                    <View style={{justifyContent:'center',alignItems:'center',width:deviceWidth,height:REFRESH_PULL_LENGTH,flexDirection:'row'}}>
                        {indicatorView}
                        <View style={{height:REFRESH_PULL_LENGTH,justifyContent:'center',alignItems:'center',marginLeft:10}}>
                            <Text style={{fontSize:12,color:'#666',marginBottom:1}}>{pullText}</Text>
                            <Text style={{fontSize:12,color:'#666',marginTop:1}}>最后更新:   {this.state.showPullLastTime}</Text>
                        </View>
                    </View>
                </View>
                <View
                    ref={PULL_REFRESH_LAYOUT}
                    style={{flex:1}}  {...this._panResponder.panHandlers} >
                    {this.props.children}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    base: {
        flex: 1,
        position :'relative'
    }
});

module.exports = PullToRefreshLayout;