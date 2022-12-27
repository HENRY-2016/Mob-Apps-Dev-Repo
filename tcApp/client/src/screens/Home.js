
import React from 'react';
import { Text, View,TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { updateApp } from './Functions';
import {APIListAllNoticeBoard,APIPostLogIns,
} from './DataFileApis';


export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        NoticeBoard:[],
        LogInName:'',
        LogInCardNo:'',
        LogInCategory:'',
    
        
    }
    
}

UNSAFE_componentWillMount () {

    this.getUserLogins();
    axios.get(APIListAllNoticeBoard)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({NoticeBoard:[...JSON.parse(results)]})
        })
    .catch()
}

componentDidMount(){ setTimeout(this.postUserLogins,5000);}
getUserLogins =  () => 
{
    try 
    {   
        AsyncStorage.getItem('ClubMemberDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let Name = jsonData[0].ClubUserName;
            let CardNo = jsonData[0].ClubMemberCardNo;
            let Category= jsonData[0].ClubMemberCategory;

            this.setState({LogInName:Name});
            this.setState({LogInCardNo:CardNo});
            this.setState({LogInCategory:Category});
            // console.log("Details are From Db :::"+Name+":::"+CardNo+":::"+Category)
        }
        else {console.log("No Details Found")}
        })
    }catch (error) { console.log(error)}
}

postUserLogins = async () =>
{

    let Name = this.state.LogInName
    let CardNo = this.state.LogInCardNo
    let Category = this.state.LogInCategory

    // console.log("Posting LogIns Credentials"+Name+":::"+CardNo+":::"+Category)

    if ((Name === '') || (CardNo === '') || (Category === ''))
    {console.log("All Fields Are Empty")}
    else
    {
        try
        {
            const postRequest = await axios.post(APIPostLogIns,
                {
                    "Name": Name,
                    "Number":CardNo,
                    "Type": Category
                }
            )
            let result = postRequest.data.status;
            // console.log("::::"+result)
        }
        catch (error){console.log("++++++++"+error);};
    }
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
