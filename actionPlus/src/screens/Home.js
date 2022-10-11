
import React from 'react';
import { Text, View,TextInput,TouchableOpacity,Alert, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { MaterialCommunityIcons,AntDesign } from '@expo/vector-icons';
import { COLORS } from './Colours';
import CustomSlider from './CustomSlider'
import axios from "axios";
import {APIListNewNotification,ImageUrl,
        APIListAllSlider,APIListAllNotification,
        } from './DataFileApis';

import 
    { 
        LoadingError} from './Functions';


export default class Home extends React.Component {
constructor(props){
    super(props);
    this.state = {
        Countries:[],
        images:[],
        data:[],
        Notifications:[],
    

        // Inner Screens
    
        // customer
        TodaysNotifications:'',


    }
    
}

UNSAFE_componentWillMount() {



    axios.get(APIListNewNotification)
    .then(res => {
        let results = res; 
        this.setState({TodaysNotifications:results.data})})
    .catch(err=>{})

    axios.get(APIListAllSlider)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonresults =JSON.parse(results); 
        let imageSliders = [];
        let titleSliders = [];
        let subtitleSliders = [];
        for (i=0; i<jsonresults.length; i++)
            {
                
                let  image = ImageUrl+jsonresults[i].Image;
                let  title = jsonresults[i].Title;
                let  subtitle = jsonresults[i].Holder1;
                imageSliders.push(image)
                titleSliders.push(title)
                subtitleSliders.push(subtitle)

            }
        this.setState({images:[...imageSliders]})
        this.setState({data:[...jsonresults]})

        })
    .catch(err=>{console.log(err)})

    axios.get(APIListAllNotification)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Notifications:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error",LoadingError);})
}


render() {
    
    const {TodaysNotifications,images, data }= this.state;

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

                <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text  style={styles.mainCartNumberTxt}>{TodaysNotifications}</Text>
                    <AntDesign name="notification" size={35} style={styles.NotificationIcon} />
                </TouchableOpacity>
            </View>
            </View>
            <CustomSlider images={images} />

                <ScrollView showsVerticalScrollIndicator={false}>
            
                <View  style={styles.SliderCaptionCard}>
                    {data && data.map((item,index) =>(
                        <View key={index}>
                            <Text  style={[styles.TextLabels, styles.TextLabels1]}>{item.Title}</Text>
                            <Text  style={[styles.TextLabels, styles.TextLabels4]}>{item.Holder1}</Text>
                        </View>
                    ))}
                </View>

            <View style={styles.MainBottomSpaceView}></View>
            </ScrollView>
            </View>

    );
}
}
