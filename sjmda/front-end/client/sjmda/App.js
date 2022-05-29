// import * as React from 'react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Text, View,Image,ScrollView,ActivityIndicator,TouchableOpacity,TextInput,Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {APILogIn} from './src/screens/DataFileApis';
import { AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './src/screens/Home';
import Savings from './src/screens/Savings';
import Projects from './src/screens/Projects';
import Pledges from './src/screens/Pledges';
import Profile from './src/screens/Profile';
import styles from "./src/screens/stylesheet";

// icones
import UserIcone from './src/imgs/user.png';
import PledgesIcone from './src/imgs/pledge.png';
import ProjectIcone from './src/imgs/projects.png';
import SavingsIcone from './src/imgs/savings.png';
import SjmdaIcone from './src/imgs/sjmda.png';
import LogInIcone from './src/imgs/padlock.png';
import Log from "./assets/logo.png";



const Tab = createMaterialTopTabNavigator();


const CustomTabLabel = ({image}) => 
	{return <Image source={image} style={{width: 40, height: 40}} />;};

function MyTabs() {
  return (
    <>
      {/* <View style={{height:20}} ></View> */}
    <Tab.Navigator
	initialRouteName="Home"
	screenOptions={{
        tabBarActiveTintColor: '#273be2',
        tabBarLabelStyle: { fontSize: 12,marginTop:5, },
        tabBarStyle: { backgroundColor: '#7B6CF6'},
        showLabel:false,
    
    }}
    >
	<Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'sjmda',
                    activeTintColor: "#273be2",
                    inactiveTintColor: "21147a",
                    activeBackgroundColor: "#21147a",
                    inactiveBackgroundColor: "#21147a",
                    swipeEnabled: false,unmountOnBlur: true,
                  tabBarLabel: () => (<CustomTabLabel image={SjmdaIcone} />),
                  }}
        
      />
      <Tab.Screen
        name="Savings"
        component={Savings}
        options={{ tabBarLabel: 'Accounts', 
                    activeTintColor: "#21147a",
                    inactiveTintColor: "21147a",
                    activeBackgroundColor: "#21147a",
                    inactiveBackgroundColor: "#21147a",
                    swipeEnabled: false,unmountOnBlur: true,
                  tabBarLabel: () => (<CustomTabLabel image={SavingsIcone} />),

                }}
      />
      <Tab.Screen
        name="Projects"
        component={Projects}
        options={{ tabBarLabel: 'Projects',
                    activeTintColor: "#21147a",
                    inactiveTintColor: "21147a",
                    activeBackgroundColor: "#21147a",
                    inactiveBackgroundColor: "#21147a", 
                    swipeEnabled: false,unmountOnBlur: true,
                    // tabBarIcon: () => (<FontAwesome5 name="project-diagram" size={26} color="black" />),
                    tabBarLabel: () => (<CustomTabLabel image={ProjectIcone} />),
                }}
      />
      <Tab.Screen
        name="Pledges"
        component={Pledges}
        options={{ tabBarLabel: 'Pledges', 
                  activeTintColor: "#21147a",
                  inactiveTintColor: "21147a",
                  activeBackgroundColor: "#21147a",
                  inactiveBackgroundColor: "#21147a",
                  swipeEnabled: false,unmountOnBlur: true,
                  // tabBarIcon: () => (<FontAwesome5 name="hands-helping" size={26} color="black" />),
                  tabBarLabel: () => (<CustomTabLabel image={PledgesIcone} />),
                }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{  
                  activeTintColor: "#21147a",
                  inactiveTintColor: "21147a",
                  activeBackgroundColor: "#21147a",
                  inactiveBackgroundColor: "#21147a",
                  swipeEnabled: false,unmountOnBlur: true,
                  tabBarLabel: () => (<CustomTabLabel image={UserIcone} />),
                }}
      />
    </Tab.Navigator>
    </>
  );
}


export default function App() {

const [showSplashScreen , setshowSplashScreen] = useState(true);; 
const [showLogInScreen , setshowLogInScreen] = useState(true);; 
const [UserName, setUserName] = useState('');
const [UserPassword, setUserPassword] = useState('');

useEffect(()=>{getUserName();
  setTimeout(()=>{setshowSplashScreen(false)},4000)
},[]);
    
    
const getUserName = () => 
{

	try 
	{   AsyncStorage.getItem ('UserName')
		.then(value =>{if (value != null)
		{setshowLogInScreen(false);}})
	}catch (error) { console.log(error)}
}
const logInUser = async () =>
    {
        let loginName = UserName;
        let loginPassword = UserPassword;
        if ((UserName.length == 0) ||(UserPassword.length == 0))
            {Alert.alert('Warning','Please All Fields Are Required ')}
        else
        {
            console.log(loginName+loginPassword)
            
            try
            {

				const loginrequest = await axios.post(APILogIn,
					{
						"Name":loginName,
						"Password":loginPassword,
					}
				)
				
				let result = loginrequest.data;
				if (result.length === 0)
				{Alert.alert("Sorry","\n\nInvalid UserName Or Password \n\n  Try Again\n")}
				else
				{
				let jsonStr = JSON.stringify(result);
				let newStr = jsonStr.substring(1, jsonStr.length-1);
				let jsonObj = JSON.parse(newStr);
				let user = jsonObj.NAME;
				let username = jsonObj.USERNAME;
				let id = jsonObj.ID;

					await AsyncStorage.setItem('UserName',user);
					await AsyncStorage.setItem('User',username);
					await AsyncStorage.setItem('ID',id);
					setshowLogInScreen(false);
				}
				
			}

            catch (error)
                {
                    Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+error)
                };
        }
    }

	return (
	<NavigationContainer>
		{showSplashScreen ?(<>
			<View style={styles.mainView}>
			<ScrollView>
				<View style={{height:80}} ></View>
				<View style={styles.SplashScreenMainView}>
					<View >
					<Text style={styles.SplashLabelText}>
					St. Joseph Men's Development Association Bweya Sub-Parish
					</Text>
					</View>
				</View>

				<View style={{height:30}} ></View>
				<View style={styles.SplashScreenMainView}>
					<View style={styles.LogImageView} >
						<Image source={Log} style={styles.LogImage} />
					</View>
				</View>

				<View style={{height:30}} ></View>
				<View style={styles.SplashScreenMainView}>	
					<View style={styles.LoadingLabelView}>
					<Text style={styles.LoadingLabelText}>Loading...</Text>
					</View>
					<View style={styles.LoadingIndicatorView}>
					<ActivityIndicator size="large" color="#273be2" />
					</View>
				</View>
			</ScrollView>
			</View>
			</>):(<>
			{showLogInScreen ?(<>
				<View style={styles.mainView}>
				<View style={{height:30}} ></View>
					<ScrollView>
						<View style={styles.innerHomeMainView}>
						<View style={[styles.logInCardView,styles.logInCardView1]}>
					<View style={{height:20}}></View>
					<View style={styles.logInImgView}>
					<Image source={LogInIcone} style={{width: 90, height: 90,}} />
					<View style={{height:20}}></View>
					<Text style={styles.textLabels}>Log In Please</Text>
					</View>

					<View style={{height:20}}></View>
					<TextInput style={styles.input} placeholder="User Name" onChangeText={text => setUserName (text)} 
						placeholderTextColor = "#273be2" maxLength={10} 
						/>
					<TextInput style={styles.input} placeholder="Password" onChangeText={text => setUserPassword (text)} 
						placeholderTextColor = "#273be2" maxLength={10}  
						/>

					<View style={{height:20}}></View>
					<TouchableOpacity onPress={logInUser}  style={styles.logInBtn} >
					<Text style={styles.btnText} >Log In</Text> 
					<View style={styles.logInArrowView}>
					<AntDesign name="login" size={30} color="#273be2" />

					</View>
					</TouchableOpacity>
					<View style={{height:20}}></View>
					</View>
					</View>
					</ScrollView>  
				</View>
			</>):(<><MyTabs /></>)}
			</>)}
    </NavigationContainer>
	);
}
// eas build --platform android