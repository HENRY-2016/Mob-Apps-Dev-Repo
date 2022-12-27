

import  React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/screens/Tabs';
import {View,Image,ActivityIndicator,Text, ScrollView} from "react-native";
import styles from "./src/screens/stylesheet";
import {    
            // Safaris Screen
            initSafarisScreenSafarisProfileAppData,initSafarisScreenSafarisMoreInfoAppData,
            initSafarisScreenSafarisParksVirtualTourAppData,initSafarisScreenSafarisTourTripsAppData,

            // About Us
            initAboutUsScreenAppData,
            initAboutNewsBlogsScreenAppData,initAboutPoliciesScreenAppData,
            initAboutRwandaScreenAppData,initAboutUgandaScreenAppData,

            initHomeNotificationAppData,
        } from './src/screens/AppDataFile';

export default function App() {

    const [showSplashScreen , setShowSplashScreen] = useState(true);; 
    setTimeout(()=>{ setShowSplashScreen(false)},4000);

    useEffect(() => {
                        // Define a function which calls a function
                        setTimeout(()=>{console.log("");console.log("");console.log("=====> Inside App.js Loading Screen App Data <=====")},3000);
                        // Safari Screen
                        setTimeout(()=>{initHomeNotificationAppData()},1000);
                        setTimeout(()=>{initSafarisScreenSafarisProfileAppData()},2000);
                        setTimeout(()=>{initSafarisScreenSafarisMoreInfoAppData()},3000);
                        setTimeout(()=>{initSafarisScreenSafarisParksVirtualTourAppData()},3000);
                        setTimeout(()=>{initSafarisScreenSafarisTourTripsAppData()},3000);
                        // About Screen
                        setTimeout(()=>{initAboutNewsBlogsScreenAppData()},3000);
                        setTimeout(()=>{initAboutPoliciesScreenAppData()},3000);
                        setTimeout(()=>{initAboutRwandaScreenAppData()},3000);
                        setTimeout(()=>{initAboutUgandaScreenAppData()},3000);
                        setTimeout(()=>{initAboutUsScreenAppData()},3000);

                    }, [])

    return (
        <>
        <NavigationContainer>
        {
            showSplashScreen ? 
            (
                <>
                        <View style={styles.mainViewSplash} >
                        <View style={styles.mainInnerViewSplash} >
                        <View style={styles.mainInner2ViewSplash} >
                                <ScrollView showsHorizontalScrollIndicator={false}>
                                    <View style={{height:10}}></View>
                                    <View style={{alignItems:'center'}} >
                                        <View style={{height:20}} ></View>
                                        <Text style={styles.SplashHeadingOneText} >Welcome</Text>
                                        <View style={{height:10}} ></View>
                                        <Text style={styles.SplashHeadingOneText} >To </Text>
                                    </View>
                                    <View style={styles.splashScreenView} >
                                        <View style={{alignItems:'center'}} >
                                            <View style={{height:10}}></View>
                                            <Image style={styles.splashScreenLogoIcon} source={require('./assets/logo.png')}/>
                                            <View style={{height:10}}></View>
                                            <Image style={styles.splashScreenLogoImage} source={require('./assets/1.png')}/>
                                        </View>
                                    </View>

                                    <View style={styles.activityIndicatorView}>
                                        <View style={styles.activityIndicatorContainer}>
                                            <ActivityIndicator size="large" color="#008000"/>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                            </View>
                        </View>
                </>
            )
            :
            <Tabs/>
        }
        </NavigationContainer>
        </>
    );
}

// eas build -p android --profile preview
