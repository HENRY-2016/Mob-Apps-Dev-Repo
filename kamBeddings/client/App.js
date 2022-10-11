import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,Text,ImageBackground,ActivityIndicator} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Entypo,Ionicons,FontAwesome, FontAwesome5,MaterialCommunityIcons, MaterialIcons,} from '@expo/vector-icons';

// UIs
import styles from "./src/screens/stylesheet";
import Home from './src/screens/Home';
import About from './src/screens/About';
import Babies from './src/screens/Babies';
import BedRoomOne from './src/screens/BedRoomOne';
import BedRoomTwo from './src/screens/BedRoomTwo';
import BedRoomThree from './src/screens/BedRoomThree';
import LivingRoom from './src/screens/LivingRoom';
import BathRoom from './src/screens/BathRoom';
import Cart from './src/screens/Cart';
import MyOrders from './src/screens/MyOrders';
import FeedBack from './src/screens/FeedBack';


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

function DrawerNavigetion() {
  return (
    <Drawer.Navigator initialRouteName="Home"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={{
        drawerStyle: {backgroundColor: '#1F75FE',width: 240},
        drawerActiveBackgroundColor:'#af4035',
        drawerInactiveTintColor:'#fff',
        drawerActiveTintColor:'#fff',
        drawerLabelStyle:{fontSize: 17,marginLeft:-20}
      }}
    
    >
      
        <Drawer.Screen name="Home"   component={Home} options={{headerShown: false,swipeEnabled: false,
        title: 'Home',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="home" size={26} color="white" />),
        }} />
        {/* <Drawer.Screen name="Offers"  component={Offers} options={{headerShown: false,swipeEnabled: false,
        title: 'Offers',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="offer" size={26} color="white" />),
        }}/> */}
        <Drawer.Screen name="Babies" component={Babies} options={{headerShown: false,swipeEnabled: false,
        title: 'Babies',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome name="child" size={26} color="white" />),
        }} />
        <Drawer.Screen name="Cart"  component={Cart} options={{headerShown: false,swipeEnabled: false,
        title: 'My Cart',unmountOnBlur: true,
        drawerIcon:() => (<FontAwesome5 name="shopping-cart" size={24} color="white" />),
        }}/>
        {/* <Drawer.Screen name="BlackFriday" component={BlackFriday} options={{headerShown: false,swipeEnabled: false,
        title: 'Black Friday',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="gift" size={26} color="white" />),
        }} /> */}
        
        <Drawer.Screen name="BathRoom" component={BathRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'Bath Room ',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="bathtub"  size={26} color="white" />),
        }} />
        
        <Drawer.Screen name="LivingRoom" component={LivingRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'Living Room',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="sofa" size={26} color="white" />),
        }} />
        <Drawer.Screen name="BedRoomOne" component={BedRoomOne} options={{headerShown: false,swipeEnabled: false,
        title: 'Bed Room One',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-bed" size={26} color="white" />),
        }} />
        <Drawer.Screen name="BedRoomTwo" component={BedRoomTwo} options={{headerShown: false,swipeEnabled: false,
        title: 'Bed Room Two',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-bed" size={26} color="white" />),
        }} />
        <Drawer.Screen name="BedRoomThree" component={BedRoomThree} options={{headerShown: false,swipeEnabled: false,
        title: 'Bed Room Three',unmountOnBlur: true,
        drawerIcon:() => (<Ionicons name="ios-bed" size={26} color="white" />),
        }} />

        <Drawer.Screen name="MyOrders"  component={MyOrders} options={{headerShown: false,swipeEnabled: false,
        title: 'My Orders',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="account-box" size={30} color="white" />),
        }}/>
        <Drawer.Screen name="About"   component={About} options={{headerShown: false,swipeEnabled: false,
        title: 'About Us',unmountOnBlur: true,
        drawerIcon:() => (<Entypo name="help-with-circle" size={26} color="white" />),
        }} />
        <Drawer.Screen name="FeedBack"   component={FeedBack} options={{headerShown: false,swipeEnabled: false,
        title: 'Feed Back',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="feedback" size={26} color="white" />),
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
            <View style={styles.mainViewSplah} >
                  <View style={[styles.splashScreenTextView,styles.splashScreenTextView1]}>
                        <Text style={styles.splashScreenText}>Hello Welcome To </Text>
                    </View>

                    <View style={styles.splashScreenView} >
                        <Image
                        style={styles.splashScreenImage}
                        source={require('./assets/bg-1.png')}
                        />
                    </View>

                      <View style={[styles.splashScreenTextView,styles.splashScreenTextView2]}>
                          <Text style={styles.splashScreenText}>Kam Beddings</Text>
                      </View>

                      <View style={styles.activityIdicaterView}>
                          <View style={styles.activityIdicatercontainer}>
                          <ActivityIndicator size="large" style={{marginTop:-50}} color="#fff" />

                          </View>
                      </View>
                  
              </View>
          </>
        )
        :
        <DrawerNavigetion/>
      }
        
    </NavigationContainer>
    </>
  );
}

// eas build -p android --profile preview
