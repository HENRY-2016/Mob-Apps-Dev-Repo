
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert,FlatList,ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';
import {imageUrl,
        APIBedRoomNetsProducts,APIBedRoomPillowsProducts,
        APIBedRoomCussionsProducts,APIBedRoomBedCoversProducts,
        APIBedRoomBlanketsProducts,

        APINetsDetailsById,APIPillowsDetailsById,
        APICussionsDetailsById,APIBedCoversDetailsById,
        APIBlanketsDetailsById
        } from './DataFileApis';

import { formatData,numColumns,
    addItemsToCart,formatNumberWithComma,

    checkInternetConnection,noInternetConnectionView,
    renderItemDetailsViewUi,  openWhatsAppLink,
    } from './Functions';
    
export default class BedRoomTwo extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
        IsDeviceConnected:true,
        cartItemsIsLoading: false,
            cartItems:[],
            NumberOfItems:'',
            CurrentNameItemList:[],
            CurrentDetailsApiToBeCalled:'',
            ActiveTab1:true,
            ActiveTab2:false,ActiveTab3:false,
            ActiveTab4:false,ActiveTab5:false,

            // screens
            showNetsScreen:false, // do not display empty view
            showPillowsScreen:true, // display empty view
            showBedCoversScreen:true, // display empty view
            showBlanketsScreen:true, // display empty view
            showCussionsScreen:true, // display empty view

            // Products
            BedRoomTwoNetsData:[],BedRoomTwoPillowsData:[],
            BedRoomTwoCussionsData:[],BedRoomTwoBedCoversData:[],
            BedRoomTwoBlanketsData:[],
            

            DoNotShowDisplayScreen: false,
            DoNotShowItemDetailsScreen: true,

            ItemDetails:[],
            DetailsName:'',
            DetailsShortText:'',
            DetailsLongText:'',
            DetailsAmount:'',
            ItemIndex:'',
    }

    
}
UNSAFE_componentWillMount () {
    this.LoadProductsItems();
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}

componentDidMount(){
    this.setState({CurrentDetailsApiToBeCalled:APINetsDetailsById});
    this.numberOfCartItems();
}
refreshScreenNow = () =>{checkInternetConnection().then(Status=> {
    this.LoadProductsItems();this.setState({IsDeviceConnected:Status})})}


componentWillUnmount(){clearInterval(this.numberOfCartItems)}
numberOfCartItems = ()=>{ setInterval(this.getNumberOfItems,1000);}
getNumberOfItems = () => 
{
    try 
    {   AsyncStorage.getItem ('NumberOfItems')
        .then(value =>{if (value != null){this.setState({NumberOfItems:value})}})
    }catch (error) { console.log(error)}
};
LoadProductsItems = () =>{
    this.LoadInitialProductsItems();
    this.LoadAppItemsData(APIBedRoomNetsProducts,"BedRoomTwoNetsData");
    this.LoadAppItemsData(APIBedRoomPillowsProducts,"BedRoomTwoPillowsData");
    this.LoadAppItemsData(APIBedRoomCussionsProducts,"BedRoomTwoCussionsData");
    this.LoadAppItemsData(APIBedRoomBedCoversProducts,"BedRoomTwoBedCoversData");
    this.LoadAppItemsData(APIBedRoomBlanketsProducts,"BedRoomTwoBlanketsData");
};
LoadInitialProductsItems = () =>
{
    axios.get(APIBedRoomNetsProducts)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        this.setState({CurrentNameItemList:jsonResults})
        })
    .catch(err=>{console.log(err);})
}
LoadAppItemsData = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        this.setState({[StateName]:jsonResults})
        })
    .catch(err=>{console.log(err);})
}
getDetailsOptions = (APICall,id) =>
{
    axios.get(APICall+id)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(imageUrl+jsonResults[0].image1)
        imageSlider.push(imageUrl+jsonResults[0].image2)
        imageSlider.push(imageUrl+jsonResults[0].image3)
        imageSlider.push(imageUrl+jsonResults[0].image4)
        imageSlider.push(imageUrl+jsonResults[0].image5)
        
        this.setState({ItemDetails:[...imageSlider]})
        this.setState({DetailsName:jsonResults[0].Name});
        this.setState({DetailsAmount:jsonResults[0].Amount});
        this.setState({DetailsShortText:jsonResults[0].ShortText});
        this.setState({DetailsLongText:jsonResults[0].LongText});
        })
    .catch()
}
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
displayItemDetailsScreen = (APICall,id,index) =>
{
    this.getDetailsOptions(APICall,id);
    this.setState({ItemIndex:index})
    setTimeout(this.showItemDetailsScreen,1000)
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Rendering Screens 

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

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
                        this.setState({CurrentNameItemList:this.state.BedRoomTwoNetsData})
                        this.setState({CurrentDetailsApiToBeCalled:APINetsDetailsById});
                        this.setState({ActiveTab1:true});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                        this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                    }}>
                {this.state.ActiveTab1?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomTwo/nets.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Nets</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomTwo/nets.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Nets</Text>
                </>)}
            </TouchableOpacity>
            </View>
        </>
    );};

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
                            this.setState({CurrentNameItemList:this.state.BedRoomTwoPillowsData})
                            this.setState({CurrentDetailsApiToBeCalled:APIPillowsDetailsById});
                            this.setState({ActiveTab1:false});
                            this.setState({ActiveTab2:true});this.setState({ActiveTab3:false});
                            this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                        }}>
                {this.state.ActiveTab2?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomTwo/pillows.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Pillows</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomTwo/pillows.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Pillows</Text>
                </>)}
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
                        this.setState({CurrentNameItemList:this.state.BedRoomTwoBedCoversData})
                        this.setState({CurrentDetailsApiToBeCalled:APIBedCoversDetailsById});
                        this.setState({ActiveTab1:false});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:true});
                        this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                    }}>
                {this.state.ActiveTab3?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomTwo/cover.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Covers</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomTwo/cover.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Covers</Text>
                </>)}
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
                        this.setState({CurrentNameItemList:this.state.BedRoomTwoBlanketsData})
                        this.setState({CurrentDetailsApiToBeCalled:APIBlanketsDetailsById});
                        this.setState({ActiveTab1:false});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                        this.setState({ActiveTab4:true});this.setState({ActiveTab5:false});
                    }}>
                {this.state.ActiveTab4?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomTwo/blanket.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Blankets</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomTwo/blanket.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Blankets</Text>
                </>)}
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
                    this.setState({CurrentNameItemList:this.state.BedRoomTwoCussionsData})
                    this.setState({CurrentDetailsApiToBeCalled:APICussionsDetailsById});
                    this.setState({ActiveTab1:false});
                    this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                    this.setState({ActiveTab4:false});this.setState({ActiveTab5:true});
                }}>
                {this.state.ActiveTab5?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomTwo/cussions.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Cussions</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomTwo/cussions.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Cussions</Text>
                </>)}
        </TouchableOpacity>
        </View>
    );
};

renderItemsUI = ({item,index}) => 
{
    if (item.empty === true)
        { return <View style={[styles.ItemInvisible]}></View> }
    return (
        <View style={styles.homeCardView2}>
            <TouchableOpacity onPress={()=>this.displayItemDetailsScreen(this.state.CurrentDetailsApiToBeCalled,item.id,index)}>
                <Image source={{uri: imageUrl+item.image}} style={styles.productImage} />
            </TouchableOpacity> 
            

            <View style={styles.productTextView}>
                <Text numberOfLines={1} style={styles.productText}> {item.Name}</Text>
                <View style={{height:5}} ></View>
                <Text numberOfLines={1} style={styles.productText}> {item.ShortText}</Text>
                <View style={{height:5}} ></View>
                <Text numberOfLines={1} style={styles.productText}> UGX : {formatNumberWithComma(item.Amount)}</Text>
                
                <View style={{height:8}} ></View>
                <View style={styles.whatsAppView}>
                    <TouchableOpacity onPress={openWhatsAppLink} >
                        <FontAwesome style={styles.whatsAppIcon} name="whatsapp" size={24} color={COLORS.whatsAppColor} />
                        <Text  style={styles.whatsAppText}>WhatsApp Us </Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:8}} ></View>
            </View>

            <View style={styles.homeOrderBtnView}>
                <View style={[styles.centerElement, styles.homeOrderBtn]}>
                    <TouchableOpacity style={styles.homeOrdersBtn} onPress={()=>addItemsToCart(index,this.state.CurrentNameItemList)} >
                        <Text style = { styles.homeOrdersTxt}> Add to cart </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
    )
}
render() {
    
    const {IsDeviceConnected,NumberOfItems,ItemIndex,DetailsName,DetailsShortText,DetailsAmount,DetailsLongText} = this.state;
    const {showNetsScreen, showPillowsScreen,showBedCoversScreen,showBlanketsScreen,showCussionsScreen} = this.state;
    const { BedRoomTwoNetsData,BedRoomTwoPillowsData,BedRoomTwoCussionsData,BedRoomTwoBedCoversData,BedRoomTwoBlanketsData}=this.state;
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

        {IsDeviceConnected ?(<>
            {/* showNetsScreen */}
            {showNetsScreen ? <></> :(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                        <FlatList
                        data={ formatData(BedRoomTwoNetsData,numColumns)}
                        renderItem={this.renderItemsUI} numColumns={numColumns}/>
                        <View style={styles.blankSpaceView}></View>
                </>)}
                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.CurrentNameItemList)}

                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProceedBtn} >
                                <Text style = {styles.nextBtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCEED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:60}}></View>
                    </ScrollView>
                </>)}
            </>)}

            {/* showPillowsScreen  */}
            {showPillowsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                        <FlatList
                        data={ formatData(BedRoomTwoPillowsData,numColumns)}
                        renderItem={this.renderItemsUI} numColumns={numColumns} />
                        <View style={styles.blankSpaceView}></View>
                </>)}
                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.CurrentNameItemList)}

                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProceedBtn} >
                                <Text style = {styles.nextBtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCEED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:60}}></View>
                    </ScrollView>
                </>)}
            </>)}

             {/*showBedCoversScreen  */}
            {showBedCoversScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomTwoBedCoversData,numColumns)}
                    renderItem={this.renderItemsUI} numColumns={numColumns} />
                    <View style={styles.blankSpaceView}></View>
                </>)}
                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.CurrentNameItemList)}

                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProceedBtn} >
                                <Text style = {styles.nextBtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCEED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:60}}></View>
                    </ScrollView>
                </>)}
            </>)}

            {/*showBlanketsScreen  */}
            {showBlanketsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomTwoBlanketsData,numColumns)}
                    renderItem={this.renderItemsUI} numColumns={numColumns} />
                    <View style={styles.blankSpaceView}></View>
                </>)}
                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.CurrentNameItemList)}

                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProceedBtn} >
                                <Text style = {styles.nextBtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCEED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:60}}></View>
                    </ScrollView>
                </>)}
            </>)}

            {/*showCussionsScreen  */}
            {showCussionsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomTwoCussionsData,numColumns)}
                    renderItem={this.renderItemsUI} numColumns={numColumns} />
                    <View style={styles.blankSpaceView}></View>
                </>)}
                {DoNotShowItemDetailsScreen ? <></>:(<>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        {renderItemDetailsViewUi (ItemDetails,DetailsName,DetailsShortText,DetailsLongText,DetailsAmount,
                            this.showItemDisplayScreen,ItemIndex,this.state.CurrentNameItemList)}

                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={styles.offersProceedBtn} >
                                <Text style = {styles.nextBtnText} onPress={()=>this.props.navigation.navigate('Cart')} >PROCEED</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:60}}></View>
                    </ScrollView>
                </>)}
            </>)}

            <View style={styles.subMenuNavLinksTabView}>
                <View style={styles.subMenuNavLinksTabSpaceView}></View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <this.viewNetsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewPillowsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewCussionsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewBedCoversScreen  size={90} color={COLORS.subLinkNavColor}/>
                    <this.viewBlanketsScreen size={90} color={COLORS.subLinkNavColor} /> 
                </ScrollView>
            </View>
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
