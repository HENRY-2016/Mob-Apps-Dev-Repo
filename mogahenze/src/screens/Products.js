
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {Octicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {APIgetProductsList, imageurl} from './DataFileApis';
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




export default class Products extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            cartItems:[],
            images : [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdE9SoxwQPMAzmdfSAULdA-KrUmUQA2pkUA&usqp=CAU",
                "https://www.vivoenergy.com/portals/1/Images/LPG_22032018.jpg?ver=2018-03-22-140858-887",
                "https://pbs.twimg.com/media/DHLDTMhXoAEMo4H.jpg",
                "https://pbs.twimg.com/tweet_video_thumb/E7zBA2TWEAA19Kc.jpg",
                //require('./assets/images/girl.jpg'),          // Local image
                ]
    }
    
}
componentDidMount() {
    axios.get(APIgetProductsList)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({cartItems:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err);})
}

addtocart = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.cartItems]; // clone the array

    let product = newItems[index];
    let id = index;
    let name = product.name_type;
    let status = product.status;
    let amount = product.amount;
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
                console.log("== New ===",newnumber)
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
                console.log("number Added")
            }
            else{
                let newnumber = 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
                console.log("Initial Num Added To Cart")
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
                <TouchableOpacity>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.homeproductImage} /> */}
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}>{item.name_type}</Text>
                    <Text numberOfLines={1} style={styles.producttext}>{item.status}</Text>
                    <Text numberOfLines={1} style={styles.producttext}>Ugx: {this.formatNumberWithComma(item.amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addtocart(index)} >
                            <Text style = { styles.homeorderstxt}> Order </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

// test = () =>{salert("Working well...")}
render() {
    
    const { cartItems, cartItemsIsLoading} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.homeNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity >
                        <Octicons name="bell" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>

                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Kulakulagas</Text>
                    {/* <Text style={styles.topNavigationHeaderText}>moga</Text> */}

                </View>                
            </View>

                


            {cartItemsIsLoading ? (
                <View style={[styles.centerElement, {height: 300}]}>
                    <ActivityIndicator size="large" color="#ef5739" />
                </View>
            ) : (
                <>
                <ScrollView>
                    <View style={styles.homeNavigationView}>
                    
                        <View style={styles.homeImageSlider}>
                            <SliderBox style={styles.homeImageSlider}
                                images={this.state.images}
                                sliderBoxHeight={200}
                                dotColor="#7a42f4" inactiveDotColor="#90A4AE"
                                paginationBoxVerticalPadding={20}
                                autoplay circleLoop
                                resizeMethod={'resize'} resizeMode={'cover'}
                                paginationBoxStyle={{
                                    position: "absolute",
                                    bottom: 0,
                                    padding: 0,
                                    alignItems: "center",
                                    alignSelf: "center",
                                    justifyContent: "center",
                                }}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 5,
                                    marginHorizontal: 0,
                                    padding: 0,
                                    margin: 0,
                                    backgroundColor: "rgba(128, 128, 128, 0.92)"
                                }}
                                ImageComponentStyle={{borderRadius: 15, width: 400, marginLeft:0, marginTop: 5}}
                                imageLoadingColor="#2196F3"
                                /> 
                        </View>
                        <View style={styles.homeNavigationButtonMainView}>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>Refill Gas</Text>
                            </View>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>New Kit</Text>
                            </View>
                        </View>
                        {/* <View style={styles.homeNavigationButtonMainView2}>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>Accessories</Text>
                            </View>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>Food $ More</Text>
                            </View>
                        </View> */}
                    </View>
                    {/* <View style={styles.homespaceView}></View> */}
                    <FlatList
                    data={ formatData(cartItems,numColums)}
                    renderItem={this.renderItem}
                    numColumns={numColums}
                    />
                </ScrollView>
                
                </>
            )}

            
        </View>
    );
}
}
