
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign } from '@expo/vector-icons';
// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';

// import { formatNumberWithComma } from './Functions';

export default class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
    
            // Screens
    
            // customer
        }
        
    }
    
componentDidMount() {}


render() {
    
    // const { HairStylesItem,BookedStyle} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={{height:30}}></View>
            <View style={styles.DashboardCardProfileRowView}>
                <Text style = { styles.ProfileTextLables}> Hello Customer </Text>
                <Text style = { styles.ProfileTextLables}> 0701243139 </Text>
            </View>



            <View style={{height:30}}></View>
            <View style={styles.DashboardCardRowView}>
                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                            <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView1}>
                                    <Text style = { styles.TextLables}> Bookings </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                        <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView2}>
                                    <Text style = { styles.TextLables}> Comments </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {TotalOrdersDetails &&  TotalOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                        <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView}>
                                    <Text style = { styles.TextLables}> Inquiries </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>
                <View style={styles.DashboardSpaceCard}></View>
            </View>   

            {/*
                ==================================================================
                ==================================================================

            */}
            <View style={styles.DashboardCardRowView}>
                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                            <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView1}>
                                    <Text style = { styles.TextLables}> Bookings </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                        <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView2}>
                                    <Text style = { styles.TextLables}> Comments </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {TotalOrdersDetails &&  TotalOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                        <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView}>
                                    <Text style = { styles.TextLables}> Inquiries </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>
                <View style={styles.DashboardSpaceCard}></View>
            </View> 

            {/*
                ==================================================================
                ==================================================================

            */}
            <View style={styles.DashboardCardRowView}>
                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                            <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView1}>
                                    <Text style = { styles.TextLables}> Likes </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {NewOrdersDetails &&  NewOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                        <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView2}>
                                    <Text style = { styles.TextLables}> Comments </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>

                <View style={styles.DashboardSpaceCard}></View>
                <View style={styles.DashboardCard}>
                    {/* {TotalOrdersDetails &&  TotalOrdersDetails.map((ItemKey, Index) =>(  */}
                        {/* <View key={Index}> */}
                        <View style={styles.DashboardInnerCard} >
                                <View style={styles.CardTextAmountView1}>
                                    <Text style = { styles.TextLables}> My </Text>
                                </View>
                                <View style={styles.CardTextNumberView}>
                                    <Text style = { styles.TextLables}> Inquiries </Text>
                                </View>
                                <View style={styles.CardTextAmountView2}>
                                    <Text style = { styles.TextLables}> 0 </Text>
                                </View>
                            </View>
                        {/* </View> */}
                    {/* // ))} */}
                </View>
                <View style={styles.DashboardSpaceCard}></View>
            </View>












        </View>
    );
}
}
