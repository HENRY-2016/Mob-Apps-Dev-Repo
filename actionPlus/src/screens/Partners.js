
import React from 'react';
import { Text, View,Alert,TouchableOpacity,Image, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIListAllPartners,APIListNewNotification, ImageUrl} from './DataFileApis';

import { LoadingError } from './Functions';

export default class Partners extends React.Component {
constructor(props){
    super(props);
    this.state = {
        PartnersData:[],
        
        
    
    }
    
}

UNSAFE_componentWillMount() {

    axios.get(APIListNewNotification)
    .then(res => {
        let results = res; 
        this.setState({TodaysNotifications:results.data})})
    .catch(err=>{})
    
    axios.get(APIListAllPartners)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PartnersData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error",LoadingError);})

}




render() {
    
    const {PartnersData,TodaysNotifications} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
            <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={50} style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Home </Text>
                </View> */}

            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text  style={styles.mainCartNumberTxt}>{TodaysNotifications}</Text>
                    <AntDesign name="notification" size={35} style={styles.NotificationIcon} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:20}}></View>

            <View style={styles.HeadingsView}>
                <Text style={[styles.TextLabels,styles.TextLabels4]}>
                We work with local and international partners to deliver the best professional health care services to our clients
                </Text>
            </View>
            <View style={{height:20}}></View>
            {PartnersData && PartnersData.map((item,index)=>(
                <View key={index} >
                    <View style={styles.GridCard}>
                        <Image source={{uri: ImageUrl+item.Image}} style={styles.GridImage} />
                    </View>
                    <View style={{height:20}}></View>
                </View>

            ))}
            

            <View style={styles.MainBottomSpaceView}></View>
            </ScrollView>
            </View>

    );
}
}
