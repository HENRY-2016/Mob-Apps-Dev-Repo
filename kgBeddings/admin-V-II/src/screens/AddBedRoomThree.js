
import React from 'react';
import { Text, View, TouchableOpacity,Dimensions, ScrollView} from 'react-native';
import {FontAwesome } from '@expo/vector-icons';
import styles from "./stylesheet";
import { WebView } from 'react-native-webview';
import { COLORS } from './Colours';

// APIs
import {URLAddBedRoomThreeClosets,URLAddBedRoomThreeShoeRack,URLAddBedRoomThreeMirrors,URLAddBedRoomThreeNightWear,URLAddBedRoomThreeSandals} from './DataFileApis';
const {width} = Dimensions.get("window");
const height = width * 2.8; 

export default class AddBedRoomThree extends React.Component {
    
constructor(props){
    
    super(props);
    this.state = {
                    WebViewUrlLink:'',
                    DoNotShowItemsListingScreen:false,
                    DoNotShowItemsWebViewScreen:true,
    }
}

componentDidMount() {}


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
    return (<WebView style={{height,width, backgroundColor:COLORS.colourNumberOne }} originWhitelist={['*']} source={{  uri:URLLink}}/>)
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
                    <Text style = { styles.productTopTitleName}> BedRoom3 :: Add :: Items </Text>
                </View> 
            </View>


        {/* =================================================== */}
            <View style={{height:25}} ></View>
                <ScrollView>
                    {DoNotShowItemsListingScreen?(<></>):(<>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLAddBedRoomThreeClosets)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: Add : Closets Items </Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLAddBedRoomThreeShoeRack)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: Add : Shoe Racks Items</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLAddBedRoomThreeMirrors)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: Add : Mirrors Items</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLAddBedRoomThreeNightWear)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: Add : Night Wear Items</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{height:25}}></View>
                        <View style={styles.ordersDetailsBtnView}>
                            <TouchableOpacity onPress={()=>{this.showItemsWebViewScreen(URLAddBedRoomThreeSandals)}} style={styles.productNameListingBtn} >
                                <Text style={styles.orderdetailsBtnText} >: Add : Sandals Items</Text> 
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
