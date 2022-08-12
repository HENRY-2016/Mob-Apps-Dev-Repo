
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import {Ionicons, AntDesign,FontAwesome} from '@expo/vector-icons';

// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';

// import { formatNumberWithComma } from './Functions';

export default class Store extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
    
            // Screens
            DoNotShowHomeScreen:false,
            DoNotShowEmployeeScreen:true,
            DoNotShowAboutScreen:true,
            DoNotShowEmployerScreen:true,
            // customer
        }
        
    }
    
    componentDidMount() {}
    
showHomeScreen = () =>
{
    this.setState({DoNotShowEmployeeScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowEmployerScreen:true})
    this.setState({DoNotShowHomeScreen:false})
}
showEmployeeScreen = () =>
{
    this.setState({DoNotShowEmployerScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowEmployeeScreen:false})
}
showEmployerScreen = () =>
{
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowEmployeeScreen:true})
    this.setState({DoNotShowEmployerScreen:false})
}

showAboutScreen = () =>
{
    this.setState({DoNotShowEmployeeScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowEmployerScreen:true})
    this.setState({DoNotShowAboutScreen:false})
}

    
    render() {
        
        // const { HairStylesItem,BookedStyle} = this.state;
        const {DoNotShowHomeScreen,DoNotShowAboutScreen,DoNotShowEmployeeScreen,DoNotShowEmployerScreen } = this.state;
    
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

                    {/* <View style = { styles.productTopTitleNameView}>
                        <Text style = { styles.productTopTitleName}> Store </Text>
                    </View> */}
                    <View style={styles.mainChatView}>
                        <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                            <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.MainTopHeaderView} >
                        <View style={styles.MainTopHeaderTextView}>
                            <Text style={styles.MainTopHeaderTextLabel}> Store Products </Text>
                        </View>
                    </View>
                    <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
                    <View style={styles.MainTopRadiusSpaceBottomView} ></View>

                    <View style={styles.MainNavigationBtnView}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                            </View>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                <Text style = {styles.btnText}> Electronics  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                <Text style = {styles.btnText}> Phones </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                <Text style = {styles.btnText}> Tablets </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                <Text style = {styles.btnText}> Cloths </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}   >
                                <Text style = {styles.btnText}> And More </Text>
                            </TouchableOpacity>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={styles.ArrowMainView}>
                                <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                            </View>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                        </ScrollView>
                    </View>
                    <View style={{height:20}}></View>
        
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Home Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowHomeScreen ?<></>:(<>
                    {/* <Text  style = {styles.introClubText}>
                        Introduction Information 
                    </Text> */}
                    <Text style={styles.AboutTitleText} >Coming Soon</Text>

                    </>) }

                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin About Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    { DoNotShowAboutScreen ? <></>:(<>
                        <View style={{height:15}} ></View>
                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>

                            <Text style={styles.AboutTitleText} >Discount</Text>
                                <Text style={styles.AboutText} >
                                    Discount Information
                                </Text>
                            </View>
                        </View>

                        <View style={styles.MainOuterCardListView} >
                            <View  style={styles.MainInnerCardAboutView}>

                            <Text style={styles.AboutTitleText} >Terms And Conditions Apply </Text>
                                <Text style={styles.AboutText} >
                                Conditions Apply Conditions Apply Conditions Apply
                                </Text>
                            </View>
                        </View>
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Employee Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    { DoNotShowEmployeeScreen ?<></>:(<>
                        <View style={styles.orderListDetailsText} >

                            <TextInput style={styles.input} placeholder="Employee Name"  
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Employee Email" 
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Employee Phone" 
                            placeholderTextColor = "#5800c4" 
                            maxLength={10} keyboardType="numeric" 
                            />

                            <TextInput style={styles.input} placeholder="Employee Place"  
                            placeholderTextColor = "#5800c4" 
                            />

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showHomeScreen} >
                            <Text style = {styles.btnText}> Log In  </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                        </View>
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Employer Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}
                    {DoNotShowEmployerScreen ?<></>:(<>
                        <View style={styles.orderListDetailsText} >
                            <TextInput style={styles.input} placeholder="Employer Name"  
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Employer Email" 
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Employer Phone" 
                            placeholderTextColor = "#5800c4" 
                            maxLength={10} keyboardType="numeric" 
                            />

                            <TextInput style={styles.input} placeholder="Employer Place"  
                            placeholderTextColor = "#5800c4" 
                            />

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showHomeScreen} >
                                <Text style = {styles.btnText}> Send  </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                        </View>
                    </>)}
                    
                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
    
            </View>
        );
    }
}
