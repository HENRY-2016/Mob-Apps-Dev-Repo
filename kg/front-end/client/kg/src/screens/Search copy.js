
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, FlatList, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import { COLORS } from './Colours';

// APIs
import {
    APIBabies, imageurl,
    // APIBathRoomTowelsProducts,
    // APIBathRoomDoorMatsProducts,
    // APIBathRoomCurtainsProducts
    } from './DataFileApis';



export default class Search extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            cartItems:[],
            isVisible:false,
            SearchName:'',
            SearchNamesOptions : [
                {
                    id: "0",
                    title: "Type First Letter",},
                {
                    id: "1",
                    title: "Nets",},
                {
                    id: "2",
                    title:"Blankets",
                },
                {
                    id: "3",
                    title: "Nets2",},
                {
                    id: "4",
                    title:"Blankets2",
                }
            ],
        
            NumberOfItems:'',

            // screens
            showRobsScreen:false, // do not display empty view
            showTowelsScreen:true, // display empty view
            showShowerCurtainsScreen:true, // display empty view
            showBlanketsScreen:true, // display empty view
            showDoorMatsScreen:true, // display empty view

            // Products 
            BabiesProducts:[],
            BathRoomTowelsProducts:[],
            RoomDoorMatsProducts:[],
            RoomBathroomCurtainsProducts:[],
    }



    
}
componentDidMount() {
    axios.get(APIBabies)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BabiesProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("1 ==>"+results)
        })
    .catch(err=>{})

    setInterval(this.getNumberOfItems,1000);
}

getNumberOfItems = () => 
{
    // console.log("geting data")
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        // console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};


selectValue = (value) => {
        // Value is whatever user selected in autocomplete.
        console.log(value)
    };
setSearchName = (data) => {
// const result = await fetch("http://example.com/address");
console.log("====>>"+data);
let jsonStr = JSON.stringify(data)
let jsonObj = JSON.parse(jsonStr)
console.log("====>>"+ jsonStr);
console.log("====nnn"+ jsonObj[1]['title']);


// this.setState({SearchName:data})
};
setSearchNameResults = () =>
{
    console.log("====>> API Data");

}
render() {
    
    const { SearchName,SearchNamesOptions, NumberOfItems} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Search For Items </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{height:10}} ></View>
            <View style={styles.searchMainView} >
                <AutocompleteDropdown 
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    initialValue={{id:"0"}}
                    // onSelectItem ={(itemValue) =>this.setSearchName(itemValue)}
                    // onChangeText={(itemValue) =>this.setSearchName(itemValue)}
                    onBlur={(itemValue) =>this.setSearchName(itemValue)}
                    dataSet={SearchNamesOptions}
                />
            </View>
        </View>
    );
}
}


// https://www.npmjs.com/package/react-native-autocomplete-dropdown
// https://www.npmjs.com/package/react-native-input-autocomplete