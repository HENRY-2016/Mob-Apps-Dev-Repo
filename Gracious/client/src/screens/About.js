
import React from 'react';
import { Text, View,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import { COLORS } from './Colors';
import {OpenExternalLinks } from './Functions';
import {ImageUrl} from './DataFileApis';
import { UiButtonMarginTop,UiButtonWidth,UiButtonPaddingTop,UiButtonHeight,UiButtonBorderRadius,UiButtonMarginRight } from './Constants';

import { 
            // functions
            initAboutUsScreenAppData,
            initAboutNewsBlogsScreenAppData,initAboutPoliciesScreenAppData,
            initAboutRwandaScreenAppData,initAboutUgandaScreenAppData,

            NewsBlogsData,  PoliciesData,
            AboutUgandaData,   AboutRwandaData,AboutUsData
        } from './AppDataFile';

import FaceBookIcon from "../imgs/About/Contact/facebook.png"; 
import YouTubeIcon from "../imgs/About/Contact/youtube.png"; 
import InstagramIcon from "../imgs/About/Contact/instagram.png"; 
import TwitterIcon from "../imgs/About/Contact/twitter.png"; 
import LocationIcon from "../imgs/About/Contact/location.png"; 
import EmailIcon from "../imgs/About/Contact/email.png"; 
import PhoneIcon from "../imgs/About/Contact/phone.png"; 
import WhatsAppIcon from "../imgs/About/Contact/whatsapp.png"; 
import WWWIcon from "../imgs/About/Contact/www.png"; 
import OfficeIcon from "../imgs/About/Contact/office.png"; 
import PolicyIcon from "../imgs/About/Others/Police.png";
import UgandaIcon from "../imgs/About/Others/uganda.png";
import RwandaIcon from "../imgs/About/Others/rwanda.png";
import GraciousIcon from "../imgs/About/Others/icon.png";



export default class About extends React.Component {
    constructor(props){
        super(props);
        this.state = {

            DoNotShowNewsBlogScreen:false,
            DoNotShowAboutScreen:true,
            DoNotShowPoliciesScreen:true,
            DoNotShowUgandaScreen:true,
            DoNotShowRwandaScreen:true,
            DoNotShowContactUsScreen:true,

            MainTopNavigationButtons: [
                { btnId: '1', Action:'NewsBlog',btnName: 'News-Blogs',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '2', Action:'Policies',btnName: 'Our Policies',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '3', Action:'Uganda',btnName: 'Uganda',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '4', Action:'Rwanda',btnName: 'Rwanda',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '5', Action:'About',btnName: 'About Us',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '6', Action:'ContactUs',btnName: 'Contact Us',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                ],

                
        }
        
    }

UNSAFE_componentWillMount ()
{
    // checkInternetConnectionToHost ();
}

componentDidMount() {
    this.setInitialActiveColor();
    console.log("");console.log("");
    console.log("=====>Inside About Screen");
}


setInitialActiveColor = () => 
{
    let MainTopNavigationButtons = JSON.parse(JSON.stringify(this.state.MainTopNavigationButtons));

    for (let x = 0; x < this.state.MainTopNavigationButtons.length; x++) 
    {
        if (this.state.MainTopNavigationButtons[x].btnId == 1) 
        {
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
        } 
    }
};
changeBackgroundColor = (item) => 
{
    let MainTopNavigationButtons = JSON.parse(JSON.stringify(this.state.MainTopNavigationButtons));

    for (let x = 0; x < this.state.MainTopNavigationButtons.length; x++) 
    {
        if (this.state.MainTopNavigationButtons[x].btnId == item.btnId) 
        {
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
            
            // Display Screens Basing on Actions
            let Action = MainTopNavigationButtons[x].Action
            if (Action==="NewsBlog"){this.showNewsBlogScreen();setTimeout(()=>{initAboutNewsBlogsScreenAppData()},1000);}
            else if (Action==="Policies"){this.showPoliciesScreen ();setTimeout(()=>{initAboutPoliciesScreenAppData()},1000);}
            else if (Action==="Uganda"){this.showUgandaScreen ();setTimeout(()=>{initAboutUgandaScreenAppData()},1000);}
            else if (Action==="Rwanda"){this.showRwandaScreen ();setTimeout(()=>{initAboutRwandaScreenAppData()},1000);}
            else if (Action==="About"){this.showAboutScreen ();setTimeout(()=>{initAboutUsScreenAppData()},1000);}
            else if (Action==="ContactUs"){this.showContactUsScreen ();}

        } 
        else 
        {
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.white;
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainCardColor;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
        }
    }
};





showNewsBlogScreen = () =>
{
    this.setState({DoNotShowAboutScreen:true});
    this.setState({DoNotShowPoliciesScreen:true});
    this.setState({DoNotShowUgandaScreen:true});
    this.setState({DoNotShowRwandaScreen:true});
    this.setState({DoNotShowContactUsScreen:true});
    this.setState({DoNotShowNewsBlogScreen:false});
}
showPoliciesScreen = () =>
{
    this.setState({DoNotShowUgandaScreen:true});
    this.setState({DoNotShowRwandaScreen:true});
    this.setState({DoNotShowContactUsScreen:true});
    this.setState({DoNotShowNewsBlogScreen:true});
    this.setState({DoNotShowAboutScreen:true});
    this.setState({DoNotShowPoliciesScreen:false});
}

showUgandaScreen = () =>
{
    this.setState({DoNotShowRwandaScreen:true});
    this.setState({DoNotShowContactUsScreen:true});
    this.setState({DoNotShowNewsBlogScreen:true});
    this.setState({DoNotShowAboutScreen:true});
    this.setState({DoNotShowPoliciesScreen:true});
    this.setState({DoNotShowUgandaScreen:false});
}
showRwandaScreen = () =>
{
    this.setState({DoNotShowContactUsScreen:true});
    this.setState({DoNotShowNewsBlogScreen:true});
    this.setState({DoNotShowAboutScreen:true});
    this.setState({DoNotShowPoliciesScreen:true});
    this.setState({DoNotShowUgandaScreen:true});
    this.setState({DoNotShowRwandaScreen:false});
}
showContactUsScreen = () =>
{
    this.setState({DoNotShowNewsBlogScreen:true});
    this.setState({DoNotShowAboutScreen:true});
    this.setState({DoNotShowPoliciesScreen:true});
    this.setState({DoNotShowUgandaScreen:true});
    this.setState({DoNotShowRwandaScreen:true});
    this.setState({DoNotShowContactUsScreen:false});
}
showAboutScreen = () =>
{

    this.setState({DoNotShowPoliciesScreen:true});
    this.setState({DoNotShowUgandaScreen:true});
    this.setState({DoNotShowRwandaScreen:true});
    this.setState({DoNotShowContactUsScreen:true});
    this.setState({DoNotShowNewsBlogScreen:true});
    this.setState({DoNotShowAboutScreen:false});
}

renderAppWithImageContent = (Data) =>
{
    return(
            <View>
                <View style={{height:10}} ></View>
                {Data[0] && Data[0].map((item, index)=>(
                    <View key={index}>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            <Image key={index} source={{uri: ImageUrl+item.Image}} style={styles.InlineImage} />
                            <View style={{height:10}} ></View>
                            <View style={styles.MainDescriptionView} >
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Description}</Text>
                                <Text style={styles.AboutListingText}>{item.Holder1}</Text>
                                <Text style={styles.AboutListingText}>{item.Holder2}</Text>
                                <Text style={styles.AboutListingText}>{item.Holder3}</Text>
                                <Text style={styles.AboutListingText}>{item.Holder4}</Text>
                                <Text style={styles.AboutListingText}>{item.Holder5}</Text>
                            </View>
                            <View style={{height:15}} ></View>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                ))}
                </View>
    )
}

renderAppWithOutImageContent = (ImageIcon,Data,CountryName,CountryTitle) =>
{
    return(
            <View>
                <View style={{height:10}} ></View>
                <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}} ></View>
                    <View style={styles.MainDescriptionView} >
                    <View style={{alignItems:'center'}} >
                    <View style={{height:10}} ></View>
                        <Image source={ImageIcon} style={styles.TravelIcons}/>
                        <Text style = {styles.HeadingOneText} > {CountryName}</Text>
                        <Text style = {styles.HeadingOneText} > {CountryTitle}</Text>
                    </View>
                    {Data[0] && Data[0].map((item, index)=>(
                        <View key={index}>
                                <View style={{height:10}} ></View>
                                    <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph6}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph7}</Text>
                                <View style={{height:15}} ></View>
                        </View>
                    ))}
                </View>
                <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
    )
}
render() {
    
    const {MainTopNavigationButtons} = this.state;
    const {DoNotShowAboutScreen,DoNotShowNewsBlogScreen,DoNotShowPoliciesScreen,DoNotShowUgandaScreen} = this.state;
    const {DoNotShowRwandaScreen,DoNotShowContactUsScreen} = this.state;
    return (
        
        <View style={styles.mainView}>
        <View style = {styles.MainLinksBtn} >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {MainTopNavigationButtons.map((item, index) => (
                    <View key={index} >
                        <TouchableOpacity
                            style={{
                                marginTop:UiButtonMarginTop,width:UiButtonWidth,paddingTop:UiButtonPaddingTop,
                                height:UiButtonHeight, borderRadius:UiButtonBorderRadius,
                                justifyContent: "center",marginRight:UiButtonMarginRight,
                                backgroundColor:item.btnBgColor,
                            }}
                            onPress={() => this.changeBackgroundColor(item)}>
                            <Text style={{color:item.btnNameTextColor,fontWeight:'bold', fontSize: 19,
                                            marginTop:-20, justifyContent: "center",
                                            textAlign: "center"}}>{item.btnName}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
        <ScrollView  showsVerticalScrollIndicator={false}>

        {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            
        */}
        {DoNotShowNewsBlogScreen ?(<></>):(<>
            {this.renderAppWithImageContent(NewsBlogsData)}</>)}

        {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            
        */}
        {DoNotShowPoliciesScreen  ?(<></>):(<>
            {this.renderAppWithOutImageContent(PolicyIcon,PoliciesData,'Gracious','Booking Terms & Policies')}</>)}

        {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            
        */}
        
        {DoNotShowUgandaScreen ?(<></>):(<>
            {this.renderAppWithOutImageContent( UgandaIcon,AboutUgandaData,'Uganda','The Pearl Of Africa')}</>)}

        {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            
        */}
        {DoNotShowRwandaScreen ?(<></>):(<>
            {this.renderAppWithOutImageContent( RwandaIcon,AboutRwandaData,'Rwanda','The Land Of A Thousand Hills')}</>)}
        {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            
        */}
        {DoNotShowAboutScreen ?(<></>):(<>
            {this.renderAppWithOutImageContent( GraciousIcon,AboutUsData,'Gracious','Tour Travel Agent Of Choice')}</>)}
        {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            
        */}
        {DoNotShowContactUsScreen ?(<></>):(<>
            <View style={{height:20}} ></View>
            <View style={styles.SafarisListingContainer}>
            <Text style={styles.TravelLeftFloatText}>Gracious Quick Info</Text>
            <View style={styles.MainContactUsView} >
                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.google.com/maps/place/Gracious+Tours+and+Travel/@0.2742196,32.5656006,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xbe84517b026908d2!8m2!3d0.2742196!4d32.5656006')} >
                            <Image source={LocationIcon} style={styles.ContactsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.google.com/maps/place/Gracious+Tours+and+Travel/@0.2742196,32.5656006,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0xbe84517b026908d2!8m2!3d0.2742196!4d32.5656006')} >
                            <Text style={styles.ContactsText }>Freedom City, Entebbe Road. {"\n"}Plot 4010 Namasuba </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('mailto:gracioustours15@gmail.com')} >
                            <Image source={EmailIcon} style={styles.ContactsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('mailto:gracioustours15@gmail.com')} >
                            <Text style={styles.ContactsText }>gracioustours15@gmail.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('tel:+256706311382')} >
                            <Image source={PhoneIcon} style={styles.ContactsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('tel:+256706311382')} >
                            <Text style={styles.ContactsText }>+256 706 311 382</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('tel:+256702919818')} >
                            <Image source={PhoneIcon} style={styles.ContactsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('tel:+256702919818')} >
                            <Text style={styles.ContactsText }>+256 702 919 818</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.ugandasafari-tours.com')} >
                            <Image source={WWWIcon} style={styles.ContactsIcon} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.ugandasafari-tours.com')} >
                            <Text style={styles.ContactsText }>ugandasafari-tours.com</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{height:20}} ></View>

            <Text style={styles.TravelLeftFloatText }>Social Media Links Tap To Open</Text>
            <View style={styles.MainContactUsView} >
                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://api.whatsapp.com/send/?phone=256772919818')} >
                            <Image source={WhatsAppIcon} style={styles.SocialMediaIcon} />
                            <Text style={styles.HeadingOneText }>Message</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('tel:+256706311382')} >
                            <Image source={OfficeIcon} style={styles.SocialMediaIcon} />
                            <Text style={styles.HeadingOneText }>Office Call</Text>
                        </TouchableOpacity>
                    </View>
                
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.youtube.com/channel/UCl7Ua3DT6P14NDu6J8Hc0-Q')} >
                            <Image source={YouTubeIcon} style={styles.SocialMediaIcon} />
                            <Text style={styles.HeadingOneText }>You Tube</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MainContactUsRowView}>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.facebook.com/gracioustours?mibextid=LQQJ4d')} >
                            <Image source={FaceBookIcon} style={styles.SocialMediaIcon} />
                            <Text style={styles.HeadingOneText }>facebook</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://www.instagram.com/gracioustours')} >
                            <Image source={InstagramIcon} style={styles.SocialMediaIcon} />
                            <Text style={styles.HeadingOneText }>Instagram</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity onPress={()=>OpenExternalLinks('https://twitter.com/GraciousTours1')} >
                            <Image source={TwitterIcon} style={styles.SocialMediaIcon} />
                            <Text style={styles.HeadingOneText }>Twitter</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                
            </View>
        <View style={{height:20}} ></View>
            </View>
            <View style={{height:10}} ></View>
        </>)}

        </ScrollView>
    </View>
    );
}
}
