
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from "./stylesheet";
import {AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { COLORS } from './Colours';
import {APIPostRating,APIListAllCountries,APIListAllChats,
        APIMemberChatsPost,APIMemberChatsLogIn,APIListRatingChats 
    } from './DataFileApis';
import { convertToLowerCase,convertToUpperCase } from './Functions';

export default class Chat extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        AllMemberChats:[],
        AllChatRatings:[],
        IsMemberLogeIn:false,
        // Screens
        DoNotShowChatScreen:false,
        DoNotShowRatingScreen:true,
        DoNotShowRatingDetailsScreen:false, // always false
        DoNotShowChatRatingScreen:true,

        // On chat
        DoNotShowMainNavBtnScreen:false, // should be false always
        DoNotShowChatScreen:false,

        // chat ----
        ChartCardNo:'',
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
        ChatCardNoLogIn:'',

        

        

    }
    
}

componentDidMount() 
{
    this.initializeClubUserName ();
    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        // this.setState({ClubMemberName:})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data"+"\n\n"+"Connect To Internet And Open App Again");})
    
    

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
            let Name = jsonData[0].ChatUserName;
            let CardNo = jsonData[0].ChatCardNo;

            this.setState({ChartCardNo:CardNo});
            this.setState({ChatMemberName:Name});
            this.showInnerChatWindowScreen();
        }
        else {this.showInnerChatLogInScreen();}
        })
    }catch (error) { console.log(error)}

}

setChatChat = (text) =>{this.setState({ChatChat:text});}
setCountrySelectedValue  = (text) =>
{
    const CountriesArr = [...this.state.Countries]
    let Index = text.split(':');
    let country = Index[0]
    let arraryIndex = Index[1]
    let code = CountriesArr[arraryIndex]
    let phoneCode = code.countryCode
    // countryCode
    this.setState({PhoneCountryCode:phoneCode});
    this.setState({CountrySelected:country});
}
continueToOrdersView = () =>
{

    this.getAllChats()
    setTimeout(()=>{this.setState({CustomerNotSignedIn:false})},1000)
    this.setState({ShowSplashScreen:true});
    setTimeout(()=>{this.setState({ShowSplashScreen:false})},4000)
}

setChatRatingValue  = (text) => {this.setState({ChatRatingValue:text});}
setChatCardNoLogIn = (text) =>{this.setState({ChatCardNoLogIn:text});}



// log in 
setClubLogInName = (text) =>{this.setState({ClubLogInName:text});}
setClubLogInPassword = (text) =>{this.setState({ClubLogInPassword:text});}

showChatScreen = () =>
{
    this.setState({DoNotShowRatingScreen:true})
    this.setState({DoNotShowChatScreen:false})
}

showRatingScreen = () =>
{
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowRatingScreen:false})
}

showInnerChatLogInScreen = () =>
{
    this.setState({DoNotShowChatWindowScreen:true})
    this.setState({DoNotShowChatLogInScreen:false})
}
showInnerChatWindowScreen = () =>
{
    this.setState({DoNotShowChatLogInScreen:true})
    this.setState({DoNotShowChatWindowScreen:false})
    this.getAllChats();
    setInterval(this.getAllChats,6000);

}

showChatRatingDetailsScreen = () =>
{
    this.setState({DoNotShowChatRatingScreen:true})
    this.setState({DoNotShowRatingDetailsScreen:false}) 
}

showChatRatingScreen = (id) =>
{
    this.setState({ChartRatingId:id})
    this.setState({DoNotShowRatingDetailsScreen:true}) 
    this.setState({DoNotShowChatRatingScreen:false})
}


getAllChats = () =>
{
    let ClubNo = this.state.ChartCardNo;
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
    let ChatCardNoLogIn = convertToLowerCase(this.state.ChatCardNoLogIn);

    if ((ChatCardNoLogIn.length == 0))
        {Alert.alert('Warning','Please Tc Number Is Required')}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIMemberChatsLogIn+ChatCardNoLogIn)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
                {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                
                if ((CardNo !== ChatCardNoLogIn))
                    {Alert.alert("Sorry","\n\n Invalid User Tc Number \n\n Try Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    try {
                        let MemberDetails={ChatUserName:Name,ChatCardNo:CardNo}
                        const ChatDetails  = []
                        ChatDetails.push(MemberDetails)
                        await AsyncStorage.setItem('ChatDetails',JSON.stringify(ChatDetails));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ChartCardNo:CardNo});
                    this.setState({ChatMemberName:Name});
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


chatLogInWithNumber = async () =>
{
    let ChatCardNoLogIn = this.state.ChatCardNoLogIn;
    console.log("==="+ChatCardNoLogIn)
    if ((ChatCardNoLogIn.length == 0))
        {Alert.alert('Warning','Please Phone Number Is Required')}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIMemberChatsLogIn+ChatCardNoLogIn)

            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
                {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                
                if ((CardNo !== ChatCardNoLogIn))
                    {Alert.alert("Sorry","\n\n Invalid Phone Number \n\n Try Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    try {
                        let MemberDetails={ChatCardNo:CardNo}
                        const ChatDetails  = []
                        ChatDetails.push(MemberDetails)
                        await AsyncStorage.setItem('ChatDetails',JSON.stringify(ChatDetails));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ChartCardNo:CardNo});
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
    let cardNo = this.state.ChartCardNo !==''?this.state.ChartCardNo :this.state.ChatCardNoLogIn;
    console.log('======='+cardNo)
    let memberName = this.state.ChatMemberName;
    let chat = this.state.ChatChat;

    if ((chat.length == 0))
    {Alert.alert("Warning","\n \n Chat Input \n \n Can Not Be Empty")}

    else
    {
        try
        {
            const postRequest = await axios.post(APIMemberChatsPost,
                {
                    "CardNo":cardNo,
                    "MemberName":memberName,
                    "Chat":chat,
                }
            )
            let result = postRequest.data.status;
            Alert.alert("Chat Status",result);
        }
        catch (error)
            {Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n")};
    }
}

postUserRating = async () => 
{
    let Id = this.state.ChartRatingId;
    let Value = this.state.ChatRatingValue;

    // console.log(Id)
    if ((Value.length == 0))
    {Alert.alert("Warning","\n \n Please Select A Star")}

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
            {Alert.alert("An Error","Check Your Network Connections\n\n")};
    }
}

render() {

    const { DoNotShowRatingScreen,DoNotShowChatScreen,DoNotShowChatRatingScreen,DoNotShowRatingDetailsScreen} = this.state;
    const {DoNotShowMainNavBtnScreen,DoNotShowChatWindowScreen,DoNotShowChatLogInScreen} = this.state;

    const {ChatMemberName,AllMemberChats,ChatRatingValue,AllChatRatings} = this.state;
    const {PhoneCountryCode,Countries,CountrySelected,CountrySelectedValue} = this.state;

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
                    <Text style = { styles.productTopTitleName}> Club </Text>
                </View> */}
            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View>
            </View>
                
                    <View style={styles.MainTopHeaderView} >
                        <View style={styles.MainTopHeaderTextView}>
                            <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc Chats </Text>
                        </View>
                    </View>
                    <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
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
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showChatScreen} >
                                <Text style = {styles.btnText}> My Chats  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showRatingScreen} >
                                <Text style = {styles.btnText}> Rate Chats  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.logOutUserFromChat} >
                                <Text style = {styles.btnText}> Chat Sign Out  </Text>
                            </TouchableOpacity>
                            
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                            </View>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                        </ScrollView>
                    </View>
                    </>)}
                    </View>
                    <View style={{height:20}}></View>

            {DoNotShowChatScreen?<></>:(<>
                <ScrollView showsVerticalScrollIndicator={false} >
                {DoNotShowChatLogInScreen?<></>:(<>
                    <View style={styles.orderListDetailsText} >

                        <View style={styles.ApplyCardView22} >
                            <View style={{height:10}}></View>
                                <Text style={styles.chatCustomerText} > Start A Chat With Your Tc Number  </Text>
                            <View style={{height:10}}></View>
                        
                        <View style={styles.LogInPinView}>
                            <TextInput style={[styles.input,styles.input1]} placeholder="Eg.TCC113"  
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setChatCardNoLogIn(text)}
                            />
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn5]} onPress={this.chatLogIn} >
                                <Text style = {styles.btnText}> Next  </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{height:10}}></View>
                            <Text style={styles.chatCustomerText} > Use Phone Number For None Member  </Text>
                        <View style={{height:10}}></View>
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={CountrySelectedValue}
                                
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Select Your Country"/> 
                                    {Countries && Countries.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.countryName} value={item.countryName+':'+Index} /> 
                                    ))}
                            </Picker>
                        </View>

                        {CountrySelected ?(<>
                            <View style={styles.LogInPinView}>
                                <TextInput style={[styles.input,styles.input1]} defaultValue={PhoneCountryCode}  
                                placeholderTextColor = "#5800c4"  onChangeText={text => this.setChatCardNoLogIn(text)}
                                />
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn5]} onPress={this.showInnerChatWindowScreen} >
                                    <Text style = {styles.btnText}> Post  </Text>
                                </TouchableOpacity>
                            </View>

                            {/* <View style={styles.LogInPinView}>
                                <TextInput style={[styles.input,styles.input1]} defaultValue={PhoneCountryCode}  
                                placeholderTextColor = "#5800c4"  onChangeText={text => this.setChatCardNoLogIn(text)}
                                />
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn5]} onPress={this.chatLogInWithNumber} >
                                    <Text style = {styles.btnText}> LogIn  </Text>
                                </TouchableOpacity>
                            </View> */}
                        </>):(<></>)}
                        </View>
                    </View>
                </>)}

                {DoNotShowChatWindowScreen?<></>:(<>
                    <View  >
                    <View>
                            <View style={{height:10}}></View>
                                <Text style={[styles.chatCustomerText]} >Hello : {ChatMemberName} </Text>
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
                        <View style={styles.ApplyCardView22} >
                            <TextInput style={styles.chatInput} placeholder="Your Chat"  multiline={true}
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setChatChat(text)}
                            />
                            <View style={{alignItems:'center'}} >
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.postMemberChat} >
                                    <Text style = {styles.btnText}> Send  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                            </View>
                        </View>
                        </View>
                </>)}
                </ScrollView>
            </>)}





            {DoNotShowRatingScreen?<></>:(<>
                <ScrollView showsVerticalScrollIndicator={false} >
                {DoNotShowRatingDetailsScreen?<></>:(<>
                    {AllChatRatings && AllChatRatings.map((item, index) => (

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View key={index} style={styles.chatRatings} >
                        <View style={styles.mainTableView}>
                            <View style={styles.tableTrView2} >
                                <Text  style={styles.trTdText}>{convertToUpperCase(item.CardNo)}</Text>
                            </View>
                            <View style={styles.tableTrView2} >
                                <Text  style={styles.trTdText}>{item.ChatDate}</Text>
                            </View>

                            <View style={styles.tableTrView2}>
                                <Text  style={styles.trTdText}>{item.ChatTime}</Text>
                            </View>
                            
                            <View style={styles.tableTrView2}>
                                {/* <Text  style={styles.trTdText}>{item.id}</Text> */}
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{this.showChatRatingScreen(item.id)}} style={styles.ratingChatBtn} >
                                        <Text style={styles.ratingChatBtnText} >Rate Chat</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style={styles.tableTrView2}>
                                <View style={{width:20}} ></View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                    ))}
                </>)}
                {DoNotShowChatRatingScreen?<></>:(<>
                
                    <View>
                    
                        {/* <TextInput style={styles.input} placeholder="Your Chat"  
                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setChatChat(text)}
                        /> */}
                        <View style={{height:30}} ></View>
                        <Text style={styles.btnText2} >Rate The Service Received</Text>
                        <View style={{height:30}} ></View>
                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={ChatRatingValue}
                                
                                onValueChange={(itemValue) =>this.setChatRatingValue(itemValue)}>
                                    <Picker.Item label="Give Us A Star"/> 
                                    <Picker.Item label="1 Star" value="1 Star"/> 
                                    <Picker.Item label="2 Stars" value="2 Stars"/> 
                                    <Picker.Item label="3 Stars" value="3 Stars"/> 
                                    <Picker.Item label="4 Stars" value="4 Stars"/> 
                                    <Picker.Item label="5 Stars" value="5 Stars"/> 
                            </Picker>
                        </View>
                        <View style={{alignItems:'center', marginTop:20}} >
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.postUserRating} >
                                <Text style = {styles.btnText}> Send  </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showChatRatingDetailsScreen()}}  >
                                <Text style = {styles.btnText}> Back  </Text>
                            </TouchableOpacity>
                            <View style={{height:20}} ></View>
                        </View>
                    </View>
                </>)}
                </ScrollView>
            </>)}

            </View>
    );
}
}
