
import React from 'react';
import { Text, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Ionicons,FontAwesome,Feather,AntDesign,Entypo,FontAwesome5, } from '@expo/vector-icons';
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

import { APIAbout } from './DataFileApis';
import {  
        openPhoneMtnCallLink,openPhoneAirTelCallLink1,
        openTwitterLink,openYouTubeLink,openWhatsAppLink,
        openFaceBookLink,openInstagramLink, 
        openGoogleMapPinLink,

        checkInternetConnection,noInternetConnectionView,
        
} from './Functions';
import { COLORS } from './Colours';
export default class About extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            AboutDetails:[],
            AboutTextData:[],
            NumberOfItems:'',
            IsDeviceConnected:true,
    }
    
}
UNSAFE_componentWillMount()
{
    this.LoadProductsItems();
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}
componentDidMount() {setInterval(this.getNumberOfItems,1000);}
refreshScreenNow = () =>{checkInternetConnection().then(Status=> {
    this.LoadProductsItems();this.setState({IsDeviceConnected:Status})})}

LoadProductsItems = () =>{
    this.LoadAppItemsData(APIAbout,"AboutTextData")
};
LoadAppItemsData = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        this.setState({[StateName]:jsonResults})
        })
    .catch(err=>{console.log(err);})
}
getAboutDetails = async () =>
{

    try 
    {   AsyncStorage.getItem ('AboutDetails')
        .then(value =>{if (value != null){ this.setState({AboutDetails:value})} console.log("////"+value) })
    }catch (error) { console.log(error)}

}

getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};

render() {
    
    const {NumberOfItems,IsDeviceConnected,AboutTextData} = this.state;

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

            {IsDeviceConnected ?(<>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{height:10}} ></View>
                <View style={styles.aboutCardView}>
                    <View style={{height:20}}></View>

                    <View style={styles.aboutCardRowView}>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openYouTubeLink} >
                                <AntDesign name="youtube" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>YouTube </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openTwitterLink} >
                                <Entypo name="twitter" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>Twitter </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openFaceBookLink} >
                                <FontAwesome name="facebook-f" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>FaceBook </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={styles.aboutCardRowView}>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openInstagramLink} >
                                <AntDesign name="instagram" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>Instagram </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openWhatsAppLink} >
                                <FontAwesome5 name="whatsapp" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>WhatsApp </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openGoogleMapPinLink} >
                                <Ionicons name="location" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>Location </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={styles.aboutCardRowView}>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openPhoneAirTelCallLink1} >
                                <Feather name="phone-call" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>AirTel Call </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity  onPress={openPhoneMtnCallLink} >
                                <Feather name="phone-call" style={styles.aboutCardIcons} size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>MTN Call </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.aboutCardRowColumn}>
                            <TouchableOpacity onPress={openPhoneAirTelCallLink1} >
                                <Feather style={styles.aboutCardIcons} name="phone-call" size={24} color={COLORS.colorNumberOne} />
                                <Text  style={styles.socialMediaTextLabels}>AirTel Call </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height:20}}></View>

                </View>

                <View style={styles.aboutCardView}>
                    {AboutTextData&&AboutTextData.map((item, index) => (<>
                        <View  >
                            <View key={index}>
                                <View style={styles.aboutMainSpaceView}></View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.socialMediaTextLabels}>Name </Text>
                                </View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.aboutTextLabels}>{item.About}</Text>
                                </View>
                                {/*========================================================  */}
                                
                                <View style={styles.aboutMainSpaceView}></View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.socialMediaTextLabels}>Our Banks </Text>
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
                                    <Text  style={styles.socialMediaTextLabels}>Mobile Money </Text>
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
                                    <Text  style={styles.socialMediaTextLabels}>Motto</Text>
                                </View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.aboutTextLabels}>{item.Motto}</Text>
                                </View>

                                <View style={styles.aboutMainSpaceView}></View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.socialMediaTextLabels}>About Shop</Text>
                                </View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.aboutTextLabels}>{item.AboutShop}</Text>
                                </View>

                                <View style={styles.aboutMainSpaceView}></View>
                                <View style={styles.aboutMainView}>
                                    <View><Text  style={styles.socialMediaTextLabels}>Location</Text></View>
                                </View>
                                <View style={styles.aboutMainView}>
                                    <Text  style={styles.aboutTextLabels}>{item.Location}</Text>
                                </View>
                                <View style={{height:20}}></View>
                            </View>
                        </View>
                    </>))}
                </View>
            </ScrollView>
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
