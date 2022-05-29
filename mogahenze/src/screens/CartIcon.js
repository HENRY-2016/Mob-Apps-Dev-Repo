
import React, {useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,} from 'react-native';
import styles from "./stylesheet"

function CartIcon ()
{
    const [userEmail, setuserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');

    const redirectToHomeScreen = () =>{navigation.navigate('Home')}

    const logInUser = async () =>
    {
          // post data onPress={()=>signUpUser ()
            // const postrequest = await authAxios.post()
            try
                {
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

    const signOutUser = async () =>{ await signOut(auth)};

    return (
        <View style={ styles.mainViewSignin}>


            <Text style={styles.textlable} >Log In </Text>

            <TextInput style={styles.input} placeholder="Email" placeholderTextColor = "#9a73ef" onChangeText={text => setuserEmail (text)} />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor = "#9a73ef" onChangeText={text => setuserPassword (text)} />


            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Home')}>
                <Text style = {styles.btnText}> Sign In </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Signup')}>
                <Text style = {styles.btnText}> Sign Up </Text>
            </TouchableOpacity>

        </View>
    );
};


export default CartIcon;



// https://aboutreact.com/react-native-login-and-signup/#Example-of-Login-and-Register
// https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/
