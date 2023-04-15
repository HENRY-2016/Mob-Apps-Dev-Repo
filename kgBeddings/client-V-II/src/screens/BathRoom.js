
import React from 'react';
import { Text,Image, View, TouchableOpacity, FlatList, Alert, ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from './Colours';

// APIs
import {imageUrl,

        APIBathRoomBathRobsProducts,APIBathRoomCurtainsProducts,
        APIBathRoomTowelsProducts, APIBathRoomDoorMatsProducts,
        
        APIBathRobsDetailsById,APITowelsDetailsById,
        APIDoorMatsDetailsById,APIBathroomCurtainsDetailsById
    
    } from './DataFileApis';

import { formatData,numColumns,openWhatsAppLink,
        addItemsToCart,formatNumberWithComma,
        checkInternetConnection,noInternetConnectionView,
        renderItemDetailsViewUi, 
    } from './Functions';


export default class BathRoom extends React.Component {
    
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

            BathRoomBathRobsData:[],BathRoomTowelsData:[],
            BathRoomDoorMatsData:[],BathRoomCurtainsData:[],

            // screens
            showRobsScreen:false, // do not display empty view
            showTowelsScreen:true, // display empty view
            showShowerCurtainsScreen:true, // display empty view
            showDoorMatsScreen:true, // display empty view

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
    this.setState({CurrentDetailsApiToBeCalled:APIBathRobsDetailsById});
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
LoadProductsItems = () => {
    this.LoadInitialProductsItems();
    this.LoadAppItemsData(APIBathRoomBathRobsProducts,"BathRoomBathRobsData");
    this.LoadAppItemsData(APIBathRoomTowelsProducts,"BathRoomTowelsData");
    this.LoadAppItemsData(APIBathRoomDoorMatsProducts,"BathRoomDoorMatsData");
    this.LoadAppItemsData(APIBathRoomCurtainsProducts,"BathRoomCurtainsData");
};
LoadInitialProductsItems = () =>
{
    axios.get(APIBathRoomBathRobsProducts)
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
                            this.setState({showDoorMatsScreen:true});
                            this.setState({showRobsScreen:false});
                            this.setState({CurrentNameItemList:this.state.BathRoomBathRobsData})
                            this.setState({CurrentDetailsApiToBeCalled:APIBathRobsDetailsById});

                            this.setState({ActiveTab1:true});this.setState({ActiveTab2:false});
                            this.setState({ActiveTab3:false});this.setState({ActiveTab4:false});
                        }}>
                        {this.state.ActiveTab1?(<>
                            <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bathroom/bathrobes.png')}/> 
                            <Text  style={ styles.ActiveSubMenuNavLinksText}>Robs</Text>
                        </>):(<>
                            <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bathroom/bathrobes.png')}/> 
                            <Text  style={ styles.subMenuNavLinksText}>Robs</Text>
                        </>)}
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
                    backgroundColor: props.color}}>
                <TouchableOpacity  onPress={() => {
                            this.setState({showShowerCurtainsScreen:true});
                            this.setState({showDoorMatsScreen:true});
                            this.setState({showRobsScreen:true});
                            this.setState({showTowelsScreen:false});
                            this.setState({CurrentNameItemList:this.state.BathRoomTowelsData})
                            this.setState({CurrentDetailsApiToBeCalled:APITowelsDetailsById});

                            this.setState({ActiveTab1:false});this.setState({ActiveTab2:true});
                            this.setState({ActiveTab3:false});this.setState({ActiveTab4:false});
                        }}>

                    {this.state.ActiveTab2?(<>
                            <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bathroom/towel.png')}/> 
                            <Text  style={ styles.ActiveSubMenuNavLinksText}>Towels</Text>
                        </>):(<>
                            <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bathroom/towel.png')}/> 
                            <Text  style={ styles.subMenuNavLinksText}>Towels</Text>
                    </>)}
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
                        this.setState({showShowerCurtainsScreen:false});
                        this.setState({CurrentNameItemList:this.state.BathRoomCurtainsData})
                        this.setState({CurrentDetailsApiToBeCalled:APIBathroomCurtainsDetailsById});

                        this.setState({ActiveTab1:false});this.setState({ActiveTab2:false});
                        this.setState({ActiveTab3:true});this.setState({ActiveTab4:false});
                    }}>
                {this.state.ActiveTab3?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bathroom/curtains.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Curtains</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bathroom/curtains.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Curtains</Text>
                </>)}
        </TouchableOpacity>
        </View>
    );};



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
                    this.setState({showShowerCurtainsScreen:true});
                    this.setState({showDoorMatsScreen:false});
                    this.setState({CurrentNameItemList:this.state.BathRoomDoorMatsData})
                    this.setState({CurrentDetailsApiToBeCalled:APIDoorMatsDetailsById});
                    this.setState({ActiveTab1:false});this.setState({ActiveTab2:false});
                    this.setState({ActiveTab3:false});this.setState({ActiveTab4:true});
                }}>

                {this.state.ActiveTab4?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bathroom/matt.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Mats</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bathroom/matt.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Mats</Text>
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
    
    const {IsDeviceConnected,NumberOfItems,DetailsName,DetailsShortText,DetailsAmount,DetailsLongText} = this.state;
    const {showRobsScreen, showTowelsScreen,showShowerCurtainsScreen,showDoorMatsScreen} = this.state;
    const {DoNotShowItemDetailsScreen,ItemIndex,DoNotShowDisplayScreen,ItemDetails} = this.state;
    const {BathRoomBathRobsData,BathRoomTowelsData,BathRoomDoorMatsData,BathRoomCurtainsData}=this.state;

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

        
        {IsDeviceConnected ?(<>
            {showRobsScreen ? <></> :(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <FlatList
                    data={ formatData(BathRoomBathRobsData,numColumns)}
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


            {showTowelsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <FlatList
                    data={ formatData(BathRoomTowelsData,numColumns)}
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

            {showShowerCurtainsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <FlatList
                    data={ formatData(BathRoomCurtainsData,numColumns)}
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


            {showDoorMatsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ?<></> : (<>
                    <FlatList
                    data={ formatData(BathRoomDoorMatsData,numColumns)}
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
                    <this.viewRobsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewTowelsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewDoorMatsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewShowerCurtainsScreen  size={90} color={COLORS.subLinkNavColor}/>
                </ScrollView>
            </View>
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
