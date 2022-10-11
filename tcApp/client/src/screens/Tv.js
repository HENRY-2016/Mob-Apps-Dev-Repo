
import React from 'react';
import { Text, View, Alert,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import TcTvImg from "../imgs/tctv.png";
import YoutubePlayer from 'react-native-youtube-iframe';
import {APIListFunny,
    APIPostNewsOrder,APIListTalkTheWalk,
} from './DataFileApis';


export default class Tv extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        Funny:[],
        TalkTheWalk:[],
        
        // Major Screens
        DoNotShowFunnyScreen:true,
        DoNotShowTvScreen:false,
        DoNotShowAdvertBookingScreen:true,
        

        // Inner Screens
        DoNotShowInnerNewsScreen1:false,
        DoNotShowInnerNewsScreen2:true,

    }
    
}

UNSAFE_componentWillMount () {

    axios.get(APIListTalkTheWalk)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({TalkTheWalk:[...JSON.parse(results)]})
        })
    .catch()
    

    axios.get(APIListFunny)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Funny:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data");})
}

setNumberOfCopies = (text) =>{this.setState({NumberOfCopies:text});}
setBookingName = (text) =>{this.setState({BookingName:text});}
setBookingContact = (text) =>{this.setState({BookingContact:text});}
setCountrySelectedValue  = (text) =>{this.setState({CountrySelectedValue:text});}
setDeliverySelectedValue  = (text) =>{this.setState({DeliverySelectedValue:text});}
setPaymentSelectedValue  = (text) =>{this.setState({PaymentSelectedValue:text});}

showInnerNewsScreen1 = () => 
{
    this.setState({DoNotShowInnerNewsScreen2:true})
    this.setState({DoNotShowInnerNewsScreen1:false})
}

showInnerNewsScreen2 = (Country,Date,Cost) => 
{
    this.setState({NewsCountry:Country})
    this.setState({NewsDate:Date})
    this.setState({NewsCost:Cost})
    this.setState({DoNotShowInnerNewsScreen1:true})
    this.setState({DoNotShowInnerNewsScreen2:false})
}

showTvScreen = () =>
{
    this.setState({DoNotShowFunnyScreen:true})
    this.setState({DoNotShowAdvertBookingScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowTvScreen:false})
}

showAdvertBookingScreen = () =>
{
    this.setState({DoNotShowFunnyScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowAdvertBookingScreen:false})
}

showTvScreen = () =>
{
    this.setState({DoNotShowFunnyScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertBookingScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowTvScreen:false})
}

showAdvertiseScreen = () =>
{
    this.setState({DoNotShowFunnyScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertBookingScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertiseScreen:false})
}

ShowFunnyScreen = () =>
{
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertBookingScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowFunnyScreen:false})
}

postNewsOder = async () =>
{
    let versionDate = this.state.NewsDate;
    let cost = this.state.NewsCost;
    let versionCountry = this.state.NewsCountry;
    let country = this.state.CountrySelectedValue ;
    let name = this.state.BookingName;
    let contact = this.state.BookingContact;
    let copies = this.state.NumberOfCopies;
    let delivery = this.state.DeliverySelectedValue ;
    // let payment = this.state.PaymentSelectedValue ;

    // let  = 

    // console.log(versionDate+":"+":"+cost+":"+versionCountry+":"+country+":"+name+":"+contact+":"+copies+":"+delivery+":"+payment)
    // Alert.alert("Massage","Thank You For Your Order")

    if ((country.length == 0) || (name.length == 0) || (contact.length == 0) ||(copies.length == 0) ||(delivery.length == 0))
    {Alert.alert("Warning Please","\n \n Country Or Name Or Contact Or\n\n Copies Or Delivery Method \n\n\n Can Not Be Empty")}

    else
    {
        try
        {
            const postRequest = await axios.post(APIPostNewsOrder,
                {
                "Name" :name,
                "Country" :country,
                "Contact" :contact,
                "VersionDate":versionDate,
                "Copies" :copies,
                "Amount" :cost,
                "DeliveryMethod" :delivery,
                "Version":versionCountry,
                }
            )
            let result = postRequest.data.status;
            Alert.alert("Status",result);
        }
        catch (error)
            {Alert.alert("An Error","Check Your Network Connections\n\n")};
    }
}


render() {
    
    const {TalkTheWalk,Funny} = this.state;
    const {DoNotShowFunnyScreen,DoNotShowMainNavBtnScreen} = this.state;
    const {DoNotShowTvScreen,DoNotShowAdvertBookingScreen} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Home </Text>
                </View> */}
            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Tc Tv USA UK Uganda </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            <View style={styles.MainNavigationBtnView1}>
            {DoNotShowMainNavBtnScreen?<></>:(<>
            <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                    </View>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showTvScreen} >
                        <Text style = {styles.btnText}>TalkTheWalk </Text>
                    </TouchableOpacity>
                    
                    {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.ShowFunnyScreen} >
                        <Text style = {styles.btnText}> Advert Booking </Text>
                    </TouchableOpacity> */}

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.ShowFunnyScreen} >
                        <Text style = {styles.btnText}> Others </Text>
                    </TouchableOpacity>
                    
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </>)}
            </View>
        

        
            {DoNotShowTvScreen ? <></>:(<>
                <View style={{height:20}} ></View>
                <View style={styles.TcNewsIconMainView}>
                <Image source={TcTvImg} style={styles.TcNewsIcon}/>
                </View>
                <Text style={styles.AboutText} >Talk the Walk is live streamed every Friday at 6.00pm-6:30pm UK, 8:00pm UG and 10:00pm USA with your host Mr Prosper</Text>
                <View style={styles.horizontalLine} ></View>

                <View style={{height:20}}></View>
                <Text style={styles.AboutText} >Our Shows</Text>
                {TalkTheWalk && TalkTheWalk.map((item, index) => (
                    <View key={index}>
                        <View style={styles.VideoView}>
                            <YoutubePlayer height={210} videoId={item.Video}/>
                        </View>
                        <View style={{marginTop:0}} >
                        <Text style={styles.AboutText} >{item.Title}</Text>
                        </View>
                    </View>
                ))}
            </>)}
            
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Radio Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}

                {DoNotShowFunnyScreen ?<></>:(<>
                    <View style={{height:15}} ></View>

                    <Text style={styles.AboutText} >Our Shows</Text>
                    {Funny && Funny.map((item, index) => (
                        <View key={index}>
                            <View style={styles.VideoView}>
                                <YoutubePlayer  height={210} videoId={item.Video}/>
                            </View>
                            <View style={{marginTop:0}} >
                            <Text style={styles.AboutText} >{item.Title}</Text>
                            </View>
                        </View>
                    ))}
                <View style={{height:10}} ></View>
            </>)}
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Begin News Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DoNotShowAdvertBookingScreen ?<></>:(<>
                
            
            </>)}
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Tv Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
