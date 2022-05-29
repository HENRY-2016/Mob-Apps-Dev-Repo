
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {Octicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {homeproductsapi, imgurl} from './DataFileApis';
import { FlatList } from 'react-native-gesture-handler';

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
            cartItems1:[],
            cartItems: [
                /* Sample data from walmart */
                {itemId: "501436323", name_type: "Gas 1", thumbnailImage: "https://i5.walmartimages.com/asr/a3922e8e-2128-4603-ba8c-b58d1333253b_1.44d66337098c1db8fed9abe2ff4b57ce.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", status: "Refill", qty: 1, amount: "10000", checked: 1},
                {itemId: "35031861", name_type: "Gas 2", thumbnailImage: "https://i5.walmartimages.com/asr/4aedb609-4b61-4593-ad8a-cdc8c88696b1_1.3f505ce3d55db4745cf4c51d559994dc.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "20000", checked: 1},
                {itemId: "801099131", name_type: "Gas 3", thumbnailImage: "https://i5.walmartimages.com/asr/9a8ea1ab-311d-455c-bda8-ce15692a8185_3.208d48e0260f80891d32b351cb116a4b.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "30000", checked: 1},
                {itemId: "42608079", name_type: "Gas 4", thumbnailImage: "https://i5.walmartimages.com/asr/2654cd64-1471-44af-8b0c-1debaf598cb3_1.c30c481d1ac8fdd6aa041c0690d7214c.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", status: "Refill", qty: 1, amount: "40000", checked: 1},
                {itemId: "247714372", name_type: "Gas 5", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "50000", checked: 1},
                {itemId: "247714372", name_type: "Gas 51", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "50000", checked: 1},
                {itemId: "247714372", name_type: "Gas 52", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "50000", checked: 1},
                {itemId: "247714372", name_type: "Gas 53", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "50000", checked: 1},
                {itemId: "247714372", name_type: "Gas 54", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "50000", checked: 1},
                {itemId: "247714372", name_type: "Gas 55", thumbnailImage: "https://i5.walmartimages.com/asr/b442f6e7-c5e1-4387-9cd9-9205811d4980_1.82b94d1c11dd12a6697bc517219f331e.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF", qty: 1, status: "Refill", amount: "50000", checked: 1},
                
            ]
    }
    
}
componentDidMount() {
    axios.get(homeproductsapi)
    .then(res => {
        let results =JSON.stringify(res.data); 
        // console.log("=====>"+results)
        this.setState({cartItems1:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{console.log(err);})
    // console.log("component loaded")
}

addtocart = (index) => 
{
    const newItems = [...this.state.cartItems]; // clone the array

    let product = newItems[index];
    let imageurl = JSON.stringify(product.thumbnailImage);
    console.log("image ===================>>>>>"+imageurl);
    let id = index;
    let name = product.name_type;
    let status = product.status;
    let amount = product.amount;
    let image = JSON.stringify(product.thumbnailImage);
    let qty = 1;
    let itemcart={ id: id, name: name, status: status, amount: amount, qty:qty,image:image}
    

    console.log("product details===>"+itemcart);

    console.log("storing=======");
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
}

formatNumberWithComma(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
renderItem = ({item, index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity>
                    {/* <Image source={{uri: imgurl+item.image}} style={[styles.centerElement, {height: 80, width: 80, backgroundColor: '#eeeeee'}]} /> */}
                    <Image source={{uri: item.thumbnailImage}} style={styles.homeProductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}>{item.name_type}</Text>
                    <Text numberOfLines={1} style={styles.producttext}>{item.status}</Text>
                    <Text numberOfLines={1} style={styles.producttext}>Ugx: {this.formatNumberWithComma(item.amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={styles.centerElement, styles.homeOrderBtn}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addtocart(index)} >
                            <Text style = { styles.homeorderstxt}> Order </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }


render() {
    const { cartItems, cartItemsIsLoading} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.homeNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity >
                        <Octicons name="bell" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>

                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Kulakulagas</Text>
                </View>                
            </View>

                


            {cartItemsIsLoading ? (
                <View style={[styles.centerElement, {height: 300}]}>
                    <ActivityIndicator size="large" color="#ef5739" />
                </View>
            ) : (
                <ScrollView>
                    <View style={styles.homeNavigationView}>
                        <View style={styles.homeImageSlider}>
                            <Text style={styles.homeNavigationHeaderTexts}>Refill Gas</Text>
                        </View>
                        <View style={styles.homeNavigationButtonMainView}>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>Refill Gas</Text>
                            </View>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>New Kit</Text>
                            </View>
                        </View>
                        <View style={styles.homeNavigationButtonMainView2}>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>Accessories</Text>
                            </View>
                            <View style={styles.homeNavigationBtns}>
                            <Text style={styles.homeNavigationHeaderTexts}>Food $ More</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.homespaceView}></View>
                    <FlatList
                        data={ formatData(cartItems,numColums)}
                        renderItem={this.renderItem}
                        numColumns={numColums}
                    />
                </ScrollView>
            )}

            
        </View>
    );
}
}
