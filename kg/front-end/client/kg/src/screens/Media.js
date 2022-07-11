
import React from 'react';
import { Text, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Ionicons,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { Video} from 'expo-av';

import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APIHomeProducts,APISlider, imageurl} from './DataFileApis';

export default class Media extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            cartItems:[],
            images:[],
            NumberOfItems:'',

            // Screens 
            DoNotShowDisplayScreen: false,

            VideoUrls: [ {Name:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kg-app-1.mp4"},
                            {Name:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kg-app-2.mp4"},
                            ]

    }
    
}
componentDidMount() 
{
    // console.log("API=======>"+ APIHomeProducts)
    // axios.get(APIHomeProducts)
    // .then(res => {
    //     let results =JSON.stringify(res.data); 
    //     this.setState({cartItems:[...JSON.parse(results)]})
    //     console.log(this.state)
    //     })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Video");})


    setInterval(this.getNumberOfItems,1000);
}

getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};

render() {
    
    const { VideoUrls,NumberOfItems, DoNotShowDisplayScreen} = this.state;

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
                    <Text style = { styles.productTopTitleName}> Home </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            {DoNotShowDisplayScreen ?<></> : (
                <>
                <ScrollView>
                    {VideoUrls && VideoUrls.map(( Item, Key) => (
                        <View key={Key}>
                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video style={styles.video}
                                    source={{uri: Item.Name}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                        </View>
                        ))}
                    <View style={styles.blankSpaceView}></View>
                </ScrollView>
                </>
            )}
        </View>
    );
}
}
