
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList } from 'react-native-gesture-handler';

import { COLORS } from './Colours';

// APIs
import {
    APIBabies, imageurl,
    // APIBathRoomTowelsProducts,
    // APIBathRoomDoorMatsProducts,
    // APIBathRoomCurtainsProducts
    } from './DataFileApis';

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




export default class Babies extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            cartItems:[],
            NumberOfItems:'',

            // screens
            showRobsScreen:false, // do not display empty view
            showTowelsScreen:true, // display empty view
            showShowerCurtainsScreen:true, // display empty view
            showBlanketsScreen:true, // display empty view
            showDoorMatsScreen:true, // display empty view

            // Products 
            BabiesProducts:[],
            BathRoomTowelsProducts:[],
            RoomDoorMatsProducts:[],
            RoomBathroomCurtainsProducts:[],
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
    .catch(err=>{})


    // axios.get(APIBathRoomTowelsProducts)
    // .then(res => {
    //     let results =JSON.stringify(res.data); 
    //     this.setState({BathRoomTowelsProducts:[...JSON.parse(results)]})
    //     // console.log(this.state)
    //     // console.log("2 ==>"+results)
    //     })
    // .catch(err=>{})

    // axios.get(APIBathRoomDoorMatsProducts)
    // .then(res => {
    //     let results =JSON.stringify(res.data); 
    //     this.setState({BathRoomDoorMatsProducts:[...JSON.parse(results)]})
    //     // console.log(this.state)
    //     // console.log("3 ==>"+results)
    //     })
    // .catch(err=>{})

    // axios.get(APIBathRoomCurtainsProducts)
    // .then(res => {
    //     let results =JSON.stringify(res.data); 
    //     this.setState({BathRoomCurtainsProducts:[...JSON.parse(results)]})
    //     // console.log(this.state)
    //     // console.log("4 ==>"+results)
    //     })
    // .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

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


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     rendering items

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
renderBathRobsProducts = ({item,index}) => 
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
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {this.formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartBathRobsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

renderTowelsProducts = ({item,index}) => 
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
                <Text numberOfLines={1} style={styles.producttext}>{item.Name}</Text>
                <Text numberOfLines={1} style={styles.producttext}>{item.Description}</Text>
                <Text numberOfLines={1} style={styles.producttext}> {this.formatNumberWithComma(item.Amount)}</Text>
            </View>

            <View style={styles.homeOrderbtnView}>
                <View style={[styles.centerElement, styles.homeOrderBtn]}>
                    <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartTowelsProducts(index)} >
                        <Text style = { styles.homeorderstxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}

renderDoorMatsProducts = ({item,index}) => 
{
    if (item.empty === true)
        { return <View style={[styles.ItemInvisible]}></View> }
    return (
        <View style={styles.homeCardView2}>
            <TouchableOpacity>
                <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
            </TouchableOpacity>

            <View style={styles.productTextView}>
                <Text numberOfLines={1} style={styles.producttext}>{item.Name}</Text>
                <Text numberOfLines={1} style={styles.producttext}>{item.Description}</Text>
                <Text numberOfLines={1} style={styles.producttext}> {this.formatNumberWithComma(item.Amount)}</Text>
            </View>

            <View style={styles.homeOrderbtnView}>
                <View style={[styles.centerElement, styles.homeOrderBtn]}>
                    <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartDoorMatsProducts(index)} >
                        <Text style = { styles.homeorderstxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}
renderCurtainsProducts = ({item,index}) => 
{
    if (item.empty === true)
        { return <View style={[styles.ItemInvisible]}></View> }
    return (
        <View style={styles.homeCardView2}>
            <TouchableOpacity>
                <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
            </TouchableOpacity>

            <View style={styles.productTextView}>
                <Text numberOfLines={1} style={styles.producttext}>{item.Name}</Text>
                <Text numberOfLines={1} style={styles.producttext}>{item.Description}</Text>
                <Text numberOfLines={1} style={styles.producttext}> {this.formatNumberWithComma(item.Amount)}</Text>
            </View>

            <View style={styles.homeOrderbtnView}>
                <View style={[styles.centerElement, styles.homeOrderBtn]}>
                    <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartCurtainsProducts(index)} >
                        <Text style = { styles.homeorderstxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}


formatNumberWithComma(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
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
    
    const { cartItems, NumberOfItems} = this.state;
    const {showRobsScreen, showTowelsScreen,showShowerCurtainsScreen,showBlanketsScreen,showDoorMatsScreen} = this.state;
    const {BabiesProducts,BathRoomTowelsProducts,BathRoomDoorMatsProducts,BathRoomCurtainsProducts} = this.state;
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
                <Text style = { styles.productTopTitleName}> Babies </Text>
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
                    <Text  style={styles.sublinksTitleTxt}>Babies </Text>

                    <ScrollView>
                        <FlatList
                        data={ formatData(BabiesProducts,numColums)}
                        renderItem={this.renderBathRobsProducts}
                        numColumns={numColums}
                        />
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
                        <FlatList
                        data={ formatData(BathRoomTowelsProducts,numColums)}
                        renderItem={this.renderTowelsProducts}
                        numColumns={numColums}
                        />
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
                        <FlatList
                        data={ formatData(BathRoomCurtainsProducts,numColums)}
                        renderItem={this.renderCurtainsProducts}
                        numColumns={numColums}
                        />
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
                        <FlatList
                        data={ formatData(cartItems,numColums)}
                        renderItem={this.renderBathRobsProducts}
                        numColumns={numColums}
                        />
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
                        <FlatList
                        data={ formatData(BathRoomDoorMatsProducts,numColums)}
                        renderItem={this.renderDoorMatsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 
                </>
                )
            }

            {/* <View style={styles.subMenuNaviLinksTabView}>
                <View style={styles.subMenuNaviLinksTabSpaceView}></View>
                <ScrollView horizontal={true} >
                    <this.viewRobsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewTowelsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewDoorMatsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewShowerCurtainsScreen  size={130} color={COLORS.subLinkNaviColour}/>
                </ScrollView>
            </View> */}
        </View>
    );
}
}
