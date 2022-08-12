
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, FlatList, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
            APIBedRoomBedsProducts, imageurl,
            APIBedRoomBedSidesProducts,
            APIBedRoomBedSheetsProducts,
            APIBedRoomMattressProducts,
            APIBedRoomMattressProtectorsProducts
        } from './DataFileApis';
import { COLORS } from './Colours';
import { formatData,numColums,
    addItemsToCart,formatNumberWithComma
    } from './Functions';



export default class BedRoomOne extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        cartItemsIsLoading: false,
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
            ItemIndex:'',
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

///                     Rendering Products 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
renderBedsProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BedSheetsProducts)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderBedSheetsProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BedSheetsProducts)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderBedSidesProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BedSidesProducts)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }

renderMattressProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.MattressProducts)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
    }
renderMattressProtectorsProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.MattressProtectorsProducts)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
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
    
    const {NumberOfItems,ItemIndex} = this.state;
    const {showBedsScreen, showBedSidesScreen,showBedSheetScreen,showMattressScreen,showMattressProtectorScreen} = this.state;
    const {BedsProducts, BedSidesProducts, BedSheetsProducts,MattressProducts, MattressProtectorsProducts} =this.state;
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
            {showBedsScreen ? <></> :(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Beds </Text>

                        <FlatList
                        data={ formatData(BedsProducts,numColums)}
                        renderItem={this.renderBedsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                </>)}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BedsProducts)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >Proceed To Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:70}}></View>
                    </ScrollView>
                </>)}
            </>)}

            {/* showBedSidesScreen  */}
            {showBedSidesScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Bed Side </Text>
                        <FlatList
                        data={ formatData(BedSidesProducts,numColums)}
                        renderItem={this.renderBedSidesProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                </>)}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BedSidesProducts)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >Proceed To Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:70}}></View>
                    </ScrollView>
                </>)}
            </>)}

             {/*showBedSheetScreen  */}
            {showBedSheetScreen ? <></>:( <>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Beds Sheets </Text>
                        <FlatList
                        data={ formatData(BedSheetsProducts,numColums)}
                        renderItem={this.renderBedSheetsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                </>)}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BedSidesProducts)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >Proceed To Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:70}}></View>
                    </ScrollView>
                </>)}
            </>)}

            {/*showMattressScreen  */}
            {showMattressScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Mattress</Text>
                    <FlatList
                    data={ formatData(MattressProducts,numColums)}
                    renderItem={this.renderMattressProducts}
                    numColumns={numColums}
                    />
                    <View style={styles.blankSpaceView}></View>
                </>)}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.MattressProducts)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >Proceed To Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:70}}></View>
                    </ScrollView>
                </>)}
            </>)}

            {/*showMattressProtectorScreen  */}
            {showMattressProtectorScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Mattress Protector</Text>
                        <FlatList
                        data={ formatData(MattressProtectorsProducts,numColums)}
                        renderItem={this.renderMattressProtectorsProducts}
                        numColumns={numColums}
                        />
                        <View style={styles.blankSpaceView}></View>
                </>)}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.MattressProtectorsProducts)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.offersProcedbtn} >
                            <Text style = {styles.nextbtnText} onPress={()=>this.props.navigation.navigate('Cart')} >Proceed To Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:70}}></View>
                    </ScrollView>
                </>)}
            </>)}

            <View style={styles.subMenuNaviLinksTabView}>
                <View style={styles.subMenuNaviLinksTabSpaceView}></View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
