
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity,ScrollView,Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from "./stylesheet";
import {Entypo, MaterialIcons,MaterialCommunityIcons,FontAwesome,AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { COLORS } from './Colours';
import {
        APILogInClubMemberByCardNo,APIClubMemberApplication,APIListAllCountries,
        APIClubMemberAllRenewals,APIClubMemberAllReferrals,APIClubMemberCredit,APIUpdateUserEmailAndNumber,
        APIUpdateClubMemberPassword,APIUpdateClubMemberEmail,APIUpdateClubMemberNumber,APIAccountStatusByCardNo 
    } from './DataFileApis';
import {
            getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,
            mainTableTitleHandleView,aboutTitleText,aboutText,trTdText,
            mainNavigationBtnWidth1,mainNavigationBtnWidth2,mainNavigationBtnWidth3,
            getBorderBottomColor,
            mainNavigationBtnWidth4,mainTableTitleHandleViewCredit,userProfileView,
        } from './StatusFunctions';

import { convertToUpperCase,convertToLowerCase,LOGOUT_MSG, LOGIN_ERROR,
        renderTopHeaderRadiusWithOutABtn,renderTopHeaderRadiusWithABtn,
        renderSubmitAndCancelBtnUI,POSTING_ERROR,EMPTY_INPUTS_ERROR,
        renderLogInBtnUI,
        } from './Functions';

export default class Club extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        // Screens
        DoNotShowMenuMainScreen:false,
        DoNotShowAboutScreen:true,
        DoNotShowLogInScreen:true,
        DoNotShowApplyMembershipScreen:true,
        DoNotShowUserAccountScreen:true,
        ClubMemberCredit:'',


        ClubCardNoLogIn:'',
        // chat ----
        ChatMemberName:'',

        CountrySelected:'',
        
        MemberName:'',MemberEmail:'',
        MemberCountry:'',MemberPhone:'',
        ReferralType: '',UserMemberType:'',
        UserExpectations:'',UserReason:'',

        // Member Log In
        ClubLogInName:'',
        ClubLogInPassword:'',

        // log in profile
        UserEmail:'', MobileNumber:'',
        ClubProfilePhone:'', ClubProfileEmail:'',
        DoNotShowProfileDetailsScreen:true, 
        DoNotShowProfileSettingsScreen:true,
        UserHasEmailAndNumber:false, 
        ClubMemberAllRenewals:[],
        ClubMemberAllReferrals:[],
        AllMemberChats:[],
        NewPassword:'',NewNumber:'',NewEmail:'',UpdateSelectedValue:'',
        ClubMemberId:'', ClubMemberProfile:'',
        ClubMemberRegistration:'', ClubMemberPayment:'',
        IsMemberLogeIn:false,
        ClubMemberName:'',
        ClubMemberCardNo:'', ClubMemberSavings:'', AccountStatus:'',
        ClubMemberPhone:'', ClubMemberCategory:'', ClubMemberPoints:'',

    }
}

UNSAFE_componentWillMount()
{
    this.initializeClubUserName ();
    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data"+"\n\n"+"Connect To Internet And Open App Again");})
}

componentDidMount(){} 


initializeClubUserName = () => 
{
    try 
    {   
        AsyncStorage.getItem('ClubMemberDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].ClubUserName;
            let CardNo = jsonData[0].ClubMemberCardNo;
            let Category= jsonData[0].ClubMemberCategory;
            let Registration= jsonData[0].Registration;
            let Payment= jsonData[0].Payment;
            let Id= jsonData[0].ClubMemberId;
            let email = jsonData[0].ProfileEmail;
            let phone = jsonData[0].ProfilePhone;
            let profile = jsonData[0].MemberProfile

            this.setState({ClubMemberName:Name});
            this.setState({ClubMemberCardNo:CardNo});
            this.setState({ClubMemberCategory:Category});
            this.setState({ClubMemberPayment:Payment});
            this.setState({ClubMemberRegistration:Registration});
            this.setState({ClubMemberId:Id});
            this.setState({ClubProfileEmail:email});
            this.setState({ClubProfilePhone:phone});
            this.setState({IsMemberLogeIn:true});
            this.setState({ClubMemberProfile:profile});
            this.getAllClubMemberRenewals(CardNo);
            this.getAccountStatus(CardNo);
            this.getAccountCredit(CardNo);

        }
        else {this.setState({IsMemberLogeIn:false})}
        })
    }catch (error) { console.log(error)}

}

getAccountCredit = (CardNo) =>
{
    axios.get(APIClubMemberCredit+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let AccStatus = jsonResults[0].Credit;
        this.setState({ClubMemberCredit:AccStatus})
        })
    .catch(err=>{console.log(err);})
    
}
getAccountStatus = (CardNo) =>
{
    // let cardNo = this.state.ClubMemberCardNo;
    axios.get(APIAccountStatusByCardNo+CardNo)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let AccStatus = jsonResults[0].Status;
        this.setState({AccountStatus:AccStatus})
        })
    .catch(err=>{console.log(err);})
    
}
getAllClubMemberRenewals = (ClubMemberCardNo) =>
{
    axios.get(APIClubMemberAllRenewals+ClubMemberCardNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ClubMemberAllRenewals:[...JSON.parse(results)]})
        })
    .catch()
    axios.get(APIClubMemberAllReferrals+ClubMemberCardNo)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ClubMemberAllReferrals:[...JSON.parse(results)]})
        })
    .catch(err=>{ console.log("=====>>>"+err)})
    
}
setNewNumber = (text) =>{this.setState({NewNumber:text});}
setNewEmail = (text) =>{this.setState({NewEmail:text});}
setUpdateSelectedValue = (text) =>{this.setState({UpdateSelectedValue:text});}
setNewPassword = (text) =>{this.setState({NewPassword:text});}
setClubCardNoLogIn = (text) =>{this.setState({ClubCardNoLogIn:text});}
setMemberPhone = (text) =>{this.setState({MemberPhone:text});}
setUserExpectations = (text) =>{this.setState({UserExpectations:text});}
setUserReason = (text) =>{this.setState({UserReason:text});}
setMemberName = (text) =>{this.setState({MemberName:text});}
setMemberEmail = (text) =>{this.setState({MemberEmail:text});}
setMemberCountry = (text) =>{this.setState({MemberCountry:text});}
setReferralType = (text) =>  {this.setState({ReferralType:text})}
setUserMemberType = (text) =>  {this.setState({UserMemberType:text})}
setUserEmail = (text) =>{this.setState({UserEmail:text});}
setMobileNumber = (text) =>{this.setState({MobileNumber:text});}
setCountrySelectedValue  = (text) =>{this.setState({CountrySelected:text});}

// log in 
setClubLogInName = (text) =>{this.setState({ClubLogInName:text});}
setClubLogInPassword = (text) =>{this.setState({ClubLogInPassword:text});}

showProfileDetailsScreen = () =>
{
    this.setState({DoNotShowProfileSettingsScreen:true})
    this.setState({DoNotShowProfileDetailsScreen:true})
}
showProfileSettingsScreen = () =>
{
    this.setState({DoNotShowProfileDetailsScreen:false})
    this.setState({DoNotShowProfileSettingsScreen:false})
}

showAboutScreen = () =>
{
    // this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowAboutScreen:false})
}
showLogInScreen = () =>
{
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowLogInScreen:false})
}
showApplyMembershipScreen = () =>
{
    // this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowMenuMainScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:false})
}

showUserAccountScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowUserAccountScreen:false})
}

showMenuMainScreen = () =>
{
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowMenuMainScreen:false})
}
logOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('ClubMemberDetails');
        this.setState({IsMemberLogeIn:false});
        this.setState({UserHasEmailAndNumber:false});
        Alert.alert("Information",LOGOUT_MSG)

    }catch (error) { console.log(error)}
}

postMembershipApplication = async () => 
{
    let name = this.state.MemberName;
    let phone = this.state.MemberPhone;
    let email = this.state.MemberEmail;
    let country= this.state.CountrySelected;
    let referralType = this.state.ReferralType;
    let reason = this.state.UserReason;
    let memberType = this.state.UserMemberType;
    let expectations = this.state.UserExpectations;

    if ((name.length === 0)||(email.length === 0) || (memberType.length === 0)||(phone.length === 0) || (referralType.length === 0)|| (reason.length === 0)|| (expectations.length === 0))
            {Alert.alert("An Error",EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            const postRequest = await axios.post(APIClubMemberApplication,
                {
                    "MemberName": name,
                    "MemberEmail": email,
                    "MemberPhone": phone,
                    "MemberCountry": country,
                    "MemberReferralType":referralType,
                    "Expectations":expectations,
                    "MemberType":memberType,
                    "Reason":reason,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Hello:"+name,result);
            this.setState({MemberName:''});
            this.setState({MemberPhone:''});
            this.setState({MemberEmail:''});
            this.setState({CountrySelected:''});
            this.setState({ReferralType:''});
            this.showMenuMainScreen();
        }
        catch (error){Alert.alert("An Error",POSTING_ERROR)};
    }
}

logInUser = async () =>
{
    let ClubLogInName = convertToLowerCase(this.state.ClubLogInName);
    let ClubLogInPassword = this.state.ClubLogInPassword;
    if ((ClubLogInName.length == 0) || (ClubLogInPassword.length == 0))
        {Alert.alert('Warning','Please All Fields Are Required ')}
    else
    {
        try
        {
            const loginRequest = await axios.get(APILogInClubMemberByCardNo+ClubLogInName)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);
            console.log(jsonString)
            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let CardNo = jsonResults[0].CardNo;
                let userPassword  = jsonResults[0].Password;
                
                if ((CardNo !== ClubLogInName)&&(userPassword !== ClubLogInPassword ))
                    {Alert.alert("Sorry ","\n\n Invalid User Card Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    let Type = jsonResults[0].MemberType;
                    let Payment = jsonResults[0].PaymentType;
                    let Registration = jsonResults[0].Registration;
                    let Id = jsonResults[0].id;
                    let email = jsonResults[0].Holder2;
                    let phone = jsonResults[0].Holder1;
                    let profile = jsonResults[0].Holder3;

                    try {
                        let MemberDetails={ClubUserName:Name,MemberProfile:profile,ProfileEmail:email,ProfilePhone:phone,ClubMemberCardNo:CardNo,ClubMemberId:Id,ClubMemberCategory:Type,Registration:Registration,Payment:Payment}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('ClubMemberDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({ClubMemberName:Name});
                    this.setState({ClubMemberCardNo:CardNo});
                    this.setState({ClubMemberCategory:Type});
                    this.setState({ClubMemberPayment:Payment});
                    this.setState({ClubMemberRegistration:Registration});
                    this.setState({ClubMemberId:Id});
                    this.setState({ClubProfileEmail:email});
                    this.setState({ClubProfilePhone:phone});
                    this.setState({IsMemberLogeIn:true});
                    this.getAllClubMemberRenewals (CardNo)
                    this.showUserAccountScreen();
                    this.getAccountStatus(CardNo)
                    this.getAccountCredit(CardNo);
                    this.setState({UserHasEmailAndNumber:true});
                    
                }
            }

        }

        catch (error)
            {
                Alert.alert("An Error",LOGIN_ERROR)
            };
    }
}

updateUserDetails = async (Type) =>
{
    let NewPass = this.state.NewPassword;
    let NewEmail = this.state.NewEmail;
    let NewNumber = this.state.NewNumber;
    let id = this.state.ClubMemberId;
    let name = this.state.ClubMemberName;
    if ((Type === "Password" && NewPass.length === 0)||(Type === "Number" && NewNumber.length === 0)||(Type === "Email" && NewEmail.length === 0))
        {Alert.alert('An Error',EMPTY_INPUTS_ERROR)}
    else
    {
        try
        {
            if (Type === 'Password')
            {
                const Request = await axios.put(APIUpdateClubMemberPassword, 
                        {"id":id,"Password":NewPass})
                let result = Request.data.status;
                console.log(result);
                Alert.alert(name,"\n"+result+"\n"+"You Also Need To Log Out For Changes To Take Effect");
            }
            else if (Type === 'Email')
            {
                const Request = await axios.put(APIUpdateClubMemberEmail, 
                        {"id":id,"Email":NewEmail})
                let result = Request.data.status;
                console.log(result);
                Alert.alert(name,"\n"+result+"\n"+"You Also Need To Log Out For Changes To Take Effect");
            }
            else if (Type === 'Number')
            {
                const Request = await axios.put(APIUpdateClubMemberNumber, 
                        {"id":id,"Number":NewNumber})
                let result = Request.data.status;
                Alert.alert(name,"\n"+result+"\n"+"You Also Need To Log Out For Changes To Take Effect");
            }
        }
        catch (error){Alert.alert("An Error",POSTING_ERROR)};
    }
}
postEmailAndNumber = async () =>
{
    let name = this.state.ClubMemberName
    let userEmail = this.state.UserEmail;
    let mobileNumber = this.state.MobileNumber;
    let id = this.state.ClubMemberId;
    let fullPhone = this.state.PhoneCountryCode+mobileNumber;

    if (
        (userEmail.length == 0)||(mobileNumber.length == 0) )
    {Alert.alert("An Error",EMPTY_INPUTS_ERROR)}

    else
    {
        try
        {
            const postRequest = await axios.put(APIUpdateUserEmailAndNumber,
                {
                    "id":id,
                    "MemberEmail":userEmail,
                    "MemberPhone":fullPhone,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert(name,result+"\n"+"You Also Need To Log Out For Changes To Take Effect");
            this.setState({UserEmail:''})
            this.setState({MobileNumber:''});
            this.showProfileDetailsScreen();
        }

        catch (error){Alert.alert("An Error",POSTING_ERROR)};
    }


}
render() {

    const {DoNotShowProfileDetailsScreen,DoNotShowProfileSettingsScreen,DoNotShowMenuMainScreen,ClubProfilePhone,ClubProfileEmail,AccountStatus} = this.state;
    const { DoNotShowUserAccountScreen,ClubMemberCredit} = this.state;
    const { DoNotShowAboutScreen,DoNotShowLogInScreen,DoNotShowApplyMembershipScreen} = this.state;

    const {ClubMemberName,UpdateSelectedValue,ClubMemberAllReferrals,ClubMemberProfile,ClubMemberCategory,IsMemberLogeIn} = this.state;
    const {ClubMemberCardNo,ClubMemberAllRenewals,ClubMemberRegistration,ClubMemberPayment} = this.state;

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
                    <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc Club  </Text>
                    <Text style={[styles.MainTopHeaderTextLabelClub]}> {AccountStatus===''?"...Apply Now...":AccountStatus} </Text>
                </View>
            </View>
            
            {DoNotShowMenuMainScreen?(<></>) :(<>
                {renderTopHeaderRadiusWithOutABtn()}
                <View style={{height:20}}></View>
                <View style={styles.MenuCardRowView} >
                    <View style={styles.MenuCardView} >
                        <TouchableOpacity onPress={this.showLogInScreen} >
                            <View style={{height:20}} ></View>
                            <View style={{alignItems:'center'}} >
                                <MaterialIcons name="account-circle" size={40} color={COLORS.colourNumberOne} />
                                <View style={{height:20}} ></View>
                                <Text style = {styles.MenuCardText}> My Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.MenuCardView} >
                        <TouchableOpacity onPress={this.showAboutScreen} >
                            <View style={{height:20}} ></View>
                            <View style={{alignItems:'center'}} >
                                <Entypo name="info-with-circle" size={40} color={COLORS.colourNumberOne} />
                                <View style={{height:20}} ></View>
                                <Text style = {styles.MenuCardText}> About Club</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{height:20}}></View>
                <View style={styles.MenuCardView2} >
                    <TouchableOpacity onPress={this.showApplyMembershipScreen} >
                        <View style={{flexDirection:'row'}} >
                            <View style={styles.MenuCardView2Left} >
                                <MaterialCommunityIcons name="account-edit"  size={40} color={COLORS.colourNumberOne} />
                            </View>
                            <View style={styles.MenuCardView22Right} >
                                <Text style = {styles.MenuCardText}> Apply For Membership</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </>)}

                
    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin About Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    { DoNotShowAboutScreen ?<></>:(<>
                        {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                        <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{height:15}} ></View>
                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>
                                <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >About Triple Care Club</Text>

                                <Text  style = {[aboutText(),getPlainColor(AccountStatus)]} >
                                    This club is a child of Triple Care Ltd; a company that 
                                    believes in forming a community of peoples providing professional 
                                    support to service users in their varying capacities.{"\n\n"} 
                                    The clubs are a unifying tool to enhance teamwork and shared growth among 
                                    TC employee members and any other interested parties that may love to join TC clubs. 
                                </Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >{"\n"}CORE GOALS{"\n\n"}
                                    - Fueling Charity drives{"\n"} 
                                    - Integrity and Decency{"\n"}
                                    - Building Social Capital{"\n"}
                                    - Celebration of Diversity{"\n"}
                                    - Enhancing Shared growth{"\n"}
                                    - Bridging the Inequality gap {"\n"}
                                    - Creating learning opportunities
                                </Text>

                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >{"\n"}MEMBERSHIP TYPES{"\n\n"}
                                    - Gold Member :: Yearly  {"\n"}
                                    - Silver Member :: Every 3 Months
                                    - Bronze Member ::  Monthly{"\n"}

                                </Text>
                            </View>
                        </View>
                        </ScrollView>
                    </>)}
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Log  In  Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowLogInScreen?<></>:(<>
                        {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View style={styles.orderListDetailsText} >
                                <View >
                                    <View style={{alignItems:'center'}} >
                                        <MaterialIcons name="account-circle" size={95} color={COLORS.colourNumberOne} />
                                        <View style={{height:20}} ></View>
                                        <Text style = {styles.UpdatedTextLabel}> Member Log in  </Text>
                                    </View>
                                    <TextInput style={styles.UpdatedInput} placeholder="Tc ID" selectionColor={COLORS.colourNumberOne}  
                                    placeholderTextColor = "#5800c4"  onChangeText={text => this.setClubLogInName(text)}/>

                                    <TextInput style={styles.UpdatedInput} placeholder="Password" secureTextEntry selectionColor={COLORS.colourNumberOne}
                                    placeholderTextColor = "#5800c4"  onChangeText={text => this.setClubLogInPassword(text)}/>

                                    {renderLogInBtnUI(this.logInUser)}
                                    <View style={{height:30}} ></View>
                                </View>
                            </View>
                        </ScrollView>
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Member Apply  Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowApplyMembershipScreen?<></>:(<>
                        {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                        <ScrollView showsVerticalScrollIndicator={false} >
                        <View  >
                            
                        <View  >
                            <View style={{alignItems:'center'}}>
                            <View style={{height:30}} ></View>
                                <Text style = {styles.UpdatedTextLabel}> Applicant Info  </Text>

                                <View style={{height:20}} ></View>
                                <Text style = {styles.UpdatedTextLabel}> First Letters Capital Rest Small  </Text>
                            </View>

                            <TextInput style={styles.UpdatedInput} placeholder="Full Name" onChangeText={text => this.setMemberName(text)}  
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>
                            
                            <TextInput style={styles.UpdatedInput} placeholder="What is Your Country" onChangeText={text => this.setCountrySelectedValue(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                            <TextInput style={styles.UpdatedInput} placeholder="Mobile Number" onChangeText={text => this.setMemberPhone(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>
                            
                            <TextInput style={styles.UpdatedInput} placeholder="Member Bronze / Silver / Gold" onChangeText={text => this.setUserMemberType(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                            <TextInput style={styles.UpdatedInput} placeholder="Email" onChangeText={text => this.setMemberEmail(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                            <TextInput style={styles.UpdatedInput} placeholder="How Did You Know Tc Club" onChangeText={text => this.setReferralType(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne}/>

                            <TextInput style={styles.UpdatedInput} placeholder="Your Reason For Joining" onChangeText={text => this.setUserReason (text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />

                            <TextInput style={styles.UpdatedInput} placeholder="What is Your Expectations" onChangeText={text => this.setUserExpectations(text)}
                            placeholderTextColor = "#5800c4" selectionColor={COLORS.colourNumberOne} />
                            
                            <View style={{height:10}}></View>
                        </View>
                            {renderSubmitAndCancelBtnUI(this.postMembershipApplication,this.showMenuMainScreen)}
                        </View>
                        </ScrollView>
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
                    {DoNotShowUserAccountScreen ?<></>:(<>
                        {renderTopHeaderRadiusWithABtn(this.showMenuMainScreen)}
                        <ScrollView showsVerticalScrollIndicator={false} >
                        {/* ================== AccountStatus == Active ================== */}
                        
                        <View style = {[userProfileView(),getBackgroundColor(AccountStatus)]} >
                            <View style = {[styles.UserProfileImageView]} >
                                <Entypo name="user" size={90} color="white" />
                            </View>
                            <View style = {[styles.UserProfileNameView]} >
                                <Text style = {styles.UpdatedBtnText}>{ClubMemberName}</Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.UpdatedBtnText}> {ClubMemberRegistration}  </Text>

                                <View style={{height:20}} ></View>
                                <Text style = {styles.UpdatedBtnText}> {convertToUpperCase(ClubMemberCardNo)} </Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.UpdatedBtnText}> {ClubMemberCategory} : {ClubMemberPayment}  </Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.UpdatedBtnText}> {ClubProfilePhone}  </Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.profileEmailText}> {ClubProfileEmail}  </Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.UpdatedBtnText}> {ClubMemberProfile} </Text>
                            </View>
                        </View>
                        {DoNotShowProfileDetailsScreen ?(<>
                        <View style={{height:10}} ></View>
                        <View style = {[mainTableTitleHandleViewCredit(),getBackgroundColor(AccountStatus)]} >
                            <Text style = { styles.UpdatedTitleHandleText}>Tc Credit :: { ClubMemberCredit} </Text>
                        </View>
                        <View style={{height:15}}></View>


                        <View style={{height:20}} ></View>
                        <View style = {[mainTableTitleHandleView(),getBackgroundColor(AccountStatus)]} >
                            <Text style = { styles.UpdatedTitleHandleText}> Referrals </Text>
                        </View>
                        <View style={{height:10}}></View>

                        {ClubMemberAllReferrals && ClubMemberAllReferrals.map((item, index) => (
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                        <View style={styles.JobCardView}  >
                                            <View style={{height:8}}></View>
                                            <Text style={[styles.ClubTextStyle,getPlainColor(AccountStatus)]} >
                                                Date : {" "}{" "}{" "}{" "}{" "}{item.Number}{" "}{" "}{" "}{item.Date}
                                            </Text>
                    
                                            <Text style={[ styles.ClubTextStyle, getPlainColor(AccountStatus)]}  >
                                                Member :{" "}{" "}{" "}{" "}{" "}{item.MemberName}{" "}{" "}{" "}{item.TccNumber}
                                            </Text>
                                            <View style={{height:10}}></View>
                                        </View>
                                    </View>
                            </View>
                            ))}

                        
                            <View style={{height:20}} ></View>
                            <View style = {[mainTableTitleHandleView(),getBackgroundColor(AccountStatus)]} >
                                <Text style = { styles.UpdatedTitleHandleText}> Renewals </Text>
                            </View>
                            <View style={{height:10}}></View>
                            {ClubMemberAllRenewals && ClubMemberAllRenewals.map((item, index) => (
                                <View key={index}>
                                    <View style={styles.mainTableView}>
                                        <View style={styles.JobCardView}  >
                                            <View style={{height:8}}></View>
                                            <Text style={[styles.ClubTextStyle,getPlainColor(AccountStatus)]} >
                                                Details : {" "}{" "}{" "}{" "}{" "} {item.Renewal}{" "}{" "}{" "}{item.Fee}
                                            </Text>
                    
                                            <Text style={[styles.ClubTextStyle,getPlainColor(AccountStatus)]}  >
                                                Period :{" "}{" "}{" "}{" "}{" "}From{" "}{" "}{" "}{item.DateOne}{" "}{" "} To {" "}{" "}{" "}{item.DateTwo}
                                            </Text>
                                            <View style={{height:10}}></View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                                </>):(<></>)}

                            {DoNotShowProfileSettingsScreen ? <></>:(<>
                                <View style={{height:20}} ></View>
                                <View >
                                    <View style={{height:10}} ></View>
                                    <Text style={styles.AboutText} >Update Your Details Data</Text>
                                    <View style={{height:5}} ></View>
                                    <View style={styles.MainNavigationBtnView}>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                                            <View style={styles.ArrowMainView}>
                                                <AntDesign name="rightcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                                            </View>
                                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                                    onPress={()=>this.setUpdateSelectedValue('Email')} >
                                                <Text style = {styles.UpdatedBtnText}> Email  </Text>
                                            </TouchableOpacity>

                                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                                onPress={()=>this.setUpdateSelectedValue('Number')} >
                                                <Text style = {styles.UpdatedBtnText}> Number  </Text>
                                            </TouchableOpacity>

                                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                                onPress={()=>this.setUpdateSelectedValue('Password')} >
                                                <Text style = {styles.UpdatedBtnText}>Password  </Text>
                                            </TouchableOpacity>

                                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                            <View style={styles.ArrowMainView}>
                                                <AntDesign name="leftcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                                            </View>
                                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                        </ScrollView>
                                    </View>
                                    <View style={{height:25}} ></View>


                                
                                    {UpdateSelectedValue === "Password"?(<>
                                        <TextInput style={styles.UpdatedInput} placeholder="New Password"
                                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setNewPassword(text)}/>

                                        <View style={{alignItems:'center'}}>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={()=>{this.updateUserDetails("Password")}} >
                                                <Text style = {styles.UpdatedBtnText}> Update  </Text>
                                            </TouchableOpacity>
                                            <View style={{height:20}} ></View>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileDetailsScreen} >
                                                <Text style = {styles.UpdatedBtnText}>  Cancel </Text>
                                            </TouchableOpacity>
                                            <View style={{height:30}} ></View>
                                        </View>
                                    </>):(<></>)}
                                    {UpdateSelectedValue === "Email"?(<>
                                        <TextInput style={styles.UpdatedInput} placeholder="New Email"
                                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setNewEmail(text)}/>

                                        <View style={{alignItems:'center'}}>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={()=>{this.updateUserDetails("Email")}} >
                                                <Text style = {styles.UpdatedBtnText}> Update  </Text>
                                            </TouchableOpacity>
                                            <View style={{height:20}} ></View>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileDetailsScreen} >
                                                <Text style = {styles.UpdatedBtnText}>  Cancel </Text>
                                            </TouchableOpacity>
                                            <View style={{height:30}} ></View>
                                        </View>
                                    </>):(<></>)}
                                    {UpdateSelectedValue === "Number"?(<>
                                        <View style={{height:20}} ></View>
                                        {/* <Text style = {styles.UpdatedTextLabel}>  Include Your Country Code </Text> */}
                                        <TextInput style={styles.UpdatedInput} placeholder="Mobile Number"
                                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setNewNumber(text)}/>

                                        <View style={{alignItems:'center'}}>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={()=>{this.updateUserDetails("Number")}} >
                                                <Text style = {styles.UpdatedBtnText}> Update  </Text>
                                            </TouchableOpacity>
                                            <View style={{height:20}} ></View>
                                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileDetailsScreen} >
                                                <Text style = {styles.UpdatedBtnText}>  Cancel </Text>
                                            </TouchableOpacity>
                                            <View style={{height:30}} ></View>
                                        </View>
                                    </>):(<></>)}
                                    <View style={{height:20}} ></View>
                                </View>


                                <View style={{height:20}} ></View>
                                <View style={styles.ApplyCardView} >
                                    <View style={{height:10}} ></View>
                                    <Text style={styles.AboutText} >OR{"\n\n"}Set Up Your Valid Email And {"\n"} WhatsApp Number </Text>
        
                                    <TextInput style={styles.UpdatedInput} placeholder="Your Email"
                                    placeholderTextColor = "#5800c4"  onChangeText={text => this.setUserEmail(text)} />
                                
                                    <TextInput style={[styles.UpdatedInput]} placeholder="Number With Country Code" onChangeText={text => this.setMobileNumber(text)}
                                    placeholderTextColor = "#5800c4" maxLength={10} keyboardType="numeric"/>
                                        
                                    <View style={{height:20}}></View>

                                    <View style={{alignItems:'center'}}>
                                        <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={this.postEmailAndNumber} >
                                            <Text style = {styles.UpdatedBtnText}> Submit  </Text>
                                        </TouchableOpacity>
                                        <View style={{height:20}} ></View>
                                        <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileDetailsScreen} >
                                            <Text style = {styles.UpdatedBtnText}>  Cancel </Text>
                                        </TouchableOpacity>
                                        <View style={{height:30}} ></View>
                                    </View>
                                </View>
                            </>)}
                        
                        <View style={{alignItems:'center'}}>
                            <View style={{height:20}} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileSettingsScreen} >
                                <Text style = {styles.UpdatedBtnText}> Profile  </Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth4(),getBackgroundColor(AccountStatus)]} onPress={this.logOutUser} >
                                <Text style = {styles.UpdatedBtnText}> Log Out  </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    </>)}
                    
                {/* <View style={styles.MainBottomSpaceView}></View> */}
    
            </View>
    );
}
}
