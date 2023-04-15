import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,ActivityIndicator,Text} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Entypo,Ionicons,FontAwesome,FontAwesome5,MaterialCommunityIcons, MaterialIcons,} from '@expo/vector-icons';
import { COLORS } from './src/screens/Colours';
// UIs
import styles from "./src/screens/stylesheet";
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import About from './src/screens/About';
import Babies from './src/screens/Babies';
import BedRoomOne from './src/screens/BedRoomOne';
import BedRoomTwo from './src/screens/BedRoomTwo';
import BedRoomThree from './src/screens/BedRoomThree';
import LivingRoom from './src/screens/LivingRoom';
import BathRoom from './src/screens/BathRoom';
import Cart from './src/screens/Cart';
import Offers from './src/screens/Offers';
import MyOrders from './src/screens/MyOrders';

import { 
          // LoadHomeData,LoadBabiesData,
          // LoadAboutTextData,LoadOffersData,

          // BedRoomOneItemsData,LoadBathRoomItemsData,
          // BedRoomTwoItemsData,BedRoomThreeItemsData,
          // LoadLivingRoomItemsData,
        } from './src/screens/AppDataFile';

function CustomDrawerContent(props) {
  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerUserView}>
            <Entypo name="user" size={100} style={styles.draweUserIcones}/>
          </View>
          <View>
            <Text  style={ styles.drawerUserName}>Our Products</Text>
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
        drawerStyle: {backgroundColor:COLORS.sideBarNavBgColor,width: 215},
        drawerActiveBackgroundColor:COLORS.colorNumberOne,
        drawerInactiveTintColor:COLORS.white,
        drawerActiveTintColor:COLORS.white,
        drawerLabelStyle:{fontSize: 17,marginLeft:-20}
      }}
    
    >
      
        
        
        <Drawer.Screen name="Home"   component={Home} options={{headerShown: false,swipeEnabled: false,
        title: 'Home',unmountOnBlur: true,
        drawerIcon:() => (<Entypo name="home" size={26} color="white" />),
        }} />

        <Drawer.Screen name="Search"   component={Search} options={{headerShown: false,swipeEnabled: false,
        title: 'Search',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome name="search" size={26} color="white" />),
        }} />
        <Drawer.Screen name="Offers"  component={Offers} options={{headerShown: false,swipeEnabled: false,
        title: 'Offers',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="offer" size={26} color="white" />),
        }}/>
        <Drawer.Screen name="Babies" component={Babies} options={{headerShown: false,swipeEnabled: false,
        title: 'Babies',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="baby" size={26} color="white" />),
        }} />
        <Drawer.Screen name="Cart"  component={Cart} options={{headerShown: false,swipeEnabled: false,
        title: 'My Cart',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="shopping-cart" size={26} color="white" />),
        }}/>

        <Drawer.Screen name="BathRoom" component={BathRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'Bath Room ',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="bath" size={26} color="white" />),
        }} />
        
        <Drawer.Screen name="LivingRoom" component={LivingRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'Living Room',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="sofa" size={26} color="white" />),
        }} />
        <Drawer.Screen name="BedRoomOne" component={BedRoomOne} options={{headerShown: false,swipeEnabled: false,
        title: 'Bed Room I',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="bed" size={26} color="white" />),
        }} />
        <Drawer.Screen name="BedRoomTwo" component={BedRoomTwo} options={{headerShown: false,swipeEnabled: false,
        title: 'Bed Room II',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="bed" size={26} color="white" />),
        }} />
        <Drawer.Screen name="BedRoomThree" component={BedRoomThree} options={{headerShown: false,swipeEnabled: false,
        title: 'Bed Room III',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="bed" size={26} color="white" />),
        }} />

        <Drawer.Screen name="MyOrders"  component={MyOrders} options={{headerShown: false,swipeEnabled: false,
        title: 'My Orders',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="account-circle" size={30} color="white" />),
        }}/>
        <Drawer.Screen name="About"   component={About} options={{headerShown: false,swipeEnabled: false,
        title: 'Social Media',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-videocam-sharp" size={26} color="white" />),
        }} /> 
        {/* <Drawer.Screen name="FeedBack"   component={FeedBack} options={{headerShown: false,swipeEnabled: false,
        title: 'Feed Back',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="feedback" size={26} color="white" />),
        }} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {

  const [showSplashScreen , setShowSplashScreen] = useState(true);; 
  setTimeout(()=>{ setShowSplashScreen(false)},4000);

  useEffect(()=>{ },[]);

  return (
    <>
    <NavigationContainer >

      {
        showSplashScreen ? 
        (<>
            <View style={styles.mainView} >
                  <View style={styles.mainSplashScreenView} >

                      <View style={styles.splashScreenView} >
                          <Image style={styles.splashScreenImage} source={require('./assets/log2.png')}/>
                      </View>

                      <View style={styles.splashScreenTextView}>
                          <Text style={styles.splashScreenText}>Welcome</Text>
                      </View>
                      <View style={styles.splashScreenTextView}>
                          <Text style={styles.splashScreenText}>To</Text>
                      </View>
                      <View style={styles.splashScreenTextView}>
                          <Text style={styles.splashScreenText}>Dr Kg Beddings</Text>
                      </View>

                      <View style={styles.splashScreenTextView}>
                          <Text style={styles.splashScreenText}>Loading ...</Text>
                      </View>

                      <View style={styles.activityIndicatorView}>
                          <View style={styles.activityIndicatorContainer}>
                              <ActivityIndicator size="large" color={COLORS.colorNumberOne} />
                          </View>
                      </View>
                  </View>
              </View>
          </>):
        <DrawerNavigation/>
      }
        
    </NavigationContainer>
    </>
  );
}

// eas build -p android --profile preview
// https://expo.dev/accounts/henry-2021/projects/kgBeddings-V-II/builds/f69f5a40-684d-472b-bacd-d99d4ffadfa2
