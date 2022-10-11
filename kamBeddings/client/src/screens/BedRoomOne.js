
import React from 'react';
import { Text,Image, View, TouchableOpacity,Modal,Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
            APIBedRoomBedsProducts, imageurl,
            APIBedRoomBedSidesProducts,
            APIBedRoomBedSheetsProducts,
            APIBedRoomMattressProducts,
            APIBedRoomMattressProtectorsProducts
        } from './DataFileApis';


import { COLORS } from './Colours';



export default class BedRoomOne extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            modalVisible: false,
            ImageName:'',
            cartItems:[],
            NumberOfItems:'',

            // screens
            showBedsScreen:false, // do not display empty view
            showBedSidesScreen:true, // display empty view
            showBedSheetScreen:true, // display empty view
            showMattressScreen:true, // display empty view
            showMattressProtectorScreen:true, // display empty view

            // Products
            BedsProducts : [],
            BedSidesProducts : [],
            BedSheetsProducts : [],
            MattressProducts : [],
            MattressProtectorsProducts : [],
    }    
}
componentDidMount() {
    axios.get(APIBedRoomBedsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BedsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomBedSidesProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BedSidesProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomBedSheetsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BedSheetsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomMattressProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({MattressProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomMattressProtectorsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({MattressProtectorsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
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
setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showImage = (Name) =>{this.setState({ImageName:Name});this.setModalVisible(true)}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Adding to Cart 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

addToCartBedsProducts = (index) => 
{
    const newItems = [...this.state.BedsProducts]; // clone the array

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
addToCartBedSidesProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.BedSidesProducts]; // clone the array

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

addToCartBedSheetsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.BedSheetsProducts]; // clone the array

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

addToCartMattressProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.MattressProducts]; // clone the array

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
addToCartMattressProtectorsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.MattressProtectorsProducts]; // clone the array

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
viewBedsScreen = (props) => {
        return (
                <>
                    <View
                    style={{
                        height: props.size,width: props.size,
                        backgroundColor: props.color,
                    }}
                    >
                    <TouchableOpacity  onPress={() => {
                            this.setState({showBedSidesScreen:true});
                            this.setState({showBedSheetScreen:true});
                            this.setState({showMattressScreen:true});
                            this.setState({showMattressProtectorScreen:true});
                            this.setState({showBedsScreen:false});
                        }}>

                    <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomOne/beds.png')}/> 
                    <Text  style={ styles.subMenuNaviLinksTextSmall}>Beds</Text>
                </TouchableOpacity>
                </View>
            </>
        );
        };
viewBedSideScreen = (props) => {
    return (
            <>
                <View
                style={{
                    height: props.size,width: props.size,
                    backgroundColor: props.color,
                }}
                >
                <TouchableOpacity  onPress={() => {
                            this.setState({showBedSheetScreen:true});
                            this.setState({showMattressScreen:true});
                            this.setState({showMattressProtectorScreen:true});
                            this.setState({showBedsScreen:true});
                            this.setState({showBedSidesScreen:false});
                        }}>

                <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomOne/side.png')}/> 
                <Text  style={ styles.subMenuNaviLinksText}>Bed Sides</Text>
            </TouchableOpacity>
            </View>
        </>
    );
    };

viewMattressScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showBedSheetScreen:true});
                        this.setState({showMattressProtectorScreen:true});
                        this.setState({showBedsScreen:true});
                        this.setState({showBedSidesScreen:true});
                        this.setState({showMattressScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomOne/mattress.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Mattress</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewMattressProtectorScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showBedSheetScreen:true});
                        this.setState({showBedsScreen:true});
                        this.setState({showBedSidesScreen:true});
                        this.setState({showMattressScreen:true});
                        this.setState({showMattressProtectorScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones1} source={require('../imgs/bedroom/bedRoomOne/matprotector.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Mattress Protector</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewBedSheetsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showBedsScreen:true});
                    this.setState({showBedSidesScreen:true});
                    this.setState({showMattressScreen:true});
                    this.setState({showMattressProtectorScreen:true});
                    this.setState({showBedSheetScreen:false});
                }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomOne/sheets.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Bed Sheets</Text>
        </TouchableOpacity>
        </View>
    );
    };


render() {
    
    const { ImageName,modalVisible,NumberOfItems} = this.state;
    const {showBedsScreen, showBedSidesScreen,showBedSheetScreen,showMattressScreen,showMattressProtectorScreen} = this.state;
    const {BedsProducts, BedSidesProducts, BedSheetsProducts,MattressProducts, MattressProtectorsProducts} =this.state;
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
                <Text style = { styles.productTopTitleName}> Bed Room One</Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
            {/* showBedsScreen */}
            {showBedsScreen ? <></> : 
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Beds </Text>

                    <ScrollView>
                    {BedsProducts && BedsProducts.map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBedsProducts(i)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
						</View>
					</>
                    ))}
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView>  
                </>
                )
            }

            {/* showBedSidesScreen  */}
            {showBedSidesScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Bed Side </Text>
                    <ScrollView>
                        {BedSidesProducts && BedSidesProducts .map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBedSidesProducts(i)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
						</View>
					</>
                    ))}
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 
                </>
                )
            }

             {/*showBedSheetScreen  */}
            {showBedSheetScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Beds Sheets </Text>
                    <ScrollView>
                        {BedSheetsProducts && BedSheetsProducts.map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBedSheetsProducts(i)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
						</View>
					</>
                    ))}
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 
                </>
                )
            }

            {/*showMattressScreen  */}
            {showMattressScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Mattress</Text>
                    <ScrollView>
                        
                        {MattressProducts && MattressProducts.map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartMattressProducts(i)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
						</View>
					</>
                    ))}
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 
                </>
                )
            }

            {/*showMattressProtectorScreen  */}
            {showMattressProtectorScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Mattress Protector</Text>
                    <ScrollView>
                        {MattressProtectorsProducts && MattressProtectorsProducts.map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartMattressProtectorsProducts(i)} >
								<Text style = {styles.btnText}> Add to cart </Text>
							</TouchableOpacity>
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
                    <this.viewBedsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewBedSideScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewBedSheetsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewMattressScreen  size={100} color={COLORS.subLinkNaviColour}/>
                    <this.viewMattressProtectorScreen size={148} color={COLORS.subLinkNaviColour} /> 
                </ScrollView>
            </View>
        </View>
    );
}
}
