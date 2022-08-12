
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import {APIListAllNoticeBoard,APIListAllNews} from './DataFileApis';
import TcNewsImg from "../imgs/tcnews.png";
import { downLoadFile } from './Functions';

export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        
    
        // data
        NoticeBoard:[],
        News:[],
        
        // Major Screens
        DoNotShowNoticeBoardScreen:false,
        DoNotShowNewsScreen:true,
        DoNotShowTvScreen:true,
        DoNotShowRadioScreen:true,
        DoNotShowAdvertiseScreen:true,

        // Inner Screens
        DoNotShowInnerNewsScreen1:false,
        DoNotShowInnerNewsScreen2:true,

        // others
        NumberOfCopies:'',
        BookingName:'',
        NewsCountry:'',
        NewsDate:'',
    }
    
}

componentDidMount() {

    axios.get(APIListAllNoticeBoard)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({NoticeBoard:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIListAllNews)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({News:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data");})


}

setNumberOfCopies = (text) =>{this.setState({NumberOfCopies:text});}
setBookingName = (text) =>{this.setState({BookingName:text});}



showInnerNewsScreen1 = () => 
{
    this.setState({DoNotShowInnerNewsScreen2:true})
    this.setState({DoNotShowInnerNewsScreen1:false})
}

showInnerNewsScreen2 = (Country,Date) => 
{
    this.setState({NewsCountry:Country})
    this.setState({NewsDate:Date})
    this.setState({DoNotShowInnerNewsScreen1:true})
    this.setState({DoNotShowInnerNewsScreen2:false})
}

showTvScreen = () =>
{
    this.setState({DoNotShowNoticeBoardScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowTvScreen:false})
}

showRadioScreen = () =>
{
    this.setState({DoNotShowNoticeBoardScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowRadioScreen:false})
}

showNewsScreen = () =>
{
    this.setState({DoNotShowNoticeBoardScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowNewsScreen:false})
}

showAdvertiseScreen = () =>
{
    this.setState({DoNotShowNoticeBoardScreen:true})
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:false})
}

showNoticeBoardScreen = () =>
{
    this.setState({DoNotShowTvScreen:true})
    this.setState({DoNotShowRadioScreen:true})
    this.setState({DoNotShowNewsScreen:true})
    this.setState({DoNotShowAdvertiseScreen:true})
    this.setState({DoNotShowNoticeBoardScreen:false})
}

postNewsOder = () =>
{
    let country = this.state.NewsCountry;
    let date = this.state.NewsDate;
    let name = this.state.BookingName;
    let copies = this.state.NumberOfCopies;

    // console.log(country+date+name+copies)
    Alert.alert("Massage","Thank You For Your Order")

    // if ((Value.length == 0))
    // {Alert.alert("Warning","\n \n Please Select Option")}

    // else
    // {
    //     try
    //     {
    //         const postRequest = await axios.post(APIPostProviderUpdate,
    //             {
    //                 "id":Id,
    //                 "Status":Value,
    //             }
    //         )
    //         let result = postRequest.data.status;
    //         Alert.alert("Status",result);
    //     }
    //     catch (error)
    //         {Alert.alert("An Error","Check Your Network Connections\n\n")};
    // }
}


render() {
    
    const { NoticeBoard,News,NewsCountry,NewsDate} = this.state;
    const {DoNotShowNoticeBoardScreen,DoNotShowMainNavBtnScreen,DoNotShowInnerNewsScreen1,DoNotShowInnerNewsScreen2} = this.state;
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
            <View style={styles.mainChatView}>
                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                    <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> What's New | Tc News </Text>
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
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showNoticeBoardScreen} >
                        <Text style = {styles.btnText}>What's New  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showNewsScreen} >
                        <Text style = {styles.btnText}>Tc News  </Text>
                    </TouchableOpacity>

                    {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showTvScreen} >
                        <Text style = {styles.btnText}> Tv </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showRadioScreen }  >
                        <Text style = {styles.btnText}> Radio </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAdvertiseScreen}  >
                        <Text style = {styles.btnText}> Advertise </Text>
                    </TouchableOpacity>
                     */}
                    

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 
            </>)}
            </View>
        

            {DoNotShowNoticeBoardScreen ?<></>:(<>
                <View style={{height:15}} ></View>
                <Text style={styles.AboutTitleText} >Inside Tc</Text>
                {NoticeBoard && NoticeBoard.map((item,index)=>(
                    <View key={item.id}>
                        <Text style={styles.AboutText} >{item.Text1}</Text>
                        <Text style={styles.AboutText} >{item.Text2}</Text>
                        <Text style={styles.AboutText} >{item.Text3}</Text>
                        <Text style={styles.AboutText} >{item.Text4}</Text>
                        <Text style={styles.AboutText} >{item.Text5}</Text>
                    </View>
                ))}
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
                <View style={styles.TcNewsIconMainView}>
                <Image source={TcNewsImg} style={styles.TcNewsIcon}/>
                </View>
                <View style={{height:20}} ></View>
                <Text style={styles.AboutTitleText} >Grab Your Self A Copy</Text>

                {DoNotShowInnerNewsScreen1 ?<></>:(<>
                    {News && News.map((item, index) => (
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View key={index}>
                        <View style={styles.mainTableView}>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{item.Country}</Text>
                            </View>

                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{item.Date}</Text>
                            </View>

                            <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    {/* <TouchableOpacity onPress={()=>{downLoadFile(item.PartOne)}} style={styles.ratingChatBtn2} > */}
                                    <TouchableOpacity onPress={downLoadFile} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >Download Part 1</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.tableTrView}>
                            <View style={{width:20}} ></View>
                            </View>

                            <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    {/* <TouchableOpacity onPress={()=>{this.showProvidersListScreen2(item.PartTwo)}} style={styles.ratingChatBtn2} > */}
                                    <TouchableOpacity onPress={downLoadFile} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >Download Part 2</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.tableTrView}>
                            <View style={{width:20}} ></View>
                            </View>

                            <View style={styles.tableTrView}>
                                <View style={styles.ratingChatBtnView}>
                                    <TouchableOpacity onPress={()=>{this.showInnerNewsScreen2(item.Date,item.Country)}} style={styles.ratingChatBtn2} >
                                        <Text style={styles.ratingChatBtnText} >Order A Copy</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.tableTrView} >
                                <View style={{width:20}} ></View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                    ))}
                </>)}



                {DoNotShowInnerNewsScreen2?<></>:(<>
                    <View style={{height:15}} ></View>
                    <View style={{height:20}} ></View>
                    <Text style={styles.AboutTitleText} >Oder Details </Text>

                    <View style={styles.orderListDetailsText} >

                    
                    <View>
                    <TextInput style={styles.input} placeholder="Country" editable = {false} defaultValue={NewsCountry}  
                        placeholderTextColor = "#5800c4"
                        />

                        <TextInput style={styles.input} placeholder="Date"  editable = {false} defaultValue={NewsDate}
                        placeholderTextColor = "#5800c4" 
                        />
                        
                        <TextInput style={styles.input} placeholder="Name Or Tc Number"  
                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setBookingName(text)}
                        />

                        <TextInput style={styles.input} placeholder="Number Of Copies" keyboardType='numeric'
                        placeholderTextColor = "#5800c4"  onChangeText={text => this.setNumberOfCopies(text)}
                        />
                        
                        <View style={{alignItems:'center', marginTop:20}} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postNewsOder} >
                            <Text style = {styles.btnText}> Order </Text>
                        </TouchableOpacity>
                        <View style={{height:20}} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={()=>{this.showInnerNewsScreen1()}}  >
                            <Text style = {styles.btnText}> Cancel  </Text>
                        </TouchableOpacity>
                        <View style={{height:30}} ></View>
                        </View>
                    </View>
                    </View>
                </>)}
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
                {NoticeBoard && NoticeBoard.map((item,index)=>(
                    <View key={item.id}>
                        <Text style={styles.AboutTitleText} >{item.Text1}</Text>
                        <Text style={styles.AboutTitleText} >{item.Text2}</Text>
                        <Text style={styles.AboutTitleText} >{item.Text3}</Text>
                        <Text style={styles.AboutTitleText} >{item.Text4}</Text>
                        <Text style={styles.AboutTitleText} >{item.Text5}</Text>
                    </View>
                ))}
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
