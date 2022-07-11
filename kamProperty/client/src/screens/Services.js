
import React from 'react';
import { Text, View, Alert,TextInput,Modal,Linking, TouchableOpacity, ScrollView,Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as WebBrowser from 'expo-web-browser';
import { Video} from 'expo-av';
import { SliderBox } from "react-native-image-slider-box";
import { ServicesIcons } from './Functions';
import styles from "./stylesheet";
import axios from "axios";
import ImageNext from "../imgs/next.png";
import ImageBack from "../imgs/back.png";
import ImagePointer from "../imgs/pointer.png";
import ImageMenu from "../imgs/menu.png";
import ServiceImage from '../imgs/services.png';
import { COLORS } from './Colours';

import {APICustomerServiceBooking,APICustomerLandBuying,APICustomerLandSelling,
        APILandServices,APISellingServices,APIPropertyServices,APILandTitleServices,
        APIOnSiteLandServices,APIConstructionServices,APILettersOfAdministrationServices,
        APIListEstates,ImageUrl,VideoUrl
    } from './DataFileApis';


// import { DemoImages } from './DataFileApis';
export default class Services extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,

                // customer details
                UserName:'',
                UserPhone:'',
                UserAddress:'',
                PlotNumber:'',
                PlotBlock:'',
                PlotLocation:'',
                ServiceNameValue:'',

                // ======================
                // ======================
                EstatesData:[],
                SellingLandDetails1:'',
                SellingLandDetails2:'',
                SellingLandDetails3:'',
                SellingLandDetails4:'',
                SellingLandVideo:'',
                SellingLandSlidingImages:[],

                LandDetails1:'',
                LandDetails2:'',
                LandDetails3:'',
                LandDetails4:'',
                LandVideo:'',
                LandSlidingImages:[],

                PropertyDetails1:'',
                PropertyDetails2:'',
                PropertyDetails3:'',
                PropertyDetails4:'',
                PropertyVideo:'',
                PropertySlidingImages:[],

                LandTitleDetails1:'',
                LandTitleDetails2:'',
                LandTitleDetails3:'',
                LandTitleDetails4:'',
                LandTitleVideo:'',
                LandTitleSlidingImages:[],

                OnSiteLandDetails1:'',
                OnSiteLandDetails2:'',
                OnSiteLandDetails3:'',
                OnSiteLandDetails4:'',
                OnSiteLandVideo:'',
                OnSiteLandSlidingImages:[],

                ConstructionDetails1:'',
                ConstructionDetails2:'',
                ConstructionDetails3:'',
                ConstructionDetails4:'',
                ConstructionVideo:'',
                ConstructionSlidingImages:[],

                LettersOfAdminDetails1:'',
                LettersOfAdminDetails2:'',
                LettersOfAdminDetails3:'',
                LettersOfAdminDetails4:'',
                LettersOfAdminVideo:'',
                LettersOfAdminSlidingImages:[],

                
                


            // Screens
                DonNotShowMainServiceListScreen:false,
                DonNotShowServiceListScreen0:true,
                DonNotShowServiceListScreen1:true,
                DonNotShowServiceListScreen2:true,
                DonNotShowServiceListScreen3:true,
                DonNotShowServiceListScreen4:true,
                DonNotShowServiceListScreen5:true,
                DonNotShowServiceListScreen6:true,
                DonNotShowServiceListScreen7:true,



            // customer buying or applying for a service
                DonNotShowServiceApplyScreen0:true,
                DonNotShowServiceApplyScreen1:true,
                DonNotShowServiceApplyScreen2:true,
                DonNotShowServiceApplyScreen3:true,
                DonNotShowServiceApplyScreen4:true,
                DonNotShowServiceApplyScreen5:true,
                DonNotShowServiceApplyScreen6:true,
                DonNotShowServiceApplyScreen7:true,

        }
        
    }
    
componentDidMount() 
{
    axios.get(APIListEstates)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({EstatesData:[...JSON.parse(results)]})
        })
    .catch()

    axios.get(APISellingServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({SellingLandSlidingImages:[...imageSlider]})
        this.setState({SellingLandVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({SellingLandDetails1:jsonResults[0].Details1});
        this.setState({SellingLandDetails2:jsonResults[0].Details2});
        this.setState({SellingLandDetails3:jsonResults[0].Details3});
        this.setState({SellingLandDetails4:jsonResults[0].Details4});
        })
    .catch()

    axios.get(APILandServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({LandSlidingImages:[...imageSlider]})
        this.setState({LandVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({LandDetails1:jsonResults[0].Details1});
        this.setState({LandDetails2:jsonResults[0].Details2});
        this.setState({LandDetails3:jsonResults[0].Details3});
        this.setState({LandDetails4:jsonResults[0].Details4});
        })
    .catch()

    axios.get(APIPropertyServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        console.log("========>>"+results)
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({PropertySlidingImages:[...imageSlider]})
        this.setState({PropertyVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({PropertyDetails1:jsonResults[0].Details1});
        this.setState({PropertyDetails2:jsonResults[0].Details2});
        this.setState({PropertyDetails3:jsonResults[0].Details3});
        this.setState({PropertyDetails4:jsonResults[0].Details4});
        })
    .catch()

    axios.get(APILandTitleServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({LandTitleSlidingImages:[...imageSlider]})
        this.setState({LandTitleVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({LandTitleDetails1:jsonResults[0].Details1});
        this.setState({LandTitleDetails2:jsonResults[0].Details2});
        this.setState({LandTitleDetails3:jsonResults[0].Details3});
        this.setState({LandTitleDetails4:jsonResults[0].Details4});
        })
    .catch()

    axios.get(APIOnSiteLandServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({OnSiteLandSlidingImages:[...imageSlider]})
        this.setState({OnSiteLandVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({OnSiteLandDetails1:jsonResults[0].Details1});
        this.setState({OnSiteLandDetails2:jsonResults[0].Details2});
        this.setState({OnSiteLandDetails3:jsonResults[0].Details3});
        this.setState({OnSiteLandDetails4:jsonResults[0].Details4});
        })
    .catch()

    axios.get(APIConstructionServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({ConstructionSlidingImages:[...imageSlider]})
        this.setState({ConstructionVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({ConstructionDetails1:jsonResults[0].Details1});
        this.setState({ConstructionDetails2:jsonResults[0].Details2});
        this.setState({ConstructionDetails3:jsonResults[0].Details3});
        this.setState({ConstructionDetails4:jsonResults[0].Details4});
        })
    .catch()
    
    axios.get(APILettersOfAdministrationServices)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        imageSlider.push(ImageUrl+jsonResults[0].Image6)
        imageSlider.push(ImageUrl+jsonResults[0].Image7)
        imageSlider.push(ImageUrl+jsonResults[0].Image8)
        imageSlider.push(ImageUrl+jsonResults[0].Image9)
        imageSlider.push(ImageUrl+jsonResults[0].Image10)
        this.setState({LettersOfAdminSlidingImages:[...imageSlider]})
        this.setState({LettersOfAdminVideo:VideoUrl+jsonResults[0].Video1});
        this.setState({LettersOfAdminDetails1:jsonResults[0].Details1});
        this.setState({LettersOfAdminDetails2:jsonResults[0].Details2});
        this.setState({LettersOfAdminDetails3:jsonResults[0].Details3});
        this.setState({LettersOfAdminDetails4:jsonResults[0].Details4});

        })
    .catch(err=>{Alert.alert("Error","\n\n Can Not Load Services Data \n\n Open App Again With \n\n Network Connection \n\n"+err);})
    

}
openGooglePin = async (GooglePin) => {await WebBrowser.openBrowserAsync(GooglePin);};

setModalVisible = (visible) => {this.setState({ modalVisible: visible });}
setUserPhone = (text) =>{this.setState({UserPhone:text});}
setUserName = (text) =>{this.setState({UserName:text});}
setUserAddress = (text) =>{this.setState({UserAddress:text});}

setPlotNumber = (text) =>{this.setState({PlotNumber:text});}
setPlotBlock = (text) =>{this.setState({PlotBlock:text});}
setPlotLocation = (text) =>{this.setState({PlotLocation:text});}
setServiceNameValue  = (text) =>{this.setState({ServiceNameValue:text});}

showMainServiceListScreen = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowMainServiceListScreen:false})

}
showServiceListScreen0 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen0:false})
}
showServiceListScreen1 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen1:false})
}
showServiceListScreen2 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen2:false})
}
showServiceListScreen3 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen3:false})
}
showServiceListScreen4 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen4:false})
}
showServiceListScreen5 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen5:false})
}
showServiceListScreen6 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen6:false})
}
showServiceListScreen7 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:false})
}

//Customer Apply Screens

showServiceApplyScreen0 = () =>
{
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceApplyScreen0:false})
}

showServiceApplyScreen1 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({ DonNotShowServiceApplyScreen1:false})
}
showServiceApplyScreen2 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceApplyScreen2:false})
}
showServiceApplyScreen3 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceApplyScreen3:false})
}
showServiceApplyScreen4 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceApplyScreen4:false})
}
showServiceApplyScreen5 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceApplyScreen5:false})
}
showServiceApplyScreen6 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceApplyScreen6:false})
}
showServiceApplyScreen7 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({ DonNotShowServiceApplyScreen7:false})
}

// customer Apply cancel
showServiceApplyCancelScreen0 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen0:false})
}
showServiceApplyCancelScreen1 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen1:false})
}
showServiceApplyCancelScreen2 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen2:false})
}
showServiceApplyCancelScreen3 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen3:false})
}
showServiceApplyCancelScreen4 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen4:false})
}
showServiceApplyCancelScreen5 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen5:false})
}
showServiceApplyCancelScreen6 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen6:false})
}
showServiceApplyCancelScreen7 = () =>
{
    this.setState({DonNotShowServiceApplyScreen0:true})
    this.setState({DonNotShowServiceApplyScreen1:true})
    this.setState({DonNotShowServiceApplyScreen2:true})
    this.setState({DonNotShowServiceApplyScreen3:true})
    this.setState({DonNotShowServiceApplyScreen4:true})
    this.setState({DonNotShowServiceApplyScreen5:true})
    this.setState({DonNotShowServiceApplyScreen6:true})
    this.setState({DonNotShowServiceApplyScreen7:true})

    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen7:false})
}

showServiceDetails = (ServiceType,Details1,Details2,Details3,Details4) =>
    {Alert.alert(ServiceType,"\n\n"+Details1+"\n\n"+Details2+"\n\n"+Details3+"\n\n"+Details4+"\n\n")}

postCustomerbuyingLand = async () => 
{
    let name = this.state.UserName;
    let phone = this.state.UserPhone;
    let address = this.state.UserAddress;
    let service = this.state.ServiceNameValue;

    if ((this.state.UserName.length == 0) || (this.state.UserPhone.length < 10) || (this.state.ServiceNameValue.length == 0 ) || (this.state.UserAddress.length == 0))
    {Alert.alert("Warning","\n \n Invalid Phone Number   \n\n Or  \n\n Name, Address, Estates \n \n Can Not Be Empty")}

    else
    {
        try
        {
            const d = new Date();
            let month = d.getMonth();
            let day = d.getDay();
            let hour = d.getHours();  
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();  
            let reference = "#"+month+day+hour+minutes+seconds;
            const postRequest = await axios.post(APICustomerLandBuying,
                {
                    "Name":name,
                    "Phone":phone,
                    "Address":address,
                    "Reference":reference,
                    "Estate":service,
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Booking Status",result);
        }

        catch (error)
            {Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)};
    }
}

postCustomerSellingLand = async () => 
{
    let name = this.state.UserName;
    let phone = this.state.UserPhone;
    let address = this.state.UserAddress;
    let service = this.state.ServiceNameValue;

    let plotNumber = this.state.PlotNumber;
    let plotBlock = this.state.PlotBlock;
    let plotLocation = this.state.PlotLocation;


    if ((name.length == 0) || (phone.length < 10)  || (address.length == 0)|| (plotNumber.length == 0)|| (plotBlock.length == 0)|| (plotLocation.length == 0))
    {Alert.alert("Warning","\n \n Invalid Phone Number   \n\n Or  \n\n Name, Address \n Plot \n Number, Block, Location  \n \n Can Not Be Empty")}

    else
    {
        try
        {
            // post data
            const d = new Date();
            let month = d.getMonth();
            let day = d.getDay();
            let hour = d.getHours();  
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();  
            let reference = "#"+month+day+hour+minutes+seconds;
            const postRequest = await axios.post(APICustomerLandSelling,
                {
                    "Name":name,
                    "Phone":phone,
                    "Reference":reference,
                    "Address":address,
                    "PlotBlock":plotBlock,
                    "PlotNumber":plotNumber,
                    "Location":plotLocation
                }
            )
            let result = postRequest.data.status;
            Alert.alert("Order Status",result);
        }
        catch (error)
            {Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)};
    }
}

postCustomerServiceBookingApplication = async (ServiceType) => 
{
    let name = this.state.UserName;
    let phone = this.state.UserPhone;
    let address = this.state.UserAddress;
    let service = this.state.ServiceNameValue;
    let serviceType = ServiceType

    if ((this.state.UserName.length == 0) || (this.state.UserPhone.length < 10) || (this.state.ServiceNameValue.length == 0 ) || (this.state.UserAddress.length == 0))
    {Alert.alert("Warning","\n \n Invalid Phone Number   \n\n Or  \n\n Name, Address, Estates \n \n Can Not Be Empty")}

    else
    {
        console.log("Name ==> "+ name)
        console.log("Phone ==> "+ phone)
        console.log("address ==> "+ address)
        console.log("service ==> "+ service)
        console.log("service ==> "+ serviceType)

        try
        {
            const d = new Date();
            let month = d.getMonth();
            let day = d.getDay();
            let hour = d.getHours();  
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();  
            let reference = "#"+month+day+hour+minutes+seconds;
            const postRequest = await axios.post(APICustomerServiceBooking,
                {
                    "Name":name,
                    "Phone":phone,
                    "Address":address,
                    "Reference":reference,
                    "ServiceName":service,
                    "ServiceType":serviceType
                }
            )
            
            let result = postRequest.data.status;
            Alert.alert("Booking Status",result);
        }

        catch (error)
            {Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)};
    }
}
render() {
    
    const {ServiceNameValue,EstatesData,modalVisible }= this.state
    const { DonNotShowMainServiceListScreen, DonNotShowServiceListScreen0,DonNotShowServiceListScreen1,DonNotShowServiceListScreen2} = this.state;
    const { DonNotShowServiceListScreen3,DonNotShowServiceListScreen4,DonNotShowServiceListScreen5,DonNotShowServiceListScreen6,DonNotShowServiceListScreen7} = this.state;
    const {DonNotShowServiceApplyScreen0,DonNotShowServiceApplyScreen1,DonNotShowServiceApplyScreen2,DonNotShowServiceApplyScreen3}=this.state
    const { DonNotShowServiceApplyScreen4,DonNotShowServiceApplyScreen5,DonNotShowServiceApplyScreen6,DonNotShowServiceApplyScreen7} = this.state

    const {SellingLandDetails1,SellingLandDetails2,SellingLandDetails3,SellingLandDetails4,SellingLandVideo,SellingLandSlidingImages}= this.state
    const {LandDetails1,LandDetails2,LandDetails3,LandDetails4,LandVideo,LandSlidingImages}= this.state
    const {PropertyDetails1,PropertyDetails2,PropertyDetails3,PropertyDetails4,PropertyVideo,PropertySlidingImages}= this.state
    const {LandTitleDetails1,LandTitleDetails2,LandTitleDetails3,LandTitleDetails4,LandTitleVideo,LandTitleSlidingImages}= this.state
    const {OnSiteLandDetails1,OnSiteLandDetails2,OnSiteLandDetails3,OnSiteLandDetails4,OnSiteLandVideo,OnSiteLandSlidingImages}= this.state
    const {ConstructionDetails1,ConstructionDetails2,ConstructionDetails3,ConstructionDetails4,ConstructionVideo,ConstructionSlidingImages} = this.state;
    const {LettersOfAdminDetails1,LettersOfAdminDetails2,LettersOfAdminDetails3,LettersOfAdminDetails4,LettersOfAdminVideo,LettersOfAdminSlidingImages}= this.state
            
    return (
        <View style={styles.mainView}>
            
                <View style={[styles.ModuleNameOuterTopView]} >
                    <View style={[styles.ModuleNameInnerTopView]}>
                    <View style={{height:30}}></View>

                        <View style={[styles.ModuleNameIconTextView]}>
                            <ServicesIcons image={ServiceImage}  />

                            <Text style={styles.ModuleNameTitleTextLabel}> Kam Property Services </Text>
                        </View>
                    </View>
                </View>
            <ScrollView>
            {DonNotShowMainServiceListScreen ? <></>:(<>
                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView1]}>
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen0}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Our Estates  </Text>
                            </ScrollView>
                        </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView2]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen1}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Selling Land  </Text>
                            </ScrollView>
                        </TouchableOpacity>

                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView3]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView3]}>
                        
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen2}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Land Services  </Text>
                            </ScrollView>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView4]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView4]}>
                        
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen3}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Property Services </Text>
                            </ScrollView>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView5]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView5]}>
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen4} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Land Title Services </Text>
                            </ScrollView>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView6]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView6]}>
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen5} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> On Site Land Services  </Text>
                            </ScrollView>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView7]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView7]}>
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen6} >
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Construction Services </Text>
                            </ScrollView>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView8]} >
                    <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView8]}>
                        <View style={styles.MainNavigationBtnView} >
                        <TouchableOpacity onPress={this.showServiceListScreen7}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={[styles.PointerBtn]}  >
                                <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                            </View>
                            <Text style={styles.MainCardTitleTextLabel}> Letters of Administration </Text>
                            </ScrollView>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </>)}


            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 0
                ====================================================================
                ====================================================================
                ====================================================================
            */}

                {DonNotShowServiceListScreen0 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardViews,styles.MainOuterServiceScreen2CardView]} >
                        <View style={{height:3}} ></View>
                        <View  style={styles.BackToMainListScreenView} >
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                <Text style = {styles.MenuBtnText}> Menu  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView}>
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn1]}  >
                        <Text style = {styles.btnText}> Our Estates </Text>
                    </TouchableOpacity>
                    </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>
                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={{width:10}} ></View>
                                    <Text style = {styles.ServicesText}> We Sell Land </Text>
                                <View style={{width:10}} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
                {EstatesData && EstatesData.map((item, i) => (
                    <View key={i}>
                    <View   style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                <View>
                                    <Image source={{uri:ImageUrl+item.Image}} style={styles.EstateImage} />
                                </View>
                            </View> 

                            <View style = {styles.ServiceNameListMainView2}>
                                <Text style = {styles.ServicesText1}> {item.Name} </Text>
                                <Text style = {styles.ServicesText1}> Estate </Text>
                                <Text style = {styles.ServicesText1}> || </Text>
                                <Text style = {styles.ServicesText1}> {item.Cost} </Text>
                            </View>

                            <View style={styles.VideoView}>
                                <Video
                                    style={styles.video}
                                    source={{uri:VideoUrl+item.Video}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            <View style={{marginLeft:20}}>
                                <View style={{height:10}} ></View>
                                <TouchableOpacity onPress={()=>{this.openGooglePin(item.GooglePin)}} style={[styles.GooglePinBtn, styles.MainNavigationBtn5]} >
                                    <Text style={styles.btnText}>View On Google Map </Text>
                                </TouchableOpacity> 
                                <View style={{height:20}} ></View>
                            </View>

                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails(item.Name + " Estate", LandDetails1,LandDetails2,LandDetails3,LandDetails4)}  >
                                        <Text style = {styles.btnText}> Details </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                        <Text style = {styles.btnText}> Consulting </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen0}  >
                                        <Text style = {styles.btnText}> Apply Now </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View> 
                            <View style={{height:30}} ></View> 
                            </View>
                        </View> 
                        <View style={{height:20}}></View>
                        </View>
                    ))}
            </>)}


            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 1
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen1 ? <></>:(<>
                <View style={[styles.MainOuterServiceScreen2CardView]} >
                <View style={{height:3}} ></View>
                <View  style={styles.BackToMainListScreenView} >
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                        <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                        <Text style = {styles.MenuBtnText}> Menu  </Text>
                    </TouchableOpacity>
                </View>
                </View>
                <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView} >
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn2]}  >
                        <Text style = {styles.btnText}> Sell Your Land To Us </Text>
                    </TouchableOpacity>
                    </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>
                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={{width:10}} ></View>
                                    <Text style = {styles.ServicesText}> We Buy Land </Text>
                                <View style={{width:10}} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={SellingLandSlidingImages} sliderBoxHeight={200}
                                    dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri:SellingLandVideo}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("Selling Land", SellingLandDetails1,SellingLandDetails2,SellingLandDetails3,SellingLandDetails4)} >
                                    <Text style = {styles.btnText}> Details </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                    <Text style = {styles.btnText}> Consulting </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen1}  >
                                    <Text style = {styles.btnText}> Buy My Land </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            <View style={{height:20}} ></View>
                        </View>   
                    </View>
                </View> 
                <View style={{height:20}} ></View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 2
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen2 ? <></>:(<>
                <View style={[styles.MainOuterServiceScreen2CardView]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView} >
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn1]}  >
                        <Text style = {styles.btnText}> Land Services </Text>
                    </TouchableOpacity>
                    </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>
                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={{width:10}} ></View>
            
                                <Text style = {[styles.ServicesText]}>Land Grading</Text> 
                                <Text style = {[styles.ServicesText]}>Land Surveying</Text>

                                <View style={{width:10}} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={LandSlidingImages} sliderBoxHeight={200}
                                    dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri:LandVideo}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("Land", LandDetails1,LandDetails2,LandDetails3,LandDetails4)}>
                                    <Text style = {styles.btnText}> Details </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                    <Text style = {styles.btnText}> Consulting </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen2}  >
                                    <Text style = {styles.btnText}> Book For Service </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            <View style={{height:20}} ></View>
                        </View>   
                    </View>
                </View> 
                <View style={{height:20}} ></View>
            </>)}

                            {/* 
            ====================================================================
            ====================================================================
            ====================================================================
                        Screen 3
            ====================================================================
            ====================================================================
            ====================================================================
        */}

        {DonNotShowServiceListScreen3 ? <></>:(<>
            <View style={[styles.MainOuterServiceScreen2CardView]} >
                <View style={{height:3}} ></View>
                <View  style={styles.BackToMainListScreenView} >
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                        <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                        <Text style = {styles.MenuBtnText}> Menu  </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View  style={{height:20}} ></View>
                <View style={styles.MainServiceNameArrowView} >
                <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn3]}  >
                    <Text style = {styles.btnText}> Property Services </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>
                    <View >
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={{height:10}} ></View>
                        <View style = {styles.ServiceNameListMainView}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={{width:10}} ></View>

                                <Text style = {[styles.ServicesText]}>Property Valuation</Text>  
                                <Text style = {[styles.ServicesText]}>Planning</Text> 
                                <Text style = {[styles.ServicesText]}>Property Management</Text>
                                <Text style = {[styles.ServicesText]}>Houses Renovation</Text>

                                <View style={{width:10}} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.ImageVideoMainCardView}>
                <View style={styles.ImageVideoView}>
                    <View style={styles.ImageSliderView}>
                            <View style={{height:20}}></View>
                            <SliderBox style={styles.ImageSliderView}
                                images={PropertySlidingImages} sliderBoxHeight={200}
                                dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                paginationBoxVerticalPadding={20}
                                autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                dotStyle={styles.ImageSliderDotStyle}
                                ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                imageLoadingColor={COLORS.colourNumberOne}
                                /> 
                    </View> 

                    <View style={styles.VideoView}>
                        <View style={{width:15}} ></View>
                        <Video
                            style={styles.video}
                            source={{uri:PropertyVideo}}
                            useNativeControls resizeMode="contain" isLooping
                        />
                    </View>
                    
                    <View style={styles.HolidayHomeActionView}>
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("Property",PropertyDetails1,PropertyDetails2,PropertyDetails3,PropertyDetails4)}  >
                                <Text style = {styles.btnText}> Details </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                <Text style = {styles.btnText}> Consulting </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen3}  >
                                <Text style = {styles.btnText}> Book For Service </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                            </TouchableOpacity>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                        </ScrollView>
                        <View style={{height:20}} ></View>
                    </View>   
                </View>
            </View> 
            <View style={{height:20}} ></View>
        </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 4
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen4 ? <></>:(<>
                <View style={[styles.MainOuterServiceScreen2CardView]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView} >
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn2]}  >
                        <Text style = {styles.btnText}> Land Title Services </Text>
                    </TouchableOpacity>
                    </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>

                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={{width:10}} ></View>
                                

                                <Text style = {[styles.ServicesText]}>Processing Land Titles</Text>
                                <Text style = {[styles.ServicesText]}>Cartography Work and Prints</Text>
                                <Text style = {[styles.ServicesText]}>Title Subdivisions </Text>
                                <Text style = {[styles.ServicesText]}>Title Transfers</Text>
                                <Text style = {[styles.ServicesText]}>Removal Of Cavetes</Text>

                                <View style={{width:10}} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={LandTitleSlidingImages} sliderBoxHeight={200}
                                    dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri:LandTitleVideo}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("Land Title",LandTitleDetails1,LandTitleDetails2,LandTitleDetails3,LandTitleDetails4)} >
                                    <Text style = {styles.btnText}> Details </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                    <Text style = {styles.btnText}> Consulting </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen4}  >
                                    <Text style = {styles.btnText}> Book For Service </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            <View style={{height:20}} ></View>
                        </View>   
                    </View>
                </View> 
                <View style={{height:20}} ></View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 5
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen5 ? <></>:(<>
                <View style={[styles.MainOuterServiceScreen2CardView]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView} >
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn2]}  >
                        <Text style = {styles.btnText}> On Site Land Services </Text>
                    </TouchableOpacity>
                    </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>

                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={{width:10}} ></View>
            
                                <Text style = {[styles.ServicesText]}>Site Location</Text>
                                <Text style = {[styles.ServicesText]}>Boundary Opening</Text>
                                <Text style = {[styles.ServicesText]}>Demarcation</Text>
                                <Text style = {[styles.ServicesText]}>LandScaping</Text>
                                <Text style = {[styles.ServicesText]}>Topography</Text>
                                <Text style = {[styles.ServicesText]}>Site Facing</Text>
                                

                                <View style={{width:10}} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={OnSiteLandSlidingImages} sliderBoxHeight={200}
                                    dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri:OnSiteLandVideo}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("On Site Land",OnSiteLandDetails1,OnSiteLandDetails2,OnSiteLandDetails3,OnSiteLandDetails4)} >
                                    <Text style = {styles.btnText}> Details </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                    <Text style = {styles.btnText}> Consulting </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen5}  >
                                    <Text style = {styles.btnText}> Book For Service </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            <View style={{height:20}} ></View>
                        </View>   
                    </View>
                </View> 
                <View style={{height:20}} ></View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 6
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen6 ? <></>:(<>
                <View style={[styles.MainOuterServiceScreen2CardView]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView} >
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn2]}  >
                        <Text style = {styles.btnText}> Construction Services </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>

                        
                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={{width:10}} ></View>
            
                                <Text style = {[styles.ServicesText]}>Site Visiting And Planning </Text>
                                <Text style = {[styles.ServicesText]}>Site Clearing </Text>
                                <Text style = {[styles.ServicesText]}>Grading And Leveling</Text>  
                                <Text style = {[styles.ServicesText]}>House Plans</Text>
                                <Text style = {[styles.ServicesText]}>Plan Approvals</Text> 
                                <Text style = {[styles.ServicesText]}>Advise On House</Text> 
                                <Text style = {[styles.ServicesText]}>Construction</Text> 
                                <Text style = {[styles.ServicesText]}>Material Supply</Text>
                                <Text style = {[styles.ServicesText]}>Renovations</Text> 
                                <Text style = {[styles.ServicesText]}>Project Supervision</Text> 

                                

                                <View style={{width:10}} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ConstructionSlidingImages} sliderBoxHeight={200}
                                    dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri:ConstructionVideo}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("Construction Service",ConstructionDetails1,ConstructionDetails2,ConstructionDetails3,ConstructionDetails4)}  >
                                    <Text style = {styles.btnText}> Details </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                    <Text style = {styles.btnText}> Consulting </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen6}  >
                                    <Text style = {styles.btnText}> Book For Service </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            <View style={{height:20}} ></View>
                        </View>   
                    </View>
                </View> 
                <View style={{height:20}} ></View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 7
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen7 ? <></>:(<>
                <View style={[styles.MainOuterServiceScreen2CardView]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View  style={{height:20}} ></View>
                    <View style={styles.MainServiceNameArrowView} >
                    <TouchableOpacity style={[styles.ServiceNameArrow, styles.ServiceNameArrowBtn4]}  >
                        <Text style = {styles.btnText}> Letters Of Administration </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceScreen2CardView]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceScreen2CardView]}>
                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:10}} ></View>
                            <View style = {styles.ServiceNameListMainView}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={{width:10}} ></View>
            
                                <Text style = {[styles.ServicesText]}>Processing Certificate Of No Objection (CONO)</Text>
                                <Text style = {[styles.ServicesText]}>Processing Letters Of Administration </Text>
                                <Text style = {[styles.ServicesText]}>Verification Of Letters</Text>
                                <Text style = {[styles.ServicesText]}>Certification Of Letters (Certified True Copies)</Text>
                                <Text style = {[styles.ServicesText]}>Filling Inventories </Text>
                                
                                <View style={{width:10}} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn1]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                                </View>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={LettersOfAdminSlidingImages} sliderBoxHeight={200}
                                    dotColor={COLORS.white} inactiveDotColor= {COLORS.colourNumberOne}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={COLORS.colourNumberOne}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri:LettersOfAdminVideo}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.showServiceDetails("Letters Of Administration",LettersOfAdminDetails1,LettersOfAdminDetails2,LettersOfAdminDetails3,LettersOfAdminDetails4)} >
                                    <Text style = {styles.btnText}> Details </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={() => this.setModalVisible(true)}  >
                                    <Text style = {styles.btnText}> Consulting </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]} onPress={this.showServiceApplyScreen7}  >
                                    <Text style = {styles.btnText}> Book For Service </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                            <View style={{height:20}} ></View>
                        </View>   
                    </View>
                </View> 
                <View style={{height:20}} ></View>
            </>)}




















            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 0
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen0?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}> Applying For Our Estates </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Estate</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Estate 1" value="Estate 1" />
                                    <Picker.Item label="Estate 2" value="Estate 2" />
                                    <Picker.Item label="Estate 3" value="Estate 3" />
                                    <Picker.Item label="Estate 4" value="Estate 4" />
                                    
                            </Picker>
                        </View>
                

                <View style={{height:30}} ></View>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postCustomerbuyingLand}  >
                        <Text style = {styles.btnText}> Send </Text>
                    </TouchableOpacity>
                    <View style={{height:30}} ></View>
                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen0}  >
                        <Text style = {styles.btnText}> Cancel </Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:20}} ></View>

                </View>
            </>)}
        
            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 1
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen1?<></>:(<>

                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}> Sell Your To Us </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Plot Details</Text> 
                    <TextInput style={styles.input} placeholder="Plot Block" onChangeText={text => this.setPlotBlock(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <TextInput style={styles.input} placeholder="Plot Number" onChangeText={text => this.setPlotNumber(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <TextInput style={styles.input} placeholder="Location" onChangeText={text => this.setPlotLocation(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    
                

                    <View style={{height:30}} ></View>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.postCustomerSellingLand}  >
                            <Text style = {styles.btnText}> Send </Text>
                        </TouchableOpacity>
                        <View style={{height:30}} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen1}  >
                            <Text style = {styles.btnText}> Cancel </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:20}} ></View>

                    </View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 2
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen2?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}> Land Services Booking </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Service</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Land Grading" value="Land Grading" />
                                    <Picker.Item label="Land Surveying" value="Land Surveying" />
                            </Picker>
                        </View>
                

                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={()=>{this.postCustomerServiceBookingApplication("LandServices")}}  >
                                <Text style = {styles.btnText}> Send </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen2}  >
                                <Text style = {styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>

                        </View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 3
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen3?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}>Property Services Booking </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Service</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Property Valuation" value="Property Valuation" />
                                    <Picker.Item label="Planning" value="Planning" />
                                    <Picker.Item label="Property Management" value="Property Management" />
                                    <Picker.Item label="Houses Renovation" value="Houses Renovation" />
                            </Picker>
                        </View>
                

                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={()=>{this.postCustomerServiceBookingApplication("PropertyServices")}}  >
                                <Text style = {styles.btnText}> Send </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen3}  >
                                <Text style = {styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>

                        </View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 4
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen4?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}> Land Title Services Booking </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Service</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Processing Land Title" value="Processing Land Title" />
                                    <Picker.Item label="Cartography Work and Prints" value="Cartography Work and Prints" />
                                    <Picker.Item label="Title Subdivisions" value="Title Subdivisions" />
                                    <Picker.Item label="Title Transfers" value="Title Transfers" />
                                    <Picker.Item label="Removal Of Cavetes" value="Removal Of Cavetes" />
                            </Picker>
                        </View>
                

                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={()=>{this.postCustomerServiceBookingApplication("LandTitleServices")}} >
                                <Text style = {styles.btnText}> Send </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen4}  >
                                <Text style = {styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>

                        </View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 5
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen5?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}>On Site Land Services Booking </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Service</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Site Location" value="Site Location" />
                                    <Picker.Item label="Boundary Opening" value="Boundary Opening" />
                                    <Picker.Item label="Land Demarcation" value="Land Demarcation" />
                                    <Picker.Item label="LandScaping" value="LandScaping" />
                                    <Picker.Item label="Topography" value="Topography" />
                                    <Picker.Item label="Site Facing" value="Site Facing" />
                            </Picker>
                        </View>
                
                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={()=>{this.postCustomerServiceBookingApplication("OnSiteServices")}}  >
                                <Text style = {styles.btnText}> Send </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen5}  >
                                <Text style = {styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>

                        </View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 6
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen6?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}> Construction Services Booking </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Service</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Renovations" value="Renovations" />
                                    <Picker.Item label="Construction" value="Construction" />
                                    <Picker.Item label=" House Plans" value=" House Plans" />
                                    <Picker.Item label="Site Clearing" value="Site Clearing" />
                                    <Picker.Item label="Plan Approvals" value="Plan Approvals" />
                                    <Picker.Item label="Advise on House" value="Advise on House" />
                                    <Picker.Item label="Material Supply" value="Material Supply" />
                                    <Picker.Item label="Land Demarcation" value="Land Demarcation" />
                                    <Picker.Item label="Grading And Leveling" value="Grading And Leveling" />
                                    <Picker.Item label="Site Visiting And Planning" value="Site Visiting And Planning" />
                                    <Picker.Item label="Project Supervision" value="Project Supervision" />
                            </Picker>
                        </View>
                

                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={()=>{this.postCustomerServiceBookingApplication("ConstructionServices")}}  >
                                <Text style = {styles.btnText}> Send </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen6}  >
                                <Text style = {styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>

                        </View>
            </>)}

            {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Apply Screen 7
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceApplyScreen7?<></>:(<>
                <View style={{height:30}} ></View>
                
                <View style={styles.MainNavigationBtnSpaceView} ></View>

                <View style={styles.BookingCardMainView} >
                <View style={{height:15}} ></View>

                    <Text style = {styles.BookingScreenText}> Letters of Administration Booking </Text>

                    <View style={{height:20}} ></View>
                    <TextInput style={styles.input} placeholder="Both Names" onChangeText={text => this.setUserName(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />

                    <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                    placeholderTextColor = {COLORS.white} 
                    maxLength={10} keyboardType="numeric" 
                    />
                    <TextInput style={styles.input} placeholder="Home Address" onChangeText={text => this.setUserAddress(text)} 
                    placeholderTextColor = {COLORS.white} 
                    />
                    <Text style={styles.BookingScreenText}>Service</Text> 
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={ServiceNameValue}
                                onValueChange={(itemValue, itemIndex) =>this.setServiceNameValue(itemValue)}>
                                    <Picker.Item label="" />
                                    <Picker.Item label="Processing Certificate Of No Objection" value="Processing Certificate Of No Objection" />
                                    <Picker.Item label="Processing Letters Of Administration" value="Processing Letters Of Administration" />
                                    <Picker.Item label="Verification Of Letters" value="Verification Of Letters" />
                                    <Picker.Item label="Certified True Copies" value="Certified True Copies" />
                                    <Picker.Item label="Filling Inventories " value="Filling Inventories " />
                            </Picker>
                        </View>
                

                        <View style={{height:30}} ></View>
                        <View style={{alignItems: "center"}}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={()=>{this.postCustomerServiceBookingApplication("LettersOfAdmin")}}>
                                <Text style = {styles.btnText}> Send </Text>
                            </TouchableOpacity>
                            <View style={{height:30}} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showServiceApplyCancelScreen7}  >
                                <Text style = {styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{height:20}} ></View>
                        </View>
            </>)}


            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <View style={{height:30}} ></View>
                            <View>
                                <Text  onPress={()=>{Linking.openURL('https://api.whatsapp.com/send/?phone=256789076919');}} style={styles.AboutTextLabel}>0789 076 919</Text>
                            </View>
                                <View style={{height:10}} ></View>
                                <Text  onPress={()=>{Linking.openURL('tel:0751986447');}} style={styles.AboutTextLabel}>0751 986 447 </Text>
                                <View style={{height:30}} ></View>
                                <View>
                                <Text  onPress={()=>{Linking.openURL('mailto:katoadirumwanje@gmail.com');}} style={styles.AboutTextLabel}>katoadirumwanje@gmail.com</Text>
                                </View>
                                <View style={{height:30}} ></View>
                            <View style={{height:15}}></View>
                                
                            <View style={styles.modalCloseBtnView}>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={() => this.setModalVisible(!modalVisible)}>
                                <Text style={styles.btnText}>Close</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                </View>








        





































            <View style={styles.MainBottomSpaceView}></View>
            </ScrollView>


        </View>
    );
}
}
