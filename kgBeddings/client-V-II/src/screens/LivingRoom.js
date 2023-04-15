
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert,FlatList, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { FlatList } from 'react-native-gesture-handler';
import {imageUrl,

        APILivingRoomCurtainsProducts, APILivingRoomSeatsProducts,
        APILivingRoomSideBoardsProducts, APILivingRoomTablesProducts,
        APILivingRoomCarpetsProducts, APILivingRoomIroningBoardProducts,

        APICurtainsDetailsById,APISeatsDetailsById,
        APISideBoardsDetailsById,APITablesDetailsById,
        APICarpetsDetailsById,APIIroningBoardDetailsById
        }from './DataFileApis';

import { COLORS } from './Colours';
import { formatData,numColumns,
    addItemsToCart,formatNumberWithComma,

    checkInternetConnection,noInternetConnectionView,
    renderItemDetailsViewUi,  openWhatsAppLink,
    } from './Functions';



export default class LivingRoom extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
            IsDeviceConnected:true,
            cartItemsIsLoading: false,
            cartItems:[],
            NumberOfItems:'',
            CurrentNameItemList:[],
            CurrentDetailsApiToBeCalled:'',
            ActiveTab1:true,ActiveTab2:false,
            ActiveTab3:false,ActiveTab4:false,
            ActiveTab5:false,ActiveTab6:false,

            // products
            LivingRoomCurtainsData:[],LivingRoomSeatsData:[],
            LivingRoomSideBoardsData:[],LivingRoomTablesData:[],
            LivingRoomCarpetsData:[],LivingRoomIroningBoardData:[],

            // screens
            showCurtainsScreen:false, // do not display empty view
            showSeatsScreen:true, // display empty view
            showSideBoardsScreen:true, // display empty view
            showTablesScreen:true, // display empty view
            showBridalSandalsScreen:true, // display empty view
            showCarpetsScreen:true, // display empty view
            showIroningBoardScreen:true, // display empty view



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
    this.numberOfCartItems();
    this.setState({CurrentDetailsApiToBeCalled:APICurtainsDetailsById});
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
LoadProductsItems = () =>{
        this.LoadInitialProductsItems();
        this.LoadAppItemsData(APILivingRoomCurtainsProducts,"LivingRoomCurtainsData");
        this.LoadAppItemsData(APILivingRoomSeatsProducts,"LivingRoomSeatsData");
        this.LoadAppItemsData(APILivingRoomSideBoardsProducts,"LivingRoomSideBoardsData");
        this.LoadAppItemsData(APILivingRoomTablesProducts,"LivingRoomTablesData");
        this.LoadAppItemsData(APILivingRoomCarpetsProducts,"LivingRoomCarpetsData");
        this.LoadAppItemsData(APILivingRoomIroningBoardProducts,"LivingRoomIroningBoardData");
};
LoadInitialProductsItems = () =>
{
    axios.get(APILivingRoomCurtainsProducts)
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
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

///                     Rendering Screens

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


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
                            this.setState({CurrentNameItemList:this.state.LivingRoomCurtainsData})
                            this.setState({CurrentDetailsApiToBeCalled:APICurtainsDetailsById});
                            this.setState({ActiveTab1:true});this.setState({ActiveTab2:false});
                            this.setState({ActiveTab3:false});this.setState({ActiveTab4:false});
                            this.setState({ActiveTab5:false});this.setState({ActiveTab6:false});
                        }}>
                    {this.state.ActiveTab1?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/livingroom/curtains.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Curtains</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/livingroom/curtains.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Curtains</Text>
                    </>)}
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
                            this.setState({CurrentNameItemList:this.state.LivingRoomSeatsData})
                            this.setState({CurrentDetailsApiToBeCalled:APISeatsDetailsById});
                            this.setState({ActiveTab1:false});this.setState({ActiveTab2:true});
                            this.setState({ActiveTab3:false});this.setState({ActiveTab4:false});
                            this.setState({ActiveTab5:false});this.setState({ActiveTab6:false});
                        }}>
                    {this.state.ActiveTab2?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/livingroom/seats.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Seats</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/livingroom/seats.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Seats</Text>
                    </>)}
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
                        this.setState({CurrentNameItemList:this.state.LivingRoomSideBoardsData})
                        this.setState({CurrentDetailsApiToBeCalled:APISideBoardsDetailsById});
                        this.setState({ActiveTab1:false});this.setState({ActiveTab2:false});
                        this.setState({ActiveTab3:true});this.setState({ActiveTab4:false});
                        this.setState({ActiveTab5:false});this.setState({ActiveTab6:false});
                    }}>
                {this.state.ActiveTab3?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/livingroom/sideboard.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Sides</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/livingroom/sideboard.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Sides</Text>
                </>)}
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
                        this.setState({CurrentNameItemList:this.state.LivingRoomTablesData})
                        this.setState({CurrentDetailsApiToBeCalled:APITablesDetailsById});
                        this.setState({ActiveTab1:false});this.setState({ActiveTab2:false});
                        this.setState({ActiveTab3:false});this.setState({ActiveTab4:true});
                        this.setState({ActiveTab5:false});this.setState({ActiveTab6:false});
                    }}>
                {this.state.ActiveTab4?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/livingroom/table.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Tables</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/livingroom/table.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Tables</Text>
                </>)}
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
                    this.setState({CurrentNameItemList:this.state.LivingRoomCarpetsData})
                    this.setState({CurrentDetailsApiToBeCalled:APICarpetsDetailsById});
                    this.setState({ActiveTab1:false});this.setState({ActiveTab2:false});
                    this.setState({ActiveTab3:false});this.setState({ActiveTab4:false});
                    this.setState({ActiveTab5:true});this.setState({ActiveTab6:false});
                }}>
            {this.state.ActiveTab5?(<>
                <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/livingroom/carpet.png')}/> 
                <Text  style={ styles.ActiveSubMenuNavLinksText}>Carpets</Text>
            </>):(<>
                <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/livingroom/carpet.png')}/> 
                <Text  style={ styles.subMenuNavLinksText}>Carpets</Text>
            </>)}
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
                    this.setState({CurrentNameItemList:this.state.LivingRoomIroningBoardData})
                    this.setState({CurrentDetailsApiToBeCalled:APIIroningBoardDetailsById});
                    this.setState({ActiveTab1:false});this.setState({ActiveTab2:false});
                    this.setState({ActiveTab3:false});this.setState({ActiveTab4:false});
                    this.setState({ActiveTab5:false});this.setState({ActiveTab6:true});
                }}>
            {this.state.ActiveTab6?(<>
                <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/livingroom/ironing.png')}/> 
                <Text  style={ styles.ActiveSubMenuNavLinksText}>Ironing</Text>
            </>):(<>
                <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/livingroom/ironing.png')}/> 
                <Text  style={ styles.subMenuNavLinksText}>Ironing</Text>
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
    
    const {IsDeviceConnected,ItemIndex, NumberOfItems,DetailsName,DetailsShortText,DetailsAmount,DetailsLongText} = this.state;
    const {showCurtainsScreen, showSeatsScreen,showSideBoardsScreen,showTablesScreen,showCarpetsScreen, showIroningBoardScreen} = this.state;
    const {LivingRoomCurtainsData,LivingRoomSeatsData,LivingRoomSideBoardsData,LivingRoomTablesData,LivingRoomCarpetsData,LivingRoomIroningBoardData} = this.state;
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

        {IsDeviceConnected ?(<>
            {/* showCurtainsScreen */}
            {showCurtainsScreen ? <></> :(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(LivingRoomCurtainsData,numColumns)}
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

            {/* showSeatsScreen  */}
            {showSeatsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(LivingRoomSeatsData,numColumns)}
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

             {/*showSideBoardsScreen  */}
            {showSideBoardsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                        <FlatList
                        data={ formatData(LivingRoomSideBoardsData,numColumns)}
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

            {/*showTablesScreen  */}
            {showTablesScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(LivingRoomTablesData,numColumns)}
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


            {/*showCarpetsScreen  */}
            {showCarpetsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                        <FlatList
                        data={ formatData(LivingRoomCarpetsData,numColumns)}
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

            {/*showIroningBoardScreen  */}
            {showIroningBoardScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                        <FlatList
                        data={ formatData(LivingRoomIroningBoardData,numColumns)}
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
                    <this.viewCurtainsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewSeatsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewSideBoardsScreen  size={90} color={COLORS.subLinkNavColor}/>
                    <this.viewTablesScreen size={90} color={COLORS.subLinkNavColor} /> 
                    <this.viewCarpetsScreen size={90} color={COLORS.subLinkNavColor} /> 
                    <this.viewIroningBoardScreen size={90} color={COLORS.subLinkNavColor} /> 
                </ScrollView>
            </View>
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
