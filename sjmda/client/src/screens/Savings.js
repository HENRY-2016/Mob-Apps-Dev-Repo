
import React from 'react';
import { Text, View, Modal ,TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
// https://docs.expo.dev/versions/latest/sdk/picker/
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import {APISummaryData ,APICashAtHandData,APIAdministrativeData,
        APIExpendituresData,APISavingsData,
} from './DataFileApis';






export default class Savings extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {

            modalVisible: false,
            // data
            CollectionsSummary:[],
            CashAtHandSummary:[],
            ExpendituresDetails:[],
            UserSavingsData:[],
            UserFeesData:[],


            // Main screens
            DoNotShowSummaryScreen:false,
            DoNotShowSavingsScreen:true,
            DoNotShowExpendituresScreen:true,
            DoNotShowFeesScreen:true,

            // Inner Screens
            DoNotShowSavingsInnerScreen:true,
            DoNotShowFeesInnerScreen:true,



            // Options
            UserName:'',
            SelectedYearValue:'',
            SelectedFeesYearValue:'',

    }
    
}
componentDidMount() 
{
    this.getUserName();
    axios.get(APISummaryData )
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({CollectionsSummary:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    axios.get(APIExpendituresData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ExpendituresDetails:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    axios.get(APICashAtHandData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({CashAtHandSummary:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}

setAccountsOptionValue = (text) =>{this.setState({AccountsOptionValue:text});}

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}

getUserName = () => 
{
    try 
    {   AsyncStorage.getItem ('UserName')
        .then(value =>{if (value != null)
        {this.setState({UserName:value});}})
    }catch (error) { console.log(error)}
}
showAdministrativeScreen = () =>  
{
    this.setState({DoNotShowSavingsScreen:true});
    this.setState({DoNotShowSummaryScreen:true});
    this.setState({DoNotShowExpendituresScreen:true});
    this.setState({DoNotShowFeesScreen:false});
    this.setState({ modalVisible: false});
}
showSavingsScreen = () =>  
{
    this.setState({DoNotShowFeesScreen:true});
    this.setState({DoNotShowSummaryScreen:true});
    this.setState({DoNotShowExpendituresScreen:true});
    this.setState({DoNotShowSavingsScreen:false});
    this.setState({ modalVisible: false});
}

showExpendituresScreen = () =>  
{
    this.setState({DoNotShowFeesScreen:true});
    this.setState({DoNotShowSummaryScreen:true});
    this.setState({DoNotShowSavingsScreen:true});
    this.setState({DoNotShowExpendituresScreen:false});
    this.setState({ modalVisible: false});
}
showSummaryScreen = () =>  
{
    this.setState({DoNotShowFeesScreen:true});
    this.setState({DoNotShowExpendituresScreen:true});
    this.setState({DoNotShowSavingsScreen:true});
    this.setState({DoNotShowSummaryScreen:false});
    this.setState({ modalVisible: false});
}

setSelectedYearValue = (text) =>{this.setState({SelectedYearValue:text});}
setSelectedFeesYearValue= (text) =>{this.setState({SelectedFeesYearValue:text});}


getUserSavingsDetails =  async () => 
{
    
        let username = this.state.UserName;
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
            this.setState({UserSavingsData:[...JSON.parse(results)]})
            this.setState({DoNotShowSavingsInnerScreen:false});
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
            };
    
}

getUserFeesDetails =  async () => 
{
    
        let username = this.state.UserName;
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
            this.setState({UserFeesData:[...JSON.parse(results)]})
            this.setState({DoNotShowFeesInnerScreen:false});
        }

        catch (error)
            {
                Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
            };
    
}


render() {
    
    const {SelectedFeesYearValue,SelectedYearValue,CollectionsSummary,CashAtHandSummary,modalVisible} = this.state;
    const {ExpendituresDetails,UserSavingsData,UserFeesData} = this.state;
    const {DoNotShowSavingsScreen,DoNotShowSummaryScreen,DoNotShowExpendituresScreen, DoNotShowFeesScreen} = this.state;
    const {DoNotShowSavingsInnerScreen,DoNotShowFeesInnerScreen} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.headerSpaceOne} ></View>
            <View style={styles.selecteOptionsMainView}>
                <View style={styles.selecteOptionsBtnTitleView}> 
                    <Text style={styles.textLabels}>Savings</Text>
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



                {DoNotShowSavingsScreen ?<></>:(<>
                    <View style={styles.selectYearBtnView}>
                        <View style={styles.yearSelectionView}> 
                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberTwo}
                                    selectedValue={SelectedYearValue}
                                    onValueChange={(itemValue, itemIndex) => this.setSelectedYearValue(itemValue)}>
                                    <Picker.Item label="year" />
                                    <Picker.Item label="2019" value="2019"/>
                                    <Picker.Item label="2020" value="2020"/>
                                    <Picker.Item label="2021" value="2021"/>
                                    <Picker.Item label="2022" value="2022"/>
                                    <Picker.Item label="2023" value="2023"/>
                                    <Picker.Item label="2024" value="2024"/>
                                    <Picker.Item label="2025" value="2025"/>
                                    <Picker.Item label="2026" value="2026"/>
                                    <Picker.Item label="2027" value="2027"/>
                                    <Picker.Item label="2028" value="2028"/>
                                    <Picker.Item label="2029" value="2029"/>
                                    <Picker.Item label="2030" value="2030"/>
                                </Picker>
                            </View>
                        </View>
                        

                        <View style={styles.selecteShowBtnView}> 
                            <TouchableOpacity onPress={this.getUserSavingsDetails}>
                                <Text style={styles.showBtnTextLabels}>Show</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {DoNotShowSavingsInnerScreen ?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={styles.tableTitleView2}> 
                            <Text style={styles.tableTitleTextLabels}>Your Savings For {SelectedYearValue} </Text>
                        </View>
                        <ScrollView horizontal={true} >
                            <View style={styles.tableHeaderView}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Amount</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Month</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Year</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <ScrollView>
                        { UserSavingsData && UserSavingsData.map((IteamKey , index) => (

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
                                        <Text  style={styles.trTdText}>{IteamKey.AMOUNT}</Text>
                                    </View>
                                    
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.MONTH}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.YEAR}</Text>
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
                    { CollectionsSummary && CollectionsSummary.map((IteamKey , index) => (
                        <View key={index}>
                            <View style={styles.titleView}> 
                                <Text style={styles.textLabels}>Collections Summary</Text>
                            </View>
                            <View style={styles.mainGridView}>
                                <View style={styles.mainGridSpaceView}></View>
                                <View style={styles.floatLeftView} >
                                <Text  style={styles.textLabels}>Administration</Text>
                                <Text  style={styles.textLabels}>Pavers Boost</Text>
                                    <Text  style={styles.textLabels}>Membership</Text>
                                    <Text  style={styles.textLabels}>Senkubuge</Text>
                                    <Text  style={styles.textLabels}>Savings</Text>
                                    <Text  style={styles.textLabels}>Club</Text>

                                    <View style={styles.underLineView}></View>
                                    <Text  style={styles.textLabels}>Total</Text>
                                    <View style={styles.underLineView}></View>
                                </View>
                                <View style={styles.mainGridSpaceView}></View>
                                <View style={styles.floatRightView} >
                                    <Text  style={styles.textLabels}>{IteamKey.FEES}</Text>
                                    <Text  style={styles.textLabels}>{IteamKey.PAVERS}</Text>
                                    <Text  style={styles.textLabels}>{IteamKey.MEMBERSHIP}</Text>
                                    <Text  style={styles.textLabels}>{IteamKey.SENKUBUGE}</Text>
                                    <Text  style={styles.textLabels}>{IteamKey.SAVINGS}</Text>
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

                    <View style={{height:50}} ></View>
                    { CashAtHandSummary && CashAtHandSummary.map((IteamKey , index) => (
                    
                    <View key={index}>
                        <View style={styles.titleView}> 
                            <Text style={styles.textLabels}>Cash At Hand Summary</Text>
                        </View>
                            <View style={styles.mainGridView}>
                                <View style={styles.mainGridSpaceView}></View>
                                <View style={styles.floatLeftView} >
                                <Text  style={styles.textLabels}>Collections</Text>
                                    <Text  style={styles.textLabels}>Expense </Text>
                                    <Text  style={styles.textLabels}>Fees </Text>
                                    <View style={styles.underLineView}></View>
                                    <Text  style={styles.textLabels}>Balance</Text>
                                    <View style={styles.underLineView}></View>
                                </View>
                                <View style={styles.mainGridSpaceView}></View>
                                <View style={styles.floatRightView} >
                                    <Text  style={styles.textLabels}>{IteamKey.TOTAL}</Text>
                                    <Text  style={styles.textLabels}>{IteamKey.EXPENDITURES}</Text>
                                    <Text  style={styles.textLabels}>{IteamKey.FEES}</Text>
                                    <View style={styles.underLineView}></View>
                                    <Text  style={styles.textLabels}>{IteamKey.ATHANDTOTAL}</Text>
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





                {DoNotShowExpendituresScreen?<></>:(<>
                    <View style={[styles.tableTitleView, styles.tableTitleView7]}> 
                        <Text style={styles.tableTitleTextLabels}>Expenditures Details</Text>
                    </View>
                    <ScrollView horizontal={true} >
                        <View style={styles.tableHeaderView}>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Activity Name</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Amount</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Date Taken</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Received By</Text>
                            </View>
                        </View>
                    </ScrollView>
                    
                    <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                    <ScrollView>
                    { ExpendituresDetails && ExpendituresDetails.map((IteamKey , index) => (

                        <ScrollView horizontal={true} >
                        <View key={index}>
                            <View style={styles.mainTableView}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.ITEM}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.AMOUNT}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.DATES}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.RECIEPT}</Text>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                        
                        ))
                    }
                    <View style={{height:15}}></View>
                    </ScrollView>
                </>)}


                {DoNotShowFeesScreen ?<></>:(<>
                    <View style={styles.selectYearBtnView}>
                        <View style={styles.yearSelectionView}> 
                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.colourNumberTwo}
                                    selectedValue={SelectedFeesYearValue}
                                    onValueChange={(itemValue, itemIndex) => this.setSelectedFeesYearValue(itemValue)}>
                                    <Picker.Item label="year" />
                                    <Picker.Item label="2021" value="2021"/>
                                    <Picker.Item label="2022" value="2022"/>
                                    <Picker.Item label="2023" value="2023"/>
                                    <Picker.Item label="2024" value="2024"/>
                                    <Picker.Item label="2025" value="2025"/>
                                    <Picker.Item label="2026" value="2026"/>
                                    <Picker.Item label="2027" value="2027"/>
                                    <Picker.Item label="2028" value="2028"/>
                                    <Picker.Item label="2029" value="2029"/>
                                    <Picker.Item label="2030" value="2030"/>
                                </Picker>
                            </View>
                        </View>
                        

                        <View style={styles.selecteShowBtnView}> 
                            <TouchableOpacity onPress={this.getUserFeesDetails}>
                                <Text style={styles.showBtnTextLabels}>Show</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {DoNotShowFeesInnerScreen ?<></>:(<>
                        <View style={{height:20}} ></View>
                        <View style={[styles.tableTitleView, styles.tableTitleView7]}> 
                            <Text style={styles.tableTitleTextLabels}> Your Fees For { SelectedFeesYearValue } </Text>
                        </View>
                        <ScrollView horizontal={true} >
                            <View style={styles.tableHeaderView}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Name</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Date</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Amount</Text>
                                </View>
                                
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Month</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trThText}>Year</Text>
                                </View>
                            </View>
                        </ScrollView>
                        
                        <ScrollView>
                        { UserFeesData && UserFeesData.map((IteamKey , index) => (

                            <ScrollView horizontal={true} >
                            <View key={index}>
                                <View style={[styles.mainTableView]}>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.DATE}</Text>
                                    </View>
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.AMOUNT}</Text>
                                    </View>
                                    
                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.MONTH}</Text>
                                    </View>

                                    <View style={styles.tableTrView} >
                                        <Text  style={styles.trTdText}>{IteamKey.YEAR}</Text>
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
                            <TouchableOpacity onPress={this.showSavingsScreen}>
                                <Text style={styles.modalTextLabels}>Savings</Text>
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
                            <TouchableOpacity onPress={this.showExpendituresScreen}>
                                <Text style={styles.modalTextLabels}>Expenditures</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showAdministrativeScreen}>
                                <Text style={styles.modalTextLabels}>Administrative</Text>
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
