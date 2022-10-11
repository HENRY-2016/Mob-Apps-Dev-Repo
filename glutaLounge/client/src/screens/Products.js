
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign } from '@expo/vector-icons';

import axios from "axios";
import {APIListProducts, ImageUrl} from './DataFileApis';

import { formatNumberWithComma,NetworkErrorMsg } from './Functions';

export default class Products extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ProductsItems:[],
    
            // Screens
            DoNotShowProductsScreen:false,
            DoNotShowInquiriesScreen:true,
            DoNotShowDetailsScreen:true,
            DoNotShowBookNowScreen:true,

            // customer
        }
        
    }

UNSAFE_componentWillMount ()
{
    axios.get(APIListProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({ProductsItems:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Internet Error",NetworkErrorMsg)})

}
componentDidMount() {}


showProductsScreen =  () =>
{
    this.setState({DoNotShowInquiriesScreen:true})
    this.setState({DoNotShowDetailsScreen:true})
    this.setState({DoNotShowBookNowScreen:true})
    this.setState({DoNotShowProductsScreen:false})
}

render() {
    
    const { ProductsItems} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={{height:20}} ></View>
            <ScrollView  showsVerticalScrollIndicator={false}>
            <View style={{height:70}} ></View>
                {ProductsItems && ProductsItems.map((item, index) => (
                    <View key={index}>
                    <View style={styles.ProductsCardMainListView}>

                        <View style={styles.ProductsImageView}>
                            <Image source={{uri: ImageUrl+item.Image}} style={styles.ProductsImage} />
                        </View>

                        <View style={styles.ProductsDescriptionMainView}>
                            <View style={[styles.ProductsTextView, styles.ProductsTextView1]}>
                                <Text  style={styles.ProductsTexts}> {formatNumberWithComma(item.Amount)}</Text>
                            </View>
                            <View style={[styles.ProductsTextView, styles.ProductsTextView2]}>
                                <Text  style={styles.ProductsTexts}> {item.Name}</Text>
                            </View>
                            <View style={[styles.ProductsTextView, styles.ProductsTextView3]}>
                                <Text style={styles.ProductsTexts}> {item.ShortText}</Text>
                            </View>
                        </View>

                        {/*================== Btns ================== */}
                        <View  style={{height:20}} ></View>
                        <View style={[styles.MainInquiriesDetailsBtnView]}>
                            <TouchableOpacity style={styles.InquiriesDetailsBtn}   >
								<Text style = {styles.btnText} >Inquiries</Text>
							</TouchableOpacity>
                            <View style={{width:10}} ></View>
							<TouchableOpacity style={styles.InquiriesDetailsBtn}  >
								<Text style = {styles.btnText}> Details </Text>
							</TouchableOpacity>
                        </View>
                        <View  style={{height:20}} ></View>
                        <View style={[styles.BookNowBtnView]}>
                            <TouchableOpacity style={styles.BookNowBtn}  >
                                <Text style = {styles.btnText}> Book Now </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height:20}}></View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
}
