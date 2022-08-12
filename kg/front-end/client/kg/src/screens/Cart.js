
import React from 'react';
import { Text, View,TouchableOpacity,TextInput, ScrollView, Image, Alert } from 'react-native';
// https://docs.expo.dev/versions/latest/sdk/picker/
import {Picker} from '@react-native-picker/picker';
import {Entypo ,Ionicons,FontAwesome} from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIpostCustomerOrder,APIpostCustomerRegister, imageurl} from './DataFileApis';
import { COLORS } from './Colours';

export default class Cart extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItems:[],

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



componentDidMount() {

    // console.log("geting data")
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


    const { cartItems, showcheckOutScreen,showCustomerDetailsScreen,NumberOfItems,showCartItemsScreen} = this.state;
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

            {showCartItemsScreen ?<></> : (
                <>
                

                <ScrollView>
                    {cartItems && cartItems.map((item, index) => (
                        <>
                        <View key={index} style={styles.offersMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity  style={{paddingRight: 1}}>
                                    <Image source={{uri:imageurl+item.image}} style={styles.productImage} />
                                    {/* <Image source={{uri:item.thumbnailImage}} style={styles.productImage} /> */}

                                </TouchableOpacity>
                            </View>

                            <View style={styles.offersLableLeftView}>
                                <Text numberOfLines={1} style={styles.offersLables}>{item.name}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}>{item.status}</Text>
                                <Text numberOfLines={1} style={styles.offersLables}> {this.formatNumberWithComma((item.qty * item.amount))}</Text>
                            </View>
                            
                            <View style={[styles.centerElement, {width: 60}]}>
                                <TouchableOpacity style={styles.cartDeletebtn} onPress={() => this.deleteHandler(i)}>
                                    <Ionicons name="md-trash" size={30} color="white" />
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

            {/* {!showCartItemsScreen &&
                
            } */}



            { showCustomerDetailsScreen ? <></>:

                (
                    <>
                    <ScrollView>
                    <View style={styles.orderListDetailsView}>
                

                        <View style={styles.orderListDetailsText} >
                            <View style={{height:20}} ></View>
                            {/* <Text style={styles.nextbtnText} >Customer Order Details</Text> */}
                            <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                            placeholderTextColor = "#fff" 
                            maxLength={10} keyboardType="numeric" 
                            />
                            <Text style={styles.offersLables}>Select Delivery Method</Text> 
                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={deliveryMethodValue}
                                    onValueChange={(itemValue, itemIndex) =>this.setdeliveryMethodValue(itemValue)}>
                                        <Picker.Item label="" />
                                        <Picker.Item label="Pick Up" value="Pick Up" />
                                    <Picker.Item label="Deliver" value="Deliver" />
                                </Picker>
                            </View>

                            <Text style={styles.offersLables}>Select Payment Method</Text> 
                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={paymentMethodValue}
                                    onValueChange={(itemValue, itemIndex) => this.setpaymentMethodValue(itemValue)}>
                                    <Picker.Item label=" " />
                                    <Picker.Item label="By Bank" value="By Bank" />
                                    <Picker.Item label="Mobile Money" value="Mobile Money" />
                                    <Picker.Item label="Cash On Pick Up" value="Cash On Pick Up" />
                                    <Picker.Item label="Cash On Delivery" value="Cash On Delivery" />

                                </Picker>
                            </View>
                            <Text style={styles.offersLables}>Use Our Accounts From About us For Processing Payments (Thank You)</Text> 
                            <View style={{height:30}} ></View>
                        </View>
                    </View> 
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={this.continueToCat} style={styles.offersProcedbtn} >
                            <Text style={styles.nextbtnText} >Continue</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={{height:17}} ></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={this.backToCartScreen} style={styles.offersProcedbtn} >
                            <Text style={styles.nextbtnText} >Back</Text> 
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </>)
            }





        {/* Order list screen backToCartScreen */}
            {  showcheckOutScreen ?<></>:
                <>
                <ScrollView>

                <View style={styles.orderListDetailsView}>
                    

                    <View style={styles.orderListDetailsText} >
                        <View style={{height:20}} ></View>
                        <Text style={styles.nextbtnText} >Customer Order Summary</Text>
                        {/* <View style={{height:5}} ></View> */}
                        <Text style={styles.customerOrderDetailsLablesTitles}>Phone Number:</Text>
                        {/* <View style={{height:8}} ></View> */}
                        <Text style={styles.customerOrderDetailsLables}> {UserPhone}</Text>
                        {/* <View style={{height:5}} ></View> */}
                        <Text style={styles.customerOrderDetailsLablesTitles}>Delivery Method:</Text>
                        {/* <View style={{height:8}} ></View> */}
                        <Text style={styles.customerOrderDetailsLables}> {deliveryMethodValue}</Text>
                        {/* <View style={{height:5}} ></View> */}
                        <Text style={styles.customerOrderDetailsLablesTitles}>Payment Method:</Text>
                        {/* <View style={{height:8}} ></View> */}
                        <Text style={styles.customerOrderDetailsLables}> {paymentMethodValue }</Text>
                        <View style={{height:20}} ></View>

                        {/* <Text style={styles.offersLables}>Delivery Method</Text>  */}
                        {/* <Picker style={styles.input}
                            selectedValue={deliveryMethodValue}
                            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="select" />
                            <Picker.Item label="Pick Up" value="Pick Up" />
                            <Picker.Item label="Deliver" value="Deliver" />
                        </Picker> */}
                        
                        {/* <Text style={styles.offersLables}>Payment Method</Text> 
                        <Picker style={styles.input}
                            selectedValue={paymentMethodValue}
                            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                        >
                            <Picker.Item label="select" />
                            <Picker.Item label="Cash on delivery" value="Cash on delivery" />
                            <Picker.Item label="Mobile money" value="Mobile money" />
                        </Picker> */}
                        <Text style={styles.offersLables}>Use Our Accounts From About us For Processing Payments (Thank You)</Text> 
                        <View style={{height:30}} ></View>

                    </View>
                </View>

                    {cartItems && cartItems.map((item, index) => (
                        <>
                        <View key={index} style={styles.orderListMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity  style={{paddingRight: 10}}>
                                    <Image source={{uri:imageurl+item.image}} style={styles.productImage} />
                                </TouchableOpacity>
                                
                            </View>

                            <View style={styles.orderListLableLeftView}>
                                <Text numberOfLines={1} style={styles.orderListLables}> {item.name}</Text>
                                <Text numberOfLines={1} style={styles.orderListLables}> {item.status}</Text>
                                <Text numberOfLines={1} style={styles.orderListLables}> {item.qty} pcs</Text>
                                <Text numberOfLines={1} style={styles.orderListLables}> {this.formatNumberWithComma(item.amount)}</Text>
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
            
        </View>
    );
}
}

// https://www.tutofox.com/react-native/tutorial-app-delivery-react-native-api-part-5-cart/