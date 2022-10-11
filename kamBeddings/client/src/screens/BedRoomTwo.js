
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert,Modal, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import {
        APIBedRoomNetsProducts, imageurl,
        APIBedRoomPillowsProducts,
        APIBedRoomCussionsProducts,
        APIBedRoomBedCoversProducts,
        APIBedRoomBlanketsProducts,
        } from './DataFileApis';


export default class BedRoomTwo extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            cartItemsIsLoading: false,
            modalVisible: false,
            ImageName:'',
            cartItems:[],
            NumberOfItems:'',

            // screens
            showNetsScreen:false, // do not display empty view
            showPillowsScreen:true, // display empty view
            showBedCoversScreen:true, // display empty view
            showBlanketsScreen:true, // display empty view
            showCussionsScreen:true, // display empty view

            // Products
            NetsProducts:[],
            PillowsProducts:[],
            CussionsProducts:[],
            BedCoversProducts:[],
            BlanketsProducts:[],
    }



    
}
componentDidMount() {
    axios.get(APIBedRoomNetsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({NetsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomPillowsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PillowsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomCussionsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({CussionsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomBedCoversProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BedCoversProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomBlanketsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BlanketsProducts:[...JSON.parse(results)]})
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
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Adding to Cart 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

addToCartNetsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.NetsProducts]; // clone the array

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


addToCartPillowsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.PillowsProducts]; // clone the array

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

addToCartCussionsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.CussionsProducts]; // clone the array

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
addToCartBedCoversProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.BedCoversProducts]; // clone the array

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
addToCartBlanketsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.BlanketsProducts]; // clone the array

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
setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showImage = (Name) =>{this.setState({ImageName:Name});this.setModalVisible(true)}

    viewNetsScreen = (props) => {
        return (
                <>
                    <View
                    style={{
                        height: props.size,width: props.size,
                        backgroundColor: props.color,
                    }}
                    >
                    <TouchableOpacity  onPress={() => {
                            this.setState({showPillowsScreen:true});
                            this.setState({showBedCoversScreen:true});
                            this.setState({showBlanketsScreen:true});
                            this.setState({showCussionsScreen:true});
                            this.setState({showNetsScreen:false});
                        }}>

                    <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomTwo/nets.png')}/> 
                    <Text  style={ styles.subMenuNaviLinksTextSmall}>Nets</Text>
                </TouchableOpacity>
                </View>
            </>
        );
        };
viewPillowsScreen = (props) => {
    return (
            <>
                <View
                style={{
                    height: props.size,width: props.size,
                    backgroundColor: props.color,
                }}
                >
                <TouchableOpacity  onPress={() => {
                            this.setState({showBedCoversScreen:true});
                            this.setState({showBlanketsScreen:true});
                            this.setState({showCussionsScreen:true});
                            this.setState({showNetsScreen:true});
                            this.setState({showPillowsScreen:false});
                        }}>

                <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomTwo/pillows.png')}/> 
                <Text  style={ styles.subMenuNaviLinksText}>Pillows</Text>
            </TouchableOpacity>
            </View>
        </>
    );
    };

viewBedCoversScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showCussionsScreen:true});
                        this.setState({showNetsScreen:true});
                        this.setState({showPillowsScreen:true});
                        this.setState({showBlanketsScreen:true});
                        this.setState({showBedCoversScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomTwo/cover.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Bed Covers</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewBlanketsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showBedCoversScreen:true});
                        this.setState({showNetsScreen:true});
                        this.setState({showPillowsScreen:true});
                        this.setState({showCussionsScreen:true});
                        this.setState({showBlanketsScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomTwo/blanket.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Blankets</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewCussionsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showNetsScreen:true});
                    this.setState({showPillowsScreen:true});
                    this.setState({showBlanketsScreen:true});
                    this.setState({showBedCoversScreen:true});
                    this.setState({showCussionsScreen:false});
                }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomTwo/cussions.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Cussions</Text>
        </TouchableOpacity>
        </View>
    );
    };



render() {
    
    const {ImageName,modalVisible, NumberOfItems} = this.state;
    const {showNetsScreen, showPillowsScreen,showBedCoversScreen,showBlanketsScreen,showCussionsScreen} = this.state;
    const {NetsProducts,PillowsProducts,CussionsProducts,BedCoversProducts,BlanketsProducts} =this.state;
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
                <Text style = { styles.productTopTitleName}> Bed Room Two </Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
            {/* showNetsScreen */}
            {showNetsScreen ? <></> : 
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Nets </Text>

                    <ScrollView>
                        {NetsProducts && NetsProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartNetsProducts(i)} >
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

            {/* showPillowsScreen  */}
            {showPillowsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Pillows </Text>
                    <ScrollView>
                        {PillowsProducts && PillowsProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartPillowsProducts(i)} >
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

             {/*showBedCoversScreen  */}
            {showBedCoversScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Bed Covers </Text>
                    <ScrollView>
                        {BedCoversProducts && BedCoversProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBedCoversProducts(i)} >
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

            {/*showBlanketsScreen  */}
            {showBlanketsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Blankets</Text>
                    <ScrollView>
                        {BlanketsProducts && BlanketsProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartBlanketsProducts(i)} >
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

            {/*showCussionsScreen  */}
            {showCussionsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Cussions</Text>
                    <ScrollView>
                        {CussionsProducts && CussionsProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartCussionsProducts(i)} >
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
                    <this.viewNetsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewPillowsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewCussionsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewBedCoversScreen  size={100} color={COLORS.subLinkNaviColour}/>
                    <this.viewBlanketsScreen size={100} color={COLORS.subLinkNaviColour} /> 
                </ScrollView>
            </View>
        </View>
    );
}
}
