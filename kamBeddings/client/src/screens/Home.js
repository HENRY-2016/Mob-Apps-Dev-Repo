
import React from 'react';
import { Text, View,Image, TouchableOpacity,Modal,Alert, ScrollView} from 'react-native';

import {Ionicons,FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIHomeProducts,APISlider, imageurl} from './DataFileApis';

import { SliderBox } from "react-native-image-slider-box";



export default class Home extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            cartItemsIsLoading: false,
            modalVisible: false,
            ImageName:'',
            cartItems:[],
            images:[],
            NumberOfItems:'',
    }
    
}
componentDidMount() 
{
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
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

    setInterval(this.getNumberOfItems,1000);
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
setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showImage = (Name) =>{this.setState({ImageName:Name});this.setModalVisible(true)}


render() {
    
    const { cartItems,NumberOfItems,ImageName,modalVisible, cartItemsIsLoading} = this.state;

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
            
            {cartItemsIsLoading ? (<></>) : (
                <>
                
                    <View style={styles.mainViewTopSpace} ></View>
                    <View style={styles.homeNavigationView}>

                        <View style={styles.homeImageSlider}>
                            <View style={{height:20}}></View>
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
                                ImageComponentStyle={{borderRadius:50, width: 400, marginLeft:0, marginTop: 5}}
                                imageLoadingColor="#0530ad"
                                /> 
                        </View> 
                        
                    </View>
                    <ScrollView  showsVerticalScrollIndicator={false}>
                    {cartItemsIsLoading ? (<></>) : (
                    <>
                    {cartItems && cartItems.map((item, i) => (
						<>
                        <View key={i} >
						<View style={styles.offersMainContainerView}>

                            <View style={styles.offersimageRightView}>
                                <TouchableOpacity onPress={() => this.showImage (item.image)}>
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(i)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
						</View>
						</View>
					</>
                    ))}
                </>
            )}
                    <View style={styles.blankSpaceView}></View>
                </ScrollView>
                </>
            )}

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
