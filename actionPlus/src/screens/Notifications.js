
import React from 'react';
import { Text, View,TextInput,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';


export default class Notifications extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // video: React.useRef(null),
        
        // Major Screens
        DoNotShowActivitiesScreen:false,
        DoNotShowEventsScreen:true,
        DoNotShowNotificationsScreen:true,
        DoNotShowAdvertiseScreen:true,

        DoNotShowMainNavBtnScreen:false, // shoud be false always
        DoNotShowChatScreen:true,
        DoNotShowChatWindowScreen:true,
        DoNotShowChatLogInScreen:false,

        // Inner Screens
    
        // customer
    }
    
}

componentDidMount() {


}

// Major Screens

showChatScreen = () =>
{
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowActivitiesScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowEventsScreen:true})
    this.setState({DoNotShowMainNavBtnScreen:true})
    this.setState({DoNotShowChatScreen:false})
}
closeChatScreen = () =>
{
    this.setState({DoNotShowMainNavBtnScreen:false})
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowActivitiesScreen:false})
}
showInnerChatLogInScreen = () =>
{
    this.setState({DoNotShowChatWindowScreen:true})
    this.setState({DoNotShowChatLogInScreen:false})
}
showInnerChatWindowScreen = () =>
{
    this.setState({DoNotShowChatLogInScreen:true})
    this.setState({DoNotShowChatWindowScreen:false})

}

showEventsScreen= () =>
{
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowActivitiesScreen:true})
    this.setState({DoNotShowEventsScreen:false})
}

showNotificationsScreen = () =>
{
    this.setState({DoNotShowEventsScreen:true})
    this.setState({DoNotShowActivitiesScreen:true})
    this.setState({DoNotShowNotificationsScreen:false})
}

showActivitiesScreen = () =>
{
    this.setState({DoNotShowEventsScreen:true})
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowActivitiesScreen:false})
}


render() {
    
    const {DoNotShowEventsScreen,DoNotShowNotificationsScreen,DoNotShowAdvertiseScreen,DoNotShowActivitiesScreen} = this.state;

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

                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Notifications')}>
                    
                        <Text  style={styles.mainCartNumberTxt}>3</Text>

                    <AntDesign name="notification" size={35} style={styles.NotificationIcon} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                
            <View>
                <View style={{height:20}}></View>
                <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showActivitiesScreen} >
                        <Text style = {styles.btnText}> New </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showEventsScreen} >
                        <Text style = {styles.btnText}> All </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </View>
            
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Begin Activities Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}
            {DoNotShowActivitiesScreen ? <></>:(<>
                    
                    <View style={{height:20}}></View>
                    <Text style={styles.TextLabels} >
                Grand Opening Ceremony Of The ActionPlus Multi-social Empowerment Centre (AMSEC) UK
                        
                    </Text>
            </>)}
            

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Events Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}


            {DoNotShowEventsScreen?<></>:(<>
                <View style={{height:20}} ></View>
                <Text style={styles.TextLabels} > 
                Grand Opening Ceremony Of The ActionPlus Multi-social Empowerment Centre (AMSEC) UK
                
                </Text>
            </>)}

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
