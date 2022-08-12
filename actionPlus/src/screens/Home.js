
import React from 'react';
import { Text, View,TouchableOpacity,Alert, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIListAllEvents} from './DataFileApis';


export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        UpcomingEvents:[],
        
        // Major Screens
        DoNotShowActivitiesScreen:true,
        DoNotShowEventsScreen:true,
        DoNotShowUpcomingEventsScreen:false,
        DoNotShowAdvertiseScreen:true,

        DoNotShowMainNavBtnScreen:false, // shoud be false always
        DoNotShowChatScreen:true,
        DoNotShowChatWindowScreen:true,
        DoNotShowChatLogInScreen:false,

        // Inner Screens
        DoNotShowUpcomingEventsInfoScreen:false,
        DoNotShowUpcomingEventsDetailsScreen:true,
    
        // customer
    }
    
}

componentDidMount() {

    axios.get(APIListAllEvents)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({UpcomingEvents:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load Products");})


}

// Major Screens

showChatScreen = () =>
{
    this.setState({DoNotShowUpcomingEventsScreen:true})
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
    this.setState({DoNotShowUpcomingEventsScreen:true})
    this.setState({DoNotShowActivitiesScreen:true})
    this.setState({DoNotShowEventsScreen:false})
}

ShowUpcomingEventsScreen = () =>
{
    this.setState({DoNotShowEventsScreen:true})
    this.setState({DoNotShowActivitiesScreen:true})
    this.setState({DoNotShowUpcomingEventsScreen:false})
}

showBackToUpcomingEventsDetailsScreen = () =>
{
    this.setState({DoNotShowUpcomingEventsDetailsScreen:true})
    this.setState({DoNotShowUpcomingEventsInfoScreen:false})
}
showUpcomingEventsDetailsScreen = () =>
{
    this.setState({DoNotShowUpcomingEventsInfoScreen:true})
    this.setState({DoNotShowUpcomingEventsDetailsScreen:false})
}
showActivitiesScreen = () =>
{
    this.setState({DoNotShowEventsScreen:true})
    this.setState({DoNotShowUpcomingEventsScreen:true})
    this.setState({DoNotShowActivitiesScreen:false})
}


render() {
    
    const {DoNotShowEventsScreen,DoNotShowUpcomingEventsScreen,DoNotShowActivitiesScreen} = this.state;
    const {DoNotShowUpcomingEventsDetailsScreen,DoNotShowUpcomingEventsInfoScreen}= this.state;
    const { UpcomingEvents}=this.state
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
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  onPress={this.ShowUpcomingEventsScreen} >
                        <Text style = {styles.btnText}> Upcoming Events</Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    {/* <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showEventsScreen} > */}
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  onPress={this.ShowUpcomingEventsScreen} >
                        <Text style = {styles.btnText}> All Events</Text>
                    </TouchableOpacity>
                    
                    {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showActivitiesScreen} >
                        <Text style = {styles.btnText}> Activities </Text>
                    </TouchableOpacity> */}

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </View>
            
        

            {DoNotShowActivitiesScreen ? <></>:(<>
                    
                    <View style={{height:20}}></View>
                    <Text style={styles.TextLabels} >All Activities will be listed here </Text>
            </>)}
            
        

            {DoNotShowUpcomingEventsScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                {DoNotShowUpcomingEventsInfoScreen ?<></>:(<>
                    {UpcomingEvents && UpcomingEvents.map((item,index)=> (
                        <View key={index} >
                            <View style={styles.MainHorizontalCardView}>
                                <View style={styles.LeftHorizontalCardView} ></View>
                                <View style={styles.SeparatorHorizontalCardView} ></View>
                                <View style={styles.RightHorizontalCardView} >
                                    <TouchableOpacity style={styles.HorizontalCardBtn} onPress={this.showUpcomingEventsDetailsScreen}>
                                        <Text style={styles.HorizontalCardBtnText} >Details </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.TextLabels} >{item.Name}</Text>
                                    <Text style={styles.TextLabels} >{item.Title}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </>)}

                {DoNotShowUpcomingEventsDetailsScreen ?<></>:(<>
                    {UpcomingEvents && UpcomingEvents.map((item,index)=> (
                        <View key={index} >
                            <View style={styles.MainHorizontalCardView}>
                                <View style={styles.LeftHorizontalCardView} ></View>
                                {/* <View style={styles.SeparatorHorizontalCardView} ></View> */}
                                <View style={styles.RightHorizontalCardView} >
                                    <TouchableOpacity style={styles.HorizontalCardBtn} onPress={this.showBackToUpcomingEventsDetailsScreen} >
                                        <Text style={styles.HorizontalCardBtnText} >Back </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.TextLabels} >{item.p1}</Text>
                                    <Text style={styles.TextLabels} >{item.p2}</Text>
                                    <Text style={styles.TextLabels} >{item.p3}</Text>
                                    <Text style={styles.TextLabels} >{item.p4}</Text>
                                    <Text style={styles.TextLabels} >{item.p5}</Text>
                                    <Text style={styles.TextLabels} >{item.p6}</Text>
                                    <Text style={styles.TextLabels} >{item.p7}</Text>
                                    <Text style={styles.TextLabels} >{item.p8}</Text>
                                    <Text style={styles.TextLabels} >{item.p9}</Text>
                                    <Text style={styles.TextLabels} >{item.p10}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </>)}
                <View style={{height:15}} ></View>
            </>)}

            {DoNotShowEventsScreen?<></>:(<>
                <View style={{height:15}} ></View>
                <Text style={styles.TextLabels} >All Events will be listed here </Text>
            </>)}

            

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
