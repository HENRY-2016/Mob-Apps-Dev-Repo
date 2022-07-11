

import  React, {useState} from 'react';
import { Text, View, Image,ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import styles from "./src/screens/stylesheet";
import Tabs from './src/screens/Tabs';
import ImageLog from "./assets/logo.png"

export default function App() {
const [showSplashScreen , setshowSplashScreen] = useState(true);; 
setTimeout(()=>{ setshowSplashScreen(false)},4000);

    return (
        <>
        <NavigationContainer>
        {showSplashScreen ? (<>
            
            <View style={styles.splashScreenMainView} >
                <View style={styles.mainViewSplah} >
                    <View style={styles.splashScreenView} >
                        <Image style={styles.splashScreenImage} source={ImageLog}/>
                    </View>
                    
                    <View style={{height:30}}></View>
                    <View style={styles.splashScreenTextView}>
                        <Text style={styles.splashScreenText}>Kam Property</Text>
                    </View>
                    {/* <View style={styles.activityIdicaterView}>
                        <View style={styles.activityIdicatercontainer}>
                            <ActivityIndicator size="large" color="#5800c4" />
                        </View>
                    </View> */}
                </View>
            </View>
            </>)
            :
            <Tabs/>
            }
            
        </NavigationContainer>
        </>
    );
}

// eas build -p android --profile preview
