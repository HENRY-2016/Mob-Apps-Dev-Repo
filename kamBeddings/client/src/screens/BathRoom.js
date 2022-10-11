
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert,Modal, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from './Colours';

// APIs
import {
    APIBathRoomBathRobsProducts, imageurl,
    APIBathRoomTowelsProducts,
    APIBathRoomDoorMatsProducts,
    APIBathRoomCurtainsProducts
    } from './DataFileApis';


export default class BathRoom extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            modalVisible: false,
            ImageName:'',
            cartItems:[],
            NumberOfItems:'',

            // screens
            showRobsScreen:false, // do not display empty view
            showTowelsScreen:true, // display empty view
            showShowerCurtainsScreen:true, // display empty view
            showBlanketsScreen:true, // display empty view
            showDoorMatsScreen:true, // display empty view

            // Products 
            BathRoomBathRobsProducts:[],
            BathRoomTowelsProducts:[],
            RoomDoorMatsProducts:[],
            RoomBathroomCurtainsProducts:[],
    }
}

componentDidMount() {
    axios.get(APIBathRoomBathRobsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomBathRobsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("1 ==>"+results)
        })
    .catch(err=>{})


    axios.get(APIBathRoomTowelsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomTowelsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("2 ==>"+results)
        })
    .catch(err=>{})

    axios.get(APIBathRoomDoorMatsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomDoorMatsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("3 ==>"+results)
        })
    .catch(err=>{})

    axios.get(APIBathRoomCurtainsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomCurtainsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("4 ==>"+results)
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
        // console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};



// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Adding to Cart 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

addToCartBathRobsProducts = (index) => 
{
    const newItems = [...this.state.BathRoomBathRobsProducts]; // clone the array

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

addToCartTowelsProducts = (index) => 
{
    const newItems = [...this.state.BathRoomTowelsProducts]; // clone the array

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

addToCartDoorMatsProducts = (index) => 
{
    const newItems = [...this.state.BathRoomDoorMatsProducts]; // clone the array

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
addToCartCurtainsProducts = (index) => 
{
    const newItems = [...this.state.BathRoomCurtainsProducts]; // clone the array

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

viewRobsScreen = (props) => {
        return (
                <>
                    <View
                    style={{
                        height: props.size,width: props.size,
                        backgroundColor: props.color,
                    }}
                    >
                    <TouchableOpacity  onPress={() => {
                            this.setState({showTowelsScreen:true});
                            this.setState({showShowerCurtainsScreen:true});
                            this.setState({showBlanketsScreen:true});
                            this.setState({showDoorMatsScreen:true});
                            this.setState({showRobsScreen:false});
                        }}>

                    <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bathroom/bathrobes.png')}/> 
                    <Text  style={ styles.subMenuNaviLinksTextSmall}>Robs</Text>
                </TouchableOpacity>
                </View>
            </>
        );
        };
viewTowelsScreen = (props) => {
    return (
            <>
                <View
                style={{
                    height: props.size,width: props.size,
                    backgroundColor: props.color,
                }}
                >
                <TouchableOpacity  onPress={() => {
                            this.setState({showShowerCurtainsScreen:true});
                            this.setState({showBlanketsScreen:true});
                            this.setState({showDoorMatsScreen:true});
                            this.setState({showRobsScreen:true});
                            this.setState({showTowelsScreen:false});
                        }}>

                <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bathroom/towel.png')}/> 
                <Text  style={ styles.subMenuNaviLinksText}>Towels</Text>
            </TouchableOpacity>
            </View>
        </>
    );
    };

viewShowerCurtainsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showDoorMatsScreen:true});
                        this.setState({showRobsScreen:true});
                        this.setState({showTowelsScreen:true});
                        this.setState({showBlanketsScreen:true});
                        this.setState({showShowerCurtainsScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bathroom/curtains.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Shower Curtains</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewOther1Screen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showShowerCurtainsScreen:true});
                        this.setState({showRobsScreen:true});
                        this.setState({showTowelsScreen:true});
                        this.setState({showBlanketsScreen:true});
                        this.setState({showDoorMatsScreen:false});
                    }}>
            {/* <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bathroom/mattress.png')}/>  */}
            <Text  style={ styles.subMenuNaviLinksText}>Others</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewDoorMatsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showRobsScreen:true});
                    this.setState({showTowelsScreen:true});
                    this.setState({showBlanketsScreen:true});
                    this.setState({showShowerCurtainsScreen:true});
                    this.setState({showDoorMatsScreen:false});
                }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bathroom/matt.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Door Mats</Text>
        </TouchableOpacity>
        </View>
    );
    };


render() {
    
    const { cartItems, ImageName,modalVisible,NumberOfItems} = this.state;
    const {showRobsScreen, showTowelsScreen,showShowerCurtainsScreen,showBlanketsScreen,showDoorMatsScreen} = this.state;
    const {BathRoomBathRobsProducts,BathRoomTowelsProducts,BathRoomDoorMatsProducts,BathRoomCurtainsProducts} = this.state;
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
                <Text style = { styles.productTopTitleName}> Bath Room </Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
            {/* showRobsScreen */}
            {showRobsScreen ? <></> : 
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Robs </Text>

                    <ScrollView>
                    {BathRoomBathRobsProducts && BathRoomBathRobsProducts.map((item, i) => (
						<>
                        <View key={i} >
						<View  style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBathRobsProducts(i)} >
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

            {/* showTowelsScreen  */}
            {showTowelsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Towels </Text>
                    <ScrollView>
                    {BathRoomTowelsProducts && BathRoomTowelsProducts.map((item, i) => (
						<>
                        <View key={i} >
						<View  style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartTowelsProducts(i)} >
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

             {/*showShowerCurtainsScreen  */}
            {showShowerCurtainsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Shower Curtains </Text>
                    <ScrollView>
                    {BathRoomCurtainsProducts && BathRoomCurtainsProducts .map((item, i) => (
						<>
                        <View key={i}>
						<View  style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartCurtainsProducts(i)} >
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

            {/*showBlanketsScreen  */}
            {showBlanketsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Others</Text>
                    <ScrollView>
                    {cartItems && cartItems.map((item, i) => (
						<>
                        <View key={i}>
						<View  style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBathRobsProducts(i)} >
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

            {/*showDoorMatsScreen  */}
            {showDoorMatsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Door Mats</Text>
                    <ScrollView>
                        {BathRoomDoorMatsProducts && BathRoomDoorMatsProducts.map((item, i) => (
                            <>
                            <View key={i}>
                            <View  style={styles.offersMainContainerView}>

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
                                <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartDoorMatsProducts(i)} >
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
            <View style={styles.subMenuNaviLinksTabView}>
                <View style={styles.subMenuNaviLinksTabSpaceView}></View>
                <ScrollView horizontal={true} >
                    <this.viewRobsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewTowelsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewDoorMatsScreen size={100} color={COLORS.subLinkNaviColour} />
                    {/* <this.viewOther1Screen size={100} color={COLORS.subLinkNaviColour} />  */}
                    <this.viewShowerCurtainsScreen  size={130} color={COLORS.subLinkNaviColour}/>
                </ScrollView>
            </View>
        </View>
    );
}
}
