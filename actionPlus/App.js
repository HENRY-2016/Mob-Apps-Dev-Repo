import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,Text} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';


// UIs
import styles from "./src/screens/stylesheet";
import Home from './src/screens/Home';
import Founder from './src/screens/Founder';
import Partners from './src/screens/Partners';
import Team from './src/screens/Team';
import Branches from './src/screens/Branches';
import Awards from './src/screens/Awards';
// import Notifications from './src/screens/Notifications';
import Sponsors from './src/screens/Sponsors';
import Profile from './src/screens/Profile';
// import FeedBacks from './src/screens/FeedBacks';


function CustomDrawerContent(props) {
return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerMainUserView}>
                <View style={{height:20,}}></View>
                <View style={styles.drawerUserView1}>
                {/* <Image source={TeamImage} style={styles.drawerIcon} /> */}
                <EvilIcons name="user" size={180} color="white" />
                </View>
                <View>
                <View style={{height:30}}></View>
                {/* <Text  style={ styles.drawerUserName}></Text> */}
                {/* <Text  style={ styles.drawerUserName}>{UserSignedInName}</Text> */}
                {/* {UserSignedInName ?(<>n</>):(<>n</>)} */}
                </View>
            </View>
        <DrawerItemList {...props} />
        </DrawerContentScrollView>
    </View>
    );
    }



    const Drawer = createDrawerNavigator();

    function DrawerNavigation() {
    return (
    <Drawer.Navigator initialRouteName="Home"
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}

        screenOptions={{
        drawerStyle: {backgroundColor: '#F7F7EE',width: 228},
        drawerActiveBackgroundColor:'#c46210',
        drawerInactiveTintColor:'#c46210',
        drawerActiveTintColor:'#fff',
        drawerLabelStyle:{fontSize: 18,marginLeft:20}
        }}
    >
        
        
        <Drawer.Screen name="Home"   component={Home} options={{headerShown: false,swipeEnabled: false,
        title: 'Home',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Team" component={Team} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Team',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Awards"   component={Awards} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Awards',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Founder"   component={Founder} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Founder',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Partners"   component={Partners} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Partners',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Sponsors"   component={Sponsors} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Sponsors',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Branches"   component={Branches} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Branches',unmountOnBlur: true,
        }} />

        {/* <Drawer.Screen name="Notifications"   component={Notifications} options={{headerShown: false,swipeEnabled: false,
        title: 'Notifications',unmountOnBlur: true,
        }} /> */}


        <Drawer.Screen name="Profile"   component={Profile} options={{headerShown: false,swipeEnabled: false,
        title: 'My Profile',unmountOnBlur: true,
        }} />

        {/* <Drawer.Screen name="FeedBacks"   component={FeedBacks} options={{headerShown: false,swipeEnabled: false,
        title: 'Feed Backs',unmountOnBlur: true,
        }} /> */}
        
    </Drawer.Navigator>
    );
    }

    export default function App() {

    const [showSplashScreen , setshowSplashScreen] = useState(true);
    const [IsUserSignedIn , setIsUserSignedIn] = useState(false); 
    const [UserSignedInName, setUserSignedInName] = useState('');

    setTimeout(()=>{ setshowSplashScreen(false)},4000);

    useEffect(()=>{userName();},[]);
    
    
        const userName = () => 
        {
            // set showSplashScreen to false aft 5 secs
            setTimeout(()=>{ setshowSplashScreen(false)},4000);

            try 
            {   AsyncStorage.getItem ('MemberDetails')
                .then(value =>{if (value != null)
                    {
                        const jsonData = JSON.parse(value)

                        let Name = jsonData[0].Name;    
                        setUserSignedInName(Name)
                        // setIsUserSignedIn(true)
                    }})
            }catch (error) { console.log(error)}
        }
    return (

    <>
    <NavigationContainer >

        {/* {
        showSplashScreen ? 
        (
            <>
            <View style={styles.mainView} >
                    <View style={styles.mainViewSplah} >

                        <View style={styles.splashScreenView} >
                            <Image style={styles.splashScreenImage} source={require('./assets/loading.png')}/>
                        </View>
                        
                    </View>
                </View>
            </>
        )
        :
        
        } */}
        <DrawerNavigation/>
    </NavigationContainer>
    </>
);}

// eas build -p android --profile preview
