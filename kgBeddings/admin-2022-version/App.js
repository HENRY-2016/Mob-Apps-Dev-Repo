import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {View,Image,ActivityIndicator,Text} from "react-native";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Entypo,FontAwesome5,MaterialCommunityIcons} from '@expo/vector-icons';
import { NavigationIcon } from './src/screens/Functions';
// UIs
import styles from "./src/screens/stylesheet";
import Dashboard from './src/screens/Dashboard';
import OrdersNew from './src/screens/OrdersNew';
import OrdersCleared  from './src/screens/OrdersCleared';
import OrdersPending  from './src/screens/OrdersPending';
import Babies from './src/screens/Babies';
import PaymentsFull from './src/screens/PaymentsFull';
import PaymentsHalf from './src/screens/PaymentsHalf';
import PaymentsCleared from './src/screens/PaymentsCleared';
import PaymentsPending from './src/screens/PaymentsPending';

import Icon1 from "./src/imgs/dashboard/1.png";
import Icon3 from "./src/imgs/dashboard/3.png";
import Icon4 from "./src/imgs/dashboard/4.png";
import Icon5 from "./src/imgs/dashboard/5.png";
import Icon6 from "./src/imgs/dashboard/6.png";
import Icon7 from "./src/imgs/dashboard/7.png";
import Icon8 from "./src/imgs/dashboard/8.png";


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
        drawerIcon:() => (<NavigationIcon image={Icon3} />),
        }}/>
        <Drawer.Screen name="Babies" component={Babies} options={{headerShown: false,swipeEnabled: false,
        title: 'Babies',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon5} />),
        }} />
        
        <Drawer.Screen name="PaymentsFull" component={PaymentsFull} options={{headerShown: false,swipeEnabled: false,
        title: 'Payments Full',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon8} />),
        }} />
        <Drawer.Screen name="PaymentsHalf" component={PaymentsHalf} options={{headerShown: false,swipeEnabled: false,
        title: 'Payments  Half',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon8} />),
        }} />
        <Drawer.Screen name="PaymentsPending" component={PaymentsPending} options={{headerShown: false,swipeEnabled: false,
        title: 'Payments Pending',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon7} />),
        }} />
        <Drawer.Screen name="PaymentsCleared" component={PaymentsCleared} options={{headerShown: false,swipeEnabled: false,
        title: 'Payments Cleared',unmountOnBlur: true,
        drawerIcon:() => (<NavigationIcon image={Icon6} />),
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
