
import React from 'react';
import { Text, View,Alert,TouchableOpacity,Image, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIHomeProducts,APIListNewNotification, ImageUrl} from './DataFileApis';



export default class Sponsors extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItems:[],
        
        
    
    }
    
}

componentDidMount() {

}



render() {
    
    const {TodaysNotifications} = this.state;

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

            <Text style={styles.TextLabels} > 
                Contacts for feedbacks
            </Text>
            <View style={{height:20}}></View>

            <View style={styles.MainBottomSpaceView}></View>
            </ScrollView>
            </View>

    );
}
}
