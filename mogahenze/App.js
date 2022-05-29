

import  React, {useState, useEffect}  from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {View,Image,ActivityIndicator,ScrollView,TextInput,TouchableOpacity,Text,Alert} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import styles from "./src/screens/stylesheet";
import {APIgetCustomerLogIn, APIpostCustomerRegister } from './src/screens/DataFileApis';

// import SigninSignup from './src/screens/SigninSignup';
import Tabs from './src/screens/Tabs';


export default function App() {
        const [isUserRegistered , setisUserRegistered] = useState(false); 
        const [showSplashScreen , setshowSplashScreen] = useState(true);; 
        const [showLogInScreen, setshowLogInScreen] = useState(true);
        const [showWelcomeScreen, setshowWelcomeScreen] = useState(true);

        // Ac set up
        const [userFName, setuserFName] = useState('');
        const [userLName, setuserLName] = useState('');
        const [userPhone, setuserPhone] = useState('');
        const [userEmail, setuserEmail] = useState('');
        const [userPassword, setuserPassword] = useState('');

        const [userLogInPhone, setuserLogInPhone] = useState('');
        const [userLogInPassword, setuserLogInPassword] = useState('');


        const [registerRequestError,setRegisterRequestError] = useState();
        const [logInRequestError,setLogInRequestError] = useState();


        useEffect(()=>{getUserPhone();},[]);
    
    
        const getUserPhone = () => 
        {
            // set showSplashScreen to false aft 5 secs
            setTimeout(()=>{ setshowSplashScreen(false)},4000);

            try 
            {   AsyncStorage.getItem ('UserName')
                .then(value =>{if (value != null)
                    {
                        console.log(value)
                        setisUserRegistered(true)
                    }})
            }catch (error) { console.log(error)}
        }

    // functions
    const storeUserOfflineData = async () => 
    {
        // if ((userFName.length == 0) ||(userLName.length == 0) ||(userPhone .length == 0) || (userEmail.length == 0)||(userPassword.length == 0))
        //     {
        //         Alert.alert('Warning','Please All Fields Are Required ')
        //     }
        //     else
        //     {
                try 
                    {
                        let UserName = userFName +""+ userLName;
                        await AsyncStorage.setItem('UserName',UserName);
                        // await AsyncStorage.setItem('UserEmail',userEmail);
                        await AsyncStorage.setItem('UserPhone',userPhone);
                        // await AsyncStorage.setItem('UserPassword',userPassword);
                        setisUserRegistered(true);
                    } 
                catch (error) {console.log(error)}
            // }
    }
    const registerUserAccount = async () =>
    {
        if ((userFName.length == 0) ||(userLName.length == 0) ||(userPhone .length == 0) || (userEmail.length == 0)||(userPassword.length == 0))
            {Alert.alert('Warning','Please All Fields Are Required ')}
        else
        {
            let UserName = userFName +""+ userLName;
            try
            {
                // post data
                const registerrequest = await axios.post(APIpostCustomerRegister,
                    {
                        "name" :UserName,
                        "email" :userEmail,
                        "phone"  :userPhone,
                        "password"  :userPassword,
                        "placeholder1" :"placeholder1",
                        "placeholder2" :"placeholder2",
                        "placeholder3" :"placeholder3",
                        "placeholder4" :"placeholder4",
                        "placeholder5" :"placeholder5"
                    },
                )
                Alert.alert("Auccess","Your \n\n"+registerrequest.data.status);
                setTimeout(() => {redirectToHomeScreen(),3000});
            }

            catch (error)
                {
                    setRegisterRequestError(error.message)
                    Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+registerRequestError)
                };
        }
    }
    const logInUser = async () =>
    {
        let loginphone = userLogInPhone;
        let loginpassword = userLogInPassword;
        if ((userLogInPhone.length == 0) ||(userLogInPassword .length == 0))
            {Alert.alert('Warning','Please All Fields Are Required ')}
        else
        {
            console.log(loginphone)
            
            try
            {
                // post data
                const loginrequest = await axios.get(APIgetCustomerLogIn+loginphone)
                let results = loginrequest.data
                let username = results.data.name;
                let userphone = results.data.phone;
                if ((!username)&&(!userphone))
                {
                    Alert.alert("Sorry ","Invalid User Phone Or\n Password \n\nTry Again")
                }

                else
                {
                    // Alert.alert("Success","Your \n\n");
                    try 
                    {
                        
                        await AsyncStorage.setItem('UserName',username);
                        await AsyncStorage.setItem('UserPhone',userphone);
                        setisUserRegistered(true);
                    } 
                    catch (error) {console.log(error)}
                    // change state
                    setisUserRegistered(true);
                    // setTimeout(() => {redirectToHomeScreen(),3000});
                }

            }

            catch (error)
                {
                    setRegisterRequestError(error.message)
                    Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+registerRequestError)
                };
        }
    }
    const redirectToHomeScreen = () =>{ storeUserOfflineData()}
    const userAccountSetUp = ()  => {setshowLogInScreen(!showLogInScreen)}
    const backTouserLogInScreen = ()  => {setshowLogInScreen(true)}
    const setWelcomeScreenToFalse = () =>{setshowWelcomeScreen(false);}
    const LoadHomeScreen = () => 
    {
        Alert.alert("Please", "Setup Account Now By Registering")
        // setisUserRegistered(true);
    }

    const verifyPhoneNumber = () =>
    {
        Alert.alert(
            'Verify Phone Number',
            'Enter code sent via SMS to'+"+256"+userPhone,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'VERIFY', onPress: () => userAccountSetUp(), style: 'Verify'},
                ,
            ],
            {cancelable: false}  
        );
    }


    return (
        <>
        <NavigationContainer>
            {/* <Tab.Navigator   screenOptions={{showLabel:false,showLabel:false,  headerShown: false }}>
            <Tab.Screen name="kalukulagas" component={HomeStackScreen} />
            <Tab.Screen name="offers" component={OffersScreen} />
            <Tab.Screen name="cart" component={CartIconScreen} />
            <Tab.Screen name="orders" component={OrdersScreen} options={{ tabBarVisible: false}} />
            <Tab.Screen name="profile" component={ProfileScreen} />

            </Tab.Navigator> */}
            {/* <Tabs/> */}
            {/* <Signup></Signup> */}
            {/* <globalStateContext.Provider values={ globalState}> */}
            {/* { isUserRegistered ? <Tabs/> :<SigninSignup/>}  */}
            {/* </globalStateContext.Provider> */}
            
            {/* condition ? true : false */}

        { 
            // start with splash screen
            showSplashScreen 
        ? 
            // fisrt outer Conditional Operator
                // true block 
            <View style={styles.mainView} >
                <View style={styles.mainViewSplah} >
                    <View style={styles.splashScreenView} >
                            {/* <Image style={styles.splashScreenImage} source={require('./assets/kulakula.png')}/> */}
                            <Image style={styles.splashScreenImage} source={require('./assets/kulakula.png')}/>
                    </View>
                    <View style={styles.splashScreenTextView}>
                        <Text style={styles.splashScreenText}>Loading ...</Text>
                    </View>
                    <View style={styles.activityIdicaterView}>
                        <View style={styles.activityIdicatercontainer}>
                            <ActivityIndicator />
                            {/* <ActivityIndicator size="large" /> */}
                            {/* <ActivityIndicator size="small" color="#0000ff" /> */}
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                    </View>
                </View>
            </View>

        :   
                isUserRegistered ? <Tabs/>:
                <>
                {showLogInScreen ?
                (
                    
                    <View style={styles.mainView} >
                        <View style={styles.mainViewTopSpace} ></View>
                    <View style={styles.topNavigationHeader}>
                        <View style={styles.topNavigationHeaderArrowView} >
                            {/* <TouchableOpacity>
                                <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                            </TouchableOpacity> */}
                        </View>
                        <View style={styles.topNavigationHeaderTextView}>
                            <Text style={styles.topNavigationHeaderText}>Login Or Register</Text>
                        </View>
                    </View>
                    <View style={styles.mainViewSignin}>
                    
                            <View style = {styles.loginTextView}>
                                <Text style = {styles.signupText}> Enter Your Details </Text>
                            </View> 
                            <View style={styles.signUpDetailsView} >
                                <TextInput style={styles.input} placeholder="Phone" placeholderTextColor = "#fff" onChangeText={text => setuserLogInPhone (text)} />
                                <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor = "#fff" onChangeText={text => setuserLogInPassword (text)} />
            
                            </View>
            
                        
                            {/* <TouchableOpacity style={styles.offersProcedbtn} onPress={()=> LoadHomeScreen ()}> */}
                            <TouchableOpacity style={styles.offersProcedbtn} onPress={()=> logInUser ()}>
                                <Text style = {styles.nextbtnText}> Continue </Text>
                            </TouchableOpacity>
            
                            <TouchableOpacity style={styles.offersProcedbtn} onPress={()=> userAccountSetUp ()}>
                                <Text style = {styles.nextbtnText}> Register Now </Text>
                            </TouchableOpacity>
            
                        </View>
                    </View>
                ) :
                <ScrollView>
                    <View style={styles.mainView} >
                    <View style={styles.mainViewTopSpace} ></View>
                        <View style={styles.topNavigationHeader}>
                            <View style={styles.topNavigationHeaderArrowView} >
                                <TouchableOpacity onPress={() => backTouserLogInScreen()}>
                                {/* <TouchableOpacity> */}
                                    <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.topNavigationHeaderTextView}>
                                <Text style={styles.topNavigationHeaderText}>Login / Register</Text>
                            </View>
                        </View>
                
                        <View style={ styles.mainViewSignin}>
                        {/* <View style={styles.signupLogView} >
                                <Image style={styles.signupLog} source={require('./assets/icon.png')}/>
                            </View> */}
                            <View style={styles.signUpTitleView} >
                                <Text style = {styles.signUpTitleText}> Set Up Your Account </Text>
                            </View>
                            {/* <Text style={styles.textlable} >Profile Details </Text> */}
                
                            <View style={styles.signUpDetailsView} >
                                <TextInput style={styles.input} placeholder="Fisrt Name" placeholderTextColor = "#fff" onChangeText={text => setuserFName (text)} />
                                <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor = "#fff" onChangeText={text => setuserLName (text)} />
                                <TextInput style={styles.input} placeholder="Phone" placeholderTextColor = "#fff" onChangeText={text => setuserPhone (text)} />
                                <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor = "#fff" onChangeText={text => setuserEmail (text)} />
                                <TextInput style={styles.input} placeholder="Password" placeholderTextColor = "#fff" onChangeText={text => setuserPassword (text)} />
                            </View>
                
                    
                            <View style={styles.signUpBtnsView}>
                                {/* <TouchableOpacity style={styles.button} onPress={()=>storeUserOfflineData()} > */}
                                <TouchableOpacity style={styles.button} onPress={()=>registerUserAccount()} >
                                    <Text style = {styles.btnText} >Register</Text>
                                </TouchableOpacity>
                
                                <TouchableOpacity style={styles.button} onPress={()=>backTouserLogInScreen()} >
                                    <Text style = {styles.btnText} >Log In</Text>
                                </TouchableOpacity>
                            </View>
                
                        </View>
                    </View>
                </ScrollView>
                }
            </>
            // do nathing fisrt outer Conditional Operator
                // else block
        }
        
        </NavigationContainer>
        </>
    );
}

// eas build -p android --profile preview
// flat list view
// https://stackoverflow.com/questions/50596996/react-native-asyncstorage

// https://www.tutofox.com/react-native/tutorial-app-delivery-react-native-api-part-5-cart/
