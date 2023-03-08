
import React from 'react';
import {Text, View, Alert,TextInput,TouchableOpacity,Platform,ActivityIndicator,Image,ScrollView} from 'react-native';
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
        LOADING_ERROR,LOGIN_ERROR 
    } from './Functions';

import { 
            HealthHospitalsData,HealthInsuranceData,HealthBenefits,HealthAInPatientCover,
            HealthBOutPatientCover,HealthCDentalCover,HealthOpticalCover,HealthMaternityCover,HealthFuneralExpenses,

            HealthPeadiatrics,HealthGeneralPractitioners,HealthObstetricsAndGynaecology,HealthPaediatrics,HealthOpticalFacilities,HealthDentalFacilities
        } 
    from './AppDataFile';

import {
    getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,trTdText,
    mainNavigationBtnWidth1,mainTableTitleHandleView2,getBorderBottomColor,
    mainNavigationBtnWidth4,userProfileView3,
} from './StatusFunctions'


import UserImg from "../imgs/user.png";


export default class Health extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        UserCheckedInDetails:[],
        UserCheckedOutDetails:[],
        UserHasNotCheckedOutDetails:[],
        UserRequestsDetails:[],
            
        // Major Screens
        DoNotShowHomeScreen:false,
        DoNotShowUserScreen:true,

        // Inner Screens
        DoNotShowUserProfileScreen:false,
        DoNotShowUserInsuranceHospitalsScreen:true,
        DoNotShowUserInsuranceRequestScreen:true,
        DoNotShowUserInsuranceAboutScreen:true,
        DoNotShowUserInsuranceCoversScreen:true,


        // Log ins
        IsUserNotLoggedIn:true,
        CheckUserLogInDetails:true,
        UserName:'',
        UserPassword:'',
    
    

        // User Accounts
        CoverSelectedState:'',
        HospitalSelectedState:'',
        AccountStatus:'',
        ClubMemberName:'',
        ClubMemberCardNo:'',
        

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

    setTimeout(this.checkUserLogInDetails,3000);

}
checkUserLogInDetails = () =>{this.setState({CheckUserLogInDetails:false})}
setCoverSelectedState = (text) => {this.setState({CoverSelectedState:text})}
setHospitalSelectedState = (text) => {this.setState({HospitalSelectedState:text})}
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
    this.setState({DoNotShowUserInsuranceCoversScreen:true})
    this.setState({DoNotShowUserInsuranceAboutScreen:true})
    this.setState({DoNotShowUserProfileScreen:false})
    this.getUserRequestsInDetails(this.state.ClubMemberCardNo);
}
showUserInsuranceHospitalsScreen = ()=>
{

    this.setState({DoNotShowUserInsuranceRequestScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserInsuranceCoversScreen:true})
    this.setState({DoNotShowUserInsuranceAboutScreen:true})
    this.setState({DoNotShowUserInsuranceHospitalsScreen:false})
}
ShowUserInsuranceAboutScreen = ()=>
{
    this.setState({DoNotShowUserInsuranceRequestScreen:true})
    this.setState({DoNotShowUserInsuranceHospitalsScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserInsuranceCoversScreen:true})
    this.setState({DoNotShowUserInsuranceAboutScreen:false})
}
ShowUserInsuranceCoversScreen = ()=>
{
    this.setState({DoNotShowUserInsuranceRequestScreen:true})
    this.setState({DoNotShowUserInsuranceHospitalsScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserInsuranceAboutScreen:true})
    this.setState({DoNotShowUserInsuranceCoversScreen:false})
}
showUserInsuranceRequestScreen = ()=>
{
    this.setState({DoNotShowUserInsuranceAboutScreen:true})
    this.setState({DoNotShowUserInsuranceCoversScreen:true})
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

renderHospitalsUiTable = (Hospitals) =>
{
    let AccountStatus = this.state.AccountStatus;
    console.log(JSON.stringify(Hospitals));
    <View >
    {Hospitals.map((item, index) => ( 
        <View key={index}> 
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            <View style={styles.mainTableView}>
                
                <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                    <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                </View>

                <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                    <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                </View>

                <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                    <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                </View>

                <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                    <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                </View>

                <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                    <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                </View>

                <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                    <View style={{width:20}} ></View>
                </View>
            </View>
        </ScrollView>
        </View>
        ))}
    </View> 
}

renderCoverUiTable = (Data) =>
{
    let AccountStatus = this.state.AccountStatus;
    console.log(JSON.stringify(Data));
    <View>
        {Data.map((item, index) => ( 
            <View key={index}> 
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.mainTableView}>
                    
                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                    </View>

                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                    </View>

                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                        <View style={{width:20}} ></View>
                    </View>
                </View>
            </ScrollView>
        </View>
        ))}
    </View>
}

render() {
    const {ClubMemberName,ClubMemberCardNo,CheckUserLogInDetails,IsUserNotLoggedIn} = this.state;
    const {UserRequestsDetails,UserRequestsNoDetails,HospitalSelectedState,CoverSelectedState} = this.state;
    const {HospitalValue,CountryValue,InsuranceValue,AccountStatus} = this.state;
    const {DoNotShowHomeScreen,DoNotShowUserScreen,DoNotShowUserInsuranceRequestScreen} = this.state;
    const {DoNotShowUserProfileScreen,DoNotShowUserInsuranceHospitalsScreen,DoNotShowUserInsuranceAboutScreen,DoNotShowUserInsuranceCoversScreen} =this.state;

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

                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}>Welcome To Tc Health {"\n"}Insurance Services {"\n"}With Jubilee   </Text>
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
                <ScrollView showsVerticalScrollIndicator={false} >
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
            </ScrollView>
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
                                    onPress={this.ShowUserInsuranceAboutScreen} >
                                <Text style = {styles.btnText}> About  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                    onPress={this.ShowUserInsuranceCoversScreen} >
                                <Text style = {styles.btnText}> Covers  </Text>
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
                    
                    <ScrollView showsVerticalScrollIndicator={false} >
                    {DoNotShowUserProfileScreen ?(<></>):(<>
                        <View style={{height:15}} ></View>
                        <View style = {[userProfileView3(),getBackgroundColor(AccountStatus)]} >
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
                        {Platform.OS === 'android'?(<>
                            <View style={styles.pickerSelectionInputView1}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={CoverSelectedState}
                                    
                                    onValueChange={(itemValue) =>this.setHospitalSelectedState(itemValue)}>
                                        <Picker.Item label="Select Cover"/> 
                                        <Picker.Item  label="Peadiatrics" value="HealthPeadiatrics" /> 
                                        <Picker.Item  label="Paediatrics" value="HealthPaediatrics" /> 
                                        <Picker.Item  label="Optical Facilities" value="HealthOpticalFacilities" /> 
                                        <Picker.Item  label="Dental Facilities" value="HealthDentalFacilities" /> 
                                        <Picker.Item  label="General Practitioners" value="HealthGeneralPractitioners" /> 
                                        <Picker.Item  label="Obstetrics & Gynaecology" value="HealthObstetricsAndGynaecology" /> 
                                </Picker>
                            </View>
                        </>):(<>
                            {/* IOS */}
                            <View style={styles.iOSPickerSelectionInputView}>
                                <Picker 
                                    itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                    selectedValue={CoverSelectedState}
                                    
                                    onValueChange={(itemValue) =>this.setHospitalSelectedState(itemValue)}>
                                        <Picker.Item label="Select Cover"/> 
                                        <Picker.Item  label="Peadiatrics" value="HealthPeadiatrics" /> 
                                        <Picker.Item  label="Paediatrics" value="HealthPaediatrics" /> 
                                        <Picker.Item  label="Optical Facilities" value="HealthOpticalFacilities" /> 
                                        <Picker.Item  label="Dental Facilities" value="HealthDentalFacilities" /> 
                                        <Picker.Item  label="General Practitioners" value="HealthGeneralPractitioners" /> 
                                        <Picker.Item  label="Obstetrics & Gynaecology" value="HealthObstetricsAndGynaecology" /> 
                                </Picker>
                            </View>
                        </>)}

                        <View style={{height:15}} ></View>
                        {HospitalSelectedState && HospitalSelectedState === "HealthPeadiatrics"?(<>
                            <Text style={styles.AboutTitleText} >PEADIATRICS </Text>
                            {/* {this.renderHospitalsUiTable(HealthPeadiatrics)} */}
                            {HealthPeadiatrics.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {HospitalSelectedState && HospitalSelectedState === "HealthGeneralPractitioners"?(<>
                            <Text style={styles.AboutTitleText} >GENERAL PRACTITIONERS</Text>
                            {/* {this.renderHospitalsUiTable(HealthGeneralPractitioners)} */}
                            {HealthGeneralPractitioners.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {HospitalSelectedState && HospitalSelectedState === "HealthObstetricsAndGynaecology"?(<>
                            <Text style={styles.AboutTitleText} >OBSTETRICS & GYNAECOLOGY</Text>
                            {/* {this.renderHospitalsUiTable(HealthObstetricsAndGynaecology)} */}
                            {HealthObstetricsAndGynaecology.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {HospitalSelectedState && HospitalSelectedState === "HealthPaediatrics"?(<>
                            <Text style={styles.AboutTitleText} >PAEDIATRICS</Text>
                            {/* {this.renderHospitalsUiTable(HealthPaediatrics)} */}
                            {HealthPaediatrics.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {HospitalSelectedState && HospitalSelectedState === "HealthOpticalFacilities"?(<>
                            <Text style={styles.AboutTitleText} >OPTICAL FACILITIES</Text>
                            {/* {this.renderHospitalsUiTable(HealthOpticalFacilities)} */}
                            {HealthOpticalFacilities.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {HospitalSelectedState && HospitalSelectedState === "HealthDentalFacilities"?(<>
                            <Text style={styles.AboutTitleText} >DENTAL FACILITIES</Text>
                            {/* {this.renderHospitalsUiTable(HealthDentalFacilities)} */}
                            {HealthDentalFacilities.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.LOCATION}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.PROVIDER}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.ADDRESS}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.SERVICES}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TIME}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                    </>)}

                    {DoNotShowUserInsuranceAboutScreen ?(<></>):(<>
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Scope of Cover</Text>
                        <Text style={styles.AboutText} >
                            Overall, the cover provides for medical and surgical expenses reasonably incurred by the
                            insured members as a direct result of their sustaining accidental bodily injury and/or illness
                            and/or a disease within the period of insurance.{"\n\n"}
                            Employees actively in service between the ages of 18 years and 60 years are eligible for
                            cover. A member already in the scheme can have cover extended up to 65 years of age
                            provided that he/she remains in active service and Jubilee is satisfied with his/her detailed
                            medical report.{"\n\n"}
                            Dependent children are eligible for cover from 0 month (a baby term of 38 weeks) of age up
                            till the age of 18 years.{"\n\n"}
                            While we anticipate that all eligible members will enroll into the scheme, the minimum
                            enrolment for the scheme must be 90% of all eligible members and dependents. The waiting
                            period before cover commences for a new employee is 0 days (No waiting period)
                        </Text>
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Coverage for Hospitalization (Inpatient Cover)</Text>
                        <Text style={styles.AboutText} >
                            Inpatient cover provides for medically necessary hospital bed charges, doctor’s bills,
                            anesthetist’s bills, operating theatre fees, pharmacy, laboratory and investigations
                            reasonably incurred by an insured member. This cover will be on credit facility with our
                            providers. 
                        </Text>
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Outpatient Services</Text>
                        <Text style={styles.AboutText} >
                            Members of the scheme will have a choice of medical attendant but treatment will be
                            restricted to medical practitioners registered with the Uganda Practitioners & Dentists
                            Board. Cover will be on credit facility basis with our providers.
                        </Text>
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Dental and Optical Cover</Text>
                        <Text style={styles.AboutText} >
                            • The Dental cover provides for cost of fillings, x-rays, extractions including surgical
                            extraction together with anaesthetics fees{"\n\n"}
                            •
                            The Optical cover provides for the cost of eyeglasses and eye testing. Please note
                            that eyeglasses are limited to one pair every two years, unless otherwise proven to
                            be medically necessary 
                        </Text>

                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Exclusions (This insurance excludes)</Text>
                        <Text style={styles.AboutText} >
                            1. Expenses incurred as a result of a Member’s participation in:{"\n\n"}
                            (a) Naval, military or air force service or operations;{"\n\n"}
                            (b) Winter sports, water sports mountaineering, hunting, polo, racing on horseback,
                            professional rugby or professional league football, motorcycle racing or motor racing on
                            machines of greater than 250 c.c.;{"\n\n"}
                            (c) Riding or driving in any kind of race;{"\n\n"}
                            (d) Air travel except as a fare-paying passenger in any aircraft licensed for passenger
                            carrying. Cover shall not in any event apply to a Member whilst operating, learning to
                            operate or serving as a Member of a crew of any aircraft or to travel in any aircraft being
                            used for sky-diving, racing, testing or exploration.{"\n\n\n"}
                            2. Expenses directly or indirectly incurred as a result of:{"\n\n"}
                            (a) War (“declared or undeclared”) and injury as a result of a member participating in
                            riot, strike and civil commotion.{"\n\n"}
                            (b) Intentional self-injury, suicide or attempted suicide, Member’s own criminal act,
                            intoxication, the use of drugs not prescribed by a physician;{"\n\n"}
                            (c) Nervous breakdown, general debility, psychoneurosis, general “overhaul” or
                            vaccination (save for UNEPI approved vaccines for children below 3years), or any treatment
                            undertaken or carried out as a preventative measure;{"\n\n"}
                            (d) Treatment by chiropractors, acupuncturists and herbalists, stays and/or maintenance
                            or treatment received in nature cure clinics or similar establishments or private beds
                            registered within a nursing home, sanatoria, convalescent and/or rest homes or ‘cures’
                            attached to such establishments;{"\n\n"}
                            (e) Fertility treatment i.e. costs of treatment related to infertility and impotence;
                            (f) Cosmetic or beauty treatment and/or cosmetic surgery;{"\n\n"}
                            (g) Treatment for, or related to developmental and or behavioral problems, including but
                            not limited to learning difficulties and behavioral problems;{"\n\n"}
                            (h) Hearing tests or cost of hearing aids unless necessitated by an injury caused solely
                            and directly by an accident{"\n\n"}
                            (i) Massage (except where certified as a necessary part of treatment following an
                            accident or illness covered under this Policy);{"\n\n"}
                            (j) Any injury, illness or disease specified as an exclusion;{"\n\n"}
                            (k) Medical Check-up except as indicated in the schedule;{"\n\n"}
                            (l) Treatment for dependency on or abuse of alcohol, drugs, any substance abuse or any
                            other addictive conditions of any kind and complications, injury or illness arising directly or
                            indirectly from such abuse or addiction{"\n\n"}
                            (m) Claims arising or related or associated with Epidemics/Pandemics or unknown
                            diseases.{"\n\n"}
                            (n) Any claim for expenses relating to any contingency arising whilst the Member is
                            outside the territorial limits of East Africa & or as stated under the endorsement herein, but
                            this limitation shall not apply to any Member temporarily abroad and requiring emergency
                            treatment for an illness or injury that occurs during the period of travel provided that such
                            period does not exceed six weeks in any one visit. Travel and accommodation costs are not
                            covered.{"\n\n\n"}
                            3.Charges recoverable under any Worker’s Compensation Act insurance, Group
                            personal accident and or any other insurance, Government Health Services Schemes of
                            compensation or any other medical plan. In the event that expenses incurred by a member
                            who utilizes this medical scheme in the first instance are recoverable from such insurances
                            and or health scheme, then the Employer shall reimburse Us the said amount within 30
                            working days after the said medical bills are presented by Us to the Employer.{"\n\n\n"}
                            4. Terrorism Exclusion Clause:
                            This contract is extended to provide cover to an insured person in the event of injury caused
                            by violent accidental external and visible means arising from war, invasion, Act of Foreign
                            Enemy, Hostilities or Warlike Operations (Whether War be declared or not) Civil War,
                            Rebellion, Revolution, Insurrection, Military or Usurped Power but excluding cover
                            consequent upon an Insured person directly and actively participating or engaging in such
                            activities whether whilst serving in armed forces or otherwise save for civilian insureds to
                            the extent only of adopting or taking such action or steps as were reasonably necessary for
                            the protection of himself, his family or his employers’ proper
                        </Text>
                    </>)}  




                    {DoNotShowUserInsuranceCoversScreen ?(<></>):(<>
                        <View style={{height:15}} ></View>
                        {Platform.OS === 'android'?(<>
                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={CoverSelectedState}
                                
                                onValueChange={(itemValue) =>this.setCoverSelectedState(itemValue)}>
                                    <Picker.Item label="Select Any"/> 
                                    <Picker.Item  label="Benefits" value="HealthBenefits" /> 
                                    <Picker.Item  label="Dental Cover" value="HealthCDentalCover" /> 
                                    <Picker.Item  label="Optical Cover" value="HealthOpticalCover" /> 
                                    <Picker.Item  label="Maternity Cover" value="HealthMaternityCover" /> 
                                    <Picker.Item  label="In Patient Cover" value="HealthAInPatientCover" /> 
                                    <Picker.Item  label="Funeral Expenses" value="HealthFuneralExpenses" /> 
                                    <Picker.Item  label="Out Patient Cover" value="HealthBOutPatientCover" /> 
                            </Picker>
                        </View>
                        </>):(<>
                            {/* IOS */}
                            <View style={styles.iOSPickerSelectionInputView}>
                                <Picker 
                                    itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                    selectedValue={CoverSelectedState}
                                    
                                    onValueChange={(itemValue) =>this.setCoverSelectedState(itemValue)}>
                                        <Picker.Item label="Select Any"/> 
                                        <Picker.Item  label="Benefits" value="HealthBenefits" /> 
                                        <Picker.Item  label="Dental Cover" value="HealthCDentalCover" /> 
                                        <Picker.Item  label="Optical Cover" value="HealthOpticalCover" /> 
                                        <Picker.Item  label="Maternity Cover" value="HealthMaternityCover" /> 
                                        <Picker.Item  label="In Patient Cover" value="HealthAInPatientCover" /> 
                                        <Picker.Item  label="Funeral Expenses" value="HealthFuneralExpenses" /> 
                                        <Picker.Item  label="Out Patient Cover" value="HealthBOutPatientCover" /> 
                                </Picker>
                        </View>
                        </>)}
                        <View style={{height:15}} ></View>
                        {CoverSelectedState && CoverSelectedState === "HealthBenefits"?(<>
                            <Text style={styles.AboutTitleText} >BENEFITS SUMMARY</Text>
                            {/* {this.renderCoverUiTable(HealthBenefits)} */}
                            {HealthBenefits.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                            </>):(<></>) }
                        
                        {CoverSelectedState && CoverSelectedState === "HealthAInPatientCover"?(<>
                            <Text style={styles.AboutTitleText} >IN - PATIENT COVER</Text>
                            {/* {this.renderCoverUiTable(HealthAInPatientCover)} */}
                            {HealthAInPatientCover.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}

                        {CoverSelectedState && CoverSelectedState === "HealthBOutPatientCover"?(<>
                            <Text style={styles.AboutTitleText} >OUT- PATIENT COVER</Text>
                            {/* {this.renderCoverUiTable(HealthBOutPatientCover)} */}
                            {HealthBOutPatientCover.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}

                        {CoverSelectedState && CoverSelectedState === "HealthCDentalCover"?(<>
                            <Text style={styles.AboutTitleText} >DENTAL COVER</Text>
                            {/* {this.renderCoverUiTable(HealthCDentalCover)} */}
                            {HealthCDentalCover.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}

                        {CoverSelectedState && CoverSelectedState === "HealthOpticalCover"?(<>
                            <Text style={styles.AboutTitleText} >OPTICAL COVER</Text>
                            {/* {this.renderCoverUiTable(HealthOpticalCover)} */}
                            {HealthOpticalCover.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {CoverSelectedState && CoverSelectedState === "HealthMaternityCover"?(<>
                            <Text style={styles.AboutTitleText} >MATERNITY COVER</Text>
                            {/* {this.renderCoverUiTable(HealthMaternityCover)} */}
                            {HealthMaternityCover.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
                        {CoverSelectedState && CoverSelectedState === "HealthFuneralExpenses"?(<>
                            <Text style={styles.AboutTitleText} >FUNERAL EXPENSES</Text>
                            {/* {this.renderCoverUiTable(HealthFuneralExpenses)} */}
                            {HealthFuneralExpenses.map((item, index) => ( 
                                <View key={index}> 
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.mainTableView}>
                                            
                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.key}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.value}</Text>
                                            </View>

                                            <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}
                        </>):(<></>)}
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
                            placeholderTextColor = "#5800c4" />
                            {Platform.OS === 'android'?(<>
                                <View style={{height:20}} ></View>
                                <View style={styles.pickerSelectionInputView1}>
                                    <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                        selectedValue={HospitalValue}
                                        
                                        onValueChange={(itemValue) =>this.setHospitalValue(itemValue)}>
                                            <Picker.Item label="Select Cover"/> 
                                            <Picker.Item  label="Peadiatrics" value="Peadiatrics" /> 
                                            <Picker.Item  label="Paediatrics" value="Paediatrics" /> 
                                            <Picker.Item  label="Optical Facilities" value="Optical Facilities" /> 
                                            <Picker.Item  label="Dental Facilities" value="Dental Facilities" /> 
                                            <Picker.Item  label="General Practitioners" value="General Practitioners" /> 
                                            <Picker.Item  label="Obstetrics & Gynaecology" value="Obstetrics & Gynaecology" />
                                    </Picker>
                                </View>

                                <View style={{height:20}} ></View>
                                <View style={styles.pickerSelectionInputView1}>
                                    <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                        selectedValue={CountryValue}
                                        
                                        onValueChange={(itemValue) =>this.setCountryValue(itemValue)}>
                                            <Picker.Item label="In Which Country"/> 
                                            <Picker.Item label="Uganda" value="Uganda" /> 
                                    </Picker>
                                </View>

                                <View style={{height:20}} ></View>
                                <View style={styles.pickerSelectionInputView1}>
                                    <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                        selectedValue={InsuranceValue}
                                        
                                        onValueChange={(itemValue) =>this.setInsuranceValue(itemValue)}>
                                            <Picker.Item label="Cover Type"/> 
                                            <Picker.Item  label="Dental Cover" value="Dental Cover" /> 
                                            <Picker.Item  label="Optical Cover" value="Optical Cover" /> 
                                            <Picker.Item  label="Maternity Cover" value="Maternity Cover" /> 
                                            <Picker.Item  label="In Patient Cover" value="In PatientCover" /> 
                                            <Picker.Item  label="Funeral Expenses" value="Funeral Expenses" /> 
                                            <Picker.Item  label="Out Patient Cover" value="Out PatientCover" /> 
                                    </Picker>
                                </View>
                            </>):(<>
                                {/* IOS */}
                                <View style={{height:20}} ></View>
                                <View style={styles.iOSPickerSelectionInputView}>
                                    <Picker 
                                        itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                        selectedValue={HospitalValue}
                                        
                                        onValueChange={(itemValue) =>this.setHospitalValue(itemValue)}>
                                            <Picker.Item label="Select Cover"/> 
                                            <Picker.Item  label="Peadiatrics" value="Peadiatrics" /> 
                                            <Picker.Item  label="Paediatrics" value="Paediatrics" /> 
                                            <Picker.Item  label="Optical Facilities" value="Optical Facilities" /> 
                                            <Picker.Item  label="Dental Facilities" value="Dental Facilities" /> 
                                            <Picker.Item  label="General Practitioners" value="General Practitioners" /> 
                                            <Picker.Item  label="Obstetrics & Gynaecology" value="Obstetrics & Gynaecology" />
                                    </Picker>
                                </View>

                                <View style={{height:20}} ></View>
                                <View style={styles.iOSPickerSelectionInputView}>
                                    <Picker 
                                        itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                        selectedValue={CountryValue}
                                        
                                        onValueChange={(itemValue) =>this.setCountryValue(itemValue)}>
                                            <Picker.Item label="In Which Country"/> 
                                            <Picker.Item label="Uganda" value="Uganda" /> 
                                    </Picker>
                                </View>

                                <View style={{height:20}} ></View>
                                <View style={styles.iOSPickerSelectionInputView}>
                                    <Picker 
                                        itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                        selectedValue={InsuranceValue}
                                        
                                        onValueChange={(itemValue) =>this.setInsuranceValue(itemValue)}>
                                            <Picker.Item label="Cover Type"/> 
                                            <Picker.Item  label="Dental Cover" value="Dental Cover" /> 
                                            <Picker.Item  label="Optical Cover" value="Optical Cover" /> 
                                            <Picker.Item  label="Maternity Cover" value="Maternity Cover" /> 
                                            <Picker.Item  label="In Patient Cover" value="In PatientCover" /> 
                                            <Picker.Item  label="Funeral Expenses" value="Funeral Expenses" /> 
                                            <Picker.Item  label="Out Patient Cover" value="Out PatientCover" /> 
                                    </Picker>
                                </View>
                            </>) }

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
                </ScrollView>
            </>)}


                <View style={styles.MainBottomSpaceView}></View>
            </View>

    );
}
}
