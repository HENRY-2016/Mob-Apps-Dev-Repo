
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./stylesheet";
import {Picker} from '@react-native-picker/picker';
import { COLORS } from './Colours';
import { Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import {
        APIProvidersListAll,APIProviderMemberByCardNo,APIProviderServicesPaymentsByCardNo,
        APIProviderServicesClearedByCardNo,APIProviderServicesPendingByCardNo,
        APIPostProviderUpdate,APIListProviderDetailsByCardNo
        } from './DataFileApis';

export default class Providers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            ProvidersList:[],
            ProviderPending:[],
            ProviderCleared:[],
            ProviderPayments:[],
            ProvidersDetails:[],

    
            // Screens
            DoNotShowProvidersScreen:false,
            DoNotShowLogInScreen:true,
            DoNotShowProviderAccountScreen:true,
            DoNotShowProviderLogInScreen:false, // should be false
            IsMemberLogeIn:false, // should always be false
            DoNotShowProviderPaymentsInnerScreen1:false,
            DoNotShowProviderPaymentsInnerScreen2:true,
            DoNotShowProvidersListScreen1:false,
            DoNotShowProvidersListScreen2:true,

            // Provider Inner Screen
            DoNotShowProviderClearedScreen:true,
            DoNotShowProviderPendingScreen:true,
            DoNotShowProviderPaymentsScreen:true,

            // Provider
            ProviderLogInName:'',
            ProviderLogInPassword: '',
            ClubMemberName:'',
            ClubMemberCardNo:'',
            ClubMemberCategory:'',
            ClubMemberPayment:'',
            ClubMemberArea:'',
            ClubMemberRegistration:'',
            ProviderUpdate:'',
            ServiceId:'',
            ServiceCardNo:'',
            ServiceName:'',
            SelectedServiceProviderName:'',

        }
        
    }
    
componentDidMount() {
    this.initializeProvider();
    axios.get(APIProvidersListAll)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ProvidersList:[...JSON.parse(results)]})
        })
    .catch(err=>{ Alert.alert("Error","\n\nCan Not Load App Data"+"\n\n"+"Connect To Internet And Open App Again");})
}

initializeProvider = () => 
{
    try 
    {   
        AsyncStorage.getItem('ProviderDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].ClubUserName;
            let CardNo = jsonData[0].ClubMemberCardNo;
            let Category= jsonData[0].ClubMemberCategory;
            let Registration= jsonData[0].Registration;
            let Payment= jsonData[0].Payment;
            let Area = jsonData[0].Area;

            this.setState({ClubMemberName:Name});
            this.setState({ClubMemberCardNo:CardNo});
            this.setState({ClubMemberCategory:Category});
            this.setState({ClubMemberPayment:Payment});
            this.setState({ClubMemberArea:Area});
            this.setState({ClubMemberRegistration:Registration});
            this.setState({IsMemberLogeIn:true});
            this.getAllProviderData(CardNo);
        }
        else {this.setState({IsMemberLogeIn:false})}
        })
    }catch (error) { console.log(error)}
}
getAllProviderData = (ClubMemberCardNo) =>
{
    axios.get(APIProviderServicesPaymentsByCardNo+ClubMemberCardNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ProviderPayments:[...JSON.parse(results)]})
        })
    .catch()
    axios.get(APIProviderServicesClearedByCardNo+ClubMemberCardNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ProviderCleared:[...JSON.parse(results)]})
        })
    .catch()
    axios.get(APIProviderServicesPendingByCardNo+ClubMemberCardNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ProviderPending:[...JSON.parse(results)]})

        })
    .catch(err=>{ console.log("=====>>>"+err)})
    
}
// log in 
setProviderLogInName = (text) =>{this.setState({ProviderLogInName:text});}
setProviderLogInPassword = (text) =>{this.setState({ProviderLogInPassword:text});}
setProviderUpdate  = (text) => {this.setState({ProviderUpdate:text});}

showProviderClearedInnerScreen = () =>
{
    this.setState({DoNotShowProviderPendingScreen:true})
    this.setState({DoNotShowProviderPaymentsScreen:true})
    this.setState({DoNotShowProviderClearedScreen:false})
}

showProviderPaymentsInnerScreen = () =>
{
    this.setState({DoNotShowProviderClearedScreen:true})
    this.setState({DoNotShowProviderPendingScreen:true})
    this.setState({DoNotShowProviderPaymentsScreen:false})
}

showProviderPendingInnerScreen = () =>
{
    this.setState({DoNotShowProviderClearedScreen:true})
    this.setState({DoNotShowProviderPaymentsScreen:true})
    this.setState({DoNotShowProviderPendingScreen:false})
}


showProvidersScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowProviderAccountScreen:true})
    this.setState({DoNotShowProvidersScreen:false})
}

showLogInScreen = () =>
{
    this.setState({DoNotShowProvidersScreen:true})
    this.setState({DoNotShowProviderAccountScreen:true})
    this.setState({DoNotShowLogInScreen:false})
}
showProviderAccountScreen = () =>
{
    this.setState({DoNotShowProvidersScreen:true})
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowProviderAccountScreen:false})
}

showProviderPaymentsInnerScreen1 = () =>
{
    this.setState({DoNotShowProviderPaymentsInnerScreen2:true})
    this.setState({DoNotShowProviderPaymentsInnerScreen1:false}) 
}

showProviderPaymentsInnerScreen2 = (id,No,Name) =>
{
    this.setState({ServiceCardNo:No});
    this.setState({ServiceName:Name});
    this.setState({ServiceId:id})
    this.setState({DoNotShowProviderPaymentsInnerScreen1:true}) 
    this.setState({DoNotShowProviderPaymentsInnerScreen2:false})
}

showProvidersListScreen1 = () =>
{
    this.setState({DoNotShowProvidersListScreen1:false})
    this.setState({DoNotShowProvidersListScreen2:true})
}

showProvidersListScreen2 = (No,Name) =>
{
    console.log(No+Name)
    this.setState({SelectedServiceProviderName:Name})
    axios.get(APIListProviderDetailsByCardNo+No)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ProvidersDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log("=====>>>"+err)})
    this.setState({DoNotShowProvidersListScreen1:true})
    this.setState({DoNotShowProvidersListScreen2:false})
    
}
logOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('ProviderDetails');
        this.setState({IsMemberLogeIn:false});
        Alert.alert("Warning","\n\n You Have Logged Out")

    }catch (error) { console.log(error)}
}
logInUser = async () =>
{
    let ProviderLogInName = this.state.ProviderLogInName;
    let ProviderLogInPassword = this.state.ProviderLogInPassword;

    if ((ProviderLogInName.length == 0) || (ProviderLogInPassword.length == 0))
        {Alert.alert('Warning','Please All Fields Are Required ')}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIProviderMemberByCardNo+ProviderLogInName)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                let userPassword  = jsonResults[0].Password;
                
                if ((CardNo !== ProviderLogInName)&&(userPassword !== ProviderLogInPassword ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    
                    let Name= jsonResults[0].Name;
                    let Type = jsonResults[0].MemberType;
                    let Payment = jsonResults[0].PaymentType;
                    let Registration = jsonResults[0].Registration;
                    let Area = jsonResults[0].Area;

                    try {
                        let MemberDetails={ClubUserName:Name,ClubMemberCardNo:CardNo,ClubMemberCategory:Type,Registration:Registration,Payment:Payment,Area:Area}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('ProviderDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ClubMemberName:Name});
                    this.setState({ClubMemberCardNo:CardNo});
                    this.setState({ClubMemberCategory:Type});
                    this.setState({ClubMemberPayment:Payment});
                    this.setState({ClubMemberArea:Area});
                    this.setState({ClubMemberRegistration:Registration});
                    this.setState({IsMemberLogeIn:true});
                    this.getAllProviderData (CardNo)
                    this.showProviderAccountScreen();
                }
            }
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+error)
            };
    }
}
postProviderUpdate = async () => 
{
    let Id = this.state.ServiceId;
    let Value = this.state.ProviderUpdate;

    // console.log(Id)
    if ((Value.length == 0))
    {Alert.alert("Warning","\n \n Please Select Option")}

    else
    {
        try
        {
            const postRequest = await axios.post(APIPostProviderUpdate,
                {
                    "id":Id,
                    "Status":Value,
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
        
        const {ProvidersList,IsMemberLogeIn,ProviderPending,ProviderCleared,ProviderPayments} = this.state;
        const {ClubMemberName,ClubMemberCardNo,ClubMemberCategory,ClubMemberPayment,ClubMemberArea,ClubMemberRegistration} = this.state
        const {DoNotShowProviderAccountScreen,DoNotShowProviderClearedScreen,DoNotShowProviderPendingScreen,DoNotShowProviderPaymentsScreen} = this.state;
        const {DoNotShowProvidersScreen,DoNotShowLogInScreen,DoNotShowProviderLogInScreen,DoNotShowProvidersListScreen1,DoNotShowProvidersListScreen2} = this.state;
        const {ProviderUpdate,DoNotShowProviderPaymentsInnerScreen2,DoNotShowProviderPaymentsInnerScreen1}=this.state;
        const {ServiceCardNo,ServiceName,SelectedServiceProviderName,ProvidersDetails}=this.state;
    
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
                        <Text style = { styles.productTopTitleName}> Tc jProviders </Text>
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
                            <Text style={styles.MainTopHeaderTextLabel}>Tc Providers  </Text>
                        </View>
                    </View>
                    <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
                    <View style={styles.MainTopRadiusSpaceBottomView} ></View>

                    <View style={styles.MainNavigationBtnView}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                            </View>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showProvidersScreen} >
                                <Text style = {styles.btnText}>Service Providers </Text>
                            </TouchableOpacity>

                            {IsMemberLogeIn?(<>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showProviderAccountScreen} >
                                <Text style = {styles.btnText}> My Account </Text>
                            </TouchableOpacity>
                            </>):(<>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showLogInScreen} >
                                    <Text style = {styles.btnText}> Log In </Text>
                                </TouchableOpacity>
                            </>)}
                            
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                            </View>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                        </ScrollView>
                    </View>
                    <View style={{height:20}}></View>
        
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Home Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowProvidersScreen ?<></>:(<>
                        <View style={{height:20}} ></View>
                        {DoNotShowProvidersListScreen1 ?<></>:(<>
                            <View style = {[styles.mainTableTitleHandleView]} >
                                <Text style = { styles.tableTitleHandleText}>Providers List </Text>
                            </View>

                            <View style={styles.mainTableOuterView} >
                            {ProvidersList && ProvidersList.map((item, index) => (
                                <View key={index}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                
                                    <View style={styles.mainTableView}>
                                        <View style={styles.tableTrView} >
                                            <Text  style={styles.trTdText}>{item.CardNo}</Text>
                                        </View>

                                        <View style={styles.tableTrView} >
                                            <Text  style={styles.trTdText}>{item.Name}</Text>
                                        </View>

                                        <View style={styles.tableTrView} >
                                            <Text  style={styles.trTdText}>{item.Area}</Text>
                                        </View>

                                        <View style={styles.tableTrView}>
                                            <View style={styles.ratingChatBtnView}>
                                                <TouchableOpacity onPress={()=>{this.showProvidersListScreen2(item.CardNo,item.Name)}} style={styles.ratingChatBtn2} >
                                                    <Text style={styles.ratingChatBtnText} >View Services</Text> 
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={styles.tableTrView} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                                ))}
                                </View>
                        </>)}
                        {DoNotShowProvidersListScreen2 ?<></>:(<>
                            <Text style = { styles.trTdText}>{SelectedServiceProviderName}</Text>
                            <Text style = { styles.trTdText}>Services List</Text>
                            <View style={{height:30}} ></View>
                            {ProvidersDetails && ProvidersDetails.map((item,index) =>(
                                <View key={item.id}>
                                    <Text style = { styles.trTdText}>{item.Holder1}</Text>
                                    <Text style = { styles.trTdText}>{item.Holder2}</Text>
                                    <Text style = { styles.trTdText}>{item.Holder3}</Text>
                                    <Text style = { styles.trTdText}>{item.Holder4}</Text>
                                    <Text style = { styles.trTdText}>{item.Holder5}</Text>
                                    <Text style = { styles.trTdText}>{item.Holder6}</Text>
                                </View>
                            ))}
                            <View style={{alignItems:'center', marginTop:20}} >
                                {/* <View style={{height:30}} ></View> */}
                                {/* <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={() => this.props.navigation.navigate('Claims')} >
                                    <Text style = {styles.btnText}> Claim  </Text>
                                </TouchableOpacity> */}
                                {/* <View style={{height:30}} ></View> */}
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showProvidersListScreen1()}}  >
                                    <Text style = {styles.btnText}> Back  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}} ></View>
                            </View>
                        </>)}
                    </>) }

                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Log In Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    { DoNotShowLogInScreen ? <></>:(<>

                        {DoNotShowProviderLogInScreen?<></>:(<>
                            <View style={styles.orderListDetailsText} >
                            <View style={styles.ApplyCardView22} >
                                <TextInput style={styles.input} placeholder="Provider Tc Number"  
                                placeholderTextColor = "#5800c4"  onChangeText={text => this.setProviderLogInName(text)}
                                />

                                <TextInput style={styles.input} placeholder="Password" secureTextEntry
                                placeholderTextColor = "#5800c4"  onChangeText={text => this.setProviderLogInPassword(text)}
                                />
                                

                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.logInUser} >
                                    <Text style = {styles.btnText}> Log In  </Text>
                                </TouchableOpacity>
                                <View style={{height:30}} ></View>
                            </View>
                            </View>
                        </>)}

                    </>)}

                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    User Account  Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}

                    {DoNotShowProviderAccountScreen ?<></>:(<>
                        <View style = {[styles.UserProfileView]} >
                            <View style = {{width:30}} >
                            </View>
                            <View style = {[styles.UserProfileNameView]} >
                                <Text style = {styles.btnText}>{ClubMemberName}</Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {ClubMemberRegistration} : {ClubMemberCardNo}  </Text>

                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {ClubMemberCategory} : {ClubMemberPayment}  </Text>
                                
                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {ClubMemberArea}   </Text>

                            </View>
                        </View>

                        <View style={{height:20}} ></View>
                        <View style={styles.MainNavigationBtnView}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showProviderClearedInnerScreen} >
                                    <Text style = {styles.btnText}> Cleared </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showProviderPendingInnerScreen} >
                                    <Text style = {styles.btnText}> Pending </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showProviderPaymentsInnerScreen} >
                                    <Text style = {styles.btnText}> Payments </Text>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                        </View>


                        {DoNotShowProviderClearedScreen ?<></>:(<>
                        <View style={{height:30}} ></View>
                        <View style = {[styles.mainTableTitleHandleView]} >
                            <Text style = { styles.tableTitleHandleText}> Cleared </Text>
                        </View>

                        <View style={styles.mainTableOuterView} >
                            {ProviderCleared && ProviderCleared.map((item, index) => (

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.CardNo}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.Name}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.Amount}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.Payments}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.ProviderNo}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            ))} 
                            </View>
                        </>)}

                        {DoNotShowProviderPendingScreen ?<></>:(<>
                        <View style={{height:30}} ></View>
                        <View style = {[styles.mainTableTitleHandleView]} >
                            <Text style = { styles.tableTitleHandleText}> Pending </Text>
                        </View>

                        <View style={styles.mainTableOuterView} >
                        {ProviderPending && ProviderPending.map((item, index) => (

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.CardNo}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.Name}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{item.ProviderNo}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            ))}
                            </View>
                        </>)}

                        {DoNotShowProviderPaymentsScreen ?<></>:(<>
                            {DoNotShowProviderPaymentsInnerScreen1 ?<></>:(<>
                                <View style={{height:30}} ></View>
                                <View style = {[styles.mainTableTitleHandleView]} >
                                    <Text style = { styles.tableTitleHandleText}> Payments </Text>
                                </View>

                                <View style={styles.mainTableOuterView} >
                                {ProviderPayments && ProviderPayments.map((item, index) => (

                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View key={index}>
                                        <View style={styles.mainTableView}>
                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.CardNo}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.Name}</Text>
                                            </View>
                                            
                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.Amount}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.Payments}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.ProviderNo}</Text>
                                            </View>
                                            <View style={styles.tableTrView}>
                                            <View style={styles.ratingChatBtnView}>
                                                <TouchableOpacity onPress={()=>{this.showProviderPaymentsInnerScreen2(item.id,item.CardNo,item.Name)}} style={styles.ratingChatBtn} >
                                                    <Text style={styles.ratingChatBtnText} >Picked Up</Text> 
                                                </TouchableOpacity>
                                            </View>
                                            </View>
                                            <View style={styles.tableTrView} >
                                                <View style={{width:20}} ></View>
                                            </View>
                                        </View>
                                    </View>
                                    </ScrollView>
                                    ))}
                                    </View>
                            </>)}
                            {DoNotShowProviderPaymentsInnerScreen2?<></>:(<>
                                <View>
                                
                                    <View style={{height:60}} ></View>
                                    <Text style={styles.btnText2} >Member Serviced Details</Text>
                                    <View style={{height:30}} ></View>
                                    <Text style={styles.btnText2} >{ServiceCardNo}</Text>
                                    <View style={{height:30}} ></View>
                                    <Text style={styles.btnText2} >{ServiceName}</Text>
                                    <View style={{height:30}} ></View>
                                    <View style={styles.pickerSelectionInputView1}>
                                        <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberOne}
                                            selectedValue={ProviderUpdate}
                                            
                                            onValueChange={(itemValue) =>this.setProviderUpdate(itemValue)}>
                                                <Picker.Item label="Select Option"/> 
                                                <Picker.Item label="Cleared / Picked Up" value="Cleared"/> 
                                        </Picker>
                                    </View>
                                    <View style={{alignItems:'center', marginTop:20}} >
                                        <View style={{height:30}} ></View>
                                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.postProviderUpdate} >
                                            <Text style = {styles.btnText}> Send  </Text>
                                        </TouchableOpacity>
                                        <View style={{height:30}} ></View>
                                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showProviderPaymentsInnerScreen1()}}  >
                                            <Text style = {styles.btnText}> Back  </Text>
                                        </TouchableOpacity>
                                        <View style={{height:20}} ></View>
                                    </View>
                                </View>
                            </>)}
                        </>)}


                        <View style={{width:30}} ></View>  
                        

                        <View >
                        <View style={{height:70}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.logOutUser} >
                                <Text style = {styles.btnText}> Log Out  </Text>
                            </TouchableOpacity>
                        </View>
                    
                    </>)}
                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>
        );
    }
}
