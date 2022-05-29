
import React from 'react';
import { Text, View,Image,Alert, TouchableOpacity, ScrollView} from 'react-native';
import {Entypo,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    APIListDashboardNewOrders,APIListDashboardTotalOrders,
    APIListDashboardNotClearedPayments,APIListDashboardClearedPayments,
    APIListDashboardNewPayments,APIListDashboardPendingPayments,
    APIListDashboardHalfPayments,APIListDashboardFullPayments,
    APIListDashboardTotalPayments,APIListDashboardAppStatics,
} from './DataFileApis';

import { formatNumberWithComma } from './Functions';

import Image1 from "../imgs/dashboard/1.png";
import Image2 from "../imgs/dashboard/2.png";
import Image3 from "../imgs/dashboard/3.png";
import Image4 from "../imgs/dashboard/4.png";
import Image5 from "../imgs/dashboard/5.png";
import Image6 from "../imgs/dashboard/6.png";
import Image7 from "../imgs/dashboard/7.png";
import Image8 from "../imgs/dashboard/8.png";
import Google from "../imgs/dashboard/google.png";



export default class DashboardCard extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        NewOrdersDetails:[],
        TotalOrdersDetails:[],
        PendingOrdersDetails:[],
        ClearedOrdersDetails:[],
        NewPaymentsDetails:[],
        HalfPaymentsDetails:[],
        FullPaymentsDetails:[],
        PendingPaymentsDetails:[],
        TotalPaymentsDetails:[],
        AppStaticsDetails:[],
    }
    
}
componentDidMount() 
{
    axios.get(APIListDashboardNewOrders)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].Amount;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({NewOrdersDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

    axios.get(APIListDashboardTotalOrders)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].Amount;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({TotalOrdersDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

    axios.get(APIListDashboardNotClearedPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].Amount;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({PendingOrdersDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

    axios.get(APIListDashboardClearedPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].Amount;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({ClearedOrdersDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

    axios.get(APIListDashboardNewPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].PalaceHolderThree;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({NewPaymentsDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})


    axios.get(APIListDashboardPendingPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].Amount;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({PendingPaymentsDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})


    axios.get(APIListDashboardHalfPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].PalaceHolderThree;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({HalfPaymentsDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})


    axios.get(APIListDashboardFullPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].PalaceHolderThree;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({FullPaymentsDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})


    axios.get(APIListDashboardTotalPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let customer = jsonResults.length
        let total = 0;
        let newResults =[];

        for (let i=0; i<jsonResults.length; i++)
        {
            let Amount = jsonResults[i].PalaceHolderThree;
            let withoutCommas = Amount.replace(/,/g, '');
            total += parseInt(withoutCommas);
        }

        let newArrary = {"Customers":customer,"Amount":total}
        newResults.push(newArrary);
        let newResultsStr =JSON.stringify(newResults);
        this.setState({TotalPaymentsDetails:[...JSON.parse(newResultsStr)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

    axios.get(APIListDashboardAppStatics )
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({AppStaticsDetails:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})


}




render() {
    
    const { NewOrdersDetails,TotalOrdersDetails,PendingOrdersDetails,ClearedOrdersDetails} = this.state;
    const { HalfPaymentsDetails,FullPaymentsDetails,PendingPaymentsDetails, TotalPaymentsDetails } = this.state;
    const { NewPaymentsDetails,AppStaticsDetails } = this.state;
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
                    <Text style = { styles.productTopTitleName}> Dashboard </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} >
                        <Entypo name="home" size={25} style={styles.cartCartIncon} />
                    </TouchableOpacity>
                </View>
                
            </View>

                <ScrollView>
                
                <View style={{height:20}} ></View>
{/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}
                <View style={styles.DashboardCardRowView}>
                
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image1} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> New </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Orders </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        {TotalOrdersDetails &&  TotalOrdersDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image2} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> Total </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Orders </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                </View>

                {/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}
                <View style={styles.DashboardCardRowView}>
                
                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {PendingOrdersDetails &&  PendingOrdersDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image3} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView11} >
                                            <Text style = { styles.TextLables}> Pending </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Orders </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {ClearedOrdersDetails &&  ClearedOrdersDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image4} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView11} >
                                            <Text style = { styles.TextLables}> Cleared </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Orders </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                </View>
                <View style={styles.DashboardSpaceCard}></View>
            </View>

{/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}
                <View style={styles.DashboardCardRowView}>
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        <View style={styles.DashboardInnerCard} >
                        {NewPaymentsDetails &&  NewPaymentsDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image5} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> New </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Payments </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                        </View>
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                    {/* <View style={styles.DashboardInnerCard} > */}
                        {PendingPaymentsDetails &&  PendingPaymentsDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image7} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> Pending </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Payments </Text>
                                        </View>
                                    <View style={{height:20}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                        {/* </View> */}
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                </View>

{/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}
                <View style={styles.DashboardCardRowView}>
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        {HalfPaymentsDetails &&  HalfPaymentsDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image8} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> Half </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Payments </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        {FullPaymentsDetails &&  FullPaymentsDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image8} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> Full </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Payments </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                </View>

                {/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}
                <View style={styles.DashboardCardRowView}>
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        {TotalPaymentsDetails &&  TotalPaymentsDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Image6} style={styles.CardImage}/>
                                    </View>
                                    <View style={styles.CardTextNumberView}>
                                        <Text style = { styles.TextLables}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLables}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLables}> Total </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLables}> Payments </Text>
                                        </View>
                                    <View style={{height:10}}></View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                    <View style={styles.DashboardCard}>
                        {AppStaticsDetails &&  AppStaticsDetails.map((ItemKey, Index) =>( 
                            <View key={Index}>
                                <View style={styles.DashboardInnerCard} >
                                    <View style={styles.CardImageView} >
                                    <Image source={Google} style={styles.CardImage}/>
                                    </View>
                                    
                                    <View style={styles.CardTextGooglePlay}>
                                        <Text style = { styles.TextLables}> Active  {ItemKey.Devices} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextGooglePlay}>
                                        <Text style = { styles.TextLables}> Installs  {ItemKey.Installs} </Text>
                                    </View>
                                    <View style={{height:10}}></View>

                                    <View style={styles.CardTextGooglePlay2}>
                                        <Text style = { styles.TextLables}> Uninstalls  {ItemKey.Uninstalls} </Text>
                                    </View>
                                    <View style={{height:10}}></View>

                                    

                                    
                                </View>
                            </View>
                        ))}
                    </View>
                    <View style={styles.DashboardSpaceCard}></View>
                </View>

                {/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}

{/* 
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

*/}

                <View style={styles.blankSpaceView}></View>
                </ScrollView>
            
        </View>
    );
}
}
