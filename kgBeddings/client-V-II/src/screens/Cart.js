
import React from 'react';
import { Text, View,TouchableOpacity,TextInput, ScrollView, Image, Alert } from 'react-native';
// https://docs.expo.dev/versions/latest/sdk/picker/
import {Picker} from '@react-native-picker/picker';
import {Entypo ,Ionicons,FontAwesome} from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIpostCustomerOrder,APIpostCustomerRegister, imageUrl} from './DataFileApis';
import { COLORS } from './Colours';
import { 
    checkInternetConnection,noInternetConnectionView,
    } from './Functions';
export default class Cart extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItems:[],
    
        IsDeviceConnected:true,
        // screens
        showCartItemsScreen: false,
        showcheckOutScreen:true,
        showCustomerDetailsScreen:true,

        NumberOfItems:'',
        UserName:'',
        UserPhone:'',
        UserAlternativePhone:'',
        UserAddress:'',
        orderPostError:'',
        orderNumber:'',

        // options
        deliveryMethodValue:'',
        paymentMethodValue:'',

        // customer account
        customerNotSignedIn:true,

        // user sign up
        // paymentMethodValue:'',
        SelectedLanguage:'',
        SignUpUserEmail:'',
        SignUpUserPassword:'',

    }

}
UNSAFE_componentWillMount () {   
    this.LoadCartItems();
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}

componentDidMount() {this.LoadCartItems()}

refreshScreenNow = () =>{checkInternetConnection().then(Status=> {
    this.LoadCartItems();this.setState({IsDeviceConnected:Status})})}

displayCheckOutScreen = () =>
{
    this.setState({showCartItemsScreen:true});
    this.setState({showCustomerDetailsScreen:true});
    this.setState({showcheckOutScreen:false});
}

displayCustomerDetailsScreen = () =>
{
    this.setState({showCartItemsScreen:true});
    this.setState({showcheckOutScreen:true});
    this.setState({showCustomerDetailsScreen:false});

}
signInCustomer = async () =>
{
    console.log(this.state.paymentMethodValue+this.state.onValueChange+this.state.SignUpUserEmail+this.state.SignUpUserPassword)
    // this.setState({customerNotSignedIn:false})
    if ((this.state.paymentMethodValue.length == 0) ||(this.state.onValueChange.length == 0) ||(this.state.SignUpUserEmail.length == 0) || (this.state.SignUpUserPassword.length == 0))
            {Alert.alert('Warning','Please All Fields Are Required ')}
        else
        {
            try
            {
                // post data
                const registerrequest = await axios.post(APIpostCustomerRegister,
                    {
                        "Name" :this.state.paymentMethodValue,
                        "Phone" :this.state.onValueChange,
                        "Email"  :this.state.SignUpUserEmail,
                        "Password"  :this.state.SignUpUserPassword,
                    },
                )
                Alert.alert("Success","Your \n\n"+registerrequest.data.status);
                try 
                {
                    this.setState({UserName:this.state.paymentMethodValue})
                    this.setState({UserPhone:this.state.onValueChange})
                    
                    await AsyncStorage.setItem('UserName',this.state.paymentMethodValue);
                    await AsyncStorage.setItem('UserPhone',this.state.onValueChange);

                    this.setState({customerNotSignedIn:false})
                } 
                catch (error) {console.log(error)}
            }

            catch (error)
                {
                    // setRegisterRequestError(error.message)
                    Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+error)
                };
        }
}
continueToCat=() =>
{


    if ((this.state.UserPhone.length == 0) || (this.state.UserPhone.length < 10) || (this.state.deliveryMethodValue.length == 0 ) || (this.state.paymentMethodValue.length == 0))
        {Alert.alert("Warning","\n \n Invalid Phone Number \n\n Or  \n Delivery Method,\n Payment Method, \n \n Can Not Be Empty")}

    else 
    {
        this.setState({showCartItemsScreen:true});
        this.setState({showcheckOutScreen:false});
        this.setState({showCustomerDetailsScreen:true});
    }

    
    // console.log("Function called.....")

    // console.log("=======>"+this.state.paymentMethodValue)
    // console.log("=======>"+ this.state.deliveryMethodValue)
}
backToCartScreen = () =>
{
    this.setState({showCartItemsScreen:false});
    this.setState({showcheckOutScreen:true});
    this.setState({showCustomerDetailsScreen:true});
}
setorderPostError = (error) =>{this.setState({orderPostError:error})}
setUserName = (text) =>{this.setState({UserName:text});}
setUserPhone = (text) =>{this.setState({UserPhone:text});}
setUserAlternativePhone = (text) =>{this.setState({UserAlternativePhone:text});}
setUserAddress = (text) =>{this.setState({UserAddress:text});}
setorderNumber = () => {this.setState({orderNumber:this.orderNumber})}

// sign up
setpaymentMethodValue = (text) =>{this.setState({paymentMethodValue:text});}
setdeliveryMethodValue = (text) =>{this.setState({deliveryMethodValue:text}); }
setSelectedLanguage = (text) =>{this.setState({SelectedLanguage:text});}
setSignUpUserPassword = (text) =>{this.setState({SignUpUserPassword:text});}




LoadCartItems = () =>{
    try 
    {   
        AsyncStorage.getItem('cartItems').then((cart)=>{
        if (cart !== null) {
            // We have data!!
            const cartitems = JSON.parse(cart)
            this.setState({cartItems:cartitems})
            // console.log(this.state);
            
        }
        else {alert("Your Cart is empty")}
        })
        // AsyncStorage.getItem('UserName').then((username)=>{
        // if (username !== null) {this.setState({UserName:username})}
        // })
        // AsyncStorage.getItem('UserPhone').then((phone)=>{
        //     if (phone !== null){this.setState({UserPhone :phone})}
        //     })
    }catch (error) { console.log(error)}
    
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        // console.log("===== geting NumberOfItems")
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
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newNumberOfItems));
            }},
        ],
        { cancelable: false }
    );
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


removedoubleQuotesFromImg = (imageUrl) =>
{
    let formatedUrl =  imageUrl.split('"').join('');
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
    let customerProducts = this.state.cartItems;
    
    
    if (customerProducts.length == 0)
    {
        Alert.alert("Sorry","\n\n You Have No Items For Ordering \n\n Go To Products And Shop")
    }
    
    else
    {
        let orderlist = JSON.stringify([...this.state.cartItems]);
        let amount = this.subtotalPrice();
        let userphone = this.state.UserPhone;
        let DeliveryMethod = this.state.deliveryMethodValue;
        let PaymentMethod = this.state.paymentMethodValue;

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
            console.log(APIpostCustomerOrder)
            const orderrequest = await axios.post(APIpostCustomerOrder,
                {
                    "Phone":userphone,
                    "Reference":ordernumber,
                    "Amount":amount,
                    "OrderListArray":orderlist,
                    "DeliveryMethod":DeliveryMethod,
                    "PaymentMethod":PaymentMethod,
                }
            )
            
            let result = orderrequest.data.status;
            Alert.alert("Order Status",result);
            this.removeCatIteamsStorageDetails ();
            this.clearNumberOfItemsFromStorage();
            this.props.navigation.navigate('Home');
        }

        catch (error)
            {
                console.log("===========>>>>>>>>>>"+error)
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
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


    const { cartItems, IsDeviceConnected,showcheckOutScreen,showCustomerDetailsScreen,NumberOfItems,showCartItemsScreen} = this.state;
    const {deliveryMethodValue,paymentMethodValue} = this.state;
    const {customerNotSignedIn,UserPhone,UserName,} = this.state;
    return (
        <View style={styles.mainView}>
            <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={25} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Shopping Cart </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {IsDeviceConnected ?(<>
            {showCartItemsScreen ?<></> : (
                <>
                

                <ScrollView showsVerticalScrollIndicator={false}>
                    {cartItems && cartItems.map((item, index) => (<>
                        <View>
                            <View key={index} >
                                <View  style={styles.offersMainContainerView}>
                                    <View style={styles.offersimageRightView}>
                                        <TouchableOpacity  style={{paddingRight: 1}}>
                                            <Image source={{uri:imageUrl+item.image}} style={styles.productImage} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.cartLabelLeftView}>
                                        <Text numberOfLines={1} style={styles.offersLabels}>{item.name}</Text>
                                        <View style={{height:5}} ></View>
                                        <Text numberOfLines={1} style={styles.offersLabels}>{item.status}</Text>
                                        <View style={{height:5}} ></View>
                                        <Text numberOfLines={1} style={styles.offersLabels}>UGX : {this.formatNumberWithComma((item.qty * item.amount))}</Text>
                                    </View>
                                    
                                    <View style={[styles.centerElement, {width: 60}]}>
                                        <TouchableOpacity style={styles.cartDeleteBtn} onPress={() => this.deleteHandler(index)}>
                                            <Ionicons name="md-trash" size={30} color="red" />
                                        </TouchableOpacity>
                                    </View>
                                </View> 
                                <View style={styles.cartAddSubtractionBtnView}>
                                    <View style={styles.cartAddSubtractionBtnInnerView}>
                                            <TouchableOpacity onPress={() => this.quantityHandler('less', index)} style={styles.cartSubtrActionBtn}>
                                            <Entypo name="circle-with-minus" size={28} style={styles.addSubtractImgs} />
                                            </TouchableOpacity>

                                            <Text style={styles.cartQuantityLabel}>{item.qty}</Text>
                                            <TouchableOpacity onPress={() => this.quantityHandler('more', index)} style={styles.cartAddBtn}>
                                                <Entypo name="circle-with-plus" size={28} style={styles.addSubtractImgs} />
                                            </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>))}
                    <View style={styles.blankSpaceCartView}></View>
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
                        <TouchableOpacity onPress={this.displayCustomerDetailsScreen} style={styles.cartCheckoutBtn} >
                            <Text style={styles.cartCheckoutText} >Checkout</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
                

                </>
            )}

            {showCustomerDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.orderListDetailsView}>
                

                        <View style={styles.orderListDetailsText} >
                            <View style={{height:20}} ></View>
                            <Text style={styles.offersLabels}>Phone Number</Text> 
                            <TextInput style={styles.input} placeholder="07.........." onChangeText={text => this.setUserPhone(text)} 
                            placeholderTextColor ={COLORS.white} selectionColor={COLORS.colorNumberOne}
                            maxLength={10} keyboardType="numeric" />

                            <Text style={styles.offersLabels}>Your Delivery Method</Text> 
                            <TextInput style={styles.input} placeholder="Deliver | Pick Up" onChangeText={text => this.setdeliveryMethodValue(text)} 
                            placeholderTextColor ={COLORS.white} selectionColor={COLORS.colorNumberOne}/>

                            <Text style={styles.offersLabels}>Your Payment Method {"\n"} Cash By : </Text> 
                            <TextInput style={styles.input} placeholder="On PickUp | On Delivery | MM " onChangeText={text => this.setpaymentMethodValue(text)} 
                            placeholderTextColor ={COLORS.white} selectionColor={COLORS.colorNumberOne}/>

                            <View style={{height:30}} ></View>
                            <View style={{alignItems:'center'}} >
                                <Text style={styles.offersLabels}>Use Our Accounts From</Text> 
                                <Text style={styles.offersLabels}>Social Media Screen</Text> 
                                <Text style={styles.offersLabels}>For Processing Payments</Text> 
                            </View>
                            <View style={{height:30}} ></View>
                        </View>
                    </View> 
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={this.continueToCat} style={styles.offersProceedBtn} >
                            <Text style={styles.nextBtnText} >Continue</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={{height:17}} ></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={this.backToCartScreen} style={styles.offersProceedBtn} >
                            <Text style={styles.nextBtnText} >Back</Text> 
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
            </>)}





        {/* Order list screen backToCartScreen */}
            {  showcheckOutScreen ?<></>:<>
                <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.orderListDetailsView}>

                    <View style={styles.orderListDetailsText} >
                        <View style={{height:20}} ></View>
                        <Text style={styles.nextBtnText1} >Customer Order Summary</Text>
                        <Text style={styles.customerOrderDetailsLabels}>Phone Number: {UserPhone}</Text>
                        <Text style={styles.customerOrderDetailsLabels}>Delivery Method: {deliveryMethodValue}</Text>
                        <Text style={styles.customerOrderDetailsLabels}>Payment Method: {paymentMethodValue }</Text>
                        <View style={{height:30}} ></View>

                        <View style={{alignItems:'center'}} >
                            <Text style={styles.offersLabels}>Use Our Accounts From</Text> 
                            <Text style={styles.offersLabels}>Social Media Screen</Text> 
                            <Text style={styles.offersLabels}>For Processing Payments</Text> 
                        </View>
                        <View style={{height:30}} ></View>

                    </View>
                </View>

                    {cartItems && cartItems.map((item, index) => (
                        <>
                        <View>
                            <View key={index}>
                            <View  style={styles.orderListMainContainerView}>

                                <View style={styles.offersimageRightView}>
                                    <TouchableOpacity  style={{paddingRight: 10}}>
                                        <Image source={{uri:imageUrl+item.image}} style={styles.productImage} />
                                    </TouchableOpacity>
                                    
                                </View>

                                <View style={styles.orderListLabelLeftView}>
                                    <Text  style={styles.orderListLabels}> {item.name}</Text>
                                    <Text  style={styles.orderListLabels}> {item.status}</Text>
                                    <Text  style={styles.orderListLabels}> {item.qty} pcs</Text>
                                    <Text  style={styles.orderListLabels}>UGX : {this.formatNumberWithComma(item.amount)}</Text>
                                </View>
                            </View> 
                            </View> 
                        </View> 
                        </>
                    ))}
                    <View style={styles.blankSpaceCartView}></View>
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
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}

// https://www.tutofox.com/react-native/tutorial-app-delivery-react-native-api-part-5-cart/