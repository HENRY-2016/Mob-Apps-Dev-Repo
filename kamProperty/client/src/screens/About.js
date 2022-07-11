
import React from 'react';
import { Text, View,Linking, ScrollView} from 'react-native';
import { ServicesIcons } from './Functions';
import * as WebBrowser from 'expo-web-browser';
import styles from "./stylesheet";
// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';

import ServiceImage from '../imgs/about.png';


// import { DemoImages } from './DataFileApis';
export default class About extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                // Images
                // Screens
                // customer
        }
        
    }
    
componentDidMount() {}

mogaHenzeDotCom = async () => {await WebBrowser.openBrowserAsync('https://mogahenze.com');};


    render() {
        
        // const { HairStylesItem,BookedStyle} = this.state;
    
        return (
            <View style={styles.mainView}>
                
                    <View style={[styles.ModuleNameOuterTopView]} >
                        <View style={[styles.ModuleNameInnerTopView]}>
                        <View style={{height:30}}></View>

                            <View style={[styles.ModuleNameIconTextView]}>
                                <ServicesIcons image={ServiceImage}  />

                                <Text style={styles.ModuleNameTitleTextLabel}> About Kam Property</Text>
                            </View>
                        </View>
                    </View>

                <ScrollView>
                <View style={[styles.MainOuterServiceCardAboutView1,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainInnerServiceCardAboutView1,styles.MainInnerServiceCardView1]}>
                            <View style={styles.MainNavigationBtnView} >

                                <View style={{height:30}} ></View>
                                <Text  style={styles.AboutTextLabel}>Contacts </Text>
                                <View style={{height:30}} ></View>
                                <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=256789076919');}} style={styles.AboutTextLabel}> 0789 076 919</Text>
                                <View style={{height:10}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0751986447');}} style={styles.AboutTextLabel}>0751 986 447 </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('mailto:katoadirumwanje@gmail.com');}} style={styles.AboutTextLabel}>katoadirumwanje@gmail.com</Text>
                                <View style={{height:30}} ></View>                                

                                <Text  style={styles.AboutTextLabel}>Location </Text>
                                <Text  style={styles.AboutTextLabel}>Bulazzi House Ground Floor </Text>
                                <Text  style={styles.AboutTextLabel}>Kiwenda Along Mairye </Text>
                                <Text  style={styles.AboutTextLabel}>Road, Off Gayaza Road </Text>


                                <View style={{height:30}} ></View>

                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardAboutView2,styles.MainOuterServiceCardView8]} >
                        <View style={[styles.MainInnerServiceCardAboutView,styles.MainInnerServiceCardView8]}>
                            <View style={styles.MainNavigationBtnView} >
        
                                <View style={{height:30}} ></View>
                                <Text  style={styles.AboutTextLabel}>App Feedbacks And Issues </Text>
                                <View style={{height:30}} ></View>
                                <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=2560701243139');}} style={styles.AboutTextLabel}>0701 243 139  </Text>
                                <View style={{height:10}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0771977854');}} style={styles.AboutTextLabel}>0771 977 854 </Text>
                                <View style={{height:10}} ></View>
                                
                                {/* <TouchableOpacity onPress={this.mogaHenzeDotCom} style={styles.AboutTextLabel} >
                                    <Text style={styles.AboutTextLabel}>More  Info </Text>
                                </TouchableOpacity> */}
                                
                                <View style={{height:10}} ></View>
                                <Text  style={styles.AboutTextLabel}>Your Feed Back Is Important </Text>
                                <View style={{height:10}} ></View>
                                <Text  style={styles.AboutTextLabel}>Thank You</Text>
                                <View style={{height:10}} ></View>


                            </View>
                        </View>
                    </View>
































                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
    

            </View>
        );
    }
}
