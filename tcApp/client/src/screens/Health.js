
import React from 'react';
import {Text, View, Alert,TextInput,TouchableOpacity,ActivityIndicator,Image,ScrollView} from 'react-native';
import styles from "./stylesheet";
import { Entypo,Ionicons, AntDesign,FontAwesome } from '@expo/vector-icons';
import axios from "axios";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from './Colours';
import {
        APIHealthUserLogIn,APIPostHealthRequest,
        APIGetHealthRequestDetails,APIAccountStatusByCardNo,
        } from './DataFileApis';
import 
    { 
        LOGOUT_MSG,POSTING_ERROR,HEALTH_NO_USER_FOUND_ERROR,EMPTY_INPUTS_ERROR,
        LOADING_ERROR,LOGIN_ERROR,getTime,getDate,getDay, 
    } from './Functions';

import { 
            HealthHospitalsData,HealthInsuranceData 
        } 
    from './AppDataFile';

import {
    getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,trTdText,
    mainNavigationBtnWidth1,mainTableTitleHandleView2,getBorderBottomColor,
    mainNavigationBtnWidth4,userProfileView,
} from './StatusFunctions'

import { LoadTcHealthAppData } from './AppDataFile';

import UserImg from "../imgs/user.png";


export default class Health extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        UserCheckedInDetails:[],
        UserCheckedOutDetails:[],
        // AdminCheckedOutDetails:[],
        // AdminPendingCheckedInDetails:[],
        // AdminViewUserDetails:[],    
        UserHasNotCheckedOutDetails:[],
        UserRequestsDetails:[],
            
        // Major Screens
        DoNotShowHomeScreen:false,
        DoNotShowUserScreen:true,

        // Inner Screens
        DoNotShowUserProfileScreen:false,
        DoNotShowUserInsuranceHospitalsScreen:true,
        DoNotShowUserInsuranceRequestScreen:true,
        DoNotShowUserInsuranceInsurancesScreen:true,


        // Log ins
        IsUserNotLoggedIn:true,
        CheckUserLogInDetails:true,
        UserName:'',
        UserPassword:'',
    
    

        // User Accounts
        AccountStatus:'',
        ClubMemberName:'',
        ClubMemberCardNo:'',
        // ClubMemberImage:'',
        // AgencyUserCheckedInId:'',
        // AgencyUserCheckedInName:'',
        
        // UserProviderName:'',
        // UserProviderNo:'',

        // Request
        HospitalValue:'',
        CountryValue:'',
        InsuranceValue:'',
        UserRequestsNoDetails:'',
        
        
    }   
}

UNSAFE_componentWillMount()
{
    this.initializeClubUserName (); 
}

componentDidMount() {

    setTimeout(()=>{ this.setState({CheckUserLogInDetails:false})},3000);
    LoadTcHealthAppData();

}
setUserUserName = (text) => {this.setState({UserName:text})}
setUserPassword = (text) => {this.setState({UserPassword:text})}

setHospitalValue  = (text) =>{this.setState({HospitalValue:text});}
setCountryValue  = (text) =>{this.setState({CountryValue:text});}
setInsuranceValue  = (text) =>{this.setState({InsuranceValue:text});}

// Major Screens
showHomeScreen = () =>
{
    this.setState({DoNotShowUserScreen:true})
    this.setState({DoNotShowHomeScreen:false})
}
showUserScreen = () =>
{
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowUserScreen:false})
}
// Inner Screens
showUserProfileScreen = ()=>
{
    this.setState({DoNotShowUserInsuranceHospitalsScreen:true})
    this.setState({DoNotShowUserInsuranceRequestScreen:true})
    this.setState({DoNotShowUserInsuranceInsurancesScreen:true})
    this.setState({DoNotShowUserProfileScreen:false})
    this.getUserRequestsInDetails(this.state.ClubMemberCardNo);
}
showUserInsuranceHospitalsScreen = ()=>
{

    this.setState({DoNotShowUserInsuranceRequestScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserInsuranceInsurancesScreen:true})
    this.setState({DoNotShowUserInsuranceHospitalsScreen:false})
}
showUserInsuranceInsurancesScreen = ()=>
{
    // this.getUserRequestsInDetails(this.state.ClubMemberCardNo) 
    this.setState({DoNotShowUserInsuranceRequestScreen:true})
    this.setState({DoNotShowUserInsuranceHospitalsScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserInsuranceInsurancesScreen:false})
}

showUserInsuranceRequestScreen = ()=>
{
    this.setState({DoNotShowUserInsuranceInsurancesScreen:true})
    this.setState({DoNotShowUserInsuranceHospitalsScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserInsuranceRequestScreen:false})
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

getUserRequestsInDetails = (CardNo) =>
{
    axios.get(APIGetHealthRequestDetails+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        if (results.length === 2){ this.setState({UserRequestsNoDetails:HEALTH_NO_USER_FOUND_ERROR});}
        else
            {
            let results = JSON.stringify(res.data); 
            let jsonData = JSON.parse(results)
                this.setState({UserRequestsDetails:[...JSON.parse(results)]})
                // let Id = jsonData[0].id;
                // let Name = jsonData[0].Name;
                // this.setState({AgencyUserCheckedInId:Id})
                // this.setState({AgencyUserCheckedInName:Name})
            }
        })
    .catch(err=>{console.log(err);})
    
}


initializeClubUserName = () => 
{
    try 
    {   
        AsyncStorage.getItem('HealthMemberDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].Name;
            let CardNo = jsonData[0].Number;
            let ClubNumber = jsonData[0].TcNumber;

            this.setState({ClubMemberName:Name});
            this.setState({ClubMemberCardNo:CardNo});
            this.getUserRequestsInDetails(CardNo) 
            this.getAccountStatus(ClubNumber);
            this.setState({IsUserNotLoggedIn:false});
        }
        else {this.setState({IsUserNotLoggedIn:true})}
        })
    }catch (error) { console.log(error)}

}


userLogIn = async () =>
{
    let ClubLogInName = this.state.UserName;
    let ClubLogInPassword = this.state.UserPassword;
    if ((ClubLogInName.length === 0) || (ClubLogInPassword.length === 0))
        {Alert.alert('Log In Error',EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIHealthUserLogIn+ClubLogInName)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].Number;
                let userPassword  = jsonResults[0].Password;
                if ((CardNo !== ClubLogInName)&&(userPassword !== ClubLogInPassword ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    let Number = jsonResults[0].Number;
                    let ClubNumber = jsonResults[0].Holder1;
                    try {
                            let MemberDetails={Name:Name,Number:Number,TcNumber:ClubNumber}
                            const Details  = []
                            Details.push(MemberDetails)
                            await AsyncStorage.setItem('HealthMemberDetails',JSON.stringify(Details));
                            
                        } 
                    catch (error) {console.log(error)}
                    this.setState({ClubMemberName:Name});
                    this.setState({ClubMemberCardNo:Number});
                    this.getUserRequestsInDetails(CardNo) 
                    this.getAccountStatus(ClubNumber)
                    this.showUserScreen();
                }
            }

        }

        catch (error){ console.log(error); Alert.alert("An Error",LOGIN_ERROR)};
    }
}
logOutUser = async () => 
{
    Alert.alert("Information",LOGOUT_MSG)
    this.showHomeScreen();
    try 
    {   
        await AsyncStorage.removeItem ('HealthMemberDetails');
        Alert.alert("Information",LOGOUT_MSG)
        // this.showHomeScreen();
        // this.setState({CheckUserLogInDetails:true});
        this.setState({IsUserNotLoggedIn:true})
    }catch (error) { console.log(error)}
}


postUserRequest = async () =>
{
    let number = this.state.ClubMemberCardNo;
    let name = this.state.ClubMemberName;
    let hospital = this.state.HospitalValue;
    let country = this.state.CountryValue;
    let insurance = this.state.InsuranceValue;
    

    if (hospital.length === 0 || insurance.length === 0)
        { Alert.alert("Information","Hospital And Insurance Values Can't Be Empty \n\n Please Try Again")}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostHealthRequest,
                {
                    "Name":name,
                    "Number":number,
                    "Hospital":hospital,
                    "Country":country,
                    "Insurance":insurance
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Request Status",name + "\n\n"+ result);
            this.showUserProfileScreen();
        }
        catch (error)
            {
                // console.log("+++++++++++++++++"+error);
                Alert.alert("An Error", POSTING_ERROR)
            };
    }
}



render() {
    const {ClubMemberName,ClubMemberCardNo,CheckUserLogInDetails,IsUserNotLoggedIn} = this.state;
    const {UserRequestsDetails,UserRequestsNoDetails} = this.state;
    const {HospitalValue,CountryValue,InsuranceValue,AccountStatus} = this.state;
    const {DoNotShowHomeScreen,DoNotShowUserScreen,DoNotShowUserInsuranceRequestScreen} = this.state;
    const {DoNotShowUserProfileScreen,DoNotShowUserInsuranceHospitalsScreen,DoNotShowUserInsuranceInsurancesScreen,DoNotShowAdminProfileScreen,DoNotShowAdminInsuranceHospitalsScreen,DoNotShowAdminInsuranceInsurancesScreen,DoNotShowAdminPendingInsuranceHospitalsScreen} =this.state;

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
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}>Welcome To Tc Health {"\n"}Insurance Services   </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

                <View style={styles.MainNavigationBtnSpaceView} ></View>
                <View style={styles.MainNavigationBtnView}>
                    <Text style = {styles.btnText4}>...  </Text>
                </View>

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                ====================================================================
            */}
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

                                <TextInput style={styles.input} placeholder="User Name" onChangeText={text => this.setUserUserName(text)}  
                                    placeholderTextColor = "#5800c4"/>

                                <TextInput style={styles.input} placeholder="Password" onChangeText={text => this.setUserPassword(text)}  
                                    placeholderTextColor = "#5800c4" secureTextEntry />

                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.userLogIn} >
                                    <Text style = {styles.btnText}> Log In  </Text>
                                    <View style={styles.ArrowMainViewLogIn}>
                                        <AntDesign style={styles.ArrowIconLogIn} name="login" size={25} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>):(<>{this.showUserScreen()}</>)}
                    </>)}
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

            {DoNotShowUserScreen ?<></>:(<>    
                <View style={{height:15}} ></View>
                <View style={styles.MainNavigationBtnView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="rightcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                        </View>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserProfileScreen} >
                            <Text style = {styles.btnText}> Profile  </Text>
                        </TouchableOpacity>


                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserInsuranceHospitalsScreen} >
                            <Text style = {styles.btnText}> Hospitals </Text>
                        </TouchableOpacity>
                        

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserInsuranceInsurancesScreen} >
                            <Text style = {styles.btnText}> Insurances  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserInsuranceRequestScreen} >
                            <Text style = {styles.btnText}> Request  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="leftcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                        </View>
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                    </ScrollView>
                </View>

                {DoNotShowUserProfileScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>
                    <View style = {[userProfileView(),getBackgroundColor(AccountStatus)]} >
                        <View style = {[styles.UserProfileImageView]} >
                            <Entypo name="user" size={90} color="white" />
                        </View>
                        <View style = {[styles.UserProfileNameView]} >
                            <Text style = {styles.btnText}>{ClubMemberName}</Text>
                            
                            <View style={{height:20}} ></View>
                            <Text style = {styles.AgencyNameText}> {ClubMemberCardNo} </Text>
                        </View>
                    </View>

                    <View style={{height:20}} ></View>
                    <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AccountStatus)]} >
                        <Text style = { styles.tableTitleHandleText}> Your Request Details </Text>
                    </View>
                    <View style={styles.mainTableOuterView} >
                        {UserRequestsNoDetails === '' ?(<>
                            {UserRequestsDetails && UserRequestsDetails.map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Number}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Hospital}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Country}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Insurance}</Text>
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
                            </>):
                                (<><Text style = {[,getPlainColor(AccountStatus),styles.NoUserFound]}>{UserRequestsNoDetails}  </Text></>)
                            }
                    </View>

                    <View style={{height:20}} ></View>
                    <View style={{alignItems:'center'}} >
                        <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth4(),getBackgroundColor(AccountStatus)]} onPress={this.logOutUser} >
                            <Text style = {styles.btnText}> Log Out  </Text>
                        </TouchableOpacity>
                    </View>
                </>)}

                {DoNotShowUserInsuranceHospitalsScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>
                    {/* <View style={styles.ApplyCardView}> */}
                        {HealthHospitalsData[0] && HealthHospitalsData[0].map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                    
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Location}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Address}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ContactPerson}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ContactPhone}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Country}</Text>
                                    </View>
                                    
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                            </View>
                            ))}
                    {/* </View> */}
                </>)}

                {DoNotShowUserInsuranceInsurancesScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>
                    {HealthInsuranceData[0] && HealthInsuranceData[0].map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                    
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Country}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        ))}
                </>)}

                {DoNotShowUserInsuranceRequestScreen ?(<></>):(<>
                    <View style={{height:20}} ></View>
                    <Text style={styles.AboutTitleText} >Request For Tc Health Insurance </Text>
                    <View style={styles.orderListDetailsText} >
                    
                    <View>
                        <TextInput style={styles.bookingInput} placeholder="Country" editable = {false} defaultValue={ClubMemberName}  
                        placeholderTextColor = "#5800c4"
                        />

                        <TextInput style={[styles.bookingInput]} placeholder="Date"  editable = {false} defaultValue={ClubMemberCardNo}
                        placeholderTextColor = "#5800c4" 
                        />
                        <View style={{height:20}} ></View>
                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={HospitalValue}
                                
                                onValueChange={(itemValue) =>this.setHospitalValue(itemValue)}>
                                    <Picker.Item label="Your Hospital"/> 
                                    {HealthHospitalsData[0] && HealthHospitalsData[0].map((item,index) => (
                                    <Picker.Item label={item.Name} value={item.Name} key={index} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:20}} ></View>
                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={CountryValue}
                                
                                onValueChange={(itemValue) =>this.setCountryValue(itemValue)}>
                                    <Picker.Item label="In Which Country"/> 
                                    {HealthHospitalsData[0] && HealthHospitalsData[0].map((item,index) => (
                                    <Picker.Item label={item.Country} value={item.Country} key={index} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:20}} ></View>
                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={InsuranceValue}
                                
                                onValueChange={(itemValue) =>this.setInsuranceValue(itemValue)}>
                                    <Picker.Item label="Insurance Type"/> 
                                    {HealthInsuranceData[0] && HealthInsuranceData[0].map((item,index) => (
                                    <Picker.Item label={item.Name} value={item.Name} key={index} /> 
                                    ))}
                            </Picker>
                        </View>
                        

                        <View style={{alignItems:'center', marginTop:20}} >
                        {/* <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                            <Text style = {styles.btnText}> Submit </Text>
                        </TouchableOpacity> */}
                        {/* <View style={{height:20}} ></View> */}
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.postUserRequest()}} >
                            <Text style = {styles.btnText}> Submit Request  </Text>
                        </TouchableOpacity>
                        <View style={{height:20}} ></View>
                        </View>
                    </View>
                    </View>

                </>)}
            </>)}



                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
