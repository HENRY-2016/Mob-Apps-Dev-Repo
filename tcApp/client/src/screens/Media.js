
import React from 'react';
import { Text, View,TextInput, Alert,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { COLORS } from './Colours';
import YoutubePlayer from 'react-native-youtube-iframe';
import {APIListFunny,APIListAllNews,APIListAllCountries,
    APIPostNewsOrder,APIListTalkTheWalk,
} from './DataFileApis';
import { viewPdfFile} from './Functions';
import TcTvImg from "../imgs/tctv.png";
import TcNewsImg from "../imgs/tcnews.png";

export default class Media extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        Countries:[],
        News:[],
        Funny:[],
        TalkTheWalk:[],
        
        // Major Screens
        DoNotShowMainNewsScreen:false,
        DoNotShowMainFunnyScreen:true,
        DoNotShowMainTvScreen:true,
        
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

    }
    
}

UNSAFE_componentWillMount () {
    axios.get(APIListAllNews)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({News:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIListTalkTheWalk)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({TalkTheWalk:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIListFunny)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Funny:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data");})
}

setNumberOfCopies = (text) =>{this.setState({NumberOfCopies:text});}
setBookingName = (text) =>{this.setState({BookingName:text});}
setBookingContact = (text) =>{this.setState({BookingContact:text});}
setCountrySelectedValue  = (text) =>{this.setState({CountrySelectedValue:text});}
setDeliverySelectedValue  = (text) =>{this.setState({DeliverySelectedValue:text});}
setPaymentSelectedValue  = (text) =>{this.setState({PaymentSelectedValue:text});}


showMainNewsScreen = () => 
{
    this.setState({DoNotShowMainTvScreen:true})
    this.setState({DoNotShowMainFunnyScreen:true})
    this.setState({DoNotShowMainNewsScreen:false})
}
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

showMainTvScreen = () =>
{
    this.setState({DoNotShowMainFunnyScreen:true})
    this.setState({DoNotShowMainNewsScreen:true})
    this.setState({DoNotShowMainTvScreen:false})
}

ShowMainFunnyScreen = () =>
{
    this.setState({DoNotShowMainTvScreen:true})
    this.setState({DoNotShowMainNewsScreen:true})
    this.setState({DoNotShowMainFunnyScreen:false})
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
    
    const {TalkTheWalk,Funny,News,NewsCountry,NewsDate} = this.state;

    const {DoNotShowMainFunnyScreen,DoNotShowMainNavBtnScreen} = this.state;
    const {DoNotShowMainTvScreen,DoNotShowMainNewsScreen,DoNotShowInnerNewsScreen1,DoNotShowInnerNewsScreen2} = this.state;
    const { Countries,CountrySelectedValue,DeliverySelectedValue} = this.state;

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
                    <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc News {"\n"}Commedy, Tv Show </Text>
                </View>
            </View>
            <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
            <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            {DoNotShowMainNavBtnScreen?<></>:(<>
                <View style={styles.MainNavigationBtnView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                        </View>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showMainNewsScreen} >
                            <Text style = {styles.btnText}>Tc News </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showMainTvScreen} >
                            <Text style = {styles.btnText}>TalkTheWalk </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.ShowMainFunnyScreen} >
                            <Text style = {styles.btnText}> Commedy </Text>
                        </TouchableOpacity>
                        
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                        </View>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                    </ScrollView>
                </View> 
            </>)}
            <View style={{height:30}} ></View>

        
            {DoNotShowMainNewsScreen?(<></>):(<>
                <ScrollView showsVerticalScrollIndicator={false} >
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
                                            <Text style={styles.ratingChatBtnText} >Get Part 1 | {item.Holder1}</Text> 
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.tableTrView}>
                                <View style={{width:20}} ></View>
                                </View>

                                <View style={styles.tableTrView}>
                                    <View style={styles.ratingChatBtnView}>
                                        <TouchableOpacity onPress={()=>{viewPdfFile(item.PartTwo)}} style={styles.ratingChatBtn2} >
                                            <Text style={styles.ratingChatBtnText} >Get Part 2 | {item.Holder2}</Text> 
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


                            <TextInput style={[styles.bookingInput]} placeholder="Date"  editable = {false} defaultValue={"Version :" + NewsCountry }
                            placeholderTextColor = "#5800c4" 
                            />
                            {Platform.OS === 'android' ?(<>  
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
                            </>):(<>
                                {/* IOS  */}
                                <View>
                                    <Picker style={styles.iOSPickerSelectionInputView} 
                                        itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                        selectedValue={CountrySelectedValue}
                                        
                                        onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                            <Picker.Item label="Select Country"/> 
                                            {Countries && Countries.map((item,index) => (
                                            <Picker.Item label={item.countryName} value={item.countryName} key={index} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </>)}
                            
                            <TextInput style={styles.input} placeholder="Name Or Tc Number"  
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setBookingName(text)}/>

                            <TextInput style={[styles.input]} placeholder="Mobile" onChangeText={text => this.setBookingContact(text)}
                            placeholderTextColor = "#5800c4" keyboardType="numeric"/>
                            
                            <TextInput style={styles.input} placeholder="Number Of Copies" keyboardType='numeric'
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setNumberOfCopies(text)}/>

                            {Platform.OS === 'android'?(<>
                                <View style={styles.pickerSelectionInputView1}>
                                    <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                        selectedValue={DeliverySelectedValue}
                                        
                                        onValueChange={(itemValue) =>this.setDeliverySelectedValue(itemValue)}>
                                            <Picker.Item label="Delivery Method"/> 
                                            <Picker.Item label="Pick Up" value="Pick Up" /> 
                                            <Picker.Item label="Deliver" value="Deliver" /> 
                                    </Picker>
                                </View>
                            </>):(<>
                            {/* IOS */}
                                <View>
                                    <Picker style={styles.iOSPickerSelectionInputView} 
                                        itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
                                        selectedValue={DeliverySelectedValue}
                                        onValueChange={(itemValue) =>this.setDeliverySelectedValue(itemValue)}>
                                            <Picker.Item label="Delivery Method"/> 
                                            <Picker.Item label="Pick Up" value="Pick Up" /> 
                                            <Picker.Item label="Deliver" value="Deliver" /> 
                                    </Picker>
                                </View>
                            </>)}            
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
                </ScrollView>
            </>)}

            {DoNotShowMainTvScreen ? <></>:(<>
                <ScrollView showsVerticalScrollIndicator={false} >

                <View style={{height:20}} ></View>
                <View style={styles.TcNewsIconMainView}>
                <Image source={TcTvImg} style={styles.TcNewsIcon}/>
                </View>
                <Text style={styles.AboutText} >Talk the Walk is live streamed every Friday at 6.00pm-6:30pm UK, 8:00pm UG and 10:00pm USA with your host Mr Prosper</Text>
                <View style={styles.horizontalLine} ></View>

                <View style={{height:20}}></View>
                <Text style={styles.AboutText} >Our Shows</Text>
                {TalkTheWalk && TalkTheWalk.map((item, index) => (
                    <View key={index}>
                        <View style={styles.VideoView}>
                            <YoutubePlayer height={210} videoId={item.Video}/>
                        </View>
                        <View style={{marginTop:0}} >
                        <Text style={styles.AboutText} >{item.Title}</Text>
                        </View>
                    </View>
                ))}
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
                {DoNotShowMainFunnyScreen ?<></>:(<>
                <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={{height:15}} ></View>

                    <Text style={styles.AboutText} >Our Shows</Text>
                    {Funny && Funny.map((item, index) => (
                        <View key={index}>
                            <View style={styles.VideoView}>
                                <YoutubePlayer  height={210} videoId={item.Video}/>
                            </View>
                            <View style={{marginTop:0}} >
                            <Text style={styles.AboutText} >{item.Title}</Text>
                            </View>
                        </View>
                    ))}
                <View style={{height:10}} ></View>
            </ScrollView>

            </>)}

                <View style={styles.MainBottomSpaceView}></View>
                
            </View>

    );
}
}
