
import React from 'react';
import { Text, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";


// APIs
import {APIListHalfPayments} from './DataFileApis';
import {HeaderTopRightIcon} from "./Functions"
import TopIcon from "../imgs/dashboard/8.png";



export default class PaymentsHalf extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            HalfPaymentsDetails:[],
            }
}

componentDidMount() {

    axios.get(APIListHalfPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({HalfPaymentsDetails:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}




render() {
    
    const { HalfPaymentsDetails} = this.state;
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
                    <Text style = { styles.productTopTitleName}> Payments :: Half </Text>
                </View> 

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn}>
                        <HeaderTopRightIcon image={TopIcon} />
                    </TouchableOpacity>
                </View>
            </View>


            {/* =================================================== */}
                <View style={{height:30}} ></View>
                    <ScrollView>
                    { HalfPaymentsDetails && HalfPaymentsDetails.map((IteamKey, index) => (

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
                                    <Text  style={styles.trTdText}>{IteamKey.PalaceHolderThree}</Text>
                                </View>
                                <View style={styles.tableTrView} >
                                    <Text  style={styles.trTdText}>{IteamKey.PalaceHolderFive}</Text>
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
