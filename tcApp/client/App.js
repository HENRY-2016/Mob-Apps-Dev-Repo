import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {View,Image,Text} from "react-native";

import { 
        MaterialCommunityIcons,Entypo,Fontisto,FontAwesome5,
        Feather,MaterialIcons,Ionicons,
        
    } from '@expo/vector-icons';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {LoadAgencyData } from './src/screens/AppDataFile';
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
import Projects from './src/screens/Projects';
import Live from './src/screens/Live';
import Media from './src/screens/Media';

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
        drawerStyle: {backgroundColor: '#F7F7EE',width: 215},
        drawerActiveBackgroundColor:'#5800c4',
        drawerInactiveTintColor:'#5800c4',
        drawerActiveTintColor:'#fff',
        drawerLabelStyle:{fontSize: 17,marginLeft:0}
        }}
    >
        
        
        <Drawer.Screen name="Home"   component={Home} options={{headerShown: false,swipeEnabled: false,
        title: 'Home',unmountOnBlur: true,
        drawerIcon:() => (<Feather name="home" size={26} color="#5800c4"/>),
        }} />


        <Drawer.Screen name="Club"   component={Club} options={{headerShown: false,swipeEnabled: false,
        title: 'Club',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="cards-club" size={26} color="#5800c4" />),
        }} />
        

        <Drawer.Screen name="Store"   component={Store} options={{headerShown: false,swipeEnabled: false,
        title: 'Store',unmountOnBlur: true,
        drawerIcon:() => (<Entypo name="shopping-cart" size={26} color="#5800c4" />),
        }} />

    

        <Drawer.Screen name="Health"   component={Health} options={{headerShown: false,swipeEnabled: false,
        title: 'Health',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="heading" size={26} color="#5800c4" /> ),
        }} />

        

        <Drawer.Screen name="Media"   component={Media} options={{headerShown: false,swipeEnabled: false,
        title: 'Media',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-tv" size={26} color="#5800c4" />),
        }} />

        <Drawer.Screen name="Agency"   component={Agency} options={{headerShown: false,swipeEnabled: false,
        title: 'Agency',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="workspaces-filled" size={26} color="#5800c4" />),
        }} />

        {/* <Drawer.Screen name="DemoLocation"   component={DemoLocation} options={{headerShown: false,swipeEnabled: false,
        title: 'image',unmountOnBlur: true,
        }} />  */}


        <Drawer.Screen name="Projects"   component={Projects} options={{headerShown: false,swipeEnabled: false,
        title: 'Projects',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="project-diagram" size={26} color="#5800c4" />),
        }} />

        {/* <Drawer.Screen name="Services"   component={Services} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Services',unmountOnBlur: true,
        }} /> */}
        
        <Drawer.Screen name="Transport" component={Transport} options={{headerShown: false,swipeEnabled: false,
        title: 'Transport',unmountOnBlur: true,
        drawerIcon:() => (<Fontisto name="motorcycle" size={26} color="#5800c4" />),
        }} />

        

        <Drawer.Screen name="Providers"   component={Providers} options={{headerShown: false,swipeEnabled: false,
        title: 'Providers',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-people-sharp" size={26} color="#5800c4" />),
        }} />
        
        

        <Drawer.Screen name="Live"   component={Live} options={{headerShown: false,swipeEnabled: false,
        title: 'Live Chat',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-chatbubble-ellipses" size={26} color="#5800c4" />),
        }} />

        <Drawer.Screen name="Holiday"   component={Holiday} options={{headerShown: false,swipeEnabled: false,
        title: 'Our Homes',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="home" size={26} color="#5800c4" />),
        }} />

        <Drawer.Screen name="FeedBack"   component={FeedBack} options={{headerShown: false,swipeEnabled: false,
        title: 'FeedBacks',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="feedback" size={26} color="#5800c4"/>),
        }} />

        
    </Drawer.Navigator>
    );
    }

export default function App() {

    const [showSplashScreen , setshowSplashScreen] = useState(true);
    setTimeout(()=>{ setshowSplashScreen(false)},4000);
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

                    <View style={{alignItems:'center'}}>
                        <Text style={styles.splashScreenText}>Triple Care Group</Text>
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
// eas build -p ios --profile preview *150*3#
