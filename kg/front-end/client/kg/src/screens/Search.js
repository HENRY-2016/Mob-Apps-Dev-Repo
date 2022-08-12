
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, FlatList, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from './Colours';

// APIs
import {
    mageurl,APISearchName,
    APIBabiesNames,APIBathRoomNames,
    APIBedRoomNames,APILivingRoomNames,
    } from './DataFileApis';

import { formatData,numColums,
    addItemsToCart,formatNumberWithComma
    } from './Functions';


export default class Search extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        
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

            ItemDetails:[
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-1.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-2.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-3.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-4.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-5.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-6.png?raw=true",
            ],
            ItemIndex:'',
    }



    
}
componentDidMount() {
    axios.get(APIBabiesNames)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BabiesNamesList:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APILivingRoomNames)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({LivingRoomNamesList:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIBathRoomNames)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomNamesList:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APIBedRoomNames)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BedRoomNamesList:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","Can Not Load Data")})

    setInterval(this.getNumberOfItems,1000);
}

getNumberOfItems = () => 
{
    // console.log("geting data")
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        // console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};


setProductsNameSelectedValue = (text) => {this.setState({ProductsNameSelected:text})}

displayItemDetailsScreen = (index) =>
{
    console.log(index);
    this.setState({ItemIndex:index})
    setTimeout(this.showItemDetailsScreen,1000)

}
showItemDisplayScreen = () =>
{
    this.setState({DoNotShowItemDetailsScreen: true})
    this.setState({DoNotShowDisplayScreen: false})
}
getProducts = () =>
{
    let searchName = this.state.ProductsNameSelected;
    console.log(searchName);

    axios.get(APISearchName+searchName)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SearchResults:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n Can Not Load Products");})
}

renderItem = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.productImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.cartItems)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

render() {
    
    const {ProductsNameSelected,SearchResults, NumberOfItems,ItemIndex} = this.state;
    const{BabiesNamesList,LivingRoomNamesList,BathRoomNamesList,BedRoomNamesList} = this.state;
    const {DoNotShowDisplayScreen,DoNotShowItemDetailsScreen} = this.state

    return (
        
        <View style={styles.mainView}>
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

            <View style={{height:10}} ></View>

            <View style={styles.searchBar}>
                <View style={styles.searchBarLeftView} >
                <View style={styles.searchPickerSelectionInputView}>
                    <Picker style={styles.searchPickerSelectioninputs} dropdownIconColor= {COLORS.black}
                        selectedValue={ProductsNameSelected}
                        
                        onValueChange={(itemValue) =>this.setProductsNameSelectedValue(itemValue)}>
                            <Picker.Item label="Babies Items"/> 
                            {BabiesNamesList && BabiesNamesList.map((iteam,Index ) => (
                            <Picker.Item label={iteam.Name} value={iteam.Name} /> 
                            ))}
                            <Picker.Item label="Living Room Items"/> 
                            {LivingRoomNamesList && LivingRoomNamesList.map((iteam,Index ) => (
                            <Picker.Item label={iteam.Name} value={iteam.Name} /> 
                            ))}
                            <Picker.Item label="Bath Room Items"/> 
                            {BathRoomNamesList && BathRoomNamesList.map((iteam,Index ) => (
                            <Picker.Item label={iteam.Name} value={iteam.Name} /> 
                            ))}
                            <Picker.Item label="Bed Room Items"/> 
                            {BedRoomNamesList && BedRoomNamesList.map((iteam,Index ) => (
                            <Picker.Item label={iteam.Name} value={iteam.Name} /> 
                            ))}
                    </Picker>
                </View>
                </View>

                <View>
                <View >
                        <TouchableOpacity onPress={this.getProducts} style={styles.searchBtn} >
                            <FontAwesome name="search" size={26} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            

            {DoNotShowDisplayScreen ?<></> : (<>
                    <View style={{ height:15}}></View>
                    <FlatList
                    data={ formatData(SearchResults,numColums)}
                    renderItem={this.renderItem}
                    numColumns={numColums}
                    />
                </>
            )}

            {DoNotShowItemDetailsScreen ? <></>:(<>
                <ScrollView>
                <View style={{height:20}}></View>
                    <View style={styles.ImageSliderView}>
                        <View style={{height:20}}></View>
                        <SliderBox style={styles.ImageSliderView}
                            images={ItemDetails} sliderBoxHeight={200}
                            dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                            paginationBoxVerticalPadding={10}
                            autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                            paginationBoxStyle={styles.ImagePaginationBoxStyle}
                            dotStyle={styles.ImageSliderDotStyle}
                            ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                            imageLoadingColor={COLORS.colourNumberOne}
                            /> 
                    </View> 
                <View  style={styles.MainTextDetailsView}>
                    <View style={styles.TextDetailsView}>
                        <Text  style={styles.offersLables}> Name</Text>
                        <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                        <Text  style={styles.offersLables}>Amount</Text>
                    </View>
                </View>

                <View style={styles.offersbtnsView}>
                    <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                        <Text style = {styles.btnText} >Display</Text>
                    </TouchableOpacity>
                    <View style={{width:25}} ></View>

                    <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.cartItems)} >
                        <Text style = {styles.btnText}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:20}}></View>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity style={styles.offersProcedbtn} >
                        <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:20}}></View>
                </ScrollView>
            </>)}

            
        </View>
    );
}
}


// https://www.npmjs.com/package/react-native-autocomplete-dropdown
// https://www.npmjs.com/package/react-native-input-autocomplete