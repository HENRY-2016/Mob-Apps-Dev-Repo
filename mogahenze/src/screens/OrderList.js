
import React from 'react';
import { Text, View, TouchableOpacity,TextInput, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import {AntDesign, Entypo ,Ionicons} from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";
import styles from "./stylesheet";
import {cartitemsapi, imgurl} from './DataFileApis';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Cart extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        cartItems:[],
        orderListTotal:0,
        UserName:'',
        UserPhone:'',
    }
}

componentDidMount() 
{
    // get data from storage
    console.log("geting data")
    try 
    {   
        // get order list
        AsyncStorage.getItem('orderList').then((cart)=>{
        if (cart !== null) {
            // We have data!!
            const orderList = JSON.parse(cart)
            this.setState({cartItems:orderList})
            console.log(this.state)
        }

        else {alert("Your List Is Empty")}
        })
         // get order total
        AsyncStorage.getItem('orderListTotal').then((cart)=>{
            if (cart !== null) {
                // We have data!!
                const orderListTotal = cart
                this.setState({orderListTotal:orderListTotal})
                console.log("=========================")
                console.log(this.state)
            }
            
            // else {alert("Your List Is Empty")}
            })
               // get user name
        AsyncStorage.getItem('UserName').then((username)=>{
            if (username !== null) {this.setState({UserName:username})}
            })
               // get Phone total
        AsyncStorage.getItem('UserPhone').then((phone)=>{
            if (phone !== null){this.setState({UserPhone :phone})}
            })
    }catch (error) { console.log(error)}
}



confirmUserDetials = () => {
    Alert.alert('Thank you','For Ordering with Kulkula gas')
}

removeCatIteamsStorageDetails = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('orderList');
        await AsyncStorage.removeItem ('orderListTotal');

        Alert.alert("Removed Iteams")

    }catch (error) { console.log(error)}
};

removedoubleQuotesFromImg = (imageurl) =>
{
    let formatedUrl =  imageurl.split('"').join('');
    return formatedUrl;
}
formatNumberWithComma(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
render() {


    const { cartItems,orderListTotal,UserPhone,UserName, cartItemsIsLoading} = this.state;

    return (
        <View style={styles.mainView}>
    
            <View style={styles.topNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                        <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Your Order</Text>
                </View>
            
            </View>


            {cartItemsIsLoading ?<></> : (
                <ScrollView>
                    <View style={styles.orderListDetailsView}>
                        <View style={styles.orderListDetailsText} >
                            <Text style={styles.offersLables}>Name:{UserName} </Text>
                            <Text style={styles.offersLables}>Phone: {UserPhone}</Text>
                            <TextInput style={styles.input} placeholder="Alternative Phone" placeholderTextColor = "#fff" onChangeText={text => setuserLogInPhone (text)} />
                            <TextInput style={styles.orderListAdressInput} placeholder="Delivery Adress" placeholderTextColor = "#fff" onChangeText={text => setuserLogInPhone (text)} />
                        </View>
                    </View>

                    {cartItems && cartItems.map((item, i) => (
                        <>
                        <View key={i} style={styles.orderListMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity  style={{paddingRight: 10}}>
                                    <Image source={{uri:this.removedoubleQuotesFromImg(item.image)}} style={styles.productImage} />
                                </TouchableOpacity>
                                
                            </View>

                            <View style={styles.orderListLableLeftView}>
                                <Text numberOfLines={1} style={styles.offersLables}>Name : {item.name}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}>Type : {item.status}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}>Pcs : {item.qty}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}>Ugx : {item.amount}</Text>
                            </View>
                        </View> 
                        </>
                    ))}
                </ScrollView>
            )}

            {!cartItemsIsLoading &&
                <View style={ styles.cartCheckOutBottomView}>
                
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, alignItems: 'center'}}>
                                <Text style={styles.cartTotalText}>Total: </Text>
                                <Text style={styles.cartTotalText} >{this.formatNumberWithComma(orderListTotal)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cartCheckoutBtnView}>
                        <TouchableOpacity onPress={() => this.removeCatIteamsStorageDetails()} style={styles.cartCheckoutBtn} >
                            <Text style={styles.cartCheckoutText} >Post Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}
}

// https://www.tutofox.com/react-native/tutorial-app-delivery-react-native-api-part-5-cart/