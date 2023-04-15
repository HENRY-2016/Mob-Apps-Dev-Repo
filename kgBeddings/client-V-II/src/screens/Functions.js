import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert,Text,ScrollView, View,Image,Linking,TouchableOpacity} from 'react-native';
import CustomSlider from './CustomSlider';
import NetInfo from '@react-native-community/netinfo';
import styles from "./stylesheet";
import {imageUrl} from './DataFileApis';
import OfflineIcon from '../imgs/offline.png'
export const numColumns = 2;

export const openPhoneMtnCallLink = async () => {await Linking.openURL('tel:0788666309');};
export const openPhoneAirTelCallLink1 = async () => {await Linking.openURL('tel:0704188834');};
export const openPhoneAirTelCallLink2 = async () => {await Linking.openURL('tel:0702811664');};
export const openTwitterLink = async () => {await Linking.openURL('https://twitter.com/kg_doctor57575');};
export const openYouTubeLink = async () => {await Linking.openURL('https://youtube.com/@doctorkgbeddings');};
export const openWhatsAppLink = async () => {await Linking.openURL('https://api.whatsapp.com/send/?phone=256704188834');};
export const openFaceBookLink = async () => {await Linking.openURL('https://www.facebook.com/profile.php?id=100090606652585');};
export const openInstagramLink = async () => {await Linking.openURL('https://instagram.com/doctor.kgbeddings?igshid=OTJhZDVkZWE=');};
export const openGoogleMapPinLink = async () => {await Linking.openURL("https://www.google.com/maps/place/0%C2%B018'41.5%22N+32%C2%B034'29.3%22E/@0.311519,32.5722192,17z/data=!3m1!4b1!4m4!3m3!8m2!3d0.311519!4d32.5747941");};



// https://instagram.com/doctor.kgbeddings?igshid=OTJhZDVkZWE=
// https://www.facebook.com/profile.php?id=100090606652585
// https://twitter.com/kg_doctor57575
// https://youtube.com/@doctorkgbeddings
// https://www.google.com/maps/place/0%C2%B018'41.5%22N+32%C2%B034'29.3%22E/@0.311519,32.5722192,17z/data=!3m1!4b1!4m4!3m3!8m2!3d0.311519!4d32.5747941

export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

export const formatData = (data,numColumns) =>
{
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !==0)
    {
        data.push({key:`blank-${numberOfElementsLastRow}`,empty:true});
        numberOfElementsLastRow = numberOfElementsLastRow +1;
    }
    return data;
}

// checkInternetConnection returns True Or False 
export const checkInternetConnection = () =>
{return NetInfo.fetch().then(state => {return (state.isConnected);});}

export const noInternetConnectionView = (TryAgainFunction)=>
{
    return(
        <View style={styles.OfflineMainView} >
            <View style={{height:40}} ></View>
            <Image source={OfflineIcon} style={styles.OfflineIcon} />
            <Text  style={styles.OfflineLabel}>No Internet Connection </Text>
            <View style={{height:40}} ></View>
            <TouchableOpacity style={styles.RefreshBtn} onPress={TryAgainFunction} >
                <Text  style={styles.RefreshLabel}>Try Again </Text>
            </TouchableOpacity>
            <View style={{height:40}} ></View>
        </View>
    );
}
export const renderItemDetailsViewUi = (ImagesList,Name,ShortText,LongText,Amount,BackToDisplayScreen,ItemIndex, ListOfItems) =>
{
    return(
            <View style={styles.ItemDetailsMainView}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <CustomSlider images={ImagesList} />
                    <View  style={styles.MainTextDetailsView}>
                        <View style={styles.TextDetailsView}>
                            <Text numberOfLines={1} style={styles.offersLabels}> {Name}</Text>
                            <Text numberOfLines={1} style={styles.TextDetails}> {ShortText}</Text>
                            <Text  numberOfLines={1} style={styles.TextDetails}> {LongText}</Text>
                            <Text  numberOfLines={1} style={styles.offersLabels}> UGX : {formatNumberWithComma(Amount)}</Text>
                        </View>
                    </View>

                    <View style={styles.offersBtnView}>
                        <TouchableOpacity style={styles.offersOrderBtn}  onPress={BackToDisplayScreen} >
                            <Text style = {styles.btnText} >Back</Text>
                        </TouchableOpacity>
                        <View style={{width:25}} ></View>
                        <TouchableOpacity style={styles.offersOrderBtn} onPress={()=>addItemsToCart(ItemIndex,ListOfItems)} >
                            <Text style = {styles.btnText}> Add to cart </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}}></View>
                </ScrollView>
            </View>
    );
}

export const addItemsToCart = (index,ProductsArray) => 
{
    const newItems = [...ProductsArray]; // clone the array
    console.log("=================================")
    // console.log( JSON.stringify(newItems))
    console.log("=================================")

    let product = newItems[index];
    let id = index;
    let name = product.Name;
    let status = product.ShortText;
    let amount = product.Amount;
    // let image = JSON.stringify(product.thumbnailImage);
    let image = product.image;
    let qty = 1;
    let itemcart={ id: id, name: name, status: status, amount: amount, qty:qty,image:image}
    // console.log("====="+JSON.stringify(itemcart))

    AsyncStorage.getItem('cartItems').then((datacart)=>{
            if (datacart !== null) 
            {
                // We have data!!
                const cart = JSON.parse(datacart)
                cart.push(itemcart)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                Alert.alert("Massage","Your Product Has Been \n\n Added To Cart");

            }
            else{
                const cart  = []
                cart.push(itemcart)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                Alert.alert("Massage","Your Product Has Been \n\n Added To Cart");
            }
        })
        .catch((err)=>{console.log(err)})

        // NumberOfItems
        AsyncStorage.getItem('NumberOfItems').then((number)=>{
            if (number !== null) 
            {
                // We have data!!
                const value = JSON.parse(number)
                let newnumber = parseInt(value) + 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
            }
            else{
                let newnumber = 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(newnumber));
            }
        })
        .catch((err)=>{console.log(err)})
}


