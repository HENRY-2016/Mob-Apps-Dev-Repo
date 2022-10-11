
import React from 'react';
import { Text, View,TextInput,TouchableOpacity,Alert, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from './Colours';
import axios from "axios";
import {
        APIListAllWeeklyProgram,APIListAllCountries,
        APIListAllWeeklyProgramById,APIListNewNotification,
        APIPostBooking,APIListAllNotification,
        } from './DataFileApis';

import 
    { 
        LoadingError,PostingError,TextInputError} from './Functions';


export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        Countries:[],
        Notifications:[],
        WeeklyPrograms:[],
        WeeklyProgramById:[],
        
        // Major Screens
        DoNotShowWeeklyProgramScreen:false,
        DoNotShowWeeklyProgramsBooking:true,
        DoNotShowNotificationsScreen:true,
        DoNotShowWeeklyProgramDetailsScreen:true,

        // Inner Screens
    
        // customer
        TodaysNotifications:'',
        CountrySelectedValue:'',
        PhoneCountryCode:'',
        CountrySelected:'',
        BookedProgramName:'',

        // Booking
        BookingFullName:'',
        BookingPostalCode:'',
        BookingPhone:'',
        BookingArea:'',
        BookingEmail:'',

    }
    
}

UNSAFE_componentWillMount() {

    axios.get(APIListAllWeeklyProgram)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({WeeklyPrograms:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        })
    .catch(err=>{})
    axios.get(APIListNewNotification)
    .then(res => {
        let results = res; 
        this.setState({TodaysNotifications:results.data})})
    .catch(err=>{})

    axios.get(APIListAllNotification)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Notifications:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error",LoadingError);})
}


setBookingFullName=(text)=>{this.setState({BookingFullName:text})}
setBookingPostalCode=(text)=>{this.setState({BookingPostalCode:text})}
setBookingPhone=(text)=>{this.setState({BookingPhone:text})}
setBookingArea=(text)=>{this.setState({BookingArea:text})}
setBookingEmail=(text)=>{this.setState({BookingEmail:text})}

// Major Screens
showNotificationsScreen= () =>
{
    this.setState({DoNotShowWeeklyProgramScreen:true})
    this.setState({DoNotShowWeeklyProgramsBooking:true})
    this.setState({DoNotShowWeeklyProgramDetailsScreen:true})
    this.setState({DoNotShowNotificationsScreen:false})
}

showWeeklyProgramScreen = () =>
{
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowWeeklyProgramDetailsScreen:true})
    this.setState({DoNotShowWeeklyProgramsBooking:true})
    this.setState({DoNotShowWeeklyProgramScreen:false})
}

showBackToWeeklyProgramDetailsScreen = () =>
{
    this.setState({DoNotShowWeeklyProgramsBooking:true})
    this.setState({DoNotShowWeeklyProgramDetailsScreen:true})
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowWeeklyProgramScreen:false})
}
showWeeklyProgramDetailsScreen = (id) =>
{
    axios.get(APIListAllWeeklyProgramById+id)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({WeeklyProgramById:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error",LoadingError);})

    this.setState({DoNotShowWeeklyProgramScreen:true})
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowWeeklyProgramsBooking:true})
    this.setState({DoNotShowWeeklyProgramDetailsScreen:false}) 
}
showWeeklyProgramBookingScreen = (program) =>
{
    this.setState({BookedProgramName:program})
    this.setState({DoNotShowWeeklyProgramScreen:true})
    this.setState({DoNotShowNotificationsScreen:true})
    this.setState({DoNotShowWeeklyProgramDetailsScreen:true})
    this.setState({DoNotShowWeeklyProgramsBooking:false})

}

setCountrySelectedValue  = (text) =>
{
    const CountriesArr = [...this.state.Countries]
    let Index = text.split(':');
    let country = Index[0]
    let arraryIndex = Index[1]
    let code = CountriesArr[arraryIndex]
    let phoneCode = code.countryCode
    this.setState({PhoneCountryCode:phoneCode});
    this.setState({CountrySelected:country});
}

postBookingDetails= async ()=>
{
    let country = this.state.CountrySelected
    let program = this.state.BookedProgramName;
    let name = this.state.BookingFullName;
    let email = this.state.BookingEmail;
    let phone = this.state.BookingPhone;
    let postal = this.state.BookingPostalCode;
    let area = this.state.BookingArea;
    let phoneCode = this.state.PhoneCountryCode;
    let phoneNumber = phoneCode+phone;


    if (country == 'UK')
    {
        if ((name.length == 0)|| (email.length == 0) ||(phone.length == 0)||(postal.length == 0))
        {Alert.alert("Error",TextInputError)}
        else
        {
            try
            {
                const postRequest = await axios.post(APIPostBooking,
                    {
                        "Name":name,
                        "Program":program,
                        "Country":country,
                        "Phone":phoneNumber,
                        "ZipCode":postal,
                        "Email":email,
                        "Area":" ",
                    }
                )
                
                let result = postRequest.data;
                Alert.alert("Booking Status",result.status);
                this.showWeeklyProgramScreen();
            }
            catch (error){Alert.alert("An Error",PostingError)};
        }
    }


    else
    {
        if ((name.length == 0)|| (email.length == 0) ||(phone.length == 0)||(area.length == 0))
        {Alert.alert("Error",TextInputError)}

        else
        {
            try
            {
                const postRequest = await axios.post(APIPostBooking,
                    {
                        "Name":name,
                        "Program":program,
                        "Country":country,
                        "Phone":phoneNumber,
                        "ZipCode":"",
                        "Email":email,
                        "Area":area,
                    }
                )
                
                let result = postRequest.data;
                Alert.alert("Booking Status",result.status);
                this.showWeeklyProgramScreen();
            }
            catch (error){Alert.alert("An Error",PostingError)};
        }
    }






}
render() {
    
    const {DoNotShowNotificationsScreen,DoNotShowWeeklyProgramScreen,DoNotShowWeeklyProgramsBooking} = this.state;
    const {DoNotShowWeeklyProgramDetailsScreen,Notifications,TodaysNotifications}= this.state;
    const {Countries,CountrySelectedValue,CountrySelected,PhoneCountryCode} = this.state;
    const { WeeklyPrograms,WeeklyProgramById,BookedProgramName}=this.state
    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
            <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={50} style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Home </Text>
                </View> */}

            <View style={styles.mainChatView}>

                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text  style={styles.mainCartNumberTxt}>{TodaysNotifications}</Text>
                    <AntDesign name="notification" size={35} style={styles.NotificationIcon} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                
            <View>
                <View style={{height:20}}></View>
                <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showWeeklyProgramScreen} >
                        <Text style = {[styles.btnText,styles.btnText1]}> Weekly</Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  onPress={this.showNotificationsScreen} >
                        <Text style = {[styles.btnText,styles.btnText1]}> Notifications</Text>
                    </TouchableOpacity>
                    
                    {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showWeeklyProgramsBooking} >
                        <Text style = {styles.btnText}> Activities </Text>
                    </TouchableOpacity> */}

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </View>
            
        
            {DoNotShowWeeklyProgramScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                {WeeklyPrograms && WeeklyPrograms.map((item,index)=> (
                    <View key={index} >
                        <View>
                        <View style={styles.MainHorizontalCardView}>
                            <View style={styles.LeftHorizontalCardView} ></View>
                            <View style={styles.SeparatorHorizontalCardView} ></View>
                            <View style={styles.RightHorizontalCardView} >
                                <TouchableOpacity style={styles.HorizontalCardBtn2} onPress={()=>this.showWeeklyProgramBookingScreen(item.Name)}>
                                    <Text style={styles.HorizontalCardBtnText} >Book Now </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.HorizontalCardBtn} onPress={()=>this.showWeeklyProgramDetailsScreen(item.id)}>
                                    <Text style={styles.HorizontalCardBtnText} >Details </Text>
                                </TouchableOpacity>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.Name}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.Title}</Text>
                            </View>
                        </View>
                    <View style={{height:15}} ></View>
                    </View>
                    </View>
                ))}
                <View style={{height:15}} ></View>
            </>)}

            {DoNotShowWeeklyProgramDetailsScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                {WeeklyProgramById && WeeklyProgramById.map((item,index)=> (
                    <View key={index} >
                    <View  >
                        <View style={styles.MainHorizontalCardView}>
                            <View style={styles.LeftHorizontalCardView} ></View>
                            {/* <View style={styles.SeparatorHorizontalCardView} ></View> */}
                            <View style={styles.RightHorizontalCardView} >
                                <TouchableOpacity style={styles.HorizontalCardBtn2} onPress={()=>this.showWeeklyProgramBookingScreen(item.Name)}>
                                    <Text style={styles.HorizontalCardBtnText} >Book Now </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.HorizontalCardBtn} onPress={this.showBackToWeeklyProgramDetailsScreen} >
                                    <Text style={styles.HorizontalCardBtnText} >Back </Text>
                                </TouchableOpacity>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p1}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p2}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p3}</Text>
                                {/* <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p4}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p5}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p6}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p7}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p8}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p9}</Text>
                                <Text style={[styles.TextLabels,styles.TextLabels2]} >{item.p10}</Text> */}
                            </View>
                        </View>
                    </View>
                    </View>
                ))}
                <View style={{height:15}} ></View>
            </>)}

            {DoNotShowWeeklyProgramsBooking ? <></>:(<>
            <View style={{height:20}}></View>
            <View style={{alignItems:'center'}} >
                <Text style={styles.TextLabels}>Booking Or Registering For </Text>
                <Text style={[styles.TextLabels,styles.TextLabels1]}> {BookedProgramName}</Text>
                <Text style={styles.TextLabels}> Program</Text>
            </View>
            <View style={styles.pickerSelectionInputView}>
                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.orangeColor}
                    selectedValue={CountrySelectedValue}
                    
                    onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                        <Picker.Item label="Select Your Country"/> 
                        {Countries && Countries.map((iteam,index ) => (
                            <Picker.Item label={iteam.countryName} value={iteam.countryName+':'+index} key={index} /> 
                        ))}
                </Picker>
            </View>

            
            {CountrySelected && CountrySelected =="UK" ?(<>
            <View style={{alignItems:'center'}} >
                <Text style={styles.TextLabels}> {"Country :"+ CountrySelected}</Text>
            </View>
            

            <TextInput style={[styles.input]} placeholder="Full Name"  
            placeholderTextColor = {COLORS.orangeColor}  onChangeText={text => this.setBookingFullName(text)}/>

            <TextInput style={[styles.input]} placeholder="Zip Code / Post code"  
            placeholderTextColor = {COLORS.orangeColor}  onChangeText={text => this.setBookingPostalCode(text)}/>
            
            <View style={styles.PhoneInput} >
            <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} 
            placeholderTextColor = {COLORS.orangeColor} />
            <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Mobile 10 digits" onChangeText={text => this.setBookingPhone(text)}
            placeholderTextColor = {COLORS.orangeColor} maxLength={10} keyboardType="numeric" />
            </View>
            </>):<></>}


            {CountrySelected && CountrySelected =="Ghana" ?(<>
            <View style={{alignItems:'center'}} >
                <Text style={[styles.TextLabels,styles.TextLabels1]}> {"Country :"+ CountrySelected}</Text>
            </View>

            <TextInput style={[styles.input]} placeholder="Full Name"  
            placeholderTextColor = {COLORS.orangeColor}  onChangeText={text => this.setBookingFullName(text)}/>

            <TextInput style={[styles.input]} placeholder="Area"  
            placeholderTextColor = {COLORS.orangeColor}  onChangeText={text => this.setBookingArea(text)}/>
            <View style={styles.PhoneInput} >
                <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" 
                placeholderTextColor = {COLORS.black}/>
                <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Mobile 9 digits" onChangeText={text => this.setBookingPhone(text)}
                placeholderTextColor = {COLORS.orangeColor} maxLength={9} keyboardType="numeric" />
            </View>
            </>):<></>}

            {CountrySelected ?(<>
            <TextInput style={[styles.input]} placeholder="Email" 
            placeholderTextColor = {COLORS.orangeColor}  onChangeText={text => this.setBookingEmail(text)}/>
            </>):<></>}

            {CountrySelected ?(<>
            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postBookingDetails} >
                <View style={styles.MainBtnView}>
                    <View style={{marginLeft:70}}>
                    <Text style = {styles.LogInBtnText}> Book Now </Text>
                    </View>
                    <View style={{marginLeft:60}}>
                    <AntDesign style={{marginTop:-15}} name="arrowright" size={30} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            </>):<></>}
            <View style={{height:20}}></View>
            <View style={{alignItems:'center'}} >
                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showWeeklyProgramScreen} >
                    <Text style = {styles.LogInBtnText}> Cancel   </Text>
                </TouchableOpacity>
            </View>
            <View style={{height:20}}></View>
        </>)}

            

            {DoNotShowNotificationsScreen?<></>:(<>
                <View style={{height:25}} ></View>
                {Notifications && Notifications.map((item, index) => (
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View key={index}>
                        <View style={styles.mainTableView}>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{item.Title}</Text>
                            </View>

                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{item.Time}</Text>
                            </View>


                            {/* <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{viewPdfFile(item.PartOne)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >View Part 1 | {item.Holder1}</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View> */}

                            <View style={styles.tableTrView}>
                            <View style={{width:20}} ></View>
                            </View>

                            {/* <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{viewPdfFile(item.PartTwo)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >View Part 2 | {item.Holder2}</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.tableTrView}>
                            <View style={{width:20}} ></View>
                            </View> */}

                            {/* <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{this.showInnerNewsScreen2(item.Country,item.Date,item.Holder3)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >Order News Copy</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View> */}

                            <View style={styles.tableTrView} >
                                <View style={{width:20}} ></View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                    ))}
            </>)}

            

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
