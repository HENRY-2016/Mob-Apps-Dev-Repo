import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from './src/screens/Colours';
import {View,Image,Text} from "react-native";

import { 
        MaterialCommunityIcons,Entypo,FontAwesome5,
        Feather,MaterialIcons,Ionicons,
        
    } from '@expo/vector-icons';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import {
        LoadHealthAppData,LoadAgencyData,
        LoadHolidayHomesAppData, 
        LoadProvidersListAppData

    } from './src/screens/AppDataFile';
    
// UIs
import styles from "./src/screens/stylesheet";
import Services from './src/screens/Services';
import Club from './src/screens/Club';
import Holiday from './src/screens/Holiday';
import Shop from './src/screens/Shop';
import TeamImage from './src/imgs/teamwork.png';
import FeedBack from './src/screens/Feedback';
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
    <Drawer.Navigator initialRouteName="Club"
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}

        screenOptions={{
        drawerStyle: {backgroundColor: '#F7F7EE',width: 222},
        drawerActiveBackgroundColor:'#5800c4',
        drawerInactiveTintColor:'#5800c4',
        drawerActiveTintColor:'#fff',
        drawerLabelStyle:{fontSize: 17,marginLeft:0}
        }}
    >
        
        
        <Drawer.Screen name="Club"   component={Club} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Club',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="cards-club" size={26} color={COLORS.colourNumberOne} />),
        }} />

        <Drawer.Screen name="Shop"   component={Shop} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Store',unmountOnBlur: true,
        drawerIcon:() => (<Entypo name="shopping-cart" size={26} color="#5800c4" />),
        }} />

        <Drawer.Screen name="Media"   component={Media} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Media',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-tv" size={26} color={COLORS.colourNumberOne} />),
        }} />

        <Drawer.Screen name="Holiday"   component={Holiday} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc  Homes',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="home" size={26} color={COLORS.colourNumberOne} />),
        }} />

        <Drawer.Screen name="Services"   component={Services} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc Services',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="hand-holding-water" size={28} color={COLORS.colourNumberOne} />),
        }} />

        <Drawer.Screen name="FeedBack"   component={FeedBack} options={{headerShown: false,swipeEnabled: false,
        title: 'Tc FeedBack',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="feedback" size={26} color={COLORS.colourNumberOne} />),
        }} />
        
        
    </Drawer.Navigator>
    );
    }

export default function App() {

    const [showSplashScreen , setshowSplashScreen] = useState(true);
    setTimeout(()=>{ setshowSplashScreen(false)},4000);
    setTimeout(()=>{ LoadAgencyData()},2000);
    setTimeout(()=>{ LoadHealthAppData()},2000);
    setTimeout(()=>{ LoadHolidayHomesAppData()},2000);
    setTimeout(()=>{ LoadProvidersListAppData()},2000);

    

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
