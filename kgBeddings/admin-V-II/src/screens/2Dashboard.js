
import React from 'react';
import { Text, View,Image,Alert, TouchableOpacity, ScrollView} from 'react-native';
import {Entypo,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";

import {
    APIListDashboardNewOrders,APIListDashboardTotalOrders,
    APIListDashboardNotClearedPayments,APIListDashboardClearedPayments,
    APIListDashboardNewPayments,APIListDashboardPendingPayments,
    APIListDashboardHalfPayments,APIListDashboardFullPayments,
    APIListDashboardTotalPayments,APIListDashboardAppStatics,
} from './2DataFileApis';

import { formatNumberWithComma } from './Functions';

import Image1 from "../imgs/dashboard/1.png";
import Image2 from "../imgs/dashboard/2.png";
import Image3 from "../imgs/dashboard/3.png";
import Image4 from "../imgs/dashboard/4.png";
import Image6 from "../imgs/dashboard/6.png";
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
                    <Text style = { styles.productTopTitleName}> Old Ver : Dashboard </Text>
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
                                        <Text style = { styles.TextLabels}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLabels}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLabels}> New </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLabels}> Orders </Text>
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
                                        <Text style = { styles.TextLabels}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLabels}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLabels}> Total </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLabels}> Orders </Text>
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
                                        <Text style = { styles.TextLabels}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLabels}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView11} >
                                            <Text style = { styles.TextLabels}> Pending </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLabels}> Orders </Text>
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
                                        <Text style = { styles.TextLabels}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLabels}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView11} >
                                            <Text style = { styles.TextLabels}> Cleared </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLabels}> Orders </Text>
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

{/* 
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
                                        <Text style = { styles.TextLabels}> {ItemKey.Customers} </Text>
                                    </View>
                                    <View style={styles.CardTextAmountView}>
                                        <Text style = { styles.TextLabels}> {formatNumberWithComma(ItemKey.Amount)} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextLabelView} >
                                        <View style={styles.CardTextLabelInnerView1} >
                                            <Text style = { styles.TextLabels}> Total </Text>
                                        </View>
                                        <View style={styles.CardTextLabelInnerView2} >
                                            <Text style = { styles.TextLabels}> Payments </Text>
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
                                        <Text style = { styles.TextLabels}> Active  {ItemKey.Devices} </Text>
                                    </View>
                                    <View style={{height:10}}></View>
                                    <View style={styles.CardTextGooglePlay}>
                                        <Text style = { styles.TextLabels}> Installs  {ItemKey.Installs} </Text>
                                    </View>
                                    <View style={{height:10}}></View>

                                    <View style={styles.CardTextGooglePlay2}>
                                        <Text style = { styles.TextLabels}> Uninstalls  {ItemKey.Uninstalls} </Text>
                                    </View>
                                    <View style={{height:10}}></View>

                                    

                                    
                                </View>
                            </View>
                        ))}
                    </View> 
                    <View style={styles.DashboardSpaceCard}></View>
                </View>*/}

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
