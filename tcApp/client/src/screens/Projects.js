
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { Text, View, Alert,TextInput,TouchableOpacity,Platform, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import TcNewsImg from "../imgs/tcnews.png";
import { viewPdfFile,updateApp } from './Functions';
import { COLORS } from './Colours';
import {APIListAllNoticeBoard,APIListAllNews,
    APIPostNewsOrder,APIListAllCountries,
    APIPostLogIns,
} from './DataFileApis';


export default class Projects extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        NoticeBoard:[],
        Countries:[],
        News:[],
        
        // Major Screens
        DoNotShowHoneyFarmingScreen:false,
        DoNotShowFishFarmingScreen:true,
        DoNotShowMixedFarmingScreen:true,
        
    }
    
}

UNSAFE_componentWillMount () {}

showHoneyFarmingScreen = () => 
{
    this.setState({DoNotShowFishFarmingScreen:true})
    this.setState({DoNotShowMixedFarmingScreen:true})
    this.setState({DoNotShowHoneyFarmingScreen:false})
}
showFishFarmingScreen = () => 
{
    this.setState({DoNotShowMixedFarmingScreen:true})
    this.setState({DoNotShowHoneyFarmingScreen:true})
    this.setState({DoNotShowFishFarmingScreen:false})
}

showMixedFarmingScreen = () => 
{
    this.setState({DoNotShowFishFarmingScreen:true})
    this.setState({DoNotShowHoneyFarmingScreen:true})
    this.setState({DoNotShowMixedFarmingScreen:false})
}




render() {
    
    const {DoNotShowFishFarmingScreen,DoNotShowHoneyFarmingScreen,DoNotShowMixedFarmingScreen} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View>
            </View>

                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Welcome To Tc Projects  </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            <View style={styles.MainNavigationBtnView1}>
            <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showHoneyFarmingScreen} >
                        <Text style = {styles.btnText}>Honey Farming  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showFishFarmingScreen} >
                        <Text style = {styles.btnText}>Fish Farming  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showMixedFarmingScreen} >
                        <Text style = {styles.btnText}>Mixed Farming  </Text>
                    </TouchableOpacity>
                    

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </View>

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                
                {DoNotShowHoneyFarmingScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{height:20}} ></View>
                        <Text style={styles.AboutTitleText} >Tc Honey Farming Project</Text>

                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Vision</Text>
                        <Text style={styles.AboutText} >Economic empowerment of people and support for ministry through the
                        widespread introduction of beekeeping throughout Uganda.</Text>

                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Mission</Text>
                        <Text style={styles.AboutText} >To empower local people with skills in beekeeping, as a way of addressing
                        rural poverty and general health issues.</Text>
                        
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >Goals and Objectives</Text>
                        <Text style={styles.AboutText} >
                            • To establish 50 hives and train a core contingent of 10 local community members
                            in the practice of beekeeping.{"\n\n"}
                            • To introduce a further 100 local people to beekeeping as a means of providing
                            personal income and reducing local poverty with a targeted 40% adoption rate in
                            the first year.{"\n\n"}
                            • Improvement of local health standards through the use of bee products such as
                            honey and propolis.{"\n\n"}
                            • To provide financial resources for the work of NET Uganda in youth leadership
                            training and formation.{"\n\n"}
                            • To establish an innovative model of microeconomic enterprise which can be
                            replicated in other parts of Eastern Africa.
                        </Text>
                    </ScrollView>
                </>)}
                
                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                
                {DoNotShowFishFarmingScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{height:20}} ></View>
                        <Text style={styles.AboutTitleText} >Tc Fish Farming Project</Text>
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >We Involves In Aquaculture In Which Fish Are Raised In Enclosures To Be Sold As Food</Text>
                        <View style={{height:10}} ></View>
                        <Text style={styles.AboutTitleText} >Mityana Fish Farm</Text>
                        <Text style={styles.AboutText} >Tilapia , Cat Fish </Text>
                    </ScrollView>
                </>)}
                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                
                {DoNotShowMixedFarmingScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{height:20}} ></View>
                        <Text style={styles.AboutTitleText} >Tc Mixed Farming Project</Text>
                        <View style={{height:15}} ></View>
                        <Text style={styles.AboutTitleText} >We Involves In The Growing Of Crops & The Raising Of LiveStock</Text>
                        <View style={{height:10}} ></View>
                        <Text style={styles.AboutTitleText} >Bulaba, Mukono Farm </Text>
                        <Text style={styles.AboutText} >Goats, Pigs, Chicken, Cabbages, Tomatoes, Sugarcane</Text>
                        <View style={{height:10}} ></View>
                        <Text style={styles.AboutTitleText} >Mityana Farm</Text>
                        <Text style={styles.AboutText} >Cows, Cabbages, Tomatoes, Sugarcane</Text>
                    </ScrollView>
                </>)}
                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
            

                <View style={styles.MainBottomSpaceView}></View>
            </View>

    );
}
}
