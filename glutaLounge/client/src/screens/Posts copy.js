
import React from 'react';
import { Text, View, Alert,TextInput,Dimensions,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import {APISliderImages,APIListPosts} from './DataFileApis';
import { NetworkErrorMsg } from './Functions';
import { COLORS } from './Colours';
const {width} = Dimensions.get("window");
const height = width * 0.6; 
export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                ActiveSliderDot:0,
                images:[],
                PotsItems:[],
            // Screens
        
        }
        
    }

    UNSAFE_componentWillMount ()
    {
        // slider images
    axios.get(APISliderImages)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let Url = "http://mogahenze.com:9595/images/";
        let jsonresults =JSON.parse(results); 
        let imageSiliders = [];
        for (i=0; i<jsonresults.length; i++)
            {
                
                let  image = Url+jsonresults[i].image;
                console.log(image)
                imageSiliders.push(image)
            }
        this.setState({images:[...imageSiliders]})
        console.log(this.state.images);
        })
    .catch(err=>{console.log(err)})

    axios.get(APIListPosts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PotsItems:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Internet Error",NetworkErrorMsg)})


    }
    componentDidMount() {}
    
    change = ({nativeEvent}) =>
    {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.ActiveSliderDot){this.setState({ActiveSliderDot:slide})}
    }

    
    render() {
        
        const { images, PotsItems} = this.state;
    
        return (
            
            <View style={styles.mainView}>
                {/* <View style={styles.MainHomeImageSliderView}>
                        <View style={styles.HomeImageSliderView}>
                            <View style={{height:20}}></View>
                            <SliderBox style={styles.HomeImageSliderView}
                                images={this.state.images}
                                sliderBoxHeight={240}
                                dotColor= {COLORS.white} inactiveDotColor={COLORS.MainColorOne}
                                paginationBoxVerticalPadding={10}
                                autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                dotStyle={styles.ImageSliderDotStyle}
                                ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                imageLoadingColor={COLORS.MainColorOne}
                                /> 
                        </View> 
                    </View> */}

                    <View style={{marginTop:20}}>
                        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={this.change} style={{width,height}}>
                            {images && images.map((image,index) =>(
                                
                                <Image key={index} source={{uri: image}} style={{width,height, borderColor:COLORS.MainColorOne,borderWidth: 5,resizeMode:'cover'}} />
                                
                            ))}
                        </ScrollView>
                        <View  style={styles.SliderImageDotView}>
                            {images && images.map((item,index) =>(
                                <Text key={index} style={ index==this.state.ActiveSliderDot? styles.SliderImageActiveDotText:styles.SliderImageDotText}>⬤</Text>
                            ))}
                        </View>
                    </View>
                    {/* <View>
                    <Image source={{uri:"http://mogahenze.com:9595/images/732914346.PNG"}} style={{width:'95%',height:200, marginLeft:10, marginRight:10 }} />
                    </View> */}
    
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <View style={{height:50}} ></View>

                    {PotsItems && PotsItems.map((item, index) => (
                        <View key={index}>
                            <View style={[styles.PostsMainRowView]}>

                            <View style={styles.PostsImageDetailsView}>
                                <View style={styles.PostsImageView}>

                                {/* <TouchableOpacity> */}
                                    {/* <Image source={{uri: ImageUrl+item.image}} style={styles.PostsImage} /> */}
                                    {/* <Image source={{uri:"http://mogahenze.com:9595/images/732914346.PNG"}} style={styles.PostsImage} /> */}


                                {/* </TouchableOpacity> */}
                                </View>

                                <View style={styles.PostsDetailsView}>
                                    <Text style = {[styles.PostsTexts]}> {item.Name} </Text>
                                </View>
                            </View>

                            <View style={[styles.PostsMainRowBtnView]}>
                                
                                <TouchableOpacity style={styles.PostsMainBtn}   >
                                    <Text style = {styles.btnText} >Play</Text>
                                </TouchableOpacity>
                                <View style={{width:5}} ></View>
                                <TouchableOpacity style={styles.PostsMainBtn} onPress={()=>addItemsToCart(index,this.state.cartItems)} >
                                    <Text style = {styles.btnText}> Comment </Text>
                                </TouchableOpacity>
                                <View style={{width:5}} ></View>
                                <TouchableOpacity style={styles.PostsMainBtn} onPress={()=>addItemsToCart(index,this.state.cartItems)} >
                                    <Text style = {styles.btnText}> Like </Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            <View style={{height:20}} ></View>
                        </View>
                    ))}
            </ScrollView>

            </View>
        );
    }
}
