
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity,ScrollView,Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import styles from "./stylesheet";
import {Entypo, AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { COLORS } from './Colours';
import {
        APILogInClubMemberByCardNo,APIClubMemberApplication,APIListAllCountries,
        APIClubMemberAllRenewals,APIPostImg,APIClubMemberAllReferrals,
        APIUpdateClubMemberPassword,APIAccountStatusByCardNo, 
    } from './DataFileApis';
import {
        getBackgroundColor,mainNavigationBtnStyle,getPlainColor,tableTrView,
        mainTableTitleHandleView,aboutTitleText,aboutText,introClubText,trTdText,
        mainNavigationBtnWidth1,mainNavigationBtnWidth2,mainNavigationBtnWidth3,
        getBorderBottomColor,
        mainNavigationBtnWidth4,mainTableTitleHandleViewCredit,userProfileView,
    } from './StatusFunctions'
import { convertToUpperCase,convertToLowerCase } from './Functions';
export default class Club extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        Countries:[],
        // Screens
        DoNotShowHomeScreen:false,
        DoNotShowBenefitsScreen:true,
        DoNotShowLogInScreen:true,
        DoNotShowApplyMembershipScreen:true,
        DoNotShowMemberCategoryScreen:true,
        DoNotShowUserAccountScreen:true,

        // On chat
        DoNotShowMainNavBtnScreen:false, // should be false always
        // ShowSplashScreen:false,
        // CustomerDetailsFound:true,
        ClubCardNoLogIn:'',
        // chat ----
        ChartCardNo:'',
        ChatMemberName:'',
        ChatChat:'',

        // member application details
        CountrySelectedValue:'',
        PhoneCountryCode:'',
        CountrySelected:'',
        
        MemberName:'',
        MemberEmail:'',
        MemberCountry:'',
        MemberPhone:'',
        ReferralType: '',
        MemberReferral:'',

        // Member Log In
        ClubLogInName:'',
        ClubLogInPassword:'',

        // log in profile
        DoNotShowProfileDetailsScreen:true, 
        DoNotShowProfileSettingsScreen:true,
        ClubMemberAllRenewals:[],
        ClubMemberAllReferrals:[],
        AllMemberChats:[],
        NewPassword:'',
        ClubMemberId:'',
        ClubMemberRegistration:'',
        ClubMemberPayment:'',
        IsMemberLogeIn:false,
        ClubMemberName:'',
        ClubMemberCardNo:'',
        ClubMemberPhone:'',
        ClubMemberCategory:'',
        ClubMemberPoints:'',
        ClubMemberSavings:'',
        AccountStatus:'',

        

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
            let Id= jsonData[0].Id;


            this.setState({ClubMemberName:Name});
            this.setState({ClubMemberCardNo:CardNo});
            this.setState({ClubMemberCategory:Category});
            this.setState({ClubMemberPayment:Payment});
            this.setState({ClubMemberRegistration:Registration});
            this.setState({ClubMemberId:Id});
            this.setState({IsMemberLogeIn:true});
            this.getAllClubMemberRenewals(CardNo);
            this.getAccountStatus(CardNo)

        }
        else {this.setState({IsMemberLogeIn:false})}
        })
    }catch (error) { console.log(error)}

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

setNewPassword = (text) =>{this.setState({NewPassword:text});}
setChatChat = (text) =>{this.setState({ChatChat:text});}
setClubCardNoLogIn = (text) =>{this.setState({ClubCardNoLogIn:text});}
setMemberPhone = (text) =>{this.setState({MemberPhone:text});}
setMemberName = (text) =>{this.setState({MemberName:text});}
setMemberEmail = (text) =>{this.setState({MemberEmail:text});}
setMemberCountry = (text) =>{this.setState({MemberCountry:text});}
setReferralType = (text) =>  {this.setState({ReferralType:text})}
setMemberReferral= (text) =>{this.setState({MemberReferral:text});}


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


showHomeScreen = () =>
{
    this.setState({DoNotShowBenefitsScreen:true})
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowMemberCategoryScreen:true})
    this.setState({DoNotShowHomeScreen:false})
}

showBenefitsScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowMemberCategoryScreen:true})
    this.setState({DoNotShowBenefitsScreen:false})
}
showLogInScreen = () =>
{
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowBenefitsScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowMemberCategoryScreen:true})
    this.setState({DoNotShowLogInScreen:false})
}
showApplyMembershipScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowBenefitsScreen:true})
    this.setState({DoNotShowMemberCategoryScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:false})
}

showUserAccountScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowBenefitsScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowMemberCategoryScreen:true})
    this.setState({DoNotShowUserAccountScreen:false})
}

showMemberCategoryScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowBenefitsScreen:true})
    this.setState({DoNotShowApplyMembershipScreen:true})
    this.setState({DoNotShowUserAccountScreen:true})
    this.setState({DoNotShowMemberCategoryScreen:false})
}


logOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('ClubMemberDetails');
        this.setState({IsMemberLogeIn:false});
        Alert.alert("Warning","\n\n You Have Logged Out")

    }catch (error) { console.log(error)}
}

postMembershipApplication = async () => 
{
    if (this.state.CountrySelected == null)
    {Alert.alert("Please","\n \n  Your Country \n\n")}
    else
        {
        let name = this.state.MemberName;
        let phone = this.state.MemberPhone;
        let email = this.state.MemberEmail;
        let country= this.state.CountrySelected;
        let referralType = this.state.ReferralType;
        let referral = this.state.MemberReferral;
        let fullPhone = this.state.PhoneCountryCode+phone;


        if ((country =="USA") || (country =="UK"))
        {
        
            if (
                (name.length == 0)||(email.length == 0)||(phone.length < 10)
                ||(referral.length == 0) 
            )
            {Alert.alert("Warning","All Inputs Are Required \n\n  Phone Should Be 10 digits")}

            else
            {
                try
                {
                    const postRequest = await axios.post(APIClubMemberApplication,
                        {
                            "MemberName": name,
                            "MemberEmail": email,
                            "MemberPhone": fullPhone,
                            "MemberCountry": country,
                            "MemberReferralType":referralType,
                            "MemberReferral":referral,
                        }
                    )
                    
                    let result = postRequest.data.status;
                    Alert.alert("Application Status",result);
                }
                catch (error)
                    {
                        console.log("+++++++++++++++++"+error);
                        Alert.alert("Network Error","Un Able To Post Your Application\n\nCheck Your Network Connections\n\n")
                    };
            }
        }  

        else
        {
            if (
                    (name.length == 0)||(email.length == 0)||(phone.length < 9) ||  
                    (referral.length == 0) 
                )
                {Alert.alert("Warning","All Inputs Are Required \n\n Phone Should Be 9 digits")}
            

            else
            {
                try
                {
                    const postRequest = await axios.post(APIClubMemberApplication,
                        {
                            "MemberName": name,
                            "MemberEmail": email,
                            "MemberPhone": fullPhone,
                            "MemberCountry": country,
                            "MemberReferralType":referralType,
                            "MemberReferral":referral,
                        }
                    )
                    
                    let result = postRequest.data.status;
                    Alert.alert("Application Status",result);
                }

                catch (error)
                    {
                        console.log(error)
                        Alert.alert("An Error","Un Able To Post Your Application\n\nCheck Your Network Connections\n\n")
                    };
            }
        }
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
                    try {
                        let MemberDetails={ClubUserName:Name,ClubMemberCardNo:CardNo,ClubMemberId:Id,ClubMemberCategory:Type,Registration:Registration,Payment:Payment}
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
                    this.setState({IsMemberLogeIn:true});
                    this.getAllClubMemberRenewals (CardNo)
                    this.showUserAccountScreen();
                    this.getAccountStatus(CardNo)
                }
            }

        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n")
            };
    }
}

updateUserPassword = async () =>
{
    let NewPass = this.state.NewPassword;
    let id = this.state.ClubMemberId;
    console.log(NewPass+"::"+id)
    if ((NewPass.length == 0))
        {Alert.alert('Warning','Password Should Not Be Empty')}
    else
    {
        try
        {
            const Request = await axios.put(APIUpdateClubMemberPassword, 
                    {"id":id,"Password":NewPass})
            let result = Request.data.status;
            console.log(result);
            Alert.alert("Request Status","\n\n"+result);
        }

        catch (error)
            {Alert.alert("An Error","\n\n  Check Your Network Connections\n"+error)};
    }
}
render() {

    const {DoNotShowProfileDetailsScreen,DoNotShowProfileSettingsScreen,AccountStatus} = this.state;
    const { DoNotShowUserAccountScreen,DoNotShowMemberCategoryScreen} = this.state;
    const { DoNotShowHomeScreen,DoNotShowBenefitsScreen,DoNotShowLogInScreen,DoNotShowApplyMembershipScreen} = this.state;

    const {ClubMemberName,ClubMemberAllReferrals,ClubMemberCategory,IsMemberLogeIn} = this.state;
    const {ClubMemberCardNo,ClubMemberAllRenewals,ClubMemberRegistration,ClubMemberPayment} = this.state;
    const { Countries,CountrySelectedValue,CountrySelected,PhoneCountryCode,ReferralType} = this.state;

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
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={styles.MainTopHeaderView} >
                        <View style={styles.MainTopHeaderTextView}>
                            {/* <Text style={[styles.MainTopHeaderTextLabelClub]}> {AccountStatus} </Text> */}
                            <Text style={[styles.MainTopHeaderTextLabelClub]}> {AccountStatus===''?"...Apply Now For...":AccountStatus} </Text>
                            <Text style={styles.MainTopHeaderTextLabel}> Tc Club Member </Text>

                        </View>
                    </View>
                    <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
                    <View style={styles.MainTopRadiusSpaceBottomView} ></View>


                    <View style={styles.MainNavigationBtnView1}>
                    {/* {DoNotShowMainNavBtnScreen?<></>:(<> */}
                    <View style={styles.MainNavigationBtnView}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="rightcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                            </View>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                    onPress={this.showHomeScreen} >
                                <Text style = {styles.btnText}> Home  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showBenefitsScreen} >
                                <Text style = {styles.btnText}> Club Benefits  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]} 
                                onPress={this.showMemberCategoryScreen} >
                                <Text style = {styles.btnText}>Members Benefits  </Text>
                            </TouchableOpacity>

                            {IsMemberLogeIn?(<></>):(<>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]}
                                onPress={this.showApplyMembershipScreen}  >
                                <Text style = {styles.btnText}> Apply For Membership </Text>
                            </TouchableOpacity>
                            </>)}

                            {IsMemberLogeIn?(<>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]}
                                    onPress={this.showUserAccountScreen} >
                                    <Text style = {styles.btnText}> Profile </Text>
                                </TouchableOpacity>
                            </>):(<>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]}
                                    onPress={this.showLogInScreen} >
                                    <Text style = {styles.btnText}> Member Log In </Text>
                                </TouchableOpacity>
                            </>)} 
                            
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="leftcircle" size={30} style={[getPlainColor(AccountStatus)]} />
                            </View>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                        </ScrollView>
                    </View>
                    {/* </>)} */}
                    </View>
                    <View style={{height:20}}></View>

                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Homes Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}

                    {  DoNotShowHomeScreen ? <></>:(<>
                        <View style={styles.clubHomeSScreenView} >
                            <Image style={styles.clubHomeScreenImage} source={require('../../assets/logo.png')}/>
                        </View>
                        <Text  style = {[introClubText(),getPlainColor(AccountStatus)]}>
                            Tc Club is a club for Individuals talent or talents &  promoting Businesses with a mission of 
                            supporting each other to achieve goals in life. 
                        </Text>

                        <Text  style = {[introClubText(),getPlainColor(AccountStatus)]}>
                            Our members receive 1 to 1 support to 
                            enhance their Business be it on Talk the Walk Tv & Radio show, we also assist members to 
                            save and make money
                        </Text>
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Benefits Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    { DoNotShowBenefitsScreen ?<></>:(<>
                    
                        <View style={{height:15}} ></View>
                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>
                                <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Tc Club Membership Benefits</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. Website Designing</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. Accounting Services</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Sales And Marketing</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >4. Business Plan Support</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >5. Mobile App Development</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >5. Start Up Business Loan</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >7. Social Media Management</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >8. Wills And Estate Planning</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >9. Web Hosting And Domains</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >10. Surprise Gifts Or Vouchers</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >11. Business Growth and Advice</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >12. Discount Air Tickets Worldwide</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >13. Virtual Secretary/ Administrator</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >14. Discounted Worldwide Hotels stays</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >15. Investment Advise from the experts</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >16. Support And Property Ownership Advise</Text>
                                <Text style={[aboutText(),getPlainColor(AccountStatus)]} >17. Pooling Resources And Grow Together Monthly</Text>
                            </View>
                        </View>
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
                        <View style={styles.orderListDetailsText} >
                        <View style={styles.ApplyCardView} >
                            <TextInput style={styles.input} placeholder="Tc Number"  
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setClubLogInName(text)}
                            />

                            <TextInput style={styles.input} placeholder="Password" secureTextEntry
                            placeholderTextColor = "#5800c4"  onChangeText={text => this.setClubLogInPassword(text)}
                            />
                            

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.logInUser} >
                                <Text style = {styles.btnText}> Log In  </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                        </View>
                        </View>
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
                        <View style={styles.orderListDetailsTexts} >
                            
                        <View style={styles.ApplyCardView} >
                            <View style={{height:30}}></View>
                            <Text style = {styles.btnText}> Applicant Info  </Text>

                            <View style={{height:20}} ></View>
                            <Text style = {styles.btnText}> First Letters Capital Rest Small  </Text>
                            <TextInput style={styles.input} placeholder="Full Name" onChangeText={text => this.setMemberName(text)}  
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Email" onChangeText={text => this.setMemberEmail(text)}
                            placeholderTextColor = "#5800c4" 
                            />

                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={ReferralType }
                                    
                                    onValueChange={(itemValue) =>this.setReferralType(itemValue)}>
                                        <Picker.Item label="How Did You Know Tc Club"/> 
                                        <Picker.Item label="By Office" value="By Office" /> 
                                        <Picker.Item label="Club Member" value="Club Member" /> 
                                </Picker>
                            </View>

                            {ReferralType && ReferralType ?(<>
                                <TextInput style={styles.input} placeholder="Office / Tc Number" onChangeText={text => this.setMemberReferral(text)}
                                placeholderTextColor = "#5800c4" 
                                />
                                <View style={{height:20}}></View>
                            </>):(<></>)}


                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={CountrySelectedValue}
                                    
                                    onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                        <Picker.Item label="What is Your Country"/> 
                                        {Countries && Countries.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.countryName} value={item.countryName+':'+Index} /> 
                                        ))}
                                </Picker>
                            </View>


                            {CountrySelected == "USA" || CountrySelected =="UK" ?(<>
                                <TextInput style={styles.input} placeholder="Country" editable = {false}  defaultValue={CountrySelected}
                                placeholderTextColor = "#5800c4" 
                                />
                                <View style={styles.PhoneInput} >
                                    <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" onChangeText={text => this.setMemberPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    />
                                    <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="10 digits" onChangeText={text => this.setMemberPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    maxLength={10} keyboardType="numeric" 
                                    />
                                </View>
                            
                                <View style={{height:20}}></View>
                            </>):(<>

                                <TextInput style={styles.input} placeholder="Country" editable = {false}  defaultValue={CountrySelected}
                                placeholderTextColor = "#5800c4" 
                                />

                                <View style={styles.PhoneInput} >
                                    <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" onChangeText={text => this.setMemberPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    />
                                    <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="9 digits" onChangeText={text => this.setMemberPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    maxLength={9} keyboardType="numeric" 
                                    />
                                </View>
                                <View style={{height:20}}></View>

                            </>)}

                                <View style={{height:10}}></View>
                        </View>

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postMembershipApplication} >
                                <Text style = {styles.btnText}> Send  </Text>
                            </TouchableOpacity>
                                <View style={{height:10}} ></View>
                            </View>
                    </>)}

                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Member Category Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}

                    {DoNotShowMemberCategoryScreen ?<></>:(<>
                        <View style={{height:15}} ></View>
                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Bronze Membership Benefits</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. UK Sponsorship Jobs & Visa</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. Mobile App Development</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Dental & Emergency Help for you GOLD & Immediate family member listed </Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >4. Worldwide Airticket Installment payment Gold Member Advise & Support to own your first Home or property </Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >5. Free Consultation and Obtaining wills & Feneral Services. </Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >6. Support to start a Business or promote Talent or do Printing or Graphic Design</Text>

                            <View style={{height:50}} ></View>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Silver Membership Benefits</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >GETS All six Benefits a Bronze member gets</Text>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Plus</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. Accounting Services</Text> 
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. Sales and Marketing</Text> 
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Business Plan Support</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >4. Mobile App Development</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >5. Social Media Management</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >6. Start up Business Loans</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >7. Wills & Estate Planning</Text>


                            <View style={{height:50}} ></View>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Gold Membership Benefits</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >All Benefits of Bronze and Silver member gets</Text>
                            <Text style={[aboutTitleText(),getPlainColor(AccountStatus)]} >Plus</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >1. Mobile App Development</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >2. Web hosting and Domains</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >3. Surprise Gifts or Vouchers</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >4. Business Growth and Advice </Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >5. Support & Property Ownership</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >6. Discounted Worldwide Hotels Bills</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >7. Pooling Resources & Grow Together</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >8. Virtual Secretary / Administration</Text>
                            <Text style={[aboutText(),getPlainColor(AccountStatus)]} >9. Investment Advise From The Experts</Text>
                            </View>
                        </View>
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
                        
                        {/* ================== AccountStatus == Active ================== */}
                        
                        <View style = {[userProfileView(),getBackgroundColor(AccountStatus)]} >
                            <View style = {[styles.UserProfileImageView]} >
                                <Entypo name="user" size={90} color="white" />
                            </View>
                            <View style = {[styles.UserProfileNameView]} >
                                <Text style = {styles.btnText}>{ClubMemberName}</Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {ClubMemberRegistration}  </Text>

                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {convertToUpperCase(ClubMemberCardNo)} </Text>
                                <View style={{height:20}} ></View>
                                <Text style = {styles.btnText}> {ClubMemberCategory} : {ClubMemberPayment}  </Text>

                            </View>
                        </View>
                        {DoNotShowProfileDetailsScreen ?(<>
                        <View style={{height:20}} ></View>
                        <View style = {[mainTableTitleHandleViewCredit(),getBackgroundColor(AccountStatus)]} >
                            <Text style = { styles.tableTitleHandleText}>Tc Credit :: 000 </Text>
                        </View>

                        {/* <View style={styles.mainTableOuterView} >
                        {ClubMemberAllReferrals && ClubMemberAllReferrals.map((item, index) => (

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Number}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Date}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Points}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.TccNumber}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.MemberName}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            ))}
                            </View> */}

                            <View style={{height:20}} ></View>
                        <View style = {[mainTableTitleHandleView(),getBackgroundColor(AccountStatus)]} >
                            <Text style = { styles.tableTitleHandleText}> Referrals </Text>
                        </View>

                        <View style={styles.mainTableOuterView} >
                        {ClubMemberAllReferrals && ClubMemberAllReferrals.map((item, index) => (
                            <View key={index}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.mainTableView}>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Number}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Date}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Points}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{convertToUpperCase(item.TccNumber)}</Text>
                                    </View>

                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.MemberName}</Text>
                                    </View>
                                    <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                        <View style={{width:20}} ></View>
                                    </View>
                                </View>
                            </ScrollView>
                            </View>
                            ))}
                            </View>

                        
                            <View style={{height:20}} ></View>
                            <View style = {[mainTableTitleHandleView(),getBackgroundColor(AccountStatus)]} >
                                <Text style = { styles.tableTitleHandleText}> Renewals </Text>
                            </View>

                            <View style={styles.mainTableOuterView} >
                            {ClubMemberAllRenewals && ClubMemberAllRenewals.map((item, index) => (
                                <View key={index}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.mainTableView}>
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Renewal}</Text>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.Fee}</Text>
                                        </View>

                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.DateOne}</Text>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}> To </Text>
                                        </View>
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <Text  style={[trTdText(),getPlainColor(AccountStatus)]}>{item.DateTwo}</Text>
                                        </View>

                                        
                                        <View style={[tableTrView(),getBorderBottomColor(AccountStatus)]} >
                                            <View style={{width:20}} ></View>
                                        </View>
                                    </View>
                                </ScrollView>
                                </View>
                                ))}
                                </View>
                                </>):(<></>)}

                            {DoNotShowProfileSettingsScreen ? <></>:(<>
                                <View style={{height:20}} ></View>
                                <View style={styles.ApplyCardView} >
                                    <Text style={styles.AboutText} >Update Your Password</Text>
                                    <TextInput style={styles.input} placeholder="New Password"
                                    placeholderTextColor = "#5800c4"  onChangeText={text => this.setNewPassword(text)}
                                    />

                                <View style={{alignItems:'center'}}>
                                    <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth1(),getBackgroundColor(AccountStatus)]} onPress={this.updateUserPassword} >
                                        <Text style = {styles.btnText}> Update  </Text>
                                    </TouchableOpacity>
                                    <View style={{height:20}} ></View>
                                    <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth2(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileDetailsScreen} >
                                        <Text style = {styles.btnText}>  Cancel </Text>
                                    </TouchableOpacity>
                                    <View style={{height:30}} ></View>
                                </View>
                                </View>
                            
                            </>)}
                        
                        <View style={{alignItems:'center'}}>
                        <View style={{height:20}} ></View>
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth3(),getBackgroundColor(AccountStatus)]} onPress={this.showProfileSettingsScreen} >
                                <Text style = {styles.btnText}> Settings  </Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity style={[mainNavigationBtnStyle(),mainNavigationBtnWidth4(),getBackgroundColor(AccountStatus)]} onPress={this.logOutUser} >
                                <Text style = {styles.btnText}> Log Out  </Text>
                            </TouchableOpacity>
                        </View>
                    </>)}
                    
                {/* <View style={styles.MainBottomSpaceView}></View> */}
                </ScrollView>
    
            </View>
    );
}
}
