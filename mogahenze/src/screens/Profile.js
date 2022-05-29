import React,{useEffect,useState} from 'react';
import {View, Text,TouchableOpacity, Alert} from 'react-native';
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

// icons
import { Entypo, AntDesign } from '@expo/vector-icons';

function Profile({navigation}) {

    const [UserName, setUserName] = useState('');
    const [UserPhone, setUserPhone] = useState('');

    useEffect(()=>{
        getUserPhone();
        getUserName();
    },[]);

    const getUserName = () => 
    {
        try 
        {   AsyncStorage.getItem ('UserName')
            .then(value =>{if (value != null){setUserName(value)}})
        }catch (error) { console.log(error)}
    }
    const getUserPhone = () => 
    {
        try 
        {   AsyncStorage.getItem ('UserPhone')
            .then(value =>{if (value != null){setUserPhone(value)}})
        }catch (error) { console.log(error)}
    }; 
    const logoutUserDetails = async () => 
    {
        try 
        {   
            await AsyncStorage.removeItem ('UserName');
            await AsyncStorage.removeItem ('UserPhone');
            Alert.alert("You Have Logged Out")

        }catch (error) { console.log(error)}
    }; 
    return (
        <View style={styles.mainView}>
            <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.topNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Profile</Text>
                </View>
            </View>
            <View style={styles.profileTopView}>
                <View style={styles.profileUsercard}>
                <View style={styles.profileLeftUserView}>
                        <Entypo name="user" size={100} style={styles.profileLeftUserIcones} color="black" />
                    </View>
                    <View>
                        <Text style = {styles.profileLable} >{UserName}</Text>
                        <Text style = {styles.profileLable} >{UserPhone}</Text>
                    </View>
                    <View >
                        <TouchableOpacity style={styles.profileCardArrow} >
                            <AntDesign name="right" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        


            <View style={styles.profileLinksView}>

                <View style={styles.profileLinks1}>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileLeftIcones} >
                            <AntDesign name="questioncircle" size={24} style={styles.profileLeftIconesIcones} />
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.profileLable} >Help</Text>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileNaviArrows1} >
                            <AntDesign name="right" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                

                <View style={styles.profileLinks2}>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileLeftIcones}>
                            <AntDesign name="exclamationcircleo" size={24} style={styles.profileLeftIconesIcones} />
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.profileLable} >About </Text>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileNaviArrows} >
                        <AntDesign name="right" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileLinks3}>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileLeftIcones} >
                            <Entypo name="star-outlined" size={35} style={styles.profileLeftIconesIcones} />
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.profileLable} >Rate App </Text>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileNaviArrows3} >
                            <AntDesign name="right" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileLinks4}>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileLeftIcones} >
                        <Entypo name="share" size={24} style={styles.profileLeftIconesIcones} />
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.profileLable} >Share App </Text>
                    <View style={styles.profileNaviArrowsView}>
                        <TouchableOpacity style={styles.profileNaviArrows4}>
                        <AntDesign name="right" size={18} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{alignItems: "center"}}>
                <TouchableOpacity style={styles.offersProcedbtn} onPress={()=>logoutUserDetails()} >
                    <Text style = {styles.nextbtnText} >Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Profile;
