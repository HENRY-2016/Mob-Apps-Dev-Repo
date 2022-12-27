
import React from 'react';
import {Text, View, Alert,TextInput,TouchableOpacity,Image,ScrollView} from 'react-native';
import styles from "./stylesheet";
import { Entypo,Ionicons, AntDesign,FontAwesome } from '@expo/vector-icons';
import axios from "axios";

import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import {
        APIListAllCountries,APIAgencyUserLogIn,ImageUrl,APIAgencyUserCheckIn,APIAgencyUserCheckOut,
        APIAgencyAdminLogIn,APIAdminCheckedInDetails,APIAdminPendingCheckedInDetails,APIAdminCheckedOutDetails,
        APIAdminViewUserDetails,APIAgencyAdminCheckInApproval,APIAgencyUserDeleteCheckedIn,
        APIAgencyUserHasNotCheckedOutDetails,APIUpdateAgencyJobs,APIGetUserBookedDetailsById,
        APIAgencyUserCheckedInDetails,APIAccountStatusByCardNo,APIAgencyUserCheckedOutDetails,
        } from './DataFileApis';
import 
    { 
        LOGOUT_MSG,POSTING_ERROR,NO_USER_FOUND_ERROR,EMPTY_INPUTS_ERROR,
        LOADING_ERROR,LOGIN_ERROR,getTime,getDate,getDay, 
    } from './Functions';
import {
    getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,
    mainTableTitleHandleView,getAgencyStatusColor,introClubText,trTdText,
    mainNavigationBtnWidth1,getAgencyAdminCheckOutColor,agencyUserDeleteBtn,
    getAgencyUserCheckOutColor,aboutTitleText,aboutText,
    getBorderBottomColor,userProfileView2,mainTableTitleHandleView2,
    mainNavigationBtnWidth4,mainTableTitleHandleViewCredit,userProfileView,
} from './StatusFunctions'

import { LoadAgencyData } from './AppDataFile';

import { AgencyJobsData } from './AppDataFile';

import AdminImg from "../imgs/admin.png";
import UserImg from "../imgs/user.png";

export default class Agency extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        BookedJobsDetails:[],
        UserCheckedInDetails:[],
        UserCheckedOutDetails:[],
        AdminCheckedInDetails:[],
        AdminCheckedOutDetails:[],
        AdminPendingCheckedInDetails:[],
        AdminViewUserDetails:[],    
        UserHasNotCheckedOutDetails:[],
            
        // Major Screens
        AgencyLogInState:'User',
        DoNotShowHomeScreen:false,
        DoNotShowAboutScreen:true,
        DoNotShowUserScreen:true,
        DoNotShowAdminScreen:true,

        // Inner Screens
        DoNotShowUserProfileScreen:false,
        DoNotShowUserCheckInScreen:true,
        DoNotShowUserHelpScreen:true,
        DoNotShowUserCheckOutScreen:true,
        DoNotShowUserJobsScreen:true,
        DoNotShowAdminProfileScreen:false,
        DoNotShowAdminCheckInScreen:true,
        DoNotShowAdminHelpScreen:true,
        DoNotShowAdminCheckOutScreen:true,
        DoNotShowAdminApproveCheckInScreen:true,
        DoNotShowAdminCheckInDetailsScreen:false,
        DoNotShowAdminPendingCheckInScreen:true,
        DoNotShowAdminApprovePendingCheckInScreen:true,
        DoNotShowAdminPendingCheckInDetailsScreen:false,



        // Log ins
        UserName:'',
        UserPassword:'',
        AdminUserName:'',
        AdminPassword:'',
        AdminLocation:'',
    
        // Location
        UserLocation:null,
        UserLocationError:null,
        LocationText:'Waiting...',
        AccountStatus:'',
        CurrentDate:'',
        CurrentTime:'',
        CurrentDay:'',
        CurrentLatitude:'Waiting...',
        CurrentLongitude:'Waiting...',
        CurrentAltitude:'',
        CurrentAccuracy:'',

        // User Accounts
        ClubMemberName:'',
        ClubMemberCardNo:'',
        ClubMemberImage:'',
        AgencyUserCheckedInId:'',
        AgencyUserCheckedInName:'',
        AgencyUserCheckedInNoDetails:'',
        UserProviderName:'',
        UserProviderNo:'',
        

         // Admin Accounts
        AdminApproveId:'',
        AdminApproveName:'',
        AdminApproveCheckInDay:'',
        AdminApproveCheckInDate:'',
        AdminApproveCheckInTime:'',
        AdminApproveCheckOutDay:'',
        AdminApproveCheckOutDate:'',
        AdminApproveCheckOutTime:'',
        AdminApproveCheckInLongitude:'',
        AdminApproveCheckInLatitude:'',
        AdminAccountStatus:'Active',
        ClubAdminName:'',
        ClubAdminCardNo:'',
        ClubAdminArea:'',
        
    }   
}

UNSAFE_componentWillMount()
{
    this.initializeClubUserName ();
    
}

componentDidMount() {LoadAgencyData()}


// setAgencyUserCheckedInId = (text) =>{this.setState({AgencyUserCheckedInId:text})}
changeAgencyLogInState = (text) =>{this.setState({AgencyLogInState:text})}
setUserUserName = (text) => {this.setState({UserName:text})}
setUserPassword = (text) => {this.setState({UserPassword:text})}

setAdminUserName = (text) => {this.setState({AdminUserName:text})}
setAdminPassword = (text) => {this.setState({AdminPassword:text})}
setAdminLocation  = (text) =>{this.setState({AdminLocation:text});}

// Major Screens
showAboutScreen = () =>
{
    this.setState({DoNotShowAdminScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowUserScreen:true})
    this.setState({DoNotShowAboutScreen:false})
}


showHomeScreen = () =>
{
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowAdminScreen:true})
    this.setState({DoNotShowUserScreen:true})
    this.setState({DoNotShowHomeScreen:false})
}
showAdminScreen = () =>
{
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowUserScreen:true})
    this.setState({DoNotShowAdminScreen:false})
}
showUserScreen = () =>
{
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowAdminScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowUserScreen:false})
}
// Inner Screens
showUserProfileScreen = ()=>
{
    this.setState({DoNotShowUserCheckInScreen:true})
    this.setState({DoNotShowUserHelpScreen:true})
    this.setState({DoNotShowUserJobsScreen:true})
    this.setState({DoNotShowUserCheckOutScreen:true})
    this.setState({DoNotShowUserProfileScreen:false})
    this.getUserCheckedInDetails(this.state.ClubMemberCardNo);
    this.getUserJobBookedDetails(this.state.ClubMemberCardNo)
    this.getUserCheckedOutDetails();
}
showUserCheckInScreen = ()=>
{
    this.setState({CurrentDate:getDate()})
    this.setState({CurrentTime:getTime()})
    this.setState({CurrentDay:getDay()})
    this.setState({CurrentLatitude:"Waiting..."}); 
    this.setState({CurrentLongitude:"Waiting..."});
    this.setState({DoNotShowUserHelpScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserJobsScreen:true})
    this.setState({DoNotShowUserCheckOutScreen:true})
    this.setState({DoNotShowUserCheckInScreen:false})
}
showUserCheckOutScreen = ()=>
{
    this.getUserCheckedInDetails(this.state.ClubMemberCardNo) 
    // this.getUserHasNotCheckedOutDetails(this.state.ClubMemberCardNo) 
    this.setState({CurrentDate:getDate()})
    this.setState({CurrentTime:getTime()})
    this.setState({CurrentDay:getDay()})
    this.setState({DoNotShowUserHelpScreen:true})
    this.setState({DoNotShowUserCheckInScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserJobsScreen:true})
    this.setState({DoNotShowUserJobsScreen:true})
    this.setState({DoNotShowUserCheckOutScreen:false})
}
showUserJobsScreen = ()=>
{
    this.setState({DoNotShowUserCheckOutScreen:true})
    this.setState({DoNotShowUserCheckInScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserHelpScreen:true})
    this.setState({DoNotShowUserJobsScreen:false})
}
showUserHelpScreen = ()=>
{
    this.setState({DoNotShowUserCheckOutScreen:true})
    this.setState({DoNotShowUserJobsScreen:true})
    this.setState({DoNotShowUserCheckInScreen:true})
    this.setState({DoNotShowUserProfileScreen:true})
    this.setState({DoNotShowUserHelpScreen:false})
}
showAdminProfileScreen = ()=>
{
    this.setState({DoNotShowAdminCheckInScreen:true})
    this.setState({DoNotShowAdminCheckOutScreen:true})
    this.setState({DoNotShowAdminHelpScreen:true})
    this.setState({DoNotShowAdminPendingCheckInScreen:true})
    this.setState({DoNotShowAdminProfileScreen:false})
    this.getAdminViewUserDetails();
}
showAdminCheckInScreen = ()=>
{
    this.setState({DoNotShowAdminProfileScreen:true})
    this.setState({DoNotShowAdminHelpScreen:true})
    this.setState({DoNotShowAdminCheckOutScreen:true})
    this.setState({DoNotShowAdminPendingCheckInScreen:true})
    this.setState({DoNotShowAdminCheckInScreen:false})
    this.getAdminCheckedInDetails();
}
showAdminCheckInDetailsScreen = () =>
{
    this.setState({DoNotShowAdminApproveCheckInScreen:true})
    this.setState({DoNotShowAdminCheckInDetailsScreen:false})
}
showAdminPendingCheckInDetailsScreen = () =>
{
    this.setState({DoNotShowAdminApprovePendingCheckInScreen:true})
    this.setState({DoNotShowAdminPendingCheckInDetailsScreen:false})
}
showAdminApproveCheckInScreen = (id,Name,CheckInDay,CheckInDate,CheckInTime,CheckOutDay,CheckOutDate,CheckOutTime,CheckInLongitude,CheckInLatitude) =>
{
    this.setState({AdminApproveId:id})
    this.setState({AdminApproveName:Name})
    this.setState({AdminApproveCheckInDay:CheckInDay})
    this.setState({AdminApproveCheckInDate:CheckInDate})
    this.setState({AdminApproveCheckInTime:CheckInTime})
    this.setState({AdminApproveCheckOutDay:CheckOutDay})
    this.setState({AdminApproveCheckOutDate:CheckOutDate})
    this.setState({AdminApproveCheckOutTime:CheckOutTime})
    this.setState({AdminApproveCheckInLongitude:CheckInLongitude})
    this.setState({AdminApproveCheckInLatitude:CheckInLatitude})

    this.setState({DoNotShowAdminCheckInDetailsScreen:true})
    this.setState({DoNotShowAdminApproveCheckInScreen:false})

}
showAdminApprovePendingCheckInScreen = (id,Name,CheckInDay,CheckInDate,CheckInTime,CheckOutDay,CheckOutDate,CheckOutTime,CheckInLongitude,CheckInLatitude) =>
{
    this.setState({AdminApproveId:id})
    this.setState({AdminApproveName:Name})
    this.setState({AdminApproveCheckInDay:CheckInDay})
    this.setState({AdminApproveCheckInDate:CheckInDate})
    this.setState({AdminApproveCheckInTime:CheckInTime})
    this.setState({AdminApproveCheckOutDay:CheckOutDay})
    this.setState({AdminApproveCheckOutDate:CheckOutDate})
    this.setState({AdminApproveCheckOutTime:CheckOutTime})
    this.setState({AdminApproveCheckInLongitude:CheckInLongitude})
    this.setState({AdminApproveCheckInLatitude:CheckInLatitude})

    this.setState({DoNotShowAdminPendingCheckInDetailsScreen:true})
    this.setState({DoNotShowAdminApprovePendingCheckInScreen:false})
}
showAdminCheckOutScreen = ()=>
{
    this.setState({DoNotShowAdminCheckInScreen:true})
    this.setState({DoNotShowAdminHelpScreen:true})
    this.setState({DoNotShowAdminProfileScreen:true})
    this.setState({DoNotShowAdminPendingCheckInScreen:true})
    this.setState({DoNotShowAdminCheckOutScreen:false})
    this.getAdminCheckedOutDetails();
}
showAdminPendingCheckInScreen = ()=>
{
    this.setState({DoNotShowAdminCheckInScreen:true})
    this.setState({DoNotShowAdminHelpScreen:true})
    this.setState({DoNotShowAdminProfileScreen:true})
    this.setState({DoNotShowAdminCheckOutScreen:true})
    this.setState({DoNotShowAdminPendingCheckInScreen:false})
    this.getAdminPendingCheckedInDetails();
    
}
showAdminHelpScreen = ()=>
{
    this.setState({DoNotShowAdminCheckInScreen:true})
    this.setState({DoNotShowAdminCheckOutScreen:true})
    this.setState({DoNotShowAdminProfileScreen:true})
    this.setState({DoNotShowAdminPendingCheckInScreen:true})
    this.setState({DoNotShowAdminHelpScreen:false})
    this.getAdminCheckedOutDetails();
}
getUserJobBookedDetails = (Number) =>
{
    axios.get(APIGetUserBookedDetailsById+Number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonresults =JSON.parse(results); 
        this.setState({BookedJobsDetails:[...jsonresults]})
        })
    .catch(err=>{console.log(err); Alert.alert("Error","\n\nCan Not Load Data Connect To Internet And Open Again");})

}
getAccountStatus = (CardNo) =>
{
    // let cardNo = this.state.ClubMemberCardNo;
    axios.get(APIAccountStatusByCardNo+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let AccStatus = jsonResults[0].Status;
        this.setState({AccountStatus:AccStatus})
        })
    .catch(err=>{console.log(err);})
    
}
getUserCheckedOutDetails = () =>
{
    let number = this.state.ClubMemberCardNo;
    axios.get(APIAgencyUserCheckedOutDetails+number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({UserCheckedOutDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log(err); Alert.alert("Error",LOADING_ERROR);}) 
}
getUserCheckedInDetails = (CardNo) =>
{
    axios.get(APIAgencyUserCheckedInDetails+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        if (results.length === 2){ this.setState({AgencyUserCheckedInNoDetails:NO_USER_FOUND_ERROR});}
        else
            {
            this.setState({AgencyUserCheckedInNoDetails:""}); // clear to empty
            let results = JSON.stringify(res.data); 
            let jsonData = JSON.parse(results)
                this.setState({UserCheckedInDetails:[...JSON.parse(results)]})
                let Id = jsonData[0].id;
                let Name = jsonData[0].Name;
                this.setState({AgencyUserCheckedInId:Id})
                this.setState({AgencyUserCheckedInName:Name})
            }
        })
    .catch(err=>{console.log(err);})
    
}

getUserLocation  = async () => {

    

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        this.setState({UserLocationError:'Permission To Access Location Was Denied'});
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({UserLocation:location});
    
    if (this.state.UserLocationError) {this.setState({LocationText:this.state.UserLocationError});} 
    else if (this.state.UserLocation) 
    {
        // this.setState({LocationText:JSON.stringify(this.state.UserLocation)});
        this.setState({CurrentLatitude:location.coords.latitude}); 
        this.setState({CurrentLongitude:location.coords.longitude});
        this.setState({CurrentAltitude:location.coords.altitude});
        this.setState({CurrentAccuracy:location.coords.altitudeAccuracy});

    }
}

initializeClubUserName = () => 
{
    try 
    {   
        AsyncStorage.getItem('AgencyUserDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].ClubUserName;
            let CardNo = jsonData[0].ClubMemberCardNo;
            let TcNumber = jsonData[0].TcNumber;
            let Pic = jsonData[0].Pic;
            console.log("====>"+Name+CardNo);
            this.setState({ClubMemberName:Name});
            this.setState({ClubMemberImage:Pic});
            this.setState({ClubMemberCardNo:CardNo});
            this.getAccountStatus(TcNumber);
            this.getUserCheckedInDetails(CardNo) 
            this.getUserJobBookedDetails(CardNo);
            this.getUserCheckedOutDetails();
            this.showUserScreen();
        }else {this.showHomeScreen();}})

        AsyncStorage.getItem('AgencyAdminDetails').then((Details)=>{
            if (Details !== null) {
                // We have data!!
                const jsonData = JSON.parse(Details)
                let Name = jsonData[0].ClubAdminName;
                let CardNo = jsonData[0].ClubAdminCardNo;
                let Area = jsonData[0].ClubAdminArea;
                this.setState({ClubAdminName:Name});
                this.setState({ClubAdminCardNo:CardNo});
                this.setState({ClubAdminArea:Area});
                this.getAdminViewUserDetails();
                this.showAdminScreen()
            }else {this.showHomeScreen();}})
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
            const loginRequest = await axios.get(APIAgencyUserLogIn+ClubLogInName)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].AgencyNumber;
                let userPassword  = jsonResults[0].Password;
                if ((CardNo !== ClubLogInName)&&(userPassword !== ClubLogInPassword ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    let Pic = jsonResults[0].image;
                    let Provider = jsonResults[0].Holder2;
                    let ProviderNo = jsonResults[0].Holder1;
                    let TcNumber = jsonResults[0].TcNumber;
                    try {
                        let MemberDetails={UserProviderName:Provider,Pic:Pic,UserProviderNo:ProviderNo, ClubUserName:Name,ClubMemberCardNo:CardNo,ClubMemberImage:Pic,TcNumber:TcNumber}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('AgencyUserDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ClubMemberName:Name});
                    this.setState({ClubMemberImage:Pic});
                    this.setState({ClubMemberCardNo:CardNo});
                    this.setState({UserProviderName:Provider});
                    this.setState({UserProviderNo:ProviderNo});
                    this.getAccountStatus(TcNumber);
                    this.getUserCheckedInDetails(CardNo) 
                    this.getUserJobBookedDetails(CardNo);
                    this.getUserCheckedOutDetails();
                    this.showUserScreen();
                }
            }
        }
        catch (error){ console.log(error); Alert.alert("An Error",LOGIN_ERROR)};
    }
}
logOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('AgencyUserDetails');
        Alert.alert("Information",LOGOUT_MSG);
        this.showHomeScreen();

    }catch (error) { console.log(error)}
}

getAdminViewUserDetails = () =>
{
    let number = this.state.ClubAdminCardNo;
    axios.get(APIAdminViewUserDetails+number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AdminViewUserDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log(err); Alert.alert("Error",LOADING_ERROR);}) 
}

getAdminCheckedInDetails = () =>
{
    let number = this.state.ClubAdminCardNo;
    axios.get(APIAdminCheckedInDetails+number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AdminCheckedInDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log(err); Alert.alert("Error",LOADING_ERROR);}) 
}
getAdminPendingCheckedInDetails = () =>
{
    let number = this.state.ClubAdminCardNo;
    axios.get(APIAdminPendingCheckedInDetails+number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AdminPendingCheckedInDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log(err); Alert.alert("Error",LOADING_ERROR);}) 
}
getAdminCheckedOutDetails = () =>
{
    let number = this.state.ClubAdminCardNo;
    axios.get(APIAdminCheckedOutDetails+number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AdminCheckedOutDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log(err); Alert.alert("Error",LOADING_ERROR);}) 
}
adminLogIn = async () => 
{

    let ClubLogInName = this.state.AdminUserName;
    let ClubLogInPassword = this.state.AdminPassword;
    if ((ClubLogInName.length === 0) || (ClubLogInPassword.length === 0))
        {Alert.alert('Log In Error',EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIAgencyAdminLogIn+ClubLogInName)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                let userPassword  = jsonResults[0].Password;
                
                if ((CardNo !== ClubLogInName)&&(userPassword !== ClubLogInPassword ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    let Area = jsonResults[0].Area;
                    try {
                        let AdminDetails={ClubAdminName:Name,ClubAdminCardNo:CardNo,ClubAdminArea:Area}
                        const Details  = []
                        Details.push(AdminDetails)
                        await AsyncStorage.setItem('AgencyAdminDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ClubAdminName:Name});
                    this.setState({ClubAdminCardNo:CardNo});
                    this.setState({ClubAdminArea:Area});
                    this.getAdminViewUserDetails();
                    this.showAdminScreen()
                }
            }

        }

        catch (error){ console.log(error); Alert.alert("An Error",LOGIN_ERROR)};
    }
}
logOutAdmin = async () => 
{
    Alert.alert("Information",LOGOUT_MSG)

    try 
    {   
        await AsyncStorage.removeItem ('AgencyAdminDetails');
        Alert.alert("Information",LOGOUT_MSG);
        this.showHomeScreen();

    }catch (error) { console.log(error)}
}
postUserCheckIn = async () =>
{
    let AgencyNumber = this.state.ClubMemberCardNo;
    let Name = this.state.ClubMemberName;
    // let date = this.state.CurrentDate; / to be identified at backend php
    let time = this.state.CurrentTime;
    let day = this.state.CurrentDay;
    let latitude = this.state.CurrentLatitude;
    let longitude =this.state.CurrentLongitude;
    let altitude = this.state.CurrentAltitude;
    let accuracy = this.state.CurrentAccuracy;
    let user_provider = this.state.UserProviderName;
    let user_providerNo = this.state.UserProviderNo;

    if (longitude === 'Waiting...' || latitude === 'Waiting...')
        { Alert.alert("Information","Longitude And Latitude Can't Be Empty \n\n Please Click In Find My Location \n\n To Get The Coordinates")}
    else
    {
        try
        {
            const postRequest = await axios.post(APIAgencyUserCheckIn,
                {
                    "Name":Name,
                    "AgencyNumber":AgencyNumber,
                    "CheckInDay":day,
                    "CheckInTime":time,
                    "CheckInLongitude":longitude,
                    "CheckInLatitude":latitude,
                    "CheckInAltitude":altitude,
                    "CheckInAccuracy":accuracy,
                    "CheckInProviderName":user_provider,
                    "CheckInProviderNo":user_providerNo,

                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Check In Status",Name + "\n\n"+ result);
            this.showUserProfileScreen();
        }
        catch (error)
            {
                // console.log("+++++++++++++++++"+error);
                Alert.alert("An Error", POSTING_ERROR)
            };
    }
}
postUserCheckOut = async () =>
{
    let ID = this.state.AgencyUserCheckedInId;
    let Name = this.state.AgencyUserCheckedInName;
    let date = this.state.CurrentDate;
    let time = this.state.CurrentTime;
    let day = this.state.CurrentDay;

        if (day.length=== 0 || date.length === 0 || time.length===0)
            { Alert.alert("Information","Day Or Date Or Time Can't Be Empty\n\n ")}
        else
        {
                try
                {
                    const Request = await axios.put(APIAgencyUserCheckOut, 
                        {"id":ID,"CheckOutDay":day,"CheckOutDate":date,"CheckOutTime":time})
                    let result = Request.data.status;
                    Alert.alert("Check Out Status",Name +"\n\n"+ result);
                    this.showUserProfileScreen();
                }

                catch (error){Alert.alert("An Error",POSTING_ERROR)};
        }
}
postUserCheckInDelete = async (Id) =>
{
    let Name = this.state.AgencyUserCheckedInName;

    try
    {
        const Request = await axios.post(APIAgencyUserDeleteCheckedIn+Id)
        let result = Request.data.status;
        Alert.alert("Action Status",Name +"\n\n"+ result);
        this.showUserProfileScreen();
    }

    catch (error){Alert.alert("An Error",POSTING_ERROR)};
}

deleteUserCheckInRecord = (Id) =>
{
    Alert.alert(
        'Are You Sure You Want To Delete This Record',
        '',
        [
            {text: 'No Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes Delete', onPress: () => { this.postUserCheckInDelete(Id);}},
        ],
        { cancelable: false }
    );
}
postAdminApproval = async () =>
{

    let id = this.state.AdminApproveId;
    let Name = this.state.AdminApproveName;
    let dayOut = this.state.AdminApproveCheckOutDay;
    let dateOut = this.state.AdminApproveCheckOutDate;
    let timeOut = this.state.AdminApproveCheckOutTime;
    // let longitude = this.state.AdminApproveCheckInLongitude;
    // let latitude = this.state.AdminApproveCheckInLatitude;
    if (dayOut === 'Waiting...' || dateOut === 'Waiting...' || timeOut ==='Waiting...')
        { Alert.alert("Information","Check Out Day Or Date Or Time For\n\n"+Name+"\n\n Are Not Yet Check Out\n Can't Approve")}
    else
    {
        try
        {
            const Request = await axios.put(APIAgencyAdminCheckInApproval,{"id":id,"Name":Name})
            let result = Request.data.status;
            Alert.alert("Approval Status","\n\n"+ result);
            this.getAdminCheckedInDetails();
            this.showAdminCheckInDetailsScreen();
        }
        catch (error){Alert.alert("An Error",POSTING_ERROR)};
    }
}
postUserJobBooked = async (id) =>
{
    let name =this.state.ClubMemberName;
    let number = this.state.ClubMemberCardNo;

    try
    {
        const Request = await axios.put(APIUpdateAgencyJobs, 
                {"id":id,"Name":name,"Number":number})
        let result = Request.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error){Alert.alert("An Error","\n\n  Check Your Network Connections\n")};
}
render() {
    const {ClubMemberName,ClubMemberCardNo,BookedJobsDetails, CurrentDate,CurrentTime,CurrentDay,CurrentLatitude,CurrentLongitude,UserLocationError,CurrentAltitude,CurrentAccuracy} = this.state;
    const {UserCheckedInDetails,UserCheckedOutDetails,AgencyUserCheckedInNoDetails,UserHasNotCheckedOutDetails,UserProviderName} = this.state;
    const {ClubAdminName,ClubAdminArea,ClubAdminCardNo,AdminAccountStatus,AdminCheckedInDetails} = this.state;
    const {AdminApproveName,AdminApproveCheckInDay,AdminApproveCheckInDate,AdminApproveCheckInTime,AdminApproveCheckInLongitude,AdminApproveCheckInLatitude} = this.state;
    const {DoNotShowAdminApprovePendingCheckInScreen,DoNotShowAdminPendingCheckInDetailsScreen,AdminApproveCheckOutDay,AdminApproveCheckOutDate,AdminApproveCheckOutTime} = this.state;
    const {AdminCheckedOutDetails,AdminPendingCheckedInDetails,AdminViewUserDetails,DoNotShowAdminApproveCheckInScreen,DoNotShowAdminCheckInDetailsScreen,} = this.state;
    const {AgencyLogInState,Countries,AdminLocation,LocationText,AccountStatus,ClubMemberImage} = this.state;
    const {DoNotShowHomeScreen,DoNotShowUserScreen,DoNotShowAdminScreen,DoNotShowUserHelpScreen,DoNotShowAdminHelpScreen} = this.state;
    const {DoNotShowUserProfileScreen,DoNotShowUserCheckInScreen,DoNotShowUserCheckOutScreen,DoNotShowUserJobsScreen,DoNotShowAdminProfileScreen,DoNotShowAdminCheckInScreen,DoNotShowAdminCheckOutScreen,DoNotShowAdminPendingCheckInScreen} =this.state;

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
                        <Text style={styles.MainTopHeaderTextLabel}>Welcome To Tc Agency  </Text>
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
                <View style={styles.MainNavigationBtnView}>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <Text style = {styles.btnText3}>Select Log In Type  </Text>
                    </View>
                    <View style={{height:5}} ></View>

                    <View style={styles.ApplyCardView} >
                        <View style={styles.LogInTopHeaderView} >
                            <View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={ ()=>{this.changeAgencyLogInState('User')}} >
                                    <Text style = {styles.btnText}> User Log In</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={()=>{this.changeAgencyLogInState('Manager')}} >
                                    <Text style = {styles.btnText}> Manager Log In </Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {AgencyLogInState && AgencyLogInState == 'User'?(<>
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
                            
                        </>) :(<></>)}

                        {AgencyLogInState && AgencyLogInState == 'Manager'?(<>
                            <View style={{heigh:5}} ></View>
                            <View style={{alignItems:'center'}} >
                                <Image source={AdminImg} style={styles.AgencyIcon}/>
                            </View>
                            <View style={{height:10}} ></View>

                            <Text style = {styles.btnText}> Manager Log In  </Text>

                            {/* <View style={styles.pickerSelectionInputView1}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={AdminLocation}
                                    
                                    onValueChange={(itemValue) =>this.setAdminLocation(itemValue)}>
                                        <Picker.Item label="Select Area / Place "/> 
                                        {Countries && Countries.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.countryName} value={item.countryName} /> 
                                        ))}
                                </Picker>
                            </View> */}

                            <TextInput style={styles.input} placeholder="User Name" onChangeText={text => this.setAdminUserName(text)}  
                                placeholderTextColor = "#5800c4"/>

                            <TextInput style={styles.input} placeholder="Password" onChangeText={text => this.setAdminPassword(text)}  
                                placeholderTextColor = "#5800c4" secureTextEntry/>

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.adminLogIn} >
                                <Text style = {styles.btnText}> Log In  </Text>
                                <View style={styles.ArrowMainViewLogIn}>
                                    <AntDesign style={styles.ArrowIconLogIn} name="login" size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                        </>) :(<></>)}
                    </View>


                    
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
                                onPress={this.showUserCheckInScreen} >
                            <Text style = {styles.btnText}> Check In </Text>
                        </TouchableOpacity>
                        

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserCheckOutScreen} >
                            <Text style = {styles.btnText}> Check Out  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserJobsScreen} >
                            <Text style = {styles.btnText}> Jobs  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showUserHelpScreen} >
                            <Text style = {styles.btnText}> User Help  </Text>
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
                    <View style = {[userProfileView2(),getBackgroundColor(AccountStatus)]} >
                        <View style = {[styles.UserProfileImageView]} >
                            {/* <Entypo name="user" size={90} color="white" /> */}
                            <Image source={{uri:ImageUrl+ClubMemberImage}} style={styles.AgencyImage} />
                        </View>
                        <View style = {[styles.UserProfileNameView]} >
                            <Text style = {styles.btnText}>{ClubMemberName}</Text>
                            
                            <View style={{height:20}} ></View>
                            <Text style = {styles.AgencyNameText}> {ClubMemberCardNo} </Text>
                            
                            {/* <View style={{height:20}} ></View>
                            <Text style = {styles.AgencyNameText}> {UserProviderName} </Text> */}
                            <View style={{height:20}} ></View>
                            <Text style = {styles.AgencyNameText}> {UserProviderName} </Text>
                        </View>
                    </View>
                    
                    <View style={{height:20}} ></View>
                    <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AccountStatus)]} >
                        <Text style = { styles.tableTitleHandleText}> Booked Jobs Details </Text>
                    </View>
                        {BookedJobsDetails && BookedJobsDetails.map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.AgencyName}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.AgencyNumber}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Holder1}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.Area}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Amount}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.Hours}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Holder2}</Text>
                                    </View>
        
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                            </View>
                            ))}

                    <View style={{height:20}} ></View>
                    <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AccountStatus)]} >
                        <Text style = { styles.tableTitleHandleText}> Checked In Details </Text>
                    </View>
                    <View style={styles.mainTableOuterView} >
                        {AgencyUserCheckedInNoDetails === '' ?(<>
                            {UserCheckedInDetails && UserCheckedInDetails.map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyStatusColor()]}>{item.Holder3}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInDay}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.CheckOutDay}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInDate}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.CheckOutDate}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInTime}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.CheckOutTime}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInLongitude}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInLatitude}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <TouchableOpacity onPress={()=>{this.deleteUserCheckInRecord(item.id)}} style={[agencyUserDeleteBtn(),getBackgroundColor(AccountStatus)]} >
                                            <Text style={styles.ratingChatBtnText2} >Remove This Record</Text> 
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                            </View>
                            ))}
                            </>):
                                (<><Text style = {[,getPlainColor(AccountStatus),styles.NoUserFound]}>{AgencyUserCheckedInNoDetails}  </Text></>)
                            }
                    </View>

                    <View style={{height:20}} ></View>
                    <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AccountStatus)]} >
                        <Text style = { styles.tableTitleHandleText}> Checked Out Details </Text>
                    </View>
                    <View style={styles.mainTableOuterView} >
                            {UserCheckedOutDetails && UserCheckedOutDetails.map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyStatusColor()]}>{item.Holder3}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInDay}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.CheckOutDay}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInDate}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.CheckOutDate}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInTime}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyUserCheckOutColor()]}>{item.CheckOutTime}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInLongitude}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.CheckInLatitude}</Text>
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
                    <View style={{alignItems:'center'}} >
                        <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth4(),getBackgroundColor(AccountStatus)]} onPress={this.logOutUser} >
                            <Text style = {styles.btnText}> Log Out  </Text>
                        </TouchableOpacity>
                    </View>
                </>)}

                {DoNotShowUserCheckInScreen ?(<></>):(<>
                    {/* <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.getUserLocation} >
                        <Text style = {styles.btnText}> My Location  </Text>
                    </TouchableOpacity> */}
                    <View style={{height:15}} ></View>

                    <View style={styles.ApplyCardView}>
                    <View style={{height:5}} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtnAgency, styles.MainNavigationBtn4]}  >
                        <Text style = {styles.btnText}>Check In User Details  </Text>
                    </TouchableOpacity>
                    <View style={{height:10}} ></View>
                    <View style={{alignItems:'center'}} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.getUserLocation} >
                            <Text style = {styles.btnText}> Find My Location  </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:15}} ></View>

                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Name  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {ClubMemberName}  </Text>
                        </View>
                    </View>

                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>

                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Day  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentDay}  </Text>
                        </View>
                    </View>

                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Date  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentDate}  </Text>
                        </View>
                    </View>


                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Time  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}> {CurrentTime}  </Text>
                        </View>
                    </View>

                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Longitude  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentLongitude}  </Text>
                        </View>
                    </View>

                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Latitude  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentLatitude}  </Text>
                        </View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>

                
                    {/* <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Accuracy  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentAccuracy} </Text>
                        </View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Altitude  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentAltitude } </Text>
                        </View>
                    </View> 
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>*/}

                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postUserCheckIn} >
                        <Text style = {styles.btnText}> Check Me In Now  </Text>
                    </TouchableOpacity>

                </View>
                    
                    {/* <Text style={styles.AboutText} >{LocationText}</Text> */}
                </>)}

                {DoNotShowUserCheckOutScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>

                    <View style={styles.ApplyCardView}>
                    <View style={{height:5}} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtnAgency, styles.MainNavigationBtn4]}  >
                        <Text style = {styles.btnText}>Checked In User Details  </Text>
                    </TouchableOpacity>
                    <View style={{height:10}} ></View>
                    
                    {AgencyUserCheckedInNoDetails === '' ?(<>
                        {UserCheckedInDetails && UserCheckedInDetails.map((item,index)=>(
                            <View key={index}>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Name  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {item.Name}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Day  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {item.CheckInDay}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Date  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {item.CheckInDate}  </Text>
                                    </View>
                                </View>


                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Time  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}> {item.CheckInTime}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Longitude  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {item.CheckInLongitude}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Latitude  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {item.CheckInLatitude}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>
                            </View>
                        ))}
                    </>):
                        (<><Text style = {styles.btnText}>{AgencyUserCheckedInNoDetails}  </Text></>)
                    }
                    <TouchableOpacity style={[styles.MainNavigationBtnAgency, styles.MainNavigationBtn4]}  >
                        <Text style = {styles.btnText}>Check Out User Details  </Text>
                    </TouchableOpacity>
                    <View style={{height:10}} ></View>
                    
            
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Day  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentDay}  </Text>
                        </View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>

                
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Date  </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentDate} </Text>
                        </View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInCardLeftView} >
                            <Text style = {styles.checkInCardLeftText}> Time </Text>
                        </View>
                        <View style = {styles.checkInCardRightView} >
                            <Text style = {styles.checkInCardRightText}>  {CurrentTime} </Text>
                        </View>
                    </View>
                    <View style = {styles.checkInCardView} >
                        <View style = {styles.checkInLineCardVieW}></View>
                        <View style={{height:20}} ></View>
                    </View>

                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postUserCheckOut} >
                        <Text style = {styles.btnText}> Check Me Out Now </Text>
                    </TouchableOpacity>
                </View>
                </>)}

                {DoNotShowUserJobsScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>
                    {AgencyJobsData[0] && AgencyJobsData[0].map((item,index)=>(
                        <View key={index} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Holder1}</Text>
                                    </View>


                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Area}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Amount}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Hours}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={styles.ratingChatBtnView}>
                                            <TouchableOpacity onPress={()=>{this.postUserJobBooked(item.id)}} style={styles.ratingChatBtn} >
                                                <Text style={styles.ratingChatBtnText} >Book It Now</Text> 
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    ))}
                </>)}

                {DoNotShowUserHelpScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>

                    <View  style={styles.MainInnerCardAboutView}>
                        <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >On Profile</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. Checked In Details</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >Shows The Current Checked In User Information</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. Checked Out Details</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >Shows All The Checked Out User Information</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Remove This Record</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >Deletes A Record If A User Has Made A Double Check In </Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >4. Pending</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >It Means That User Is Not Yet Approved By The Manager</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >5. Approved</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >It Means That User Was Approved By The Manager</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >6. Waiting...</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >It Shows The User Has Not Yet Check Out</Text>


                        <View style={{height:30}}></View>
                        <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >How To Check In ?</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. First Turn On Your Location From Settings </Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. Click In Find My Location Button To Get Longitude & Latitude</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Click In Check Me In Now Button To Check In</Text>

                        <View style={{height:30}}></View>
                        <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >How To Check Out ?</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. When You Have Checked In, </Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. User Information Will Be Displayed On The Screen</Text>
                        <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Click In Check Me Out Now Button To Check Out</Text>


                    </View>

                </>)}
            </>)}













            {DoNotShowAdminScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                <View style={styles.MainNavigationBtnView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                        </View>
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAdminProfileScreen} >
                            <Text style = {styles.btnText}>Profile</Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAdminCheckInScreen} >
                            <Text style = {styles.btnText}>Check Ins  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAdminCheckOutScreen} >
                            <Text style = {styles.btnText}>Check Outs  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showAdminPendingCheckInScreen} >
                            <Text style = {styles.btnText}>Pending Check Ins  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAdminHelpScreen} >
                            <Text style = {styles.btnText}>User Help  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView}></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                        </View>
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                    </ScrollView>
                </View>

                {DoNotShowAdminProfileScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>
                    <View style = {[userProfileView2(),getBackgroundColor(AdminAccountStatus)]} >
                        <View style = {[styles.UserProfileImageView]} >
                            <Entypo name="user" size={90} color="white" />
                        </View>
                            <View style = {[styles.UserProfileNameView]} >
                            <Text style = {styles.btnText}>{ClubAdminArea}</Text>
                            <View style={{height:20}} ></View>

                            <Text style = {styles.btnText}>{ClubAdminName}</Text>
                            <View style={{height:20}} ></View>
                            <Text style = {styles.AgencyNameText}> {ClubAdminCardNo} </Text>
                            
                        </View>
                    </View>
                    <View style={{height:20}} ></View>
                    <View style = {[mainTableTitleHandleView(),getBackgroundColor(AdminAccountStatus)]} >
                        <Text style = { styles.tableTitleHandleText}>Workers List </Text>
                    </View>
                    <View style={{height:15}} ></View>

                    {AdminViewUserDetails && AdminViewUserDetails.map((item, index) => ( 
                        <View key={index}> 
                            <View style = {[userProfileView2(),getBackgroundColor(AdminAccountStatus)]} >
                                <View style = {[styles.UserProfileImageView]} >
                                    <Image source={{uri:ImageUrl+item.image}} style={styles.AgencyImage} />
                                </View>
                                <View style = {[styles.UserProfileNameView]} >
                                    <Text style = {styles.NameBtnText}>{item.Name}</Text>
                                    <View style={{height:20}} ></View>
                                    <Text style = {styles.AgencyNameText}> {item.AgencyNumber} </Text>
                                </View>
                            </View>
                            <View style={{height:15}} ></View>
                        </View>
                    ))}


                    <View style={{height:20}} ></View>
                    <View style={{alignItems:'center'}} >
                        <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth4(),getBackgroundColor(AdminAccountStatus)]} onPress={this.logOutAdmin} >
                            <Text style = {styles.btnText}> Log Out  </Text>
                        </TouchableOpacity>
                    </View>
                </>)}


                {DoNotShowAdminCheckInScreen ?(<></>):(<>
                    <View style={{height:20}} ></View>
                    {DoNotShowAdminCheckInDetailsScreen ?(<></>):(<>
                        <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AdminAccountStatus)]} >
                            <Text style = { styles.tableTitleHandleText}> Check In Details </Text>
                        </View>
                        <View style={styles.mainTableOuterView} >
                                {AdminCheckedInDetails && AdminCheckedInDetails.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyStatusColor()]}>{item.Holder3}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.Name}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInDay}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutDay}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInDate}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutDate}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInTime}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutTime}</Text>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInLongitude}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInLatitude}</Text>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <TouchableOpacity onPress={()=>{this.showAdminApproveCheckInScreen(item.id,item.Name,item.CheckInDay,item.CheckInDate,item.CheckInTime,item.CheckOutDay,item.CheckOutDate,item.CheckOutTime,item.CheckInLongitude,item.CheckInLatitude)}} style={styles.ratingChatBtn2} >
                                            <Text style={styles.ratingChatBtnText} >Approve Worker</Text> 
                                        </TouchableOpacity>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                                ))}
                        </View>
                        </>)}
                    
                    {DoNotShowAdminApproveCheckInScreen?<></>:(<>
                        <View style={{height:15}} ></View>
                        <View style={styles.ApplyCardView}>
                            <View style={{height:5}} ></View>
                            
                            <TouchableOpacity style={[styles.MainNavigationBtnAgency, styles.MainNavigationBtn4]}  >
                                <Text style = {styles.btnText}>Checked In User Details  </Text>
                            </TouchableOpacity>
                            <View style={{height:10}} ></View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkInCardLeftText}> Name  </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkInCardRightText}>  {AdminApproveName}  </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkInCardLeftText}> Day-In  </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInDay}  </Text>
                                </View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkOutCardText}> Day-Out  </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkOutCardText}>  {AdminApproveCheckOutDay}  </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>


                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkInCardLeftText}> Date-In  </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInDate} </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkOutCardText}> Date-Out  </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkOutCardText}>  {AdminApproveCheckOutDate}  </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkInCardLeftText}> Time-In </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInTime} </Text>
                                </View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkOutCardText}> Time-Out </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkOutCardText}>  {AdminApproveCheckOutTime}  </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkInCardLeftText}> Latitude-In </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInLatitude} </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInCardLeftView} >
                                    <Text style = {styles.checkInCardLeftText}> Longitude-In </Text>
                                </View>
                                <View style = {styles.checkInCardRightView} >
                                    <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInLongitude} </Text>
                                </View>
                            </View>
                            <View style = {styles.checkInCardView} >
                                <View style = {styles.checkInLineCardVieW}></View>
                                <View style={{height:20}} ></View>
                            </View>

                            

                            <View style={{alignItems:'center', marginTop:20}} >
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postAdminApproval} >
                                    <Text style = {styles.btnText}> Approve </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showAdminCheckInDetailsScreen()}}  >
                                    <Text style = {styles.btnText}> Cancel  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}}></View>
                            </View>
                        </View>
                    </>)}
                </>)}

                {DoNotShowAdminCheckOutScreen ?(<></>):(<>
                    <View style={{height:20}} ></View>
                    <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AdminAccountStatus)]} >
                        <Text style = { styles.tableTitleHandleText}>Checked Out Details </Text>
                    </View>
                    <View style={styles.mainTableOuterView} >
                            {AdminCheckedOutDetails && AdminCheckedOutDetails.map((item, index) => ( 
                            <View key={index}> 
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyStatusColor()]}>{item.Holder3}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.Name}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInDay}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutDay}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInDate}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutDate}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInTime}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutTime}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInLongitude}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInLatitude}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                            </View>
                            ))}
                    </View>
                </>)}

                {DoNotShowAdminPendingCheckInScreen ?(<></>):(<>
                    <View style={{height:20}} ></View>
                    {DoNotShowAdminPendingCheckInDetailsScreen ?(<></>):(<>
                        <View style = {[mainTableTitleHandleView2(),getBackgroundColor(AdminAccountStatus)]} >
                            <Text style = { styles.tableTitleHandleText}> Check In Details </Text>
                        </View>
                        <View style={styles.mainTableOuterView} >
                                {AdminPendingCheckedInDetails && AdminPendingCheckedInDetails.map((item, index) => ( 
                                <View key={index}> 
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyStatusColor()]}>{item.Holder3}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.Name}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInDay}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutDay}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInDate}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutDate}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInTime}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getAgencyAdminCheckOutColor()]}>{item.CheckOutTime}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInLongitude}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AdminAccountStatus)]}>{item.CheckInLatitude}</Text>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <TouchableOpacity onPress={()=>{this.showAdminApprovePendingCheckInScreen(item.id,item.Name,item.CheckInDay,item.CheckInDate,item.CheckInTime,item.CheckOutDay,item.CheckOutDate,item.CheckOutTime,item.CheckInLongitude,item.CheckInLatitude)}} style={styles.ratingChatBtn2} >
                                            <Text style={styles.ratingChatBtnText} >Approve Worker</Text> 
                                        </TouchableOpacity>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AdminAccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                                ))}
                        </View>
                        </>)}
                    
                        {DoNotShowAdminApprovePendingCheckInScreen?<></>:(<>
                            <View style={{height:15}} ></View>
                            <View style={styles.ApplyCardView}>
                                <View style={{height:5}} ></View>
                                
                                <TouchableOpacity style={[styles.MainNavigationBtnAgency, styles.MainNavigationBtn4]}  >
                                    <Text style = {styles.btnText}>Checked In User Details  </Text>
                                </TouchableOpacity>
                                <View style={{height:10}} ></View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Name  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AdminApproveName}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Day-In  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInDay}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkOutCardText}> Day-Out  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkOutCardText}>  {AdminApproveCheckOutDay}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Date-In  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInDate} </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkOutCardText}> Date-Out  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkOutCardText}>  {AdminApproveCheckOutDate}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>


                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Time-In </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInTime} </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkOutCardText}> Time-Out </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkOutCardText}>  {AdminApproveCheckOutTime}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Latitude-In </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInLatitude} </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Longitude-In </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AdminApproveCheckInLongitude} </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:20}} ></View>
                                </View>

                                

                                <View style={{alignItems:'center', marginTop:20}} >
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postAdminApproval} >
                                        <Text style = {styles.btnText}> Approve </Text>
                                    </TouchableOpacity>
                                    <View style={{height:20}} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showAdminPendingCheckInDetailsScreen()}}  >
                                        <Text style = {styles.btnText}> Cancel  </Text>
                                    </TouchableOpacity>
                                    <View style={{height:20}} ></View>
                                </View>
                            </View>
                        </>)}
                    </>)}

                    {DoNotShowAdminHelpScreen ?(<></>):(<>
                    <View style={{height:15}} ></View>

                    <View  style={styles.MainInnerCardAboutView}>
                        <Text style={[aboutTitleText(),getPlainColor(AdminAccountStatus)]} >On Profile</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >1. Workers List</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >Shows List Of All Workers</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >2. Check Ins</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >Shows Today's Workers Who Have Checked In And Not Yet Approved</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >3. Checked Outs</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >Shows All The Workers Have Checked Out And Approved</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >4. Pending Check Ins</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >Shows All The Workers Who Have Checked In And Not Yet Approved</Text>
                        

                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >5. Approve Worker</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >Approves A Worker Who Have Check Out </Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >6. Pending</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >It Means That Worker Is Not Yet Approved By The Manager</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >7. Approved</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >It Means That Worker Was Approved By The Manager</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >8. Waiting...</Text>
                        <Text style={[aboutText(),getPlainColor(AdminAccountStatus)]} >It Shows That The Worker Has Not Yet Check Out</Text>


                

                    </View>

                </>)}
            </>)}

















                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
