
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import {APIgetOffersList, imageurl} from './DataFileApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native-web';


export default class Offers extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        cartItems: [],
    }
    
}

componentDidMount() {
    axios.get(APIgetOffersList)
    .then(res => {
        let results =JSON.stringify(res.data); 
        console.log("=====>"+results)
        this.setState({cartItems:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err)})
}

addtocart = (index) => 
{
    const newItems = [...this.state.cartItems]; // clone the array

    let product = newItems[index];
    let id = index;
    let name = product.name_type;
    let status = product.status;
    let amount = product.amount;
    let image = product.image;
    let qty = 1;
    let itemcart={ id: id, name: name, status: status, amount: amount, qty:qty,image:image}
    

    console.log("product details===>"+ JSON.stringify(itemcart));

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
                alert("Item Added To Cart")
            }
        })
        .catch((err)=>{alert(err)})
        // store intia1 Oder List with cartItems
        // AsyncStorage.setItem('orderList',JSON.stringify(this.cartItems));

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


render() {
    
    const { cartItems, cartItemsIsLoading} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={styles.mainViewTopSpace} ></View>
            <View style={styles.topNavigationHeader}>
                <View style={styles.topNavigationHeaderArrowView} >
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} style={styles.topNavigationHeaderArrow} />
                    </TouchableOpacity>
                </View>
                <View style={styles.topNavigationHeaderTextView}>
                    <Text style={styles.topNavigationHeaderText}>Offers</Text>
                </View>
            </View>
            {cartItemsIsLoading ? (
                <View style={[styles.centerElement, {height: 300}]}>
                    <ActivityIndicator size="large" color="#ef5739" />
                </View>
            ) : (
                <ScrollView>
                    {cartItems && cartItems.map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity>
                                    <Image source={{uri: imageurl+item.image}} style={styles.productImage} />
                                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.productImage} /> */}

                                </TouchableOpacity>
							</View>

                                <View style={styles.offersLableLeftView}>
                                    <Text numberOfLines={1} style={styles.offersLables}>{item.name_type}</Text>
                                    <Text numberOfLines={1} style={styles.offersLables}>{item.status}</Text>
                                    <Text numberOfLines={1} style={styles.offersLables}>Ugx: {item.amount.toLocaleString()}</Text>
                                </View>
                        </View>
						<View style={styles.offersbtnsView}>
							<TouchableOpacity style={styles.offersschedulebtn} onPress={()=>this.addtocart(i)}  >
								<Text style = {styles.btnText} >SCHEDULE</Text>
							</TouchableOpacity>


							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(i)} >
								<Text style = {styles.btnText}> Order Now </Text>
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
            )}

            
        </View>
    );
}
}
