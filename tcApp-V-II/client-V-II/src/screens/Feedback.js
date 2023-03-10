
import React from 'react';
import { Text, View, Alert,TextInput,Linking,TouchableOpacity,ScrollView} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import styles from "./stylesheet";
import {AntDesign,MaterialIcons,Entypo, FontAwesome,Feather,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { COLORS } from './Colours';
import {APIPostRating,APIListAllChats,
        APIMemberChatsPost,APIMemberChatsLogIn,APIListRatingChats 
    } from './DataFileApis';
import { 
        convertToLowerCase,convertToUpperCase,EMPTY_INPUTS_ERROR,
        POSTING_ERROR, 
        renderTopHeaderRadiusWithOutABtn,
        renderTopHeaderRadiusWithABtn
        } from './Functions';

export default class FeedBack extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        AllMemberChats:[],
        AllChatRatings:[],
        IsMemberLogeIn:false,

        // Screens
        DoNotShowMenuMainScreen:false,
        DoNotShowChatScreen:true,
        DoNotShowChatWindowScreen:true,
        DoNotShowFeedBackMainScreen:true,
    


        // chat ----
        UserChatNumber:'',
        ChatMemberName:'',
        ChatChat:'',
        ChatRatingValue:'',
        ChartRatingId:'',
        CountrySelectedValue:'',
        PhoneCountryCode:'',
        CountrySelected:'',


        // Member Log In
        ClubLogInName:'',
        ClubLogInPassword:'',
        UserChatNumber:'',

        

        

    }
    
}

componentDidMount() 
{
    // this.initializeClubUserName ();
}


initializeClubUserName = () => 
{
    /// Chats=========
    try 
    {   
        AsyncStorage.getItem('ChatDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let CardNo = jsonData[0].ChatCardNo;

            this.setState({UserChatNumber:CardNo});
            this.showInnerChatWindowScreen();
        }
        else {this.showInnerChatLogInScreen();}
        })
    }catch (error) { console.log(error)}

}
tripleCareLtd = async () => {await WebBrowser.openBrowserAsync('https://tcholidayhomes.com');};

setChatChat = (text) =>{this.setState({ChatChat:text});}
continueToOrdersView = () =>
{

    this.getAllChats()
    setTimeout(()=>{this.setState({CustomerNotSignedIn:false})},1000)
    this.setState({ShowSplashScreen:true});
    setTimeout(()=>{this.setState({ShowSplashScreen:false})},4000)
}

setChatRatingValue  = (text) => {this.setState({ChatRatingValue:text});}
setUserChatNumber = (text) =>{this.setState({UserChatNumber:text});}


showChatScreen = () =>
{
    this.setState({DoNotShowFeedBackMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowRatingScreen:true})
    this.setState({DoNotShowChatScreen:false})
}

showMenuMainScreen = () =>
{
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowFeedBackMainScreen:true})
    this.setState({DoNotShowChatLogInScreen:true})
    this.setState({DoNotShowMenuMainScreen:false})
}
showInnerChatLogInScreen = () =>
{
    this.setState({DoNotShowFeedBackMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowChatWindowScreen:true})
    this.setState({DoNotShowChatLogInScreen:false})
}
showInnerChatWindowScreen = () =>
{
    this.setState({DoNotShowFeedBackMainScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowChatLogInScreen:true})
    this.setState({DoNotShowChatWindowScreen:false})
    this.getAllChats();
    setInterval(this.getAllChats,6000);

}
showFeedBackMainScreen = () =>
{
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowChatLogInScreen:true})
    this.setState({DoNotShowChatWindowScreen:true})
    this.setState({DoNotShowFeedBackMainScreen:false})
}


getAllChats = () =>
{
    let ClubNo = this.state.UserChatNumber;
    axios.get(APIListAllChats+ClubNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AllMemberChats:[...JSON.parse(results)]})
        if (results.length === 0)
            {this.setState({CustomerDetailsFound:false})}
        })
    .catch(err=>{ console.log("=====>>>"+err)}) 

    axios.get(APIListRatingChats+ClubNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AllChatRatings:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log("=====>>>"+err)})
}

chatLogIn = async () =>
{
    let number = this.state.UserChatNumber;
    console.log("chatLogIn ::"+number)
    if ((number.length === 0))
        // {Alert.alert('An Error',EMPTY_INPUTS_ERROR)}
        {Alert.alert('An Error',EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIMemberChatsLogIn+number)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length === 0){this.setState({UserChatNumber:number});this.showInnerChatWindowScreen();}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                
                if ((CardNo !== number))
                    {Alert.alert("Sorry","\n\n Invalid Mobile Number \n\n Try Again")}

                else
                    {
                        let Name= jsonResults[0].Name;
                        try {
                            let MemberDetails={ChatCardNo:Name}
                            const ChatDetails  = []
                            ChatDetails.push(MemberDetails)
                            await AsyncStorage.setItem('ChatDetails',JSON.stringify(ChatDetails));
                            } 
                        catch (error) {console.log(error)}
                        this.setState({UserChatNumber:CardNo});
                        this.showInnerChatWindowScreen();
                    }
                }
            }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+error)
            };
    }
}

logOutUserFromChat = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('ChatDetails');
        Alert.alert("Warning","\n\n You Have Logged Out \n\n From Chat")

    }catch (error) { console.log(error)}
}

postMemberChat = async () => 
{
    let cardNo = this.state.UserChatNumber;
    console.log('======='+cardNo)
    let chat = this.state.ChatChat;

    if ((chat.length === 0))
    {Alert.alert("An Error", EMPTY_INPUTS_ERROR)}

    else
    {
        try
        {
            const postRequest = await axios.post(APIMemberChatsPost,
                {
                    "CardNo":cardNo,
                    "MemberName":cardNo,
                    "Chat":chat,
                }
            )
            let result = postRequest.data.status;
            Alert.alert("Chat Status",result);
        }
        catch (error)
            {Alert.alert("An Error",POSTING_ERROR)};
    }
}

postUserRating = async () => 
{
    let Id = this.state.ChartRatingId;
    let Value = this.state.ChatRatingValue;

    // console.log(Id)
    if ((Value.length == 0))
    {Alert.alert("An Error",EMPTY_INPUTS_ERROR)}

    else
    {
        try
        {
            const postRequest = await axios.post(APIPostRating,
                {
                    "id":Id,
                    "UserRating":Value,
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

    const {DoNotShowChatScreen,DoNotShowFeedBackMainScreen} = this.state;
    const {DoNotShowChatWindowScreen,DoNotShowChatLogInScreen,DoNotShowMenuMainScreen} = this.state;

    const {AllMemberChats,UserChatNumber,ChatRatingValue,AllChatRatings} = this.state;

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
                <View style={styles.MainTopHeaderTextView1}>
                    <View style={{height:10}} ></View>
                    <Text style={styles.MainTopHeaderTextLabel}> Tc App FeedBack {"\n"} And Support  </Text>
                </View>
            </View>

            {DoNotShowMenuMainScreen?(<></>):(<>
                {renderTopHeaderRadiusWithOutABtn()}
                <View style={styles.MenuCardRowView} >
                    <View style={styles.MenuCardView} >
                        <TouchableOpacity onPress={this.showChatScreen} >
                            <View style={{height:20}} ></View>
                            <View style={{alignItems:'center'}} >
                                <Ionicons name="ios-chatbubble-ellipses" size={50} color={COLORS.colourNumberOne} />
                                <View style={{height:20}} ></View>
                                <Text style = {styles.MenuCardText}> Live Chat</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.MenuCardView} >
                        <TouchableOpacity onPress={this.showFeedBackMainScreen}>
                            <View style={{height:20}} ></View>
                            <View style={{alignItems:'center'}} >
                                <MaterialIcons name="feedback" size={50} color={COLORS.colourNumberOne} />
                                <View style={{height:20}} ></View>
                                <Text style = {styles.MenuCardText}> FeedBack</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </>)}
        

            {DoNotShowChatScreen?<></>:(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                <ScrollView showsVerticalScrollIndicator={false} >
                {DoNotShowChatLogInScreen?<></>:(<>
                    <View >

                        <View style={{height:10}}></View>
                            <Text style={styles.chatCustomerText} > Start A Chat With Your {"\n"} Mobile Number {"\n\n"} Please Include Country Code  </Text>
                        <View style={{height:10}}></View>

                        <View >
                            <TextInput style={styles.UpdatedInput} placeholder="Your Mobile Number" onChangeText={text => this.setUserChatNumber(text)} 
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                            <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.chatLogIn} >
                                <Text style = {styles.UpdatedBtnText}> Next  </Text>
                                <View style={styles.ArrowMainViewLogIn}>
                                    <AntDesign name="arrowright" style={styles.ArrowIconLogIn} size={25} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>)}

                {DoNotShowChatWindowScreen?<></>:(<>
                    {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                    <View  >
                    <View>
                            <View style={{height:10}}></View>
                                <Text style={[styles.chatCustomerText]} >Hello : {UserChatNumber} </Text>
                            <View style={{height:10}}></View>
                        </View>
                        <View>
                        {AllMemberChats && AllMemberChats.map((item,index) => (
                            <View key={index} >
                                <View style={{height:20}} ></View>
                                <Text style={[styles.chatCustomerText]} > {item.Chat}  </Text>
                                <Text style={[styles.chatCustomerText]} > {item.ChatDate}  </Text>
                                <Text style={[styles.chatCustomerText]} > {item.ChatTime}  </Text>
                                <Text style={[styles.chatCustomerText]} > {item.UserRating}  </Text>


                                <View style={{height:8}}  ></View>
                                <Text style={[styles.chatReplyText]} > { item.Reply}</Text>
                                <Text style={[styles.chatReplyText]} >{item.ReplyDate}</Text>
                                <Text style={[styles.chatReplyText]} >{item.ReplyTime}</Text>
                                <View style={{height:20}} ></View>
                            </View>
                            ))}
                        </View>
                        <View  >
                            <TextInput style={styles.chatInput} placeholder="Your Chat"  multiline={true} selectionColor={COLORS.colourNumberOne}
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setChatChat(text)}/>
                            <View style={{alignItems:'center'}} >
                                <TouchableOpacity style={[styles.UpdatedMainNavigationBtn, styles.MainNavigationBtn4]} onPress={()=>this.postMemberChat()} >
                                    <Text style = {styles.UpdatedBtnText}> Send  </Text>
                                    <View style={styles.ArrowMainViewLogIn}>
                                        <MaterialCommunityIcons name="send-circle" style={styles.ArrowIconLogIn} size={25} color="white" />
                                    </View>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                            </View>
                        </View>
                        </View>
                </>)}
                </ScrollView>
            </>)}



            {DoNotShowFeedBackMainScreen?<></>:(<>
                {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <Text  style={styles.AboutTitleText}>Triple Care Ltd FeedBacks </Text>
                    <View style={{height:30}} ></View>

                    <Text  onPress={()=>{Linking.openURL('tel:+447868651393');}} style={styles.UpdatedAboutText}>
                        <Feather name="phone-call" size={24} color={COLORS.orangeColorOne} />{" "}{" "}
                        +44 7868 651 393 
                    </Text>
                    <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=447868651393');}} style={styles.UpdatedAboutText}>
                        <Ionicons name="ios-logo-whatsapp" size={24} color={COLORS.orangeColorOne} />{" "}{" "}
                        +44 7868 651 393 
                    </Text>
                    <Text  onPress={()=>{Linking.openURL('mailto:info@TripleCareLtd.com');}} style={styles.UpdatedAboutText}>
                        <Entypo name="email" size={24} color={COLORS.orangeColorOne} />{" "}{" "}
                        info@TripleCareLtd.com
                    </Text>

                    <Text  onPress={()=>{Linking.openURL('https://www.talkthewalk.tv');}} style={styles.UpdatedAboutText}>
                        <MaterialCommunityIcons name="web" size={24} color={COLORS.orangeColorOne} />{" "}{" "}
                        www.talkthewalk.tv
                    </Text>
                    <View style={{height:20}} ></View>
                    <Text  style={styles.AboutText}>Your Feed Back Is Important </Text>
                    <Text  style={styles.AboutText}>Thank You</Text>
                </ScrollView>
            </>)}















            </View>
    );
}
}
