
import React from 'react';
import { Text, View, Alert,TextInput,ActivityIndicator,TouchableOpacity,ScrollView,Image} from 'react-native';
import styles from "./stylesheet";
import {Entypo,Fontisto, AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { COLORS } from './Colours';
import {
        APILogInClubMemberByCardNo,APIPostTransportOrder,APIListAllCountries,
        APIGetTransportBodaOrders,APIGetTransportTaxiOrders,
        APIAccountStatusByCardNo 
    } from './DataFileApis';
import {
        getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,
        mainTableTitleHandleView,aboutTitleText,aboutText,trTdText,
        mainNavigationBtnWidth1,mainNavigationBtnWidth2,mainNavigationBtnWidth3,
        getBorderBottomColor,
        mainNavigationBtnWidth4,userProfileView,
    } from './StatusFunctions'
import { convertToUpperCase,convertToLowerCase,LOGOUT_MSG, LOGIN_ERROR} from './Functions';
import UserImg from "../imgs/user.png";

export default class Transport extends React.Component {
constructor(props){
    super(props);
    this.state = {
        TcBodaUserOrders:[],
        TcTaxiUserOrders:[],
        // Screens
        DoNotShowHomeScreen:false,
        DoNotShowProfileScreen:true,
        DoNotShowTcBodaScreen:true,
        DoNotShowLogInScreen:true,
        DoNotShowTcTaxiScreen:true,

        // sub screens
        DoNowShowTcBodaHomeScreen:false,
        DoNowShowTcBodaOrderScreen:true,
        DoNowShowTcTaxiHomeScreen:false,
        DoNowShowTcTaxiOrderScreen:true,

        // Order
        OrderFrom:'',
        OrderPhone:'',
        OrderTo:'',

        // chat ----
        ChartCardNo:'',
        ChatLogInPassword:'',
        ChatChat:'',


        
        LogInNumber:'',
        LogInPassword:'',

        // log in profile
        IsUserNotLoggedIn:true,
        CheckUserLogInDetails:true,
        
        ClubMemberPayment:'',
        ClubMemberName:'',
        ClubMemberCardNo:'',        
        AccountStatus:'',

    }
    
}

UNSAFE_componentWillMount(){this.initializeClubUserName ();}
componentDidMount(){setTimeout(()=>{ this.setState({CheckUserLogInDetails:false})},3000);} 


initializeClubUserName = () => 
{
    try 
    {   
        AsyncStorage.getItem('TransportMemberDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].Name;
            let CardNo = jsonData[0].Number;
            this.setState({ClubMemberName:Name});
            this.setState({ClubMemberCardNo:CardNo});
            this.setState({IsUserNotLoggedIn:false});
            this.getUserDataFromHost(CardNo,APIGetTransportTaxiOrders,'TcTaxiUserOrders');
            this.getUserDataFromHost(CardNo,APIGetTransportBodaOrders,'TcBodaUserOrders');
            this.getAccountStatus(CardNo);
        }
        else {this.setState({IsUserNotLoggedIn:true})}
        })
    }catch (error) { console.log(error)}

}

getAccountStatus = (CardNo) =>
{
    axios.get(APIAccountStatusByCardNo+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let AccStatus = jsonResults[0].Status;
        this.setState({AccountStatus:AccStatus})
        })
    .catch(err=>{console.log(err);})   
}
getUserDataFromHost = (ClubMemberCardNo,APICall,StateName) =>
{
    axios.get(APICall+ClubMemberCardNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({[StateName]:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log("=====>>>"+err)})   
}

setLogInNumber = (text) =>{this.setState({LogInNumber:text});}
setLogInPassword = (text) =>{this.setState({LogInPassword:text});}

setOrderFrom = (text) =>{this.setState({OrderFrom:text});}
setOrderPhone = (text) =>{this.setState({OrderPhone:text});}
setOrderTo = (text) =>{this.setState({OrderTo:text});}

showProfileScreen = () =>
{
    this.setState({DoNotShowTcBodaScreen:true})
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowTcTaxiScreen:true})
    this.setState({DoNotShowProfileScreen:false})
}

showTcBodaScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowTcTaxiScreen:true})
    this.setState({DoNotShowProfileScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowTcBodaScreen:false})
}
showTcBodaHomeScreen = () =>
{this.setState({DoNowShowTcBodaOrderScreen:true});this.setState({ DoNowShowTcBodaHomeScreen:false})}
showTcBodaOrderScreen = () =>
{this.setState({DoNowShowTcBodaHomeScreen:true});this.setState({ DoNowShowTcBodaOrderScreen:false})}
    
showLogInScreen = () =>
{
    this.setState({DoNotShowProfileScreen:true})
    this.setState({DoNotShowTcBodaScreen:true})
    this.setState({DoNotShowTcTaxiScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowLogInScreen:false})
}
showTcTaxiScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowProfileScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowTcBodaScreen:true})
    this.setState({DoNotShowTcTaxiScreen:false})
}
showTcTaxiHomeScreen = () =>
    {this.setState({DoNowShowTcTaxiOrderScreen:true});this.setState({ DoNowShowTcTaxiHomeScreen:false})}
showTcTaxiOrderScreen = () =>
    {this.setState({DoNowShowTcTaxiHomeScreen:true});this.setState({ DoNowShowTcTaxiOrderScreen:false})}

showHomeScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowProfileScreen:true})
    this.setState({DoNotShowTcBodaScreen:true})
    this.setState({DoNotShowTcTaxiScreen:true})
    this.setState({DoNotShowHomeScreen:false})
}



logOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('TransportMemberDetails');
        this.setState({IsMemberLogeIn:false});
        Alert.alert("Information",LOGOUT_MSG)

    }catch (error) { console.log(error)}
}


logInUser = async () =>
{
    let number = this.state.LogInNumber;
    let logInNumber = convertToLowerCase(number);
    let logInPassword = this.state.LogInPassword;
    if ((number.length == 0) || (logInPassword.length == 0))
        {Alert.alert('Warning','Please All Fields Are Required ')}
    else
    {
        try
        {
            const loginRequest = await axios.get(APILogInClubMemberByCardNo+logInNumber)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                let userPassword  = jsonResults[0].Password;
                
                if ((CardNo !== number)&&(userPassword !== logInPassword ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    try {
                        let MemberDetails={Name:Name,Number:CardNo}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('TransportMemberDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ClubMemberName:Name});
                    this.setState({ClubMemberCardNo:CardNo});
                    this.setState({IsUserNotLoggedIn:false});
                    this.getUserDataFromHost (CardNo)
                    this.showProfileScreen();
                    this.getAccountStatus(CardNo)
                }
            }

        }

        catch (error)
            {
                Alert.alert("An Error",LOGIN_ERROR)
                console.log(error)
            };
    }
}

postUserTransportOder = async (Service) =>
{
    let number = this.state.ClubMemberCardNo;
    let name = this.state.ClubMemberName;
    let from = this.state.OrderFrom;
    let phone = this.state.OrderPhone;
    let to = this.state.OrderTo;
    

    if (from.length === 0 || to.length === 0)
        { Alert.alert("Information","From And To Can't Be Empty \n\n Please Try Again")}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostTransportOrder,
                {
                    "Name":name,
                    "Number":number,
                    "From":from,
                    "To":to,
                    "Phone":phone,
                    "Service":Service,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Order Status",name + "\n\n"+ result);
            if (Service === 'Boda'){this.showTcBodaHomeScreen()}
            else if (Service === 'Taxi'){this.showTcTaxiHomeScreen()}
            this.setState({OrderFrom:''})
            this.setState({OrderPhone:''})
            this.setState({OrderTo:''})
        }
        catch (error){Alert.alert("An Error", POSTING_ERROR)};
    }
}
renderNavigationButtons = () =>
{
    let AccountStatus = this.state.AccountStatus
    return(
        <View style={styles.MainNavigationBtnView1}>
        <View style={styles.MainNavigationBtnView}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            <View style={styles.MainNavigationBtnSpaceView} ></View>
                <View style={styles.ArrowMainView}>
                    <AntDesign name="rightcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                </View>
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                        onPress={this.showProfileScreen} >
                    <Text style = {styles.btnText}> Profile  </Text>
                </TouchableOpacity>

                <View style={styles.MainNavigationBtnSpaceView} ></View>
                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                    onPress={this.showTcBodaScreen} >
                    <Text style = {styles.btnText}> Tc Boda  </Text>
                </TouchableOpacity>

                <View style={styles.MainNavigationBtnSpaceView} ></View>
                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                    onPress={this.showTcTaxiScreen} >
                    <Text style = {styles.btnText}>Tc Taxi  </Text>
                </TouchableOpacity>

                <View style={styles.MainNavigationBtnSpaceView} ></View>
                <View style={styles.ArrowMainView}>
                    <AntDesign name="leftcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                </View>
                <View style={styles.MainNavigationBtnSpaceView} ></View>
            </ScrollView>
        </View>
        </View>
    );
}

render() {

    const {AccountStatus} = this.state;
    const {CheckUserLogInDetails,IsUserNotLoggedIn} = this.state;
    const { 
            DoNotShowProfileScreen,DoNotShowTcBodaScreen,DoNotShowTcTaxiScreen,
            DoNowShowTcBodaHomeScreen,DoNowShowTcBodaOrderScreen, DoNotShowHomeScreen,
            DoNowShowTcTaxiHomeScreen,DoNowShowTcTaxiOrderScreen
            } = this.state;

    const {ClubMemberName,TcTaxiUserOrders} = this.state;
    const {ClubMemberCardNo,TcBodaUserOrders,} = this.state;

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

            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View>
            </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.MainTopHeaderView} >
                        <View style={styles.MainTopHeaderTextView}>
                            <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc Transport{"\n"}Tc Boda Tc Taxi </Text>
                        </View>
                    </View>
                    <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
                    <View style={styles.MainTopRadiusSpaceBottomView} ></View>


                    {DoNotShowHomeScreen ? <></>:(<>
                        <View style={{height:5}} ></View>
                        {CheckUserLogInDetails ?(<>
                            <View style={styles.ApplyCardView3} >
                                <View style={{height:20}} ></View>
                                <View style={{alignItems:'center'}} >
                                    <View style={{height:30}} ></View>
                                    <Text style = {styles.AgencyNameText}> Checking Logging In Details</Text>
                                    <View style={{height:30}} ></View>
                                    <View style={styles.activityIndicatorContainer}>
                                        <ActivityIndicator size="large" color={COLORS.white}/>
                                    </View>
                                    <View style={{height:30}} ></View>
                                </View>
                            </View>
                        </>):(<>
                            {IsUserNotLoggedIn?(<>
                                <View style={styles.ApplyCardView} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <Image source={UserImg} style={styles.AgencyIcon}/>
                                    </View>
                                    <View style={{height:30}} ></View>

                                    <Text style = {styles.btnText}> User Log In  </Text>

                                    <TextInput style={styles.input} placeholder="Tc Number" onChangeText={text => this.setLogInNumber(text)}  
                                        placeholderTextColor = "#5800c4"/>

                                    <TextInput style={styles.input} placeholder="Password" onChangeText={text => this.setLogInPassword(text)}  
                                        placeholderTextColor = "#5800c4" secureTextEntry />

                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={()=>{ this.logInUser()}} >
                                        <Text style = {styles.btnText}> Log In  </Text>
                                        <View style={styles.ArrowMainViewLogIn}>
                                            <AntDesign style={styles.ArrowIconLogIn} name="login" size={25} color="white" />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>):(<>{this.showProfileScreen()}</>)}
                            </>)}
                    </>)}
                    <View style={{height:20}}></View>


                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Profile Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}

                    {  DoNotShowProfileScreen ? <></>:(<>
                        {this.renderNavigationButtons()}
                        <View style={{height:15}} ></View>
                        <View style = {[userProfileView(),getBackgroundColor(AccountStatus)]} >
                            <View style = {[styles.UserProfileImageView]} >
                                <Entypo name="user" size={90} color="white" />
                            </View>
                            <View style = {[styles.UserProfileNameView]} >
                                <Text style = {styles.btnText}>{ClubMemberName}</Text>

                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {convertToUpperCase(ClubMemberCardNo)} </Text>

                            </View>
                        </View>
                        
                        <View style={{height:20}} ></View>
                        <View style = {[mainTableTitleHandleView(),getBackgroundColor(AccountStatus)]} >
                            <Text style = { styles.tableTitleHandleText}> Boda Orders </Text>
                        </View>

                        <View style={styles.mainTableOuterView} >
                        {TcBodaUserOrders && TcBodaUserOrders.map((item, index) => (
                            <View key={index}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{convertToUpperCase(item.Number)}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Holder1}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.From}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.To}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Service}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Date}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LogInPassword}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                            </View>
                            ))}
                            </View>

                            <View style={{height:20}} ></View>
                            <View style = {[mainTableTitleHandleView(),getBackgroundColor(AccountStatus)]} >
                                <Text style = { styles.tableTitleHandleText}> Taxi Orders </Text>
                            </View>

                            <View style={styles.mainTableOuterView} >
                            {TcTaxiUserOrders && TcTaxiUserOrders.map((item, index) => (
                                <View key={index}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{convertToUpperCase(item.Number)}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Holder1}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.From}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.To}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Service}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Date}</Text>
                                    </View>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                                ))}
                                </View>
                                

                        <View style={{height:20}} ></View>
                        <View >
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth4(),getBackgroundColor(AccountStatus)]} onPress={this.logOutUser} >
                                <Text style = {styles.btnText}> Log Out  </Text>
                            </TouchableOpacity>
                        </View>
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Tc Boda Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    { DoNotShowTcBodaScreen ?<></>:(<>
                        {this.renderNavigationButtons()}
                        <View style={{height:20}} ></View>
                        <View style={{alignItems:'center'}} >
                            <Fontisto name="motorcycle" size={80} color={COLORS.colourNumberOne} />
                        </View>
                        {DoNowShowTcBodaHomeScreen?(<></>):(<>
                        <View style={{height:15}} ></View>
                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>
                                <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Triple Care  Boda</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. Enjoy Tc Ride</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showTcBodaOrderScreen} >
                                    <Text style = {styles.btnText}> Get A Ride Now  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                            </View>
                        </View>
                        </>)}

                        {DoNowShowTcBodaOrderScreen?(<></>):(<>
                        <View>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >....Ordering Tc Boda Now...</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >Enter Your Details & Submit </Text>
                                
                            <View style={styles.orderListDetailsText} >
                            
                                <TextInput style={styles.bookingInput}  editable = {false} defaultValue={ClubMemberName}  
                                placeholderTextColor = "#5800c4"/>

                                <TextInput style={[styles.bookingInput]}   editable = {false} defaultValue={ClubMemberCardNo}
                                placeholderTextColor = "#5800c4"/>

                                <TextInput style={[styles.bookingInput]} placeholder="Mobile Number"  onChangeText={text => this.setOrderPhone(text)}
                                placeholderTextColor = "#5800c4" />

                                <TextInput style={[styles.bookingInput]} placeholder="From :  Pickup Area"  onChangeText={text => this.setOrderFrom(text)}
                                placeholderTextColor = "#5800c4" />

                                <TextInput style={[styles.bookingInput]} placeholder="To :: End Point" onChangeText={text => this.setOrderTo(text)}
                                placeholderTextColor = "#5800c4" />

                                <TextInput style={[styles.bookingInput]} placeholder="Booking Time" onChangeText={text => this.setOrderTo(text)}
                                placeholderTextColor = "#5800c4" />

                                <View style={{alignItems:'center'}}>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={()=>this.postUserTransportOder('Boda')} >
                                    <Text style = {styles.btnText}> Submit  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]} onPress={this.showTcBodaHomeScreen}  >
                                    <Text style = {styles.btnText}>  Cancel This Ride</Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>

                            </View>
                            </View>
                        </View>
                        </>)}
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Tc Taxi  Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowTcTaxiScreen?<></>:(<>
                        {this.renderNavigationButtons()}
                        <View style={{height:20}} ></View>
                        <View style={{alignItems:'center'}} >
                            <Fontisto name="taxi" size={70} color={COLORS.colourNumberOne} />
                        </View>
                        <View style={{height:15}} ></View>

                        {DoNowShowTcTaxiHomeScreen?(<></>):(<>
                        <View style={{height:15}} ></View>
                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>
                                <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Triple Care  Taxi</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. Enjoy Tc Drive</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showTcTaxiOrderScreen} >
                                    <Text style = {styles.btnText}> Get A Drive Now  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                            </View>
                        </View>
                        </>)}

                        {DoNowShowTcTaxiOrderScreen?(<></>):(<>
                        <View>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >....Ordering Tc Taxi Now...</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >Enter Your Details & Submit </Text>
                                
                            <View style={styles.orderListDetailsText} >
                            
                                <TextInput style={styles.bookingInput}  editable = {false} defaultValue={ClubMemberName}  
                                placeholderTextColor = "#5800c4"/>

                                <TextInput style={[styles.bookingInput]}   editable = {false} defaultValue={ClubMemberCardNo}
                                placeholderTextColor = "#5800c4"/>

                                <TextInput style={[styles.bookingInput]} placeholder="Mobile Number"  onChangeText={text => this.setOrderPhone(text)}
                                placeholderTextColor = "#5800c4" />

                                <TextInput style={[styles.bookingInput]} placeholder="From :  Pickup Area"  onChangeText={text => this.setOrderFrom(text)}
                                placeholderTextColor = "#5800c4" />

                                <TextInput style={[styles.bookingInput]} placeholder="To :: End Point" onChangeText={text => this.setOrderTo(text)}
                                placeholderTextColor = "#5800c4" />

                                <TextInput style={[styles.bookingInput]} placeholder="Booking Time" onChangeText={text => this.setOrderTo(text)}
                                placeholderTextColor = "#5800c4" />
                                
                                <View style={{alignItems:'center'}}>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={()=>this.postUserTransportOder('Taxi')} >
                                    <Text style = {styles.btnText}> Submit  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]} onPress={this.showTcTaxiHomeScreen}  >
                                    <Text style = {styles.btnText}>  Cancel This Drive</Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                            </View>
                            </View>
                        </View>
                        </>)}
                    </>)}

                
            </ScrollView>
            </View>
    );
}
}
