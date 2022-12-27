import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {View,Image,Text} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { LoadTcHealthAppData,LoadAgencyData } from './src/screens/AppDataFile';
// UIs
import styles from "./src/screens/stylesheet";
import Home from './src/screens/Home';
import Club from './src/screens/Club';
import Holiday from './src/screens/Holiday';
import Transport from './src/screens/Transport';
import Health from './src/screens/Health';
import Agency from './src/screens/Agency';
import Providers from './src/screens/Providers';
import Store from './src/screens/Store';
import TeamImage from './src/imgs/teamwork.png';
import FeedBack from './src/screens/Feedback';
import Claims from './src/screens/Claims';
import Live from './src/screens/Live';
import Tv from './src/screens/Tv';
import News from './src/screens/News';
import DemoLocation from './src/screens/DemoLocation';
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


        <Drawer.Screen name="Club"   component={Club} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Club',unmountOnBlur: true,
        }} />
        
        <Drawer.Screen name="News"   component={News} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc News',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Store"   component={Store} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Store',unmountOnBlur: true,
        }} />

    

        <Drawer.Screen name="Health"   component={Health} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Health',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Agency"   component={Agency} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Agency',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="DemoLocation"   component={DemoLocation} options={{headerShown: false,swipeEnabled: false,
        title: 'image',unmountOnBlur: true,
        }} /> 


        {/* <Drawer.Screen name="Saloon"   component={Saloon} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Saloon',unmountOnBlur: true,
        }} /> */}

        {/* <Drawer.Screen name="Services"   component={Services} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Services',unmountOnBlur: true,
        }} /> */}
        
        <Drawer.Screen name="Transport" component={Transport} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Transport',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Tv"   component={Tv} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Tv Shows',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Providers"   component={Providers} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Providers',unmountOnBlur: true,
        }} />
        
        <Drawer.Screen name="Holiday"   component={Holiday} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Holiday Homes',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="Live"   component={Live} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Live Chat',unmountOnBlur: true,
        }} />

        <Drawer.Screen name="FeedBack"   component={FeedBack} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc User FeedBack',unmountOnBlur: true,
        }} />

        
    </Drawer.Navigator>
    );
    }

export default function App() {

    const [showSplashScreen , setshowSplashScreen] = useState(true);
    setTimeout(()=>{ setshowSplashScreen(false)},4000);
    setTimeout(()=>{ LoadTcHealthAppData()},2000);
    setTimeout(()=>{ LoadAgencyData()},2000);

    

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
