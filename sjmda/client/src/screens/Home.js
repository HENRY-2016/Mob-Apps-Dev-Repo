
import React from 'react';
import { Text, View, Modal ,TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Octicons,Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
// https://docs.expo.dev/versions/latest/sdk/picker/
import {Picker} from '@react-native-picker/picker';
import axios from "axios";
import styles from "./stylesheet";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import {APIMembersData} from './DataFileApis';






export default class Home extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {

            modalVisible: false,
            // data
            MembersData:[],

            // Main screens
            DoNotShowInforScreen:false,
            DoNotShowMembersScreen:true,

    }
    
}
componentDidMount() 
{
    axios.get(APIMembersData)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({MembersData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}

showMembersScreen = () =>  
{
    this.setState({DoNotShowInforScreen:true});
    this.setState({DoNotShowMembersScreen:false});
    this.setState({ modalVisible: false});
}

showInfoScreen = () =>  
{
    this.setState({DoNotShowMembersScreen:true});
    this.setState({DoNotShowInforScreen:false});
    this.setState({ modalVisible: false});
}

render() {
    
    const {DoNotShowInforScreen,MembersData,modalVisible} = this.state;
    const {DoNotShowMembersScreen} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.headerSpaceOne} ></View>
            <View style={styles.selecteOptionsMainView}>
                <View style={styles.selecteOptionsBtnTitleView}> 
                    <Text style={styles.textLabels}>Sjmda</Text>
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


            {DoNotShowMembersScreen?<></>:(<>
                {/* <View style={styles.selectYearBtnView}>
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
                </View> */}

                <View style={[styles.tableTitleView, styles.tableTitleView4]}> 
                    <Text style={styles.tableTitleTextLabels}>Sjmda Members </Text>
                </View>


                <ScrollView horizontal={true} >
                    <View style={[styles.tableHeaderView, styles.tableHeaderView2]}>
                        <View style={styles.tableTrView} >
                            <Text  style={styles.trThText}>Member_Name</Text>
                        </View>
                        <View style={styles.tableTrView} >
                            <Text  style={styles.trThText}>Member_Ship</Text>
                        </View>
                        <View style={styles.tableTrView} >
                            <Text  style={styles.trThText}>Balance</Text>
                        </View>
                    </View>
                </ScrollView>
                
                <View style={styles.mainExpenditureBottomSpaceLineView}></View>
                <ScrollView>
                { MembersData && MembersData.map((IteamKey , index) => (

                    <ScrollView horizontal={true} >
                    <View key={index}>
                        <View style={styles.mainTableView}>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{IteamKey.NAME}</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{IteamKey.FEES}</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trTdText}>{IteamKey.BALANCE}</Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                    
                    ))
                }
                <View style={{height:15}}></View>
                </ScrollView>
            </>)}
            




            {DoNotShowInforScreen?<></>:(<>
            <ScrollView>
                <View style={styles.HomeInfoMainView} >
                    <Text style={styles.textLabels}>Sjmda</Text>
                    <Text style={styles.textLabels}>Account No </Text>
                    <Text style={styles.textLabels}>01501119228982</Text>
                    <Text style={styles.textLabels}>Members are encouraged deposits their savings/administration fee on bank account  directly </Text> 

                    <Text style={styles.textLabels}> OR</Text>
                    <Text style={styles.textLabels}>using DFCU agents and keep depositslips which should be presented for  updating  
                    sjmda records both soft and hard copies</Text>

                    <Text style={styles.textLabels}>You should photocopy deposit slips because they fade or take a picture using your phone</Text>
                    <View style={{height:20}} ></View>
                    <Text style={styles.textLabels}>History</Text>
                    <Text style={styles.textLabels}>Sjmda Started In September 2019</Text>
                    <Text style={styles.textLabels}>Administrative Fees 3000 Started In 2021</Text>
                    <Text style={styles.textLabels}>Investment Club Pledges On 02/01/2022 At Omanyi Paul's Home </Text>
                <View style={{height:45}} ></View>
                </View>
            </ScrollView>
            </>)
            }

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
                            <TouchableOpacity onPress={this.showMembersScreen}>
                                <Text style={styles.modalTextLabels}>Members</Text>
                            </TouchableOpacity>
                            </View>

                            <View style={{height:15}}></View>
                            <View style={styles.modalOptionsBtnView}> 
                            <TouchableOpacity onPress={this.showInfoScreen}>
                                <Text style={styles.modalTextLabels}>Information</Text>
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
