
import React from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView, Image} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import { COLORS } from './Colours';
import { SliderBox } from "react-native-image-slider-box";
import {APIlistAllOffersProducts, imageurl} from './DataFileApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addItemsToCart,formatNumberWithComma} from './Functions';


export default class Offers extends React.Component {
constructor(props){
    super(props);
    this.state = {

        cartItems: [],
        NumberOfItems:'',

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
    axios.get(APIlistAllOffersProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({cartItems:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err)})

setInterval(this.getNumberOfItems,1000);

}
showItemDisplayScreen = () =>
{
    console.log("called.....")
    this.setState({DoNotShowItemDetailsScreen: true})
    this.setState({DoNotShowDisplayScreen: false})
}
showItemDetailsScreen = () =>
{
    this.setState({DoNotShowDisplayScreen: true})
    this.setState({DoNotShowItemDetailsScreen: false})
}

displayItemDetailsScreen = (index) =>
{
    this.setState({ItemIndex:index})
    setTimeout(this.showItemDetailsScreen,2000)
}
getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        // console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};


render() {
    
    const { ItemDetails,ItemIndex,DoNotShowItemDetailsScreen} = this.state;
    const { cartItems,NumberOfItems,DoNotShowDisplayScreen,} = this.state;


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
                    <Text style = { styles.productTopTitleName}> Offers </Text>
                </View>
                <View style={styles.mainCartView}>
                    <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {DoNotShowDisplayScreen ?<></>: (
                <>
                <ScrollView>
                    {cartItems && cartItems.map((item, index) => (
						<>
						<View key={item.id} style={styles.offersMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(i)}>
                                    <Image source={{uri: imageurl+item.image}} style={styles.productImage} />
                                </TouchableOpacity>
							</View>

                                <View style={styles.offersLableLeftView}>
                                    <Text numberOfLines={1} style={styles.offersLables}> {item.Name}</Text>
                                    <Text numberOfLines={1} style={styles.offersLables}> {item.Description}</Text>
                                    <Text numberOfLines={1} style={styles.offersLables}> {formatNumberWithComma(item.Amount)}</Text>
                                </View>
                        </View>
						<View style={styles.offersbtnsView}>
							<TouchableOpacity style={styles.offersschedulebtn}   >
								<Text style = {styles.btnText} >{item.PalaceHolderOne}</Text>
							</TouchableOpacity>

							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(index,this.state.cartItems)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
						</View>
						</>
                    ))}

                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </>)}

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
