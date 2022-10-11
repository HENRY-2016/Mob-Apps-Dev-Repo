
import React from 'react';
import { Text, View,Button , Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { Ionicons, AntDesign,FontAwesome } from '@expo/vector-icons';
// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';


export default class Agency extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
        images:[
            "https://github.com/HENRY-2016/ui-ux-romatic-cx/blob/main/1.png?raw=true",
            "https://github.com/HENRY-2016/ui-ux-romatic-cx/blob/main/2.png?raw=true",
            "https://github.com/HENRY-2016/ui-ux-romatic-cx/blob/main/3.png?raw=true",
            "https://github.com/HENRY-2016/ui-ux-romatic-cx/blob/main/4.png?raw=true",

        ],
        // video: React.useRef(null),
        
        // Major Screens
        DoNotShowTvScreen:true,
        DoNotShowRadioScreen:true,
        DoNotShowAdvertiseScreen:true,
        DoNotShowNewsScreen:false,

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
showTvScreen = () =>
{
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowTvScreen:false})
}

showRadioScreen = () =>
{
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowRadioScreen:false})
}

showNewsScreen = () =>
{
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowNewsScreen:false})
}

showAdvertiseScreen = () =>
{
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:false})
}



render() {
    
    // const { video,status} = this.state;
    // const {DoNotShowHouseListScreen,DoNotShowHouseVideoScreen} = this.state;
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
                    <Text style = { styles.productTopTitleName}> Agency </Text>
                </View> */}
                <View style={styles.mainChatView}>
                    <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                        <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Agency Services </Text>
                        {/* <Text style={styles.MainTopHeaderTextLabel}> Tc News </Text> */}
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showNewsScreen} >
                        <Text style = {styles.btnText}>Service  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showTvScreen} >
                        <Text style = {styles.btnText}> Service </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 

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
                    {/* <Text style={styles.AboutTitleText} >Tc News Screen</Text> */}
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
                {/* <Text style={styles.AboutTitleText} >Tv Screen</Text> */}
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
            
            </>)
            }


                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
