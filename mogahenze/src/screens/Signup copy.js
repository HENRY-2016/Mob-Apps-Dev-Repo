
import React, {useState } from 'react';
import {View,Text,TextInput,TouchableOpacity} from 'react-native';
import axios from 'axios';
// import {createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from './firebase-config';

import styles from "./stylesheet"

const signupapi = "http://192.168.0.157:8000/api/accounts/register";

function Signup ()
{
    const [userName, setuserName] = useState('');
    const [userPhone, setuserPhone] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');

    const [requestError,setRequestError] = useState();

    const redirectToHomeScreen = () =>{navigation.navigate('Home')}
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

    return (
        <View style={ styles.mainViewSignin}>

            <Text style={styles.textlable} >Create Account </Text>

            <TextInput style={styles.input} placeholder="Name" placeholderTextColor = "#9a73ef" onChangeText={text => setuserName (text)} />
            <TextInput style={styles.input} placeholder="Phone" placeholderTextColor = "#9a73ef" onChangeText={text => setuserPhone (text)} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor = "#9a73ef" onChangeText={text => setuserEmail (text)} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor = "#9a73ef" onChangeText={text => setuserPassword (text)} />


            <TouchableOpacity style={styles.button} onPress={()=> showDetailsInput ()}>
                <Text style = {styles.btnText}> Next </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={()=>signUpUser()} >
                <Text style = {styles.btnText} >Sign Up</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signin')}>
                <Text style = {styles.btnText}> Signin </Text>
            </TouchableOpacity>

        </View>
    );
};


export default Signup;
