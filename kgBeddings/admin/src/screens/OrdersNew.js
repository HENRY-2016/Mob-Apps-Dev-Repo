
import React from 'react';
import { Text, View, Image,TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";


// APIs
import {APIListNewOrders,APIListCustomerOrderListArray,imageurl} from './DataFileApis';
import {HeaderTopRightIcon,formatNumberWithComma} from "./Functions"
import TopIcon from "../imgs/dashboard/1.png";



export default class OrdersNewOrders extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            NewOrderDetails:[],
            OrderListArrary:[],

            // Screens
            DoNotShowTableScreen:false,
            DoNotShowDetailsScreen:true,
            }
}

componentDidMount() {

    axios.get(APIListNewOrders)
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({NewOrderDetails:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}


showTableScreen = () =>
{
    this.resetCustomerDetails();
    this.setState({DoNotShowTableScreen:false})
    this.setState({DoNotShowDetailsScreen:true})
}

showDetailsScreen = () =>
{
    this.setState({DoNotShowTableScreen:true})
    this.setState({DoNotShowDetailsScreen:false})
}

resetCustomerDetails = () =>
{
    this.setState({CustomerPhone:''});
    this.setState({CustomerDate:''});
    this.setState({CustomerAmount:''});
    this.setState({CustomerReference:''});
    this.setState({CustomerDeliveryMethod:''});
    this.setState({CustomerPaymentMethod:''});
}

displayCustomerOrderListArrary = (id,Phone,Date,Amount,Reference,DeliveryMethod,PaymentMethod) =>
{
    // set customer details
    this.setState({CustomerPhone:Phone});
    this.setState({CustomerDate:Date});
    this.setState({CustomerAmount:Amount});
    this.setState({CustomerReference:Reference});
    this.setState({CustomerDeliveryMethod:DeliveryMethod});
    this.setState({CustomerPaymentMethod:PaymentMethod});

    axios.get(APIListCustomerOrderListArray+id)
    .then(res => {
        let jsonstring =JSON.stringify(res.data); 
        let results =JSON.parse(jsonstring ); 
        this.setState({OrderListArrary:[...results]})
        // console.log(this.state)
        setTimeout(this.showDetailsScreen,1000);
        })
    .catch(err=>{console.log(err);})
}

render() {
    
    const { NewOrderDetails, OrderListArrary} = this.state;
    const { DoNotShowTableScreen,DoNotShowDetailsScreen} = this.state;
    const { CustomerPhone,CustomerAmount,CustomerDate,CustomerReference,CustomerDeliveryMethod,CustomerPaymentMethod} = this.state;


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
                    <Text style = { styles.productTopTitleName}> Orders :: New </Text>
                </View> 

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn}>
                        <HeaderTopRightIcon image={TopIcon} />
                    </TouchableOpacity>
                </View>
            </View>


            {/* =================================================== */}
                {/* <View style={{height:30}} ></View>
                    <ScrollView>
                    { NewOrderDetails && NewOrderDetails.map((IteamKey, index) => (

                        <ScrollView horizontal={true} >
                        <View key={index}>
                            <View style={styles.mainTableView}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Phone}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Amount}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Reference}</Text>
                                </View>

                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.PalaceHolderOne}</Text>
                                </View>
                                <View style={styles.tableTrView}>
                                    <View style={styles.ordersDetailsBtnView}>
                                        <TouchableOpacity onPress={()=>{this.displayCustomerOrderListArrary(IteamKey.id)}} style={styles.orderdetailsBtn} >
                                            <Text style={styles.orderdetailsBtnText} >Details</Text> 
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.tableTrView} >
                                    <View style={{width:20}} ></View>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                        ))
                    }
                    <View style={{height:15}}></View>
                    </ScrollView> */}

                                {/* =================================================== */}
        
            {DoNotShowTableScreen ? <></> : (<>
            <View style={{height:30}} ></View>

                <ScrollView>
                    {NewOrderDetails && NewOrderDetails.map((IteamKey, index) => (

                        <ScrollView horizontal={true} >
                        <View key={index}>
                            <View style={styles.mainTableView}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Phone}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Amount}</Text>
                                </View>

                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.PalaceHolderOne}</Text>
                                </View>
                                <View style={styles.tableTrView}>
                                    <View style={styles.ordersDetailsBtnView}>
                                        <TouchableOpacity onPress={()=>{this.displayCustomerOrderListArrary(IteamKey.id,IteamKey.Phone,IteamKey.PalaceHolderOne,IteamKey.Amount,IteamKey.Reference,IteamKey.DeliveryMethod,IteamKey.PaymentMethod)}} style={styles.orderdetailsBtn} >
                                            <Text style={styles.orderdetailsBtnText} >Order Details</Text> 
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.tableTrView} >
                                    <View style={{width:20}} ></View>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                    ))}
                <View style={{height:15}}></View>
                </ScrollView>
            </>)}
            


            {DoNotShowDetailsScreen ? <></>:(<>
                <View style={{height:30}} ></View>
                <View style={styles.BackToTableBtnView}>
                    <TouchableOpacity onPress={()=>{this.showTableScreen()}} style={styles.backBtn} >
                        <Text style={styles.backBtnText} >List Orders</Text> 
                    </TouchableOpacity>
                </View>
                <View style={{height:20}} ></View>
                <View style={styles.orderListView}>
                    <Text  style={styles.orderListLables}>{" "+" "+CustomerPhone +" "+" "+"::"+" "+CustomerDate }</Text>
                    <Text  style={styles.orderListLables}>{" "+" "+CustomerAmount +" "+" "+"::"+ " "+CustomerReference}</Text>
                    <Text  style={styles.orderListLables}>{"Delivery Method :" +" "+ CustomerDeliveryMethod}</Text>
                    <Text  style={styles.orderListLables}>{"Payment Method : " + " "+ CustomerPaymentMethod}</Text>
                    <Text  style={styles.orderListLables}></Text>
                </View>
                <View style={{height:20}} ></View>
                <ScrollView>
                    {OrderListArrary && OrderListArrary.map((list, s) => (
                        <>
                        <View key={s} >
                            <View  style={styles.ordersMainContainerView}>
                                <View style={styles.offersimageRightView}>
                                    <TouchableOpacity>
                                        <Image source={{uri: imageurl+list.image}} style={styles.productImage} />
                                    </TouchableOpacity>
                                </View>

                                    <View style={styles.offersLableLeftView}>
                                        <Text  style={styles.orderListLables}>{list.name}</Text>
                                        <Text  style={styles.orderListLables}>{list.status}</Text>
                                        <Text  style={styles.orderListLables}>{list.qty}</Text>
                                        <Text  style={styles.orderListLables}>{formatNumberWithComma(list.amount)}</Text>
                                        <View style={{height:15}}></View>
                                    </View>
                            </View>
                            </View>
                        </>
                    ))}
                <View style={{height:15}}></View>
                </ScrollView>
            </>)}

        </View>
    );
}
}
