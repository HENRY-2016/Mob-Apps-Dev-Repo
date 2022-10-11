
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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


export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        NoticeBoard:[],
    
        
    }
    
}

UNSAFE_componentWillMount () {

    axios.get(APIListAllNoticeBoard)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({NoticeBoard:[...JSON.parse(results)]})
        })
    .catch()
}


render() {
    
    const { NoticeBoard,DoNotShowMainNavBtnScreen} = this.state;

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
            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Triple Care Ltd </Text>
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
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showNoticeBoardScreen} >
                        <Text style = {styles.btnText}>Triple Care Ltd  </Text>
                    </TouchableOpacity>

                    

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    {/* <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View> */}
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </>)}
            </View>
        

            
                <View style={{height:15}} ></View>
                <Text style={styles.AboutTitleText} >Inside Tc Club</Text>
                {NoticeBoard && NoticeBoard.map((item,index)=>(
                    <View key={index}>
                        <Text style={styles.AboutText} >{item.Text1}</Text>
                        <Text style={styles.AboutText} >{item.Text2}</Text>
                        <Text style={styles.AboutText} >{item.Text3}</Text>
                        <Text style={styles.AboutText} >{item.Text4}</Text>
                        <Text style={styles.AboutText} >{item.Text5}</Text>
                        <View style={styles.horizontalLine} ></View>
                    </View>
                ))}
                <View style={{height:20}} ></View>
                    <View style={{alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{updateApp()}} style={styles.ratingChatBtn2} >
                        <Text style={styles.ratingChatBtnText} >Check For Updates</Text> 
                    </TouchableOpacity>
                    </View>
                <View style={{height:10}} ></View>
            

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
