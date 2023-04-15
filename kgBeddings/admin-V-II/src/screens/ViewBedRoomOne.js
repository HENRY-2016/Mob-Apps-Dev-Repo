
import React from 'react';
import { Text, View, TouchableOpacity,Dimensions, ScrollView} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {FontAwesome } from '@expo/vector-icons';
import styles from "./stylesheet";
import { WebView } from 'react-native-webview';
import { COLORS } from './Colours';

// APIs
import {URLViewBedRoomOneBeds,URLViewBedRoomOneBedSide,URLViewBedRoomOneBedSheets,URLViewBedRoomOneMattress,URLViewBedRoomOneProtector} from './DataFileApis';

const {width} = Dimensions.get("window");
const height = width * 7; 

export default class ViewBedRoomOne extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
                    WebViewUrlLink:'',
                    DoNotShowItemsListingScreen:false,
                    DoNotShowItemsWebViewScreen:true,
                    orientationIsLandScape:true,
    }
}

componentDidMount() {}

changeScreenOrientation =  async ()=>
{
    if (this.state.orientationIsLandScape == true)
        {ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);}
    else if (this.state.orientationIsLandScape == false)
        {ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);}
    
}
toggleOrientation = () =>
{
    this.setState({orientationIsLandScape:false});
    this.changeScreenOrientation();
} 

showItemsListingScreen = () => 
{
    this.setState({DoNotShowItemsWebViewScreen:true});
    this.setState({DoNotShowItemsListingScreen:false});
}

showItemsWebViewScreen = (UrlCall) => 
{
    this.setState({WebViewUrlLink:UrlCall});
    this.setState({DoNotShowItemsListingScreen:true});
    this.setState({DoNotShowItemsWebViewScreen:false});
}

renderItemWebViewScreen =() =>
{
    let URLLink = this.state.WebViewUrlLink;
    return (<WebView style={{height, backgroundColor:COLORS.colourNumberOne }} originWhitelist={['*']} source={{  uri:URLLink}}/>)
}
render() {
    
    const { DoNotShowItemsListingScreen,DoNotShowItemsWebViewScreen} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> BedRoom 1 :: View :: Items </Text>
                </View> 
            </View>


        {/* =================================================== */}
            <View style={{height:25}} ></View>
                <ScrollView>
                    <View style={styles.ordersDetailsBtnView}>
                        <TouchableOpacity onPress={this.toggleOrientation} style={styles.orientationBtn} >
                            <Text style={styles.orderdetailsBtnText} >-- Change Display --</Text> 
                        </TouchableOpacity>
                    </View>
                    <View style={{height:25}}></View>
                    {DoNotShowItemsListingScreen?(<></>):(<>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLViewBedRoomOneBeds)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: View : Beds Items </Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLViewBedRoomOneBedSide)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: View : Bed Sides Items</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLViewBedRoomOneBedSheets)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: View : Bed Sheets Items</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLViewBedRoomOneMattress)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: View : Mattress Items</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLViewBedRoomOneProtector)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: View : M-Protector Items</Text> 
                            </TouchableOpacity>
                        </View>
                    </>)}

                    {DoNotShowItemsWebViewScreen?(<></>):(<>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsListingScreen()}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} > Back  To Items Listing</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        {this.renderItemWebViewScreen()}

                    </>)}
                <View style={{height:15}}></View>
                </ScrollView>
        </View>
    );
}
}
