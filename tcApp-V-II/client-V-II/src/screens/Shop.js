
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity,Platform, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';

import styles from "./stylesheet";
import {    Ionicons,Entypo, MaterialCommunityIcons,AntDesign,FontAwesome
        } from '@expo/vector-icons';

import axios from "axios";
import {APIListAllStoreItems,APIListAllDealsItems,APIPostCustomerOrder,ImageUrl} from './DataFileApis';
import { COLORS } from './Colours';
import { formatNumberWithComma,addItemsToCart,EMPTY_INPUTS_ERROR,
        clearNumberOfItemsFromStorage,removeCatItemsStorageDetails 
    } from './Functions';

export default class Shop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
                StoreItems:[],
                cartItems:[],
                DealsItems:[],

                // Screens
                DoNotShowStoreScreen:false,
                DoNotShowMyCartScreen:true,
                DoNotShowDealsScreen:true,
                DoNotShowMyOrdersScreen:true,

                // my cart 
                DoNotShowShoppingCartScreen:false,
                DoNotShowCheckOutScreen:true,
                DoNotShowCheckOutSummaryScreen:true,
                DoNotShowCheckOutDetailsScreen:false,

                // ,,,,
                NumberOfItems:'',
                CustomerType:'',
                TcNumber:'',
                CustomerName:'',
                CustomerMobile:'',
                CustomerEmail:'',
                DeliveryMethod:'',
                PaymentMethod:''

        }
        
    }

UNSAFE_componentWillMount()
{
    axios.get(APIListAllStoreItems)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({StoreItems:[...JSON.parse(results)]})
        })
    .catch(err=>{})
    axios.get(APIListAllDealsItems)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({DealsItems:[...JSON.parse(results)]})
        // console.log(this.state.DealsItems)
        })
    .catch(err=>{Alert.alert("Error","Can Not Load Products\n\n")})

}
    
componentDidMount() {this.showStoreScreen()}

setCustomerType = (text) =>  {this.setState({CustomerType:text})}
setDeliveryMethod = (text) =>  {this.setState({DeliveryMethod:text})}
setPaymentMethod = (text) =>  {this.setState({PaymentMethod:text})}
setTcNumber = (text) =>  {this.setState({TcNumber:text})}
setCustomerName = (text) =>  {this.setState({CustomerName:text})}
setCustomerMobile = (text) =>  {this.setState({CustomerMobile:text})}
setCustomerEmail = (text) =>  {this.setState({CustomerEmail:text})}


showStoreScreen = () =>
{
    this.setState({DoNotShowMyCartScreen:true})
    this.setState({DoNotShowDealsScreen:true})
    this.setState({DoNotShowMyOrdersScreen:true})
    this.setState({DoNotShowStoreScreen:false})
}
getNumberOfItems = () =>
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}

}
showMyCartScreen = () =>
{
    try 
    {   
        AsyncStorage.getItem('cartItems').then((cart)=>{
        if (cart !== null) {
            // We have data!!
            const items = JSON.parse(cart)
            this.setState({cartItems:items})
        }
        else {Alert.alert("Warning","Your Cart is empty")}
        })
    }catch (error) { console.log(error)}
    this.getNumberOfItems();
    this.setState({DoNotShowMyOrdersScreen:true})
    this.setState({DoNotShowStoreScreen:true})
    this.setState({DoNotShowDealsScreen:true})
    this.setState({DoNotShowMyCartScreen:false})
}
showMyOrdersScreen = () =>
{
    this.setState({DoNotShowStoreScreen:true})
    this.setState({DoNotShowDealsScreen:true})
    this.setState({DoNotShowMyCartScreen:true})
    this.setState({DoNotShowMyOrdersScreen:false})
}

showDealsScreen = () =>
{
    this.setState({DoNotShowMyCartScreen:true})
    this.setState({DoNotShowStoreScreen:true})
    this.setState({DoNotShowMyOrdersScreen:true})
    this.setState({DoNotShowDealsScreen:false})
}

showShoppingCartScreen = () =>
{
    this.setState({DoNotShowCheckOutScreen:true})
    this.setState({DoNotShowShoppingCartScreen:false})
}

showCheckOutScreen = () =>
{
    this.setState({DoNotShowShoppingCartScreen:true})
    this.setState({DoNotShowCheckOutScreen:false})
}

addItemsToCartAndCount = (index,StoreItems,Store) =>
{
    addItemsToCart(index,StoreItems,Store)
    this.getNumberOfItems();
}
showCheckOutSummaryScreenOriginal = () =>
{
    this.setState({DoNotShowCheckOutDetailsScreen:true})
    this.setState({DoNotShowCheckOutSummaryScreen:false})
}
showCheckOutSummaryScreen = () =>
{
    let customerType = this.state.CustomerType;
    let phone = this.state.CustomerMobile;
    let name = this.state.CustomerName;
    let TcNumber = this.state.TcNumber;
    let email = this.state.CustomerEmail;
    let deliveryMethod = this.state.DeliveryMethod;
    let paymentMethod = this.state.PaymentMethod;

    if (customerType == "Club Member")
    {
        if ((TcNumber.length == 0)||(phone.length == 0)||(paymentMethod.length == '')||(deliveryMethod.length == ''))
        {Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
        else
        {
            this.setState({DoNotShowCheckOutDetailsScreen:true})
            this.setState({DoNotShowCheckOutSummaryScreen:false})
        }
    }
    else
    {
        if ((name.length == 0)||(phone.length == 0)||(email.length == 0)||(paymentMethod == '')||(deliveryMethod == ''))
        {Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
        else
        {
            this.setState({DoNotShowCheckOutDetailsScreen:true})
            this.setState({DoNotShowCheckOutSummaryScreen:false})
        }
    }
}

showCheckOutDetailsScreen = () =>
{
    this.setState({DoNotShowCheckOutSummaryScreen:true})
    this.setState({DoNotShowCheckOutDetailsScreen:false})
}




deleteHandler = (index) => 
{
    Alert.alert(
        "Are You Sure You Want To Delete This Item From Your Cart?",
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
    this.getNumberOfItems();
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
        let newTotal = cartItems.reduce((sum, item) => sum + ( item.qty * item.amount), 0 );
        return formatNumberWithComma(newTotal);
    }
    return 0;
}

postCustomerOrderDetails =  async () => 
{
    let customerProducts = this.state.cartItems;
    
    if (customerProducts.length == 0)
    {
        Alert.alert("Sorry Customer","\n\n You Have No Items For Ordering")
    }
    
    else
    {
        let orderList = JSON.stringify([...this.state.cartItems]);
        let amount = this.subtotalPrice();
        let customerType = this.state.CustomerType;
        let phone = this.state.CustomerMobile;
        let name = this.state.CustomerName;
        let tcNumber = this.state.TcNumber;
        let email = this.state.CustomerEmail;
        let deliveryMethod = this.state.DeliveryMethod;
        let paymentMethod = this.state.PaymentMethod;

        try
        {
            // post data
            const d = new Date();
            let month = d.getMonth();
            let day = d.getDay();
            let hour = d.getHours();  
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();  
            let orderNumber = "#"+month+day+hour+minutes+seconds;
            // console.log(APIPostCustomerOrder)
            const orderRequest = await axios.post(APIPostCustomerOrder,
                {
                    "Phone":phone,
                    "Reference":orderNumber,
                    "Amount":amount,
                    "Name":name,
                    "TcNumber":tcNumber,
                    "Email":email,
                    "OrderListArray":orderList,
                    "DeliveryMethod":deliveryMethod,
                    "PaymentMethod":paymentMethod,
                }
            )
            
            let result = orderRequest.data.status;
            Alert.alert("Order Status",result);
            removeCatItemsStorageDetails ();
            clearNumberOfItemsFromStorage();
            this.setState({cartItems:[]})
            this.showStoreScreen();
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n")
                console.log(error);

            };
    }

}
    render() {
        
        const { StoreItems,cartItems,NumberOfItems,CustomerType} = this.state;
        const { CustomerEmail,CustomerName,CustomerMobile,TcNumber,DeliveryMethod,PaymentMethod} = this.state;
        const {DoNotShowStoreScreen,DoNotShowMyCartScreen,DoNotShowMyOrdersScreen } = this.state;
        const { DoNotShowShoppingCartScreen,DoNotShowCheckOutScreen,DoNotShowCheckOutSummaryScreen,DoNotShowCheckOutDetailsScreen} = this.state;
    
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
                
                    <View style={styles.mainChatView}>
                        <TouchableOpacity style={styles.ShopTopIconsBtn} onPress={this.showMyCartScreen}>
                            <AntDesign style={styles.ShopTopIcons1} name="shoppingcart" size={35} color="white" />
                        </TouchableOpacity>
                        <Text style={[styles.ShopTopTextNumber]} >{NumberOfItems}</Text>

                        <View style={{width:20}} ></View>

                        <TouchableOpacity style={styles.ShopTopIcons2} onPress={this.showMyOrdersScreen}>
                            <Entypo name="user" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView}>
                        <Text style={styles.MainTopHeaderTextLabel}> Shop Tc Products Online </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>


        
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Home Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowStoreScreen ?<></>:(<>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {StoreItems && StoreItems.map((item, index) => (
                                <View key={index}>
                                <View style={styles.ShoppingCardMainListView}>

                                    <View style={styles.ShoppingImageRightView}>
                                        <TouchableOpacity>
                                            <Image source={{uri: ImageUrl+item.image}} style={styles.ShoppingImage} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.ShoppingTextLeftView}>
                                        <Text  style={styles.ShoppingTexts}> {item.Name}</Text>
                                        <Text numberOfLines={2}  style={styles.ShoppingTexts}> {item.Text}</Text>
                                        <Text  style={styles.ShoppingTexts}> {formatNumberWithComma(item.Amount)}</Text>
                                        <TouchableOpacity style={styles.ShoppingAddToCartBtn} onPress={()=>this.addItemsToCartAndCount(index,this.state.StoreItems,'Store')} >
                                        <Text style = {styles.UpdatedBtnText}> Add to cart </Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height:20}}></View>
                                </View>
                            ))}
                            <View style={{alignItems: "center"}}>
                                <TouchableOpacity style={[styles.UpdatedMainNavigationBtn,styles.UpdatedMainNavigationBtn4]} >
                                    <Text style = {styles.NextBtnText} onPress={this.showMyCartScreen} >GO TO CART</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </>) }

                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Employee Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowMyCartScreen ?<></>:(<>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        {/* <Text style={[styles.ScreenTitleText,styles.ScreenTitleText1]} >Your Shopping Cart Has :: {NumberOfItems} :: Item(s)</Text> */}
                        {DoNotShowShoppingCartScreen?<></>:(<>
                        <View style={{height:75}} ></View>
                            {cartItems && cartItems.map((item, index) => (<>
                                <View key={index}>
                                    <View  style={styles.ShoppingCardMainListView}>
                                        <View style={styles.ShoppingImageRightView}>
                                                <TouchableOpacity>
                                                    <Image source={{uri: ImageUrl+item.image}} style={styles.ShoppingImage} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={styles.ShoppingTextLeftView}>
                                                <Text  style={styles.ShoppingTexts}>{item.name}</Text>
                                                <Text  style={styles.ShoppingTexts}>{item.status}</Text>
                                                <Text  style={styles.ShoppingTexts}> {formatNumberWithComma((item.qty * item.amount))}</Text>
                                            
                                                <View style={styles.cartAddSubtractionBtnView}> 
                                                    <TouchableOpacity onPress={() => this.quantityHandler('less', index)} style={styles.cartSubtractionBtn}>
                                                    <Entypo name="circle-with-minus" size={30} style={styles.addSubtractIcons} />
                                                    </TouchableOpacity>

                                                    <Text style={styles.cartQuantityText}>{item.qty}</Text>
                                                    <TouchableOpacity onPress={() => this.quantityHandler('more', index)} style={styles.cartAddBtn}>
                                                        <Entypo name="circle-with-plus" size={30} style={styles.addSubtractIcons} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={styles.cartAddBtn} onPress={() => this.deleteHandler(index)}>
                                                        <Ionicons name="md-trash" size={30} style={styles.deleteIcons} />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                    </View>
                                </View>
                                <View style={ styles.cartCheckOutBottomView}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                                            <View style={{flexDirection: 'row', paddingLeft: 20, marginTop:10, paddingRight: 20, alignItems: 'center'}}>
                                                <Text style={styles.cartTotalText}>Total: {this.subtotalPrice()} </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.cartCheckoutBtnView}>
                                        <TouchableOpacity onPress={() => this.showCheckOutScreen()} style={styles.cartCheckoutBtn} >
                                            <Text style={styles.cartCheckoutText} >Check Out</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>))}
                        </>)}


                        {DoNotShowCheckOutScreen ?<></>:(<>
                            <View style={{height:20}} ></View>
                            {DoNotShowCheckOutDetailsScreen?<></>:(<>
                            <Text style={[styles.ScreenTitleText,styles.ScreenTitleText1]} >Customer Details</Text>
                            <View style={styles.MainNavigationBtnView}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <View style={styles.ArrowMainView}>
                                        <AntDesign name="rightcircle" size={30} color={COLORS.colourNumberOne} />
                                    </View>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.UpdatedMainNavigationBtnStyle,styles.UpdatedMainNavigationBtnWidth1]} 
                                            onPress={()=>this.setCustomerType('Club Member')} >
                                        <Text style = {styles.UpdatedBtnText}> Club Member  </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.UpdatedMainNavigationBtnStyle,styles.UpdatedMainNavigationBtnWidth1]} 
                                        onPress={()=>this.setCustomerType('None Member')} >
                                        <Text style = {styles.UpdatedBtnText}> None Member </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <View style={styles.ArrowMainView}>
                                        <AntDesign name="leftcircle" size={30} color={COLORS.colourNumberOne} />
                                    </View>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>

                            {CustomerType == "Club Member"?(<>

                                <TextInput style={styles.UpdatedInput } placeholder="Name" onChangeText={text => this.setTcNumber(text)}
                                placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                                <TextInput style={styles.UpdatedInput} placeholder="Mobile Number" onChangeText={text => this.setCustomerMobile(text)}
                                placeholderTextColor = "#5800c4" maxLength={10} keyboardType='numeric' selectionColor={COLORS.colourNumberOne} />  

                                <TextInput style={styles.UpdatedInput} placeholder="Pick Up / Deliver" onChangeText={text => this.setDeliveryMethod(text)}
                                placeholderTextColor = "#5800c4"  selectionColor={COLORS.colourNumberOne} /> 

                                <TextInput style={styles.UpdatedInput} placeholder="Payment Method" onChangeText={text => this.setPaymentMethod(text)}
                                placeholderTextColor = "#5800c4"  selectionColor={COLORS.colourNumberOne} /> 

                                </>):(<>
                                    <TextInput style={styles.UpdatedInput} placeholder="Full Name" onChangeText={text => this.setCustomerName(text)}
                                    placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                                    <TextInput style={styles.UpdatedInput} placeholder="Mobile Number" onChangeText={text => this.setCustomerMobile(text)}
                                    placeholderTextColor = "#5800c4"  keyboardType='numeric' selectionColor={COLORS.colourNumberOne}/> 

                                    <TextInput style={styles.UpdatedInput} placeholder="Email" onChangeText={text => this.setCustomerEmail(text)}
                                    placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                                    <TextInput style={styles.UpdatedInput} placeholder="Pick Up / Deliver" onChangeText={text => this.setDeliveryMethod(text)}
                                    placeholderTextColor = "#5800c4"  selectionColor={COLORS.colourNumberOne} />  

                                    <TextInput style={styles.UpdatedInput} placeholder="Payment Method" onChangeText={text => this.setPaymentMethod(text)}
                                    placeholderTextColor = "#5800c4"  selectionColor={COLORS.colourNumberOne} /> 

                            </>)}
                            <View style={{alignItems: "center"}}>
                                <View style={{height:20}} ></View>
                                <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn1]} >
                                    <Text style = {styles.UpdatedBtnText} onPress={this.showShoppingCartScreen} >Back</Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                                <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn4]} >
                                    <Text style = {styles.UpdatedBtnText} onPress={this.showCheckOutSummaryScreen} >Continue </Text>
                                </TouchableOpacity>
                            </View>
                            </>)}


                            {DoNotShowCheckOutSummaryScreen?<></>:(<>
                                <Text style={[styles.ScreenTitleText,styles.ScreenTitleText1]} >Your Shopping Details Summary</Text>
                                {CustomerType == "Club Member"?(<>
                                    <Text style={styles.ScreenTitleText} >{TcNumber}</Text>
                                    <Text style={styles.ScreenTitleText} >{CustomerMobile}</Text>
                                    <Text style={styles.ScreenTitleText} >{PaymentMethod}{" "}{" "} :: {" "}{" "}{DeliveryMethod}</Text>
                                </>):(<>
                                    <Text style={styles.ScreenTitleText} >{CustomerName}</Text>
                                    <Text style={styles.ScreenTitleText} >{CustomerMobile}</Text>
                                    <Text style={styles.ScreenTitleText} >{CustomerEmail}</Text>
                                    <Text style={styles.ScreenTitleText} >{PaymentMethod}{" "}{" "} :: {" "}{" "}{DeliveryMethod}</Text>
                                </>)}

                                <View style={{alignItems: "center"}}>
                                    <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn1]} >
                                        <Text style = {styles.UpdatedBtnText} onPress={this.showCheckOutDetailsScreen} >Back</Text>
                                    </TouchableOpacity>
                                </View>


                                {cartItems && cartItems.map((item, index) => (
                                <View key={index}>
                                <View  style={styles.ShoppingCardMainListView2}>
                                <View style={styles.ShoppingImageRightView}>
                                        <TouchableOpacity>
                                            <Image source={{uri: ImageUrl+item.image}} style={styles.ShoppingImage} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.ShoppingTextLeftView}>
                                        <Text  style={styles.ShoppingTexts}>{item.name}</Text>
                                        <Text  style={styles.ShoppingTexts}>{item.status}</Text>
                                        <Text  style={styles.ShoppingTexts}>{item.qty} pc(s)</Text>
                                        <Text  style={styles.ShoppingTexts}> {formatNumberWithComma((item.qty * item.amount))}</Text>
                                    
                                        <View style={styles.cartAddSubtractionBtnView}> 
                                            <Text style={[styles.CartTypeText]} >Type : { item.type}</Text>
                                        </View>
                                    </View>
                                </View>
                                </View>
                            ))}
                            <View style={{height:60}} ></View>
                            <View style={ styles.cartCheckOutBottomView}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                                        <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, alignItems: 'center'}}>
                                            <Text style={styles.cartTotalText}>Total: {this.subtotalPrice()} </Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.cartCheckoutBtnView}>
                                    <TouchableOpacity onPress={() => this.postCustomerOrderDetails()} style={styles.cartCheckoutBtn} >
                                        <Text style={styles.cartCheckoutText} >Post Order</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </>)}
                        </>)}
                    </ScrollView>
                    </>)}

                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Employer Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowMyOrdersScreen ?<></>:(<>
                        <Text style={[styles.ScreenTitleText,styles.ScreenTitleText1]} >Your Order Will Be Listed Here</Text>
                        
                    </>)}
                    
                {/* <View style={styles.MainBottomSpaceView}></View> */}
            </View>
        );
    }
}
