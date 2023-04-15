
import React from 'react';
import { Text, View,ActivityIndicator,Alert, TouchableOpacity,TextInput, ScrollView, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import {APIListAllCustomerOrders,APIListCustomerOrderListArray, imageUrl} from './DataFileApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { List } from 'react-native-paper';
import { 
    checkInternetConnection,noInternetConnectionView,
    } from './Functions';
import { Entypo,FontAwesome,Ionicons } from '@expo/vector-icons';
import { COLORS } from './Colours';

const numColumns = 2;
const formatData = (data,numColumns) =>
{
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !==0)
    {
        data.push({key:`blank-${numberOfElementsLastRow}`,empty:true});
        numberOfElementsLastRow = numberOfElementsLastRow +1;
    }
    return data;
}
export default class MyOrders extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        IsDeviceConnected:true,
        cartItems: [],
        UserName:'',

        UserPhone:'',
        NumberOfItems:'',
        OrderListArrary:[],

        CustomerNotSignedIn:true,
        // screens
        DoNotOrdersViewScreen:true,
        ShowSplashScreen:false,
        CustomerDetailsFound:true,
    }
    
}

UNSAFE_componentWillMount () {   
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}
componentDidMount() {this.numberOfCartItems();}
componentWillUnmount(){clearInterval(this.numberOfCartItems)}

refreshScreenNow = () =>{checkInternetConnection().then(Status=> {
    this.setState({IsDeviceConnected:Status})})}

numberOfCartItems = ()=>{ setInterval(this.getNumberOfItems,1000);}
getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};
getAllCustomerOrders = () =>
{
    axios.get(APIListAllCustomerOrders+this.state.UserPhone)
    .then(res => {
        let jsonstring =JSON.stringify(res.data); 
        let results =JSON.parse(jsonstring ); 
        this.setState({cartItems:[...results]})
        if (results.length === 0)
            {this.setState({CustomerDetailsFound:false})}
        })
    .catch(err=>{console.log(err);})
    // console.log("component loaded")
}

displayCustomerOrderListArrary = (id) =>
{
    axios.get(APIListCustomerOrderListArray+id)
    .then(res => {
        let jsonstring =JSON.stringify(res.data); 
        let results =JSON.parse(jsonstring ); 
        this.setState({OrderListArrary:[...results]})
        // console.log(this.state)
        })
    .catch(err=>{console.log(err);})
}

setUserPhone = (text) =>{this.setState({UserPhone:text});}
continueToOrdersView = () =>
{

    this.getAllCustomerOrders()
    setTimeout(()=>{this.setState({CustomerNotSignedIn:false})},1000)
    this.setState({ShowSplashScreen:true});
    setTimeout(()=>{this.setState({ShowSplashScreen:false})},4000)
}

formatNumberWithComma(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}


render() {
    
    const { IsDeviceConnected,cartItems,ShowSplashScreen,CustomerDetailsFound, CustomerNotSignedIn ,UserPhone,OrderListArrary,NumberOfItems} = this.state;

    return (
        
        <View style={styles.mainView}>
        <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}>My Orders </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {IsDeviceConnected ?(<>
            { CustomerNotSignedIn ? <>
                <View style={{marginBottom:'50%',marginTop:'50%'}} >
                    <View style={styles.orderListDetailsView}>
                        <View style={styles.orderListDetailsText} >
                            <View style={{height:20}} ></View>
                            <Text style={styles.nextBtnText1} >Number Used When Ordering</Text>
                            <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                            placeholderTextColor = {COLORS.colorNumberOne} maxLength={10} keyboardType="numeric"/>
                        </View>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity onPress={this.continueToOrdersView} style={styles.offersProceedBtn} >
                            <Text style={styles.nextBtnText} >Continue</Text> 
                        </TouchableOpacity>
                    </View>
                </View>
                </> :
                <>
                {ShowSplashScreen ?<> 
                    <View style={{marginBottom:'50%',marginTop:'50%'}} >
                        <View style={styles.splashScreenTextView}>
                            <Text style={styles.splashScreenText}>Checking...</Text>
                        </View>
                        <View style={{height:80}} ></View>
                        <View style={styles.activityIndicatorView}>
                            <View style={styles.activityIndicatorContainer}>
                                <ActivityIndicator size="large" color={COLORS.colorNumberOne} />
                            </View>
                        </View>
                    </View>
                    </>:<>
                    
                    <View style={{height:20}}></View>
                    <View style={styles.profileTopView}>
                        <View style={styles.profileUserCard}>
                            <View style={styles.profileLeftUserView}>
                                <Entypo name="user" size={100} style={styles.profileLeftUserIcones}/>
                            </View>
                            <View>
                                <Text style = {styles.profileLabel} >Number</Text>
                                <Text style = {styles.profileLabel} >{UserPhone}</Text> 
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                    {/* If no results found */}
                    {CustomerDetailsFound?<>
                          {/* If Results are  Found */}
                        
                        {cartItems && cartItems.map((item, i) => (
                            <View key={i}>
                                <List.Section>
                                    <List.Accordion
                                        title={"Number "+ item.Reference}>
                                        
                                        <View style={styles.orderListView}>
                                            <Text  style={styles.orderListLabels}>{"Phone :" + " "+ item.Phone}</Text>
                                            <Text  style={styles.orderListLabels}>{"Order Date :" + " "+ item.created_at.slice(0, 10)}</Text>
                                            <Text  style={styles.orderListLabels}>{"Delivery Method :" +" "+ item.DeliveryMethod}</Text>
                                            <Text  style={styles.orderListLabels}>{"Payment Method : " + " "+ item.PaymentMethod}</Text>
                                            <Text  style={styles.orderListLabels}>{"Status :" + " "+ item.Status}</Text>

                                        </View>
                                        <View style={{height:20}}></View>
                                        <View style={styles.ordersDetailsBtnView}>
                                            <TouchableOpacity onPress={()=>{this.displayCustomerOrderListArrary(item.id)}} style={styles.orderDetailsBtn} >
                                                <Text style={styles.orderDetailsBtnText} >Details</Text> 
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:20}}></View>
                                        
                                        {OrderListArrary && OrderListArrary.map((list, s) => (
                                            <>
                                            <View key={s} >
                                                <View  style={styles.ordersMainContainerView}>
                                                    <View style={styles.offersImageRightView}>
                                                        <TouchableOpacity>
                                                            <Image source={{uri: imageUrl+list.image}} style={styles.productImage} />
                                                        </TouchableOpacity>
                                                    </View>

                                                        <View style={styles.offersLabelLeftView}>
                                                            <Text numberOfLines={1} style={styles.orderListLabels}>{list.name}</Text>
                                                            <Text numberOfLines={1} style={styles.orderListLabels}>{list.status}</Text>
                                                            <Text numberOfLines={1} style={styles.orderListLabels}>{list.qty}</Text>
                                                            <Text numberOfLines={1} style={styles.orderListLabels}>{this.formatNumberWithComma(list.amount)}</Text>
                                                            <View style={{height:15}}></View>
                                                        </View>
                                                </View>
                                            </View>
                                            </>
                                            ))}
                                                
                                            <View style={styles.blankSpaceView}></View>
                                        
                                    </List.Accordion>
                                </List.Section>
                            </View>
                            ))
                        }
                        </>


                        :<>
                          {/* If No Results Found */}
                        <View  style={styles.ordersMainContainerView}>
                            <View style={styles.offersLabelLeftView}>
                                <Text  style={styles.orderListLabels}>Sorry No Results Found </Text>
                                <Text  style={styles.orderListLabels}>For {UserPhone} </Text>
                                <Text  style={styles.orderListLabels}>Try Again Please</Text>
                            </View>
                        </View>
                        </>
                    }
                    </ScrollView>
                </>}
            </>
            }
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
);
}
}

// https://callstack.github.io/react-native-paper/list-accordion.html
// left={props => <List.Icon {...props} icon="folder" />}