import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,ActivityIndicator,Text} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Entypo,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';

import { NavigationIcon } from './src/screens/Functions';
// UIs
import styles from "./src/screens/stylesheet";
import Dashboard from './src/screens/Dashboard';
import OrdersNew from './src/screens/OrdersNew';
import OrdersCleared  from './src/screens/OrdersCleared';
import OrdersPending  from './src/screens/OrdersPending';
import PaymentsFull from './src/screens/PaymentsFull';

import AddOthers from './src/screens/AddOthers';
import AddBathRoom from './src/screens/AddBathRoom';
import AddBedRoomOne from './src/screens/AddBedRoomOne';
import AddBedRoomThree from './src/screens/AddBedRoomThree';
import AddBedRoomTwo from './src/screens/AddBedRoomTwo';
import AddLivingRoom from './src/screens/AddLivingRoom';

import ViewOthers from './src/screens/ViewOthers';
import ViewBathRoom from './src/screens/ViewBathRoom';
import ViewBedRoomOne from './src/screens/ViewBedRoomOne';
import ViewBedRoomThree from './src/screens/ViewBedRoomThree';
import ViewBedRoomTwo from './src/screens/ViewBedRoomTwo';
import ViewLivingRoom from './src/screens/ViewLivingRoom';



import Icon1 from "./src/imgs/dashboard/1.png";
import Icon4 from "./src/imgs/dashboard/4.png";
import Icon5 from "./src/imgs/dashboard/5.png";
import Icon6 from "./src/imgs/dashboard/6.png";


function CustomDrawerContent(props) {
  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerUserView}>
            <Entypo name="user" size={100} style={styles.draweUserIcones}/>
          </View>
          <View>
            <Text  style={ styles.drawerUserName}>Admin</Text>
          </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
}



const Drawer = createDrawerNavigator();

function DrawerNavigetion() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard"
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={{
        drawerStyle: {backgroundColor: '#ff3333',width: 255},
        drawerActiveBackgroundColor:'#C70039',
        drawerInactiveTintColor:'#fff',
        drawerActiveTintColor:'#fff',
        drawerLabelStyle:{fontSize: 17,marginLeft:-20}
      }}
    
    >
      
        <Drawer.Screen name="Dashboard"   component={Dashboard} options={{headerShown: false,swipeEnabled: false,
        title: 'Dashboard',unmountOnBlur: true,
        drawerIcon:() => (<Entypo name="home" size={26} color="white" />),
        }} />
        <Drawer.Screen name="OrdersNew"  component={OrdersNew} options={{headerShown: false,swipeEnabled: false,
        title: 'Orders New',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon1} />),
        }}/>
      
        <Drawer.Screen name="OrdersCleared" component={OrdersCleared} options={{headerShown: false,swipeEnabled: false,
        title: 'Orders Cleared',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon4} />),
        }} />

        <Drawer.Screen name="OrdersPending"  component={OrdersPending} options={{headerShown: false,swipeEnabled: false,
        title: 'Orders Pending',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon5} />),
        }}/>

        <Drawer.Screen name="PaymentsFull" component={PaymentsFull} options={{headerShown: false,swipeEnabled: false,
        title: 'Cleared Payments',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon6} />),
        }} /> 
        
        
        <Drawer.Screen name="AddOthers" component={AddOthers} options={{headerShown: false,swipeEnabled: false,
        title: 'Add | Others',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="my-library-add" size={28} color="white" />),
        }} />
        <Drawer.Screen name="AddBathRoom" component={AddBathRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'Add | BathRoom',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="my-library-add" size={28} color="white" />),
        }} />
        <Drawer.Screen name="AddLivingRoom" component={AddLivingRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'Add | LivingRoom',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="my-library-add" size={28} color="white" />),
        }} />
        <Drawer.Screen name="AddBedRoomOne" component={AddBedRoomOne} options={{headerShown: false,swipeEnabled: false,
        title: 'Add | BedRoom 1',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="my-library-add" size={28} color="white" />),
        }} />
        <Drawer.Screen name="AddBedRoomTwo" component={AddBedRoomTwo} options={{headerShown: false,swipeEnabled: false,
        title: 'Add | BedRoom 2',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="my-library-add" size={28} color="white" />),
        }} />
        <Drawer.Screen name="AddBedRoomThree" component={AddBedRoomThree} options={{headerShown: false,swipeEnabled: false,
        title: 'Add | BedRoom 3',unmountOnBlur: true,
        drawerIcon:() => (<MaterialIcons name="my-library-add" size={28} color="white" />),
        }} />
      


        <Drawer.Screen name="ViewOthers" component={ViewOthers} options={{headerShown: false,swipeEnabled: false,
        title: 'View | Others',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="eye" size={30} color="white" />),
        }} />


        <Drawer.Screen name="ViewBathRoom" component={ViewBathRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'View | BathRoom',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="eye" size={30} color="white" />),
        }} />

        <Drawer.Screen name="ViewLivingRoom" component={ViewLivingRoom} options={{headerShown: false,swipeEnabled: false,
        title: 'View | LivingRoom',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="eye" size={30} color="white" />),
        }} />

        <Drawer.Screen name="ViewBedRoomOne" component={ViewBedRoomOne} options={{headerShown: false,swipeEnabled: false,
        title: 'View | BedRoom 1',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="eye" size={30} color="white" />),
        }} />

        <Drawer.Screen name="ViewBedRoomTwo" component={ViewBedRoomTwo} options={{headerShown: false,swipeEnabled: false,
        title: 'View | BedRoom 2',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="eye" size={30} color="white" />),
        }} />

        <Drawer.Screen name="ViewBedRoomThree" component={ViewBedRoomThree} options={{headerShown: false,swipeEnabled: false,
        title: 'View | BedRoom 3',unmountOnBlur: true,
        drawerIcon:() => (<MaterialCommunityIcons name="eye" size={30} color="white" />),
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
                          <Image style={styles.splashScreenImage} source={require('./assets/logo.png')}/>
                      </View>

                      <View style={styles.splashScreenTextView}>
                          <Text style={styles.splashScreenText}>Loading ...</Text>
                      </View>

                      <View style={styles.activityIdicaterView}>
                          <View style={styles.activityIdicatercontainer}>
                              <ActivityIndicator size="large" color="#fff" />
                          </View>
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
