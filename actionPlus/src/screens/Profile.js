
import React from 'react';
import { Text, View,TextInput,Alert,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { COLORS } from './Colours';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import {APIListAllCountries,APIMemberCreate,APIMemberLogIn} from './DataFileApis';


export default class Profile extends React.Component {
constructor(props){
    super(props);
    this.state = {
        Countries:[],
    
        // Screens
        DoNotShowProfileScreen:false,
        DoNotShowSignInScreen:false, // always false
        DoNotShowSignUpScreen:true,

        //  Sign In
        IsMemberLogeIn:false, // should always be false
        SignInNumber:'',
        SignInPassword:'',
        AccountCountry:'',
        AccountPhone:'',
        AccountEmail:'',
        AccountName:'',
        AccountId:'',

        // Sign Up
        CountrySelectedValue:'',
        PhoneCountryCode:'',
        CountrySelected:'',
        SignUpPhone:'',
        SignUpArea:'',
        SignUpEmail:'',
        SignUpPassword:'',
        SignUpFullName:'',

        // profile
        DoNotShowProfileDetailsScreen:true, 
        DoNotShowProfileSettingsScreen:true,

    }
    
}

componentDidMount() 
{
    this.initializeAccountDetails();
    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data"+"\n\n"+"Connect To Internet And Open App Again");})
    
}
initializeAccountDetails = () => 
{
    try 
    {   
        AsyncStorage.getItem('MemberDetails').then((Details)=>{
        if (Details !== null) {
            const jsonData = JSON.parse(Details)

            let Name = jsonData[0].Name;
            let CodePhone = jsonData[0].CodePhone;
            let Email = jsonData[0].Email;
            let Country= jsonData[0].Country;
            let Id= jsonData[0].Id;
            this.setState({AccountCountry:Country});
            this.setState({AccountName:Name});
            this.setState({AccountPhone:CodePhone});
            this.setState({AccountEmail:Email});
            this.setState({AccountId:Id});
            this.showProfileScreen();
            this.setState({IsMemberLogeIn:false});
        }
        else {this.setState({IsMemberLogeIn:true})}
        })
    }catch (error) { console.log(error)}
}

setSignInNumber = (text) =>{this.setState({SignInNumber:text});}
setSignInPassword = (text) =>{this.setState({SignInPassword:text});}
setSignUpPhone = (text) =>{this.setState({SignUpPhone:text});}
setSignUpFullName = (text) =>{this.setState({SignUpFullName:text});}
setSignUpArea= (text) =>{this.setState({SignUpArea:text});}
setSignUpEmail= (text) =>{this.setState({SignUpEmail:text});}
setSignUpPassword= (text) =>{this.setState({SignUpPassword:text});}
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
showProfileScreen = () =>
{
    this.setState({DoNotShowSignUpScreen:true})
    this.setState({DoNotShowSignInScreen:true})
    this.setState({DoNotShowProfileScreen:false});
}
showSignInScreen = () =>
{
    // this.setState({DoNotShowProfileScreen:true});
    this.setState({DoNotShowSignUpScreen:true})
    this.setState({DoNotShowSignInScreen:false})
}
showSignUpScreen = () =>
{
    // this.setState({DoNotShowProfileScreen:true});
    this.setState({DoNotShowSignInScreen:true})
    this.setState({DoNotShowSignUpScreen:false})
}

signOutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('MemberDetails');
        this.setState({IsMemberLogeIn:true});
        // this.showProfileScreen();
        Alert.alert("Warning","\n\n You Have Signed Out")

    }catch (error) { console.log(error)}
}

signInUser = async () =>
{
    let Number = this.state.SignInNumber;
    let Password = this.state.SignInPassword;

    if ((Number.length == 0) || (Password.length == 0))
        {Alert.alert('Warning','Please All Fields Are Required ')}
    else
    {
        try
        {
            const loginRequest = await axios.get(APIMemberLogIn+Number)
            let results = loginRequest.data
            let jsonString = JSON.stringify(results)
            let jsonResults =JSON.parse(jsonString);

            if (results.length == 0)
            {Alert.alert("Sorry","\n\n  No Member Records Found \n\n Try Again")}
            else
            {
                let userNumber = jsonResults[0].Phone;
                let userPassword  = jsonResults[0].Password;
                
                if ((userNumber !== Number)&&(userPassword !== Password ))
                    {Alert.alert("Sorry ","\n\n Invalid Phone Number \n\n Or\n Password \n\nTry Again")}

                else
                {
                    let Name= jsonResults[0].Name;
                    let CodePhone = jsonResults[0].CodePhone;
                    let Country = jsonResults[0].Holder1;
                    let Email = jsonResults[0].Holder2;
                    let Id = jsonResults[0].id;
                    try {
                        let MemberDetails={Name:Name,CodePhone:CodePhone,Id:Id,Email:Email,Country:Country}
                        const Details  = []
                        Details.push(MemberDetails)
                        await AsyncStorage.setItem('MemberDetails',JSON.stringify(Details));
                        } 
                    catch (error) {console.log(error)}

                    this.setState({AccountCountry:Country});
                    this.setState({AccountName:Name});
                    this.setState({AccountPhone:CodePhone});
                    this.setState({AccountEmail:Email});
                    this.setState({IsMemberLogeIn:false});
                    this.showProfileDetailsScreen();
                }
            }

        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+error)
            };
    }
}

postSignUpDetails = async () => 
{
    let phoneCode = this.state.PhoneCountryCode;
    let country = this.state.CountrySelected;
    let phone = this.state.SignUpPhone;
    let area = this.state.SignUpArea;
    let email = this.state.SignUpEmail;
    let password = this.state.SignUpPassword
    let fullName = this.state.SignUpFullName;
    let fullPhone = phoneCode+phone;


    if ((fullName.length == 0)||(area.length == 0)|| (password.length== 0)|| (phone.length == 0))
    {Alert.alert("Warning","\n \n Full Name OR Phone OR Area OR Password \n \n Can Not Be Empty")}

    else
    {
        
        try
        {
            const postRequest = await axios.post(APIMemberCreate,
                {
                    "Name":fullName,
                    "Country":country,
                    "Email":email,
                    "CodePhone":fullPhone,
                    "Phone":phone,
                    "Password":password,
                }
            )
            this.setState({AccountCountry:country});
            this.setState({AccountName:fullName});
            this.setState({AccountPhone:fullPhone});
            this.setState({AccountEmail:email});
            this.showProfileScreen();
            this.setState({IsMemberLogeIn:false});
            let result = postRequest.data.status;
            Alert.alert("Status",result);


        }
        catch (error)
            {Alert.alert("An Error","Un Able To Post Data \n\n Check Your Internet Connections\n\n"+error)};
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
            {

                Alert.alert("An Error","\n\n  Check Your Network Connections\n"+error)
            };
    }
}

render() {
    
    const {DoNotShowSignInScreen,DoNotShowSignUpScreen,DoNotShowProfileScreen,IsMemberLogeIn } = this.state;
    const {DoNotShowProfileDetailsScreen,DoNotShowProfileSettingsScreen} = this.state;
    const {Countries,CountrySelectedValue,CountrySelected,PhoneCountryCode} = this.state;
    const {AccountCountry,AccountPhone,AccountEmail,AccountName} = this.state;

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

                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Notifications')}>
                    
                        <Text  style={styles.mainCartNumberTxt}>3</Text>

                    <AntDesign name="notification" size={35} style={styles.NotificationIcon} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:20}}></View>
            {DoNotShowProfileScreen ?<></>:(<>
                    {IsMemberLogeIn ?(<>
                        { DoNotShowSignInScreen ?<></>:(<>
                        <View style={{alignItems:'center'}} >
                        <Text style={styles.TextLabels}>Welcome Back</Text>
                        <Text style={styles.TextLabels}>Sign In And Continue</Text>
                        </View>

                        {/* <TextInput style={[styles.input]} placeholder="Phone Number"  
                        placeholderTextColor = {COLORS.black}  onChangeText={text => this.setSignInNumber(text)}
                        keyboardType="numeric"/> */}



                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.black}
                                selectedValue={CountrySelectedValue}
                                
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Your Country"/> 
                                    {Countries && Countries.map((iteam,Index ) => (
                                    <Picker.Item label={iteam.countryName} value={iteam.countryName+':'+Index} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={styles.PhoneInput} >
                        {CountrySelected && CountrySelected =="UK" ?(<>
                        <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} 
                        placeholderTextColor = {COLORS.black} />
                        <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Number 10 digits" onChangeText={text => this.setSignInNumber(text)}
                        placeholderTextColor = {COLORS.black} maxLength={10} keyboardType="numeric" />
                        </>):<></>}
                        {CountrySelected && CountrySelected =="Ghana" ?(<>
                        <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" 
                        placeholderTextColor = {COLORS.black}/>
                        <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Number 9 digits" onChangeText={text => this.setSignInNumber(text)}
                        placeholderTextColor = {COLORS.black} maxLength={9} keyboardType="numeric" />
                        </>):<></>}
                        </View>

                        <TextInput style={[styles.input]} placeholder="Password" secureTextEntry  
                        placeholderTextColor = {COLORS.black}  onChangeText={text => this.setSignInPassword(text)}
                        />

                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.signInUser} >
                            <Text style = {styles.LogInBtnText}> Sign In  </Text>
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}} >
                            <Text style={styles.TextLabels}>OR</Text>
                        </View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showSignUpScreen} >
                            <Text style = {styles.LogInBtnText}> Sign Up Now   </Text>
                        </TouchableOpacity>
                    </>)}


                    { DoNotShowSignUpScreen ?<></>:(<>
                        <View style={{alignItems:'center'}} >
                            <Text style={styles.TextLabels}>Welcome Back</Text>
                            <Text style={styles.TextLabels}>Sign Up For An Account</Text>
                        </View>

                        <View style={{height:20}} ></View>

                        <TextInput style={[styles.input]} placeholder="Full Name"  
                        placeholderTextColor = {COLORS.black}  onChangeText={text => this.setSignUpFullName(text)}/>
                        
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.black}
                                selectedValue={CountrySelectedValue}
                                
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Your Country"/> 
                                    {Countries && Countries.map((iteam,Index ) => (
                                    <Picker.Item label={iteam.countryName} value={iteam.countryName+':'+Index} /> 
                                    ))}
                            </Picker>
                        </View>
                        
                        
                        

                        <View style={styles.PhoneInput} >
                            {CountrySelected && CountrySelected =="UK" ?(<>
                            <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} 
                            placeholderTextColor = {COLORS.black} />
                            <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Number 10 digits" onChangeText={text => this.setSignUpPhone(text)}
                            placeholderTextColor = {COLORS.black} maxLength={10} keyboardType="numeric" />
                            </>):<></>}
                            {CountrySelected && CountrySelected =="Ghana" ?(<>
                            <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" 
                            placeholderTextColor = {COLORS.black}/>
                            <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Number 9 digits" onChangeText={text => this.setSignUpPhone(text)}
                            placeholderTextColor = {COLORS.black} maxLength={9} keyboardType="numeric" />
                            </>):<></>}
                        </View>

                        {CountrySelected ?(<>
                        <TextInput style={[styles.input]} placeholder="Area"  
                        placeholderTextColor = {COLORS.black}  onChangeText={text => this.setSignUpArea(text)}/>
                        </>):<></>}

                        {CountrySelected ?(<>
                        <TextInput style={[styles.input]} placeholder="Password"  
                        placeholderTextColor = {COLORS.black}  onChangeText={text => this.setSignUpPassword(text)}/>
                        </>):<></>}

                        {CountrySelected ?(<>
                        <TextInput style={[styles.input]} placeholder="Email" 
                        placeholderTextColor = {COLORS.black}  onChangeText={text => this.setSignUpEmail(text)}/>
                        </>):<></>}

                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postSignUpDetails} >
                            <Text style = {styles.LogInBtnText}> Sign Up  </Text>
                        </TouchableOpacity>
                        <View style={{alignItems:'center'}} >
                            <Text style={styles.TextLabels}>OR</Text>
                        </View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showSignInScreen} >
                            <Text style = {styles.LogInBtnText}> Sign In Now   </Text>
                        </TouchableOpacity>
                    </>)}
                    </>) :(<>
                    {DoNotShowProfileDetailsScreen ?(<>
                        <View style={styles.HeadingsView}>
                            <View style={{alignItems:'center'}} >
                            <EvilIcons name="user" size={180} color="#FF8C00" />
                            <Text  style={ styles.drawerUserName}>{AccountName}</Text>
                            <Text  style={ styles.drawerUserName}>{AccountPhone}</Text>
                            <Text  style={ styles.drawerUserName}>{AccountCountry}</Text>
                            <Text  style={ styles.drawerUserName}>{AccountEmail}</Text>
                            </View>
                        </View>
                    <View style={{height:20}} ></View>

                    {/* <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showProfileSettingsScreen} >
                        <Text style = {styles.LogInBtnText}> Settings   </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.signOutUser} >
                        <Text style = {styles.LogInBtnText}> Sign Out  </Text>
                    </TouchableOpacity>
                    </>):<></>}

                    {DoNotShowProfileSettingsScreen ? <></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={styles.ApplyCardView} >
                            <Text style={styles.AboutText} >Update Your Password</Text>
                            <TextInput style={styles.input} placeholder="New Password"
                            placeholderTextColor = {COLORS.black}  onChangeText={text => this.setNewPassword(text)}
                            />

                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.updateUserPassword} >
                                <Text style = {styles.LogInBtnText}> Update  </Text>
                            </TouchableOpacity>
                            <View style={{height:20}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showProfileSettingsScreen} >
                                <Text style = {styles.LogInBtnText}>  Cancel </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.signOutUser} >
                                <Text style = {styles.LogInBtnText}> Sign Out  </Text>
                            </TouchableOpacity>
                            <View style={{height:20}} ></View>
                        </View>
                        </View>
                </>)}
            </>)}
            </>)}



                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
