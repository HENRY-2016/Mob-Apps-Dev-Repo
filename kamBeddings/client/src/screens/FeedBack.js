
import React from 'react';
import { Text, View,Linking, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Octicons,Ionicons,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APIAbout} from './DataFileApis';


export default class FeedBack extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            AboutDetails:[],
            NumberOfItems:'',
    }
    
}
componentDidMount() 
{

}

getAboutDetails = async () =>
{

    try 
    {   AsyncStorage.getItem ('AboutDetails')
        .then(value =>{if (value != null){ this.setState({AboutDetails:value})} console.log("////"+value) })
        console.log("===== geting AboutDetails")
        // console.log(this.state)

    }catch (error) { console.log(error)}

}

getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};

render() {
    
    const { AboutDetails,NumberOfItems} = this.state;

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
                    <Text style = { styles.productTopTitleName}> Feed Back </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            <ScrollView>
                <View  style={styles.ordersMainContainerView}>
                    <View style={styles.feedbackLableView}>
                    <View style={styles.feedbacktitleView}>
                        <Text  style={styles.feedbackLables}> Kam Beddings </Text>
                    </View>
                        <Text  style={styles.orderListLables}>For Inquiries Or Customer Care</Text>
                        <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=256789076919');}} style={styles.orderListLables}> 0789 076 919</Text>
                        <Text  onPress={()=>{Linking.openURL('tel:0751986447');}} style={styles.orderListLables}>0751 986 447 </Text>
                        <Text  onPress={()=>{Linking.openURL('mailto:katoadirumwanje@gmail.com');}} style={styles.orderListLables}>katoadirumwanje@gmail.com</Text>
                        
                        <Text  style={styles.orderListLables}>Your Feed Back Is Important To Us </Text>
                        <Text  style={styles.orderListLables}>...Thank You...</Text>
                        <View style={{height:30}}></View>
                    </View>
                </View>

                <View  style={styles.ordersMainContainerView}>
                    <View style={styles.feedbackLableView}>
                    <View style={styles.feedbacktitleView}>
                        <Text  style={styles.feedbackLables}>App Feedbacks And Issues </Text>
                    </View>
                        <Text  style={styles.orderListLables}>In Case Of Any Issue With The App  </Text>
                        <Text  style={styles.orderListLables}>Take Screen Shot And Whats App    </Text>
                        <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=2560701243139');}} style={styles.orderListLables}>0701 243 139  </Text>
                        <Text  onPress={()=>{Linking.openURL('tel:0771977854');}} style={styles.orderListLables}>Or Call :: 0771 977 854 </Text>
                        <Text  style={styles.orderListLables}>Your Feed Back Is Important </Text>
                        <Text  style={styles.orderListLables}>...Thank You...</Text>
                        <View style={{height:30}}></View>
                    </View>
                </View>
                <View style={{height:40}}></View>
            </ScrollView>
        </View>
    );
}
}
