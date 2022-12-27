
import React from 'react';
import { Text, View, Alert,Dimensions,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { COLORS } from './Colors';
import { WebView } from 'react-native-webview';
import axios from "axios";

import {APIGetHomeSlider,APIGetHomeTitleText,APINotificationsDetailsDataById} from './DataFileApis';
import { NotificationsAllData,NotificationsNewData } from './AppDataFile';
import {OpenExternalLinks } from './Functions';
import { NetworkErrorMsg } from './Alerts';
import { Entypo } from '@expo/vector-icons';
import BellIcon from "../imgs/Home/bell.png"
import EyeIcon from "../imgs/Home/eye.png"
import CheckedIcon from "../imgs/Home/check.png"
import WhatsAppIcon from "../imgs/About/Contact/whatsapp.png"; 

const {width} = Dimensions.get("window");
const height = width * 0.9; 
const SpacingWidth = 2;

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            HomeTitleText:[],
            NotificationsDetailsIdData:[],
            DoNotShowHomeScreen:false,
            DoNotShowHomeWebViewScreen:true, // do not show until web page is loaded
            DoNotShowNotificationScreen:true,

            // Sub Screens
            DoNotShowNotificationDetailsScreen:true,
            NewNotificationsTotal:'', AllNotificationsTotal:'',

        }
        
    }

UNSAFE_componentWillMount ()
{

    axios.get(APIGetHomeTitleText)
    .then(res =>{
            let results =JSON.stringify(res.data); 
            let jsonResults =JSON.parse(results);
            this.setState({HomeTitleText:[...jsonResults]});
            this.setState({DoNotShowHomeWebViewScreen:false});
        })
    .catch(err=>{Alert.alert("An Error",NetworkErrorMsg);})
}

componentDidMount() { 
    console.log("");console.log("");
    console.log("=====>Inside Home Screen");
    this.setState({NewNotificationsTotal:NotificationsNewData[0].length})
    this.setState({AllNotificationsTotal:NotificationsAllData[0].length})
}


showHomeScreen = () =>
{
    this.setState({DoNotShowNotificationScreen:true});
    this.setState({DoNotShowNotificationDetailsScreen:true});
    this.setState({DoNotShowHomeScreen:false});
}
showNotificationScreen = () =>
{
    this.setState({DoNotShowHomeScreen:true});
    this.setState({DoNotShowNotificationDetailsScreen:true});
    this.setState({DoNotShowNotificationScreen:false});
}

showNotificationDetailsScreen = (id) =>
{
    axios.get(APINotificationsDetailsDataById+id)
    .then(res =>{
            let results =JSON.stringify(res.data); 
            let jsonResults =JSON.parse(results);
            this.setState({NotificationsDetailsIdData:[...jsonResults]});
            console.log(this.state.NotificationsDetailsIdData)
        })
    .catch(err=>{Alert.alert("An Error",NetworkErrorMsg);})

    this.setState({DoNotShowNotificationScreen:true});
    this.setState({DoNotShowHomeScreen:true});
    this.setState({DoNotShowNotificationDetailsScreen:false})
}

postUserSeenNotification = () =>
{
    Alert.alert("Information","Thank You For Viewing Our Notification")
}
render() {
    
    const  {DoNotShowNotificationDetailsScreen,DoNotShowHomeWebViewScreen,DoNotShowHomeScreen,DoNotShowNotificationScreen} = this.state;
    const { HomeTitleText,NotificationsDetailsIdData,AllNotificationsTotal,NewNotificationsTotal} =this.state;
    return (
        
        <View style={styles.mainView}>
        <View style={styles.HomeNotificationMainView}>
            <View style={{height:5}}></View>
            <View style={styles.HomeNotificationView}>
                <View style={styles.NotificationTitleView} >
                    <Text style={styles.NotificationTitleText}>Feel The Pearl   {"\n"}Of Africa </Text>
                </View>
                <View style={{width:SpacingWidth}}></View>

                <View style={{width:SpacingWidth}}></View>
                <TouchableOpacity onPress={()=>this.showNotificationScreen()}>
                    <View style={styles.NotificationOldView}>
                        <View style={{marginLeft:10}} >
                            <Entypo name="message" size={28} color={COLORS.TabsTextActiveColor} />
                        </View>
                        <Text style={styles.NotificationNumberText}>{NewNotificationsTotal}</Text>
                    </View>
                </TouchableOpacity>

                <View style={{width:SpacingWidth}}></View>
                <TouchableOpacity onPress={()=>OpenExternalLinks('https://api.whatsapp.com/send/?phone=256772919818')} >
                    <View >
                        <Image source={WhatsAppIcon} style={styles.ChatIcon} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{height:3}} ></View>


            <ScrollView  showsVerticalScrollIndicator={false}>
                {DoNotShowHomeScreen?(<></>):(<>

                    <View style={{height:10}} ></View>
                        {DoNotShowHomeWebViewScreen ?(<></>):(<>
                            <WebView style={{height,width, backgroundColor:COLORS.MainBodyBgColor}} originWhitelist={['*']} source={{  uri:APIGetHomeSlider}}/>
                        </>)}
                        
                    <View style={{height:5}} ></View>
                    {HomeTitleText && HomeTitleText.map((item,index)=>(
                        <View key={index}>
                            <View style={[styles.SafarisListingContainer, ]}>
                                <View style={{height:10}} ></View>
                                    <View style={styles.MainDescriptionView} >
                                        <View style={{height:10}} ></View>
                                        <Text style={styles.WelcomeTitleText}>{item.Title1}</Text>
                                        <View style={{height:10}} ></View>
                                        <Text style={styles.WelcomeTitleText}>{item.Title2}</Text>
                                        <View style={{height:10}} ></View>
                                        <Text style={styles.WelcomeTitleText}>{item.Title3}</Text>
                                    <View style={{height:10}} ></View>
                                    </View>
                                <View style={{height:10}} ></View>
                            </View>
                        </View>
                    ))}
                </>)}

                {DoNotShowNotificationScreen?(<></>):(<>
                    <View style={{height:10}}></View>
                    
                    <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}}></View>
                        <View style={styles.MainDescriptionView} >
                        <View style={{height:10}}></View>
                            <View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showHomeScreen()}>
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {styles.SubmitButtonsText} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        <View style={{height:10}}></View>
                        </View>
                    <View style={{height:10}}></View>
                    </View>
                    <View style={{height:10}}></View>
                    <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}}></View>
                    <View style={styles.MainDescriptionView2} >
                        <View style={{height:5}}></View>
                        <View style={[styles.TravelLeftFloatView,styles.TravelLeftFloatView1]}>
                            <Text style={[styles.TravelLeftFloatText]}>New Notifications:: {NewNotificationsTotal}</Text>
                        </View>

                        <View style={{height:10}}></View>
                        {NotificationsNewData[0] && NotificationsNewData[0].map((item,index)=>(<View key={index} >
                            <View style={styles.HorizontalRow}>
                                <View style={styles.HorizontalMiddleView}>
                                    <View style={styles.HorizontalCircle} >
                                        <Image source={BellIcon} style={styles.BellIcon}/>
                                    </View>
                                    <Text style={styles.HorizontalTitleText}>{item.TitleName}{"\n"}{item.Holder1}</Text>
                                </View>

                                <View>
                                    <TouchableOpacity onPress={()=>this.showNotificationDetailsScreen(item.id)}>
                                        <View style={styles.HorizontalViewBtn}>
                                            <Image source={EyeIcon} style={styles.EyeIcon}/>
                                            <Text style={styles.HorizontalText}>View</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </View>))}
                            <View style={{height:10}}></View>
                    </View>
                    

                    <View style={{height:10}}></View>
                    <View style={styles.MainDescriptionView2} >
                        <View style={[styles.TravelLeftFloatView,styles.TravelLeftFloatView1]}>
                            <Text style={[styles.TravelLeftFloatText]}>All Notifications:: {AllNotificationsTotal}</Text>
                        </View>
                        <View style={{height:10}}></View>
                        {NotificationsAllData[0] && NotificationsAllData[0].map((item,index)=>(<View key={index} >
                            <View style={styles.HorizontalRow}>
                                <View style={styles.HorizontalMiddleView}>
                                    <View style={styles.HorizontalCircle} >
                                        <Image source={CheckedIcon} style={styles.BellIcon}/>
                                    </View>
                                    <Text style={styles.HorizontalTitleText}>{item.TitleName}{"\n"}{item.Holder1}</Text>
                                </View>

                                <View>
                                    <TouchableOpacity onPress={()=>this.showNotificationDetailsScreen(item.id)}>
                                        <View style={styles.HorizontalViewBtn}>
                                            <Image source={EyeIcon} style={styles.EyeIcon}/>
                                            <Text style={styles.HorizontalText}>View</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </View>))}
                            <View style={{height:10}}></View>
                            </View>
                    </View>
                </>)}

                {DoNotShowNotificationDetailsScreen?(<></>):(<>
                    <View style={{height:10}} ></View>
                    <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}} ></View>
                    <View style={styles.MainDescriptionView} >
                    {NotificationsDetailsIdData && NotificationsDetailsIdData.map((item,index)=>(
                        <View key={index}>
                            <View style={{height:10}} ></View>
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Holder1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                            <View style={{height:10}} ></View>
                        </View>
                    ))}
                    <View>
                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postUserSeenNotification()}>
                            <View style={{alignItems:'center'}}>
                                <Text style = {styles.SubmitButtonsText} >Seen</Text>
                            </View>
                        </TouchableOpacity>
                    
                    </View>
                        <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                    </View>
                </>)}














            <View style={{height:10}} ></View>
            </ScrollView>
        </View>
    );
}
}
