
import React from 'react';
import { Text, View, Alert,TextInput,Image,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./stylesheet";
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import * as Location from 'expo-location';
import axios from "axios";
import { 
    MaterialCommunityIcons,Entypo,Fontisto,FontAwesome5,
    Feather,MaterialIcons,Ionicons,AntDesign,FontAwesome
    
} from '@expo/vector-icons';

import {
        APIPostLogIns,
        APIProvidersListAll,APIProviderMemberByCardNo,APIProviderServicesPaymentsByCardNo,
        APIProviderServicesClearedByCardNo,APIProviderServicesPendingByCardNo,
        APIPostProviderUpdate,APIListProviderDetailsByCardNo

        ,APIAgencyUserLogIn,ImageUrl,APIAgencyUserCheckIn,APIAgencyUserCheckOut,
        
        
        APIAgencyUserDeleteCheckedIn,
        APIAgencyUserHasNotCheckedOutDetails,APIUpdateAgencyJobs,APIGetUserBookedDetailsById,
        APIAgencyUserCheckedInDetails,APIAccountStatusByCardNo,APIAgencyUserCheckedOutDetails,

        APILogInClubMemberByCardNo,APIPostTransportOrder,APIListAllCountries,
        APIGetTransportBodaOrders,APIGetTransportTaxiOrders,

        APIPostHealthRequest,APIPostServicesBooking,
        APIPostAgencyApplication,
        } from './DataFileApis';

import {
    getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,
    mainTableTitleHandleView,getAgencyStatusColor,introClubText,trTdText,
    mainNavigationBtnWidth1,agencyUserDeleteBtn,
    getAgencyUserCheckOutColor,aboutTitleText,aboutText,
    getBorderBottomColor,userProfileView2,mainTableTitleHandleView2,
    mainNavigationBtnWidth4,mainTableTitleHandleViewCredit,userProfileView,
} from './StatusFunctions'
        

import { 
            POSTING_ERROR,LOGIN_ERROR,NO_USER_FOUND_ERROR,LOADING_ERROR,
            getTime,getDate,getDay,EMPTY_INPUTS_ERROR,
            renderTopHeaderRadiusWithOutABtn,
            renderTopHeaderRadiusWithABtn,
            renderSubmitAndCancelBtnUI,renderLogInBtnUI,
        } from './Functions';

import { AgencyJobsData,HealthHospitalsData,ProvidersListData 
        } from './AppDataFile';



export default class Services extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                    
                    UserCheckedInDetails:[],UserCheckedOutDetails:[],
                    LogInName:'',LogInCardNo:'',LogInCategory:'',

                    AccountStatus:'',

                    // Job Application 
                    JobApplyId:'',JobApplyFullName:'',JobApplyName:'',
                    JobApplyNumber:'',JobApplyEmail:'',

                    // Boda Taxi
                    OrderName:'',OrderFrom:'',OrderPhone:'',OrderTo:'',
                    
                    // Health Hospital
                    HospitalBookingName:'',HospitalBookingUserName:'',HospitalBookingPhone:'',

                    // Agency Application
                    AgencyApplyFullName:'',AgencyApplyNumber:'',AgencyApplyEmail:'',
                    // Agency My Account 

                    // Location
                    AgencyMyAccountUserLocation:null,
                    AgencyMyAccountUserLocationError:null, AgencyMyAccountLocationText:'Waiting...',
                    AgencyMyAccountCurrentDate:'',AgencyMyAccountCurrentTime:'',AgencyMyAccountCurrentDay:'',
                    AgencyMyAccountCurrentLatitude:'Waiting...',AgencyMyAccountCurrentLongitude:'Waiting...',
                    AgencyMyAccountUserCheckedInId:'',AgencyMyAccountUserCheckedInName:'',


                    AgencyMyAccountLogInState:'User',AgencyMyAccountUserProviderNo:'',
                    AgencyMyAccountMemberImage:'',AgencyMyAccountUserProviderName:'',
                    AgencyMyAccountUserName:'',AgencyMyAccountUserPassword:'',
                    AgencyMyAccountMemberName:'',AgencyMyAccountMemberCardNo:'',

                    // Main Screen 
                    DoNotShowMenuMainScreen:false,DoNotShowAgencyMainScreen:true,
                    DoNotShowHealthMainScreen:true, DoNotShowOtherServicesMainScreen:true,
                    DoNotShowRideMainScreen:true,DoNotShowDriveMainScreen:true,
                    

                    // Health 
                    DoNotShowHealthHospitalsScreen:false,
                    DoNotShowHealthBookingScreen:true,

                    // ShowAgencyMainScreen
                    DoNotShowAgencyListingMenuScreen:false,DoNotShowAgencyMyAccountScreen:true,
                    DoNotShowAgencyJobsScreen:true,DoNotShowAgencyAboutScreen:true,
                    DoNotShowAgencyApplyScreen:true,

                    // Agency MyAccount Screen
                    DoNotShowAgencyMyAccountHomeScreen:false,
                    DoNotShowAgencyMyAccountUserProfileScreen:false,
                    DoNotShowAgencyMyAccountUserCheckInScreen:true,
                    DoNotShowAgencyMyAccountUserCheckOutScreen:true,
                    DoNotShowAgencyMyAccountUserScreen:true, 
                    
                    // AgencyJobs Screen
                    DoNotShowAgencyJobsListingScreen:false, 
                    DoNotShowAgencyJobsApplyScreen:true,

                    // Other Services
                    DoNotShowOtherServicesListingScreen:false,
                    DoNotShowOtherServicesBookingScreen:true,
                    OtherServiceBookingProvider:'',
                    OtherServiceBookingNumber:'',
                    OtherServiceBookingContact:'',
                    OtherServiceBookingUserName:'',
                    
            
        }
        
    }
UNSAFE_componentWillMount () {this.getUserLogins();}
    
componentDidMount() {setTimeout(this.postUserLogins,5000);}


showMenuMainScreen = () =>
{
    this.setState({DoNotShowAgencyMainScreen:true})
    this.setState({DoNotShowHealthMainScreen:true})
    this.setState({DoNotShowOtherServicesMainScreen:true})
    this.setState({DoNotShowRideMainScreen:true})
    this.setState({DoNotShowDriveMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:false})
}
showAgencyMainScreen = () =>
{
    this.setState({DoNotShowHealthMainScreen:true})
    this.setState({DoNotShowOtherServicesMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowRideMainScreen:true})
    this.setState({DoNotShowDriveMainScreen:true})
    this.setState({DoNotShowAgencyMainScreen:false})
}
showHealthMainScreen = () =>
{
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowRideMainScreen:true})
    this.setState({DoNotShowAgencyMainScreen:true})
    this.setState({DoNotShowOtherServicesMainScreen:true})
    this.setState({DoNotShowDriveMainScreen:true})
    this.setState({DoNotShowHealthMainScreen:false})
}
showHealthHospitalsScreen = () =>
{
    this.setState({DoNotShowHealthBookingScreen:true})
    this.setState({DoNotShowHealthHospitalsScreen:false})
}
showHealthBookingScreen = (name) =>
{
    this.setState({HospitalBookingName:name});
    console.log(this.state.DoNotShowHealthBookingScreen)
    console.log("=====>>"+name)
    this.setState({DoNotShowHealthHospitalsScreen:true})
    this.setState({DoNotShowHealthBookingScreen:false})

    console.log(this.state.DoNotShowHealthBookingScreen)
}
showOtherServicesMainScreen = () =>
{
    this.setState({DoNotShowHealthMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowRideMainScreen:true})
    this.setState({DoNotShowAgencyMainScreen:true})
    this.setState({DoNotShowDriveMainScreen:true})
    this.setState({DoNotShowOtherServicesMainScreen:false})
}
showOtherServicesListingScreen = () =>
{
    this.setState({DoNotShowOtherServicesBookingScreen:true})
    this.setState({DoNotShowOtherServicesListingScreen:false})
}
showOtherServicesBookingScreen = (name,number) =>
{
    this.setState({OtherServiceBookingProvider:name});
    this.setState({OtherServiceBookingNumber:number});
    this.setState({DoNotShowOtherServicesListingScreen:true})
    this.setState({DoNotShowOtherServicesBookingScreen:false})
}
showRideMainScreen = () =>
{
    this.setState({DoNotShowAgencyMainScreen:true})
    this.setState({DoNotShowHealthMainScreen:true})
    this.setState({DoNotShowOtherServicesMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowDriveMainScreen:true})
    this.setState({DoNotShowRideMainScreen:false})
}
showDriveMainScreen = () =>
{
    this.setState({DoNotShowAgencyMainScreen:true})
    this.setState({DoNotShowHealthMainScreen:true})
    this.setState({DoNotShowOtherServicesMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowRideMainScreen:true})
    this.setState({DoNotShowDriveMainScreen:false})
}

// Sub screens
backToAgencyListingMenuScreen = () =>
{
    this.setState({DoNotShowAgencyAboutScreen:true})
    this.setState({DoNotShowAgencyJobsScreen:true})
    this.setState({DoNotShowAgencyApplyScreen:true})
    this.setState({DoNotShowAgencyMyAccountScreen:true})
    this.setState({DoNotShowAgencyListingMenuScreen:false})
}
showAgencyMyAccountScreen = () =>
{
    this.setState({DoNotShowAgencyListingMenuScreen:true})
    this.setState({DoNotShowAgencyAboutScreen:true})
    this.setState({DoNotShowAgencyJobsScreen:true})
    this.setState({DoNotShowAgencyApplyScreen:true})
    this.setState({DoNotShowAgencyMyAccountScreen:false})
}
showAgencyJobsScreen = () =>
{
    this.setState({DoNotShowAgencyListingMenuScreen:true})
    this.setState({DoNotShowAgencyApplyScreen:true})
    this.setState({DoNotShowAgencyMyAccountScreen:true})
    this.setState({DoNotShowAgencyAboutScreen:true})
    this.setState({DoNotShowAgencyJobsScreen:false})
}
showAgencyJobsListingScreen = () =>
{this.setState({DoNotShowAgencyJobsApplyScreen:true});this.setState({DoNotShowAgencyJobsListingScreen:false})}
showAgencyJobsApplyScreen = (id,name) =>
{
    this.setState({JobApplyName:name});
    this.setState({JobApplyId:id});
    this.setState({DoNotShowAgencyJobsListingScreen:true});
    this.setState({DoNotShowAgencyJobsApplyScreen:false})
}
showAgencyApplyScreen = () =>
{
    this.setState({DoNotShowAgencyListingMenuScreen:true})
    this.setState({DoNotShowAgencyMyAccountScreen:true})
    this.setState({DoNotShowAgencyJobsScreen:true})
    this.setState({DoNotShowAgencyAboutScreen:true})
    this.setState({DoNotShowAgencyApplyScreen:false})
}    
showAgencyAboutScreen = () =>
{
    this.setState({DoNotShowAgencyListingMenuScreen:true})
    this.setState({DoNotShowAgencyMyAccountScreen:true})
    this.setState({DoNotShowAgencyApplyScreen:true})
    this.setState({DoNotShowAgencyJobsScreen:true})
    this.setState({DoNotShowAgencyAboutScreen:false})
}

showAgencyMyAccountUserScreen = () =>
{
    this.setState({DoNotShowAgencyMyAccountHomeScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserScreen:false})
}
showAgencyMyAccountUserProfileScreen = ()=>
{
    this.setState({DoNotShowAgencyMyAccountUserCheckInScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserCheckOutScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserProfileScreen:false})
    this.getAgencyMyAccountUserCheckedInDetails(this.state.AgencyMyAccountMemberCardNo);
    this.getAgencyMyAccountUserJobBookedDetails(this.state.AgencyMyAccountMemberCardNo)
    this.getAgencyMyAccountUserCheckedOutDetails();
}
showAgencyMyAccountUserCheckInScreen = ()=>
{
    this.setState({AgencyMyAccountCurrentDate:getDate()})
    this.setState({AgencyMyAccountCurrentTime:getTime()})
    this.setState({AgencyMyAccountCurrentDay:getDay()})
    this.setState({AgencyMyAccountCurrentLatitude:"Waiting..."}); 
    this.setState({AgencyMyAccountCurrentLongitude:"Waiting..."});
    this.setState({DoNotShowAgencyMyAccountUserProfileScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserCheckOutScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserCheckInScreen:false})
}
showAgencyMyAccountUserCheckOutScreen = ()=>
{
    this.getAgencyMyAccountUserCheckedInDetails(this.state.AgencyMyAccountMemberCardNo) 
    this.setState({AgencyMyAccountCurrentDate:getDate()})
    this.setState({AgencyMyAccountCurrentTime:getTime()})
    this.setState({AgencyMyAccountCurrentDay:getDay()})
    this.setState({DoNotShowAgencyMyAccountUserProfileScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserCheckInScreen:true})
    this.setState({DoNotShowAgencyMyAccountUserCheckOutScreen:false})
}

getAgencyMyAccountUserLocation  = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        this.setState({AgencyMyAccountUserLocationError:'Permission To Access Location Was Denied'});
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({AgencyMyAccountUserLocation:location});
    
    if (this.state.UserLocationError) {this.setState({LocationText:this.state.AgencyMyAccountUserLocationError});} 
    else if (this.state.AgencyMyAccountUserLocation) 
    {
        // this.setState({LocationText:JSON.stringify(this.state.UserLocation)});
        this.setState({AgencyMyAccountCurrentLatitude:location.coords.latitude}); 
        this.setState({AgencyMyAccountCurrentLongitude:location.coords.longitude});
        // this.setState({CurrentAltitude:location.coords.altitude});
        // this.setState({CurrentAccuracy:location.coords.altitudeAccuracy});

    }
}
getUserLogins =  () => 
{
    try 
    {   
        AsyncStorage.getItem('ClubMemberDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].ClubUserName;
            let CardNo = jsonData[0].AgencyMyAccountMemberCardNo;
            let Category= jsonData[0].ClubMemberCategory;

            this.setState({LogInName:Name});
            this.setState({LogInCardNo:CardNo});
            this.setState({LogInCategory:Category});
            // console.log("Details are From Db :::"+Name+":::"+CardNo+":::"+Category)
        }
        else {console.log("No Details Found")}
        })
    }catch (error) { console.log(error)}
}

setJobApplyFullName = (text) =>{this.setState({JobApplyFullName:text});}
setJobApplyNumber = (text) =>{this.setState({JobApplyNumber:text});}
setJobApplyEmail = (text) =>{this.setState({JobApplyEmail:text});}

// Agency My Account 
changeAgencyMyAccountLogInState = (text) =>{this.setState({AgencyMyAccountLogInState:text})}
setAgencyMyAccountUserName = (text) => {this.setState({AgencyMyAccountUserName:text})}
setAgencyMyAccountUserPassword = (text) => {this.setState({AgencyMyAccountUserPassword:text})}


// Agency User Apply 
setAgencyApplyFullName  = (text) =>{this.setState({AgencyApplyFullName:text})}
setAgencyApplyNumber = (text) =>{this.setState({AgencyApplyNumber:text})}
setAgencyApplyEmail  = (text) =>{this.setState({AgencyApplyEmail:text})}

// Boda Taxi
setOrderName = (text) =>{this.setState({OrderName:text});}
setOrderFrom = (text) =>{this.setState({OrderFrom:text});}
setOrderPhone = (text) =>{this.setState({OrderPhone:text});}
setOrderTo = (text) =>{this.setState({OrderTo:text});}

// Health 
setHospitalUserBookingName = (text) =>{this.setState({HospitalBookingUserName:text});}
setHospitalBookingPhone = (text) =>{this.setState({HospitalBookingPhone:text});}

setServicesBookingUserName = (text) =>{this.setState({OtherServiceBookingUserName :text});}
setServicesBookingContact = (text) =>{this.setState({OtherServiceBookingContact :text});}
agencyMyAccountUserLogIn = async () =>
{
    let name = this.state.AgencyMyAccountUserName;
    let password = this.state.AgencyMyAccountUserPassword;
    if ((name.length === 0) || (password.length === 0))
        {Alert.alert('Log In Error',EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIAgencyUserLogIn+name)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].AgencyNumber;
                let userPassword  = jsonResults[0].Password;
                if ((CardNo !== name)&&(userPassword !== password ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    let Pic = jsonResults[0].image;
                    let Provider = jsonResults[0].Holder2;
                    let ProviderNo = jsonResults[0].Holder1;
                    let TcNumber = jsonResults[0].TcNumber;
                    try {
                        let MemberDetails={UserProviderName:Provider,Pic:Pic,UserProviderNo:ProviderNo, ClubUserName:Name,AgencyMyAccountMemberCardNo:CardNo,ClubMemberImage:Pic,TcNumber:TcNumber}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('AgencyUserDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({AgencyMyAccountMemberName:Name});
                    this.setState({AgencyMyAccountMemberImage:Pic});
                    this.setState({AgencyMyAccountMemberCardNo:CardNo});
                    this.setState({AgencyMyAccountUserProviderName:Provider});
                    this.setState({AgencyMyAccountUserProviderNo:ProviderNo});
                    this.getAgencyMyAccountUserCheckedInDetails(CardNo) 
                    this.getAgencyMyAccountUserJobBookedDetails(CardNo);
                    this.getAgencyMyAccountUserCheckedOutDetails();
                    this.showAgencyMyAccountUserScreen();
                }
            }
        }
        catch (error){ console.log(error); Alert.alert("An Error",LOGIN_ERROR)};
    }
}
postUserCheckInDelete = async (Id) =>
{
    let Name = this.state.AgencyMyAccountUserCheckedInName;
    console.log(APIAgencyUserDeleteCheckedIn+Id + Name)
    try
    {
        const Request = await axios.post(APIAgencyUserDeleteCheckedIn+Id)
        let result = Request.data.status;
        Alert.alert("Action Status",Name +"\n\n"+ result);
        this.showAgencyMyAccountUserProfileScreen();
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
getAgencyMyAccountUserJobBookedDetails = (Number) =>
{
    axios.get(APIGetUserBookedDetailsById+Number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonresults =JSON.parse(results); 
        this.setState({BookedJobsDetails:[...jsonresults]})
        })
    .catch(err=>{console.log(err); Alert.alert("An Error",LOADING_ERROR);})
}
getAgencyMyAccountUserCheckedInDetails = (CardNo) =>
{
    axios.get(APIAgencyUserCheckedInDetails+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({UserCheckedInDetails:[...JSON.parse(results)]})
        // console.log(this.state.UserCheckedInDetails)
        let jsonData = JSON.parse(results)
        let Id = jsonData[0].id;
        let Name = jsonData[0].Name;
        this.setState({AgencyMyAccountUserCheckedInId:Id})
        this.setState({AgencyMyAccountUserCheckedInName:Name})
        })
    .catch(err=>{console.log(err);})
}
getAgencyMyAccountUserCheckedOutDetails = () =>
{
    let number = this.state.AgencyMyAccountMemberCardNo;
    axios.get(APIAgencyUserCheckedOutDetails+number)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({UserCheckedOutDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log(err); Alert.alert("Error",LOADING_ERROR);}) 
}
postUserLogins = async () =>
{

    let Name = this.state.LogInName
    let CardNo = this.state.LogInCardNo
    let Category = this.state.LogInCategory

    // console.log("Posting LogIns Credentials"+Name+":::"+CardNo+":::"+Category)

    if ((Name === '') || (CardNo === '') || (Category === ''))
    {console.log("All Fields Are Empty")}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostLogIns,
                {
                    "Name": Name,
                    "Number":CardNo,
                    "Type": Category
                }
            )
            let result = postRequest.data.status;
            // console.log("::::"+result)
        }
        catch (error){console.log("++++++++"+error);};
    }
}
postAgencyUserApplication = async () =>
{
    let name = this.state.AgencyApplyFullName;
    let email = this.state.AgencyApplyEmail;
    let number = this.state.AgencyApplyNumber;

    if ((name.length === 0) ||(email.length === 0)||(number.length === 0))
        { Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostAgencyApplication,
                {
                    "Name":name,
                    "Email":email,
                    "Contact":number,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Application In Status",name + "\n\n"+ result);
            this.showAgencyMainScreen();
        }
        catch (error){Alert.alert("An Error", POSTING_ERROR)};
    }
}
postUserCheckIn = async () =>
{
    let AgencyNumber = this.state.AgencyMyAccountMemberCardNo;
    let Name = this.state.AgencyMyAccountMemberName;
    // let date = this.state.CurrentDate; / to be identified at backend php
    let time = this.state.AgencyMyAccountCurrentTime;
    let day = this.state.AgencyMyAccountCurrentDay;
    let latitude = this.state.AgencyMyAccountCurrentLatitude;
    let longitude =this.state.AgencyMyAccountCurrentLongitude;
    // let altitude = this.state.AgencyMyAccountCurrentAltitude;
    // let accuracy = this.state.AgencyMyAccountCurrentAccuracy;
    let user_provider = this.state.AgencyMyAccountUserProviderName;
    let user_providerNo = this.state.AgencyMyAccountUserProviderNo;

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
                    "CheckInAltitude":"altitude",
                    "CheckInAccuracy":"accuracy",
                    "CheckInProviderName":user_provider,
                    "CheckInProviderNo":user_providerNo,

                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Check In Status",Name + "\n\n"+ result);
            this.showAgencyMyAccountUserProfileScreen ();
        }
        catch (error){Alert.alert("An Error", POSTING_ERROR)};
    }
}
postUserCheckOut = async () =>
{
    let ID = this.state.AgencyMyAccountUserCheckedInId;
    let Name = this.state.AgencyMyAccountUserCheckedInName;
    let date = this.state.AgencyMyAccountCurrentDate;
    let time = this.state.AgencyMyAccountCurrentTime;
    let day = this.state.AgencyMyAccountCurrentDay;

        if (day.length=== 0 || date.length === 0 || time.length===0)
            { Alert.alert("An Error","Day Or Date Or Time Can't Be Empty\n\n ")}
        else
        {
                try
                {
                    const Request = await axios.put(APIAgencyUserCheckOut, 
                        {"id":ID,"CheckOutDay":day,"CheckOutDate":date,"CheckOutTime":time})
                    let result = Request.data.status;
                    Alert.alert("Check Out Status",Name +"\n\n"+ result);
                    this.showAgencyMyAccountUserProfileScreen();
                }
                catch (error){console.log(error); Alert.alert("An Error",POSTING_ERROR)};
        }
}
postJobApplied = async () =>
{
    let id = this.state.JobApplyId;
    let name = this.state.JobApplyFullName;
    let number = this.state.JobApplyNumber;
    let email = this.state.JobApplyEmail;
    let job = this.state.JobApplyName;

    if ((name === '') ||(number === '') ||(email === ''))
    { Alert.alert("Error", EMPTY_INPUTS_ERROR)}

    try
    {
        const Request = await axios.put(APIUpdateAgencyJobs, 
                {"id":id,"Name":name,"Number":number,"Email":email})
        let result = Request.data.status;
        this.showAgencyJobsListingScreen();
        this.setState({JobApplyFullName:''})
        this.setState({JobApplyNumber:''})
        this.setState({JobApplyEmail:''});
        Alert.alert("Hello:"+name,job+"\n\n"+result);
    }

    catch (error){Alert.alert("An Error",POSTING_ERROR)};
}
postUserTransportOder = async (Service) =>
{
    let name = this.state.OrderName;
    let from = this.state.OrderFrom;
    let phone = this.state.OrderPhone;
    let to = this.state.OrderTo;
    

    if ((name.length === 0) || (phone.length === 0) || (from.length === 0) || (to.length === 0))
        { Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostTransportOrder,
                {
                    "Name":name,
                    "From":from,
                    "To":to,
                    "Phone":phone,
                    "Number":"none",
                    "Service":Service,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Hello:"+name,result);
            this.showMenuMainScreen();
            this.setState({OrderName:''})
            this.setState({OrderFrom:''})
            this.setState({OrderPhone:''})
            this.setState({OrderTo:''})
        }
        catch (error){ console.log(error); Alert.alert("An Error", POSTING_ERROR)};
    }
}
postUserHospitalBooking = async () =>
{
    let number = this.state.HospitalBookingPhone;
    let name = this.state.HospitalBookingUserName;
    let hospital = this.state.HospitalBookingName;
    // let country = this.state.CountryValue;
    // let insurance = this.state.InsuranceValue;
    

    if ((name.length === 0) ||(hospital.length === 0) || (number.length === 0))
        { Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostHealthRequest,
                {
                    "Name":name,
                    "Number":number,
                    "Hospital":hospital,
                    "Country":"",
                    "Insurance":""
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Hello:" + name, result);
            this.showHealthHospitalsScreen();
        }
        catch (error)
            {
                Alert.alert("An Error", POSTING_ERROR)
            };
    }
}
postUserServicesBooking = async () =>
{
    console.log("called=====")
    let providerName = this.state.OtherServiceBookingProvider;
    let providerNumber = this.state.OtherServiceBookingNumber;
    let contact = this.state.OtherServiceBookingContact;
    let name = this.state.OtherServiceBookingUserName;

    console.log(name + contact)

    if ((name.length === 0) ||(contact.length === 0))
        { Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostServicesBooking,
                {
                    "Name":name,
                    "Contact":contact,
                    "ProviderName":providerName,
                    "ProviderNumber":providerNumber,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Hello: "+ " "+ name, "\n\n"+ result);
            this.showOtherServicesListingScreen();
        }
        catch (error)
            {
                // console.log("+++++++++++++++++"+error);
                Alert.alert("An Error", POSTING_ERROR)
            };
    }
}
render() {
        const {AccountStatus}= this.state;
        const {
                    DoNotShowMenuMainScreen,DoNotShowDriveMainScreen,
                    DoNotShowAgencyMainScreen, DoNotShowHealthMainScreen,
                    DoNotShowOtherServicesMainScreen, DoNotShowRideMainScreen
            } = this.state;

        // Agency 
        const {
                    DoNotShowAgencyMyAccountScreen,DoNotShowAgencyJobsScreen,
                    DoNotShowAgencyAboutScreen,DoNotShowAgencyListingMenuScreen,
                    UserCheckedOutDetails,

                    // Agency My Account
                    AgencyMyAccountCurrentDate,AgencyMyAccountCurrentTime,AgencyMyAccountCurrentDay,
                    AgencyMyAccountCurrentLatitude,AgencyMyAccountCurrentLongitude,
                    BookedJobsDetails,AgencyMyAccountMemberImage,UserCheckedInDetails,
                    AgencyMyAccountMemberName,AgencyMyAccountMemberCardNo,AgencyMyAccountUserProviderName,
                    AgencyMyAccountLogInState,DoNotShowAgencyMyAccountHomeScreen,
                    DoNotShowAgencyMyAccountUserScreen,
                    DoNotShowAgencyMyAccountUserProfileScreen,
                    DoNotShowAgencyMyAccountUserCheckInScreen,
                    DoNotShowAgencyMyAccountUserCheckOutScreen,

                    // Register 
                    DoNotShowAgencyApplyScreen,
            } = this.state;

        const {
                // Health 
                DoNotShowHealthHospitalsScreen,
                DoNotShowHealthBookingScreen,
                HospitalBookingName
            } = this.state;

        const {
                DoNotShowAgencyJobsListingScreen,DoNotShowAgencyJobsApplyScreen
            } = this.state;

        const {
                    DoNotShowOtherServicesBookingScreen,DoNotShowOtherServicesListingScreen,
                    OtherServiceBookingProvider
            }=  this.state;
    
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
                </View>
                
                <View style={styles.MainTopHeaderView} >
                    <View style={{height:15}}></View>
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc Services  </Text>
                    </View>
                </View>


            {/* 
                ==================================================================================
                ==================================================================================
                        MenuMainScreen
                ==================================================================================
                ==================================================================================
            */}
        
                {DoNotShowMenuMainScreen?(<></>) :(<>
                    {renderTopHeaderRadiusWithOutABtn()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{height:15}} ></View>
                        <View style={styles.MenuCardRowView} >
                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showAgencyMainScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <MaterialIcons name="workspaces-filled" size={50} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> Agency</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showHealthMainScreen}>
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <FontAwesome5 name="heartbeat" size={50} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> Health</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{height:20}}></View>
                        <View style={styles.MenuCardRowView} >
                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showDriveMainScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <Fontisto name="taxi" size={40} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> Drive</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showRideMainScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <Fontisto name="motorcycle" size={50} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> Ride</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{height:20}}></View>
                        <View style={styles.MenuCardView2} >
                            <TouchableOpacity onPress={this.showOtherServicesMainScreen} >
                                <View style={{flexDirection:'row'}} >
                                    <View style={styles.MenuCardView2Left} >
                                        <FontAwesome5 name="hand-holding"  size={40} color={COLORS.colourNumberOne} />
                                    </View>
                                    <View style={styles.MenuCardView2Right} >
                                        <Text style = {styles.MenuCardText}> Other Services</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    <View style={{height:40}}></View>
                    </ScrollView>
                    <View style={{height:10}}></View>
                </>)}






























            {/* 
            ==================================================================================
            ==================================================================================
                    AgencyMainScreen
            ==================================================================================
            ==================================================================================
            */}
    
            {DoNotShowAgencyMainScreen ?(<></>) :(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                {/* {renderTopHeaderRadiusWithOutABtn()} */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {DoNotShowAgencyListingMenuScreen?(<></>):(<>
                        <View style={{height:20}}></View>
                        <View style={styles.MenuCardRowView} >
                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showAgencyMyAccountScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <MaterialIcons name="account-circle" size={40} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> My Account</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showAgencyJobsScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <MaterialCommunityIcons name="offer" size={50} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> Jobs</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{height:20}}></View>
                        {/* <View style={styles.MenuCardRowView} >
                            <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showAgencyApplyScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <MaterialCommunityIcons name="account-edit" size={40} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> Apply</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> */}
                            <View style={styles.MenuCardView2} >
                                <TouchableOpacity onPress={this.showAgencyApplyScreen} >
                                    <View style={{flexDirection:'row'}} >
                                        <View style={styles.MenuCardView2Left} >
                                            <MaterialCommunityIcons name="account-edit"  size={40} color={COLORS.colourNumberOne} />
                                        </View>
                                        <View style={styles.MenuCardView22Right} >
                                            <Text style = {styles.MenuCardText}> Apply For Agency</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={styles.MenuCardView} >
                                <TouchableOpacity onPress={this.showAgencyAboutScreen} >
                                    <View style={{height:20}} ></View>
                                    <View style={{alignItems:'center'}} >
                                        <Entypo name="info-with-circle" size={40} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.MenuCardText}> About</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> */}
                        {/* </View> */}
                    </>)}


                    {DoNotShowAgencyMyAccountScreen?(<></>):(<>
                        {renderTopHeaderRadiusWithABtn(this.backToAgencyListingMenuScreen)}
                        {DoNotShowAgencyMyAccountHomeScreen ? <></>:(<>
                            {AgencyMyAccountLogInState && AgencyMyAccountLogInState == 'User'?(<>
                                <View style={{alignItems:'center'}} >
                                    <FontAwesome name="user" size={80} color={COLORS.colourNumberOne} />
                                    <View style={{height:15}} ></View>
                                    <Text style = {styles.UpdatedTextLabel}> User Log In  </Text>
                                </View>


                                <TextInput style={styles.UpdatedInput} placeholder="User Name" onChangeText={text => this.setAgencyMyAccountUserName(text)}  
                                    placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                                <TextInput style={styles.UpdatedInput} placeholder="Password" onChangeText={text => this.setAgencyMyAccountUserPassword(text)}  
                                    placeholderTextColor = "#5800c4" secureTextEntry selectionColor={COLORS.colourNumberOne} />

                                {renderLogInBtnUI(this.agencyMyAccountUserLogIn)}
                                
                            </>) :(<></>)}
                            </>)}
                        {/* 
                            ====================================================================
                            ====================================================================
                            ====================================================================
                                        Agency My Account User Screen
                            ====================================================================
                            ====================================================================
                            ====================================================================
                        */}
                        {/* 
                            =============================
                            Agency My Account User Screen 
                            =============================
                        */}
                        {DoNotShowAgencyMyAccountUserScreen ?<></>:(<> 
                            <View style={styles.MainNavigationBtnView}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <View style={styles.ArrowMainView}>
                                        <AntDesign name="rightcircle" size={30} color={COLORS.colourNumberOne}/>
                                    </View>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.UpdatedMainNavigationBtnStyle,styles.UpdatedMainNavigationBtnWidth1]} 
                                            onPress={this.showAgencyMyAccountUserProfileScreen} >
                                        <Text style = {styles.UpdatedBtnText}> My Profile  </Text>
                                    </TouchableOpacity>


                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.UpdatedMainNavigationBtnStyle,styles.UpdatedMainNavigationBtnWidth1]} 
                                            onPress={this.showAgencyMyAccountUserCheckInScreen} >
                                        <Text style = {styles.UpdatedBtnText}> Check In </Text>
                                    </TouchableOpacity>
                                    

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.UpdatedMainNavigationBtnStyle,styles.UpdatedMainNavigationBtnWidth1]} 
                                            onPress={this.showAgencyMyAccountUserCheckOutScreen} >
                                        <Text style = {styles.UpdatedBtnText}> Check Out  </Text>
                                    </TouchableOpacity>


                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <View style={styles.ArrowMainView}>
                                        <AntDesign name="leftcircle" size={30} color={COLORS.colourNumberOne} />
                                    </View>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} >
                            {DoNotShowAgencyMyAccountUserProfileScreen ?(<></>):(<>
                                <View style={{height:15}} ></View>
                                <View style = {[styles.UpdatedUserProfileView]} >
                                    <View style = {[styles.UserProfileImageView]} >
                                        <Image source={{uri:ImageUrl+AgencyMyAccountMemberImage}} style={styles.AgencyImage} />
                                    </View>
                                    <View style = {[styles.UserProfileNameView]} >
                                        <Text style = {styles.UpdatedAgencyNameText}>{AgencyMyAccountMemberName}</Text>
                                        
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.UpdatedAgencyNameText}> {AgencyMyAccountMemberCardNo} </Text>
                                        
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.UpdatedAgencyNameText}> {AgencyMyAccountUserProviderName} </Text>
                                    </View>
                                </View>
                                
                                <View style={{height:20}} ></View>
                                <View style = {[styles.UpdatedMainTableTitleHandleView]} >
                                    <Text style = { styles.UpdatedTableTitleHandleText}> Booked Jobs Details </Text>
                                </View>
                                    {BookedJobsDetails && BookedJobsDetails.map((item, index) => ( 
                                        <View key={index}> 
                                            <View style={styles.mainTableView}>
                                                <View style={styles.JobCardView}  >
                                                    <View style={{height:8}}></View>

                                                    <Text  style={styles.JobNameText}>{item.Name}</Text>

                                                    <Text  style={styles.JobTextStyle}>
                                                        <FontAwesome5 name="globe" size={15} color={COLORS.jobIconColor} />{" "}{" "}{item.Holder1}{" "}{" "}{" "} 
                                                        <Entypo name="location-pin" size={22} color={COLORS.jobIconColor} />{" "}{" "}{item.Area}
                                                    </Text>
                                                    <View style={{height:7}}></View>
                                                    <MaterialIcons name="money" style={{marginBottom:-35,marginLeft:10}} size={20} color={COLORS.jobIconColor} />
                                                    <Text  style={styles.JobTextStyle}>
                                                        {" "}{" "}{" "}{" "}{" "}{" "}{item.Amount}{" "}{" "}{" "}{" "} 
                                                        <MaterialCommunityIcons name="clock" size={18} color={COLORS.jobIconColor} />{" "}{" "}{item.Hours}
                                                    </Text>

                                                    <Text  style={styles.JobTextStyle}>By  
                                                        {" "}{" "}{" "}{item.AgencyName}{" "}{" "}{" "} {" "}{item.AgencyNumber}
                                                    </Text>
                                                
                                                    <View style={{height:10}}></View>

                                                </View>
                                            </View>
                                        </View>
                                        ))}

                                <View style={{height:20}} ></View>
                                <View style = {[styles.UpdatedMainTableTitleHandleView]} >
                                    <Text style = { styles.UpdatedTableTitleHandleText}> Checked In Details </Text>
                                </View>
                                <View style={styles.mainTableOuterView} >
                                    {UserCheckedInDetails && UserCheckedInDetails.map((item, index) => ( 
                                    <View key={index}> 
                                        <View style={styles.mainTableView}>
                                            <View style={styles.JobCardView}  >
                                                <View style={{height:8}}></View>

                                                <Text  style={styles.JobNameText}>
                                                    <AntDesign name="star" size={18} color={COLORS.jobIconColor} />
                                                    {" "}{" Status : "}{item.Holder3}
                                                </Text>

                                                <Text  style={styles.JobTextStyle}>
                                                    <Entypo name="location-pin" size={22} color={COLORS.jobIconColor} />
                                                    {" "}{" Lat : "}{item.CheckInLatitude}{" "}{" "}
                                                    {"Long : "}{item.CheckInLongitude}
                                                </Text>

                                                <Text  style={styles.JobTextStyle}>
                                                <MaterialCommunityIcons name="clock" size={18} color={COLORS.jobIconColor} />
                                                    {" "}{"Time : "}{"In-"}{item.CheckInTime}{" "}
                                                    {"Out-"}{item.CheckOutTime}
                                                </Text>

                                                <Text  style={styles.JobTextStyle}>
                                                <FontAwesome name="stop-circle-o" size={18} color={COLORS.jobIconColor} />
                                                    {" "}{"Day : "}{"In-"}{item.CheckInDay}{" "}
                                                    {"Out-"}{item.CheckOutDay}
                                                </Text>

                                                <Text  style={styles.JobTextStyle}>
                                                <FontAwesome5 name="calendar-day" size={18} color={COLORS.jobIconColor} />
                                                    {" "}{"Date : "}{"In-"}{item.CheckInDate}{" "}
                                                    {"Out-"}{item.CheckOutDate}
                                                </Text>

                                                <Text  style={styles.JobTextStyle}>{" "}{" "}{item.Name}{" "}</Text>

                                                <View style={{alignItems:'flex-end'}} >
                                                    <TouchableOpacity onPress={()=>{this.deleteUserCheckInRecord(item.id)}} style={styles.jobBookingBtn} >
                                                        <Text style={styles.jobBookingText} >Remove This Record</Text> 
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </View>
                                        <View style={{height:10}}></View>
                                    </View>
                                    ))}
                                </View>

                                <View style={{height:20}} ></View>
                                <View style = {[styles.UpdatedMainTableTitleHandleView]} >
                                    <Text style = { styles.UpdatedTableTitleHandleText}> Checked Out Details </Text>
                                </View>
                                <View style={styles.mainTableOuterView} >
                                        {UserCheckedOutDetails && UserCheckedOutDetails.map((item, index) => ( 
                                        <View key={index}> 
                                            <View style={styles.mainTableView}>
                                                <View style={styles.JobCardView}  >
                                                    <View style={{height:8}}></View>

                                                    <Text  style={styles.JobNameText}>
                                                        <AntDesign name="star" size={18} color={COLORS.jobIconColor} />
                                                        {" "}{" Status : "}{item.Holder3}
                                                    </Text>

                                                    <Text  style={styles.JobTextStyle}>
                                                        <Entypo name="location-pin" size={22} color={COLORS.jobIconColor} />
                                                        {" "}{" Lat : "}{item.CheckInLatitude}{" "}{" "}
                                                        {"Long : "}{item.CheckInLongitude}
                                                    </Text>

                                                    <Text  style={styles.JobTextStyle}>
                                                    <MaterialCommunityIcons name="clock" size={18} color={COLORS.jobIconColor} />
                                                        {" "}{"Time : "}{"In-"}{item.CheckInTime}{" "}
                                                        {"Out-"}{item.CheckOutTime}
                                                    </Text>

                                                    <Text  style={styles.JobTextStyle}>
                                                    <FontAwesome name="stop-circle-o" size={18} color={COLORS.jobIconColor} />
                                                        {" "}{"Day : "}{"In-"}{item.CheckInDay}{" "}
                                                        {"Out-"}{item.CheckOutDay}
                                                    </Text>

                                                    <Text  style={styles.JobTextStyle}>
                                                    <FontAwesome5 name="calendar-day" size={18} color={COLORS.jobIconColor} />
                                                        {" "}{"Date : "}{"In-"}{item.CheckInDate}{" "}
                                                        {"Out-"}{item.CheckOutDate}
                                                    </Text>

                                                    <Text  style={styles.JobTextStyle}>{" "}{" "}{item.Name}{" "}</Text>

                                                    <View style={{height:10}}></View>
                                                </View>
                                            </View>
                                            <View style={{height:10}}></View>
                                        </View>
                                        ))}
                                </View>
                            </>)}

                            {DoNotShowAgencyMyAccountUserCheckInScreen ?(<></>):(<>
                                <View style={{height:15}} ></View>

                                <View style={styles.UpdatedCheckInOutCardView}>
                                <View style={{height:10}} ></View>
                                <View style={{alignItems:'center'}} >
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.getAgencyMyAccountUserLocation} >
                                        <Text style = {styles.UpdatedBtnText}> Get My Coordinates  </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:15}} ></View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Name  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountMemberName}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:5}} ></View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Day  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentDay}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:5}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Date  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentDate}  </Text>
                                    </View>
                                </View>


                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:5}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Time  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}> {AgencyMyAccountCurrentTime}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:5}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Longitude  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentLongitude}  </Text>
                                    </View>
                                </View>

                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:5}} ></View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInCardLeftView} >
                                        <Text style = {styles.checkInCardLeftText}> Latitude  </Text>
                                    </View>
                                    <View style = {styles.checkInCardRightView} >
                                        <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentLatitude}  </Text>
                                    </View>
                                </View>
                                <View style = {styles.checkInCardView} >
                                    <View style = {styles.checkInLineCardVieW}></View>
                                    <View style={{height:5}} ></View>
                                </View>

                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postUserCheckIn} >
                                    <Text style = {styles.UpdatedBtnText}> Check Me In Now  </Text>
                                </TouchableOpacity>

                            </View>
                            </>)}

                            {DoNotShowAgencyMyAccountUserCheckOutScreen ?(<></>):(<>
                                <View style={{height:15}} ></View>

                                <View style={styles.UpdatedCheckInOutCardView}>
                                <View style={{height:5}} ></View>
                                <View style={{alignItems:'center'}}  >
                                    <View style={{height:15}} ></View>
                                    <Text style = {styles.UpdatedTextLabel}>Checked In User Details  </Text>
                                </View>
                                <View style={{height:10}} ></View>
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
                            
                                    <View style={{alignItems:'center'}}  >
                                        <Text style = {styles.UpdatedTextLabel}>Check Out User Details  </Text>
                                    </View>
                                    <View style={{height:10}} ></View>
                                
                        
                                        <View style = {styles.checkInCardView} >
                                            <View style = {styles.checkInCardLeftView} >
                                                <Text style = {styles.checkInCardLeftText}> Day  </Text>
                                            </View>
                                            <View style = {styles.checkInCardRightView} >
                                                <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentDay}  </Text>
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
                                                <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentDate} </Text>
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
                                                <Text style = {styles.checkInCardRightText}>  {AgencyMyAccountCurrentTime} </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.checkInCardView} >
                                            <View style = {styles.checkInLineCardVieW}></View>
                                            <View style={{height:20}} ></View>
                                        </View>

                                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postUserCheckOut} >
                                            <Text style = {styles.UpdatedBtnText}> Check Me Out Now </Text>
                                        </TouchableOpacity>
                                    </View>
                        </>)}
                        </ScrollView>
                    </>)}
                    </>)}

































                    {DoNotShowAgencyJobsScreen?(<></>):(<>
                        {renderTopHeaderRadiusWithABtn(this.backToAgencyListingMenuScreen)}
                        {DoNotShowAgencyJobsListingScreen?(<></>):(<>
                            {AgencyJobsData[0] && AgencyJobsData[0].map((item,index)=>(
                                <View key={index} >
                                        <View style={styles.mainTableView}>

                                            <View style={styles.JobCardView}  >
                                                <View style={{height:8}}></View>

                                                <Text  style={styles.JobNameText}>{item.Name}</Text>

                                                <Text  style={styles.JobTextStyle}>
                                                    <FontAwesome5 name="globe" size={15} color={COLORS.jobIconColor} />{" "}{" "}{item.Holder1}{" "}{" "}{" "} 
                                                    <Entypo name="location-pin" size={22} color={COLORS.jobIconColor} />{" "}{" "}{item.Area}
                                                </Text>
                                                <View style={{height:7}}></View>
                                                <MaterialIcons name="money" style={{marginBottom:-35,marginLeft:10}} size={20} color={COLORS.jobIconColor} />
                                                <Text  style={styles.JobTextStyle}>
                                                    {" "}{" "}{" "}{" "}{" "}{" "}{item.Amount}{" "}{" "}{" "}{" "} 
                                                    <MaterialCommunityIcons name="clock" size={18} color={COLORS.jobIconColor} />{" "}{" "}{item.Hours}
                                                </Text>
                                                <View style={{alignItems:'flex-end'}} >
                                                    <TouchableOpacity onPress={()=>{this.showAgencyJobsApplyScreen(item.id,item.Name)}} style={styles.jobBookingBtn} >
                                                        <Text style={styles.jobBookingText} >Apply Now</Text> 
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{height:10}}></View>

                                            </View>
                                        </View>
                                        <View style={{height:9}}></View>
                                </View>
                            ))}
                        </>)}
                        
                        {DoNotShowAgencyJobsApplyScreen?(<></>):(<>
                            <View>
                                <View style={{alignItems:'center'}} >
                                    <FontAwesome name="pencil-square-o" size={50} color={COLORS.colourNumberOne} />
                                </View>
                                <TextInput style={styles.UpdatedInput} placeholder="Full Name" onChangeText={text => this.setJobApplyFullName(text)}
                                    placeholderTextColor = "#5800c4" selectionColor = {COLORS.colourNumberOne} />
                                <TextInput style={styles.UpdatedInput} placeholder="Mobile Number" onChangeText={text => this.setJobApplyNumber(text)}
                                    placeholderTextColor = "#5800c4" selectionColor = {COLORS.colourNumberOne}/>
                                <TextInput style={styles.UpdatedInput} placeholder="Email Address" onChangeText={text => this.setJobApplyEmail(text)}
                                    placeholderTextColor = "#5800c4" selectionColor = {COLORS.colourNumberOne}/>
                                {renderSubmitAndCancelBtnUI(this.postJobApplied,this.showAgencyJobsListingScreen)}
                            </View>
                        </>)}
                        
                    </>)}
                    {DoNotShowAgencyApplyScreen?(<></>):(<>
                        
                        <View style={{alignItems:'center'}} >
                            <MaterialCommunityIcons name="account-edit" size={80} color={COLORS.colourNumberOne} />
                            <View style={{height:15}} ></View>
                            <Text style = {styles.UpdatedTextLabel}> Apply For Tc Agency Now  </Text>
                        </View>
                        <TextInput style={styles.UpdatedInput} placeholder="Full Name" onChangeText={text => this.setAgencyApplyFullName(text)}  
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />
                        
                        <TextInput style={styles.UpdatedInput} placeholder="Mobile Number" onChangeText={text => this.setAgencyApplyNumber(text)}  
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                        <TextInput style={styles.UpdatedInput} placeholder="Email" onChangeText={text => this.setAgencyApplyEmail(text)}  
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                        <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postAgencyUserApplication} >
                            <Text style = {styles.UpdatedBtnText}> Submit  </Text>
                            <View style={styles.ArrowMainViewLogIn}>
                                <AntDesign name="arrowright" style={styles.ArrowIconLogIn} size={25} color="white" />
                            </View>
                        </TouchableOpacity>
                    </>)}



                    {DoNotShowAgencyAboutScreen?(<></>):(<>
                        {renderTopHeaderRadiusWithABtn(this.backToAgencyListingMenuScreen)}
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

                </ScrollView>
                    <View style={{height:10}}></View>
            </>)}


























            {/* 
                ==================================================================================
                ==================================================================================
                        HealthMainScreen
                ==================================================================================
                ==================================================================================
            */}
        
            {DoNotShowHealthMainScreen?(<></>) :(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {DoNotShowHealthHospitalsScreen ? (<></>):(<>
                        {HealthHospitalsData[0] && HealthHospitalsData[0].map((item,index)=>(
                            <View key={index} >
                                <View style={styles.JobCardView}  >
                                    <Text  style={styles.JobNameText}>{item.Name}</Text>
                                    <Text  style={styles.JobTextStyle}>{item.Holder1}</Text>
                                
                                    <Text  style={styles.IconTextStyle}>
                                        <FontAwesome5 name="heart-broken"  size={20} color={COLORS.jobIconColor} />{" "}{" "}{" "}{" "}
                                        <MaterialIcons name="local-hospital" size={25} color={COLORS.jobIconColor} />{" "}{" "}{" "}{" "}
                                        <MaterialCommunityIcons name="heart-off" size={20} color={COLORS.jobIconColor} />
                                    </Text>
                                    <View style={{alignItems:'flex-end'}} >
                                        <TouchableOpacity onPress={()=>{this.showHealthBookingScreen(item.Name)}} style={styles.jobBookingBtn2} >
                                            <Text style={styles.jobBookingText} >Book Now</Text> 
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{height:8}}></View>

                                </View>
                                <View style={{height:9}}></View>
                            </View>
                        ))}
                    </>)}
                        {DoNotShowHealthBookingScreen?(<></>):(<>
                            <View style={styles.orderListDetailsText} >

                                <TextInput style={[styles.UpdatedBookingInput]} editable={false} defaultValue={HospitalBookingName} 
                                placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne}  />

                                <TextInput style={[styles.UpdatedBookingInput]} placeholder="Name"  onChangeText={text => this.setHospitalUserBookingName(text)} 
                                placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne}  />

                                <TextInput style={[styles.UpdatedBookingInput]} placeholder="Mobile Number"  onChangeText={text => this.setHospitalBookingPhone(text)}
                                placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne} />

                                {renderSubmitAndCancelBtnUI(this.postUserHospitalBooking,this.showHealthHospitalsScreen)}
                            </View>
                        </>)}
                    
                </ScrollView>
                <View style={{height:10}}></View>
            </>)}




























            {/* 
                ==================================================================================
                ==================================================================================
                        DriveMainScreen
                ==================================================================================
                ==================================================================================
            */}
        
            {DoNotShowDriveMainScreen?(<></>) :(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems:'center'}} >
                        <Fontisto name="taxi" size={40}  color={COLORS.colourNumberOne} />
                        <View style={{height:20}} ></View>

                        <Text style={[styles.UpdatedTextLabel]} >
                            ....Ordering Tc Taxi Now...{"\n\n"}
                            Enter Your Details & Submit 
                        </Text>
                        
                        <View style={styles.orderListDetailsText} >
                        
                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="Name"  onChangeText={text => this.setOrderName(text)} 
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne}  />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="Mobile Number"  onChangeText={text => this.setOrderPhone(text)}
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne} />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="From :  Pickup Area"  onChangeText={text => this.setOrderFrom(text)}
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne} />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="To :: End Point" onChangeText={text => this.setOrderTo(text)}
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne} />
                            {renderSubmitAndCancelBtnUI(()=>this.postUserTransportOder('Taxi'),this.showMenuMainScreen)}
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:10}}></View>
            </>)
            }


















            {/* 
                ==================================================================================
                ==================================================================================
                        RideMainScreen
                ==================================================================================
                ==================================================================================
            */}
        
            {DoNotShowRideMainScreen?(<></>) :(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems:'center'}} >
                        <Fontisto name="motorcycle" size={80} color={COLORS.colourNumberOne} />
                        <View style={{height:20}} ></View>

                        <Text style={[styles.UpdatedTextLabel]} >
                            ....Ordering Tc Boda Now...{"\n\n"}
                            Enter Your Details & Submit 
                        </Text>
                            
                        <View style={styles.orderListDetailsText} >
                        
                            <TextInput style={styles.UpdatedBookingInput} placeholder="Name" onChangeText={text => this.setOrderName(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="Mobile Number"  onChangeText={text => this.setOrderPhone(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="From :  Pickup Area"  onChangeText={text => this.setOrderFrom(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="To :: End Point" onChangeText={text => this.setOrderTo(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />
                            {renderSubmitAndCancelBtnUI(()=>this.postUserTransportOder('Boda'),this.showMenuMainScreen)}
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:10}}></View>
            </>)
            }















            {/* 
                ==================================================================================
                ==================================================================================
                        OtherServicesMainScreen
                ==================================================================================
                ==================================================================================
            */}
        
            {DoNotShowOtherServicesMainScreen?(<></>) :(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {DoNotShowOtherServicesListingScreen?(<></>):(<>
                        {ProvidersListData[0] && ProvidersListData[0].map((item,index)=>(
                            <View key={index} >
                                <View style={styles.mainTableView}>
                                    <View style={styles.JobCardView}  >
                                        <View style={{height:8}}></View>

                                        <Text  style={styles.JobNameText}>{item.Name}</Text>
                                        <Text  style={styles.JobNameText}>{item.Area}</Text>
                                        <Text  style={styles.JobTextStyle}>{item.Holder1}</Text>
                                        <Text  style={styles.JobTextStyle}>{item.Holder2}</Text>
                                        <Text  style={styles.JobTextStyle}>{item.Holder3}</Text>
                                        <Text  style={styles.JobTextStyle}>{item.Holder4}</Text>
                                    
                                        <Text  style={styles.IconTextStyle}>
                                            <FontAwesome5 name="hand-point-up"  size={20} color={COLORS.jobIconColor} />{" "}{" "}{" "}{" "}
                                            <FontAwesome5 name="hand-point-up" size={25} color={COLORS.jobIconColor} />{" "}{" "}{" "}{" "}
                                            <FontAwesome5 name="hand-point-up" size={20} color={COLORS.jobIconColor} />
                                        </Text>
                                        <View style={{alignItems:'flex-end'}} >
                                            <TouchableOpacity onPress={()=>{this.showOtherServicesBookingScreen(item.Name,item.CardNo)}} style={styles.jobBookingBtn2} >
                                                <Text style={styles.jobBookingText} >Book Now</Text> 
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{height:8}}></View>

                                    </View>
                                </View>
                                <View style={{height:9}}></View>
                            </View>
                        ))}
                    </>)}
                    {DoNotShowOtherServicesBookingScreen?(<></>):(<>
                        <View style={styles.orderListDetailsText} >

                            <TextInput style={[styles.UpdatedBookingInput]} editable={false} defaultValue={OtherServiceBookingProvider} 
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne}  />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="Name"  onChangeText={text => this.setServicesBookingUserName(text)} 
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne}  />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="Mobile Number"  onChangeText={text => this.setServicesBookingContact(text)}
                            placeholderTextColor = "#5800c4" SelectionColor={COLORS.colourNumberOne} />
                            {renderSubmitAndCancelBtnUI(this.postUserServicesBooking,this.showOtherServicesListingScreen)}
                        </View>
                    </>)}
                </ScrollView>
                <View style={{height:10}}></View>
            </>)}








                {/* <View style={styles.MainBottomSpaceView}></View> */}
            </View>
        );
    }
}
