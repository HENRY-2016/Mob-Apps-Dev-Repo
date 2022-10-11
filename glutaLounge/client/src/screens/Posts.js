
import React from 'react';
import { Text, View, Alert,TextInput,Modal,TouchableOpacity, ScrollView, Image} from 'react-native';
import { Video} from 'expo-av'
import styles from "./stylesheet";
import axios from "axios";
import {APISliderImages,APIListPosts,ImageUrl} from './DataFileApis';
import { NetworkErrorMsg,formatNumberWithComma } from './Functions';
import CustomSlider from './CustomSlider'
export default class Posts extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                images:[],
                PostsItems:[],
                modalVisible: false,
                VideoUrl:'',
            // Screens
        
        }
        
    }

    UNSAFE_componentWillMount ()
    {
        // slider images
    axios.get(APISliderImages)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonresults =JSON.parse(results); 
        let imageSiliders = [];
        for (i=0; i<jsonresults.length; i++)
            {
                
                let  image = ImageUrl+jsonresults[i].Image;
                imageSiliders.push(image)
            }
        this.setState({images:[...imageSiliders]})
        })
    .catch(err=>{console.log(err)})

    axios.get(APIListPosts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({PostsItems:[...JSON.parse(results)]})
        })
    .catch(err=>{Alert.alert("Internet Error",NetworkErrorMsg)})


    }

componentDidMount() {}
setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showVideo = (Url) =>{this.setState({VideoUrl:Url});this.setModalVisible(true)}

    
    render() {
        
        const {modalVisible, images, PostsItems} = this.state;
    
        return (
            
            <View style={styles.mainView}>
                <CustomSlider images={images} />
    
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <View style={{height:20}} ></View>

                    {PostsItems && PostsItems.map((item, index) => (
                        <View key={index}>
                            <View style={[styles.PostsMainRowView,styles.PostsMainRowView1]}>

                                <View style={styles.PostsImageDetailsView}>
                                    <View style={styles.PostsImageView}>

                                    <View>
                                        <Image source={{uri:ImageUrl+item.Image}} style={ styles.PostsImage} />
                                    </View>
                                    </View>

                                    <View style={styles.PostsDetailsView}>
                                        <Text style = {[styles.PostsTexts]}> {item.Name}  </Text>
                                        <Text style = {[styles.PostsTexts2]}> {formatNumberWithComma(item.Holder1)}  </Text>
                                    </View>
                                </View>

                                <View style={[styles.PostsMainRowBtnView]}>
                                    <TouchableOpacity style={[styles.PostsMainBtn, styles.PostsMainBtn1]} onPress={() =>  this.showVideo(item.Video)}>
                                        <Text style = {styles.btnText} >Play</Text>
                                    </TouchableOpacity>
                                    <View style={{width:5}} ></View>
                                    <TouchableOpacity style={[styles.PostsMainBtn, styles.PostsMainBtn1]}  >
                                        <Text style = {styles.btnText}> Comment </Text>
                                    </TouchableOpacity>
                                    <View style={{width:5}} ></View>
                                    <TouchableOpacity style={[styles.PostsMainBtn, styles.PostsMainBtn1]} >
                                        <Text style = {styles.btnText}> Book </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{height:7}} ></View>
                        </View>
                    ))}
            </ScrollView>

                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                
                                <Video
                                    style={styles.video}
                                    source={{uri: this.state.VideoUrl}}
                                    useNativeControls resizeMode="contain" isLooping
                                />

                                <View style={{height:15}}></View>
                                <View style={styles.modalCloseBtnView}>
                                <TouchableOpacity onPress={() => this.setModalVisible(!modalVisible)}>
                                    <Text style={styles.modalCloseTextLabels}>Close</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}
