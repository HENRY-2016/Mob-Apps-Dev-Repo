
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

    }
}

componentDidMount() {

    console.log("geting data")
    try 
    {   
        AsyncStorage.getItem('cartItems').then((cart)=>{
        if (cart !== null) {
            // We have data!!
            const cartitems = JSON.parse(cart)
            this.setState({cartItems:cartitems})
            // console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
            // console.log(this.state)
        }
        else {alert("Your Cart is empty")}
        })
    }catch (error) { console.log(error)}
    
}


deleteHandler = (index) => {
    Alert.alert(
        'Are you sure you want to delete this item from your cart?',
        '',
        [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Delete', onPress: () => {
                let updatedCart = this.state.cartItems; /* Clone it first */
                updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
                this.setState(updatedCart); /* Update the state */
            }},
        ],
        { cancelable: false }
    );
}


confirmUserDetials = () => {
    Alert.alert('Thank you','For Ordering with Kulkula gas')
}
quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; // clone the array

    let currentQty = newItems[index]['qty'];

    if(action == 'more')
        {newItems[index]['qty'] = currentQty + 1;} 
    else if(action == 'less')
        {newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;}

    this.setState({ cartItems: newItems }); // set new state
    console.log("newcart Qty is ===>"+ JSON.stringify(newItems))

    // store the new items
    // const orderList = []
    // orderList.push(newItems)
    // AsyncStorage.setItem('orderList',JSON.stringify(orderList));
    AsyncStorage.getItem('orderList').then((orderList)=>{
        if (orderList !== null) 
        {
            // We have data!!
            AsyncStorage.setItem('orderList',JSON.stringify(newItems));
        }
        else
        {AsyncStorage.setItem('orderList',JSON.stringify(newItems));}
    })
    .catch((err)=>{alert(err)})
    

}

subtotalPrice = () => {
    const { cartItems } = this.state;
    if(cartItems)
    {
        let newtotal = cartItems.reduce((sum, item) => sum + ( item.qty * item.amount), 0 );
        console.log("newTotal :" + newtotal);
        // store the new total
        const orderListTotal = newtotal;
        AsyncStorage.setItem('orderListTotal',JSON.stringify(orderListTotal));
        return this.formatNumberWithComma(newtotal);
    }
    return 0;
}


removeCatIteamsStorageDetails = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('cartItems');
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

continueToCheckOut = () =>
{
    // store intia1 Oder List with cartItems
    console.log("....."+JSON.stringify(this.cartItems))
    AsyncStorage.setItem('orderList',JSON.stringify(this.cartItems));
}

render() {


    const { cartItems, cartItemsIsLoading} = this.state;

    return (
        <View style={styles.mainView}>
    
            <View style={styles.topNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Your Shopping Cart</Text>
                </View>
                <View style={styles.cartCartInconView}>
                    <Ionicons name="ios-cart" size={30} style={styles.cartCartIncon} />
                </View>
                <View style={styles.cartCartNumberView}>
                    {/* <Text  style={styles.cartCartNumberText}>3</Text> */}
                </View>
            </View>


            {cartItemsIsLoading ? (
                <View style={[styles.centerElement, {height: 300}]}>
                    <ActivityIndicator size="large" color="#ef5739" />
                </View>
            ) : (
                <ScrollView>
                    {cartItems && cartItems.map((item, i) => (
                        <>
                        <View key={i} style={styles.offersMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity  style={{paddingRight: 10}}>
                                    <Image source={{uri:this.removedoubleQuotesFromImg(item.image)}} style={styles.productImage} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.offersLableLeftView}>
                                <Text numberOfLines={1} style={styles.offersLables}>{item.name}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}>{item.status}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}>Ugx: {this.formatNumberWithComma((item.qty * item.amount))}</Text>
                            </View>
                            
                            <View style={[styles.centerElement, {width: 60}]}>
                                <TouchableOpacity style={styles.cartDeletebtn} onPress={() => this.deleteHandler(i)}>
                                    <Ionicons name="md-trash" size={30} color="#ee4d2d" />
                                </TouchableOpacity>
                            </View>
                        </View> 

                        <View style={styles.cartAddSubtractionbtnsView}>
                            <View style={styles.cartAddSubtractionbtnsinnerView}>
                                    <TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={styles.cartsubtractionbtn}>
                                    <Entypo name="circle-with-minus" size={28} style={styles.addsubtractincons} />
                                    </TouchableOpacity>

                                    <Text style={styles.cartQuantityLable}>{item.qty}</Text>
                                    <TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={styles.cartAddbtn}>
                                        <Entypo name="circle-with-plus" size={28} style={styles.addsubtractincons} />
                                    </TouchableOpacity>
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
                                <Text style={styles.cartTotalText} >{this.subtotalPrice()}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cartCheckoutBtnView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderList')} style={styles.cartCheckoutBtn} >
                        {/* <TouchableOpacity onPress={() => this.removeCatIteamsStorageDetails()} style={styles.cartCheckoutBtn} > */}

                            <Text style={styles.cartCheckoutText} >Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}
}

// https://www.tutofox.com/react-native/tutorial-app-delivery-react-native-api-part-5-cart/