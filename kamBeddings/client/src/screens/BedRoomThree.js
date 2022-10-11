
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert,Modal, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
        APIBedRoomClosetProducts, imageurl,
        APIBedRoomShoeRackProducts,
        APIBedRoomMirrorsProducts,
        APIBedRoomNightWareProducts,
        APIBedRoomSandalsProducts,
        } from './DataFileApis';

import { COLORS } from './Colours';



export default class BedRoomThree extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            modalVisible: false,
            ImageName:'',
            cartItems:[],
            NumberOfItems:'',

            // screens
            showClosetScreen:false, // do not display empty view
            showShoeRackScreen:true, // display empty view
            showNightWareScreen:true, // display empty view
            showSandalsScreen:true, // display empty view
            showDressingMirrorsScreen:true, // display empty view

            // Products
            ClosetProducts:[],
            ShoeRackProducts:[],
            MirrorsProducts:[],
            NightWareProducts:[],
            SandalsProducts:[],
    }   
}
componentDidMount() {
    axios.get(APIBedRoomClosetProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ClosetProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomShoeRackProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ShoeRackProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomMirrorsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({MirrorsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomNightWareProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({NightWareProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APIBedRoomSandalsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SandalsProducts:[...JSON.parse(results)]})
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

addToCartClosetProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.ClosetProducts]; // clone the array

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
addToCartShoeRackProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.ShoeRackProducts]; // clone the array

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
addToCartMirrorsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.MirrorsProducts]; // clone the array

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
addToCartNightWareProducts = (index) => 
{
    const newItems = [...this.state.NightWareProducts]; // clone the array

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
addToCartSandalsProducts = (index) => 
{
    console.log("called...");
    const newItems = [...this.state.SandalsProducts]; // clone the array

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
viewClosetScreen = (props) => {
        return (
                <>
                    <View
                    style={{
                        height: props.size,width: props.size,
                        backgroundColor: props.color,
                    }}
                    >
                    <TouchableOpacity  onPress={() => {
                            this.setState({showShoeRackScreen:true});
                            this.setState({showNightWareScreen:true});
                            this.setState({showSandalsScreen:true});
                            this.setState({showDressingMirrorsScreen:true});
                            this.setState({showClosetScreen:false});
                        }}>

                    <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomThree/closet.png')}/> 
                    <Text  style={ styles.subMenuNaviLinksTextSmall}>Closets</Text>
                </TouchableOpacity>
                </View>
            </>
        );
        };
viewShoeRackScreen = (props) => {
    return (
            <>
                <View
                style={{
                    height: props.size,width: props.size,
                    backgroundColor: props.color,
                }}
                >
                <TouchableOpacity  onPress={() => {
                            this.setState({showNightWareScreen:true});
                            this.setState({showSandalsScreen:true});
                            this.setState({showDressingMirrorsScreen:true});
                            this.setState({showClosetScreen:true});
                            this.setState({showShoeRackScreen:false});
                        }}>

                <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomThree/shoe.png')}/> 
                <Text  style={ styles.subMenuNaviLinksText}>Shoe Rack</Text>
            </TouchableOpacity>
            </View>
        </>
    );
    };

viewNightWareScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showDressingMirrorsScreen:true});
                        this.setState({showClosetScreen:true});
                        this.setState({showShoeRackScreen:true});
                        this.setState({showSandalsScreen:true});
                        this.setState({showNightWareScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomThree/night.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Night Wear</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewSandalsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showNightWareScreen:true});
                        this.setState({showClosetScreen:true});
                        this.setState({showShoeRackScreen:true});
                        this.setState({showDressingMirrorsScreen:true});
                        this.setState({showSandalsScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomThree/sandals.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Sandals</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewMirrorsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showClosetScreen:true});
                    this.setState({showShoeRackScreen:true});
                    this.setState({showSandalsScreen:true});
                    this.setState({showNightWareScreen:true});
                    this.setState({showDressingMirrorsScreen:false});
                }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/bedRoomThree/mirror.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Mirrors</Text>
        </TouchableOpacity>
        </View>
    );
    };
setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showImage = (Name) =>{this.setState({ImageName:Name});this.setModalVisible(true)}
    

render() {
    
    const {  NumberOfItems,ImageName,modalVisible,} = this.state;
    const {showClosetScreen, showShoeRackScreen,showNightWareScreen,showSandalsScreen,showDressingMirrorsScreen} = this.state;
    const {ClosetProducts,ShoeRackProducts,MirrorsProducts,NightWareProducts,SandalsProducts} = this.state;
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
                <Text style = { styles.productTopTitleName}> Bed Room Three </Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
            {/* showClosetScreen */}
            {showClosetScreen ? <></> : 
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Closets </Text>

                    <ScrollView>
                        {ClosetProducts && ClosetProducts.map((item, i) => (
						<>
						<View key={i} style={styles.offersMainContainerView}>

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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartClosetProducts(i)} >
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

            {/* showShoeRackScreen  */}
            {showShoeRackScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Shoe Racks </Text>
                    <ScrollView>
                        {ShoeRackProducts && ShoeRackProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartShoeRackProducts(i)} >
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

             {/*showNightWareScreen  */}
            {showNightWareScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Night Wears </Text>
                    <ScrollView>
                        {NightWareProducts && NightWareProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartNightWareProducts(i)} >
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

            {/*showSandalsScreen  */}
            {showSandalsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Sandals</Text>
                    <ScrollView>
                        {SandalsProducts && SandalsProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartSandalsProducts(i)} >
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

            {/*showDressingMirrorsScreen  */}
            {showDressingMirrorsScreen ? <></>:
                (
                <>
                    <Text  style={styles.sublinksTitleTxt}>Mirrors</Text>
                    <ScrollView>
                        {MirrorsProducts && MirrorsProducts.map((item, i) => (
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
							<TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addToCartMirrorsProducts(i)} >
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
                    <this.viewClosetScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewShoeRackScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewMirrorsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewNightWareScreen  size={100} color={COLORS.subLinkNaviColour}/>
                    <this.viewSandalsScreen size={100} color={COLORS.subLinkNaviColour} /> 
                </ScrollView>
            </View>
        </View>
    );
}
}
