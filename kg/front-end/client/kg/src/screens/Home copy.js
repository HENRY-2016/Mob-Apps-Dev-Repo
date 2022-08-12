
import React from 'react';
import { Text, View,Image, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {Ionicons,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import { COLORS } from './Colours';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APIHomeProducts,APISlider, imageurl} from './DataFileApis';
import { FlatList } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";

const numColums = 2;
const formatData = (data,numColums) =>
{
    const numberOfFullRows = Math.floor(data.length / numColums);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColums);
    while (numberOfElementsLastRow !== numColums && numberOfElementsLastRow !==0)
    {
        data.push({key:`blank-${numberOfElementsLastRow}`,empty:true});
        numberOfElementsLastRow = numberOfElementsLastRow +1;
    }
    return data;
}




export default class Home extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        
            modalVisible: false,
            cartItems:[],
            images:[],
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
componentDidMount() 
{
    // console.log("API=======>"+ APIHomeProducts)
    axios.get(APIHomeProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({cartItems:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    // slider images
    axios.get(APISlider)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonresults =JSON.parse(results); 
        let imageSiliders = [];
        for (i=0; i<jsonresults.length; i++)
            {
                
                let  image = imageurl+jsonresults[i].image;
                imageSiliders.push(image)
            }
        this.setState({images:[...imageSiliders]})
        // console.log(this.state);
        })
    .catch(err=>{Alert.alert("Error","\n\n Can Not Load Products\n\n Open App Again With \n\n Network Connection");})
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\n Can Not Load Products\n\n Open App Again With \n\n Network Connection");})


    setInterval(this.getNumberOfItems,1000);
}

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}

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
displayItemDetailsScreen = (index) =>
{
    console.log(index);
    this.setState({ItemIndex:index})

    setTimeout(this.showItemDetailsScreen,2000)

}
getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};
addtocart = (index) => 
{
    const newItems = [...this.state.cartItems]; // clone the array

    let product = newItems[index];
    let id = index;
    let name = product.Name;
    let status = product.Description;
    let amount = product.Amount;
    // let image = JSON.stringify(product.thumbnailImage);
    let image = product.image;
    let qty = 1;
    let itemcart={ id: id, name: name, status: status, amount: amount, qty:qty,image:image}
    // console.log("====="+JSON.stringify(itemcart))

    AsyncStorage.getItem('cartItems').then((datacart)=>{
            if (datacart !== null) 
            {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                alert("Item Added To Cart")
            }
            else{
                const cart  = []
                cart.push(itemcart)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                alert("Item Added To Cart");
            }
        })
        .catch((err)=>{alert(err)})

        // NumberOfItems
        AsyncStorage.getItem('NumberOfItems').then((number)=>{
            if (number !== null) 
            {
                // We have data!!
                const value = JSON.parse(number)
                let newnumber = parseInt(value) + 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
            }
            else{
                let newnumber = 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
            }
        })
        .catch((err)=>{alert(err)})
}

formatNumberWithComma(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
renderItem = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {this.formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addtocart(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }


render() {
    
    const {cartItems,NumberOfItems,ItemIndex} = this.state;
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
                        <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                        <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            {DoNotShowDisplayScreen ?<></> : (
                <>
                <ScrollView>
                    <View style={styles.mainViewTopSpace} ></View>
                    <View style={styles.homeNavigationView}>

                        <View style={styles.ImageSliderView}>
                            <View style={{height:20}}></View>
                            <SliderBox style={styles.ImageSliderView}
                                images={this.state.images}
                                sliderBoxHeight={200}
                                dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                paginationBoxVerticalPadding={10}
                                autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                dotStyle={styles.ImageSliderDotStyle}
                                ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                imageLoadingColor={COLORS.colourNumberOne}
                                /> 
                        </View> 
                        
                    </View>
                    {/* <View style={styles.homespaceView}></View> */}
                    <FlatList
                    data={ formatData(cartItems,numColums)}
                    renderItem={this.renderItem}
                    numColumns={numColums}
                    />
                    <View style={styles.blankSpaceView}></View>
                </ScrollView>
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

                    <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
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
