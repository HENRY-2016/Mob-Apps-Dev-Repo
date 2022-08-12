
import React from 'react';
import { Text, View,TouchableOpacity,Image,ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIListAllBranches, ImageUrl} from './DataFileApis';


export default class Branches extends React.Component {
constructor(props){
    super(props);
    this.state = {
        BranchesData:[],
    
    }
    
}

componentDidMount() {
    axios.get(APIListAllBranches)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BranchesData:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load Products");})


}



render() {
    
        const {BranchesData} = this.state;
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
            <View style={styles.MainBodyView}  >
                <View style={{height:80}}></View>
                {BranchesData && BranchesData.map((item,index) =>(
                    <View key={index} >
                        <View style={styles.DetailsCard} >
                            <View style={[styles.ImageCardView,styles.ImageCardView2]} >
                                <Image style={styles.ImageImage2} source={{uri: ImageUrl+item.Image}}/>
                            </View>
                            <Text style={[styles.TextLabels2 ,styles.TextLabels3]} >{item.Name}</Text>
                            <Text style={[styles.TextLabels2 ,styles.TextLabels3]} >{item.p1}</Text>
                            <Text style={[styles.TextLabels2 ,styles.TextLabels4]} >{item.p2} </Text>
                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.p3} </Text>
                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.p4} </Text>
                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.p5} </Text>
                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.p6} </Text>
                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.p7} </Text>
                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.p8} </Text>


                        </View>
                        <View style={{height:80}}></View>
                    </View>
                ))}

                </View>
                

                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
            </View>

    );
}
}
