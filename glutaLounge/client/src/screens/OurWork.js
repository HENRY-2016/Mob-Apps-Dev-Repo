
import React from 'react';
import { Text, View, Alert,Modal,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { Video} from 'expo-av'
import axios from "axios";
import {ImageUrl,APIListWorks} from './DataFileApis';

export default class OurWork extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            WorkItems:[],
            modalVisible: false,
            VideoUrl:'',
    
            // Screens
            DoNotShowScreenOne:false,
            DoNotShowScreenTwo:true,
            // customer
        }
        
    }

UNSAFE_componentWillMount ()
{
axios.get(APIListWorks)
.then(res => {
    let results =JSON.stringify(res.data); 
    this.setState({WorkItems:[...JSON.parse(results)]})
    })
.catch(err=>{Alert.alert("Internet Error",NetworkErrorMsg)})
}

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
showVideo = (Url) =>{this.setState({VideoUrl:Url});this.setModalVisible(true)}

componentDidMount() {}


showScreenOne = () =>
{
    this.setState({DoNotShowScreenOne:false})
    this.setState({DoNotShowScreenTwo:true})
}

showScreenTwo = () =>
{
    this.setState({DoNotShowScreenOne:true})
    this.setState({DoNotShowScreenTwo:false})
}
render() {
    
    const {modalVisible,WorkItems} = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={{height:10}}></View>
                <View style = { styles.AboutMainView}>
                    <Text style = { styles.AboutTitleTextLables}>About Gluta Lounge</Text>

                    <View >
                        <Text style = { styles.AboutTextLables}> 
                        Wholesale & retail available We deal in glutathione 
                        products, we don’t mix creams,we ship worldwide,located @ Mabirizi Complex Level 5 Shop 18
                        </Text>
                    </View>

                    <View>
                        <Text style = { styles.AboutTitleTextLables}>Our Work</Text>
                    </View>
                </View>
                <ScrollView  showsVerticalScrollIndicator={false}>
                        <View style={{height:10}} ></View>

                        {WorkItems && WorkItems.map((item, index) => (
                            <View key={index}>
                                <View style={[styles.PostsMainRowView, styles.PostsMainRowView2]}>

                                    <View style={styles.PostsImageDetailsView}>
                                        <View style={styles.PostsImageView}>

                                        <View>
                                            <Image source={{uri:ImageUrl+item.Image}} style={ styles.PostsImage} />
                                        </View>
                                        </View>

                                        <View style={styles.PostsDetailsView}>
                                            <Text style = {[styles.PostsTexts3]}> {item.Name} </Text>
                                        
                                            <TouchableOpacity style={[styles.PostsMainBtn, styles.PostsMainBtn2]} onPress={() => this.showVideo(item.Video)} >
                                                <Text style = {styles.btnText}> Play It Now </Text>
                                            </TouchableOpacity>
                                        </View>
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
