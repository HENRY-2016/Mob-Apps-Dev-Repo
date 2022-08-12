
import React from 'react';
import { Text,Image, View, TouchableOpacity, FlatList, Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { SliderBox } from "react-native-image-slider-box";
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

import { formatData,numColums,
    addItemsToCart,formatNumberWithComma
    } from './Functions';


export default class BathRoom extends React.Component {
    
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
            BathRoomBathRobsProducts:[],
            BathRoomTowelsProducts:[],
            BathRoomDoorMatsProducts:[],
            RoomBathroomCurtainsProducts:[],

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
    axios.get(APIBathRoomBathRobsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomBathRobsProducts:[...JSON.parse(results)]})
        })
    .catch(err=>{})


    axios.get(APIBathRoomTowelsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomTowelsProducts:[...JSON.parse(results)]})
        })
    .catch(err=>{})

    axios.get(APIBathRoomDoorMatsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomDoorMatsProducts:[...JSON.parse(results)]})
        })
    .catch(err=>{})

    axios.get(APIBathRoomCurtainsProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({BathRoomCurtainsProducts:[...JSON.parse(results)]})
        // console.log(this.state)
        // console.log("4 ==>"+results)
        })
    .catch(err=>{Alert.alert("Error","Can Not Load Products");})

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

///                     rendering items

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
renderBathRobsProducts = ({item,index}) => 
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
                        <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BathRoomBathRobsProducts)} >
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
                    <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BathRoomTowelsProducts)} >
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
                    <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BathRoomDoorMatsProducts)} >
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
                    <TouchableOpacity style={styles.homeordersbtn} onPress={()=>addItemsToCart(index,this.state.BathRoomCurtainsProducts)} >
                        <Text style = { styles.homeorderstxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
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
                            // this.setState({showBlanketsScreen:true});
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
                            // this.setState({showBlanketsScreen:true});
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
                        // this.setState({showBlanketsScreen:true});
                        this.setState({showShowerCurtainsScreen:false});
                    }}>
            <Image style={styles.subMenuNaviLinksMainIcones} source={require('../imgs/bathroom/curtains.png')}/> 
            <Text  style={ styles.subMenuNaviLinksText}>Shower Curtains</Text>
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
                    // this.setState({showBlanketsScreen:true});
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
    
    const {NumberOfItems} = this.state;
    const {showRobsScreen, showTowelsScreen,showShowerCurtainsScreen,showBlanketsScreen,showDoorMatsScreen} = this.state;
    const {BathRoomBathRobsProducts,BathRoomTowelsProducts,BathRoomDoorMatsProducts,BathRoomCurtainsProducts} = this.state;
    const {DoNotShowItemDetailsScreen,ItemIndex,DoNotShowDisplayScreen,ItemDetails} = this.state;

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
            {showRobsScreen ? <></> :(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <Text  style={styles.sublinksTitleTxt}>Robs </Text>
                        <FlatList
                        data={ formatData(BathRoomBathRobsProducts,numColums)}
                        renderItem={this.renderBathRobsProducts}
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

                            <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BathRoomBathRobsProducts)} >
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






            {/* showTowelsScreen  */}
            {showTowelsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <Text  style={styles.sublinksTitleTxt}>Towels </Text>
                    <FlatList
                    data={ formatData(BathRoomTowelsProducts,numColums)}
                    renderItem={this.renderTowelsProducts}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BathRoomTowelsProducts)} >
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

             {/*showShowerCurtainsScreen  */}
            {showShowerCurtainsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <Text  style={styles.sublinksTitleTxt}>Shower Curtains </Text>
                        <FlatList
                        data={ formatData(BathRoomCurtainsProducts,numColums)}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BathRoomCurtainsProducts)} >
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

            {/*showDoorMatsScreen  */}
            {showDoorMatsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <Text  style={styles.sublinksTitleTxt}>Door Mats</Text>
                        <FlatList
                        data={ formatData(BathRoomDoorMatsProducts,numColums)}
                        renderItem={this.renderDoorMatsProducts}
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

                        <TouchableOpacity style={styles.offersorderbtn} onPress={()=>addItemsToCart(ItemIndex,this.state.BathRoomDoorMatsProducts)} >
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
                    <this.viewRobsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewTowelsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewDoorMatsScreen size={100} color={COLORS.subLinkNaviColour} />
                    <this.viewShowerCurtainsScreen  size={130} color={COLORS.subLinkNaviColour}/>
                </ScrollView>
            </View>
        </View>
    );
}
}
