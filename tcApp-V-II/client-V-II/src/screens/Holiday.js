
import React from 'react';
import { Text, View, Alert,Pressable,Platform,TextInput,TouchableOpacity,ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import {Ionicons,Fontisto,FontAwesome5, AntDesign,FontAwesome} from '@expo/vector-icons';

import axios from "axios";
import {ImageUrl,APIPostHomesOrders,APIPostHomesFeedBacks} from './DataFileApis';
import { COLORS } from './Colours';
import {Picker} from '@react-native-picker/picker';
import { 
    convertToLowerCase,convertToUpperCase,EMPTY_INPUTS_ERROR,
    POSTING_ERROR, 
    renderTopHeaderRadiusWithOutABtn,
    renderTopHeaderRadiusWithABtn
    } from './Functions';

import { HolidayHomes,HolidayHomesData} from './AppDataFile';
import YoutubePlayer from 'react-native-youtube-iframe';

export default class Holiday extends React.Component {
constructor(props){
    super(props);
    this.state = {
                    
                    Qn1checked1:false, Qn1checked2:false, Qn1checked3:false, Qn1checked4:false, Qn1checked5:false,
                    Qn2checked1:false, Qn2checked2:false, Qn2checked3:false, Qn2checked4:false, Qn2checked5:false,
                    Qn3checked1:false, Qn3checked2:false, Qn3checked3:false, Qn3checked4:false, Qn3checked5:false,
                    Qn4checked1:false, Qn4checked2:false, Qn4checked3:false, Qn4checked4:false, Qn4checked5:false,
                    Qn5checked1:false, Qn5checked2:false, Qn5checked3:false, Qn5checked4:false, Qn5checked5:false,
                    Qn6checked1:false, Qn6checked2:false, Qn6checked3:false, Qn6checked4:false, Qn6checked5:false,
                    Qn7checked1:false, Qn7checked2:false, Qn7checked3:false, Qn7checked4:false, Qn7checked5:false,
                    Qn8checked1:false, Qn8checked2:false, Qn8checked3:false, Qn8checked4:false, Qn8checked5:false,
                    Qn9checked1:false, Qn9checked2:false, Qn9checked3:false, Qn9checked4:false, Qn9checked5:false,
                    Qn10checked1:false, Qn10checked2:false, Qn10checked3:false, Qn10checked4:false, Qn10checked5:false,
                    Qn11checked1:false, Qn11checked2:false, Qn11checked3:false, Qn11checked4:false, Qn11checked5:false,
                    Qn12checked1:false, Qn12checked2:false, Qn12checked3:false, Qn12checked4:false, Qn12checked5:false,
                    Qn13checked1:false, Qn13checked2:false, Qn13checked3:false, Qn13checked4:false, Qn13checked5:false,


                    
                    // Major Screens
                    DoNotShowMenuMainScreen:false,
                    DoNotShowHomesScreen:true,
                    DonNotShowBookingScreen:true,
                    DoNotShowHolidayHomesBookingScreen:true,
                    DonNotShowVisitorsFeedBackScreen:true,


                    // Inner Screens
                    DoNotShowHouseListScreen:true,
                    DoNotShowHouseVideoScreen:true,

                    // customer
                    BookingUserName:'',
                    
                    BookingUserNumberOfGuests:'',
                    BookingUserCheckIn:'',
                    BookingUserCheckOut:'',
                    BookingUserEmail:'',
                    BookingUserPhone:'',
                    

                    // Homes Feed Back
                    Qn1Answer:'',Qn2Answer:'',Qn3Answer:'',Qn4Answer:'',Qn5Answer:'', 
                    Qn6Answer:'',Qn7Answer:'',Qn8Answer:'',Qn9Answer:'',Qn10Answer:'', 
                    Qn11Answer:'',Qn12Answer:'',Qn13Answer:'', 
                    FeedBackUserName:'',FeedBackUserPhone:'',HouseSelectedValue:'',
                    UserBookedCountry:'',UserBookedArea:'',
    }
    
}

componentDidMount() {}

setFeedBackUserName = (text) =>{this.setState({FeedBackUserName :text});}
setFeedBackUserPhone = (text) =>{this.setState({FeedBackUserPhone:text});}
setBookingUserPhone = (text) =>{this.setState({BookingUserPhone:text});}
setBookingUserName = (text) =>{this.setState({BookingUserName:text});}
setBookingUserCheckIn = (text) =>{this.setState({BookingUserCheckIn:text});}
setBookingUserCheckOut = (text) =>{this.setState({BookingUserCheckOut:text});}
setBookingUserNumberOfGuest= (text) =>{this.setState({BookingUserNumberOfGuests:text});}
setBookingUserEmail = (text) =>{this.setState({BookingUserEmail:text});}
setHouseSelectedValue = (text) =>{this.setState({HouseSelectedValue:text});} 
showLearnMore = (Details1,Details2,Details3,Details4,Details5) =>
    {Alert.alert("More Details","\n\n"+Details1+"\n\n"+Details2+"\n\n"+Details3+"\n\n"+Details4+"\n\n"+Details5+"\n\n")}

showMode = () =>{this.setState({showDatePicker:true});}


showHomesScreen = () =>
{
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DonNotShowVisitorsFeedBackScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowHomesScreen:false})
}

showHomesBookingScreen = () =>
{
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DonNotShowVisitorsFeedBackScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:false})
}
showBookingScreen = (Country,Area) =>
{
    this.setState({UserBookedCountry:Country})
    this.setState({UserBookedArea:Area})
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DonNotShowVisitorsFeedBackScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:false})
}

showVisitorsFeedBackScreen = () =>
{
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:true})
    this.setState({DonNotShowVisitorsFeedBackScreen:false})
}
showMainOptionsScreen = () =>
{
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:true})
    this.setState({DonNotShowVisitorsFeedBackScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowMenuMainScreen:false})

}


postHolidayHomesBooingApplication = async () => 
{
    let name = this.state.BookingUserName;
    let phone = this.state.BookingUserPhone;
    let guests = this.state.BookingUserNumberOfGuests;
    let email = this.state.BookingUserEmail;
    let checkIn = this.state.BookingUserCheckIn;
    let checkOut = this.state.BookingUserCheckOut;
    let country = this.state.UserBookedCountry;
    let area = this.state.UserBookedArea;


    if ((name.length == 0) || (phone.length == 0)  || (guests.length == 0)  || (email.length == 0)|| (checkIn.length == 0)|| (checkOut.length == 0))
    {Alert.alert("Warning","\n\n Name, Phone, Email,CheckIn,checkOut \n \n Can Not Be Empty")}

    else
    {

        try
        {
            // post data
            const postRequest = await axios.post(APIPostHomesOrders,
                {
                    "Name":name,
                    "Number":phone,
                    "Guests":guests,
                    "Email":email,
                    "CheckIn":checkIn,
                    "CheckOut":checkOut,
                    "Country": country,
                    "Area":area,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Booking Status","\n"+name+"\n\n"+result);
            this.showHomesScreen();
        }

        catch (error)
            {Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)};
    }
}

tickSelectedOptionQn1 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn1checked1:true})}
    else if (Option === "Option2"){this.setState({Qn1checked2:true})}
    else if (Option === "Option3"){this.setState({Qn1checked3:true})}
    else if (Option === "Option4"){this.setState({Qn1checked4:true})}
    else if (Option === "Option5"){this.setState({Qn1checked5:true})}
    else if (Option === "Clear"){this.setState({Qn1checkedClear:true})}
    this.setState({Qn1Answer:text});
}
resetOptionsQn1 = () =>
{
    this.setState({Qn1checked1:false})
    this.setState({Qn1checked2:false})
    this.setState({Qn1checked3:false})
    this.setState({Qn1checked4:false})
    this.setState({Qn1checked5:false})
    this.setState({Qn1Answer:''});
}

tickSelectedOptionQn2 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn2checked1:true})}
    else if (Option === "Option2"){this.setState({Qn2checked2:true})}
    else if (Option === "Option3"){this.setState({Qn2checked3:true})}
    else if (Option === "Option4"){this.setState({Qn2checked4:true})}
    else if (Option === "Option5"){this.setState({Qn2checked5:true})}
    else if (Option === "Clear"){this.setState({Qn2checkedClear:true})}
    this.setState({Qn2Answer:text});
}
resetOptionsQn2 = () =>
{
    this.setState({Qn2checked1:false})
    this.setState({Qn2checked2:false})
    this.setState({Qn2checked3:false})
    this.setState({Qn2checked4:false})
    this.setState({Qn2checked5:false})
    this.setState({Qn2Answer:''});
}

tickSelectedOptionQn3 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn3checked1:true})}
    else if (Option === "Option2"){this.setState({Qn3checked2:true})}
    else if (Option === "Option3"){this.setState({Qn3checked3:true})}
    else if (Option === "Option4"){this.setState({Qn3checked4:true})}
    else if (Option === "Option5"){this.setState({Qn3checked5:true})}
    else if (Option === "Clear"){this.setState({Qn3checkedClear:true})}
    this.setState({Qn3Answer:text});
}
resetOptionsQn3 = () =>
{
    this.setState({Qn3checked1:false})
    this.setState({Qn3checked2:false})
    this.setState({Qn3checked3:false})
    this.setState({Qn3checked4:false})
    this.setState({Qn3checked5:false})
    this.setState({Qn3Answer:''});
}

tickSelectedOptionQn4 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn4checked1:true})}
    else if (Option === "Option2"){this.setState({Qn4checked2:true})}
    else if (Option === "Option3"){this.setState({Qn4checked3:true})}
    else if (Option === "Option4"){this.setState({Qn4checked4:true})}
    else if (Option === "Option5"){this.setState({Qn4checked5:true})}
    else if (Option === "Clear"){this.setState({Qn4checkedClear:true})}
    this.setState({Qn4Answer:text});
}
resetOptionsQn4 = () =>
{
    this.setState({Qn4checked1:false})
    this.setState({Qn4checked2:false})
    this.setState({Qn4checked3:false})
    this.setState({Qn4checked4:false})
    this.setState({Qn4checked5:false})
    this.setState({Qn4Answer:''});
}

tickSelectedOptionQn5 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn5checked1:true})}
    else if (Option === "Option2"){this.setState({Qn5checked2:true})}
    else if (Option === "Option3"){this.setState({Qn5checked3:true})}
    else if (Option === "Option4"){this.setState({Qn5checked4:true})}
    else if (Option === "Option5"){this.setState({Qn5checked5:true})}
    else if (Option === "Clear"){this.setState({Qn5checkedClear:true})}
    this.setState({Qn5Answer:text});
}
resetOptionsQn5 = () =>
{
    this.setState({Qn5checked1:false})
    this.setState({Qn5checked2:false})
    this.setState({Qn5checked3:false})
    this.setState({Qn5checked4:false})
    this.setState({Qn5checked5:false})
    this.setState({Qn5Answer:''});
}

tickSelectedOptionQn6 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn6checked1:true})}
    else if (Option === "Option2"){this.setState({Qn6checked2:true})}
    else if (Option === "Option3"){this.setState({Qn6checked3:true})}
    else if (Option === "Option4"){this.setState({Qn6checked4:true})}
    else if (Option === "Option5"){this.setState({Qn6checked5:true})}
    else if (Option === "Clear"){this.setState({Qn6checkedClear:true})}
    this.setState({Qn6Answer:text});
}
resetOptionsQn6 = () =>
{
    this.setState({Qn6checked1:false})
    this.setState({Qn6checked2:false})
    this.setState({Qn6checked3:false})
    this.setState({Qn6checked4:false})
    this.setState({Qn6checked5:false})
    this.setState({Qn6Answer:''});
}

tickSelectedOptionQn7 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn7checked1:true})}
    else if (Option === "Option2"){this.setState({Qn7checked2:true})}
    else if (Option === "Option3"){this.setState({Qn7checked3:true})}
    else if (Option === "Option4"){this.setState({Qn7checked4:true})}
    else if (Option === "Option5"){this.setState({Qn7checked5:true})}
    else if (Option === "Clear"){this.setState({Qn7checkedClear:true})}
    this.setState({Qn7Answer:text});
}
resetOptionsQn7 = () =>
{
    this.setState({Qn7checked1:false})
    this.setState({Qn7checked2:false})
    this.setState({Qn7checked3:false})
    this.setState({Qn7checked4:false})
    this.setState({Qn7checked5:false})
    this.setState({Qn7Answer:''});
}

tickSelectedOptionQn8 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn8checked1:true})}
    else if (Option === "Option2"){this.setState({Qn8checked2:true})}
    else if (Option === "Option3"){this.setState({Qn8checked3:true})}
    else if (Option === "Option4"){this.setState({Qn8checked4:true})}
    else if (Option === "Option5"){this.setState({Qn8checked5:true})}
    else if (Option === "Clear"){this.setState({Qn8checkedClear:true})}
    this.setState({Qn8Answer:text});
}
resetOptionsQn8 = () =>
{
    this.setState({Qn8checked1:false})
    this.setState({Qn8checked2:false})
    this.setState({Qn8checked3:false})
    this.setState({Qn8checked4:false})
    this.setState({Qn8checked5:false})
    this.setState({Qn8Answer:''});
}

tickSelectedOptionQn9 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn9checked1:true})}
    else if (Option === "Option2"){this.setState({Qn9checked2:true})}
    else if (Option === "Option3"){this.setState({Qn9checked3:true})}
    else if (Option === "Option4"){this.setState({Qn9checked4:true})}
    else if (Option === "Option5"){this.setState({Qn9checked5:true})}
    else if (Option === "Clear"){this.setState({Qn9checkedClear:true})}
    this.setState({Qn9Answer:text});
}
resetOptionsQn9 = () =>
{
    this.setState({Qn9checked1:false})
    this.setState({Qn9checked2:false})
    this.setState({Qn9checked3:false})
    this.setState({Qn9checked4:false})
    this.setState({Qn9checked5:false})
    this.setState({Qn9Answer:''});
}

tickSelectedOptionQn10 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn10checked1:true})}
    else if (Option === "Option2"){this.setState({Qn10checked2:true})}
    else if (Option === "Option3"){this.setState({Qn10checked3:true})}
    else if (Option === "Option4"){this.setState({Qn10checked4:true})}
    else if (Option === "Option5"){this.setState({Qn10checked5:true})}
    else if (Option === "Clear"){this.setState({Qn10checkedClear:true})}
    this.setState({Qn10Answer:text});
}
resetOptionsQn10 = () =>
{
    this.setState({Qn10checked1:false})
    this.setState({Qn10checked2:false})
    this.setState({Qn10checked3:false})
    this.setState({Qn10checked4:false})
    this.setState({Qn10checked5:false})
    this.setState({Qn10Answer:''});
}

tickSelectedOptionQn11 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn11checked1:true})}
    else if (Option === "Option2"){this.setState({Qn11checked2:true})}
    else if (Option === "Option3"){this.setState({Qn11checked3:true})}
    else if (Option === "Option4"){this.setState({Qn11checked4:true})}
    else if (Option === "Option5"){this.setState({Qn11checked5:true})}
    else if (Option === "Clear"){this.setState({Qn11checkedClear:true})}
    this.setState({Qn11Answer:text});
}
resetOptionsQn11 = () =>
{
    this.setState({Qn11checked1:false})
    this.setState({Qn11checked2:false})
    this.setState({Qn11checked3:false})
    this.setState({Qn11checked4:false})
    this.setState({Qn11checked5:false})
    this.setState({Qn11Answer:''});
}

tickSelectedOptionQn12 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn12checked1:true})}
    else if (Option === "Option2"){this.setState({Qn12checked2:true})}
    else if (Option === "Option3"){this.setState({Qn12checked3:true})}
    else if (Option === "Option4"){this.setState({Qn12checked4:true})}
    else if (Option === "Option5"){this.setState({Qn12checked5:true})}
    else if (Option === "Clear"){this.setState({Qn12checkedClear:true})}
    this.setState({Qn12Answer:text});
}
resetOptionsQn12 = () =>
{
    this.setState({Qn12checked1:false})
    this.setState({Qn12checked2:false})
    this.setState({Qn12checked3:false})
    this.setState({Qn12checked4:false})
    this.setState({Qn12checked5:false})
    this.setState({Qn12Answer:''});
}

tickSelectedOptionQn13 = (Option,text) =>
{
    if (Option === "Option1"){this.setState({Qn13checked1:true})}
    else if (Option === "Option2"){this.setState({Qn13checked2:true})}
    else if (Option === "Option3"){this.setState({Qn13checked3:true})}
    else if (Option === "Option4"){this.setState({Qn13checked4:true})}
    else if (Option === "Option5"){this.setState({Qn13checked5:true})}
    else if (Option === "Clear"){this.setState({Qn13checkedClear:true})}
    this.setState({Qn13Answer:text});
}
resetOptionsQn13 = () =>
{
    this.setState({Qn13checked1:false})
    this.setState({Qn13checked2:false})
    this.setState({Qn13checked3:false})
    this.setState({Qn13checked4:false})
    this.setState({Qn13checked5:false})
    this.setState({Qn13Answer:''});
}
postHolidayHomesFeedBack = async () => 
{
    let qn1 = this.state.Qn1Answer;
    let qn2 = this.state.Qn2Answer;
    let qn3 = this.state.Qn3Answer;
    let qn4 = this.state.Qn4Answer;
    let qn5 = this.state.Qn5Answer;
    let qn6 = this.state.Qn6Answer;
    let qn7 = this.state.Qn7Answer;
    let qn8 = this.state.Qn8Answer;
    let qn9 = this.state.Qn9Answer;
    let qn10 = this.state.Qn10Answer;
    let qn11 = this.state.Qn11Answer;
    let qn12 = this.state.Qn12Answer;
    let qn13 = this.state.Qn13Answer;
    let name = this.state.FeedBackUserName;
    let phone = this.state.FeedBackUserPhone;
    let house = this.state.HouseSelectedValue;


    if ((phone.length === 0)  ||  (name.length === 0)  || (house.length === 0)  ||  (qn1.length === 0) || (qn2.length === 0) || (qn3.length === 0) ||  
        (qn4.length === 0)|| (qn5.length === 0) || (qn6.length === 0) || (qn7.length === 0) || (qn8.length === 0) || (qn9.length === 0)|| (qn10.length === 0)
        || (qn11.length === 0) || (qn12.length === 0) || (qn13.length === 0)
        )
    {Alert.alert("Warning","Name, Phone, House Name Can Not Be Empty \n\n OR \n\n All 13 Questions Must Be Answered")}

    else
    {
        try
        {
            const postRequest = await axios.post(APIPostHomesFeedBacks,
                {
                    "Qn1":qn1,"Qn2":qn2,"Qn3":qn3,"Qn4":qn4,"Qn5":qn5,"Qn6":qn6,"Qn7":qn7,
                    "Qn8":qn8,"Qn9":qn9,"Qn10":qn10,"Qn11":qn11,"Qn12":qn12,"Qn13":qn13,
                    "Name":name,"Phone":phone,"House":house,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Hello: "+" "+ name+"\n"+result);
        }

        catch (error)
            {console.log(error); Alert.alert("An Error",POSTING_ERROR)};
    }
}
render() {
    
    const { HouseSelectedValue,UserBookedCountry,UserBookedArea} = this.state;

    const {DoNotShowMenuMainScreen,DoNotShowHomesScreen,
            DonNotShowVisitorsFeedBackScreen,DoNotShowHolidayHomesBookingScreen
            } = this.state;
    const {
                Qn1checked1, Qn1checked2, Qn1checked3, Qn1checked4, Qn1checked5,
                Qn2checked1, Qn2checked2, Qn2checked3, Qn2checked4, Qn2checked5,
                Qn3checked1, Qn3checked2, Qn3checked3, Qn3checked4, Qn3checked5,
                Qn4checked1, Qn4checked2, Qn4checked3, Qn4checked4, Qn4checked5,
                Qn5checked1, Qn5checked2, Qn5checked3, Qn5checked4, Qn5checked5,
                Qn6checked1, Qn6checked2, Qn6checked3, Qn6checked4, Qn6checked5,
                Qn7checked1, Qn7checked2, Qn7checked3, Qn7checked4, Qn7checked5,
                Qn8checked1, Qn8checked2, Qn8checked3, Qn8checked4, Qn8checked5,
                Qn9checked1, Qn9checked2, Qn9checked3, Qn9checked4, Qn9checked5,
                Qn10checked1, Qn10checked2, Qn10checked3, Qn10checked4, Qn10checked5,
                Qn11checked1, Qn11checked2, Qn11checked3, Qn11checked4, Qn11checked5,
                Qn12checked1, Qn12checked2, Qn12checked3, Qn12checked4, Qn12checked5,
                Qn13checked1, Qn13checked2, Qn13checked3, Qn13checked4, Qn13checked5,

            } = this.state;

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
                    <Text style={styles.MainTopHeaderTextLabel}>Tc Holiday Homes {"\n"} Feel At Home </Text>
                </View>
            </View>
        
            {DoNotShowMenuMainScreen?(<></>) :(<>
                {renderTopHeaderRadiusWithOutABtn()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:15}} ></View>
                    <View style={styles.MenuCardRowView} >
                        <View style={styles.MenuCardView} >
                            <TouchableOpacity onPress={this.showHomesScreen} >
                                <View style={{height:20}} ></View>
                                <View style={{alignItems:'center'}} >
                                    <FontAwesome5 name="house-user" size={50} color={COLORS.colourNumberOne} />
                                    <View style={{height:20}} ></View>
                                    <Text style = {styles.MenuCardText}> Homes</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.MenuCardView} >
                            <TouchableOpacity onPress={this.showVisitorsFeedBackScreen}>
                                <View style={{height:20}} ></View>
                                <View style={{alignItems:'center'}} >
                                    <FontAwesome5 name="book-reader" size={50} color={COLORS.colourNumberOne} />
                                    <View style={{height:20}} ></View>
                                    <Text style = {styles.MenuCardText}> FeedBack</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{height:20}}></View>
                </ScrollView>
                <View style={{height:10}}></View>
            </>)}
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Begin Homes Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}
            {DoNotShowHomesScreen ? <></>:(<>
                {renderTopHeaderRadiusWithABtn(this.showMainOptionsScreen)}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{height:20}} ></View>
                    {HolidayHomesData[0] && HolidayHomesData[0].map((item, i) => (
                    <View key={i}>
                    <View style={styles.HolidayHomeHandleView}>
                        <Text style={styles.HolidayHomeHandleText} >{item.Country}</Text>
                    </View>
                    <View   style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                <View>
                                    <Image source={{uri:ImageUrl+item.HomeImage}} style={styles.EstateImage} />
                                </View>
                            </View> 

                            <View style = {styles.ServiceNameListMainView2}>
                                <Text style = {styles.ServicesText1}> {item.Area} </Text>
                                <Text style = {styles.ServicesText1}>  </Text>
                                <Text style = {styles.ServicesText1}> {item.Amount} </Text>
                            </View>

                            <View style={styles.VideoView}>
                                <YoutubePlayer height={300} videoId={item.Video}/>
                            </View>
                            

                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.ArrowMainView}>
                                            <AntDesign name="rightcircle" size={30} color={COLORS.orangeColorOne} />
                                        </View>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.UpdatedActionBtn, styles.MainNavigationBtn1]}  onPress={() => this.showLearnMore(item.Details1,item.Details2,item.Details3,item.Details4,item.Details4)} >
                                            <Text style = {styles.UpdatedActionBtnText}> More Details  </Text>
                                        </TouchableOpacity>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.UpdatedActionBtn, styles.MainNavigationBtn1]}  onPress={()=> this.showBookingScreen(item.Country,item.Area)}  >
                                            <Text style = {styles.UpdatedActionBtnText}> Book Now </Text>
                                        </TouchableOpacity>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <View style={styles.ArrowMainView}>
                                            <AntDesign name="leftcircle" size={30} color={COLORS.orangeColorOne} />
                                        </View>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </View> 
                            <View style={{height:30}} ></View> 
                            </View>
                        </View> 
                        <View style={{height:20}}></View>
                        </View>
                    ))}
                </ScrollView>
            </>)}
            
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Homes Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}



                {DoNotShowHolidayHomesBookingScreen?<></>:(<>
                    {renderTopHeaderRadiusWithABtn(this.showMainOptionsScreen)}
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={styles.AboutText} >Give Us Your Details</Text>
                        {/* <View style={{height:50}}></View> */}

                        <View style={styles.orderListDetailsText} >
                            <View style={{alignItems:'center'}} >
                                <Text style={styles.AboutText} >Country :: {UserBookedCountry}</Text>
                                <Text style={styles.AboutText} >Area :: {UserBookedArea}</Text>
                            </View>

                            <TextInput style={styles.UpdatedInput} placeholder="Full Name" onChangeText={text => this.setBookingUserName(text)}  
                            placeholderTextColor = "#5800c4"  selectionColor={COLORS.colourNumberOne}
                            />
                            
                            <TextInput style={styles.UpdatedInput} placeholder="Number Of Guests" onChangeText={text => this.setBookingUserNumberOfGuest(text)}  
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                            <TextInput style={styles.UpdatedInput} placeholder="Mobile Phone" onChangeText={text => this.setBookingUserPhone(text)}
                            placeholderTextColor = "#5800c4"  selectionColor={COLORS.colourNumberOne}
                            maxLength={10} keyboardType="numeric"/>

                            <TextInput style={styles.UpdatedInput} placeholder="Email" onChangeText={text => this.setBookingUserEmail(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>
                        

                            <TextInput style={styles.UpdatedInput} placeholder="Check In Date" onChangeText={text => this.setBookingUserCheckIn(text)}
                            placeholderTextColor = "#5800c4"/>

                            <TextInput style={styles.UpdatedInput} placeholder="Check Out Date" onChangeText={text => this.setBookingUserCheckOut(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                            <View style={{height:30}} ></View>
                            <View style={{alignItems: "center"}}>
                                <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postHolidayHomesBooingApplication}  >
                                    <Text style = {styles.UpdatedBtnText}> Book </Text>
                                </TouchableOpacity>
                                <View style={{height:30}} ></View>
                                <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showHomesScreen}  >
                                    <Text style = {styles.UpdatedBtnText}> Back </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:20}} ></View>
                        </View>
                    </ScrollView>
                </>)}


                {DonNotShowVisitorsFeedBackScreen ?(<></>):(<>
                    {renderTopHeaderRadiusWithABtn(this.showMainOptionsScreen)}
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{alignItems:'center'}} >
                            <FontAwesome5 name="book-reader" size={55} color={COLORS.colourNumberOne} />
                            <View style={{height:20}} ></View>
                            <Text style={styles.FeedBackTitleText} >VISITOR'S FEEDBACK</Text>
                        </View>

                        <View style={{height:20}} ></View>
                        <Text style={styles.FeedBackTitleText} >Dear Visitor,{"\n\n"}
                            We are constantly seeking to improve the quality of the services that we provide our residents, 
                            relatives, friends and other Visitors. We would welcome your view on the quality of 
                            service delivery and would appreciate it if you could complete the following questionnaire which will be treated confidently.
                        </Text>

                        <View style={{height:20}} ></View>
                        <Text style={styles.FeedBackTitleText} >PLEASE TICK JUST ONE BOX PER QUESTION OR THE N/A BOX IF NOT APPLICABLE{"\n\n"}Please Tick only 1 appropriate Box</Text>
                        <View style={{height:20}} ></View>

                        <Text style={styles.FeedBackQnText} >1. Does the Home smell Pleasant?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn1checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn1("Option1","N/A")}>
                                    {Qn1checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn1checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn1("Option2","Always")}>
                                    {Qn1checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn1checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn1("Option3","Rarely")}>
                                    {Qn1checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn1checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn1("Option4","Most of the time")}>
                                    {Qn1checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn1checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn1("Option5","Some of the time")}>
                                    {Qn1checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn1("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >2. Is the Home clean and tidy when you visit?</Text>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn2checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn2("Option1","N/A")}>
                                    {Qn2checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn2checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn2("Option2","Always")}>
                                    {Qn2checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn2checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn2("Option3","Rarely")}>
                                    {Qn2checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn2checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn2("Option4","Most of the time")}>
                                    {Qn2checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn2checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn2("Option5","Some of the time")}>
                                    {Qn2checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn2("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >3. Is the House clean and tidy when you visit?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn3checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn3("Option1","N/A")}>
                                    {Qn3checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn3checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn3("Option2","Always")}>
                                    {Qn3checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn3checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn3("Option3","Rarely")}>
                                    {Qn3checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn3checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn3("Option4","Most of the time")}>
                                    {Qn3checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn3checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn3("Option5","Some of the time")}>
                                    {Qn3checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn3("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>

                        <Text style={styles.FeedBackQnText} >4. Do you receive a warm welcome when you visit?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn4checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn4("Option1","N/A")}>
                                    {Qn4checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn4checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn4("Option2","Always")}>
                                    {Qn4checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn4checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn4("Option3","Rarely")}>
                                    {Qn4checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn4checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn4("Option4","Most of the time")}>
                                    {Qn4checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn4checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn4("Option5","Some of the time")}>
                                    {Qn4checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn4("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>

                        <Text style={styles.FeedBackQnText} >5. Are the staff generally friendly and helpful?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn5checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn5("Option1","N/A")}>
                                    {Qn5checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn5checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn5("Option2","Always")}>
                                    {Qn5checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn5checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn5("Option3","Rarely")}>
                                    {Qn5checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn5checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn5("Option4","Most of the time")}>
                                    {Qn5checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn5checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn5("Option5","Some of the time")}>
                                    {Qn5checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn5("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>

                        <Text style={styles.FeedBackQnText} >6. Is the general level of decoration in good order?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn6checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn6("Option1","N/A")}>
                                    {Qn6checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn6checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn6("Option2","Always")}>
                                    {Qn6checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn6checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn6("Option3","Rarely")}>
                                    {Qn6checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn6checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn6("Option4","Most of the time")}>
                                    {Qn6checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn6checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn6("Option5","Some of the time")}>
                                    {Qn6checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn6("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >7. Do you feel the Home provides a safe enviroment?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn7checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn7("Option1","N/A")}>
                                    {Qn7checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn7checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn7("Option2","Always")}>
                                    {Qn7checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn7checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn7("Option3","Rarely")}>
                                    {Qn7checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn7checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn7("Option4","Most of the time")}>
                                    {Qn7checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn7checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn7("Option5","Some of the time")}>
                                    {Qn7checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn7("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>

                        <Text style={styles.FeedBackQnText} >8. Is the level of noise acceptable when you visit?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn8checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn8("Option1","N/A")}>
                                    {Qn8checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn8checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn8("Option2","Always")}>
                                    {Qn8checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn8checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn8("Option3","Rarely")}>
                                    {Qn8checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn8checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn8("Option4","Most of the time")}>
                                    {Qn8checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn8checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn8("Option5","Some of the time")}>
                                    {Qn8checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn8("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >9. Are refreshments available to you when you visit?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn9checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn9("Option1","N/A")}>
                                    {Qn9checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn9checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn9("Option2","Always")}>
                                    {Qn9checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn9checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn9("Option3","Rarely")}>
                                    {Qn9checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn9checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn9("Option4","Most of the time")}>
                                    {Qn9checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn9checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn9("Option5","Some of the time")}>
                                    {Qn9checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn9("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>

                        <Text style={styles.FeedBackQnText} >10. Is the furniture clean, comfortable & in good repair?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn10checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn10("Option1","N/A")}>
                                    {Qn10checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn10checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn10("Option2","Always")}>
                                    {Qn10checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn10checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn10("Option3","Rarely")}>
                                    {Qn10checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn10checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn10("Option4","Most of the time")}>
                                    {Qn10checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn10checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn10("Option5","Some of the time")}>
                                    {Qn10checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn10("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >11. Is the outside of the Home clean & tidy when you visit?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn11checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn11("Option1","N/A")}>
                                    {Qn11checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn11checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn11("Option2","Always")}>
                                    {Qn11checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn11checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn11("Option3","Rarely")}>
                                    {Qn11checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn11checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn11("Option4","Most of the time")}>
                                    {Qn11checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn11checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn11("Option5","Some of the time")}>
                                    {Qn11checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn11("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >12. Do the staff conduct themselves in a professional manner?</Text>
                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn12checked1 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn12("Option1","N/A")}>
                                    {Qn12checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>N / A</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn12checked2 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn12("Option2","Always")}>
                                    {Qn12checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Always</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn12checked3 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn12("Option3","Rarely")}>
                                    {Qn12checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Rarely</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn12checked4 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn12("Option4","Most of the time")}>
                                    {Qn12checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase, Qn12checked5 && styles.checkboxChecked]}
                                    onPress={() => this.tickSelectedOptionQn12("Option5","Some of the time")}>
                                    {Qn12checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                            </View>

                            <View style={styles.checkboxContainer}>
                                <Pressable
                                    style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                    onPress={() => this.resetOptionsQn12("Clear")}>
                                    {
                                        <FontAwesome name="dot-circle-o" size={20} color="white" />}
                                </Pressable>
                                <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                            </View>
                            <View style={{height:10}}></View>
                        <Text style={styles.FeedBackQnText} >13. Are you happy with the quality and available of the meals and drinks that you receive?</Text>
                        <View style={styles.checkboxContainer}>
                            <Pressable
                                style={[styles.checkboxBase, Qn13checked1 && styles.checkboxChecked]}
                                onPress={() => this.tickSelectedOptionQn13("Option1","N/A")}>
                                {Qn13checked1 && <Ionicons name="checkmark" size={24} color="white" />}
                            </Pressable>
                            <Text style={styles.checkBoxParagraph}>N / A</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <Pressable
                                style={[styles.checkboxBase, Qn13checked2 && styles.checkboxChecked]}
                                onPress={() => this.tickSelectedOptionQn13("Option2","Always")}>
                                {Qn13checked2 && <Ionicons name="checkmark" size={24} color="white" />}
                            </Pressable>
                            <Text style={styles.checkBoxParagraph}>Always</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <Pressable
                                style={[styles.checkboxBase, Qn13checked3 && styles.checkboxChecked]}
                                onPress={() => this.tickSelectedOptionQn13("Option3","Rarely")}>
                                {Qn13checked3 && <Ionicons name="checkmark" size={24} color="white" />}
                            </Pressable>
                            <Text style={styles.checkBoxParagraph}>Rarely</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <Pressable
                                style={[styles.checkboxBase, Qn13checked4 && styles.checkboxChecked]}
                                onPress={() => this.tickSelectedOptionQn13("Option4","Most of the time")}>
                                {Qn13checked4 && <Ionicons name="checkmark" size={24} color="white" />}
                            </Pressable>
                            <Text style={styles.checkBoxParagraph}>Most of the time</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <Pressable
                                style={[styles.checkboxBase, Qn13checked5 && styles.checkboxChecked]}
                                onPress={() => this.tickSelectedOptionQn13("Option5","Some of the time")}>
                                {Qn13checked5 && <Ionicons name="checkmark" size={24} color="white" />}
                            </Pressable>
                            <Text style={styles.checkBoxParagraph}>Some of the time</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <Pressable
                                style={[styles.checkboxBase2,  styles.checkboxChecked2]}
                                onPress={() => this.resetOptionsQn13("Clear")}>
                                {
                                    <FontAwesome name="dot-circle-o" size={20} color="white" />}
                            </Pressable>
                            <Text style={styles.checkBoxParagraph}>Click In The Box To Reset Options</Text>
                        </View>
                        <View style={{height:10}}></View>
                        <TextInput style={styles.UpdatedInput} placeholder="Your Name" onChangeText={text => this.setFeedBackUserName(text)}  
                            placeholderTextColor = "#5800c4"/>
                        <TextInput style={styles.UpdatedInput} placeholder="Mobile Number" onChangeText={text => this.setFeedBackUserPhone(text)}
                            placeholderTextColor = "#5800c4"/>

                        {Platform.OS === 'android' ?(<>  
                                <View style={styles.pickerSelectionInputView1}>
                                    <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                        selectedValue={HouseSelectedValue}
                                        
                                        onValueChange={(itemValue) =>this.setHouseSelectedValue(itemValue)}>
                                            <Picker.Item label="Select A House"/> 
                                            {HolidayHomes && HolidayHomes.map((item,index) => (
                                            <Picker.Item label={item.House} value={item.House} key={index} /> 
                                            ))}
                                    </Picker>
                                </View>
                                </>):(<>
                                {/* IOS  */}
                                <View>
                                    <Picker style={styles.iOSPickerSelectionInputView} 
                                        itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                        selectedValue={HouseSelectedValue}
                                        
                                        onValueChange={(itemValue) =>this.setHouseSelectedValue(itemValue)}>
                                            <Picker.Item label="Select A House"/> 
                                            {HolidayHomes && HolidayHomes.map((item,index) => (
                                            <Picker.Item label={item.House} value={item.House} key={index} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </>)}

                        <View style={{height:20}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postHolidayHomesFeedBack}>
                                <Text style = {styles.UpdatedBtnText}> - Submit - </Text>
                            </TouchableOpacity>
                            <View style={{height:15}} ></View>
                            <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.UpdatedMainNavigationBtn4]} onPress={this.showHomesScreen}  >
                                <Text style = {styles.UpdatedBtnText}> Back </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>
                        <Text style={styles.FeedBackQnText} >-------- Thank you for visiting TC Holiday Homes --------</Text>
                        <View style={{height:20}} ></View>
                    </ScrollView>
                </>)}
                <View style={styles.MainBottomSpaceView}></View>
            </View>

    );
}
}
