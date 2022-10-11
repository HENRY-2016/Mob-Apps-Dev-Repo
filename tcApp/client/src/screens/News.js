
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import TcNewsImg from "../imgs/tcnews.png";
import { viewPdfFile,updateApp } from './Functions';
import { COLORS } from './Colours';
import {APIListAllNoticeBoard,APIListAllNews,
    APIPostNewsOrder,APIListAllCountries,
    APIPostLogIns,
} from './DataFileApis';


export default class News extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        NoticeBoard:[],
        Countries:[],
        News:[],
        
        // Major Screens
        DoNotShowNewsScreen:false,
        DoNotAdvertsBookingScreen :true,
        DoNotShowTvScreen:true,
        DoNotShowRadioScreen:true,
        DoNotShowAdvertiseScreen:true,

        // Inner Screens
        DoNotShowInnerNewsScreen1:false,
        DoNotShowInnerNewsScreen2:true,

        // others
        CountrySelectedValue:'',
        DeliverySelectedValue:'',
        PaymentSelectedValue:'',
        CountrySelected:'',
        NumberOfCopies:'',
        BookingName:'',
        BookingContact:'',
        NewsCountry:'',
        NewsDate:'',
        NewsCost:'',

        // post logins
        LogInCardNo:'',
        LogInName:'',
        LogInCategory:'',
    }
    
}

UNSAFE_componentWillMount () {

    axios.get(APIListAllNoticeBoard)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({NoticeBoard:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        })
    .catch()
    

    axios.get(APIListAllNews)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({News:[...JSON.parse(results)]})
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

showNewsScreen = () =>
{
    this.setState({DoNotAdvertsBookingScreen :true})
    this.setState({DoNotShowNewsScreen:false})
}


AdvertsBookingScreen  = () =>
{
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotAdvertsBookingScreen :false})
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
    
    const { NoticeBoard,News,NewsCountry,NewsDate} = this.state;
    const {DoNotAdvertsBookingScreen ,DoNotShowMainNavBtnScreen,DoNotShowInnerNewsScreen1,DoNotShowInnerNewsScreen2} = this.state;
    const {DoNotShowTvScreen,DoNotShowRadioScreen,DoNotShowAdvertiseScreen,DoNotShowNewsScreen} = this.state;
    const { Countries,CountrySelectedValue,DeliverySelectedValue,PaymentSelectedValue} = this.state;

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
                        <Text style={styles.MainTopHeaderTextLabel}> Tc News Uganda UK Kenya  </Text>
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
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showNewsScreen} >
                        <Text style = {styles.btnText}>Tc News  </Text>
                    </TouchableOpacity>

                    {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.AdvertsBookingScreen } >
                        <Text style = {styles.btnText}>Advert Booking  </Text>
                    </TouchableOpacity> */}

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </>)}
            </View>
        

            
            {DoNotShowNewsScreen ? <></>:(<>
                <View style={{height:20}} ></View>
                <View style={styles.TcNewsIconMainView}>
                <Image source={TcNewsImg} style={styles.TcNewsIcon}/>
                </View>
                <View style={{height:20}} ></View>
                <Text style={styles.AboutTitleText} >Grab Your Free  Copy Now</Text>

                {DoNotShowInnerNewsScreen1 ?<></>:(<>
                    {News && News.map((item, index) => (
                        <View key={index}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    
                        <View>
                        <View style={styles.mainTableView}>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{item.Country}</Text>
                            </View>

                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{item.Date}</Text>
                            </View>
                        
                            <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{this.showInnerNewsScreen2(item.Country,item.Date,item.Holder3)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >Order For A Copy</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.tableTrView}>
                            <View style={{width:20}} ></View>
                            </View>

                            <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{viewPdfFile(item.PartOne)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >View Part 1 | {item.Holder1}</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.tableTrView}>
                            <View style={{width:20}} ></View>
                            </View>

                            <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{viewPdfFile(item.PartTwo)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >View Part 2 | {item.Holder2}</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.tableTrView} >
                                <View style={{width:20}} ></View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                    </View>
                    ))}
                </>)}



                {DoNotShowInnerNewsScreen2?<></>:(<>
                    <View style={{height:15}} ></View>
                    <View style={{height:20}} ></View>
                    <Text style={styles.AboutTitleText} >Oder Details </Text>
                    <View style={styles.orderListDetailsText} >
                    
                    <View>
                        <TextInput style={styles.bookingInput} placeholder="Country" editable = {false} defaultValue={"Date :" + NewsDate}  
                        placeholderTextColor = "#5800c4"
                        />

                        {/* <TextInput style={styles.bookingInput} placeholder="Amount" editable = {false} defaultValue={"Cost :" + NewsCost}  
                        placeholderTextColor = "#5800c4"
                        /> */}

                        <TextInput style={[styles.bookingInput]} placeholder="Date"  editable = {false} defaultValue={"Version :" + NewsCountry }
                        placeholderTextColor = "#5800c4" 
                        />

                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={CountrySelectedValue}
                                
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Select Country"/> 
                                    {Countries && Countries.map((item,index) => (
                                    <Picker.Item label={item.countryName} value={item.countryName} key={index} /> 
                                    ))}
                            </Picker>
                        </View>
                        
                        <TextInput style={styles.input} placeholder="Name Or Tc Number"  
                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setBookingName(text)}/>

                        <TextInput style={[styles.input]} placeholder="Mobile" onChangeText={text => this.setBookingContact(text)}
                        placeholderTextColor = "#5800c4" keyboardType="numeric"/>
                        
                        <TextInput style={styles.input} placeholder="Number Of Copies" keyboardType='numeric'
                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setNumberOfCopies(text)}/>

                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={DeliverySelectedValue}
                                
                                onValueChange={(itemValue) =>this.setDeliverySelectedValue(itemValue)}>
                                    <Picker.Item label="Delivery Method"/> 
                                    <Picker.Item label="Pick Up" value="Pick Up" /> 
                                    <Picker.Item label="Deliver" value="Deliver" /> 
                            </Picker>
                        </View>

                        {/* <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={PaymentSelectedValue}
                                
                                onValueChange={(itemValue) =>this.setPaymentSelectedValue(itemValue)}>
                                    <Picker.Item label="Payment Method"/> 
                                    <Picker.Item label="Bank" value="Bank" /> 
                                    <Picker.Item label="By Cash" value="By Cash" /> 
                            </Picker>
                        </View> */}
                        
                        <View style={{alignItems:'center', marginTop:20}} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postNewsOder} >
                            <Text style = {styles.btnText}> Order </Text>
                        </TouchableOpacity>
                        <View style={{height:20}} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showInnerNewsScreen1()}}  >
                            <Text style = {styles.btnText}> Cancel  </Text>
                        </TouchableOpacity>
                        <View style={{height:30}} ></View>
                        </View>
                    </View>
                    </View>
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
            {DoNotAdvertsBookingScreen  ?<></>:(<>
                <View style={{height:15}} ></View>
                    <Text style={styles.AboutText} >UpComing....</Text>
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

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
