
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FlatList } from 'react-native-gesture-handler';
import {
        APILivingRoomCurtainsProducts, imageurl,
        APILivingRoomSeatsProducts,
        APILivingRoomSideBoardsProducts,
        APILivingRoomTablesProducts,
        APILivingRoomCarpetsProducts,
        APILivingRoomIroningBoardProducts
        }from './DataFileApis';

import { COLORS } from './Colours';

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




export default class LivingRoom extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
            cartItems:[],
            NumberOfItems:'',

            // screens
            showCurtainsScreen:false, // do not display empty view
            showSeatsScreen:true, // display empty view
            showSideBoardsScreen:true, // display empty view
            showTablesScreen:true, // display empty view
            showBridalSandalsScreen:true, // display empty view
            showCarpetsScreen:true, // display empty view
            showIroningBoardScreen:true, // display empty view


            // Products
            CurtainsProducts: [],
            SeatsProducts: [],
            SideBoardsProducts: [],
            TablesProducts: [],
            CarpetsProducts: [],
            IroningBoardProducts: [],

            DoNotShowDisplayScreen: false,
            DoNotShowItemDetailsScreen: true,

            ItemDetails:[
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-1.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-2.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-3.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-4.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-5.png?raw=true",
                "https://github.com/HENRY-2016/Development-Repo/blob/main/kg-app-6.png?raw=true",
            ],
    }
    
}
componentDidMount() {
    axios.get(APILivingRoomCurtainsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({CurtainsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APILivingRoomSeatsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SeatsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APILivingRoomSideBoardsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({SideBoardsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APILivingRoomTablesProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({TablesProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APILivingRoomCarpetsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({CarpetsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{})

    axios.get(APILivingRoomIroningBoardProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({IroningBoardProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

setInterval(this.getNumberOfItems,1000);
}

getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){ this.setState({NumberOfItems:value})}})
        // console.log("===== geting NumberOfItems")
    }catch (error) { console.log(error)}
};

showItemDisplayScreen = () =>
{
    this.setState({DoNotShowItemDetailsScreen: true})
    this.setState({DoNotShowDisplayScreen: false})
}
showItemDetailsScreen = () =>
{
    this.setState({DoNotShowDisplayScreen: true})
    this.setState({DoNotShowItemDetailsScreen: false})
}
displayItemDetailsScreen = (index) =>
{
    this.setState({ItemIndex:index})

    setTimeout(this.showItemDetailsScreen,2000)

}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Adding to Cart 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

addToCartCurtainsProducts = (index) => 
{
    const newItems = [...this.state.CurtainsProducts]; // clone the array

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


addToCartSeatsProducts = (index) => 
{
    const newItems = [...this.state.SeatsProducts]; // clone the array

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
addToCartSideBoardsProducts = (index) => 
{
    const newItems = [...this.state.SideBoardsProducts]; // clone the array

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

addToCartTablesProducts = (index) => 
{
    const newItems = [...this.state.TablesProducts]; // clone the array

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
addToCartCarpetsProducts = (index) => 
{
    const newItems = [...this.state.CarpetsProducts]; // clone the array

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

addToCartIroningBoardProducts = (index) => 
{
    const newItems = [...this.state.IroningBoardProducts]; // clone the array

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
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Rendering items 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

renderCurtainsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartCurtainsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

renderSeatsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartSeatsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

renderSideBoardsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartSideBoardsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

renderTablesProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartTablesProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

renderCarpetsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartCarpetsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderIroningBoardProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartIroningBoardProducts(index)} >
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
viewCurtainsScreen = (props) => {
        return (
                <>
                    <View
                    style={{
                        height: props.size,width: props.size,
                        backgroundColor: props.color,
                    }}
                    >
                    <TouchableOpacity  onPress={() => {
                            this.setState({showSeatsScreen:true});
                            this.setState({showSideBoardsScreen:true});
                            this.setState({showTablesScreen:true});
                            this.setState({showBridalSandalsScreen:true});
                            this.setState({showCarpetsScreen:true});
                            this.setState({showIroningBoardScreen:true});
                            this.setState({showCurtainsScreen:false});
                        }}>

                    <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/livingroom/curtains.png')}/> 
                    <Text  style={ styles.subMenuNaviLinksTextSmall}>Curtains</Text>
                </TouchableOpacity>
                </View>
            </>
        );
        };
viewSeatsScreen = (props) => {
    return (
            <>
                <View
                style={{
                    height: props.size,width: props.size,
                    backgroundColor: props.color,
                }}
                >
                <TouchableOpacity  onPress={() => {
                            this.setState({showSideBoardsScreen:true});
                            this.setState({showTablesScreen:true});
                            this.setState({showBridalSandalsScreen:true});
                            this.setState({showCurtainsScreen:true});
                            this.setState({showCarpetsScreen:true});
                            this.setState({showIroningBoardScreen:true});
                            this.setState({showSeatsScreen:false});
                        }}>

                <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/livingroom/seats.png')}/> 
                <Text  style={ styles.subMenuNaviLinksText}>Seats</Text>
            </TouchableOpacity>
            </View>
        </>
    );
    };

viewSideBoardsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showBridalSandalsScreen:true});
                        this.setState({showCurtainsScreen:true});
                        this.setState({showSeatsScreen:true});
                        this.setState({showTablesScreen:true});
                        this.setState({showCarpetsScreen:true});
                        this.setState({showIroningBoardScreen:true});
                        this.setState({showSideBoardsScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/livingroom/sideboard.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Side Boards</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewTablesScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showSideBoardsScreen:true});
                        this.setState({showCurtainsScreen:true});
                        this.setState({showSeatsScreen:true});
                        this.setState({showBridalSandalsScreen:true});
                        this.setState({showCarpetsScreen:true});
                        this.setState({showIroningBoardScreen:true});
                        this.setState({showTablesScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/livingroom/table.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Tables</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewBridalSandalsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showCurtainsScreen:true});
                    this.setState({showSeatsScreen:true});
                    this.setState({showTablesScreen:true});
                    this.setState({showBridalSandalsScreen:true});
                    this.setState({showCarpetsScreen:true});
                    this.setState({showIroningBoardScreen:true});
                    this.setState({showSideBoardsScreen:false});
                }}>
            {/* <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bedroom/sheets.png')}/>  */}
            <Text  style={ styles.subMenuNaviLinksText}>Bridal Sandals</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewCarpetsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showCurtainsScreen:true});
                    this.setState({showSeatsScreen:true});
                    this.setState({showTablesScreen:true});
                    this.setState({showBridalSandalsScreen:true});
                    this.setState({showSideBoardsScreen:true});
                    this.setState({showIroningBoardScreen:true});
                    this.setState({showCarpetsScreen:false});
                }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/livingroom/carpet.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Carpets</Text>
        </TouchableOpacity>
        </View>
    );
    };

viewIroningBoardScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showCurtainsScreen:true});
                    this.setState({showSeatsScreen:true});
                    this.setState({showTablesScreen:true});
                    this.setState({showBridalSandalsScreen:true});
                    this.setState({showSideBoardsScreen:true});
                    this.setState({showCarpetsScreen:true});
                    this.setState({showIroningBoardScreen:false});
                }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/livingroom/ironing.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Ironing Board</Text>
        </TouchableOpacity>
        </View>
    );
    };
    

render() {
    
    const { cartItems, NumberOfItems} = this.state;
    const {showCurtainsScreen, showSeatsScreen,showSideBoardsScreen,showTablesScreen,showBridalSandalsScreen,showCarpetsScreen, showIroningBoardScreen} = this.state;
    const {CurtainsProducts,SeatsProducts,SideBoardsProducts,TablesProducts,CarpetsProducts,IroningBoardProducts} = this.state;
    const {DoNotShowItemDetailsScreen,DoNotShowDisplayScreen,ItemDetails} = this.state;

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
                <Text style = { styles.productTopTitleName}> Living Room </Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>
        
            {/* showCurtainsScreen */}
            {showCurtainsScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Curtains </Text>

                    <ScrollView>
                        <FlatList
                        data={ formatData(CurtainsProducts,numColums)}
                        renderItem={this.renderCurtainsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView>  

                        {DoNotShowItemDetailsScreen ? <></>:(<>
                        <ScrollView>
                        <View style={{height:20}}></View>
                            <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ItemDetails} sliderBoxHeight={200}
                                    dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={10}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                            </View> 
                        <View  style={styles.MainTextDetailsView}>
                            <View style={styles.TextDetailsView}>
                                <Text  style={styles.offersLables}> Name</Text>
                                <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                                <Text  style={styles.offersLables}>Amount</Text>
                            </View>
                        </View>

                        <View style={styles.offersbtnsView}>
                            <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                                <Text style = {styles.btnText} >Display</Text>
                            </TouchableOpacity>
                            <View style={{width:25}} ></View>

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                                <Text style = {styles.btnText}> Add to cart </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProcedbtn} >
                                <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        </ScrollView>
                    </>)}
                </>)}

            {/* showSeatsScreen  */}
            {showSeatsScreen ? <></>:(<>
                <Text  style={styles.sublinksTitleTxt}>Seats </Text>
                <ScrollView>
                    <FlatList
                    data={ formatData(SeatsProducts,numColums)}
                    renderItem={this.renderSeatsProducts}
                    numColumns={numColums}
                    />
                    <View style={styles.blankSpaceView}></View>
                </ScrollView> 

                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView>
                    <View style={{height:20}}></View>
                        <View style={styles.ImageSliderView}>
                            <View style={{height:20}}></View>
                            <SliderBox style={styles.ImageSliderView}
                                images={ItemDetails} sliderBoxHeight={200}
                                dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                paginationBoxVerticalPadding={10}
                                autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                dotStyle={styles.ImageSliderDotStyle}
                                ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                imageLoadingColor={COLORS.colourNumberOne}
                                /> 
                        </View> 
                    <View  style={styles.MainTextDetailsView}>
                        <View style={styles.TextDetailsView}>
                            <Text  style={styles.offersLables}> Name</Text>
                            <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                            <Text  style={styles.offersLables}>Amount</Text>
                        </View>
                    </View>

                    <View style={styles.offersbtnsView}>
                        <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                            <Text style = {styles.btnText} >Display</Text>
                        </TouchableOpacity>
                        <View style={{width:25}} ></View>

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    </ScrollView>
                </>)}
            </>)}

             {/*showSideBoardsScreen  */}
            {showSideBoardsScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Side Board </Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(SideBoardsProducts,numColums)}
                        renderItem={this.renderSideBoardsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 

                    {DoNotShowItemDetailsScreen ? <></>:(<>
                        <ScrollView>
                        <View style={{height:20}}></View>
                            <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ItemDetails} sliderBoxHeight={200}
                                    dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={10}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                            </View> 
                        <View  style={styles.MainTextDetailsView}>
                            <View style={styles.TextDetailsView}>
                                <Text  style={styles.offersLables}> Name</Text>
                                <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                                <Text  style={styles.offersLables}>Amount</Text>
                            </View>
                        </View>

                        <View style={styles.offersbtnsView}>
                            <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                                <Text style = {styles.btnText} >Display</Text>
                            </TouchableOpacity>
                            <View style={{width:25}} ></View>

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                                <Text style = {styles.btnText}> Add to cart </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProcedbtn} >
                                <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        </ScrollView>
                    </>)}
                </>)}

            {/*showTablesScreen  */}
            {showTablesScreen ? <></>:(<>
                <Text  style={styles.sublinksTitleTxt}>Tables</Text>
                <ScrollView>
                    <FlatList
                    data={ formatData(TablesProducts,numColums)}
                    renderItem={this.renderTablesProducts}
                    numColumns={numColums}
                    />
                    <View style={styles.blankSpaceView}></View>
                </ScrollView> 

                {DoNotShowItemDetailsScreen ? <></>:(<>
                        <ScrollView>
                        <View style={{height:20}}></View>
                            <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ItemDetails} sliderBoxHeight={200}
                                    dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={10}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                            </View> 
                        <View  style={styles.MainTextDetailsView}>
                            <View style={styles.TextDetailsView}>
                                <Text  style={styles.offersLables}> Name</Text>
                                <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                                <Text  style={styles.offersLables}>Amount</Text>
                            </View>
                        </View>

                        <View style={styles.offersbtnsView}>
                            <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                                <Text style = {styles.btnText} >Display</Text>
                            </TouchableOpacity>
                            <View style={{width:25}} ></View>

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                                <Text style = {styles.btnText}> Add to cart </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProcedbtn} >
                                <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        </ScrollView>
                    </>)}
            </>)}

            {/*showBridalSandalsScreen  */}
            {showBridalSandalsScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Bridal Sandals</Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(cartItems,numColums)}
                        renderItem={this.renderProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 

                    {DoNotShowItemDetailsScreen ? <></>:(<>
                        <ScrollView>
                        <View style={{height:20}}></View>
                            <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ItemDetails} sliderBoxHeight={200}
                                    dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={10}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                            </View> 
                        <View  style={styles.MainTextDetailsView}>
                            <View style={styles.TextDetailsView}>
                                <Text  style={styles.offersLables}> Name</Text>
                                <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                                <Text  style={styles.offersLables}>Amount</Text>
                            </View>
                        </View>

                        <View style={styles.offersbtnsView}>
                            <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                                <Text style = {styles.btnText} >Display</Text>
                            </TouchableOpacity>
                            <View style={{width:25}} ></View>

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                                <Text style = {styles.btnText}> Add to cart </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProcedbtn} >
                                <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        </ScrollView>
                    </>)}
                </>)}

            {/*showCarpetsScreen  */}
            {showCarpetsScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Carpets</Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(CarpetsProducts,numColums)}
                        renderItem={this.renderCarpetsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 

                    {DoNotShowItemDetailsScreen ? <></>:(<>
                        <ScrollView>
                        <View style={{height:20}}></View>
                            <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ItemDetails} sliderBoxHeight={200}
                                    dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={10}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                            </View> 
                        <View  style={styles.MainTextDetailsView}>
                            <View style={styles.TextDetailsView}>
                                <Text  style={styles.offersLables}> Name</Text>
                                <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                                <Text  style={styles.offersLables}>Amount</Text>
                            </View>
                        </View>

                        <View style={styles.offersbtnsView}>
                            <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                                <Text style = {styles.btnText} >Display</Text>
                            </TouchableOpacity>
                            <View style={{width:25}} ></View>

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                                <Text style = {styles.btnText}> Add to cart </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProcedbtn} >
                                <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        </ScrollView>
                    </>)}
                </>)}

            {/*showIroningBoardScreen  */}
            {showIroningBoardScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Ironing Boards</Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(IroningBoardProducts,numColums)}
                        renderItem={this.renderIroningBoardProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                    </ScrollView> 
                    {DoNotShowItemDetailsScreen ? <></>:(<>
                        <ScrollView>
                        <View style={{height:20}}></View>
                            <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ItemDetails} sliderBoxHeight={200}
                                    dotColor= {COLORS.white} inactiveDotColor={COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={10}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                            </View> 
                        <View  style={styles.MainTextDetailsView}>
                            <View style={styles.TextDetailsView}>
                                <Text  style={styles.offersLables}> Name</Text>
                                <Text  style={styles.TextDetails}> Description Description Description Description Description Description</Text>
                                <Text  style={styles.offersLables}>Amount</Text>
                            </View>
                        </View>

                        <View style={styles.offersbtnsView}>
                            <TouchableOpacity style={styles.offersorderbtn}  onPress={this.showItemDisplayScreen} >
                                <Text style = {styles.btnText} >Display</Text>
                            </TouchableOpacity>
                            <View style={{width:25}} ></View>

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>this.addtocart(ItemIndex)} >
                                <Text style = {styles.btnText}> Add to cart </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProcedbtn} >
                                <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}}></View>
                        </ScrollView>
                    </>)}
                </>)}

            <View style={styles.subMenuNaviLinksTabView}>
                <View style={styles.subMenuNaviLinksTabSpaceView}></View>
                <ScrollView horizontal={true} >
                    <this.viewCurtainsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewSeatsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewSideBoardsScreen  size={100} color={COLORS.subLinkNaviColour}/>
                    <this.viewTablesScreen size={100} color={COLORS.subLinkNaviColour} /> 
                    <this.viewCarpetsScreen size={100} color={COLORS.subLinkNaviColour} /> 
                    <this.viewIroningBoardScreen size={130} color={COLORS.subLinkNaviColour} /> 

                </ScrollView>
            </View>
        </View>
    );
}
}
