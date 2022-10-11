
import React from 'react';
import { Text, View, Modal ,TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Octicons,Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
// https://docs.expo.dev/versions/latest/sdk/picker/
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import styles from "./stylesheet";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import {
        APIPaverProjectPledges,APIPaverProjectPledgesReceived,
        APIClubPledges,APIClubPledgesReceived,
        APIPledgesPendingSummaryData,APIPledgesClearedSummaryData,
        APIPledgesBalanceSummaryData,
    APIAdministrativeData,APISavingsData,
} from './DataFileApis';






export default class Pledges extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {

            modalVisible: false,
            // data
            PaversPendingData:[],
            PaversClearedData:[],
            ClubPendingData:[],
            ClubClearedData:[],
            SugarCanePendingData:[],
            SugarCaneClearedData:[],

            AllPendingPledgesSummary:[],
            AllClearedPledgesSummary:[],
            AllPledgesBalanceSummary:[],
            
            


            // Main screens
            DoNotShowSummaryScreen:false,
            DoNotShowClubScreen:true,
            DoNotShowPaversScreen:true,
            DoNotShowSugarCanesScreen:true,

            // Inner Screens
            DoNotShowPaversPendingInnerScreen:false,
            DoNotShowPaversClearedInnerScreen:true,
            DoNotShowClubPendingInnerScreen:false,
            DoNotShowClubClearedInnerScreen:true,
            DoNotShowSugarCanePendingInnerScreen:false,
            DoNotShowSugarCaneClearedInnerScreen:true,


            DoNotShowSavingsInnerScreen:true,
            DoNotSHowSugarCanesInnerScreen:true,



            // Options
            UserName:'',
            SelectedYearValue:'',
            SelectedFeesYearValue:'',
    }
    
}
componentDidMount() 
{

    axios.get(APIPledgesPendingSummaryData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AllPendingPledgesSummary:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    axios.get(APIPledgesClearedSummaryData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AllClearedPledgesSummary:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    axios.get(APIPledgesBalanceSummaryData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AllPledgesBalanceSummary:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})


    axios.get(APIPaverProjectPledges)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PaversPendingData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})


    axios.get(APIPaverProjectPledgesReceived)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PaversClearedData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    axios.get(APIPaverProjectPledges)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SugarCanePendingData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})


    axios.get(APIPaverProjectPledgesReceived)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SugarCaneClearedData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    
    axios.get(APIClubPledges)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ClubPendingData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    axios.get(APIClubPledgesReceived)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ClubClearedData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showSugarCanes = () =>  
{
    this.setState({DoNotShowClubScreen:true});
    this.setState({DoNotShowSummaryScreen:true});
    this.setState({DoNotShowPaversScreen:true});
    this.setState({DoNotShowSugarCanesScreen:false});
    this.setState({ modalVisible: false});
}
showSugarCanePendingScreen = () =>  
{
    this.setState({DoNotShowSugarCaneClearedInnerScreen:true});
    this.setState({DoNotShowSugarCanePendingInnerScreen:false});
}
showSugarCaneClearedScreen = () =>  
{
    this.setState({DoNotShowSugarCanePendingInnerScreen:true});
    this.setState({DoNotShowSugarCaneClearedInnerScreen:false});
}
showClubScreen = () =>  
{
    this.setState({DoNotShowSugarCanesScreen:true});
    this.setState({DoNotShowSummaryScreen:true});
    this.setState({DoNotShowPaversScreen:true});
    this.setState({DoNotShowClubScreen:false});
    this.setState({ modalVisible: false});
}
showClubPendingScreen = () =>  
{
    this.setState({DoNotShowClubClearedInnerScreen:true});
    this.setState({DoNotShowClubPendingInnerScreen:false});
}
showClubClearedScreen = () =>  
{
    this.setState({DoNotShowClubPendingInnerScreen:true});
    this.setState({DoNotShowClubClearedInnerScreen:false});
}
showPaversScreen = () =>  
{
    this.setState({DoNotShowSugarCanesScreen:true});
    this.setState({DoNotShowSummaryScreen:true});
    this.setState({DoNotShowClubScreen:true});
    this.setState({DoNotShowPaversScreen:false});
    this.setState({ modalVisible: false});
}
showPaversPendingScreen = () =>  
{
    this.setState({DoNotShowPaversClearedInnerScreen:true});
    this.setState({DoNotShowPaversPendingInnerScreen:false});
}
showPaversClearedScreen = () =>  
{
    this.setState({DoNotShowPaversPendingInnerScreen:true});
    this.setState({DoNotShowPaversClearedInnerScreen:false});
}
showSummaryScreen = () =>  
{
    this.setState({DoNotShowSugarCanesScreen:true});
    this.setState({DoNotShowPaversScreen:true});
    this.setState({DoNotShowClubScreen:true});
    this.setState({DoNotShowSummaryScreen:false});
    this.setState({ modalVisible: false});
}

getUserSavingsDetails =  async () => 
{
    
        let username = 'Omanyi Paul'; //this.state.UserName;
        let year = this.state.SelectedYearValue;

        try
        {
            console.log(username+year)
            const postrequest = await axios.post(APISavingsData,
                {
                    "Name":username,
                    "Year":year,
                }
            )
            let results = JSON.stringify(postrequest.data);
            this.setState({PaversPendingData:[...JSON.parse(results)]})
            this.setState({DoNotShowSavingsInnerScreen:false});
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
            };
    
}

getUserFeesDetails =  async () => 
{
    
        let username = 'Omanyi Paul'; //this.state.UserName;
        let year = this.state.SelectedFeesYearValue;

        try
        {
            console.log(username+year)
            const postrequest = await axios.post(APIAdministrativeData,
                {
                    "Name":username,
                    "Year":year,
                }
            )
            let results = JSON.stringify(postrequest.data);
            this.setState({ClubDetails:[...JSON.parse(results)]})
            this.setState({DoNotSHowSugarCanesInnerScreen:false});
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
            };
    
}


render() {
    
    const {modalVisible} = this.state;
    const {PaversPendingData,PaversClearedData,ClubPendingData,ClubClearedData,SugarCanePendingData,SugarCaneClearedData } = this.state;
    const {DoNotShowSummaryScreen,AllPendingPledgesSummary,AllClearedPledgesSummary,AllPledgesBalanceSummary} = this.state;
    const {DoNotShowSugarCanesScreen,DoNotShowSugarCanePendingInnerScreen,DoNotShowSugarCaneClearedInnerScreen} = this.state;
    const {DoNotShowPaversScreen,DoNotShowPaversPendingInnerScreen,DoNotShowPaversClearedInnerScreen} = this.state;
    const {DoNotShowClubScreen,DoNotShowClubClearedInnerScreen,DoNotShowClubPendingInnerScreen} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.headerSpaceOne} ></View>
            <View style={styles.selecteOptionsMainView}>
                <View style={styles.selecteOptionsBtnTitleView}> 
                    <Text style={styles.textLabels}>Pledges</Text>
                </View>
                

                <View style={styles.selecteOptionsBtnView}> 
                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                        <Text style={styles.textLabels}>Options View</Text>
                    </TouchableOpacity>
                    <View style={styles.arrowView}>
                        <Ionicons name="eye-sharp" size={30} color={COLORS.colourNumberTwo} />
                    </View>
                </View>
            </View>
            <View style={styles.innerHomeMainView}>
            <View style={{height:20}} ></View>



            {DoNotShowClubScreen?<></>:(<>
                    <View style={styles.selectYearBtnView}>
                        <View style={styles.selecteShowBtnView}> 
                            <TouchableOpacity onPress={this.showClubPendingScreen}>
                                <Text style={styles.showBtnTextLabels}>Pending</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.selecteShowBtnView}> 
                            <TouchableOpacity onPress={this.showClubClearedScreen}>
                                <Text style={styles.showBtnTextLabels}>Cleared</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {DoNotShowClubPendingInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView4]}> 
                            <Text style={styles.tableTitleTextLabels}>All Club Pledges </Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Member_Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Record_Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Pledge_Amount</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { ClubPendingData && ClubPendingData.map((IteamKey, index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLEDGE}</Text>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            
                            ))
                        }
                        <View style={{height:15}}></View>
                        </ScrollView>
                    </>)}

                    {DoNotShowClubClearedInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView4]}> 
                            <Text style={styles.tableTitleTextLabels}>All Club Cleared </Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView4]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Member_Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Record_Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Cleared_Month</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Cleared_Amount</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { ClubClearedData && ClubClearedData.map((IteamKey , index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.MONTH}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLEDGE}</Text>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            
                            ))
                        }
                        <View style={{height:15}}></View>
                        </ScrollView>
                    </>)}
            </>)}


            {DoNotShowPaversScreen?<></>:(<>
                <View style={styles.selectYearBtnView}>
                    <View style={styles.selecteShowBtnView}> 
                        <TouchableOpacity onPress={this.showPaversPendingScreen}>
                            <Text style={styles.showBtnTextLabels}>Pending</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.selecteShowBtnView}> 
                        <TouchableOpacity onPress={this.showPaversClearedScreen}>
                            <Text style={styles.showBtnTextLabels}>Cleared</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                    {DoNotShowPaversPendingInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView3]}> 
                            <Text style={styles.tableTitleTextLabels}>All Pavers Pending </Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Member_Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Pending_Amount</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { PaversPendingData && PaversPendingData.map((IteamKey, index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLEDGE}</Text>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            
                            ))
                        }
                        <View style={{height:15}}></View>
                        </ScrollView>
                    </>)}

                    {DoNotShowPaversClearedInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView3]}> 
                            <Text style={styles.tableTitleTextLabels}>All Pavers Cleared </Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Member_Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Cleared_Amount</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { PaversClearedData && PaversClearedData.map((IteamKey , index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLEDGE}</Text>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            
                            ))
                        }
                        <View style={{height:15}}></View>
                        </ScrollView>
                    </>)}
            </>)}
            




            {DoNotShowSummaryScreen?<></>:(<>
                <ScrollView>
                { AllPendingPledgesSummary && AllPendingPledgesSummary.map((IteamKey , index) => (
                    <View key={index}>
                        <View style={styles.titleView}> 
                            <Text style={styles.textLabels}>Pledges Total Summary</Text>
                        </View>
                        <View style={styles.mainGridView}>
                            <View style={styles.mainGridSpaceView}></View>
                            <View style={styles.floatLeftView} >
                            <Text  style={styles.textLabels}>Sugar Canes</Text>
                                <Text  style={styles.textLabels}>Pavers</Text>
                                <Text  style={styles.textLabels}>Club</Text>
                                <View style={styles.underLineView}></View>
                                <Text  style={styles.textLabels}>Total</Text>
                                <View style={styles.underLineView}></View>
                            </View>
                            <View style={styles.mainGridSpaceView}></View>
                            <View style={styles.floatRightView} >
                                <Text  style={styles.textLabels}>{IteamKey.SUGARCANE}</Text>
                                <Text  style={styles.textLabels}>{IteamKey.PAVERS}</Text>
                                <Text  style={styles.textLabels}>{IteamKey.CLUB}</Text>
                                <View style={styles.underLineView}></View>
                                <Text  style={styles.textLabels}>{IteamKey.TOTAL}</Text>
                                <View style={styles.underLineView}></View>
                            </View>
                            <View style={styles.mainGridSpaceView}></View>
                        </View>
                        <View style={styles.mainGridSpaceViewBottom}></View>
                    </View>
                    ))
                }

                <View style={{height:30}} ></View>
                { AllClearedPledgesSummary && AllClearedPledgesSummary.map((IteamKey , index) => (
                
                <View key={index}>
                    <View style={styles.titleView}> 
                        <Text style={styles.textLabels}>Pledges Cleared Summary</Text>
                    </View>
                        <View style={styles.mainGridView}>
                            <View style={styles.mainGridSpaceView}></View>
                            <View style={styles.floatLeftView} >
                            <Text  style={styles.textLabels}>Sugar Canes</Text>
                                <Text  style={styles.textLabels}>Pavers</Text>
                                <Text  style={styles.textLabels}>Club</Text>
                                <View style={styles.underLineView}></View>
                                <Text  style={styles.textLabels}>Total</Text>
                                <View style={styles.underLineView}></View>
                            </View>
                            <View style={styles.mainGridSpaceView}></View>
                            <View style={styles.floatRightView} >
                                <Text  style={styles.textLabels}>{IteamKey.SUGARCANE}</Text>
                                <Text  style={styles.textLabels}>{IteamKey.PAVERS}</Text>
                                <Text  style={styles.textLabels}>{IteamKey.CLUB}</Text>
                                <View style={styles.underLineView}></View>
                                <Text  style={styles.textLabels}>{IteamKey.TOTAL}</Text>
                                <View style={styles.underLineView}></View>
                            </View>
                            <View style={styles.mainGridSpaceView}></View>
                        </View>
                        <View style={styles.mainGridSpaceViewBottom}></View>
                    </View>
                    ))
                }

            <View style={{height:30}} ></View>
                { AllPledgesBalanceSummary && AllPledgesBalanceSummary.map((IteamKey , index) => (
                
                <View key={index}>
                    <View style={styles.titleView}> 
                        <Text style={styles.textLabels}>Pledges Balance Summary</Text>
                    </View>
                        <View style={styles.mainGridView}>
                            <View style={styles.mainGridSpaceView}></View>
                            <View style={styles.floatLeftView} >
                            <Text  style={styles.textLabels}>Sugar Canes</Text>
                                <Text  style={styles.textLabels}>Pavers</Text>
                                <Text  style={styles.textLabels}>Club</Text>
                                <View style={styles.underLineView}></View>
                                <Text  style={styles.textLabels}>Total</Text>
                                <View style={styles.underLineView}></View>
                            </View>
                            <View style={styles.mainGridSpaceView}></View>
                            <View style={styles.floatRightView} >
                                <Text  style={styles.textLabels}>{IteamKey.SUGARCANEBALANCE}</Text>
                                <Text  style={styles.textLabels}>{IteamKey.PAVERSBALANCE}</Text>
                                <Text  style={styles.textLabels}>{IteamKey.CLUBBALANCE}</Text>
                                <View style={styles.underLineView}></View>
                                <Text  style={styles.textLabels}>{IteamKey.TOTALBALANCE}</Text>
                                <View style={styles.underLineView}></View>
                            </View>
                            <View style={styles.mainGridSpaceView}></View>
                        </View>
                        <View style={styles.mainGridSpaceViewBottom}></View>
                    </View>
                    ))
                }
            </ScrollView>
            </>)
            }



                {DoNotShowSugarCanesScreen ?<></>:(<>
                    <View style={styles.selectYearBtnView}>
                        <View style={styles.selecteShowBtnView}> 
                            <TouchableOpacity onPress={this.showSugarCanePendingScreen}>
                                <Text style={styles.showBtnTextLabels}>Pending</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.selecteShowBtnView}> 
                            <TouchableOpacity onPress={this.showSugarCaneClearedScreen}>
                                <Text style={styles.showBtnTextLabels}>Cleared</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {DoNotShowSugarCanePendingInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView3]}> 
                            <Text style={styles.tableTitleTextLabels}>All Sugar Cane Pending </Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Member_Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Pending_Amount</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { SugarCanePendingData && SugarCanePendingData.map((IteamKey, index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLEDGE}</Text>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            
                            ))
                        }
                        <View style={{height:15}}></View>
                        </ScrollView>
                    </>)}

                    {DoNotShowSugarCaneClearedInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView3]}> 
                            <Text style={styles.tableTitleTextLabels}>All Sugar Cane Cleared </Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Member_Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Cleared_Amount</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { SugarCaneClearedData && SugarCaneClearedData.map((IteamKey , index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLEDGE}</Text>
                                    </View>
                                </View>
                            </View>
                            </ScrollView>
                            
                            ))
                        }
                        <View style={{height:15}}></View>
                        </ScrollView>
                    </>)}
            </>)}

                <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showClubScreen}>
                                <Text style={styles.modalTextLabels}>Club</Text>
                            </TouchableOpacity>
                            </View>


                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showPaversScreen}>
                                <Text style={styles.modalTextLabels}>Pavers</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showSummaryScreen}>
                                <Text style={styles.modalTextLabels}>Summary</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showSugarCanes}>
                                <Text style={styles.modalTextLabels}>Sugar Canes</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{height:15}}></View>
                            <View style={styles.modalCloseBtnView}>
                            <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
                                <Text style={styles.modalCloseTextLabels}>Close</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                </View>
            </View>
        </View>
    );
}
}
