
import React from 'react';
import { Text, View, Modal ,TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Octicons,Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
// https://docs.expo.dev/versions/latest/sdk/picker/
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import styles from "./stylesheet";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import { APIPaversSummaryData,APIPaversDetailsData} from './DataFileApis';






export default class Projects extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {

            modalVisible: false,
            // data
            PaversSummaryData:[],
            PaversDetailsData:[],
            ClubPendingData:[],
            ClubClearedData:[],
            SugarCanePendingData:[],
            SugarCaneClearedData:[],

            AllPendingPledgesSummary:[],
            AllClearedPledgesSummary:[],
            
            


            // Main screens
            DoNotShowPaversScreen:false, // active
            DoNotShowSummaryScreen:true,
            DoNotShowClubScreen:true,
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

    axios.get(APIPaversSummaryData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PaversSummaryData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})


    axios.get(APIPaversDetailsData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PaversDetailsData:[...JSON.parse(results)]})
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
            this.setState({PaversSummaryData:[...JSON.parse(results)]})
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
    
    const {PaversSummaryData,PaversDetailsData,modalVisible} = this.state;
    // const {DoNotShowSummaryScreen,AllPendingPledgesSummary,AllClearedPledgesSummary} = this.state;
    // const {DoNotShowSugarCanesScreen,DoNotShowSugarCanePendingInnerScreen,DoNotShowSugarCaneClearedInnerScreen} = this.state;
    const {DoNotShowPaversScreen,DoNotShowPaversPendingInnerScreen,DoNotShowPaversClearedInnerScreen} = this.state;
    // const {DoNotShowClubScreen,DoNotShowClubClearedInnerScreen,DoNotShowClubPendingInnerScreen} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.headerSpaceOne} ></View>
            <View style={styles.selecteOptionsMainView}>
                <View style={styles.selecteOptionsBtnTitleView}> 
                    <Text style={styles.textLabels}>Projects</Text>
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


            {DoNotShowPaversScreen?<></>:(<>
                <View style={styles.selectYearBtnView}>
                    <View style={styles.selecteShowBtnView}> 
                        <TouchableOpacity onPress={this.showPaversPendingScreen}>
                            <Text style={styles.showBtnTextLabels}>Summary</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.selecteShowBtnView}> 
                        <TouchableOpacity onPress={this.showPaversClearedScreen}>
                            <Text style={styles.showBtnTextLabels}>Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                    {DoNotShowPaversPendingInnerScreen?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView5]}> 
                            <Text style={styles.tableTitleTextLabels}>Cash Investment In Pavers</Text>
                        </View>


                        <ScrollView horizontal={true} >
                            <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Phases</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Sjmda</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Church</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Remarks</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>No. Pavers</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { PaversSummaryData && PaversSummaryData.map((IteamKey, index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_1}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_2}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_3}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_4}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_5}</Text>
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
                        <View style={[styles.tableTitleView, styles.tableTitleView6]}> 
                            <Text style={styles.tableTitleTextLabels}>Pavers Details </Text>
                        </View>


                        {/* <ScrollView horizontal={true} >
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
                        </ScrollView> */}
                        
                        <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                        <ScrollView>
                        { PaversDetailsData && PaversDetailsData.map((IteamKey , index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={styles.mainTableView}>
                                    <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>Seventh Phase</Text>
                                        <View style={{height:20}}></View>
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_1}</Text>
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_2}</Text>
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_3}</Text>
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_4}</Text>
                                        <Text  style={styles.trTdText}>{IteamKey.PLACEHOLDER_5}</Text>
                                        <Text  style={styles.trTdText}>{ IteamKey.PLACEHOLDER_6}</Text>
                                        <Text  style={styles.trTdText}>Total { IteamKey.PLACEHOLDER_7}</Text>
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

                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showPaversScreen}>
                                <Text style={styles.modalTextLabels}>Pavers</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity>
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
