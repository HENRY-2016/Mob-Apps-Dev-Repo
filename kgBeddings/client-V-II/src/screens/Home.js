
import React from 'react';
import { Text, View,Image, TouchableOpacity,Alert,FlatList, ScrollView} from 'react-native';
import {Ionicons,FontAwesome} from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import { COLORS } from './Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APISlider,APIHomeDetailsById, imageUrl} from './DataFileApis';
import { formatData,numColumns,openWhatsAppLink,
        addItemsToCart,formatNumberWithComma,
        checkInternetConnection,noInternetConnectionView,
        renderItemDetailsViewUi, 
        } from './Functions';

import CustomSlider from './CustomSlider';
import {APIHomeProducts} from './DataFileApis';
// import { HomeData,LoadHomeData,} from './AppDataFile';

export default class Home extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        
            IsDeviceConnected:true,
            CurrentNameItemList:[],
            modalVisible: false,
            HomeData:[],
            images:[],
            NumberOfItems:'',

            // Screens
            DoNotShowDisplayScreen: false,
            DoNotShowItemDetailsScreen: true,

            ItemDetails:[],
            DetailsName:'',
            DetailsShortText:'',
            DetailsLongText:'',
            DetailsAmount:'',
            ItemIndex:'',

    }
    
}
UNSAFE_componentWillMount () {   
    this.LoadProductsItems();
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}
componentDidMount(){this.numberOfCartItems();}

refreshScreenNow = () =>{checkInternetConnection().then(Status=> {
    this.LoadProductsItems();this.setState({IsDeviceConnected:Status})})}


numberOfCartItems = ()=>{setInterval(this.getNumberOfItems,1000);}
stopNumberOfCartItems = ()=>{clearInterval(this.numberOfCartItems);}


getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};
componentWillUnmount()
{
    console.log("Unmounting.........")
    this.stopNumberOfCartItems();
    // clearInterval(this.numberOfCartItems())
}

LoadProductsItems = () =>{
    this.LoadAppItemsData(APIHomeProducts,"HomeData")
    this.getHomeSliderImages();
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
getHomeSliderImages = () =>
{
    axios.get(APISlider)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonResults =JSON.parse(results); 
        let imageSliders = [];
        for (i=0; i<jsonResults.length; i++)
            {
                
                let  image = imageUrl+jsonResults[i].image;
                imageSliders.push(image)
            }
        this.setState({images:[...imageSliders]})
        })
    .catch(err=>{})
    
}
getDetailsOptions = (id) =>
{
    axios.get(APIHomeDetailsById+id)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(imageUrl+jsonResults[0].image1)
        imageSlider.push(imageUrl+jsonResults[0].image2)
        imageSlider.push(imageUrl+jsonResults[0].image3)
        imageSlider.push(imageUrl+jsonResults[0].image4)
        imageSlider.push(imageUrl+jsonResults[0].image5)
        this.setState({ItemDetails:[...imageSlider]})
        this.setState({DetailsName:jsonResults[0].Name});
        this.setState({DetailsAmount:jsonResults[0].Amount});
        this.setState({DetailsShortText:jsonResults[0].ShortText});
        this.setState({DetailsLongText:jsonResults[0].LongText});
        })
    .catch()
}

showItemDisplayScreen = () =>
{
    this.setState({DoNotShowItemDetailsScreen: true})
    this.setState({DoNotShowDisplayScreen: false})
}
showItemDetailsScreen = () =>
{
    this.setState({DoNotShowDisplayScreen: true})
    this.setState({DoNotShowItemDetailsScreen: false})
}
displayItemDetailsScreen = (index,id) =>
{
    this.getDetailsOptions(id);
    this.setState({ItemIndex:index})
    setTimeout(this.showItemDetailsScreen,1000)
}

renderItemsUI = ({item,index}) => 
{
    if (item.empty === true)
        { return <View style={[styles.ItemInvisible]}></View> }
    return (
        <View style={styles.homeCardView2}>
            <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index,item.id,index)}>
                <Image source={{uri: imageUrl+item.image}} style={styles.productImage} />
            </TouchableOpacity> 
            

            <View style={styles.productTextView}>
                <Text numberOfLines={1}  style={styles.productText}> {item.Name}</Text>
                <View style={{height:5}} ></View>
                <Text numberOfLines={1} style={styles.productText}> {item.ShortText}</Text>
                <View style={{height:5}} ></View>
                <Text numberOfLines={1} style={styles.productText}> UGX : {formatNumberWithComma(item.Amount)}</Text>
                
                <View style={{height:8}} ></View>
                <View style={styles.whatsAppView}>
                    <TouchableOpacity onPress={openWhatsAppLink} >
                        <FontAwesome style={styles.whatsAppIcon} name="whatsapp" size={24} color={COLORS.whatsAppColor} />
                        <Text  style={styles.whatsAppText}>WhatsApp Us </Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:8}} ></View>
            </View>

            <View style={styles.homeOrderBtnView}>
                <View style={[styles.centerElement, styles.homeOrderBtn]}>
                    <TouchableOpacity style={styles.homeOrdersBtn} onPress={()=>addItemsToCart(index,this.state.HomeData)} >
                        <Text style = { styles.homeOrdersTxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}



render() {
    
    const {IsDeviceConnected,HomeData,images,NumberOfItems,ItemIndex,DetailsName,DetailsShortText,DetailsAmount,DetailsLongText} = this.state;
    const {DoNotShowItemDetailsScreen,DoNotShowDisplayScreen,ItemDetails} = this.state;

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
                        <Ionicons name="ios-cart" size={28} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
            </View>


            {IsDeviceConnected ?(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <View style={styles.homeNavigationView}>
                        <CustomSlider images={images} />
                    </View>

                    <View style={{ height:30}}></View>
                    <FlatList data={ formatData(HomeData,numColumns)}
                    renderItem={this.renderItemsUI} numColumns={numColumns}/>
                </>)}

                
                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.CurrentNameItemList)}

                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProceedBtn} >
                                <Text style = {styles.nextBtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCEED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                    </ScrollView>
                </>)}
                </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
