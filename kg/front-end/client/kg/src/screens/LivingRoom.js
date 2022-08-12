
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { SliderBox } from "react-native-image-slider-box";
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
import { formatData,numColums,
    addItemsToCart,formatNumberWithComma
    } from './Functions';





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
            ItemIndex:'',
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

///                     Rendering items 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

renderCurtainsProducts = ({item,index}) => 
    {
        if (item.empty === true)
            { return <View style={[styles.ItemInvisible]}></View> }
        return (
            <View style={styles.homeCardView2}>
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.homeproductImage} /> */}
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.CurtainsProducts)} >
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
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.homeproductImage} /> */}
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index, this.state.SeatsProducts)} >
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
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.homeproductImage} /> */}
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.SideBoardsProducts)} >
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
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.homeproductImage} /> */}
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.TablesProducts)} >
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.CarpetsProducts)} >
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
                <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(index)}>
                    <Image source={{uri: imageurl+item.image}} style={styles.homeproductImage} />
                    {/* <Image source={{uri: item.thumbnailImage}} style={styles.homeproductImage} /> */}
                </TouchableOpacity>

                <View style={styles.productTextView}>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Name}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {item.Description}</Text>
                    <Text numberOfLines={1} style={styles.producttext}> {formatNumberWithComma(item.Amount)}</Text>
                </View>

                <View style={styles.homeOrderbtnView}>
                    <View style={[styles.centerElement, styles.homeOrderBtn]}>
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.IroningBoardProducts)} >
                            <Text style = { styles.homeorderstxt}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
        )
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
    
    const {ItemIndex, NumberOfItems} = this.state;
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
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Curtains </Text>
                        <FlatList
                        data={ formatData(CurtainsProducts,numColums)}
                        renderItem={this.renderCurtainsProducts}
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

                    <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.CurtainsProducts)} >
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

            {/* showSeatsScreen  */}
            {showSeatsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                <Text  style={styles.sublinksTitleTxt}>Seats </Text>
                    <FlatList
                    data={ formatData(SeatsProducts,numColums)}
                    renderItem={this.renderSeatsProducts}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.SeatsProducts)} >
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

             {/*showSideBoardsScreen  */}
            {showSideBoardsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Side Board </Text>
                        <FlatList
                        data={ formatData(SideBoardsProducts,numColums)}
                        renderItem={this.renderSideBoardsProducts}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.SideBoardsProducts)} >
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

            {/*showTablesScreen  */}
            {showTablesScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Tables</Text>
                    <FlatList
                    data={ formatData(TablesProducts,numColums)}
                    renderItem={this.renderTablesProducts}
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

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.TablesProducts)} >
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


            {/*showCarpetsScreen  */}
            {showCarpetsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Carpets</Text>
                        <FlatList
                        data={ formatData(CarpetsProducts,numColums)}
                        renderItem={this.renderCarpetsProducts}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex, this.state.CarpetsProducts)} >
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

            {/*showIroningBoardScreen  */}
            {showIroningBoardScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <Text  style={styles.sublinksTitleTxt}>Ironing Boards</Text>
                        <FlatList
                        data={ formatData(IroningBoardProducts,numColums)}
                        renderItem={this.renderIroningBoardProducts}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.IroningBoardProducts)} >
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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
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
