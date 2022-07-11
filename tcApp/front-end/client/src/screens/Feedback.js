
import React from 'react';
import { Text, View,Linking,TouchableOpacity, ScrollView} from 'react-native';
import styles from "./stylesheet";
import { AntDesign,FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';


export default class FeedBack extends React.Component {
constructor(props){
    super(props);
    this.state = {

        DoNotShowFeedBackScreen:false,
        DoNotShowSupportScreen:true,
    }
    
}

componentDidMount() {}

showFeedBackScreen = () =>
{
    this.setState({DoNotShowSupportScreen:true})
    this.setState({DoNotShowFeedBackScreen:false})
}
showSupportScreen = () =>
{
    this.setState({DoNotShowFeedBackScreen:true})
    this.setState({DoNotShowSupportScreen:false})
}
tripleCareLtd = async () => {await WebBrowser.openBrowserAsync('https://tcholidayhomes.com');};


render() {
    
    const {DoNotShowFeedBackScreen,DoNotShowSupportScreen} = this.state;
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
                    <Text style = { styles.productTopTitleName}> Feed Back </Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView1}>
                        <Text style={styles.MainTopHeaderTextLabel}> Tc App Support  </Text>
                        <Text style={styles.MainTopHeaderTextLabel}> And FeedBacks </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView1]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

            <View style={styles.MainNavigationBtnView}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showFeedBackScreen} >
                        <Text style = {styles.btnText}>Tc FeedBacks  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]} onPress={this.showSupportScreen} >
                        <Text style = {styles.btnText}> App Support  </Text>
                    </TouchableOpacity>

                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                    <View style={styles.ArrowMainView}>
                        <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                    </View>
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                </ScrollView>
            </View> 

            {DoNotShowFeedBackScreen?<></>:(<>
                <View style={{height:30}} ></View>
                <Text  style={styles.AboutTitleText}>Triple Care Ltd FeedBacks </Text>
                <View style={{height:30}} ></View>
                <Text  onPress={()=>{Linking.openURL('tel:+447868651393');}} style={styles.AboutText}>Mobile: +44 7868 651 393 </Text>
                <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=447868651393');}} style={styles.AboutText}>WhatsApp: +44 7868 651 393 </Text>
                <Text  onPress={()=>{Linking.openURL('mailto:info@TripleCareLtd.com');}} style={styles.AboutText}>Email: info@TripleCareLtd.com</Text>
                <TouchableOpacity onPress={this.tripleCareLtd} style={styles.AboutTexts} >
                    <Text style={styles.AboutText}>Website: TripleCareLtd.com </Text>
                </TouchableOpacity>
                <View style={{height:20}} ></View>
                <Text  style={styles.AboutText}>Your Feed Back Is Important </Text>
                <Text  style={styles.AboutText}>Thank You</Text>
            </>)}


            {DoNotShowSupportScreen ?<></>:(<>
                <View style={{height:30}} ></View>
                <Text  style={styles.AboutTitleText}>App Feedbacks And Issues </Text>
                <View style={{height:30}} ></View>
                <Text  onPress={()=>{Linking.openURL('tel:+447868651393');}} style={styles.AboutText}>Mobile: +44 7868 651 393 </Text>
                <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=447868651393');}} style={styles.AboutText}>WhatsApp: +44 7868 651 393 </Text>
                <Text  onPress={()=>{Linking.openURL('mailto:info@TripleCareLtd.com');}} style={styles.AboutText}>Email: info@TripleCareLtd.com</Text>
                
                <View style={{height:20}} ></View>
                <Text  style={styles.AboutText}>Your Feed Back Is Important </Text>
                <Text  style={styles.AboutText}>Thank You</Text>
            </>)}
            </ScrollView>
            </View>

    );
}
}
