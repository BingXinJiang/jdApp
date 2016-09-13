/**
 * Created by jiangsong on 16/7/17.
 */

'use strict';
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    ScrollView,
    View
} from 'react-native';

import Util from './utils';
import SearchBar from 'react-native-search-bar';
import fuzzy from 'fuzzy';


class Search extends Component {

    constructor(props){
        super(props);
        const stateData = {
            "AL": "Alabama","AK": "Alaska","AS": "American Samoa",
            "AZ": "Arizona","AR": "Arkansas","CA": "California",
            "CO": "Colorado","CT": "Connecticut","DE": "Delaware",
            "DC": "District Of Columbia","FM": "Federated States Of Micronesia","FL": "Florida",
            "GA": "Georgia","GU": "Guam","HI": "Hawaii",
            "ID": "Idaho","IL": "Illinois","IN": "Indiana",
            "IA": "Iowa","KS": "Kansas","KY": "Kentucky",
            "LA": "Louisiana","ME": "Maine","MH": "Marshall Islands",
            "MD": "Maryland","MA": "Massachusetts","MI": "Michigan",
            "MN": "Minnesota","MS": "Mississippi","MO": "Missouri",
            "MT": "Montana","NE": "Nebraska","NV": "Nevada",
            "NH": "New Hampshire","NJ": "New Jersey","NM": "New Mexico",
            "NY": "New York","NC": "North Carolina","ND": "North Dakota",
            "MP": "Northern Mariana Islands","OH": "Ohio","OK": "Oklahoma",
            "OR": "Oregon","PW": "Palau","PA": "Pennsylvania",
            "PR": "Puerto Rico","RI": "Rhode Island","SC": "South Carolina",
            "SD": "South Dakota","TN": "Tennessee","TX": "Texas",
            "UT": "Utah","VT": "Vermont","VI": "Virgin Islands",
            "VA": "Virginia","WA": "Washington","WV": "West Virginia",
            "WI": "Wisconsin","WY": "Wyoming"
        };
        this.states = [];
        for(let key in stateData){
            if(stateData.hasOwnProperty(key)){
                this.states.push(stateData[key]);
            }
        }
        this.state = {
            states:this.states
        }
    }

    _onChangeText(text){
        let results = fuzzy.filter(text, this.states);
        let matches = results.map((el)=>{return el.string});
        this.setState({
            states:matches
        });
    }

    render(){
        const  statesList = this.state.states.map((ele, index)=>{
            return (
                <View key={index} style={styles.list}>
                    <Text style={styles.text}>{ele}</Text>
                </View>
            );
        });
        return(
            <ScrollView style={styles.container} contentOffset={{y:0}}>
                <SearchBar
                    style={{width:375, height:50}}
                ref='searchBar'
                placeholder='Search'
                onChangeText={(text)=>{this._onChangeText}}/>
                {statesList}
            </ScrollView>
        );
    }
}
const  styles = StyleSheet.create({
    container:{
        flex:1
    },
    list:{
        height:40,
        paddingLeft:20,
        justifyContent:'center',
        borderBottomColor:'#aaa',
        borderBottomWidth:Util.pixel
    },
    text:{
        
    }
});
module.exports = Search;