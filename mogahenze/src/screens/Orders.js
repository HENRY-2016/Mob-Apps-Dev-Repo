
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import {APIgetAllCustomerOrders, imageurl} from './DataFileApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';

export default class Orders extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        cartItems: [],
        UserName:'',
        UserPhone:'',
        expanded:false,
    }
    
}

handlePress = () => {
    console.log("Changing state");
    this.setState({expanded:true ?false:true})
};
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

    setTimeout(()=>{this.getCustomerOrders()},4000)
    // setTimeout(()=>{this.getCustomerOrdersWithFatchApi()},4000)

    
}

getCustomerOrders = () =>
{
    console.log("mmmm"+this.state.UserPhone)
    console.log("ttttt"+APIgetAllCustomerOrders+this.state.UserPhone)
    axios.get(APIgetAllCustomerOrders+this.state.UserPhone)
    .then(res => {
        let jsonstring =JSON.stringify(res.data); 
        let results =JSON.parse(jsonstring ); 

        // console.log("=====>"+jsonstring)
        // console.log("=====>"+results.length)
        // console.log("=====>"+results[0].id)
        this.setState({cartItems:[...results]})
        console.log(this.state)
        // console.log("=================================")

        })
    .catch(err=>{console.log(err);})
    // console.log("component loaded")

}

getCustomerOrdersWithFatchApi = async () =>
{
    return fetch(APIgetCustomerOrders+this.state.UserPhone)
      .then((response) => response.json())
      .then((data) => console.log("=======>>>>"+JSON.stringify(data)));
}

render() {
    
    const { cartItems, cartItemsIsLoading} = this.state;

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
                    <Text style={styles.topNavigationHeaderText}>My Oders</Text>
                </View>
            </View>

            {
                cartItems && cartItems.map((item, i) => (
                    <List.Section>
                        <List.Accordion
                            title={"Number "+ item.orderdetails}>
                            <View style={styles.odersLableLeftView}>
                                <Text numberOfLines={1} style={styles.odersLables}>{"Name : " + " "+ item.customer_name}</Text>
                                <Text numberOfLines={1} style={styles.odersLables}>{"Phone :" + " "+ item.phone}</Text>
                                <Text numberOfLines={1} style={styles.odersLables}>{"Second :" +" "+ item.alternative_phone}</Text>
                                <Text numberOfLines={1} style={styles.odersLables}>{"Time :" + " "+ item.created_at}</Text>
                            </View>
                            
                            <View style={styles.ordersDetailsBtnView}>
                                <TouchableOpacity onPress={this.displayCheckOutScreen} style={styles.cartCheckoutBtn} >
                                    <Text style={styles.cartCheckoutText} >Details</Text> 
                                </TouchableOpacity>
                            </View>
                        </List.Accordion>
                    </List.Section>
                    ))
            }
            
        </View>
);
}
}

// https://callstack.github.io/react-native-paper/list-accordion.html
// left={props => <List.Icon {...props} icon="folder" />}