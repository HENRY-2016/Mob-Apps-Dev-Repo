
import React from 'react';
import { Text, View, TouchableOpacity,TextInput, ScrollView, Image, Alert } from 'react-native';
import {AntDesign, Entypo ,Ionicons} from '@expo/vector-icons';
import styles from "./stylesheet";
import {APIpostCustomerOrder, imageurl} from './DataFileApis';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Cart extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        // cartItemsNotLoading:true,
        cartItems:[],
        showcheckOutScreen:true,

        NumberOfItems:'',
        UserName:'',
        UserPhone:'',
        UserAlternativePhone:'',
        UserAddress:'',
        orderPostError:'',
        orderNumber:'',
    }

}
displayCheckOutScreen = () =>
{
    console.log("changing state"); 
    // this.setorderNumber(); 
    this.setState({cartItemsIsLoading:true});
    this.setState({showcheckOutScreen:false});
}

backToCartScreen = () =>
{
    this.setState({cartItemsIsLoading:false});
    this.setState({showcheckOutScreen:true});
}
setorderPostError = (error) =>{this.setState({orderPostError:error})}
setUserAlternativePhone = (text) =>{this.setState({UserAlternativePhone:text});}
setUserAddress = (text) =>{this.setState({UserAddress:text});}
setorderNumber = () => {this.setState({orderNumber:this.orderNumber})}

componentDidMount() {

    console.log("geting data")
    try 
    {   
        AsyncStorage.getItem('cartItems').then((cart)=>{
        if (cart !== null) {
            // We have data!!
            const cartitems = JSON.parse(cart)
            this.setState({cartItems:cartitems})
            console.log(this.state);
            
        }
        else {alert("Your Cart is empty")}
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
    

  
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}

}


deleteHandler = (index) => 
{
    Alert.alert(
        'Are you sure you want to delete this item from your cart?',
        '',
        [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Delete', onPress: () => {
                let updatedCart = this.state.cartItems; /* Clone it first */
                updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
                this.setState(updatedCart); /* Update the state */

                // NumberOfItems
                let currentNumberOfItems = this.state.NumberOfItems;
                let newNumberOfItems = currentNumberOfItems -1;
                this.setState({NumberOfItems:newNumberOfItems})
                console.log("Num==="+newNumberOfItems);
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newNumberOfItems));
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
    

}

subtotalPrice = () => {
    const { cartItems } = this.state;
    if(cartItems)
    {
        let newtotal = cartItems.reduce((sum, item) => sum + ( item.qty * item.amount), 0 );
        return this.formatNumberWithComma(newtotal);
    }
    return 0;
}





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

removeCatIteamsStorageDetails = async () => 
{
    try{await AsyncStorage.removeItem ('cartItems');}
    catch (error) { console.log(error)}
};

postCustomerOrderDetails =  async () => 
{
    if ((this.state.UserAlternativePhone.length == 0) && (this.state.UserAddress.length==0))
        {Alert.alert("Warning","Alternative Phone \n Or \n Adress Can Not Be Empty")}
    else 
    {
        let orderlist = JSON.stringify([...this.state.cartItems]);
        let amount = this.subtotalPrice();
        let username = this.state.UserName ;
        let userphone = this.state.UserPhone;
        let ordernumber = this.state.orderNumber;
        let useralternativephone = this.state.UserAlternativePhone;
        let useraddress = this.state.UserAddress;

     
        try
        {
            // post data
            const d = new Date();
            let month = d.getMonth();
            let day = d.getDay();
            let hour = d.getHours();  
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();  
            let ordernumber = "#"+month+day+hour+minutes+seconds;

            const orderrequest = await axios.post(APIpostCustomerOrder,
                {
                    "customer_name":username,
                    "phone" :userphone,
                    "alternative_phone" :useralternativephone,
                    "address"  :useraddress,
                    "orderdetails"  :ordernumber,
                    "amount"  :amount,
                    "status" :"Pending",
                    "orderListArray":orderlist,
                    "placeholder1"  :"placeholder1",
                    "placeholder2"  :"placeholder2"
                }
            )
            
            let result = orderrequest.data.status;
            Alert.alert("Order Status",result);
            this.removeCatIteamsStorageDetails ();
            this.clearNumberOfItemsFromStorage();
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\n  Your Network Connections\n\n"+error)
                // Alert.alert("Order","Posted well\n\n"+error)

            };
    }
}

orderNumber =() => 
{
    const d = new Date();
    let month = d.getMonth();
    let day = d.getDay();
    let hour = d.getHours();  
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();  
    let number = "#"+month+day+hour+minutes+seconds;
    return number;
}

clearNumberOfItemsFromStorage = async () =>
{
    try 
    {   
        await AsyncStorage.removeItem ('NumberOfItems');
        console.log("numbers cleared")

    }catch (error) { console.log(error)}
}
render() {


    const { cartItems, showcheckOutScreen,NumberOfItems,UserPhone,UserName,cartItemsIsLoading} = this.state;

    return (
        <View style={styles.mainView}>
        <View style={styles.mainViewTopSpace} ></View>
            {cartItemsIsLoading ?<></> : (
                <>
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
                        <Text  style={{marginLeft:16, fontSize:24, color:'#ffffff'}}>{NumberOfItems}</Text>
                    </View>
            </View>

                <ScrollView>
                    {cartItems && cartItems.map((item, i) => (
                        <>
                        <View key={i} style={styles.offersMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity  style={{paddingRight: 1}}>
                                    <Image source={{uri:imageurl+item.image}} style={styles.productImage} />
                                    {/* <Image source={{uri:item.thumbnailImage}} style={styles.productImage} /> */}

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
                </>
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
                        <TouchableOpacity onPress={this.displayCheckOutScreen} style={styles.cartCheckoutBtn} >
                        {/* <TouchableOpacity onPress={this.setorderNumber} style={styles.cartCheckoutBtn} > */}

                            <Text style={styles.cartCheckoutText} >Checkout</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
            }









        {/* Order list screen backToCartScreen */}
            {  showcheckOutScreen ?<></>:
                <>
                <View style={styles.topNavigationHeader}>
                    <View style={styles.topNavigationHeaderArrowView} >
                        <TouchableOpacity onPress={this.backToCartScreen}>
                            <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.topNavigationHeaderTextView}>
                        <Text style={styles.topNavigationHeaderText}>Your Order List</Text>
                    </View>

                    <View style={styles.cartCartInconView}>
                        <Ionicons name="ios-cart" size={30} style={styles.cartCartIncon} />
                    </View>
                    <View style={styles.cartCartNumberView}>
                        <Text  style={{marginLeft:16, fontSize:24, color:'#ffffff'}}>{NumberOfItems}</Text>
                    </View>
                    
                </View>


                <ScrollView>
                    <View style={styles.orderListDetailsView}>
                        <View style={styles.orderListDetailsText} >
                            <Text style={styles.offersLables}>Name: {UserName} </Text>
                            <Text style={styles.offersLables}>Phone: {UserPhone}</Text>
                            <TextInput style={styles.input} placeholder="Alternative Phone" onChangeText={text=>this.setUserAlternativePhone(text)} placeholderTextColor = "#fff" />
                            <TextInput style={styles.input} placeholder="Delivery Adress" onChangeText={text => this.setUserAddress(text)} placeholderTextColor = "#fff"  />
                        </View>
                    </View>

                    {cartItems && cartItems.map((item, i) => (
                        <>
                        <View key={i} style={styles.orderListMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity  style={{paddingRight: 10}}>
                                    <Image source={{uri:imageurl+item.image}} style={styles.productImage} />
                                </TouchableOpacity>
                                
                            </View>

                            <View style={styles.orderListLableLeftView}>
                                <Text numberOfLines={1} style={styles.orderListLables}>Name : {item.name}</Text>
                                <Text numberOfLines={1} style={styles.orderListLables}>Type : {item.status}</Text>
                                <Text numberOfLines={1} style={styles.orderListLables}>Pcs : {item.qty}</Text>
                                <Text numberOfLines={1} style={styles.orderListLables}>Ugx : {this.formatNumberWithComma(item.amount)}</Text>
                            </View>
                        </View> 
                        </>
                    ))}
                </ScrollView>

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
                        <TouchableOpacity onPress={() => this.postCustomerOrderDetails()} style={styles.cartCheckoutBtn} >
                            <Text style={styles.cartCheckoutText} >Post Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            }
        </View>
    );
}
}

// https://www.tutofox.com/react-native/tutorial-app-delivery-react-native-api-part-5-cart/