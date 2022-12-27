


import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity,ActivityIndicator, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from "./stylesheet";
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { FontAwesome,Entypo } from '@expo/vector-icons';
import { 
            APIUpdateClientPassword,APIUpdateClientCountry,APIListYears,
            APIUpdateClientEmail,APIUpdateClientUserName,
            APIUpdateClientPhone,APIUpdateClientFullName,
            APIListCountries, APIPostClientRegister,APIPostClientLogIns,

        } from './DataFileApis';

import { 
            EmptyInputsErrorMsg,LogOutMsg, UpdateFeedBackMsg,
            NetworkErrorMsg,NoUserErrorMsg,InvalidUserErrorMsg
        } from './Alerts';
import { COLORS } from './Colors';
import { 
        UpdateNames,BookingNumberOfPeople,DateMonthsNames,DateDays,Countries,
        BookingHotelTypes,BookNowSafaris,BookNowCountries,
        UiButtonMarginTop,UiBookNowButtonWidth,UiButtonPaddingTop,
        UiButtonHeight,UiButtonBorderRadius,UiButtonMarginRight 
    } from './Constants';

import { checkInternetConnectionToHost } from './AppDataFile';

import UserLogIn from "../imgs/Account/login.png";
import UserRegister from "../imgs/Account/register.png";
import SettingsIcon from "../imgs/Account/settings.png";

export default class Account extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                
                DateYearsNames:[],
                MainTopNavigationButtons: [
                    { btnId: '1', Action:'UserLogIn',btnName: 'Log In Now',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                    { btnId: '2', Action:'Register',btnName: 'SetUp Details',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                    { btnId: '3', Action:'WhyRegistering',btnName: 'Why Setting Up ?',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                    ],
                UserTopNavigationButtons: [
                    { btnId: '1', Action:'Profile',btnName: 'My Profile',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                    { btnId: '2', Action:'BookNow',btnName: 'Book Now',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                    { btnId: '3', Action:'MyStatus',btnName: 'My Status',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                    ],

                DoNotShowAccountLandingScreen:false,
                DoNotShowUserLogInScreen:true,
                DoNotShowRegisterScreen:true,
                DoNotShowWhyRegisteringScreen:true,
                DoNotShowUserProfileScreen:true,
                DoNotShowUserProfileSettingsScreen:true,
            
                // DoNotShowUserProfile Sub Screens
                DoNotShowUserProfileProfileScreen:false,
                DoNotShowUserProfileBookNowScreen:true,
                DoNotShowUserProfileStatusScreen:true,
                DoNotShowUserProfileBookNowSummaryScreen:true,

                // Registering
                CountrySelectedValue:'',
                PhoneCountryCode:'',
                CountrySelected:'',
                RegisterFullName:'',
                RegisterPhone:'',
                RegisterUserName:'',
                RegisterPassword:'',
                RegisterEmail:'',

                // Updating
                UpdateNamesSelectedValue:'',
                UpdateNamesSelected:'',
                NameToUpdate:'',

                // Log In
                LogInUserName:'',
                LogInPassword:'',

                // Logged In User 
                UserFullName:'',
                UserPhone:'',
                UserUserName:'',
                UserCountry:'',
                UserEmail:'',
                UserId:'',

                // Booking
                BookingNumberOfPeopleValue:'',
                BookingHotelTypesValue:'',BookNowSafari:'',
                StartingDateDay:'',EndingDateDay:'',
                StartingDateMonth:'',EndingDateMonth:'',
                StartingDateYear:'',EndingDateYear:'',
                StartingSelectedDate:'dd mm yy',EndingSelectedDate:'dd mm yy',
        }
        
    }

UNSAFE_componentWillMount ()
{
    // this.getDataFromServer (APIListCountries,'Countries');
    this.getDataFromServer (APIListYears,'DateYearsNames');
    // checkInternetConnectionToHost();
    this.initializeUserDetails();
    
}
componentDidMount() {

    this.setInitialActiveColor();
    setTimeout(this.verifyUserAccountInfo,3000)
    console.log("");console.log("");
    console.log("=====>Inside Book Now Screen");
}

getDataFromServer = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({[StateName]:[...JSON.parse(results)]})
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>"+StateName)})
}
setInitialActiveColor = () => 
{
    let MainTopNavigationButtons = JSON.parse(JSON.stringify(this.state.MainTopNavigationButtons));
    let UserTopNavigationButtons = JSON.parse(JSON.stringify(this.state.UserTopNavigationButtons));

    for (let x = 0; x < this.state.MainTopNavigationButtons.length; x++) 
    {
        if (this.state.MainTopNavigationButtons[x].btnId == 1) 
        {
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
        } 
    }

    for (let x = 0; x < this.state.UserTopNavigationButtons.length; x++) 
    {
        if (this.state.UserTopNavigationButtons[x].btnId == 1) 
        {
            UserTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            UserTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            this.setState({UserTopNavigationButtons: UserTopNavigationButtons,});
        } 
    }
};

initializeUserDetails = () => 
{
    try 
    {   
        AsyncStorage.getItem('UserDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let FullName = jsonData[0].FullName;
            let UserName = jsonData[0].UserName;
            let Country= jsonData[0].Country;
            let Phone= jsonData[0].Phone;
            let Email= jsonData[0].Email;
            let Id= jsonData[0].Id;

            this.setState({UserFullName:FullName});
            this.setState({UserUserName:UserName});
            this.setState({UserCountry:Country});
            this.setState({UserPhone:Phone});
            this.setState({UserEmail:Email});
            this.setState({UserId:Id});
        }
        else {}
        })
    }catch (error) { console.log(error)}
}
verifyUserAccountInfo = () =>
{
    let UserName = this.state.UserUserName;
    if (UserName.length === 0){this.showUserLogInScreen();}
    else {this.showUserProfileScreen();}
}
showUserLogInScreen = () =>
{
    this.setState({DoNotShowRegisterScreen:true});
    this.setState({DoNotShowAccountLandingScreen:true});
    this.setState({DoNotShowUserProfileScreen:true});
    this.setState({DoNotShowWhyRegisteringScreen:true});
    this.setState({DoNotShowUserProfileSettingsScreen:true});
    this.setState({DoNotShowUserLogInScreen:false});
}

showRegisterScreen = () =>
{
    this.setState({DoNotShowWhyRegisteringScreen:true});
    this.setState({DoNotShowAccountLandingScreen:true});
    this.setState({DoNotShowUserLogInScreen:true});
    this.setState({DoNotShowUserProfileScreen:true});
    this.setState({DoNotShowUserProfileSettingsScreen:true});
    this.setState({DoNotShowRegisterScreen:false});
}
showWhyRegisteringScreen = () =>
{
    this.setState({DoNotShowRegisterScreen:true});
    this.setState({DoNotShowAccountLandingScreen:true});
    this.setState({DoNotShowUserLogInScreen:true});
    this.setState({DoNotShowUserProfileScreen:true});
    this.setState({DoNotShowUserProfileSettingsScreen:true});
    this.setState({DoNotShowWhyRegisteringScreen:false});
}
showAccountLandingScreen = () =>
{
    this.setState({DoNotShowRegisterScreen:true});
    this.setState({DoNotShowUserLogInScreen:true});
    this.setState({DoNotShowWhyRegisteringScreen:true});
    this.setState({DoNotShowUserProfileSettingsScreen:true});
    this.setState({DoNotShowUserProfileScreen:true});
    this.setState({DoNotShowAccountLandingScreen:false});
}
showUserProfileScreen = () =>
{
    this.setState({DoNotShowRegisterScreen:true});
    this.setState({DoNotShowAccountLandingScreen:true});
    this.setState({DoNotShowUserLogInScreen:true});
    this.setState({DoNotShowWhyRegisteringScreen:true});
    this.setState({DoNotShowUserProfileSettingsScreen:true});
    this.setState({DoNotShowUserProfileScreen:false});
}

showUserProfileSettingsScreen = () =>
{
    this.setState({DoNotShowRegisterScreen:true});
    this.setState({DoNotShowUserLogInScreen:true});
    this.setState({DoNotShowWhyRegisteringScreen:true});
    this.setState({DoNotShowUserProfileScreen:true});
    this.setState({DoNotShowUserProfileSettingsScreen:false});
}
showUserProfileProfileScreen = () =>
{
    this.setState({DoNotShowUserProfileBookNowScreen:true});
    this.setState({DoNotShowUserProfileBookNowSummaryScreen:true});
    this.setState({DoNotShowUserProfileStatusScreen:true});
    this.setState({DoNotShowUserProfileProfileScreen:false});
}
showUserProfileStatusScreen = () =>
{
    this.setState({DoNotShowUserProfileBookNowSummaryScreen:true});
    this.setState({DoNotShowUserProfileBookNowScreen:true});
    this.setState({DoNotShowUserProfileProfileScreen:true});
    this.setState({DoNotShowUserProfileStatusScreen:false});
}

showUserProfileBookNowScreen = () =>
{
    this.setState({DoNotShowUserProfileBookNowSummaryScreen:true});
    this.setState({DoNotShowUserProfileProfileScreen:true});
    this.setState({DoNotShowUserProfileStatusScreen:true});
    this.setState({DoNotShowUserProfileBookNowScreen:false});
}
showUserProfileBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUserProfileProfileScreen:true});
    this.setState({DoNotShowUserProfileStatusScreen:true});
    this.setState({DoNotShowUserProfileBookNowScreen:true});
    this.setState({DoNotShowUserProfileBookNowSummaryScreen:false});
}

changeBackgroundColor = (item) => 
{
    let MainTopNavigationButtons = JSON.parse(JSON.stringify(this.state.MainTopNavigationButtons));

    for (let x = 0; x < this.state.MainTopNavigationButtons.length; x++) 
    {
        if (this.state.MainTopNavigationButtons[x].btnId == item.btnId) 
        {
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
            
            // Display Screens Basing on Actions
            let Action = MainTopNavigationButtons[x].Action
            if (Action==="UserLogIn"){this.showUserLogInScreen();}
            else if (Action==="Register"){this.showRegisterScreen();}
            else if (Action==="WhyRegistering"){this.showWhyRegisteringScreen ();}

        } 
        else 
        {
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.white;
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainCardColor;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
        }
    }
};


changeUserProfileBackgroundColor = (item) => 
{
    let UserTopNavigationButtons = JSON.parse(JSON.stringify(this.state.UserTopNavigationButtons));

    for (let x = 0; x < this.state.UserTopNavigationButtons.length; x++) 
    {
        if (this.state.UserTopNavigationButtons[x].btnId == item.btnId) 
        {
            UserTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            UserTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            this.setState({UserTopNavigationButtons: UserTopNavigationButtons,});
            
            // Display Screens Basing on Actions
            let Action = UserTopNavigationButtons[x].Action
            if (Action==="Profile"){this.showUserProfileProfileScreen();}
            else if (Action==="MyStatus"){this.showUserProfileStatusScreen();}
            else if (Action==="BookNow"){this.showUserProfileBookNowScreen();}
        } 
        else 
        {
            UserTopNavigationButtons[x].btnNameTextColor = COLORS.white;
            UserTopNavigationButtons[x].btnBgColor = COLORS.MainCardColor;
            this.setState({UserTopNavigationButtons: UserTopNavigationButtons,});
        }
    }
};

setBookNowHotelTypes = (text) =>{this.setState({BookingHotelTypesValue:text})}
setBookNowSafari = (text) =>{this.setState({BookNowSafari:text})}
setBookNowNumberOfPeople = (text) =>{this.setState({BookingNumberOfPeopleValue:text})}
setStartingDateDay = (text) =>  {this.setState({StartingDateDay:text}), setTimeout(this.setStartingSelectedDate,1000)}
setStartingDateMonth = (text) =>  {this.setState({StartingDateMonth:text}),setTimeout(this.setStartingSelectedDate,1000)}
setStartingDateYear = (text) =>  {this.setState({StartingDateYear:text}),setTimeout(this.setStartingSelectedDate,1000)}
setEndingDateDay = (text) =>  {this.setState({EndingDateDay:text}), setTimeout(this.setEndingSelectedDate,1000)}
setEndingDateMonth = (text) =>  {this.setState({EndingDateMonth:text}),setTimeout(this.setEndingSelectedDate,1000)}
setEndingDateYear = (text) =>  {this.setState({EndingDateYear:text}),setTimeout(this.setEndingSelectedDate,1000)}
setLogInUserName = (text) =>  {this.setState({LogInUserName:text})}
setLogInPassword = (text) =>  {this.setState({LogInPassword:text})}
setRegisterFullName = (text) =>  {this.setState({RegisterFullName:text})}
setRegisterUserName = (text) =>  {this.setState({RegisterUserName:text})}
setRegisterPassword = (text) =>  {this.setState({RegisterPassword:text})}
setRegisterEmail = (text) =>  {this.setState({RegisterEmail:text})}
setRegisterPhone = (text) =>  {this.setState({RegisterPhone:text})}
setNameToUpdate = (text) => {this.setState({NameToUpdate:text})}
setUpdateNamesSelectedValue  = (text) =>{this.setState({UpdateNamesSelected:text});}

setStartingSelectedDate = ()=>
{
    let day = this.state.StartingDateDay;
    let month = this.state.StartingDateMonth;
    let year = this.state.StartingDateYear;
    let date = day+" "+month+" "+year
    this.setState({StartingSelectedDate:date})
}
setEndingSelectedDate = ()=>
{
    let day = this.state.EndingDateDay;
    let month = this.state.EndingDateMonth;
    let year = this.state.EndingDateYear;
    let date = day +" "+month+" "+year
    this.setState({EndingSelectedDate:date})
}
setCountrySelectedValue  = (text) =>
{
    const CountriesArr = [...Countries]
    let Index = text.split(':');
    let country = Index[0]
    let arraryIndex = Index[1]
    let code = CountriesArr[arraryIndex]
    let phoneCode = code.CountryCode;
    // countryCode
    this.setState({PhoneCountryCode:phoneCode});
    this.setState({CountrySelected:country});
}

setBookNowCountrySelectedValue  = (text) =>
{
    const CountriesArr = [...BookNowCountries]
    let Index = text.split(':');
    let country = Index[0]
    let arraryIndex = Index[1]
    let code = CountriesArr[arraryIndex]
    // countryCode
    this.setState({CountrySelected:country});
}
resetRegisterInputs = () =>
{
    this.setState({RegisterFullName:''})
    this.setState({RegisterUserName:''});
    this.setState({RegisterPassword:''});
    this.setState({RegisterEmail:''});
    this.setState({RegisterPhone:''});
    this.setState({PhoneCountryCode:''});
    this.setState({CountrySelected:''});

}
postUserRegistrationData = async () =>
{

    let Country = this.state.CountrySelected;
    let FullName = this.state.RegisterFullName;
    let UserName = this.state.RegisterUserName;
    let Password = this.state.RegisterPassword;
    let Email = this.state.RegisterEmail;
    let Phone = this.state.RegisterPhone;
    let FullPhone = this.state.PhoneCountryCode+Phone;
    if ((FullName.length == 0) ||(UserName.length == 0) || (Password.length == 0)||(Phone.length == 0) ||(Email.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostClientRegister,
            {
                "FullName":FullName,
                "UserName":UserName,
                "Password":Password,
                "Email":Email,
                "Phone":FullPhone,
                "Country":Country,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Registration Status",FullName+"\n\n"+result);
        this.resetRegisterInputs();
        this.setState({UserFullName:FullName});
        this.setState({UserUserName:UserName});
        this.setState({UserPhone:FullPhone});
        this.setState({UserCountry:Country});
        this.setState({UserEmail:Email});
        this.showUserProfileScreen();
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }
}

logInUser = async () =>
{
    let LogInUserName = this.state.LogInUserName;
    let LogInPassword = this.state.LogInPassword;
    if ((LogInUserName.length == 0) || (LogInPassword.length == 0))
        {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIPostClientLogIns+LogInUserName)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Error ",NoUserErrorMsg)}
            else
            {
                let UserName = jsonResults[0].UserName;
                let userPassword  = jsonResults[0].Password;
                
                if ((UserName !== LogInUserName)&&(userPassword !== LogInPassword ))
                    {Alert.alert("Error",InvalidUserErrorMsg)}

                else
                {
                    let Name= jsonResults[0].FullName;
                    let UserName = jsonResults[0].UserName;
                    let Phone = jsonResults[0].Phone;
                    let Email = jsonResults[0].Email;
                    let Country = jsonResults[0].Country;
                    let Id = jsonResults[0].id;

                    try {
                        let MemberDetails={FullName:Name,Id:Id,UserName:UserName,Phone:Phone,Email:Email,Country:Country}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('UserDetails',JSON.stringify(Details));
                        // console.log(JSON.stringify(Details))
                        } 
                    catch (error) {console.log(error)}

                    this.setState({UserFullName:Name});
                    this.setState({UserUserName:UserName});
                    this.setState({UserPhone:Phone});
                    this.setState({UserCountry:Country});
                    this.setState({UserEmail:Email});
                    this.setState({UserId:Id});
                    this.showUserProfileScreen();
                }
            }

        }

        catch (error)
            {
                Alert.alert("Error",NetworkErrorMsg)
                console.log(error)
            };
    }
}
logOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('UserDetails');
        // this.setState({IsMemberLogeIn:false});
        Alert.alert("Information",LogOutMsg)

    }catch (error) { console.log(error)}
}

updateUserDetails = async () =>
{
    let UpdateNamesSelected = this.state.UpdateNamesSelected;
    let NewUpdate = this.state.NameToUpdate;
    let id = this.state.UserId;
    console.log(NewUpdate+"::"+id)
    if ((NewUpdate.length == 0))
        {Alert.alert('Error',EmptyInputsErrorMsg)}
    else
    {
        try
        {

            if (UpdateNamesSelected === 'Password')
            {
                const Request = await axios.put(APIUpdateClientPassword,{"id":id,"Password":NewUpdate})
                let result = Request.data.status;
                this.setState({NameToUpdate:''});
                Alert.alert("Password Updates",result+"\n\n"+ UpdateFeedBackMsg);
            }

            else if (UpdateNamesSelected === 'Country')
            {
                const Request = await axios.put(APIUpdateClientCountry,{"id":id,"Country":NewUpdate})
                let result = Request.data.status;
                this.setState({NameToUpdate:''});
                Alert.alert("Country Updates",result+"\n\n"+UpdateFeedBackMsg);
            }
            else if (UpdateNamesSelected === 'Email')
            {
                const Request = await axios.put(APIUpdateClientEmail,{"id":id,"Email":NewUpdate})
                let result = Request.data.status;
                this.setState({NameToUpdate:''});
                Alert.alert("Email Updates",result+"\n\n"+UpdateFeedBackMsg);
            }
            else if (UpdateNamesSelected === 'UserName')
            {
                const Request = await axios.put(APIUpdateClientUserName,{"id":id,"UserName":NewUpdate})
                let result = Request.data.status;
                this.setState({NameToUpdate:''});
                Alert.alert("UserName Updates",result+"\n\n"+UpdateFeedBackMsg);
            }
            else if (UpdateNamesSelected === 'FullName')
            {
                const Request = await axios.put(APIUpdateClientFullName,{"id":id,"FullName":NewUpdate})
                let result = Request.data.status;
                this.setState({NameToUpdate:''});
                Alert.alert("FullName Updates",result+"\n\n"+UpdateFeedBackMsg);
            }
            else if (UpdateNamesSelected === 'Phone')
            {
                const Request = await axios.put(APIUpdateClientPhone,{"id":id,"Phone":NewUpdate})
                let result = Request.data.status;
                this.setState({NameToUpdate:''});
                Alert.alert("Phone Updates",result+"\n\n"+UpdateFeedBackMsg);
            }
        }

        catch (error)
            {Alert.alert("Error",NetworkErrorMsg); console.log(error)};
    }
}

postUserBookNow = () =>
{

    let country = this.state.UserCountry;
    let name = this.state.UserFullName;
    let phone = this.state.UserPhone;
    let email = this.state.UserEmail;

    let bookingCountry = this.state.CountrySelected;
    let bookNowSafari = this.state.BookNowSafari;
    let numberOfPeople = this.state.BookingNumberOfPeopleValue;
    let bookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let startDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;


    console.log(country);
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(bookingCountry);
    console.log(bookNowSafari);
    console.log(numberOfPeople);
    console.log(bookingHotelTypesValue);
    console.log(startDate);
    console.log(endingDate);
}
renderTopNavigationButtons = (Buttons) =>
{
    return (
                <View style = {styles.MainLinksBtn} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {Buttons.map((item, index) => (
                            <View key={index} >
                                <TouchableOpacity
                                    style={{
                                        marginTop:UiButtonMarginTop,width:UiBookNowButtonWidth,paddingTop:UiButtonPaddingTop,
                                        height:UiButtonHeight, borderRadius:UiButtonBorderRadius,
                                        justifyContent: "center",marginRight:UiButtonMarginRight,
                                        backgroundColor:item.btnBgColor,
                                    }}
                                    onPress={() => this.changeBackgroundColor(item)}>
                                    <Text style={{color:item.btnNameTextColor,fontWeight:'bold', fontSize: 19,
                                                        marginTop:-20, justifyContent: "center",
                                                        textAlign: "center"}}>{item.btnName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
    )
}
renderUserProfileTopNavigationButtons = (Buttons) =>
{
    return (
                <View style = {styles.MainLinksBtn} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {Buttons.map((item, index) => (
                            <View key={index} >
                                <TouchableOpacity
                                    style={{
                                        marginTop:UiButtonMarginTop,width:UiBookNowButtonWidth,paddingTop:UiButtonPaddingTop,
                                        height:UiButtonHeight, borderRadius:UiButtonBorderRadius,
                                        justifyContent: "center",marginRight:UiButtonMarginRight,
                                        backgroundColor:item.btnBgColor,
                                    }}
                                    onPress={() => this.changeUserProfileBackgroundColor(item)}>
                                    <Text style={{color:item.btnNameTextColor,fontWeight:'bold', fontSize: 19,
                                                        marginTop:-20, justifyContent: "center",
                                                        textAlign: "center"}}>{item.btnName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
    )
}
render() {
        const {MainTopNavigationButtons,UserTopNavigationButtons}=this.state;
        const {
                DoNotShowUserLogInScreen,DoNotShowRegisterScreen,DoNotShowUserProfileProfileScreen,DoNotShowUserProfileStatusScreen,
                DoNotShowUserProfileScreen,DoNotShowWhyRegisteringScreen,DoNotShowUserProfileSettingsScreen,DoNotShowAccountLandingScreen,
                DoNotShowUserProfileBookNowScreen,DoNotShowUserProfileBookNowSummaryScreen,
                } = this.state;
        const {CountrySelectedValue,UpdateNamesSelectedValue,UpdateNamesSelected,PhoneCountryCode,CountrySelected}=this.state;
        const {UserFullName,UserPhone,UserUserName,UserCountry,UserEmail,UserId} = this.state;
        const {
                BookingNumberOfPeopleValue,BookingHotelTypesValue,
                StartingDateDay,EndingDateDay,DateYearsNames,
                StartingDateMonth,EndingDateMonth,BookNowSafari,
                StartingDateYear,EndingDateYear,
                StartingSelectedDate,EndingSelectedDate
                } = this.state;

return (
        
        <View style={styles.mainView}>
            {DoNotShowAccountLandingScreen?(<></>):(<>
                <View style={{height:30}} ></View>
                <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}} ></View>
                    
                    <View style={styles.MainDescriptionView} >
                        <View style={{height:10}} ></View>
                        <View style={{alignItems:'center'}} >
                            <Entypo name="info-with-circle" size={80} color={COLORS.MainColorOne} />
                        <Text style={styles.HeadingOneText} >Checking  User Account Details</Text>
                        <View style={styles.activityIndicatorContainer}>
                            <ActivityIndicator size="large" color={COLORS.MainColorOne}/>
                        </View>
                        </View>
                    <View style={{height:15}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                </View>
                </ScrollView>
                <View style={{height:10}} ></View>
            </>)}
            {DoNotShowUserLogInScreen ?(<></>):(<>
                {this.renderTopNavigationButtons(MainTopNavigationButtons)}
            <View style={{height:10}} ></View>
            <ScrollView  showsVerticalScrollIndicator={false}>
            <View style={styles.SafarisListingContainer}>
            <View style={{height:10}} ></View>
            
            <View style={styles.MainDescriptionView} >
                <View style={{height:20}} ></View>
                <View style={{alignItems:'center'}} >
                    <Image source={UserLogIn} style={styles.AccountIcons}/>
                    <View style={{height:10}} ></View>
                    <Text style = {styles.HeadingOneText} >Welcome Back</Text>
                    <Text style = {styles.HeadingOneText} >... Log In To Continue ...</Text>
                </View>

                <View style={{alignItems:'center'}}>
                    <View style={{height:20}} ></View>
                    <TextInput style={styles.TextInputs} onChangeText={text=>this.setLogInUserName(text)} selectionColor={COLORS.MainColorOne}
                    placeholder="User Name" placeholderTextColor ={COLORS.MainColorOne}
                    />
                    <View style={{height:20}} ></View>
                    <TextInput style={styles.TextInputs} onChangeText={text=>this.setLogInPassword(text)} selectionColor={COLORS.MainColorOne} 
                    placeholder="Password" secureTextEntry={true} placeholderTextColor ={COLORS.MainColorOne}
                    />                            

                    <View style={{height:20}} ></View>
                </View>
                <View>
                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.logInUser()} >
                        <View style={{alignItems:'center'}}>
                            <Text style = {styles.SubmitButtonsText} >Log In</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height:10}} ></View>
            </View>
            <View style={{height:10}} ></View>
            </View>
            </ScrollView>
                <View style={{height:10}} ></View>

            </>)}
            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowRegisterScreen?(<></>):(<>
                {this.renderTopNavigationButtons(MainTopNavigationButtons)}

                <View style={{height:10}} ></View>
                <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}} ></View>
                    <View style={styles.MainDescriptionView} >

                    <View style={{alignItems:'center'}} >
                        <View style={{height:15}} ></View>
                        <Image source={UserRegister} style={styles.AccountIcons}/>
                        <View style={{height:10}} ></View>
                        <Text style = {styles.HeadingOneText} >Welcome Back</Text>
                        <Text style = {styles.HeadingOneText} >... Set Up Your Details Now ...</Text>
                        <View style={{height:10}} ></View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[styles.countryPickerSelectionInputView]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={CountrySelectedValue }
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Select Your Country"/> 
                                    {Countries && Countries.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.CountryName} value={item.CountryName+':'+Index} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        editable = {false}  defaultValue={CountrySelected} placeholder="Country" placeholderTextColor ={COLORS.MainColorOne}/>


                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setRegisterFullName(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Both Names" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.PhoneCodeMainView} >
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code"
                            placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>

                            <View style={styles.PhoneLengthMainView}>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Number"  onChangeText={text=>this.setRegisterPhone(text)} keyboardType="numeric"  placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>
                        </View>

                        
                        <View style={{height:20}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                        placeholder="User Name" onChangeText={text=>this.setRegisterUserName(text)} placeholderTextColor ={COLORS.MainColorOne}
                        /> 

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                        placeholder="Email Address" onChangeText={text=>this.setRegisterEmail(text)} placeholderTextColor ={COLORS.MainColorOne}
                        /> 

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                        placeholder="Password" onChangeText={text=>this.setRegisterPassword(text)} placeholderTextColor ={COLORS.MainColorOne} secureTextEntry={true} 
                        />                            

                        <View style={{height:10}} ></View>
                        </View>
                        <View>
                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postUserRegistrationData()} >
                                <View style={{alignItems:'center'}}>
                                    <Text style = {styles.SubmitButtonsText} >Set Up Now</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>

                    </View>
                </ScrollView>
                <View style={{height:10}} ></View>

            </>)}
            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowWhyRegisteringScreen?(<></>):(<>
                {this.renderTopNavigationButtons(MainTopNavigationButtons)}
                <View style={{height:20}} ></View>
                <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}} ></View>
                    <View style={styles.MainDescriptionView} >
                    <View style={{alignItems:'center'}} >
                        <View style={{height:10}} ></View>
                            <Entypo name="open-book" size={110} color={COLORS.MainColorOne} />
                        </View>
                        <View style={{height:10}} ></View>
                        <Text style={styles.HeadingOneText}>Why Setting Up User Details</Text>
                        <Text style={styles.AboutListingText}>View All Your Bookings Status </Text>
                        <Text style={styles.AboutListingText}>Auto Complete Of Name And Phone Number when Bookings  </Text>
                    </View>
                    <View style={{height:10}} ></View>
                </View>
                </ScrollView>
            </>)}

            {DoNotShowUserProfileScreen?(<></>):(<>
                {this.renderUserProfileTopNavigationButtons(UserTopNavigationButtons)}
                {DoNotShowUserProfileProfileScreen?(<></>):(<>
                <View style={{height:20}} ></View>
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <View>
                    <View style={{height:10}} ></View>
                    <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainDescriptionView} >
                        <View style={{alignItems:'center'}} >
                            <View style={{height:10}} ></View>
                            <View>
                                <FontAwesome name="user-circle" size={80} color={COLORS.MainColorOne} />
                            </View>
                                <Text style={styles.HeadingOneText} >{UserFullName}</Text>
                                <Text style={styles.AboutListingText}>{UserUserName}</Text>
                                <Text style={styles.AboutListingText}>{UserCountry}</Text>
                                <Text style={styles.AboutListingText}>{UserPhone}</Text>
                                <Text style={styles.AboutListingText}>{UserEmail}</Text>
                            <View style={{height:15}} ></View>
                        </View>
                    </View>

                    

                    <View style={{height:20}} ></View>
                    <View style={styles.MainDescriptionView} >
                        <View style={{height:5}}></View>
                        <View style={{alignItems:'center'}}>
                            <Text style={styles.HeadingOneText}>Account Settings</Text>
                        
                        <View style={{height:5}}></View>
                        <View>
                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.logOutUser()} >
                                <Text style = {styles.LogOutButtonsText} >Log Out</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                        <View style={{height:5}}></View>
                        {UserId && UserId.length!=0?(<>
                            <View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUserProfileSettingsScreen()} >
                                    <Image source={SettingsIcon} style={styles.SettingsIcon}/>
                                    <Text style = {styles.SettingsButtonsText} >Modify Details Now</Text>
                                </TouchableOpacity>
                            </View>
                        </>):(<></>)}
                            <View style={{height:10}}></View>
                    </View>

                    <View style={{height:10}} ></View>
                    </View>
                    </View>
                </ScrollView>
                </>)}

                {DoNotShowUserProfileStatusScreen?(<></>):(<>
                    <View style={{height:20}} ></View>
                    <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainDescriptionView} >
                        <View style={{height:5}}></View>
                            <View style={[styles.TravelLeftFloatView, styles.TravelLeftFloatView1]}>
                                <Text style={styles.TravelLeftFloatText}>Bookings</Text>
                            </View>
                            <View style={{height:5}}></View>
                            <View style={[styles.TravelLeftFloatView, styles.TravelLeftFloatView1]}>
                                <Text style={styles.TravelLeftFloatText}>Other</Text>
                            </View>
                            <View style={{height:10}}></View>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                </>)}

                {DoNotShowUserProfileBookNowScreen?(<></>):(<>
                    <View style={{height:20}} ></View>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainDescriptionView} >
                            <View style={{height:10}}></View>
                                <View style={{alignItems:'center'}}>
                                    <Text style = {styles.HeadingOneText} >Instant Booking</Text>
                                    <View style={{height:10}}></View>
                                    <View style={[styles.countryPickerSelectionInputView]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={CountrySelected}
                                            onValueChange={(itemValue) =>this.setBookNowCountrySelectedValue(itemValue)}>
                                                <Picker.Item label="Country To Tour"/> 
                                                {BookNowCountries && BookNowCountries.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                                ))}
                                        </Picker>
                                    </View>

                                    <View style={{height:20}}></View>
                                    <View style={[styles.countryPickerSelectionInputView]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={BookNowSafari}
                                            onValueChange={(itemValue) =>this.setBookNowSafari(itemValue)}>
                                                <Picker.Item label="Select Your Safari"/> 
                                                {BookNowSafaris && BookNowSafaris.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                    
                                    <View style={{height:20}} ></View>
                                    <View style={[styles.countryPickerSelectionInputView]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={BookingNumberOfPeopleValue}
                                            onValueChange={(itemValue) =>this.setBookNowNumberOfPeople(itemValue)}>
                                                <Picker.Item label="Number Of People"/> 
                                                {BookingNumberOfPeople && BookingNumberOfPeople.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Number} value={item.Number} /> 
                                                ))}
                                        </Picker>
                                    </View>

                                    <View style={{height:20}} ></View>
                                    <View style={[styles.countryPickerSelectionInputView]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={BookingHotelTypesValue}
                                            onValueChange={(itemValue) =>this.setBookNowHotelTypes(itemValue)}>
                                                <Picker.Item label="Booking Hotel Types"/> 
                                                {BookingHotelTypes && BookingHotelTypes.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                                ))}
                                        </Picker>
                                    </View>

                                    <View style={{height:20}} ></View>
                                    <View style={styles.DateMainView}>
                                        <View style={styles.SelectDateView}>
                                            <Text style = {styles.SelectDateText} >Starting Date</Text>
                                        </View>
                                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                selectedValue={StartingDateDay}
                                                onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                                    <Picker.Item label="Day"/> 
                                                        {DateDays && DateDays.map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                        </View>

                                    <View style={{height:10}} ></View>
                                    <View style={styles.DateMainView}>
                                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                selectedValue={StartingDateMonth }
                                                onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                                    <Picker.Item label="Month"/> 
                                                    {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                                    <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                                    ))}
                                            </Picker>
                                        </View>
                                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                selectedValue={StartingDateYear }
                                                onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                                    <Picker.Item label="Year"/> 
                                                    {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                                    <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                                    ))}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{height:10}} ></View>
                                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                        editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                                    <View style={{height:10}} ></View>
                                    <View style={styles.DateMainView}>
                                        <View style={styles.SelectDateView}>
                                            <Text style = {styles.SelectDateText} >Ending Date</Text>
                                        </View>
                                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                selectedValue={EndingDateDay }
                                                onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                                    <Picker.Item label="Day"/> 
                                                    {DateDays && DateDays.map((item,Index ) => (
                                                    <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                                    ))}
                                            </Picker>
                                        </View>
                                    </View>

                                    <View style={{height:10}} ></View>
                                    <View style={styles.DateMainView}>
                                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                selectedValue={EndingDateMonth }
                                                onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                                    <Picker.Item label="Month"/> 
                                                    {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                                    <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                                    ))}
                                            </Picker>
                                        </View>
                                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                selectedValue={EndingDateYear }
                                                onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                                    <Picker.Item label="Year"/> 
                                                    {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                                    <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                                    ))}
                                            </Picker>
                                        </View>
                                    </View>
                                    <View style={{height:10}} ></View>
                                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                        editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                                    <View style={{height:20}} ></View>
                                    </View>
                                
                                <View style={{height:10}}></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUserProfileBookNowSummaryScreen()} >
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Next</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{height:10}}></View>
                                </View>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                    </ScrollView>
                </>)}

                {DoNotShowUserProfileBookNowSummaryScreen?(<></>):(<>
                    <View style={{height:20}} ></View>
                        <ScrollView showsHorizontalScrollIndicator={false}>
                            <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.HeadingOneText} > Booking Summary </Text>
                                            <View style={{height:10}}></View>

                                            <Text style = {styles.HeadingOneText} >Customer Details</Text>
                                            <Text style={styles.AboutListingText}>Name : {UserFullName}</Text>
                                            <Text style={styles.AboutListingText}>Country : {UserCountry}</Text>
                                            <Text style={styles.AboutListingText}>Contact : {UserPhone}</Text>
                                            <Text style={styles.AboutListingText}>Email : {UserEmail}</Text>

                                            <View style={{height:30}}></View>
                                            <Text style = {styles.HeadingOneText} >Booking Details</Text>
                                            <Text style={styles.AboutListingText}>Country : {CountrySelected}</Text>
                                            <Text style={styles.AboutListingText}>Safari : {BookNowSafari}</Text>
                                            <Text style={styles.AboutListingText}>No Of People : {BookingNumberOfPeopleValue}</Text>
                                            <Text style={styles.AboutListingText}>Hotel Type : {BookingHotelTypesValue}</Text>
                                            <Text style={styles.AboutListingText}>Starting Date : {StartingSelectedDate}</Text>
                                            <Text style={styles.AboutListingText}>End Date : {EndingSelectedDate}</Text>
                                            <View style={{height:10}}></View>
                                        </View>
                                        <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postUserBookNow()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:20}}></View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUserProfileBookNowScreen()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:10}}></View>
                                    </View>
                                </View>
                                <View style={{height:10}}></View>
                            </View>
                        </ScrollView>
                        <View style={{height:10}}></View>

                </>)}
            </>)}

            {/* 
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                */}
            {DoNotShowUserProfileSettingsScreen?(<></>):(<>
                <View style = {styles.MainLinksBtn} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {UserTopNavigationButtons.map((item, index) => (
                            <View key={index} >
                                <TouchableOpacity
                                    style={{
                                        marginTop:UiButtonMarginTop,width:UiBookNowButtonWidth,paddingTop:UiButtonPaddingTop,
                                        height:UiButtonHeight, borderRadius:UiButtonBorderRadius,
                                        justifyContent: "center",marginRight:UiButtonMarginRight,
                                        backgroundColor:item.btnBgColor,
                                    }}
                                    onPress={() => this.changeUserProfileBackgroundColor(item)}>
                                    <Text style={{color:item.btnNameTextColor,fontWeight:'bold', fontSize: 19,
                                                        marginTop:-20, justifyContent: "center",
                                                        textAlign: "center"}}>{item.btnName}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{height:20}} ></View>
                <ScrollView  showsVerticalScrollIndicator={false}>
                <View style={styles.SafarisListingContainer}>
                <View style={{height:10}} ></View>
                    <View style={styles.MainDescriptionView} >
                    <View style={{alignItems:'center'}} >
                        <View style={{height:15}} ></View>
                        <Image source={UserRegister} style={styles.AccountIcons}/>
                        <Text style = {styles.AboutListingText} >Modify Your Account Now</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <View style={[styles.countryPickerSelectionInputView]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={UpdateNamesSelectedValue }
                                onValueChange={(itemValue) =>this.setUpdateNamesSelectedValue(itemValue)}>
                                    <Picker.Item label="Update My"/> 
                                    {UpdateNames && UpdateNames.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name}/> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        {UpdateNamesSelected && UpdateNamesSelected ==='UserName'?(<>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="User Name" onChangeText={text=>this.setNameToUpdate(text)} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.AccountSettingsButtons]} onPress={()=>this.updateUserDetails()}  >
                                        <Text style = {styles.UpdateButtonsText} >Update Now</Text>
                                </TouchableOpacity>
                            </View>
                        </>):(<></>)} 

                        {UpdateNamesSelected && UpdateNamesSelected ==='Email'?(<>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Email Address" onChangeText={text=>this.setNameToUpdate(text)} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.AccountSettingsButtons]} onPress={()=>this.updateUserDetails()}  >
                                        <Text style = {styles.UpdateButtonsText} >Update Now</Text>
                                </TouchableOpacity>
                            </View> 
                        </>):(<></>)}

                        {UpdateNamesSelected && UpdateNamesSelected ==='Phone'?(<>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Phone" onChangeText={text=>this.setNameToUpdate(text)} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.AccountSettingsButtons]} onPress={()=>this.updateUserDetails()}  >
                                        <Text style = {styles.UpdateButtonsText} >Update Now</Text>
                                </TouchableOpacity>
                            </View> 
                        </>):(<></>)}

                        {UpdateNamesSelected && UpdateNamesSelected ==='FullName'?(<>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Full Name" onChangeText={text=>this.setNameToUpdate(text)} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.AccountSettingsButtons]} onPress={()=>this.updateUserDetails()}  >
                                        <Text style = {styles.UpdateButtonsText} >Update Now</Text>
                                </TouchableOpacity>
                            </View> 
                        </>):(<></>)}

                        {UpdateNamesSelected && UpdateNamesSelected ==='Country'?(<>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Country" onChangeText={text=>this.setNameToUpdate(text)} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.AccountSettingsButtons]} onPress={()=>this.updateUserDetails()}  >
                                        <Text style = {styles.UpdateButtonsText} >Update Now</Text>
                                </TouchableOpacity>
                            </View> 
                        </>):(<></>)}

                        {UpdateNamesSelected && UpdateNamesSelected ==='Password'?(<>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Password" onChangeText={text=>this.setNameToUpdate(text)} placeholderTextColor ={COLORS.MainColorOne} secureTextEntry={true}/>    
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.AccountSettingsButtons]} onPress={()=>this.updateUserDetails()} >
                                        <Text style = {styles.UpdateButtonsText} >Update Now</Text>
                                </TouchableOpacity>
                            </View>         
                        </>):(<></>)}               

                        <View style={{height:25}} ></View>
                        </View>
                        
                        <View>
                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUserProfileScreen()} >
                                <View style={{alignItems:'center'}}>
                                    <Text style = {styles.SubmitButtonsText} >Cancel Updates</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                    </View>
                </ScrollView>
                </>)}
                {/* 
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

                */}

            
            {/* <View style={{height:30}} ></View> */}
        </View>
        
    );
}
}
