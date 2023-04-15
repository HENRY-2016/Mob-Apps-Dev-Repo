
import React from 'react';
import { Text,Image, View, TouchableOpacity,Alert,FlatList,ScrollView} from 'react-native';
import {FontAwesome,Ionicons } from '@expo/vector-icons';
import axios from "axios";
import styles from "./stylesheet";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {imageUrl,

        APIBedRoomClosetProducts,APIBedRoomShoeRackProducts,
        APIBedRoomMirrorsProducts, APIBedRoomNightWareProducts,
        APIBedRoomSandalsProducts,

        APIClosetDetailsById,APIShoeRackDetailsById,
        APIMirrorsDetailsById,APINightWareDetailsById,
        APISandalsDetailsById
        } from './DataFileApis';

import { COLORS } from './Colours';
import { formatData,numColumns,
    addItemsToCart,formatNumberWithComma,

    checkInternetConnection,noInternetConnectionView,
    renderItemDetailsViewUi,  openWhatsAppLink,
    } from './Functions';

import { 
        // BedRoomThreeClosetData, BedRoomThreeShoeRackData,
        // BedRoomThreeMirrorsData, BedRoomThreeNightWareData,
        // BedRoomThreeSandalsData,

        // LoadBedRoomThreeClosetData,LoadBedRoomThreeShoeRackData,
        // LoadBedRoomThreeMirrorsData,LoadBedRoomThreeNightWareData,
        // LoadBedRoomThreeSandalsData,
        BedRoomThreeItemsData
        } from './AppDataFile';



export default class BedRoomThree extends React.Component {
    
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
            showClosetScreen:false, // do not display empty view
            showShoeRackScreen:true, // display empty view
            showNightWareScreen:true, // display empty view
            showSandalsScreen:true, // display empty view
            showDressingMirrorsScreen:true, // display empty view

            // products
            BedRoomThreeClosetData:[], BedRoomThreeShoeRackData:[],
            BedRoomThreeMirrorsData:[], BedRoomThreeNightWareData:[],
            BedRoomThreeSandalsData:[],

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
UNSAFE_componentWillMount() {
    this.LoadProductsItems();
    checkInternetConnection().then(Status=> {
        this.setState({IsDeviceConnected:Status})})
}

componentDidMount(){
    this.setState({CurrentDetailsApiToBeCalled:APIClosetDetailsById});
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
    this.LoadAppItemsData(APIBedRoomClosetProducts,"BedRoomThreeClosetData");
    this.LoadAppItemsData(APIBedRoomShoeRackProducts,"BedRoomThreeShoeRackData");
    this.LoadAppItemsData(APIBedRoomMirrorsProducts,"BedRoomThreeMirrorsData");
    this.LoadAppItemsData(APIBedRoomNightWareProducts,"BedRoomThreeNightWareData");
    this.LoadAppItemsData(APIBedRoomSandalsProducts,"BedRoomThreeSandalsData");
};
LoadInitialProductsItems = () =>
{
    axios.get(APIBedRoomClosetProducts)
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


viewClosetScreen = (props) => {
        return (
                <>
                    <View
                    style={{
                        height: props.size,width: props.size,
                        backgroundColor: props.color,
                    }}
                    >
                    <TouchableOpacity  onPress={() => {
                            this.setState({showShoeRackScreen:true});
                            this.setState({showNightWareScreen:true});
                            this.setState({showSandalsScreen:true});
                            this.setState({showDressingMirrorsScreen:true});
                            this.setState({showClosetScreen:false});
                            this.setState({CurrentNameItemList:this.state.BedRoomThreeClosetData})
                            this.setState({CurrentDetailsApiToBeCalled:APIClosetDetailsById});
                            this.setState({ActiveTab1:true});
                            this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                            this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                        }}>
                    {this.state.ActiveTab1?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomThree/closet.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Closets</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomThree/closet.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Closets</Text>
                    </>)}
                </TouchableOpacity>
                </View>
            </>
        );
        };
viewShoeRackScreen = (props) => {
    return (
            <>
                <View
                style={{
                    height: props.size,width: props.size,
                    backgroundColor: props.color,
                }}
                >
                <TouchableOpacity  onPress={() => {
                            this.setState({showNightWareScreen:true});
                            this.setState({showSandalsScreen:true});
                            this.setState({showDressingMirrorsScreen:true});
                            this.setState({showClosetScreen:true});
                            this.setState({showShoeRackScreen:false});
                            this.setState({CurrentNameItemList:this.state.BedRoomThreeShoeRackData})
                            this.setState({CurrentDetailsApiToBeCalled:APIShoeRackDetailsById});
                            this.setState({ActiveTab1:false});
                            this.setState({ActiveTab2:true});this.setState({ActiveTab3:false});
                            this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                        }}>
                    {this.state.ActiveTab2?(<>
                        <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomThree/shoe.png')}/> 
                        <Text  style={ styles.ActiveSubMenuNavLinksText}>Racks</Text>
                    </>):(<>
                        <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomThree/shoe.png')}/> 
                        <Text  style={ styles.subMenuNavLinksText}>Racks</Text>
                    </>)}
            </TouchableOpacity>
            </View>
        </>
    );
    };

viewNightWareScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showDressingMirrorsScreen:true});
                        this.setState({showClosetScreen:true});
                        this.setState({showShoeRackScreen:true});
                        this.setState({showSandalsScreen:true});
                        this.setState({showNightWareScreen:false});
                        this.setState({CurrentNameItemList:this.state.BedRoomThreeNightWareData})
                        this.setState({CurrentDetailsApiToBeCalled:APINightWareDetailsById});
                        this.setState({ActiveTab1:false});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:true});
                        this.setState({ActiveTab4:false});this.setState({ActiveTab5:false});
                    }}>
                {this.state.ActiveTab3?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomThree/night.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Wears</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomThree/night.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Wears</Text>
                </>)}
        </TouchableOpacity>
        </View>
    );
    };

viewSandalsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                        this.setState({showNightWareScreen:true});
                        this.setState({showClosetScreen:true});
                        this.setState({showShoeRackScreen:true});
                        this.setState({showDressingMirrorsScreen:true});
                        this.setState({showSandalsScreen:false});
                        this.setState({CurrentNameItemList:this.state.BedRoomThreeSandalsData})
                        this.setState({CurrentDetailsApiToBeCalled:APISandalsDetailsById});
                        this.setState({ActiveTab1:false});
                        this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                        this.setState({ActiveTab4:true});this.setState({ActiveTab5:false});
                    }}>
                {this.state.ActiveTab4?(<>
                    <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomThree/sandals.png')}/> 
                    <Text  style={ styles.ActiveSubMenuNavLinksText}>Sandals</Text>
                </>):(<>
                    <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomThree/sandals.png')}/> 
                    <Text  style={ styles.subMenuNavLinksText}>Sandals</Text>
                </>)}
        </TouchableOpacity>
        </View>
    );
    };

viewMirrorsScreen = (props) => {
    return (
        <View
        style={{
            height: props.size,width: props.size,
            backgroundColor: props.color,
        }}
        >
        <TouchableOpacity  onPress={() => {
                    this.setState({showClosetScreen:true});
                    this.setState({showShoeRackScreen:true});
                    this.setState({showSandalsScreen:true});
                    this.setState({showNightWareScreen:true});
                    this.setState({showDressingMirrorsScreen:false});
                    this.setState({CurrentNameItemList:this.state.BedRoomThreeMirrorsData})
                    this.setState({CurrentDetailsApiToBeCalled:APIMirrorsDetailsById});
                    this.setState({ActiveTab1:false});
                    this.setState({ActiveTab2:false});this.setState({ActiveTab3:false});
                    this.setState({ActiveTab4:false});this.setState({ActiveTab5:true});
                }}>
            {this.state.ActiveTab5?(<>
                <Image style={[styles.ActiveIconTintColor]} source={require('../imgs/bedroom/bedRoomThree/mirror.png')}/> 
                <Text  style={ styles.ActiveSubMenuNavLinksText}>Mirrors</Text>
            </>):(<>
                <Image style={styles.subMenuNavLinksMainIcons} source={require('../imgs/bedroom/bedRoomThree/mirror.png')}/> 
                <Text  style={ styles.subMenuNavLinksText}>Mirrors</Text>
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
    
    const { IsDeviceConnected,NumberOfItems,ItemIndex,DetailsName,DetailsShortText,DetailsAmount,DetailsLongText} = this.state;
    const {showClosetScreen, showShoeRackScreen,showNightWareScreen,showSandalsScreen,showDressingMirrorsScreen} = this.state;
    const {BedRoomThreeClosetData,BedRoomThreeShoeRackData,BedRoomThreeMirrorsData,BedRoomThreeNightWareData,BedRoomThreeSandalsData}= this.state;
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
                <Text style = { styles.productTopTitleName}> Bed Room Three </Text>
            </View>

            <View style={styles.mainCartView}>
                <TouchableOpacity style={styles.mainCartbtn} onPress={() => this.props.navigation.navigate('Cart')}>
                    <Ionicons name="ios-cart" size={25} style={styles.cartCartIncon} />
                    <Text  style={styles.mainCartNumberTxt}>{NumberOfItems}</Text>
                </TouchableOpacity>
            </View>
        </View>

        {IsDeviceConnected ?(<>
            {/* showClosetScreen */}
            {showClosetScreen ? <></> :(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomThreeClosetData,numColumns)}
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

            {/* showShoeRackScreen  */}
            {showShoeRackScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomThreeShoeRackData,numColumns)}
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

             {/*showNightWareScreen  */}
            {showNightWareScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomThreeNightWareData,numColumns)}
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

            {/*showSandalsScreen  */}
            {showSandalsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomThreeSandalsData,numColumns)}
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

            {/*showDressingMirrorsScreen  */}
            {showDressingMirrorsScreen ? <></>:(<>
                {DoNotShowDisplayScreen ? <></> :(<>
                    <FlatList
                    data={ formatData(BedRoomThreeMirrorsData,numColumns)}
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

            <View style={styles.subMenuNavLinksTabView}>
                <View style={styles.subMenuNavLinksTabSpaceView}></View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <this.viewClosetScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewShoeRackScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewMirrorsScreen size={90} color={COLORS.subLinkNavColor} />
                    <this.viewNightWareScreen  size={90} color={COLORS.subLinkNavColor}/>
                    <this.viewSandalsScreen size={90} color={COLORS.subLinkNavColor} /> 
                </ScrollView>
            </View>
            </>):(<>
                {noInternetConnectionView(this.refreshScreenNow)}
            </>)}
        </View>
    );
}
}
