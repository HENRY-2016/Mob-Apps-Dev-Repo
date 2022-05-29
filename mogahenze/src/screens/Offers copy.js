
import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from "./stylesheet";
import axios from "axios";
import {APIgetOffersList, imageurl} from './DataFileApis';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Offers extends React.Component {
constructor(props){
    super(props);
    this.state = {
        cartItemsIsLoading: false,
        cartItems: [],
        cartItems1: [
            /* Sample data from walmart */
            {id: "5014323", name_type: "Gas 1", thumbnailImage: "https://www.shell.co.ug/motorists/shell-gas/_jcr_content/par/textimage_776758481/image.img.960.jpeg/1600844912244/shell-gas-6kg.jpeg?imwidth=960", status: "Refill", qty: 1, amount: "10000", checked: 1},
            {id: "351861", name_type: "Gas 2", thumbnailImage: "https://media.dantty.com/imgs/A_new/uploads/stabex-gas-2479.jpg", qty: 1, status: "Refill", amount: "20000", checked: 1},

            {id: "809131", name_type: "Gas 3", thumbnailImage: "https://media.istockphoto.com/photos/red-gas-cylinder-isolated-picture-id1061572518?k=20&m=1061572518&s=170667a&w=0&h=-WE_dCi8almvzHU4efepnxQ609qjMmyneVD7vAiT2Mo=", qty: 1, status: "Refill", amount: "30000", checked: 1},
            {id: "214372", name_type: "Gas 2", thumbnailImage: "https://media.dantty.com/imgs/A_new/uploads/stabex-gas-2479.jpg", qty: 1, status: "Refill", amount: "60000", checked: 1},
            {id: "408079", name_type: "Gas 4", thumbnailImage: "https://pictures-uganda.jijistatic.com/6086040_NzEyLTg5MC04NTFjYjRmY2Fl.jpg", status: "Refill", qty: 1, amount: "60000", checked: 1},
            {id: "2414372", name_type: "Gas 5", thumbnailImage: "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/D/D/154148_1557929765.jpg", qty: 1, status: "Refill", amount: "50000", checked: 1},
            {id: "536323", name_type: "Gas 6", thumbnailImage: "https://res.cloudinary.com/outdoor-warehouse/image/upload/c_fill,f_auto,q_auto:good/v1575961299/uploads/assets/EECO211-new-bDB.jpg", status: "Refill", qty: 1, amount: "10000", checked: 1},
            {id: "351861", name_type: "Gas 7", thumbnailImage: "https://yakhasquare.store/wp-content/uploads/2021/05/IMG_3596-scaled.jpg", qty: 1, status: "Refill", amount: "20000", checked: 1},
            {id: "899131", name_type: "Gas 8", thumbnailImage: "https://media.loot.co.za/images/x400/8296758700027179215.jpg", qty: 1, status: "Refill", amount: "30000", checked: 1},
            {id: "428079", name_type: "Gas 9", thumbnailImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYxYSXaPhafs17SuSDI-FYHynO4wX5VBbGw&usqp=CAU", status: "Refill", qty: 1, amount: "70000", checked: 1},
            {id: "244372", name_type: "Gas 10", thumbnailImage: "https://media.dantty.com/imgs/A_new/uploads/stabex-gas-2479.jpg", qty: 1, status: "Refill", amount: "60000", checked: 1}
            
            
        ]
    }
    
}

componentDidMount() {
    console.log("=====>"+APIgetOffersList)
    axios.get(APIgetOffersList)
    .then(res => {
        let results =JSON.stringify(res.data); 
        console.log("=====>"+results)
        this.setState({cartItems:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{console.log(err);})
    // console.log("component loaded")
}

addtocart = (index) => 
{
    const newItems = [...this.state.cartItems]; // clone the array

    let product = newItems[index];
    // let image = JSON.stringify(product.thumbnailImage);
    let id = index;
    let name = product.name_type;
    let status = product.status;
    let amount = product.amount;
    // let image = '"'+image+'"';
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
