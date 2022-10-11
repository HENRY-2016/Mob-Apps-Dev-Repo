
import React from 'react';
import { Text, View,Image, TouchableOpacity,Alert, Linking, ScrollView, TextInput} from 'react-native';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5,Ionicons,MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';
import {APIUserProfileTotals,APIUpdateDetails} from './DataFileApis';

import LogInIcone from '../imgs/update.png';
import UserIcone from '../imgs/user.png';
import DevIcone from '../imgs/dev.png';


export default class Profile extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        UserProfileSummary:[],
        UserName:'',
        User:'',
        Id:'',
        NewUserName:'',
        NewUserPassword:'',

        // Main Screens
        DoNotShowDetailsScreen: false,
        DoNotShowSettingsScreen: true,
    }
    
}
componentDidMount() 
{
    this.getUserName();
    setTimeout(()=>{this.getUserProfileSummary()},2000);
}

getUserProfileSummary =  async () => 
{
    
        let username = this.state.UserName;

        try
        {
            const postrequest = await axios.post(APIUserProfileTotals,
                {
                    "Name":username,
                }
            )
            let results = JSON.stringify(postrequest.data);
            this.setState({UserProfileSummary:[...JSON.parse(results)]})
            // console.log(this.state);
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
            };
    
}

getUserName = () => 
{
    try 
    {   AsyncStorage.getItem ('UserName')
        .then(value =>{if (value != null)
        {this.setState({UserName:value});}})
    }catch (error) { console.log(error)}
    try 
    {   AsyncStorage.getItem ('User')
        .then(value =>{if (value != null)
        {this.setState({User:value});}})
    }
    catch (error) { console.log(error)}
    try 
    {   AsyncStorage.getItem ('ID')
        .then(value =>{if (value != null)
        {this.setState({Id:value});}})
    }
    catch (error) { console.log(error)}
}
logoutUser = async () => 
{
    try 
    {   
        await AsyncStorage.removeItem ('UserName');
        Alert.alert("You Have Logged Out")

    }catch (error) { console.log(error)}
};

showDetailsScreen  = () =>
{
    this.setState({DoNotShowSettingsScreen: true});
    this.setState({DoNotShowDetailsScreen: false});
}

showSettingsScreen  = () =>
{
    this.setState({DoNotShowDetailsScreen: true});
    this.setState({DoNotShowSettingsScreen: false});
}

setNewUserName = (text) =>{this.setState({NewUserName:text});}
setNewUserPassword= (text) =>{this.setState({NewUserPassword:text});}

updateUserDetails = async () =>
    {
        let newName = this.state.NewUserName;
        let newPassword = this.state.NewUserPassword;
        let id = this.state.Id
        if ((newName.length == 0) ||(newPassword .length == 0))
            {Alert.alert('Warning','Please All Fields Are Required ')}
        else
        {
            console.log(newName+newPassword+id)
            
            try
            {

				const updaterequest = await axios.post(APIUpdateDetails,
					{
						"Name":newName,
						"Password":newPassword,
                        "Id":id
					}
				)
				
				let result = updaterequest.status;
                // console.log(result)
				if (result === 200)
				{Alert.alert("Success","\n\n Your \n\n UserName And Password \n\n  Updated Well\n")}
				else
				{
				{Alert.alert("Sorry","\n\n UserName Or Password \n\n  Not Update\n")}
                    
				}
				
			}

            catch (error)
                {
                    Alert.alert("An Error","Host Not Found Or\n\n  Check Your Network Connections\n"+error)
                };
        }
    }

render() {
            const {UserProfileSummary,UserName,User} = this.state;
            const {DoNotShowDetailsScreen, DoNotShowSettingsScreen} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={{height:30}} ></View>
            <ScrollView>
                {DoNotShowDetailsScreen ?<></>:(<>
                    <View style={styles.innerHomeMainView}>
                    <View style={styles.UserProfileView}>
                        <View style={styles.UserProfileIconeView} >
                            <Image source={UserIcone} style={{width: 80, height:80}} />
                        </View>
                        <View style={styles.UserProfileLabelView} >
                            <Text style={styles.textLabels}>{UserName}</Text>
                        </View>
                        <View style={styles.UserProfileLabel2View} >
                            <Text style={styles.textLabels}>{User}</Text>
                        </View>
                        </View>   
                        <View style={{height:10}} ></View>
                        { UserProfileSummary && UserProfileSummary.map((IteamKey , index) => (
                            <View key={index}>
                                <View style={styles.titleView}> 
                                    <Text style={styles.textLabels}>Total Cash Summary</Text>
                                </View>
                                <View style={styles.mainGridView}>
                                    <View style={styles.mainGridSpaceView}></View>
                                    <View style={styles.floatLeftView} >
                                        <Text  style={styles.textLabels}>Savings</Text>                                    
                                        <Text  style={styles.textLabels}>Membership</Text>
                                        <Text  style={styles.textLabels}>Administration</Text>
                                        <View style={styles.underLineView}></View>
                                        <Text  style={styles.textLabels}>Total</Text>
                                        <View style={styles.underLineView}></View>
                                    </View>
                                    <View style={styles.mainGridSpaceView}></View>
                                    <View style={styles.floatRightView} >
                                        <Text  style={styles.textLabels}>{IteamKey.TotalSavings}</Text>
                                        <Text  style={styles.textLabels}>{IteamKey.TotalMembership}</Text>
                                        <Text  style={styles.textLabels}>{IteamKey.TotalAdministrative}</Text>
                                        <View style={styles.underLineView}></View>
                                        <Text  style={styles.textLabels}>{IteamKey.FinalTotal}</Text>
                                        <View style={styles.underLineView}></View>
                                    </View>
                                    <View style={styles.mainGridSpaceView}></View>
                                </View>
                                <View style={styles.mainGridSpaceViewBottom}></View>

                                
                            </View>
                            ))
                        }
                        <View style={{height:30}} ></View>
                        { UserProfileSummary && UserProfileSummary.map((IteamKey , index) => (
                            <View key={index}>
                                <View style={styles.titleView}> 
                                    <Text style={styles.textLabels}>Cash Available Summary</Text>
                                </View>
                                <View style={styles.mainGridView}>
                                    <View style={styles.mainGridSpaceView}></View>
                                    <View style={styles.floatLeftView} >
                                        <Text  style={styles.textLabels}>Savings</Text>                                    
                                        <Text  style={styles.textLabels}>Membership</Text>
                                        <View style={styles.underLineView}></View>
                                        <Text  style={styles.textLabels}>Total</Text>
                                        <View style={styles.underLineView}></View>
                                    </View>
                                    <View style={styles.mainGridSpaceView}></View>
                                    <View style={styles.floatRightView} >
                                        <Text  style={styles.textLabels}>{IteamKey.TotalSavings}</Text>
                                        <Text  style={styles.textLabels}>{IteamKey.TotalMembership}</Text>
                                        <View style={styles.underLineView}></View>
                                        <Text  style={styles.textLabels}>{IteamKey.TotalSavingAndMembership}</Text>
                                        <View style={styles.underLineView}></View>
                                    </View>
                                    <View style={styles.mainGridSpaceView}></View>
                                </View>
                                <View style={styles.mainGridSpaceViewBottom}></View>
                            </View>
                            ))
                        }
                        <View style={{height:20}}></View>
                        <TouchableOpacity onPress={this.logoutUser}  style={styles.logInBtn} >
                            <Text style={styles.logOutbtnText} >Log Out</Text> 
                            <View style={styles.logOutArrowView}>
                            <FontAwesome5 name="unlock" size={30} color="#273be2" />
                            </View>
                        </TouchableOpacity>
                        <View style={{height:20}}></View>

                        <TouchableOpacity onPress={this.showSettingsScreen}  style={styles.logInBtn} >
                            <Text style={styles.logOutbtnText} >Settings </Text> 
                            <View style={styles.logOutArrowView}>
                            <Ionicons name="ios-settings" size={30} color="#273be2" />
                            </View>
                        </TouchableOpacity>
                        <View style={{height:20}}></View>
                        <View style={styles.DeveloperView}>
                            <View style={styles.DeveloperTitleView}> 
                                <Text style={styles.tableTitleTextLabels}>Application Developer </Text>
                            </View>
                            <View style={styles.UserProfileIconeView1} >
                                <Image source={DevIcone} style={{width: 80, height:80}} />
                            </View>
                            <View style={styles.UserProfileLabelView1} >
                                <Text style={styles.textLabels}>MogaHenze</Text>
                            </View>
                            <View style={styles.UserProfileLabelView2} >
                                <View style={{height:20}} ></View>
                                <Text  style={styles.textLabels}>Apps Like This And More Call  </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0701243139');}} style={styles.textLabels}>0701243139  </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0771977854');}} style={styles.textLabels}>0771977854 </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('mailto:jacob2016henry@gmail.com');}} style={styles.textLabels}>jacob2016henry@gmail.com </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('https://mogahenze.com');}} style={styles.textLabels}>Website ::: mogahenze.com </Text>
                                <View style={{height:20}} ></View>
                                <Text  style={styles.textLabels}>Your Feed Back Is Important </Text>
                                <View style={{height:20}} ></View>
                                <View style={styles.UserProfileLabelView1} >
                                <Text  style={styles.textLabels}>Thank You</Text>
                                </View>
                                <View style={{height:20}} ></View>
                            </View>
                        </View>
                        <View style={{height:30}}></View>
                    </View>
                </>)}



                {DoNotShowSettingsScreen?<></>:(<>
                    <View style={styles.innerHomeMainView}>

                    <View style={[styles.logInCardView,styles.logInCardView2]}>
					<View style={{height:20}}></View>
					<View style={styles.logInImgView}>
						<Image source={LogInIcone} style={{width: 90, height: 90,}} />
					</View>

					<View style={{height:20}}></View>
					<TextInput style={styles.input} placeholder="Update User Name" onChangeText={text => {this.setNewUserName (text)}} 
								placeholderTextColor = "#273be2" maxLength={10} 
								/>
					<TextInput style={styles.input} placeholder="Update Password" onChangeText={text => {this.setNewUserPassword (text)}} 
								placeholderTextColor = "#273be2" maxLength={10}  
								/>

					<View style={{height:20}}></View>
					<TouchableOpacity onPress={this.updateUserDetails}  style={styles.logInBtn} >
						<Text style={styles.btnText} >Update</Text> 
						<View style={styles.logInArrowView}>
                        <MaterialIcons name="published-with-changes" size={30} color="#273be2" />
						</View>
					</TouchableOpacity>
					<View style={{height:20}}></View>
					</View>

                    <TouchableOpacity onPress={this.showDetailsScreen}  style={styles.logInBtn} >
                        <Text style={styles.logOutbtnText} >Cancel </Text> 
                        <View style={styles.logOutArrowView}>
                        <MaterialCommunityIcons name="close-circle" size={30} color="#273be2" />
                        </View>
                    </TouchableOpacity>
                    <View style={{height:20}}></View>
                    <View style={{height:20}}></View>
                        <View style={styles.DeveloperView}>
                            <View style={styles.DeveloperTitleView}> 
                                <Text style={styles.tableTitleTextLabels}>Application Developer </Text>
                            </View>
                            <View style={styles.UserProfileIconeView1} >
                                <Image source={DevIcone} style={{width: 80, height:80}} />
                            </View>
                            <View style={styles.UserProfileLabelView1} >
                                <Text style={styles.textLabels}>MogaHenze</Text>
                            </View>
                            <View style={styles.UserProfileLabelView2} >
                                <View style={{height:20}} ></View>
                                <Text  style={styles.textLabels}>Apps Like This And More Call  </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0701243139');}} style={styles.textLabels}>0701243139  </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0771977854');}} style={styles.textLabels}>0771977854 </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('mailto:jacob2016henry@gmail.com');}} style={styles.textLabels}>jacob2016henry@gmail.com </Text>
                                <View style={{height:20}} ></View>
                                <Text  onPress={()=>{Linking.openURL('https://mogahenze.com');}} style={styles.textLabels}>Website ::: mogahenze.com </Text>
                                <View style={{height:20}} ></View>
                                <Text  style={styles.textLabels}>Your Feed Back Is Important </Text>
                                <View style={{height:20}} ></View>
                                <View style={styles.UserProfileLabelView1} >
                                <Text  style={styles.textLabels}>Thank You</Text>
                                </View>
                                <View style={{height:20}} ></View>
                            </View>
                        </View>
                </View>
                </>)}
            </ScrollView>
        </View>
    );
}
}
