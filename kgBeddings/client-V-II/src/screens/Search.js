
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, FlatList, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
// import { SliderBox } from "react-native-image-slider-box";

import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from './Colours';
// APIs
import {
        imageUrl,APISearchName,APIOffersDetailsById,APIBabiesDetailsById,
        APISeatsDetailsById,APICarpetsDetailsById,APICurtainsDetailsById,
        APISideBoardsDetailsById,APIIroningBoardDetailsById,APITowelsDetailsById,
        APIBathRobsDetailsById,APIDoorMatsDetailsById,APIBathroomCurtainsDetailsById,
        APIBedsDetailsById,APINetsDetailsById,APIClosetDetailsById,APISandalsDetailsById,
        APIPillowsDetailsById,APIMirrorsDetailsById,APIBedSidesDetailsById,APIMattressDetailsById,
        APICussionsDetailsById,APIShoeRackDetailsById,APIBedCoversDetailsById,APIBedSheetsDetailsById,
        APINightWareDetailsById,APIBlanketsDetailsById,APIMattressProtectorsDetailsById,
        
    } from './DataFileApis';


import { formatData,numColumns,openWhatsAppLink,noInternetConnectionView,
        addItemsToCart,formatNumberWithComma,checkInternetConnection,
        renderItemDetailsViewUi, 
        } from './Functions';

export default class Search extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        
            NumberOfItems:'',

            SearchResults:[],
            BabiesNamesList:[],
            LivingRoomNamesList:[],
            BathRoomNamesList:[],
            BedRoomNamesList:[],
            ProductsNameSelected:'',
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
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}
componentDidMount() {this.numberOfCartItems();}

componentWillUnmount(){clearInterval(this.numberOfCartItems)}
numberOfCartItems = ()=>{ setInterval(this.getNumberOfItems,1000);}
refreshScreenNow = () =>{checkInternetConnection().then(Status=> {
    this.setState({IsDeviceConnected:Status})})}

getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};

setProductsNameSelectedValue = (text) => 
{
    this.setState({ProductsNameSelected:text})
    this.getProducts(text)
}

// getDetailsOptions = (id) =>
getDetailsOptions = (APICall,id) =>
{
    axios.get(APICall+id)
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
displayItemDetailsScreen = (index,id) =>
{

    let detailsName = this.state.ProductsNameSelected;
    if (detailsName == "Offers"){this.getDetailsOptions(APIOffersDetailsById,id);}
    else if(detailsName == "Babies"){this.getDetailsOptions(APIBabiesDetailsById,id);}
    else if(detailsName == "Seats"){this.getDetailsOptions(APISeatsDetailsById,id);}
    else if(detailsName == "Carpets"){this.getDetailsOptions(APICarpetsDetailsById,id);}
    else if(detailsName == "Curtains"){this.getDetailsOptions(APICurtainsDetailsById,id);}
    else if(detailsName == "SideBoards"){this.getDetailsOptions(APISideBoardsDetailsById,id);}
    else if(detailsName == "IroningBoard"){this.getDetailsOptions(APIIroningBoardDetailsById,id);}
    else if(detailsName == "Towels"){this.getDetailsOptions(APITowelsDetailsById,id);}
    else if(detailsName == "BathRobs"){this.getDetailsOptions(APIBathRobsDetailsById,id);}
    else if(detailsName == "DoorMats"){this.getDetailsOptions(APIDoorMatsDetailsById,id);}
    else if(detailsName == "BathroomCurtain"){this.getDetailsOptions(APIBathroomCurtainsDetailsById,id);}
    else if(detailsName == "Beds"){this.getDetailsOptions(APIBedsDetailsById,id);}
    else if(detailsName == "Nets"){this.getDetailsOptions(APINetsDetailsById,id);}
    else if(detailsName == "Closet"){this.getDetailsOptions(APIClosetDetailsById,id);}
    else if(detailsName == "Sandals"){this.getDetailsOptions(APISandalsDetailsById,id);}
    else if(detailsName == "Pillows"){this.getDetailsOptions(APIPillowsDetailsById,id);}
    else if(detailsName == "Mirrors"){this.getDetailsOptions(APIMirrorsDetailsById,id);}
    else if(detailsName == "BedSides"){this.getDetailsOptions(APIBedSidesDetailsById,id);}
    else if(detailsName == "Mattress"){this.getDetailsOptions(APIMattressDetailsById,id);}
    else if(detailsName == "Cussions"){this.getDetailsOptions(APICussionsDetailsById,id);}
    else if(detailsName == "Blankets"){this.getDetailsOptions(APIBlanketsDetailsById,id);}
    else if(detailsName == "ShoeRack"){this.getDetailsOptions(APIShoeRackDetailsById,id);}
    else if(detailsName == "BedCovers"){this.getDetailsOptions(APIBedCoversDetailsById,id);}
    else if(detailsName == "BedSheets"){this.getDetailsOptions(APIBedSheetsDetailsById,id);}
    else if(detailsName == "NightWare"){this.getDetailsOptions(APINightWareDetailsById,id);}
    else if(detailsName == "MattressProtectors"){this.getDetailsOptions(APIMattressProtectorsDetailsById,id);}
    this.setState({ItemIndex:index})
    setTimeout(this.showItemDetailsScreen,1000)

}
showItemDetailsScreen = () =>
{
    this.setState({DoNotShowDisplayScreen: true})
    this.setState({DoNotShowItemDetailsScreen: false})
}
showItemDisplayScreen = () =>
{
    this.setState({DoNotShowItemDetailsScreen: true})
    this.setState({DoNotShowDisplayScreen: false})
}
getProducts = (searchName) =>
{
    this.setState({SearchResults:[]})
    axios.get(APISearchName+searchName)
    .then(res => {
        let results =JSON.stringify(res.data); 
        if (results.length  ===2){Alert.alert('Massage','No Search Results Found')}
        else {this.setState({SearchResults:[...JSON.parse(results)]})}
        })
    .catch(err=>{Alert.alert("Error","\n\n Can Not Load Products");})
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
                <Text numberOfLines={1} style={styles.productText}> {item.Name}</Text>
                <Text numberOfLines={1} style={styles.productText}> {item.ShortText}</Text>
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
                    <TouchableOpacity style={styles.homeOrdersBtn} onPress={()=>addItemsToCart(index,this.state.SearchResults)} >
                        <Text style = { styles.homeOrdersTxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}


render() {
    
    const {IsDeviceConnected,ProductsNameSelected,SearchResults, NumberOfItems,ItemIndex,DetailsName,DetailsShortText,DetailsAmount,DetailsLongText} = this.state;
    const {DoNotShowDisplayScreen,DoNotShowItemDetailsScreen,ItemDetails} = this.state

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
                    <Text style = { styles.productTopTitleName}> Search For Items </Text>
                </View>

                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        {IsDeviceConnected ?(<>

            <View style={styles.searchBar}>
                <View style={styles.searchBarLeftView} >
                <View style={styles.searchPickerSelectionInputView}>
                    <Picker style={styles.searchPickerSelectionInputs} dropdownIconColor= {COLORS.white}
                        selectedValue={ProductsNameSelected}
                        onValueChange={(itemValue) =>this.setProductsNameSelectedValue(itemValue)}>
                            <Picker.Item  label="Looking For ..."/> 
                            <Picker.Item  label="OTHERS ITEMS LIST"/> 
                            <Picker.Item  label="Offers" value="Offers" /> 
                            <Picker.Item label="Babies" value="Babies" /> 


                            <Picker.Item  label="LIVING ROOM ITEMS LIST"/> 
                            <Picker.Item label="Seats" value="Seats"/> 
                            <Picker.Item label="Carpets" value="Carpets"/> 
                            <Picker.Item label="Curtains" value="Curtains"/> 
                            <Picker.Item label="SideBoards" value="SideBoards"/> 
                            <Picker.Item label="IroningBoard" value="IroningBoard"/> 

                            <Picker.Item  label="BATH ROOM ITEMS LIST"/> 
                            <Picker.Item label="Towels" value="Towels"/>
                            <Picker.Item label="BathRobs" value="BathRobs"/>
                            <Picker.Item label="DoorMats" value="DoorMats"/>
                            <Picker.Item label="BathroomCurtain" value="BathroomCurtain"/>
                            

                            <Picker.Item  label="BED ROOM ITEMS LIST"/> 
                            <Picker.Item label="Beds" value="Beds"/>
                            <Picker.Item label="Nets" value="Nets"/>
                            <Picker.Item label="Closet" value="Closet"/>
                            <Picker.Item label="Sandals" value="Sandals"/>
                            <Picker.Item label="Pillows" value="Pillows"/>
                            <Picker.Item label="Mirrors" value="Mirrors"/>
                            <Picker.Item label="BedSides" value="BedSides"/>
                            <Picker.Item label="Mattress" value="Mattress"/>
                            <Picker.Item label="Cussions" value="Cussions"/>
                            <Picker.Item label="Blankets" value="Blankets"/>
                            <Picker.Item label="ShoeRack" value="ShoeRack"/>
                            <Picker.Item label="BedCovers" value="BedCovers"/>
                            <Picker.Item label="BedSheets" value="BedSheets"/>
                            <Picker.Item label="NightWare" value="NightWare"/>
                            <Picker.Item label="MattressProtectors" value="MattressProtectors"/>
                    </Picker>
                </View>
                </View>

            </View>

            

            {DoNotShowDisplayScreen ?<></> : (<>
                <FlatList
                data={ formatData(SearchResults,numColumns)}
                renderItem={this.renderItemsUI} numColumns={numColumns} />
                </>
            )}

            {DoNotShowItemDetailsScreen ? <></>:(<>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.SearchResults)}

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


// https://www.npmjs.com/package/react-native-autocomplete-dropdown
// https://www.npmjs.com/package/react-native-input-autocomplete