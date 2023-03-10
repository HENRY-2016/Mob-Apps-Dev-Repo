
import React from 'react';
import { Text, View,TextInput, Dimensions,Alert,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { Fontisto,FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
import {Picker} from '@react-native-picker/picker';
import { WebView } from 'react-native-webview';
import { COLORS } from './Colours';
import YoutubePlayer from 'react-native-youtube-iframe';
import {APIListFunny,APIListAllNews,APIListAllCountries,
    APIPostNewsOrder,APIListTalkTheWalk,
    APIViewPdfFile,
} from './DataFileApis';

import { viewPdfFile,EMPTY_INPUTS_ERROR,
        renderTopHeaderRadiusWithOutABtn,
        renderTopHeaderRadiusWithABtn,
        POSTING_ERROR,LOADING_ERROR,
        } from './Functions';

import TcTvImg from "../imgs/tctv.png";
import TcNewsImg from "../imgs/tcnews.png";

const {width} = Dimensions.get("window");
const height = width * 0.9; 

export default class Media extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        // data
        News:[],
        TalkTheWalk:[],
        
        // Major Screens
        DoNotShowMenuMainScreen:false,
        DoNotShowMainNewsScreen:true,
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
    .catch(err=>{Alert.alert("An Error",LOADING_ERROR);})
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
    this.setState({DoNotShowMenuMainScreen:true})
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
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowMainNewsScreen:true})
    this.setState({DoNotShowMainTvScreen:false})
}

backToMainMenuScreen = () =>
{
    this.setState({DoNotShowMainTvScreen:true})
    this.setState({DoNotShowMainNewsScreen:true})
    this.setState({DoNotShowMenuMainScreen:false})
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

    if ((name.length === 0) || (contact.length === 0) ||(copies.length === 0) ||(delivery.length === 0))
    {Alert.alert("An Error",EMPTY_INPUTS_ERROR)}

    else
    {
        try
        {
            const postRequest = await axios.post(APIPostNewsOrder,
                {
                "Name" :name,
                "Country" :"",
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
            {Alert.alert("An Error",POSTING_ERROR)};
    }
}


render() {
    
    const {TalkTheWalk,News,NewsCountry,NewsDate} = this.state;

    const {DoNotShowMainTvScreen,DoNotShowMenuMainScreen,DoNotShowMainNewsScreen,DoNotShowInnerNewsScreen1,DoNotShowInnerNewsScreen2} = this.state;

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
                    <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc News {"\n"} Tv Show  </Text>
                </View>
            </View>

            
            {DoNotShowMenuMainScreen?(<></>):(<>
                {renderTopHeaderRadiusWithOutABtn()}
                <View style={{height:10}} ></View>
                <View style={styles.MenuCardRowView} >
                    <View style={styles.MenuCardView} >
                        <TouchableOpacity onPress={this.showMainNewsScreen} >
                            <View style={{height:20}} ></View>
                            <View style={{alignItems:'center'}} >
                                <FontAwesome5 name="book-reader" size={50} color={COLORS.colourNumberOne} />
                                <View style={{height:20}} ></View>
                                <Text style = {styles.MenuCardText}> News</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.MenuCardView} >
                        <TouchableOpacity onPress={this.showMainTvScreen}>
                            <View style={{height:20}} ></View>
                            <View style={{alignItems:'center'}} >
                                <Fontisto name="tv" size={50} color={COLORS.colourNumberOne} />
                                <View style={{height:20}} ></View>
                                <Text style = {styles.MenuCardText}> TalkTheWalk</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>)}


            {DoNotShowMainNewsScreen?(<></>):(<>
                {renderTopHeaderRadiusWithABtn(this.backToMainMenuScreen)}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.TcNewsIconMainView}>
                    <Image source={TcNewsImg} style={styles.TcNewsIcon}/>
                    </View>
                    <View style={{height:20}} ></View>
                    <Text style={styles.AboutTitleText} >Grab Your Free  Copy Now</Text>

                    {/* <WebView style={{height,width, backgroundColor:COLORS.MainBodyBgColor}} originWhitelist={['*']} source={{  uri:APIGetHomeSlider}}/> */}
                    {/* <WebView style={{height,width, backgroundColor:COLORS.MainBodyBgColor}} originWhitelist={['*']} source={{  uri:APIViewPdfFile+"/02.pdf"}}/> */}

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
                            <TextInput style={styles.UpdatedBookingInput} placeholder="Country" editable = {false} defaultValue={"Date :" + NewsDate}  
                            placeholderTextColor = "#5800c4"
                            />

                            <TextInput style={[styles.UpdatedBookingInput]} placeholder="Date"  editable = {false} defaultValue={"Version :" + NewsCountry }
                            placeholderTextColor = "#5800c4" 
                            />
                            
                            <TextInput style={styles.UpdatedInput} placeholder="Name Or Tc Number" selectionColor={COLORS.colourNumberOne}  
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setBookingName(text)}/>

                            <TextInput style={[styles.UpdatedInput]} placeholder="Mobile" onChangeText={text => this.setBookingContact(text)}
                            placeholderTextColor = "#5800c4" keyboardType="numeric" selectionColor={COLORS.colourNumberOne}/>
                            
                            <TextInput style={styles.UpdatedInput} placeholder="Number Of Copies" keyboardType='numeric' selectionColor={COLORS.colourNumberOne}
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setNumberOfCopies(text)}/> 
                            
                            <TextInput style={styles.UpdatedInput} placeholder="Pick Up OR Deliver" selectionColor={COLORS.colourNumberOne}  
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setDeliverySelectedValue(text)}/>
                            
                            <View style={{alignItems:'center', marginTop:20}} >
                            <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postNewsOder} >
                                <Text style = {styles.UpdatedBtnText}> Order </Text>
                            </TouchableOpacity>
                            <View style={{height:20}} ></View>
                            <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showInnerNewsScreen1()}}  >
                                <Text style = {styles.UpdatedBtnText}> Cancel  </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            </View>
                        </View>
                        </View>
                    </>)}
                </ScrollView>
            </>)}



            {DoNotShowMainTvScreen ? <></>:(<>
                {renderTopHeaderRadiusWithABtn(this.backToMainMenuScreen)}

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
            
            <View style={styles.MainBottomSpaceView}></View>
                
            </View>

    );
}
}
