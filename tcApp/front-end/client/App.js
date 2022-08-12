import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,Text} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';


// UIs
import styles from "./src/screens/stylesheet";
import Home from './src/screens/Home';
import Club from './src/screens/Club';
import Holiday from './src/screens/Holiday';
import Loan from './src/screens/Loan';
import Services from './src/screens/Services';
import Saloon from './src/screens/Saloon';
import Agency from './src/screens/Agency';
import Providers from './src/screens/Providers';
import Store from './src/screens/Store';
import TeamImage from './src/imgs/teamwork.png';
import FeedBack from './src/screens/Feedback';
import Claims from './src/screens/Claims';
import Chat from './src/screens/chat';

function CustomDrawerContent(props) {
return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerMainUserView}>
                <View style={{height:20,}}></View>
                <View style={styles.drawerUserView}>
                <Image source={TeamImage} style={styles.drawerIcon} />
                </View>
                <View>
                <Text  style={ styles.drawerUserName}>Triple Care Group</Text>
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
        drawerActiveBackgroundColor:'#5800c4',
        drawerInactiveTintColor:'#5800c4',
        drawerActiveTintColor:'#fff',
        drawerLabelStyle:{fontSize: 17,marginLeft:20}
        }}
    >
        
        
        <Drawer.Screen name="Home"   component={Home} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Home',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Chat"   component={Chat} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Chat',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Club"   component={Club} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Club',unmountOnBlur: true,
        }} />


        <Drawer.Screen name="Claims"   component={Claims} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Claims',unmountOnBlur: true,
        }} />
        

        <Drawer.Screen name="Loan" component={Loan} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Loan',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Store"   component={Store} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Store',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Agency"   component={Agency} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Agency',unmountOnBlur: true,
        }} />


        <Drawer.Screen name="Saloon"   component={Saloon} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Saloon',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Services"   component={Services} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Services',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Providers"   component={Providers} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Providers',unmountOnBlur: true,
        }} />

        
        <Drawer.Screen name="Holiday"   component={Holiday} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Holiday Homes',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="FeedBack"   component={FeedBack} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc FeedBack',unmountOnBlur: true,
        }} />


        

        
    </Drawer.Navigator>
    );
    }

    export default function App() {

    const [showSplashScreen , setshowSplashScreen] = useState(true);; 
    setTimeout(()=>{ setshowSplashScreen(false)},4000);
    return (

    <>
    <NavigationContainer >

        {
        showSplashScreen ? 
        (
            <>
            <View style={styles.mainView} >
                    <View style={styles.mainViewSplah} >

                        <View style={styles.splashScreenView} >
                            <Image style={styles.splashScreenImage} source={require('./assets/loading.png')}/>
                        </View>

                        <View style={styles.splashScreenTextView}>
                            <Text style={styles.splashScreenText}>Triple Care Ltd</Text>
                        </View>
                    </View>
                </View>
            </>
        )
        :
        <DrawerNavigation/>
        }
        
    </NavigationContainer>
    </>
);}

// eas build -p android --profile preview
