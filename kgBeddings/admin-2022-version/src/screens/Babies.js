
import React from 'react';
import { Text, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";


// APIs
import {APIListNewPayments} from './DataFileApis';
import {HeaderTopRightIcon} from "./Functions"
import TopIcon from "../imgs/dashboard/5.png";



export default class Babies extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            NewPaymentsDetails:[],
            }
}

componentDidMount() {

    axios.get(APIListNewPayments)
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({NewPaymentsDetails:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

}




render() {
    
    const { NewPaymentsDetails} = this.state;
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
                    <Text style = { styles.productTopTitleName}> Payments :: Pending </Text>
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
                    { NewPaymentsDetails && NewPaymentsDetails.map((IteamKey, index) => (

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
