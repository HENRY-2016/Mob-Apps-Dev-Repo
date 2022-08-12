
import React from 'react';
import { Text, View,Image,TouchableOpacity,Alert, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIListAllFounder, ImageUrl} from './DataFileApis';


export default class Founder extends React.Component {
constructor(props){
    super(props);
    this.state = {
        FounderData:[],
        FounderOthers:[],
        
    }
    
}

componentDidMount() {

    axios.get(APIListAllFounder)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonResults =JSON.parse(results); 
        let FirstIndex = jsonResults[0];
        let Data = [];
        Data.push(FirstIndex);
        jsonResults.shift() // remove fst array element
        this.setState({FounderOthers:[...jsonResults]})
        this.setState({FounderData:[...Data]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data");})

}

render() {
    
    const {FounderData,FounderOthers} = this.state;

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
                {FounderData && FounderData.map((item,index) => (
                    <View key={index} >
                        <View style={styles.DetailsCard} >
                        <View style={styles.DetailsHeaderCard}>
                            <View style={[styles.ImageCardView,styles.ImageCardView1]} >
                                <Image style={styles.ImageImage} source={{uri: ImageUrl+item.Image}}/>
                            </View>
                            <View style={styles.NameTitleDescriptionView} >
                                <Text style={[styles.TextLabels2 ,styles.TextLabels3]} >{item.Name}</Text>
                            </View>
                        </View>

                            <Text style={[styles.TextLabels2 ,styles.TextLabels3]} >{item.p1}</Text>
                            <Text style={styles.TextLabels4} >{item.p2}</Text>
                            <Text style={styles.TextLabels4} >{item.p3}</Text>
                            <Text style={styles.TextLabels4} >{item.p4}</Text>
                            <Text style={styles.TextLabels4} >{item.p5}</Text>
                            <Text style={styles.TextLabels4} >{item.p6}</Text>
                            <Text style={styles.TextLabels4} >{item.p7}</Text>
                            <Text style={styles.TextLabels4} >{item.p8}</Text>

                        </View>
                        <View style={{height:80}}></View>
                    </View>
                ))}

                {FounderOthers && FounderOthers.map((item,index) =>(
                    <View key={index} >
                        <View style={styles.DetailsCard} >
                            <View style={[styles.ImageCardView,styles.ImageCardView2]} >
                                <Image style={styles.ImageImage2} source={{uri: ImageUrl+item.Image}}/>
                            </View>

                            <Text style={[styles.TextLabels ,styles.TextLabels4]} >{item.Name} </Text>

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
