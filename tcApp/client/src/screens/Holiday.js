
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity,ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import {Ionicons, AntDesign,FontAwesome} from '@expo/vector-icons';
import axios from "axios";
import {APIListAllHolidayHomes, ImageUrl,APIPostHomesOrders} from './DataFileApis';
import { COLORS } from './Colours';

import YoutubePlayer from 'react-native-youtube-iframe';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class Holiday extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        HolidayHomesData:[],

        // date picker
        date:new Date(),
        mode:'date',
        showDatePicker:false,
        datePickerText:'Select date',

        // video: React.useRef(null),
        
        // Major Screens
        DoNotShowAmenitiesScreen:true,
        DoNotShowAboutScreen:true,
        DoNotShowHomesScreen:false,
        DoNotShowHolidayHomesBookingScreen:true,
        DonNotShowBookingScreen:true,


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
    }
    
}

componentDidMount() {

    axios.get(APIListAllHolidayHomes)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({HolidayHomesData:[...JSON.parse(results)]})
        })
    .catch()

}

setBookingUserPhone = (text) =>{this.setState({BookingUserPhone:text});}
setBookingUserName = (text) =>{this.setState({BookingUserName:text});}
setBookingUserCheckIn = (text) =>{this.setState({BookingUserCheckIn:text});}
setBookingUserCheckOut = (text) =>{this.setState({BookingUserCheckOut:text});}
setBookingUserNumberOfGuest= (text) =>{this.setState({BookingUserNumberOfGuests:text});}
setBookingUserEmail = (text) =>{this.setState({BookingUserEmail:text});}

showLearnMore = (Details1,Details2,Details3,Details4,Details5) =>
    {Alert.alert("More Details","\n\n"+Details1+"\n\n"+Details2+"\n\n"+Details3+"\n\n"+Details4+"\n\n"+Details5+"\n\n")}

onChange = (selectedDate) =>
{
    const currentDate = selectedDate || date;

    console.log("currentDate::"+currentDate)
    // this.setState({date:currentDate});

    let tempDate = new Date(currentDate);
    console.log("tempDate::"+tempDate)
    let formatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear() 
    // let formatTime = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear() 
    this.setState({datePickerText:formatDate})
    console.log("=========="+datePickerText);
}
// onChange = (selectedDate) =>
// {
//     const currentDate = selectedDate || date;
//     this.setState({data:currentDate});

//     let tempDate = new Date(currentDate);
//     let formatDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear() 
//     // let formatTime = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear() 
//     this.setState({datePickerText:formatDate})
//     console.log("=========="+datePickerText);
// }
// showMode = (currentMode) =>{this.setState({showDatePicker:true});this.setState({mode:currentMode})}
showMode = () =>{this.setState({showDatePicker:true});}

// Major Screens
showAmenitiesScreen = () =>
{
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:true})
    this.setState({DoNotShowAmenitiesScreen:false})
}

showAboutScreen = () =>
{
    this.setState({DoNotShowAmenitiesScreen:true})
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:true})
    this.setState({DoNotShowAboutScreen:false})
}

showHomesScreen = () =>
{
    this.setState({DoNotShowAmenitiesScreen:true})
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:true})
    this.setState({DoNotShowHomesScreen:false})
}

showHomesBookingScreen = () =>
{
    this.setState({DoNotShowAmenitiesScreen:true})
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:false})
}
showBookingScreen = () =>
{
    this.setState({DoNotShowAmenitiesScreen:true})
    this.setState({DonNotShowBookingScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowHomesScreen:true})
    this.setState({DoNotShowHolidayHomesBookingScreen:false})
}

// setDatePickerOpen = (date) =>
// {
//     // this.setState({open:true})
//     console.log("caled..."+date)
// }

// onChange = (selectedDate) => {
//     const currentDate = selectedDate || date;
//     setDatePickerOpen(currentDate);
// };

postHolidayHomesBooingApplication = async () => 
{
    let name = this.state.BookingUserName;
    let phone = this.state.BookingUserPhone;
    let guests = this.state.BookingUserNumberOfGuests;
    let email = this.state.BookingUserEmail;
    let checkIn = this.state.BookingUserCheckIn;
    let checkOut = this.state.BookingUserCheckOut;


    if ((name.length == 0) || (phone.length == 0)  || (guests.length == 0)  || (email.length == 0)|| (checkIn.length == 0)|| (checkOut.length == 0))
    {Alert.alert("Warning","\n\n Name, Phone, Email,CheckIn,checkOut \n \n Can Not Be Empty")}

    else
    {

        try
        {
            // post data
            // const d = new Date();
            // let month = d.getMonth();
            // let day = d.getDay();
            // let hour = d.getHours();  
            // let minutes = d.getMinutes();
            // let seconds = d.getSeconds();  
            // let referance = "#"+month+day+hour+minutes+seconds;
            const postRequest = await axios.post(APIPostHomesOrders,
                {
                    "Name":name,
                    "Number":phone,
                    "Guests":guests,
                    "Email":email,
                    "CheckIn":checkIn,
                    "CheckOut":checkOut,
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
render() {
    
    const {HolidayHomesData,date,mode,datePickerText,showDatePicker} = this.state;
    const {DonNotShowBookingScreen} = this.state;
    const {DoNotShowAmenitiesScreen,DoNotShowAboutScreen,DoNotShowHomesScreen,DoNotShowHolidayHomesBookingScreen} = this.state;

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
                    <Text style = { styles.productTopTitleName}> Holiday Home </Text>
                </View> */}
                <View style={styles.mainChatView}>
                    <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                        <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView}>
                        <Text style={styles.MainTopHeaderTextLabel}> Tc Holiday Homes </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showHomesScreen} >
                        <Text style = {styles.btnText}> Homes  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAmenitiesScreen} >
                        <Text style = {styles.btnText}> Amenities </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAboutScreen}  >
                        <Text style = {styles.btnText}> About </Text>
                    </TouchableOpacity>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 

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
                    <View style={{height:20}} ></View>
                    {/* <WebView
                    style={{height:600}}
                    javaScriptEnabled={true}
        domStorageEnabled={true}
                    source={{uri: 'https://www.youtube.com/watch?v=IXoIACwqwsA' }}
                    /> */}
                    
                    {HolidayHomesData && HolidayHomesData.map((item, i) => (
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
                                            <AntDesign name="rightcircle" size={30} color='#fff' />
                                        </View>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.ActionBtn, styles.MainNavigationBtn1]}  onPress={() => this.showLearnMore(item.Details1,item.Details2,item.Details3,item.Details4,item.Details4)} >
                                            <Text style = {styles.actionBtnText}> More Details  </Text>
                                        </TouchableOpacity>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <TouchableOpacity style={[styles.ActionBtn, styles.MainNavigationBtn1]}  onPress={this.showBookingScreen}  >
                                            <Text style = {styles.actionBtnText}> Book Now </Text>
                                        </TouchableOpacity>
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        <View style={styles.ArrowMainView}>
                                            <AntDesign name="leftcircle" size={30} color='#fff' />
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

            {DoNotShowAboutScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                <View style={styles.MainOuterCardListView} >
                    <View  style={styles.MainInnerCardAboutView}>

                    <Text style={styles.AboutTitleText} >Best Holiday Home in Kampala</Text>
                    <Text style={styles.AboutText} >
                        Planning your next getaway and don’t want to stay in a bog-standard hotel room? 
                        No matter if you’re looking for a rural retreat or a weekend in the big city, 
                        we can offer you an ideal solution! At Tc Holiday Homes we will find the best holiday home 
                        for you.We are located in Kampala and you can book directly from our 
                        site or contact us on +447868651393 to book the spot that suits you best
                    </Text>

                    <Text style={styles.AboutTitleText} >Best Short-Term Rentals</Text>
                    <Text style={styles.AboutText} >
                        Whether you are planning a weekend date with your fiance or your 
                        family is leaving town for a week or two, we have the best choice of holiday homes for you. 
                        Our rentals are geared up for short term holidays, offering the best prices in the industry. Our holiday home rental service includes a great selection of spots with all the amenities you could need for your holidays. 
                        Our rentals also vary in price, so we have a location for every budget 
                    </Text>

                    <Text style={styles.AboutTitleText} >We Keep Our Clients Satisfied</Text>
                    <Text style={styles.AboutText} >
                    We can proudly say that our past clients are satisfied with the services we offer 
                    and have found our homes clean and well-kept. We strive to keep our rentals in impeccable 
                    condition. Most of our holiday homes will include the usual necessities, but all are as advertised. 
                    If you have other concerns, our friendly staff will be more than happy to address them
                    </Text>

                    <Text style={styles.AboutTitleText} >Get In Touch</Text>
                    <Text style={styles.AboutText} >
                        Tc Holiday Homes
                        22A Station Road
                        Sutton Surrey
                        SM2 6BS
                        </Text>

                        <Text style={styles.AboutText} >07868 651393</Text>
                        <Text style={styles.AboutText} >prospertamale@gmail.com</Text>
                    
                    </View>
                </View>
            </>)}
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End About Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}


            {DoNotShowAmenitiesScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                <View style={styles.MainOuterCardListView} >
                    <View  style={styles.MainInnerCardAboutView}>
                        <Text style={styles.AboutTitleText} >Tc Holiday Homes</Text>
                        <Text style={styles.AboutText} >24/7 Availability</Text>
                        <Text style={styles.AboutText} >Free Consultation</Text>
                        <Text style={styles.AboutText} >Parking Available</Text>
                        <Text style={styles.AboutText} >Good For Children</Text>
                        <Text style={styles.AboutText} >Wifi On The Premises</Text>
                        <Text style={styles.AboutText} >Bike Parking Available</Text>
                        <Text style={styles.AboutText} >Debit, Credit Cards Accepted</Text>
                    </View>
                </View>
                
            </>)}


            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Amenities Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}














                {DoNotShowHolidayHomesBookingScreen?<></>:(<>
                    <View style={{height:50}}></View>
                    <Text style={styles.AboutText} >Give Us Your Details</Text>
                    {/* <View style={{height:50}}></View> */}

                    <View style={styles.orderListDetailsText} >

                        <TextInput style={styles.input} placeholder="Full Name" onChangeText={text => this.setBookingUserName(text)}  
                        placeholderTextColor = "#5800c4" 
                        />
                        
                        <TextInput style={styles.input} placeholder="Number Of Guests" onChangeText={text => this.setBookingUserNumberOfGuest(text)}  
                        placeholderTextColor = "#5800c4" 
                        />
                        <TextInput style={styles.input} placeholder="Mobile Phone" onChangeText={text => this.setBookingUserPhone(text)}
                        placeholderTextColor = "#5800c4" 
                        maxLength={10} keyboardType="numeric" 
                        />

                        <TextInput style={styles.input} placeholder="Email" onChangeText={text => this.setBookingUserEmail(text)}
                        placeholderTextColor = "#5800c4" 
                        />

                        <TextInput style={styles.input} placeholder="Check In Date" onChangeText={text => this.setBookingUserCheckIn(text)}
                        placeholderTextColor = "#5800c4" 
                        />

                        <TextInput style={styles.input} placeholder="Check Out Date" onChangeText={text => this.setBookingUserCheckOut(text)}
                        placeholderTextColor = "#5800c4" 
                        />

                        {/* <DatePicker date={date} onDateChange={setDate} /> */}
                        {/* <DatePicker date={date} /> */}

                        {/* <Text> {datePickerText}</Text>

                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showMode}  >
                            <Text style = {styles.btnText}> DatePicker </Text>
                        </TouchableOpacity> */}

                        {showDatePicker && (
                            < DateTimePicker
                            testID='dateTimePicker'
                            value={date} mode={mode}
                            is24Hour={true} display='default'
                            onChange={this.onChange}
                            
                            />
                        )}
                        {/* <TextInput style={styles.input} placeholder="Country" onChangeText={text => this.setBookingUserEmail(text)}
                        placeholderTextColor = "#5800c4" 
                        />

                        <TextInput style={styles.input} placeholder="Area Eg Zana" onChangeText={text => this.setBookingUserEmail(text)}
                        placeholderTextColor = "#5800c4" 
                        /> */}



                        

                        
                        {/* <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postHolidayHomesBooingApplication} >
                            <Text style = {styles.btnText}> Book   </Text>
                        </TouchableOpacity> */}

                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postHolidayHomesBooingApplication}  >
                                <Text style = {styles.btnText}> Book </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showHomesScreen}  >
                                <Text style = {styles.btnText}> Back </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>
                    </View>
                </>)}








                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
