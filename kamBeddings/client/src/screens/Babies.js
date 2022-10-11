
import React from 'react';
import { Text,Image, Modal,View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from './Colours';

// APIs
import {
    APIBabies, imageurl,
    // APIBathRoomTowelsProducts,
    // APIBathRoomDoorMatsProducts,
    // APIBathRoomCurtainsProducts
    } from './DataFileApis';


export default class Babies extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            modalVisible: false,
            ImageName:'',
            cartItems:[],
            NumberOfItems:'',

            // screens
            showBabiesScreen:false, // do not display empty view
    
            // Products 
            BabiesProducts:[],
    }



    
}
componentDidMount() {
    axios.get(APIBabies)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BabiesProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("1 ==>"+results)
        })
    .catch(err=>{Alert.alert("NetWork Error","\n\nCan Not Load Products \n\n Open The App With Internet");})



    setInterval(this.getNumberOfItems,1000);
}

getNumberOfItems = () => 
{
    // console.log("geting data")
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Adding to Cart 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

addToCartBathRobsProducts = (index) => 
{
    const newItems = [...this.state.BabiesProducts]; // clone the array

    let product = newItems[index];
    let id = index;
    let name = product.Name;
    let status = product.Description;
    let amount = product.Amount;
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

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showImage = (Name) =>{this.setState({ImageName:Name});this.setModalVisible(true)}

render() {
    
    const {NumberOfItems,showBabiesScreen,ImageName,modalVisible,BabiesProducts} = this.state;
    return (
        
        <View style={styles.mainView}>
        <View style={styles.mainViewTopSpace} ></View>
        <View style={styles.topNavigationHeader}>
            <View style={styles.openDrawerMenuView} >
                <View style={styles.mainMenuView}>
                    <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                        <FontAwesome name="navicon" size={33} color="black" style={styles.opeMenuIcone} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style = { styles.productTopTitleNameView}>
                <Text style = { styles.productTopTitleName}> Babies </Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
            {/* showBabiesScreen */}
            {showBabiesScreen ? <></> : 
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Babies </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>
                    
                        {BabiesProducts && BabiesProducts.map((item, index) => (
                            <>
                            <View key={index} >
                            <View  style={styles.offersMainContainerView}>

                                <View style={styles.offersimageRightView}>
                                    <TouchableOpacity onPress={() => this.showImage (item.image)} >
                                        <Image source={{uri: imageurl+item.image}} style={styles.productImage} />
                                    </TouchableOpacity>
                                </View>

                                    <View style={styles.offersLableLeftView}>
                                        <Text numberOfLines={1} style={styles.offersLables}> {item.Name}</Text>
                                        <Text numberOfLines={1} style={styles.offersLables}> {item.Description}</Text>
                                        <Text numberOfLines={1} style={styles.offersLables}> {this.formatNumberWithComma(item.Amount)}</Text>
                                    </View>
                            </View>
                            <View style={styles.offersbtnsView}>
                                <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBathRobsProducts(index)} >
                                    <Text style = {styles.btnText}> Add to cart </Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </>
                        ))}
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView>  
                </>
                )
            }

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                        <Image source={{uri: imageurl+ImageName}} style={styles.popUpImage} />

                            <View style={{height:15}}></View>
                            <View style={styles.modalCloseBtnView}>
                            <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
                                <Text style={styles.modalCloseTextLabels}>Close</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    );
}
}
