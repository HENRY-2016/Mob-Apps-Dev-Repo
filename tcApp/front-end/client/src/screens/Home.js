
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';


export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // video: React.useRef(null),
        
        // Major Screens
        DoNotShowNewsScreen:false,
        DoNotShowTvScreen:true,
        DoNotShowRadioScreen:true,
        DoNotShowAdvertiseScreen:true,

        DoNotShowMainNavBtnScreen:false, // shoud be false always
        DoNotShowChatScreen:true,
        DoNotShowChatWindowScreen:true,
        DoNotShowChatLogInScreen:false,

        // Inner Screens
    
        // customer
    }
    
}

componentDidMount() {

    // axios.get(APISlider)
    // .then(res => {
    //     let results =JSON.stringify(res.data); 
    //     let jsonresults =JSON.parse(results); 
    //     let imageSiliders = [];
    //     for (i=0; i<jsonresults.length; i++)
    //         {
                
    //             let  image = imageurl+jsonresults[i].image;
    //             imageSiliders.push(image)
    //         }
    //     this.setState({images:[...imageSiliders]})
    //     // console.log(this.state);
    //     })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

}

// Major Screens

showChatScreen = () =>
{
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowMainNavBtnScreen:true})
    this.setState({DoNotShowChatScreen:false})
}
closeChatScreen = () =>
{
    this.setState({DoNotShowMainNavBtnScreen:false})
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowNewsScreen:false})
}
showInnerChatLogInScreen = () =>
{
    this.setState({DoNotShowChatWindowScreen:true})
    this.setState({DoNotShowChatLogInScreen:false})
}
showInnerChatWindowScreen = () =>
{
    this.setState({DoNotShowChatLogInScreen:true})
    this.setState({DoNotShowChatWindowScreen:false})

}

showTvScreen = () =>
{
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowTvScreen:false})
}

showRadioScreen = () =>
{
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowRadioScreen:false})
}

showNewsScreen = () =>
{
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowNewsScreen:false})
}

showAdvertiseScreen = () =>
{
    this.setState({DoNotShowChatScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:false})
}



render() {
    
    // const { video,status} = this.state;
    const {DoNotShowChatScreen,DoNotShowMainNavBtnScreen,DoNotShowChatWindowScreen,DoNotShowChatLogInScreen} = this.state;
    const {DoNotShowTvScreen,DoNotShowRadioScreen,DoNotShowAdvertiseScreen,DoNotShowNewsScreen} = this.state;

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
                    <Text style = { styles.productTopTitleName}> Home </Text>
                </View> */}

            {/* <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={this.showChatScreen}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View> */}
            </View>

            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Talk The Walk Tv Radio Show </Text>
                        <Text style={styles.MainTopHeaderTextLabel}> Tc News </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            <View style={styles.MainNavigationBtnView1}>
            {DoNotShowMainNavBtnScreen?<></>:(<>
            <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showNewsScreen} >
                        <Text style = {styles.btnText}>Tc News  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showTvScreen} >
                        <Text style = {styles.btnText}> Tv </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showRadioScreen}  >
                        <Text style = {styles.btnText}> Radio </Text>
                    </TouchableOpacity>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAdvertiseScreen}  >
                        <Text style = {styles.btnText}> Advertise </Text>
                    </TouchableOpacity>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </>)}
            </View>
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Begin Chart Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DoNotShowChatScreen ?<></>:(<>
                {DoNotShowChatLogInScreen?<></>:(<>
                <View style={styles.orderListDetailsText} >
                    <View style={styles.ApplyCardView1} >
                    <View style={styles.LogInPinView}>
                        <TextInput style={[styles.input,styles.input1]} placeholder="Tc  Number"  
                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setClubLogInName(text)}
                        />
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn5]} onPress={this.showInnerChatWindowScreen} >
                            <Text style = {styles.btnText}> Next  </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </>)}

                {DoNotShowChatWindowScreen?<></>:(<>
                <View style={styles.orderListDetailsText} >
                <View style={styles.ApplyCardView} >
                <View style={{height:20}} ></View>

                <Text > Customer Message  </Text>
                <View style={{height:15}}  ></View>
                <Text > Staff Reply  </Text>
                <View style={{height:20}} ></View>

                </View>
                <View style={{height:20}} ></View>
                <View style={styles.ApplyCardView} >
                    <TextInput style={styles.input} placeholder="Your Message"  
                    placeholderTextColor = "#5800c4"  onChangeText={text => this.setClubLogInName(text)}
                    />
                    <View style={{alignItems:'center'}} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.logInUser} >
                            <Text style = {styles.btnText}> Send  </Text>
                        </TouchableOpacity>
                        <View style={{height:20}} ></View>
                    </View>
                    </View>
                </View>
                </>)}

                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.closeChatScreen} >
                    <Text style = {styles.btnText}> Close Chat  </Text>
                </TouchableOpacity>
                <View style={{height:30}} ></View>
            </>)}
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Begin News Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}
            {DoNotShowNewsScreen ? <></>:(<>
                    <View style={{height:20}} ></View>
                    {/* <View style={styles.MainNavigationBtnView} >
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                        </View>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                            <Text style = {styles.btnText}> New </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                            <Text style = {styles.btnText}> Archive </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                            <Text style = {styles.btnText}> Other-1 </Text>
                        </TouchableOpacity>

                    

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                        </View>
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        </ScrollView>
                    </View> */}
                    <View style={{height:20}}></View>
                    <Text style={styles.AboutTitleText} >Tc News </Text>
                    <Text style={styles.AboutTitleText} >Coming Soon</Text>

            </>)}
            
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Radio Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DoNotShowRadioScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                <Text style={styles.AboutTitleText} >Radio Screen</Text>
                <Text style={styles.AboutTitleText} >Coming Soon</Text>


            </>)}
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Tv Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}


            {DoNotShowTvScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                <Text style={styles.AboutTitleText} >Tv Screen</Text>
                <Text style={styles.AboutTitleText} >Coming Soon</Text>


                
            </>)}


            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            End Advertise Screen
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            { DoNotShowAdvertiseScreen ? <></>:(<>
                <View style={{height:15}} ></View>
                <Text style={styles.AboutTitleText} >Advertise Screen</Text>
                <Text style={styles.AboutTitleText} >Coming Soon</Text>

            
            </>)
            }


                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
