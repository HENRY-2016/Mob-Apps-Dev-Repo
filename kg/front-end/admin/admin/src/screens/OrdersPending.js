
import React from 'react';
import { Text, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";


// APIs
import {APIListPendingOrders} from './DataFileApis';
import {HeaderTopRightIcon} from "./Functions"
import TopIcon from "../imgs/dashboard/3.png";



export default class OrdersPending extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            PendingOrderDetails:[],
            }
}

componentDidMount() {

    axios.get(APIListPendingOrders)
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({PendingOrderDetails:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}




render() {
    
    const { PendingOrderDetails} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Orders :: Pending </Text>
                </View> 

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn}>
                        <HeaderTopRightIcon image={TopIcon} />
                    </TouchableOpacity>
                </View>
            </View>


            {/* =================================================== */}
                <View style={{height:30}} ></View>
                    <ScrollView horizontal={true} >
                        <View style={[styles.tableHeaderView]}>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Customer</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Amount</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Reference</Text>
                            </View>
                            <View style={styles.tableTrView} >
                                <Text  style={styles.trThText}>Date</Text>
                            </View>
                            
                        </View>
                    </ScrollView>
                    
                    <View style={styles.mainSpaceView}></View>
                    <ScrollView>
                    { PendingOrderDetails && PendingOrderDetails.map((IteamKey, index) => (

                        <ScrollView horizontal={true} >
                        <View key={index}>
                            <View style={styles.mainTableView}>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Phone}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Amount}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.Reference}</Text>
                                </View>

                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.PalaceHolderOne}</Text>
                                </View>
                            </View>
                        </View>
                        </ScrollView>
                        ))
                    }
                    <View style={{height:15}}></View>
                    </ScrollView>
        </View>
    );
}
}
