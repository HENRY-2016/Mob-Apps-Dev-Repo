
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import {APIgetCustomerOrders, imageurl} from './DataFileApis';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Orders extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        cartItems1: [],
        UserName:'',
        UserPhone:'',
    }
    
}

componentDidMount() 
{
    try 
    {   
               // get user name
        AsyncStorage.getItem('UserName').then((username)=>{
        if (username !== null) {this.setState({UserName:username})}
        })
            // get Phone 
        AsyncStorage.getItem('UserPhone').then((phone)=>{
            if (phone !== null){this.setState({UserPhone :phone})}
            })
    }catch (error) { console.log(error)}

    // setTimeout(()=>{this.getCustomerOrders()},4000)
}

getCustomerOrders = () =>
{
    console.log("mmmm"+this.state.UserPhone)
    console.log("ttttt"+APIgetCustomerOrders+this.state.UserPhone)
    axios.get(APIgetCustomerOrders+this.state.UserPhone)
    .then(res => {
        let results =JSON.stringify(res.data); 
        console.log("=====>"+results)
        // this.setState({cartItems1:[...JSON.parse(results)]})
        console.log(this.state)
        })
    .catch(err=>{console.log(err);})
    // console.log("component loaded")

}

render() {
    
    // const { cartItems, cartItemsIsLoading} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.topNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Orders</Text>
                </View>
            </View>
            
            <Text>orders will be listed here</Text>
            
        </View>
    );
}
}
