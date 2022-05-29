import React, { useState } from "react";
import {View,Image,TextInput,TouchableOpacity,Text,Alert} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import PhoneInput from "react-native-phone-number-input";
import styles from "./stylesheet";

import Tabs from "./Tabs";
function Signup  ({navigation}) 
{
    // const {isUserRegistered} = React.useContext(globalStateContext);

    const [value, setValue] = useState("");
    const [showPhoneInput, setshowPhoneInput] = useState(true);
    // Ac set up
    const [userName, setuserName] = useState('');
    const [userPhone, setuserPhone] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');
    const [requestError,setRequestError] = useState();

    // functions
    const showDetailsInput = () =>
    {
        alert(
                userName +"<br/>"+
                userPhone+""+
                userEmail +""+userPassword
        );
    }


const signUpUser = async () =>
{
    try
    {
        // post data onPress={()=>signUpUser ()
        // const postrequest = await authAxios.post()

        const postrequest = await axios.post(signupapi,
            {
                "username":userName,
                "phone":userPhone,
                "email":userEmail,
                "password":userPassword
            },
        )
        alert(postrequest.data.status);
        redirectToHomeScreen();
    }

    catch (error)
        {
            // request error
            setRequestError(error.message)
            console.log("An Error")
            console.log(requestError);
            alert(requestError)

        };

}
    const redirectToHomeScreen = () =>{navigation.navigate('Products')}
    // const redirectToHomeScreen = () =>{ !isUserRegistered}
    const profileSetUp = ()  => {setshowPhoneInput(!showPhoneInput)}
    const backToprofileSetUp = ()  => {setshowPhoneInput(true)}

    const verifyPhoneNumber = () =>
    {
        Alert.alert(
            'Verify Phone Number',
            'Enter code sent via SMS to'+"+256"+value,
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'VERIFY', onPress: () => profileSetUp(), style: 'Verify'},
                ,
            ],
            {cancelable: false}  
        );
    }


    return (
    <>
        {showPhoneInput ?
        (
            <View style={styles.mainView} >
                <View style={styles.topNavigationHeader}>
                    <View style={styles.topNavigationHeaderArrowView} >
                        <TouchableOpacity>
                        {/* <TouchableOpacity> */}
                            <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topNavigationHeaderTextView}>
                        <Text style={styles.topNavigationHeaderText}>Login / Register</Text>
                    </View>
                </View>
                <View style={styles.signupView}>
                    <View style={styles.signupLogView} >
                        <Image style={styles.signupLog} source={require('../../assets/icon.png')}/>
                    </View>
                    
                    <Text style = {styles.signupText}> Enter Phone Number </Text>
                        <PhoneInput
                        // ref={phoneInput}
                        defaultValue={value}
                        defaultCode="UG"
                        layout="first"
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                    
                        withDarkTheme
                        withShadow
                        autoFocus
                        />

                        <TouchableOpacity style={styles.button} onPress={()=> verifyPhoneNumber ()}>
                            <Text style = {styles.btnText}> CONTINUE </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) :
            <View style={styles.mainView} >
                <View style={styles.topNavigationHeader}>
                    <View style={styles.topNavigationHeaderArrowView} >
                        <TouchableOpacity onPress={() => backToprofileSetUp()}>
                        {/* <TouchableOpacity> */}
                            <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.topNavigationHeaderTextView}>
                        <Text style={styles.topNavigationHeaderText}>Login / Register</Text>
                    </View>
                </View>

                <View style={ styles.mainViewSignin}>
                    <Text style={styles.textlable} >Create Account </Text>

                    <TextInput style={styles.input} placeholder="Name" placeholderTextColor = "#9a73ef" onChangeText={text => setuserName (text)} />
                    <TextInput style={styles.input} placeholder="Phone" placeholderTextColor = "#9a73ef" onChangeText={text => setuserPhone (text)} />
                    <TextInput style={styles.input} placeholder="Email" placeholderTextColor = "#9a73ef" onChangeText={text => setuserEmail (text)} />
                    <TextInput style={styles.input} placeholder="Password" placeholderTextColor = "#9a73ef" onChangeText={text => setuserPassword (text)} />


            

                    <TouchableOpacity style={styles.button} onPress={()=>redirectToHomeScreen()} >
                        <Text style = {styles.btnText} >Sign Up</Text>
                    </TouchableOpacity>


                    {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}>
                        <Text style = {styles.btnText}> Signin </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        }
    </>
    );
    };

export default Signup;