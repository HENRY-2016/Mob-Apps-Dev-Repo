
import React from 'react';
import { Text, View,Linking, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Ionicons,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APIAbout} from './DataFileApis';


export default class About extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            AboutDetails1:[
                {About: "About About About",
    AboutShop: "shop details shop details shop details shop details shop details shop details shop details shop details",
    Motto: "Motto Motto Motto",
    Location: "Location Location Location"}
            ],
            AboutDetails:[],

            NumberOfItems:'',
    }
    
}
componentDidMount() 
{
    axios.get(APIAbout)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({AboutDetails:[...JSON.parse(results)]})
        // AsyncStorage.setItem('AboutDetails',JSON.stringify(results));
        console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Data");})

    // setTimeout(this.getAboutDetails,3000)
    setInterval(this.getNumberOfItems,1000);
}

getAboutDetails = async () =>
{

    try 
    {   AsyncStorage.getItem ('AboutDetails')
        .then(value =>{if (value != null){ this.setState({AboutDetails:value})} console.log("////"+value) })
        console.log("===== geting AboutDetails")
        // console.log(this.state)

    }catch (error) { console.log(error)}

}

getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};

render() {
    
    const { AboutDetails,NumberOfItems} = this.state;

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
                    <Text style = { styles.productTopTitleName}> About us </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            <ScrollView>
                {
                AboutDetails.map((item, i) => (
                <>
                <View key={i} >
                    <View style={styles.aboutMainSpaceView}></View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>Name </Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.About}</Text>
                    </View>
                    {/*========================================================  */}
                    <View style={styles.aboutMainSpaceView}></View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>Our Banks </Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.Bank1Names}  {item.Bank2Names}</Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>In Names  {item.PalaceHolderOne}</Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.Bank1}  {item.Bank2}</Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>In Names  {item.PalaceHolderTwo}</Text>
                    </View>
                    {/*========================================================  */}
                    <View style={styles.aboutMainSpaceView}></View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>Mobile Money </Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text   style={styles.aboutTextLabels}>{item.Tell1Names}  {item.Tell1}</Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.Tell2Names}  {item.Tell2}</Text>
                    </View>
                    
                    {/*========================================================  */}

                    <View style={styles.aboutMainSpaceView}></View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>Motto</Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.Motto}</Text>
                    </View>

                    <View style={styles.aboutMainSpaceView}></View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>About Shop</Text>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.AboutShop}</Text>
                    </View>

                    <View style={styles.aboutMainSpaceView}></View>
                    <View style={styles.aboutMainView}>
                        <View><Text  style={styles.aboutTextLabels}>Location</Text></View>
                    </View>
                    <View style={styles.aboutMainView}>
                        <Text  style={styles.aboutTextLabels}>{item.Location}</Text>
                    </View>
                </View>
                </>
                ))}
            </ScrollView>
        </View>
    );
}
}
