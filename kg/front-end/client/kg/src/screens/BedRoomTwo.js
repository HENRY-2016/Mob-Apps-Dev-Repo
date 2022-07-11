
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from './Colours';
import {
        APIBedRoomNetsProducts, imageurl,
        APIBedRoomPillowsProducts,
        APIBedRoomCussionsProducts,
        APIBedRoomBedCoversProducts,
        APIBedRoomBlanketsProducts,
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




export default class BedRoomTwo extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
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
        console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n"+err+"\n\nCan Not Load Products");})

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
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Rendering Products 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

renderNetsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartNetsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderPillowsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartPillowsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

renderCussionsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartCussionsProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderBedCoversProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartBedCoversProducts(index)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderBlanketsProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>
    
                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {this.formatNumberWithComma(item.Amount)}</Text>
                </View>
    
                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>this.addToCartBlanketsProducts(index)} >
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


showalerts = () =>{
        Alert("Am working")
        // console.log(i)
    }
render() {
    
    const {NumberOfItems} = this.state;
    const {showNetsScreen, showPillowsScreen,showBedCoversScreen,showBlanketsScreen,showCussionsScreen} = this.state;
    const {NetsProducts,PillowsProducts,CussionsProducts,BedCoversProducts,BlanketsProducts} =this.state;
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
            {showNetsScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Nets </Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(NetsProducts,numColums)}
                        renderItem={this.renderNetsProducts}
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

            {/* showPillowsScreen  */}
            {showPillowsScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Pillows </Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(PillowsProducts,numColums)}
                        renderItem={this.renderPillowsProducts}
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

             {/*showBedCoversScreen  */}
            {showBedCoversScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Bed Covers </Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(BedCoversProducts,numColums)}
                        renderItem={this.renderBedCoversProducts}
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

            {/*showBlanketsScreen  */}
            {showBlanketsScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Blankets</Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(BlanketsProducts,numColums)}
                        renderItem={this.renderBlanketsProducts}
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

            {/*showCussionsScreen  */}
            {showCussionsScreen ? <></>:(<>
                    <Text  style={styles.sublinksTitleTxt}>Cussions</Text>
                    <ScrollView>
                        <FlatList
                        data={ formatData(CussionsProducts,numColums)}
                        renderItem={this.renderCussionsProducts}
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
