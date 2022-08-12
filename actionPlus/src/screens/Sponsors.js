
import React from 'react';
import { Text, View,Alert,TouchableOpacity,Image, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIListAllSponsors, ImageUrl} from './DataFileApis';



export default class Sponsors extends React.Component {
constructor(props){
    super(props);
    this.state = {
        SponsorsData:[],
        
        
    
    }
    
}

componentDidMount() {

    axios.get(APIListAllSponsors)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SponsorsData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

}


render() {
    
    const {SponsorsData} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
            <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <MaterialCommunityIcons name="microsoft-xbox-controller-menu" size={50} style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Home </Text>
                </View> */}

            <View style={styles.mainChatView}>

                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Notifications')}>
                    
                        <Text  style={styles.mainCartNumberTxt}>3</Text>

                    <AntDesign name="notification" size={35} style={styles.NotificationIcon} />
                </TouchableOpacity>
            </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{height:20}}></View>

            <View style={styles.HeadingsView}>
                <Text style={styles.TextLabels4}>
                Funding from the Coronavirus Community Support Fund, distributed by The National Lottery Community Fund, has helped us to build this new website for our organisation. Thanks to the Government for making this possible. Our African HIV Project is funded by Richard King Bequest
                </Text>
            </View>
            <View style={{height:20}}></View>

            {SponsorsData && SponsorsData.map((item,index)=>(
                <View key={index} >
                    <View style={styles.GridCard}>
                        <Image source={{uri: ImageUrl+item.Image}} style={styles.GridImage} />
                    </View>
                    <View style={{height:20}}></View>
                </View>

            ))}

            <View style={styles.MainBottomSpaceView}></View>
            </ScrollView>
            </View>

    );
}
}
