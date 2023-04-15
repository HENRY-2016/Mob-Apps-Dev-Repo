
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert, FlatList, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {    imageUrl,
            APIBedRoomBedsProducts, APIBedRoomBedSidesProducts,
            APIBedRoomBedSheetsProducts,APIBedRoomMattressProducts,
            APIBedRoomMattressProtectorsProducts,
        
            APIBedsDetailsById,APIBedSidesDetailsById,
            APIBedSheetsDetailsById,APIMattressDetailsById,
            APIMattressProtectorsDetailsById
        } from './DataFileApis';

import { COLORS } from './Colours';
import { formatData,numColumns,
    addItemsToCart,formatNumberWithComma,

    checkInternetConnection,noInternetConnectionView,
    renderItemDetailsViewUi,  openWhatsAppLink,
    } from './Functions';


export default class BedRoomOne extends React.Component {
    
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
            showBedsScreen:false, // do not display empty view
            showBedSidesScreen:true, // display empty view
            showBedSheetScreen:true, // display empty view
            showMattressScreen:true, // display empty view
            showMattressProtectorScreen:true, // display empty view

            // Products
            BedRoomOneBedsData:[],BedRoomOneBedSidesData:[],
            BedRoomOneBedSheetsData:[],BedRoomOneMattressData:[],
            BedRoomOneMattressProtectorsData:[],

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
    this.setState({CurrentDetailsApiToBeCalled:APIBedsDetailsById});
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
    this.LoadAppItemsData(APIBedRoomBedsProducts,"BedRoomOneBedsData");
    this.LoadAppItemsData(APIBedRoomBedSheetsProducts,"BedRoomOneBedSheetsData");
    this.LoadAppItemsData(APIBedRoomBedSidesProducts,"BedRoomOneBedSidesData");
    this.LoadAppItemsData(APIBedRoomMattressProducts,"BedRoomOneMattressData");
    this.LoadAppItemsData(APIBedRoomMattressProtectorsProducts,"BedRoomOneMattressProtectorsData");
};
LoadInitialProductsItems = () =>
{
    axios.get(APIBedRoomBedsProducts)
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
    console.log(APICall+id);
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
                            this.setState({CurrentNameItemList:this.state.BedRoomOneBedsData})
                            this.setState({CurrentDetailsApiToBeCalled:APIBedsDetailsById});
                            this.setState({ActiveTab1:true});
                            this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                            this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                        }}>
                    {this.state.ActiveTab1?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomOne/beds.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Beds</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomOne/beds.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Beds</Text>
                    </>)}
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
                            this.setState({CurrentNameItemList:this.state.BedRoomOneBedSidesData})
                            this.setState({CurrentDetailsApiToBeCalled:APIBedSidesDetailsById });
                            this.setState({ActiveTab1:false});
                            this.setState({ActiveTab2:true});this.setState({ActiveTab3:false});
                            this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                        }}>
                    {this.state.ActiveTab2?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomOne/side.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Sides</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomOne/side.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Sides</Text>
                    </>)}
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
                        this.setState({CurrentNameItemList:this.state.BedRoomOneMattressData})
                        this.setState({CurrentDetailsApiToBeCalled:APIMattressDetailsById});
                        this.setState({ActiveTab1:false});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:true});
                        this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                    }}>
                    {this.state.ActiveTab3?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomOne/mattress.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Mattress</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomOne/mattress.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Mattress</Text>
                    </>)}
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
                        this.setState({CurrentNameItemList:this.state.BedRoomOneMattressProtectorsData});
                        this.setState({CurrentDetailsApiToBeCalled:APIMattressProtectorsDetailsById});
                        this.setState({ActiveTab1:false});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                        this.setState({ActiveTab4:true});this.setState({ActiveTab5:false});
                    }}>
                    {this.state.ActiveTab4?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomOne/matprotector.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Protectors</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomOne/matprotector.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Protectors</Text>
                    </>)}
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
                    this.setState({CurrentNameItemList:this.state.BedRoomOneMattressData});
                    this.setState({CurrentDetailsApiToBeCalled:APIBedSheetsDetailsById});
                    this.setState({ActiveTab1:false});
                    this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                    this.setState({ActiveTab4:false});this.setState({ActiveTab5:true});
                }}>
                {this.state.ActiveTab5?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomOne/sheets.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Sheets</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomOne/sheets.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Sheets</Text>
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
    const {showBedsScreen, showBedSidesScreen,showBedSheetScreen,showMattressScreen,showMattressProtectorScreen} = this.state;
    const {DoNotShowItemDetailsScreen,DoNotShowDisplayScreen,ItemDetails} = this.state;
    const {BedRoomOneBedsData,BedRoomOneBedSidesData,BedRoomOneBedSheetsData,BedRoomOneMattressData,BedRoomOneMattressProtectorsData}=this.state;

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

        {IsDeviceConnected ?(<>
            {showBedsScreen ? <></> :(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomOneBedsData,numColumns)}
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


            {showBedSidesScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomOneBedSidesData,numColumns)}
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


            {showBedSheetScreen ? <></>:( <>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomOneBedSheetsData,numColumns)}
                    renderItem={this.renderItemsUI}numColumns={numColumns}/>
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


            {showMattressScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomOneMattressData,numColumns)}
                    renderItem={this.renderItemsUI}numColumns={numColumns}/>
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


            {showMattressProtectorScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomOneMattressProtectorsData,numColumns)}
                    renderItem={this.renderItemsUI}numColumns={numColumns}/>
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
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <this.viewBedsScreen size={100} color={COLORS.subLinkNavColor} />
                    <this.viewBedSideScreen size={100} color={COLORS.subLinkNavColor} />
                    <this.viewBedSheetsScreen size={100} color={COLORS.subLinkNavColor} />
                    <this.viewMattressScreen  size={100} color={COLORS.subLinkNavColor}/>
                    <this.viewMattressProtectorScreen size={148} color={COLORS.subLinkNavColor} /> 
                </ScrollView>
            </View>
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
