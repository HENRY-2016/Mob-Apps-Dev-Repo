
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import YoutubePlayer from 'react-native-youtube-iframe';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { OpenExternalLinks } from './Functions';
import CustomSlider from './CustomSlider'
import {Picker} from '@react-native-picker/picker';
import { COLORS } from './Colors';

import { EmptyInputsErrorMsg,NetworkErrorMsg } from './Alerts';
import {
            APIListYears, ImageUrl,APIListTravelListingUpcomingDetails,
            APIPostSafariBooking,APIPostSafariInquiry
        } from './DataFileApis';

import { CircleImageHight,CircleImageWidth,CircleImageBorderRadius,
        CircleImageBorderWidth,BookingHotelTypes,UiButtonMarginTop,
        UiButtonWidth,UiButtonPaddingTop,UiButtonHeight,VacationTypes,
        UiButtonBorderRadius,UiButtonMarginRight, Countries,
        DateDays,DateMonthsNames,BookingNumberOfPeople
        } from './Constants';


import {    
            // Functions 
            initSafarisScreenSafarisProfileAppData,initSafarisScreenSafarisMoreInfoAppData,
            initSafarisScreenSafarisParksVirtualTourAppData,initSafarisScreenSafarisTourTripsAppData,

            // Data
            UgandaBirdingImages, UgandaGorillasImages,UgandaWildLifeImages,
            UgandaChimpanzeeImages,UgandaHikingImages,UgandaNatureImages,
            UgandaBirdingDescription,UgandaGorillasDescription,UgandaWildLifeDescription,
            UgandaChimpanzeeDescription,UgandaHikingDescription,UgandaNatureDescription,
            UgandaBirdingText,UgandaGorillasText,UgandaWildLifeText,
            UgandaChimpanzeeText,UgandaHikingText,UgandaNatureText,

            RwandaBirdingImages,RwandaGorillasImages,RwandaWildLifeImages,
            RwandaBirdingDescription,RwandaGorillasDescription,RwandaWildLifeDescription,
            RwandaBirdingText,RwandaGorillasText,RwandaWildLifeText,

            // Parks 
            UgandaParks,RwandaParks,VirtualTour,

            // Tour Trips
            TravelUpcomingSoon,TravelUpcomingNotSoon,TravelListingOnGoing,TravelListingFinished,AirTicketingText, 
            AirTicketingImages,CarHiringText, CarHiringImages,TipsText, TipsImages,OffersText,OffersImages

        } from './AppDataFile';

// images 
import TravelBookNowIcon from  "../imgs/Safaris/Travel/BookNow.png";
import InquiryIcon from "../imgs/Safaris/inquire.png";
export default class Safaris extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                        DateYearsNames:[],
                        TourTripsListingUpcomingDetails:[],

                        StartingDateDay:'',EndingDateDay:'',
                        StartingDateMonth:'',EndingDateMonth:'',
                        StartingDateYear:'',EndingDateYear:'',
                        StartingSelectedDate:'dd mm yy',EndingSelectedDate:'dd mm yy',

                        TourTripsListingUpcomingDetailsId:'',

            images:[
                "https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/l-1.png",
                "https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/l-2.png",
                "https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/l-3.png",
                "https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/l-4.png",
            ],


            DoNotShowUgandaSafarisScreen:false,
            DoNotShowRwandaSafarisScreen:true,
            DoNotShowUgandaParksScreen:true,
            DoNotShowRwandaParksScreen:true,
            DoNotShowVirtualTourScreen:true,
            DoNotShowTourTripsScreen:true,

            // Sub Screens- Sub Screens
            DoNotShowUgandaSafarisDetailsScreen:false,
            DoNotShowUgandaSafarisInquireUsScreen:true,
            DoNotShowUgandaSafarisMoreInfoScreen:true,
            DoNotShowUgandaSafarisBookNowScreen:true,


            // Uganda Safari sub Screens 
            DoNotShowUgandaBirdingScreen:false,
            DoNotShowUgandaGorillasScreen:true,
            DoNotShowUgandaChimpanzeeScreen:true,
            DoNotShowUgandaWildLifeScreen:true,
            DoNotShowUgandaHikingScreen:true,
            DoNotShowUgandaNatureScreen:true,

            // DoNot Show Uganda Booking Sub Screens
            DoNotShowUgandaSafarisBirdingBookNowFormScreen:false,
            DoNotShowUgandaSafarisBirdingBookNowSummaryScreen:true,
            DoNotShowUgandaSafarisGorillasBookNowFormScreen:false,
            DoNotShowUgandaSafarisGorillasBookNowSummaryScreen:true,
            DoNotShowUgandaSafarisWildLifeBookNowFormScreen:false,
            DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen:true,
            DoNotShowUgandaSafarisChimpanzeeBookNowFormScreen:false,
            DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen:true,
            DoNotShowUgandaSafarisHikingBookNowFormScreen:false,
            DoNotShowUgandaSafarisHikingBookNowSummaryScreen:true,
            DoNotShowUgandaSafarisNatureBookNowFormScreen:false,
            DoNotShowUgandaSafarisNatureBookNowSummaryScreen:true,

            // DoNot Show Rwanda Booking Sub Screens
            DoNotShowRwandaSafarisBirdingBookNowFormScreen:false,
            DoNotShowRwandaSafarisBirdingBookNowSummaryScreen:true,
            DoNotShowRwandaSafarisGorillasBookNowFormScreen:false,
            DoNotShowRwandaSafarisGorillasBookNowSummaryScreen:true,
            DoNotShowRwandaSafarisWildLifeBookNowFormScreen:false,
            DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen:true,

            


            // Rwanda - Safaris
            DoNotShowRwandaBirdingScreen:false,
            DoNotShowRwandaGorillasScreen:true,
            DoNotShowRwandaWildLifeScreen:true,
            DoNotShowRwandaSafarisDetailsScreen:false,
            DoNotShowRwandaSafarisInquireUsScreen:true,
            DoNotShowRwandaSafarisMoreInfoScreen:true,
            DoNotShowRwandaSafarisBookNowScreen:true,


            // DoNotShow Tour Trips Sub Screens
            DoNotShowTourTripsSeeListingScreen:false,
            DoNotShowTourTipsSeeUpcomingScreen:true,
            DoNotShowTourTripsSeeOffersScreen:true,
            DoNotShowTourTripsBookNowScreen:true,
            DoNotShowTourTripsCarHiringScreen:true,
            DoNotShowTourTripsTipsScreen:true,
            DoNotShowTourTripsAirTicketingScreen:true,

            // DoNotShow Tour Tips Listing See Upcoming Details Sub Screens
            DoNotShowTourTripsSeeListingSummaryScreen:false,
            DoNotShowTourTripsSeeListingDetailsScreen:true,
            DoNotShowTourTipsSeeUpcomingSummaryScreen:false,
            DoNotShowTourTipsSeeUpcomingDetailsScreen:true,


            // DoNotShow Tour Trips BookNow Screens
            DoNotShowTourTripsBookNowFormScreen:false,
            DoNotShowTourTripsBookNowSummaryScreen:true,

            // DoNotShow Tour Trips CarHiring Sub Screens
            DoNotShowTourTripsCarHiringDetailsScreen:false,
            DoNotShowTourTripsCarHiringHireScreen:true,
            DoNotShowTourTripsCarHiringHireSummaryScreen:true,

            // DoNotShow World Travels Sub Screen
            DoNotShowWorldTravelsPackagesScreen:false,
            DoNotShowWorldTravelsBookNowScreen:true,
            DoNotShowWorldTravelsBookNowFormScreen:false,
            DoNotShowWorldTravelsBookNowSummaryScreen:true,

            
            MainTopNavigationButtons: [
                { btnId: '1', Action:'UgandaSafaris', btnName: 'Uganda Safaris',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '2', Action:'RwandaSafaris', btnName: 'Rwanda Safaris', btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '3', Action:'UgandaParks', btnName: 'Uganda Parks',btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '4', Action:'RwandaParks', btnName: 'Rwanda Parks', btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '5', Action:'VirtualTour', btnName: 'Virtual Touring', btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},
                { btnId: '6', Action:'Travels', btnName: 'Tour Trips', btnNameTextColor:COLORS.white, btnBgColor:COLORS.MainCardColor},                
                ],

            SafarisUgandaNames: 
                [
                    { imageId: '1', Action:'Birding',imageName: 'Birding', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'UgandaBirding.png'},
                    { imageId: '2', Action:'Gorillas',imageName: 'Gorillas', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'UgandaGorillas.png'},
                    { imageId: '4', Action:'Wildlife',imageName: 'Wild Life', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+'UgandaWildLife.png'},
                    { imageId: '3', Action:'Chimpanzee', imageName: 'Chimpanzee', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'UgandaChimpanzee.png'},
                    { imageId: '5', Action:'Hiking', imageName: 'Hiking', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+'UgandaHiking.png'},
                    { imageId: '6', Action:'Nature', imageName: 'Nature', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+'UgandaNature.png'},
                ],
            SafarisRwandaNames: 
                [
                    { imageId: '1', Action:'Birding',imageName: 'Birding', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'RwandaBirding.png'},
                    { imageId: '2', Action:'Gorillas',imageName: 'Gorillas', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'UgandaGorillas.png'},
                    { imageId: '3', Action:'Wildlife',imageName: 'Wild Life', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+'UgandaWildLife.png'},
                ],

            TravelSubMenus: 
                [
                    { imageId: '1', Action:'SeeListing',imageName: 'Listing', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'TourTripsListing.png'},
                    { imageId: '2', Action:'SeeUpcoming',imageName: 'Upcoming', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'TourTripsUpcoming.png'},
                    { imageId: '3', Action:'SeeOffers',imageName: 'Offers', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'TourTripsOffers.png'},
                    { imageId: '4', Action:'BookNow',imageName: 'Book Now', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+'TourTripsBookNow.png'},
                    { imageId: '5', Action:'TravelsTips', imageName: 'Tour Tips', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'TourTripsTourTips.png'},
                    { imageId: '6', Action:'CarHiring', imageName: 'Car Hiring', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'TourTripsCarHiring.png'},
                    { imageId: '7', Action:'AirTicketing',imageName: 'Ticketing', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+'TourTripsTicketing.png'},
                ],

                BookingHotelTypesValue:'',
                BookingNumberOfPeopleValue:'',
                CountrySelectedValue:'',
                PhoneCountryCode:'',
                CountrySelected:'',
                BookingPackageName:'',
                VacationTypeValue:'',

                BookingName:'',BookingPhone:'',BookingEmail:'',InquireUsEmail:'',
                InquireUsName:'',InquireUsPhone:'',InquireUsQuestion:'',

                // Car Hiring
                CarHiringIndividual:'',CarHiringDriver:'',

                // Logged In User 
                UserFullName:'',UserId:'',
                UserPhone:'',UserUserName:'',
                UserCountry:'',UserEmail:'',
                

        } 
    }

UNSAFE_componentWillMount ()
{
    // checkInternetConnectionToHost();
    // this.getDataFromServer (APIListCountries,'Countries');
    this.getDataFromServer (APIListYears,'DateYearsNames');
}
componentDidMount()
{
    this.initializeUserDetails();this.setInitialActiveColor(); 
    console.log("");console.log("");
    console.log("=====>Inside Safaris Screen");
    
}
initializeUserDetails = () => 
{
    try 
    {   
        AsyncStorage.getItem('UserDetails').then((Details)=>{
        if (Details !== null) {
            // We have data!!
            const jsonData = JSON.parse(Details)
            let FullName = jsonData[0].FullName;
            let UserName = jsonData[0].UserName;
            let Country= jsonData[0].Country;
            let Phone= jsonData[0].Phone;
            let Email= jsonData[0].Email;

            this.setState({UserFullName:FullName});
            this.setState({UserUserName:UserName});
            this.setState({UserCountry:Country});
            this.setState({UserPhone:Phone});
            this.setState({UserEmail:Email});
        }
        else {}
        })
    }catch (error) { console.log(error)}
}


getDataFromServer = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({[StateName]:[...JSON.parse(results)]})
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>"+StateName)})

}

getTourTripsListingUpcomingDetailsData = (id) =>
{

    // Get Data From Host
    axios.get(APIListTravelListingUpcomingDetails+id)
    .then(res => {
        let results =JSON.stringify(res.data);
        this.setState({TourTripsListingUpcomingDetails:[...JSON.parse(results)]})
        })
    .catch(err=>{console.log(err)})
    // Alert.alert("An Error",NetworkErrorMsg)};

}
setInitialActiveColor = () => 
{
    let MainTopNavigationButtons = JSON.parse(JSON.stringify(this.state.MainTopNavigationButtons));
    let SafarisUgandaNames = JSON.parse(JSON.stringify(this.state.SafarisUgandaNames));
    let SafarisRwandaNames = JSON.parse(JSON.stringify(this.state.SafarisRwandaNames));
    let TravelSubMenus = JSON.parse(JSON.stringify(this.state.TravelSubMenus));


    // For buttons 
    for (let x = 0; x < this.state.MainTopNavigationButtons.length; x++) 
    {
        if (this.state.MainTopNavigationButtons[x].btnId == 1) 
        {
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons});
        }
    }

    // For Images 
    for (let x = 0; x < this.state.SafarisUgandaNames.length; x++) 
    {
        if (this.state.SafarisUgandaNames[x].imageId == 1) 
        {
            SafarisUgandaNames[x].imageBorderColor = COLORS.TabsTextActiveColor;
            SafarisUgandaNames[x].imageNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({SafarisUgandaNames: SafarisUgandaNames,});
        } 
    }
    for (let x = 0; x < this.state.SafarisRwandaNames.length; x++) 
    {
        if (this.state.SafarisRwandaNames[x].imageId == 1) 
        {
            SafarisRwandaNames[x].imageBorderColor = COLORS.TabsTextActiveColor;
            SafarisRwandaNames[x].imageNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({SafarisRwandaNames: SafarisRwandaNames,});
        } 
    }

    // For Travels Sub Link Images 
    for (let x = 0; x < this.state.TravelSubMenus.length; x++) 
    {
        if (this.state.TravelSubMenus[x].imageId == 1) 
        {
            TravelSubMenus[x].imageBorderColor = COLORS.TabsTextActiveColor;
            TravelSubMenus[x].imageNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({TravelSubMenus: TravelSubMenus,});
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
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainColorOne;
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
            // Display Screens Basing on Actions And Update App Content Data
            let Action = MainTopNavigationButtons[x].Action
            if (Action==="UgandaSafaris"){this.showUgandaSafarisScreen(); setTimeout(()=>{initSafarisScreenSafarisProfileAppData()},1000);setTimeout(()=>{initSafarisScreenSafarisMoreInfoAppData()},2000);}
            else if (Action==="RwandaSafaris"){this.showRwandaSafarisScreen(); setTimeout(()=>{initSafarisScreenSafarisProfileAppData()},1000);setTimeout(()=>{initSafarisScreenSafarisMoreInfoAppData()},2000);}
            else if (Action==="UgandaParks"){this.showUgandaParksScreen(); setTimeout(()=>{initSafarisScreenSafarisParksVirtualTourAppData()},1000);}
            else if (Action==="RwandaParks"){this.showRwandaParksScreen(); setTimeout(()=>{initSafarisScreenSafarisParksVirtualTourAppData()},1000);}
            else if (Action==="VirtualTour"){this.showVirtualTouringScreen();setTimeout(()=>{initSafarisScreenSafarisParksVirtualTourAppData()},1000);}
            else if (Action==="Travels"){this.showTourTripsScreen(); setTimeout(()=>{initSafarisScreenSafarisTourTripsAppData()},1000);}
            else if (Action==="WorldTravels"){this.showWorldTravelsScreen();}
        } 
        else 
        {
            MainTopNavigationButtons[x].btnBgColor = COLORS.MainCardColor;
            MainTopNavigationButtons[x].btnNameTextColor = COLORS.white;
            this.setState({MainTopNavigationButtons: MainTopNavigationButtons,});
        }
    }
};

changeUgandaImageLinksBorderColor = (item) => 
{
    let SafarisUgandaNames = JSON.parse(JSON.stringify(this.state.SafarisUgandaNames));

    for (let x = 0; x < this.state.SafarisUgandaNames.length; x++) 
    {
        if (this.state.SafarisUgandaNames[x].imageId == item.imageId) 
        {
            SafarisUgandaNames[x].imageBorderColor = COLORS.TabsTextActiveColor;
            SafarisUgandaNames[x].imageNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({SafarisUgandaNames: SafarisUgandaNames,});
            // Display Screens Basing on Actions
            let Action = SafarisUgandaNames[x].Action
            
            if (Action==="Birding"){this.showUgandaBirdingScreen();}
            else if (Action==="Gorillas"){this.showUgandaGorillasScreen();}
            else if (Action==="Wildlife"){this.showUgandaWildLifeScreen();}
            else if (Action==="Chimpanzee"){this.showUgandaChimpanzeeScreen();}
            else if (Action==="Hiking"){this.showUgandaHikingScreen();}
            else if (Action==="Nature"){this.showUgandaNatureScreen();}
        } 
        else 
        {
            SafarisUgandaNames[x].imageBorderColor = COLORS.white;
            SafarisUgandaNames[x].imageNameTextColor = COLORS.white;
            this.setState({SafarisUgandaNames: SafarisUgandaNames,});
        }
    }
};

changeRwandaImageLinksBorderColor = (item) => 
{
    let SafarisRwandaNames = JSON.parse(JSON.stringify(this.state.SafarisRwandaNames));

    for (let x = 0; x < this.state.SafarisRwandaNames.length; x++) 
    {
        if (this.state.SafarisRwandaNames[x].imageId == item.imageId) 
        {
            SafarisRwandaNames[x].imageBorderColor = COLORS.TabsTextActiveColor;
            SafarisRwandaNames[x].imageNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({SafarisRwandaNames: SafarisRwandaNames,});
            let Action = SafarisRwandaNames[x].Action
            if (Action==="Birding"){this.showRwandaBirdingScreen();}
            else if (Action==="Gorillas"){this.showRwandaGorillasScreen();}
            else if (Action==="Wildlife"){this.showRwandaWildLifeScreen();}
        } 
        else 
        {
            SafarisRwandaNames[x].imageBorderColor = COLORS.white;
            SafarisRwandaNames[x].imageNameTextColor = COLORS.white;
            this.setState({SafarisRwandaNames: SafarisRwandaNames,});
        }
    }
};




changeTravelsImageBorderColor = (item) => 
{
    let TravelSubMenus = JSON.parse(JSON.stringify(this.state.TravelSubMenus));

    for (let x = 0; x < this.state.TravelSubMenus.length; x++) 
    {
        if (this.state.TravelSubMenus[x].imageId == item.imageId) 
        {
            TravelSubMenus[x].imageBorderColor = COLORS.TabsTextActiveColor;
            TravelSubMenus[x].imageNameTextColor = COLORS.TabsTextActiveColor;
            this.setState({TravelSubMenus: TravelSubMenus,});
            // Display Screens Basing on Actions
            let Action = TravelSubMenus[x].Action
            
            if (Action==="SeeListing"){this.showTourTripsSeeListingScreen();}
            else if (Action==="SeeOffers"){this.showTourTripsSeeOffersScreen();}
            else if (Action==="SeeUpcoming"){this.showTourTipsSeeUpcomingScreen();}
            else if (Action==="BookNow"){this.showTourTripsBookNowScreen();}
            else if (Action==="CarHiring"){this.showTourTripsCarHiringScreen();}
            else if (Action==="AirTicketing"){this.showTravelAirTicketingScreen();}
            else if (Action==="TravelsTips"){this.showTourTripsTipsScreen();}
        } 
        else 
        {
            TravelSubMenus[x].imageBorderColor = COLORS.white;
            TravelSubMenus[x].imageNameTextColor = COLORS.white;
            this.setState({TravelSubMenus: TravelSubMenus,});
        }
    }
};


setBookingHotelTypesValue = (text) =>{this.setState({BookingHotelTypesValue:text})}
setBookingNumberOfPeopleValue = (text) =>{this.setState({BookingNumberOfPeopleValue:text})}
setBookingPackageValue=(text) =>{this.setState({BookingPackageName:text})}
setVacationTypeValue = (text) =>{this.setState({VacationTypeValue:text})}
setStartingDateDay = (text) =>  {this.setState({StartingDateDay:text}), setTimeout(this.setStartingSelectedDate,1000)}
setStartingDateMonth = (text) =>  {this.setState({StartingDateMonth:text}),setTimeout(this.setStartingSelectedDate,1000)}
setStartingDateYear = (text) =>  {this.setState({StartingDateYear:text}),setTimeout(this.setStartingSelectedDate,1000)}
setEndingDateDay = (text) =>  {this.setState({EndingDateDay:text}), setTimeout(this.setEndingSelectedDate,1000)}
setEndingDateMonth = (text) =>  {this.setState({EndingDateMonth:text}),setTimeout(this.setEndingSelectedDate,1000)}
setEndingDateYear = (text) =>  {this.setState({EndingDateYear:text}),setTimeout(this.setEndingSelectedDate,1000)}
setUserBookingName = (text)=>{this.setState({BookingName:text})}
setUserBookingEmail = (text)=>{this.setState({BookingEmail:text})}
setUserBookingPhone = (text)=>{this.setState({BookingPhone:text})}
setUserBookingPackageName = (text)=>{this.setState({BookingPackageName:text})}
setUserInquireUsName = (text)=>{this.setState({InquireUsName:text})}
setUserInquireUsEmail= (text)=>{this.setState({InquireUsEmail:text})}
setUserInquireUsPhone = (text)=>{this.setState({InquireUsPhone:text})}
setUserInquireUsQuestion = (text)=>{this.setState({InquireUsQuestion:text})}
setCarHiringIndividual = (text)=>{this.setState({CarHiringIndividual:text})}
setCarHiringDriver = (text)=>{this.setState({CarHiringDriver:text})}

setStartingSelectedDate = ()=>
{
    let day = this.state.StartingDateDay;
    let month = this.state.StartingDateMonth;
    let year = this.state.StartingDateYear;
    let date = day+" "+month+" "+year
    this.setState({StartingSelectedDate:date})
}
setEndingSelectedDate = ()=>
{
    let day = this.state.EndingDateDay;
    let month = this.state.EndingDateMonth;
    let year = this.state.EndingDateYear;
    let date = day+" "+month+" "+year
    this.setState({EndingSelectedDate:date})
}
setCountrySelectedValue  = (text) =>
{
    // const CountriesArr = [...this.state.Countries]
    const CountriesArr = [...Countries]
    let Index = text.split(':');
    let country = Index[0]
    let arraryIndex = Index[1]
    let code = CountriesArr[arraryIndex]
    let phoneCode = code.CountryCode;
    // countryCode
    this.setState({PhoneCountryCode:phoneCode});
    this.setState({CountrySelected:country});
}
showUgandaSafarisScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisScreen:true});
    this.setState({DoNotShowUgandaParksScreen:true});
    this.setState({DoNotShowRwandaParksScreen:true});
    this.setState({DoNotShowVirtualTourScreen:true});
    this.setState({DoNotShowTourTripsScreen:true});
    this.setState({DoNotShowUgandaSafarisScreen:false});
}

showRwandaSafarisScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisScreen:true});
    this.setState({DoNotShowUgandaParksScreen:true});
    this.setState({DoNotShowRwandaParksScreen:true});
    this.setState({DoNotShowVirtualTourScreen:true});
    this.setState({DoNotShowTourTripsScreen:true});
    this.setState({DoNotShowRwandaSafarisScreen:false});
}
showRwandaBirdingScreen = () =>
{
    this.setState({DoNotShowRwandaGorillasScreen:true});
    this.setState({DoNotShowRwandaWildLifeScreen:true});
    this.setState({DoNotShowRwandaBirdingScreen:false});
}
showRwandaGorillasScreen = () =>
{
    this.setState({DoNotShowRwandaWildLifeScreen:true});
    this.setState({DoNotShowRwandaBirdingScreen:true});
    this.setState({DoNotShowRwandaGorillasScreen:false});
}
showRwandaWildLifeScreen = () =>
{
    this.setState({DoNotShowRwandaBirdingScreen:true});
    this.setState({DoNotShowRwandaGorillasScreen:true});
    this.setState({DoNotShowRwandaWildLifeScreen:false});
}
showRwandaSafarisDetailsScreen = () => 
{
    this.setState({DoNotShowRwandaSafarisInquireUsScreen:true});
    this.setState({DoNotShowRwandaSafarisMoreInfoScreen:true});
    this.setState({DoNotShowRwandaSafarisBookNowScreen:true});
    this.setState({DoNotShowRwandaSafarisDetailsScreen:false});
}
showRwandaSafarisInquireUsScreen = () => 
{
    this.setState({DoNotShowRwandaSafarisMoreInfoScreen:true});
    this.setState({DoNotShowRwandaSafarisBookNowScreen:true});
    this.setState({DoNotShowRwandaSafarisDetailsScreen:true});
    this.setState({DoNotShowRwandaSafarisInquireUsScreen:false});
}
showRwandaSafarisMoreInfoScreen = () => 
{
    this.setState({DoNotShowRwandaSafarisDetailsScreen:true});
    this.setState({DoNotShowRwandaSafarisInquireUsScreen:true});
    this.setState({DoNotShowRwandaSafarisBookNowScreen:true});
    this.setState({DoNotShowRwandaSafarisMoreInfoScreen:false});
}

showRwandaSafarisBookNowScreen = (Package) => 
{
    this.setState({BookingPackageName:Package});
    this.setState({DoNotShowRwandaSafarisMoreInfoScreen:true});
    this.setState({DoNotShowRwandaSafarisDetailsScreen:true});
    this.setState({DoNotShowRwandaSafarisInquireUsScreen:true});
    this.setState({DoNotShowRwandaSafarisBookNowScreen:false});
}

showUgandaParksScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisScreen:true});
    this.setState({DoNotShowRwandaParksScreen:true});
    this.setState({DoNotShowVirtualTourScreen:true});
    this.setState({DoNotShowTourTripsScreen:true});
    this.setState({DoNotShowRwandaSafarisScreen:true});
    this.setState({DoNotShowUgandaParksScreen:false});
}
showRwandaParksScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisScreen:true});
    this.setState({DoNotShowVirtualTourScreen:true});
    this.setState({DoNotShowTourTripsScreen:true});
    this.setState({DoNotShowRwandaSafarisScreen:true});
    this.setState({DoNotShowUgandaParksScreen:true});
    this.setState({DoNotShowRwandaParksScreen:false});
}
showVirtualTouringScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisScreen:true});
    this.setState({DoNotShowTourTripsScreen:true});
    this.setState({DoNotShowRwandaSafarisScreen:true});
    this.setState({DoNotShowUgandaParksScreen:true});
    this.setState({DoNotShowRwandaParksScreen:true});
    this.setState({DoNotShowVirtualTourScreen:false});
}
showTourTripsScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisScreen:true});
    this.setState({DoNotShowRwandaSafarisScreen:true});
    this.setState({DoNotShowUgandaParksScreen:true});
    this.setState({DoNotShowRwandaParksScreen:true});
    this.setState({DoNotShowVirtualTourScreen:true});
    this.setState({DoNotShowTourTripsScreen:false});
}
showTourTripsBookNowFormScreen = () =>
{
    this.setState({DoNotShowTourTripsBookNowSummaryScreen:true});
    this.setState({DoNotShowTourTripsBookNowFormScreen:false});
}
showTourTripsBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowTourTripsBookNowFormScreen:true});
    this.setState({DoNotShowTourTripsBookNowSummaryScreen:false});
}
showUgandaBirdingScreen = () =>
{
    this.setState({DoNotShowUgandaGorillasScreen:true});
    this.setState({DoNotShowUgandaChimpanzeeScreen:true});
    this.setState({DoNotShowUgandaWildLifeScreen:true});
    this.setState({DoNotShowUgandaHikingScreen:true});
    this.setState({DoNotShowUgandaNatureScreen:true});
    this.setState({DoNotShowUgandaBirdingScreen:false});
    
}
showUgandaSafarisDetailsScreen = () => 
{
    this.setState({DoNotShowUgandaSafarisInquireUsScreen:true});
    this.setState({DoNotShowUgandaSafarisMoreInfoScreen:true});
    this.setState({DoNotShowUgandaSafarisBookNowScreen:true});
    this.setState({DoNotShowUgandaSafarisDetailsScreen:false});
}
showUgandaSafarisInquireUsScreen = () => 
{
    this.setState({DoNotShowUgandaSafarisMoreInfoScreen:true});
    this.setState({DoNotShowUgandaSafarisBookNowScreen:true});
    this.setState({DoNotShowUgandaSafarisDetailsScreen:true});
    this.setState({DoNotShowUgandaSafarisInquireUsScreen:false});
}
showUgandaSafarisMoreInfoScreen = () => 
{
    this.setState({DoNotShowUgandaSafarisDetailsScreen:true});
    this.setState({DoNotShowUgandaSafarisInquireUsScreen:true});
    this.setState({DoNotShowUgandaSafarisBookNowScreen:true});
    this.setState({DoNotShowUgandaSafarisMoreInfoScreen:false});
}

showUgandaSafarisBookNowScreen = () => 
{
    this.setState({DoNotShowUgandaSafarisMoreInfoScreen:true});
    this.setState({DoNotShowUgandaSafarisDetailsScreen:true});
    this.setState({DoNotShowUgandaSafarisInquireUsScreen:true});
    this.setState({DoNotShowUgandaSafarisBookNowScreen:false});
}


showUgandaGorillasScreen = () =>
{
    this.setState({DoNotShowUgandaChimpanzeeScreen:true});
    this.setState({DoNotShowUgandaWildLifeScreen:true});
    this.setState({DoNotShowUgandaHikingScreen:true});
    this.setState({DoNotShowUgandaNatureScreen:true});
    this.setState({DoNotShowUgandaBirdingScreen:true});
    this.setState({DoNotShowUgandaGorillasScreen:false});
}
showUgandaChimpanzeeScreen = () =>
{
    this.setState({DoNotShowUgandaWildLifeScreen:true});
    this.setState({DoNotShowUgandaHikingScreen:true});
    this.setState({DoNotShowUgandaNatureScreen:true});
    this.setState({DoNotShowUgandaBirdingScreen:true});
    this.setState({DoNotShowUgandaGorillasScreen:true});
    this.setState({DoNotShowUgandaChimpanzeeScreen:false});
}
showUgandaWildLifeScreen = () =>
{
    this.setState({DoNotShowUgandaHikingScreen:true});
    this.setState({DoNotShowUgandaNatureScreen:true});
    this.setState({DoNotShowUgandaBirdingScreen:true});
    this.setState({DoNotShowUgandaGorillasScreen:true});
    this.setState({DoNotShowUgandaChimpanzeeScreen:true});
    this.setState({DoNotShowUgandaWildLifeScreen:false});
}

showUgandaHikingScreen = () =>
{
    this.setState({DoNotShowUgandaNatureScreen:true});
    this.setState({DoNotShowUgandaBirdingScreen:true});
    this.setState({DoNotShowUgandaGorillasScreen:true});
    this.setState({DoNotShowUgandaChimpanzeeScreen:true});
    this.setState({DoNotShowUgandaWildLifeScreen:true});
    this.setState({DoNotShowUgandaHikingScreen:false});
}
showUgandaNatureScreen = () =>
{
    this.setState({DoNotShowUgandaBirdingScreen:true});
    this.setState({DoNotShowUgandaGorillasScreen:true});
    this.setState({DoNotShowUgandaChimpanzeeScreen:true});
    this.setState({DoNotShowUgandaWildLifeScreen:true});
    this.setState({DoNotShowUgandaHikingScreen:true});
    this.setState({DoNotShowUgandaNatureScreen:false});
}

showWorldTravelsPackagesScreen = () =>
{
    this.setState({DoNotShowWorldTravelsBookNowScreen:true});
    this.setState({DoNotShowWorldTravelsPackagesScreen:false});
}

showWorldTravelsBookNowScreen = () =>
{
    this.setState({DoNotShowWorldTravelsPackagesScreen:true});
    this.setState({DoNotShowWorldTravelsBookNowScreen:false});
}
showWorldTravelsBookNowFormScreen = ()  =>
{
    this.setState({DoNotShowWorldTravelsBookNowSummaryScreen:true});
    this.setState({DoNotShowWorldTravelsBookNowFormScreen:false});
}
showWorldTravelsBookNowSummaryScreen = ()  =>
{
    this.setState({DoNotShowWorldTravelsBookNowFormScreen:true});
    this.setState({DoNotShowWorldTravelsBookNowSummaryScreen:false});
}
// Travels sub screen
showTourTripsSeeListingScreen = () =>
{
    this.setState({DoNotShowTourTripsSeeOffersScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:true});
    this.setState({DoNotShowTourTripsBookNowScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:true});
    this.setState({DoNotShowTourTripsCarHiringScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:true});
    this.setState({DoNotShowTourTripsSeeListingScreen:false});
}
showTourTripsSeeListingSummaryScreen = (id) =>
{
    this.getTourTripsListingUpcomingDetailsData(id);
    this.setState({DoNotShowTourTripsSeeListingDetailsScreen:true});
    this.setState({DoNotShowTourTripsSeeListingSummaryScreen:false});
}
showTourTripsSeeListingDetailsScreen = (id) =>
{
    this.getTourTripsListingUpcomingDetailsData(id);
    this.setState({DoNotShowTourTripsSeeListingSummaryScreen:true});
    this.setState({DoNotShowTourTripsSeeListingDetailsScreen:false});
}
showTourTipsSeeUpcomingScreen = () =>
{

    this.setState({DoNotShowTourTripsBookNowScreen:true});
    this.setState({DoNotShowTourTripsCarHiringScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:true});
    this.setState({DoNotShowTourTripsSeeListingScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:true});
    this.setState({DoNotShowTourTripsSeeOffersScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:false});
}
showTourTipsSeeUpcomingSummaryScreen = () =>
{
    this.setState({DoNotShowTourTipsSeeUpcomingDetailsScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingSummaryScreen:false});
}
showTourTipsSeeUpcomingDetailsScreen = () =>
{
    this.setState({DoNotShowTourTipsSeeUpcomingSummaryScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingDetailsScreen:false});
}
showTourTripsSeeOffersScreen = () =>
{
    this.setState({DoNotShowTourTripsBookNowScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:true});
    this.setState({DoNotShowTourTripsCarHiringScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:true});
    this.setState({DoNotShowTourTripsSeeListingScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:true});
    this.setState({DoNotShowTourTripsSeeOffersScreen:false});
}
showTourTripsBookNowScreen = () =>
{
    this.setState({DoNotShowTourTripsCarHiringScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:true});
    this.setState({DoNotShowTourTripsSeeListingScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:true});
    this.setState({DoNotShowTourTripsSeeOffersScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:true});
    this.setState({DoNotShowTourTripsBookNowScreen:false});
}
showTourTripsCarHiringScreen = () =>
{
    this.setState({DoNotShowTourTripsSeeListingScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:true});
    this.setState({DoNotShowTourTripsSeeOffersScreen:true});
    this.setState({DoNotShowTourTripsBookNowScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:true});
    this.setState({DoNotShowTourTripsCarHiringScreen:false});
}
showTourTripsCarHiringDetailsScreen = () =>
{
    this.setState({DoNotShowTourTripsCarHiringHireScreen:true});
    this.setState({DoNotShowTourTripsCarHiringHireSummaryScreen:true});
    this.setState({DoNotShowTourTripsCarHiringDetailsScreen:false});
}
showTourTripsCarHiringHireScreen = () =>
{
    this.setState({DoNotShowTourTripsCarHiringHireSummaryScreen:true});
    this.setState({DoNotShowTourTripsCarHiringDetailsScreen:true});
    this.setState({DoNotShowTourTripsCarHiringHireScreen:false});
}

showTourTripsCarHiringHireSummaryScreen = () =>
{
    this.setState({DoNotShowTourTripsCarHiringDetailsScreen:true});
    this.setState({DoNotShowTourTripsCarHiringHireScreen:true});
    this.setState({DoNotShowTourTripsCarHiringHireSummaryScreen:false});
}

showTourTripsTipsScreen = () =>
{
    this.setState({DoNotShowTourTripsSeeListingScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:true});
    this.setState({DoNotShowTourTripsSeeOffersScreen:true});
    this.setState({DoNotShowTourTripsBookNowScreen:true});
    this.setState({DoNotShowTourTripsCarHiringScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:false});
}

showTravelAirTicketingScreen = () =>
{
    this.setState({DoNotShowTourTripsSeeListingScreen:true});
    this.setState({DoNotShowTourTipsSeeUpcomingScreen:true});
    this.setState({DoNotShowTourTripsSeeOffersScreen:true});
    this.setState({DoNotShowTourTripsBookNowScreen:true});
    this.setState({DoNotShowTourTripsCarHiringScreen:true});
    this.setState({DoNotShowTourTripsTipsScreen:true});
    this.setState({DoNotShowTourTripsAirTicketingScreen:false});
}

// Safaris Booking Screens
showRwandaSafarisBirdingBookNowFormScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisBirdingBookNowSummaryScreen:true});
    this.setState({DoNotShowRwandaSafarisBirdingBookNowFormScreen:false});
}
showRwandaSafarisBirdingBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisBirdingBookNowFormScreen:true});
    this.setState({DoNotShowRwandaSafarisBirdingBookNowSummaryScreen:false});
}

showRwandaSafarisGorillasBookNowFormScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisGorillasBookNowSummaryScreen:true});
    this.setState({DoNotShowRwandaSafarisGorillasBookNowFormScreen:false});
}
showRwandaSafarisGorillasBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisGorillasBookNowFormScreen:true});
    this.setState({DoNotShowRwandaSafarisGorillasBookNowSummaryScreen:false});
}
showRwandaSafarisWildLifeBookNowFormScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen:true});
    this.setState({DoNotShowRwandaSafarisWildLifeBookNowFormScreen:false});
}
showRwandaSafarisWildLifeBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowRwandaSafarisWildLifeBookNowFormScreen:true});
    this.setState({DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen:false});
}

showUgandaSafarisBirdingBookNowFormScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisBirdingBookNowSummaryScreen:true});
    this.setState({DoNotShowUgandaSafarisBirdingBookNowFormScreen:false});
}
showUgandaSafarisBirdingBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisBirdingBookNowFormScreen:true});
    this.setState({DoNotShowUgandaSafarisBirdingBookNowSummaryScreen:false});
}

showUgandaSafarisGorillasBookNowFormScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisGorillasBookNowSummaryScreen:true});
    this.setState({DoNotShowUgandaSafarisGorillasBookNowFormScreen:false});
}
showUgandaSafarisGorillasBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisGorillasBookNowFormScreen:true});
    this.setState({DoNotShowUgandaSafarisGorillasBookNowSummaryScreen:false});
}
showUgandaSafarisWildLifeBookNowFormScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen:true});
    this.setState({DoNotShowUgandaSafarisWildLifeBookNowFormScreen:false});
}
showUgandaSafarisWildLifeBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisWildLifeBookNowFormScreen:true});
    this.setState({DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen:false});
}
showUgandaSafarisChimpanzeeBookNowFormScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen:true});
    this.setState({DoNotShowUgandaSafarisChimpanzeeBookNowFormScreen:false});
}
showUgandaSafarisChimpanzeeBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisChimpanzeeBookNowFormScreen:true});
    this.setState({DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen:false});
}
showUgandaSafarisHikingBookNowFormScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisHikingBookNowSummaryScreen:true});
    this.setState({DoNotShowUgandaSafarisHikingBookNowFormScreen:false});
}
showUgandaSafarisHikingBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisHikingBookNowFormScreen:true});
    this.setState({DoNotShowUgandaSafarisHikingBookNowSummaryScreen:false});
}
showUgandaSafarisNatureBookNowFormScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisNatureBookNowSummaryScreen:true});
    this.setState({DoNotShowUgandaSafarisNatureBookNowFormScreen:false});
}
showUgandaSafarisNatureBookNowSummaryScreen = () =>
{
    this.setState({DoNotShowUgandaSafarisNatureBookNowFormScreen:true});
    this.setState({DoNotShowUgandaSafarisNatureBookNowSummaryScreen:false});
}

// Safari - Uganda
renderUgandaAppContentDetails = (ImagesSlider,DescriptionText) =>
{
    return (
            <View>
                <View style={styles.SafarisListingContainer}> 
                    <CustomSlider images={ImagesSlider[0]} />
                    <View style={{height:5}} ></View>

                    <View style={styles.MainDescriptionView} >
                        {DescriptionText[0] && DescriptionText[0].map((item, index)=>(
                            <View key={index}>
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                            </View>
                        ))}
                        <View style={{height:25}} ></View>
                            <View style={styles.ActionBtnMainView} >
                            <View>
                                <TouchableOpacity style={[styles.MainBtn3]} onPress={()=>this.showUgandaSafarisInquireUsScreen()} >
                                    <Text style = {styles.btnText} >Inquire</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={[styles.MainBtn3]} onPress={()=>this.showUgandaSafarisMoreInfoScreen()} >
                                    <Text style = {styles.btnText} >Packages</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                
                                <TouchableOpacity style={[styles.MainBtn3]} onPress={()=>this.showUgandaSafarisBookNowScreen()}>
                                    <Text style = {styles.btnText} >Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
            </View>

                
    )
}

renderUgandaAppContentMoreInfo = (DetailedText) =>
{
    return(

        <View>
            <View>
                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                    <View style={{alignItems:'center'}}>
                        <Text style = {styles.SubmitButtonsText} >Back</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{height:20}} ></View>
            
                {DetailedText[0] && DetailedText[0].map((item, index)=>(
                    <View key={index}>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                    <Text style = {styles.AboutListingText}>{item.TitleName}</Text>
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>OpenExternalLinks(item.Paragraph1)}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >View Details From Web Site</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                ))}
            <View style={{height:10}} ></View>
            </View>
    )
}

// Safari - Rwanda
renderRwandaAppContentDetails = (ImagesSlider,DescriptionText) =>
{
    return (
            <View>
            <View style={styles.SafarisListingContainer}>
                <View style={{height:10}} ></View>
                <View style={styles.SafarisListingContainer}> 
                    <CustomSlider images={ImagesSlider[0]} />
                    <View style={{height:5}} ></View>

                    <View style={styles.MainDescriptionView} >
                        {DescriptionText[0] && DescriptionText[0].map((item, index)=>(
                            <View key={index}>
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                            </View>
                        ))}
                        <View style={{height:25}} ></View>
                            <View style={styles.ActionBtnMainView} >
                            <View>
                                <TouchableOpacity style={[styles.MainBtn3]} onPress={()=>this.showRwandaSafarisInquireUsScreen()} >
                                    <Text style = {styles.btnText} >Inquire</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={[styles.MainBtn3]} onPress={()=>this.showRwandaSafarisMoreInfoScreen()} >
                                    <Text style = {styles.btnText} >More Info</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                
                                <TouchableOpacity style={[styles.MainBtn3]} onPress={()=>this.showRwandaSafarisBookNowScreen()}>
                                    <Text style = {styles.btnText} >Book Now</Text>
                                </TouchableOpacity>
                            
                            </View>
                        </View>
                    </View>
                    <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
    )
}

renderRwandaAppContentMoreInfo = (DetailedText) =>
{
    return(
        <View>
                <View>
                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                        <View style={{alignItems:'center'}}>
                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height:10}} ></View>

                {DetailedText[0] && DetailedText[0].map((item, index)=>(
                    <View key={index}>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                    <Text style = {styles.AboutListingText}>{item.TitleName}</Text>
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>OpenExternalLinks(item.Paragraph1)}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >View Details From Web Site</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                        </View>
                        <View style={{height:10}} ></View>
                    </View>
                ))}
            <View style={{height:10}} ></View>
            </View>
    )
}
renderRwandaAppBookNowForm = () =>
{
    let CountrySelectedValue = this.state.CountrySelectedValue;
    let CountrySelected = this.state.CountrySelected;
    // let Countries = this.state.Countries;
    let BookingPackageName = this.state.BookingPackageName;
    let PhoneCountryCode = this.state.PhoneCountryCode;
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;
    let BookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let BookingNumberOfPeopleValue = this.state.BookingNumberOfPeopleValue;


    return (
        <View>
            <View style={styles.SafarisListingContainer}>
                <View style={{height:10}} ></View>
                <View style={styles.MainDescriptionView} >
                    <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {styles.SubmitButtonsText} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:10}} ></View>

                        <View style={{alignItems:'center'}} >
                            <View style={{height:15}} ></View>
                            <Image source={TravelBookNowIcon} style={styles.TravelIcons}/>
                            <Text style = {styles.AboutListingText} >Rwanda Birding Booking</Text>
                        </View>
                            <View style={{alignItems:'center'}}>
                                <View style={[styles.countryPickerSelectionInputView]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={CountrySelectedValue}
                                            onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                                <Picker.Item label="Select Your Country"/> 
                                                {Countries && Countries.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.CountryName} value={item.CountryName+':'+Index} /> 
                                                ))}
                                        </Picker>
                                    </View>

                                <View style={{height:20}} ></View>
                                <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                                editable = {false}  defaultValue={CountrySelected} placeholder="Country" placeholderTextColor ={COLORS.MainColorOne}
                                />

                                <View style={{height:20}} ></View>
                                <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingName(text)} selectionColor={COLORS.MainColorOne}
                                placeholder="Name" placeholderTextColor ={COLORS.MainColorOne}/>

                                <View style={{height:20}} ></View>
                                <View style={styles.DateMainView}>
                                    <View style={styles.PhoneCodeMainView} >
                                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                    editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code"
                                    placeholderTextColor ={COLORS.MainColorOne}/>
                                    </View>

                                    <View style={styles.PhoneLengthMainView}>
                                    <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingPhone(text)} selectionColor={COLORS.MainColorOne} 
                                    placeholder="Contact"   keyboardType="numeric"  placeholderTextColor ={COLORS.MainColorOne}/>
                                    </View>
                                </View>

                                <View style={{height:20}} ></View>
                                <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                                placeholder="Package Name" onChangeText={text=>this.setUserBookingPackageName(text)} defaultValue={BookingPackageName} placeholderTextColor ={COLORS.MainColorOne}
                                />
                                
                                <View style={{height:20}} ></View>
                                <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={ BookingNumberOfPeopleValue }
                                        onValueChange={(itemValue) =>this.setBookingNumberOfPeopleValue(itemValue)}>
                                            <Picker.Item label="Number Of People"/> 
                                            {BookingNumberOfPeople && BookingNumberOfPeople.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Number} value={item.Number} /> 
                                            ))}
                                    </Picker>
                                </View>

                                <View style={{height:20}} ></View>
                                <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={ BookingHotelTypesValue }
                                        onValueChange={(itemValue) =>this.setBookingHotelTypesValue(itemValue)}>
                                            <Picker.Item label="Booking Hotel Type"/> 
                                            {BookingHotelTypes && BookingHotelTypes.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                            ))}
                                    </Picker>
                                </View>

                                <View style={{height:10}} ></View>
                                <View style={styles.DateMainView}>
                                    <View style={styles.SelectDateView}>
                                        <Text style = {styles.SelectDateText} >Starting Date</Text>
                                    </View>
                                    <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={StartingDateDay }
                                            onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                                <Picker.Item label="Day"/> 
                                                {DateDays && DateDays.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                </View>

                                <View style={{height:10}} ></View>
                                <View style={styles.DateMainView}>
                                    <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={StartingDateMonth }
                                            onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                                <Picker.Item label="Month"/> 
                                                {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                    <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={StartingDateYear }
                                            onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                                <Picker.Item label="Year"/> 
                                                {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{height:10}} ></View>
                                <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                    editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                                <View style={{height:10}} ></View>
                                <View style={styles.DateMainView}>
                                    <View style={styles.SelectDateView}>
                                        <Text style = {styles.SelectDateText} >Ending Date</Text>
                                    </View>
                                    <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={EndingDateDay }
                                            onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                                <Picker.Item label="Day"/> 
                                                {DateDays && DateDays.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                </View>

                                <View style={{height:10}} ></View>
                                <View style={styles.DateMainView}>
                                    <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={EndingDateMonth }
                                            onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                                <Picker.Item label="Month"/> 
                                                {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                    <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                        <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                            selectedValue={EndingDateYear }
                                            onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                                <Picker.Item label="Year"/> 
                                                {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                                <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                                ))}
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{height:10}} ></View>
                                <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                    editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                                <View style={{height:20}} ></View>
                            </View>

                            <View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postSafariBooking()}>
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:35}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
    )
}

// renderAppParksContent = (SliderImages,DetailedText) =>
renderAppParksContent = (ParksData) =>
{
    return(
        <View>
            <View style={{height:10}} ></View>
            <View style={styles.SafarisListingContainer}>
                <View style={{height:10}} ></View>
            <View>
                <View style={{height:10}} ></View>
                {ParksData[0] && ParksData[0].map((item, index)=>(
                    <View key={index}>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            <Image key={index} source={{uri: ImageUrl+item.Image}} style={styles.InlineImage} />
                            <View style={{height:10}} ></View>
                            <View style={styles.MainDescriptionView} >
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph6}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph7}</Text>
                            </View>
                            <View style={{height:15}} ></View>
                        </View>
                        <View style={{height:20}} ></View>
                    </View>
                ))}
                <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
                <View style={{height:10}} ></View>
                </View>
    )
}

renderLoggedInUserBookingUI = (UserFullName,UserPhone,UserCountry,UserEmail) =>
{
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;
    let BookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let BookingNumberOfPeopleValue = this.state.BookingNumberOfPeopleValue;

    return(
            <View>
                <View style={{alignItems:'center'}} >
                    <View style={{height:15}} ></View>
                        <Image source={TravelBookNowIcon} style={styles.TravelIcons}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserFullName} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserCountry} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserPhone} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserEmail} editable={false}placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingNumberOfPeopleValue }
                                onValueChange={(itemValue) =>this.setBookingNumberOfPeopleValue(itemValue)}>
                                    <Picker.Item label="Number Of People"/> 
                                    {BookingNumberOfPeople.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Number} value={item.Number} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingHotelTypesValue }
                                onValueChange={(itemValue) =>this.setBookingHotelTypesValue(itemValue)}>
                                    <Picker.Item label="Booking Hotel Type"/> 
                                    {BookingHotelTypes && BookingHotelTypes.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.SelectDateView}>
                                <Text style = {styles.SelectDateText} >Starting Date</Text>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateDay}
                                    onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                        <Picker.Item label="Day"/> 
                                        {DateDays && DateDays.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateMonth }
                                    onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                        <Picker.Item label="Month"/> 
                                        {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                        ))}
                                </Picker>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateYear }
                                    onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                        <Picker.Item label="Year"/> 
                                        {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.SelectDateView}>
                                <Text style = {styles.SelectDateText} >Ending Date</Text>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateDay }
                                    onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                        <Picker.Item label="Day"/> 
                                        {DateDays && DateDays.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateMonth }
                                    onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                        <Picker.Item label="Month"/> 
                                        {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                        ))}
                                </Picker>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateYear }
                                    onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                        <Picker.Item label="Year"/> 
                                        {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                        <View style={{height:20}} ></View>
                    </View>
            </View>
    )
}

renderNotLoggedInUserBookingUI = () =>
{
    let CountrySelectedValue = this.state.CountrySelectedValue;
    let CountrySelected = this.state.CountrySelected;
    // let Countries = this.state.Countries;
    let PhoneCountryCode = this.state.PhoneCountryCode;
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;
    let BookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let BookingNumberOfPeopleValue = this.state.BookingNumberOfPeopleValue;

    return(
            <View>
                <View style={{alignItems:'center'}} >
                        <View style={{height:15}} ></View>
                        <Image source={TravelBookNowIcon} style={styles.TravelIcons}/>
                    </View>
                        <View style={{alignItems:'center'}}>
                        <View style={{height:30}} ></View>
                            <View style={[styles.countryPickerSelectionInputView]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={CountrySelectedValue }
                                        onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                            <Picker.Item label="Select Your Country"/> 
                                            {Countries && Countries.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.CountryName} value={item.CountryName+':'+Index} /> 
                                            ))}
                                    </Picker>
                                </View>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        editable = {false}  defaultValue={CountrySelected} placeholder="Country" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingName(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Full Name" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingEmail(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Email" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.PhoneCodeMainView} >
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code"
                            placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>

                            <View style={styles.PhoneLengthMainView}>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Contact" onChangeText={text=>this.setUserBookingPhone(text)}   keyboardType="numeric"  placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>
                        </View>
                        
                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingNumberOfPeopleValue }
                                onValueChange={(itemValue) =>this.setBookingNumberOfPeopleValue(itemValue)}>
                                    <Picker.Item label="Number Of People"/> 
                                    {BookingNumberOfPeople.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Number} value={item.Number} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingHotelTypesValue }
                                onValueChange={(itemValue) =>this.setBookingHotelTypesValue(itemValue)}>
                                    <Picker.Item label="Booking Hotel Type"/> 
                                    {BookingHotelTypes && BookingHotelTypes.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                    ))}
                            </Picker>
                        </View>
                        <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={styles.SelectDateView}>
                                    <Text style = {styles.SelectDateText} >Starting Date</Text>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={StartingDateDay}
                                        onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                            <Picker.Item label="Day"/> 
                                            {DateDays && DateDays.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>

                            <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={StartingDateMonth }
                                        onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                            <Picker.Item label="Month"/> 
                                            {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                            ))}
                                    </Picker>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={StartingDateYear }
                                        onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                            <Picker.Item label="Year"/> 
                                            {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>
                            <View style={{height:10}} ></View>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={styles.SelectDateView}>
                                    <Text style = {styles.SelectDateText} >Ending Date</Text>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={EndingDateDay }
                                        onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                            <Picker.Item label="Day"/> 
                                            {DateDays && DateDays.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>

                            <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={EndingDateMonth }
                                        onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                            <Picker.Item label="Month"/> 
                                            {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                            ))}
                                    </Picker>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={EndingDateYear }
                                        onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                            <Picker.Item label="Year"/> 
                                            {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>
                            <View style={{height:10}} ></View>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:20}} ></View>
                        </View>
            </View>
    )
}
renderLoggedInUserInquiryUI = (UserFullName,UserPhone,UserCountry,UserEmail) =>
{
    return(
            <View>
                <View style={{alignItems:'center'}} >
                    <View style={{height:15}} ></View>
                        <Image source={InquiryIcon} style={styles.TravelIcons}/>
                        <Text style = {styles.AboutListingText} >What Is Your Inquiry?</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserFullName} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserCountry} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserPhone} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserEmail} editable={false}placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.InquireTextInputs} onChangeText={text=>this.setUserInquireUsQuestion(text)} selectionColor={COLORS.MainColorOne}
                        multiline={true} placeholder="Your Question" placeholderTextColor ={COLORS.MainColorOne}/>
                        <View style={{height:10}} ></View>
                        
                    </View>
            </View>
    )
}
renderNotLoggedInUserInquiryUI = () =>
{
    let CountrySelectedValue = this.state.CountrySelectedValue;
    let CountrySelected = this.state.CountrySelected;
    let PhoneCountryCode = this.state.PhoneCountryCode;

    return(
            <View>
                <View style={{alignItems:'center'}} >
                        <View style={{height:15}} ></View>
                        <Image source={InquiryIcon} style={styles.TravelIcons}/>
                        <Text style = {styles.AboutListingText} >What Is Your Inquiry?</Text>
                    </View>
                        <View style={{alignItems:'center'}}>
                        <View style={{height:30}} ></View>
                            <View style={[styles.countryPickerSelectionInputView]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={CountrySelectedValue }
                                        onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                            <Picker.Item label="Select Your Country"/> 
                                            {Countries && Countries.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.CountryName} value={item.CountryName+':'+Index} /> 
                                            ))}
                                    </Picker>
                                </View>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        editable = {false}  defaultValue={CountrySelected} placeholder="Country" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserInquireUsName(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Full Name" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserInquireUsEmail(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Email" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.PhoneCodeMainView} >
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code"
                            placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>

                            <View style={styles.PhoneLengthMainView}>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Contact" onChangeText={text=>this.setUserInquireUsPhone(text)}   keyboardType="numeric"  placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.InquireTextInputs} onChangeText={text=>this.setUserInquireUsQuestion(text)} selectionColor={COLORS.MainColorOne}
                        multiline={true} placeholder="Your Question" placeholderTextColor ={COLORS.MainColorOne}/>
                        <View style={{height:10}} ></View>
                        </View>
            </View>
    )
}
renderLoggedInUserCarHiringUI = (UserFullName,UserPhone,UserCountry,UserEmail) =>
{
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;

    return(
            <View>
                <View style={{alignItems:'center'}} >
                    <View style={{height:15}} ></View>
                        <Image source={TravelBookNowIcon} style={styles.TravelIcons}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserFullName} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserCountry} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserPhone} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserEmail} editable={false}placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.SelectDateView}>
                                <Text style = {styles.SelectDateText} >Starting Date</Text>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateDay}
                                    onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                        <Picker.Item label="Day"/> 
                                        {DateDays && DateDays.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateMonth }
                                    onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                        <Picker.Item label="Month"/> 
                                        {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                        ))}
                                </Picker>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateYear }
                                    onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                        <Picker.Item label="Year"/> 
                                        {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.SelectDateView}>
                                <Text style = {styles.SelectDateText} >Ending Date</Text>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateDay }
                                    onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                        <Picker.Item label="Day"/> 
                                        {DateDays && DateDays.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateMonth }
                                    onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                        <Picker.Item label="Month"/> 
                                        {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                        ))}
                                </Picker>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateYear }
                                    onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                        <Picker.Item label="Year"/> 
                                        {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                        <View style={{height:20}} ></View>
                    </View>
            </View>
    )
}
renderLoggedInWorldTravelUserBookingUI = (UserFullName,UserPhone,UserCountry,UserEmail) =>
{
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;
    let BookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let BookingNumberOfPeopleValue = this.state.BookingNumberOfPeopleValue;
    let VacationTypeValue = this.state.VacationTypeValue;

    

    return(
            <View>
                <View style={{alignItems:'center'}} >
                    <View style={{height:15}} ></View>
                        <Image source={TravelBookNowIcon} style={styles.TravelIcons}/>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserFullName} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserCountry} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserPhone} editable={false} placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        defaultValue={UserEmail} editable={false}placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:20}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ VacationTypeValue }
                                onValueChange={(itemValue) =>this.setVacationTypeValue(itemValue)}>
                                    <Picker.Item label="Vacation Type"/> 
                                    {VacationTypes && VacationTypes.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingNumberOfPeopleValue }
                                onValueChange={(itemValue) =>this.setBookingNumberOfPeopleValue(itemValue)}>
                                    <Picker.Item label="Number Of People"/> 
                                    {BookingNumberOfPeople.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Number} value={item.Number} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingHotelTypesValue }
                                onValueChange={(itemValue) =>this.setBookingHotelTypesValue(itemValue)}>
                                    <Picker.Item label="Booking Hotel Type"/> 
                                    {BookingHotelTypes && BookingHotelTypes.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.SelectDateView}>
                                <Text style = {styles.SelectDateText} >Starting Date</Text>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateDay}
                                    onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                        <Picker.Item label="Day"/> 
                                        {DateDays && DateDays.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateMonth }
                                    onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                        <Picker.Item label="Month"/> 
                                        {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                        ))}
                                </Picker>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={StartingDateYear }
                                    onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                        <Picker.Item label="Year"/> 
                                        {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.SelectDateView}>
                                <Text style = {styles.SelectDateText} >Ending Date</Text>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateDay }
                                    onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                        <Picker.Item label="Day"/> 
                                        {DateDays && DateDays.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateMonth }
                                    onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                        <Picker.Item label="Month"/> 
                                        {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                        ))}
                                </Picker>
                            </View>
                            <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                    selectedValue={EndingDateYear }
                                    onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                        <Picker.Item label="Year"/> 
                                        {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                        <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                        ))}
                                </Picker>
                            </View>
                        </View>
                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                        <View style={{height:20}} ></View>
                    </View>
            </View>
    )
}

renderNotLoggedInWorldTravelUserBookingUI = () =>
{
    let CountrySelectedValue = this.state.CountrySelectedValue;
    let CountrySelected = this.state.CountrySelected;
    // let Countries = this.state.Countries;
    let PhoneCountryCode = this.state.PhoneCountryCode;
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;
    let BookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let BookingNumberOfPeopleValue = this.state.BookingNumberOfPeopleValue;
    let VacationTypeValue = this.state.VacationTypeValue;

    return(
            <View>
                <View style={{alignItems:'center'}} >
                        <View style={{height:15}} ></View>
                        <Image source={TravelBookNowIcon} style={styles.TravelIcons}/>
                    </View>
                        <View style={{alignItems:'center'}}>
                        <View style={{height:30}} ></View>
                            <View style={[styles.countryPickerSelectionInputView]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={CountrySelectedValue }
                                        onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                            <Picker.Item label="Select Your Country"/> 
                                            {Countries && Countries.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.CountryName} value={item.CountryName+':'+Index} /> 
                                            ))}
                                    </Picker>
                                </View>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                        editable = {false}  defaultValue={CountrySelected} placeholder="Country" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingName(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Full Name" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingEmail(text)} selectionColor={COLORS.MainColorOne}
                        placeholder="Email" placeholderTextColor ={COLORS.MainColorOne}/>

                        <View style={{height:10}} ></View>
                        <View style={styles.DateMainView}>
                            <View style={styles.PhoneCodeMainView} >
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code"
                            placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>

                            <View style={styles.PhoneLengthMainView}>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                            placeholder="Contact" onChangeText={text=>this.setUserBookingPhone(text)}   keyboardType="numeric"  placeholderTextColor ={COLORS.MainColorOne}/>
                            </View>
                        </View>

                        <View style={{height:20}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ VacationTypeValue }
                                onValueChange={(itemValue) =>this.setVacationTypeValue(itemValue)}>
                                    <Picker.Item label="Vacation Type"/> 
                                    {VacationTypes && VacationTypes.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                    ))}
                            </Picker>
                        </View>
                        
                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingNumberOfPeopleValue }
                                onValueChange={(itemValue) =>this.setBookingNumberOfPeopleValue(itemValue)}>
                                    <Picker.Item label="Number Of People"/> 
                                    {BookingNumberOfPeople.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Number} value={item.Number} /> 
                                    ))}
                            </Picker>
                        </View>

                        <View style={{height:10}} ></View>
                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={ BookingHotelTypesValue }
                                onValueChange={(itemValue) =>this.setBookingHotelTypesValue(itemValue)}>
                                    <Picker.Item label="Booking Hotel Type"/> 
                                    {BookingHotelTypes && BookingHotelTypes.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Name} value={item.Name} /> 
                                    ))}
                            </Picker>
                        </View>
                        <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={styles.SelectDateView}>
                                    <Text style = {styles.SelectDateText} >Starting Date</Text>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={StartingDateDay}
                                        onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                            <Picker.Item label="Day"/> 
                                            {DateDays && DateDays.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>

                            <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={StartingDateMonth }
                                        onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                            <Picker.Item label="Month"/> 
                                            {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                            ))}
                                    </Picker>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={StartingDateYear }
                                        onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                            <Picker.Item label="Year"/> 
                                            {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>
                            <View style={{height:10}} ></View>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={styles.SelectDateView}>
                                    <Text style = {styles.SelectDateText} >Ending Date</Text>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={EndingDateDay }
                                        onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                            <Picker.Item label="Day"/> 
                                            {DateDays && DateDays.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>

                            <View style={{height:10}} ></View>
                            <View style={styles.DateMainView}>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={EndingDateMonth }
                                        onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                            <Picker.Item label="Month"/> 
                                            {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                            ))}
                                    </Picker>
                                </View>
                                <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                        selectedValue={EndingDateYear }
                                        onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                            <Picker.Item label="Year"/> 
                                            {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                            <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                            ))}
                                    </Picker>
                                </View>
                            </View>
                            <View style={{height:10}} ></View>
                            <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                                editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                            <View style={{height:20}} ></View>
                        </View>
            </View>
    )
}
renderNotLoggedInUserCarHiringUI = () =>
{
    let CountrySelectedValue = this.state.CountrySelectedValue;
    let CountrySelected = this.state.CountrySelected;
    // let Countries = this.state.Countries;
    let PhoneCountryCode = this.state.PhoneCountryCode;
    let StartingDateDay = this.state.StartingDateDay;
    let StartingDateMonth= this.state.StartingDateMonth;
    let StartingDateYear = this.state.StartingDateYear;
    let StartingSelectedDate = this.state.StartingSelectedDate;
    
    let EndingDateDay = this.state.EndingDateDay;
    let EndingDateMonth= this.state.EndingDateMonth;
    let EndingDateYear = this.state.EndingDateYear;
    let EndingSelectedDate = this.state.EndingSelectedDate;

    let DateYearsNames = this.state.DateYearsNames;

    return(
            <View>
                <View style={{alignItems:'center'}}>
                <View style={{height:30}} ></View>
                    <View style={[styles.countryPickerSelectionInputView]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={CountrySelectedValue }
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Select Your Country"/> 
                                    {Countries && Countries.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.CountryName} value={item.CountryName+':'+Index} /> 
                                    ))}
                            </Picker>
                        </View>

                <View style={{height:10}} ></View>
                <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne}
                editable = {false}  defaultValue={CountrySelected} placeholder="Country" placeholderTextColor ={COLORS.MainColorOne}/>

                <View style={{height:10}} ></View>
                <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingName(text)} selectionColor={COLORS.MainColorOne}
                placeholder="Full Name" placeholderTextColor ={COLORS.MainColorOne}/>

                <View style={{height:10}} ></View>
                <TextInput style={styles.TextInputs} onChangeText={text=>this.setUserBookingEmail(text)} selectionColor={COLORS.MainColorOne}
                placeholder="Email" placeholderTextColor ={COLORS.MainColorOne}/>

                <View style={{height:10}} ></View>
                <View style={styles.DateMainView}>
                    <View style={styles.PhoneCodeMainView} >
                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                    editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code"
                    placeholderTextColor ={COLORS.MainColorOne}/>
                    </View>

                    <View style={styles.PhoneLengthMainView}>
                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                    placeholder="Contact" onChangeText={text=>this.setUserBookingPhone(text)}   keyboardType="numeric"  placeholderTextColor ={COLORS.MainColorOne}/>
                    </View>
                </View>
                
                <View style={{height:10}} ></View>
                    <View style={styles.DateMainView}>
                        <View style={styles.SelectDateView}>
                            <Text style = {styles.SelectDateText} >Starting Date</Text>
                        </View>
                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={StartingDateDay}
                                onValueChange={(itemValue) =>this.setStartingDateDay(itemValue)}>
                                    <Picker.Item label="Day"/> 
                                    {DateDays && DateDays.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                    ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={{height:10}} ></View>
                    <View style={styles.DateMainView}>
                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={StartingDateMonth }
                                onValueChange={(itemValue) =>this.setStartingDateMonth(itemValue)}>
                                    <Picker.Item label="Month"/> 
                                    {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                    ))}
                            </Picker>
                        </View>
                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={StartingDateYear }
                                onValueChange={(itemValue) =>this.setStartingDateYear(itemValue)}>
                                    <Picker.Item label="Year"/> 
                                    {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                    ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{height:10}} ></View>
                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                        editable = {false}  defaultValue={StartingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                    <View style={{height:10}} ></View>
                    <View style={styles.DateMainView}>
                        <View style={styles.SelectDateView}>
                            <Text style = {styles.SelectDateText} >Ending Date</Text>
                        </View>
                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView1]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={EndingDateDay }
                                onValueChange={(itemValue) =>this.setEndingDateDay(itemValue)}>
                                    <Picker.Item label="Day"/> 
                                    {DateDays && DateDays.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Day} value={item.Day} /> 
                                    ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={{height:10}} ></View>
                    <View style={styles.DateMainView}>
                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView2]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={EndingDateMonth }
                                onValueChange={(itemValue) =>this.setEndingDateMonth(itemValue)}>
                                    <Picker.Item label="Month"/> 
                                    {DateMonthsNames && DateMonthsNames.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Month} value={item.Month} /> 
                                    ))}
                            </Picker>
                        </View>
                        <View style={[styles.datePickerSelectionInputView, styles.datePickerSelectionInputView3]}>
                            <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                selectedValue={EndingDateYear }
                                onValueChange={(itemValue) =>this.setEndingDateYear(itemValue)}>
                                    <Picker.Item label="Year"/> 
                                    {DateYearsNames && DateYearsNames.map((item,Index ) => (
                                    <Picker.Item key={Index } label={item.Year} value={item.Year} /> 
                                    ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={{height:10}} ></View>
                    <TextInput style={styles.TextInputs} selectionColor={COLORS.MainColorOne} 
                        editable = {false}  defaultValue={EndingSelectedDate} placeholderTextColor ={COLORS.MainColorOne}/> 
                    <View style={{height:20}} ></View>
                </View>
            </View>

    )
}

renderLoggedInUserBookingSummaryUI = (UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate) =>
{
    return (
        <View>
                <View style={{alignItems:'center'}}>
                    <Text style = {styles.HeadingOneText} > Booking Summary </Text>
                    <View style={{height:10}}></View>
                    <Text style = {styles.HeadingOneText} >Customer Details</Text>
                    <Text style={styles.AboutListingText}>Name : {UserFullName}</Text>
                    <Text style={styles.AboutListingText}>Country : {UserCountry}</Text>
                    <Text style={styles.AboutListingText}>Contact : {UserPhone}</Text>
                    <Text style={styles.AboutListingText}>Email : {UserEmail}</Text>

                    <View style={{height:30}}></View>
                    <Text style = {styles.HeadingOneText} >Booking Details</Text>
                    <Text style={styles.AboutListingText}>No Of People : {BookingNumberOfPeopleValue}</Text>
                    <Text style={styles.AboutListingText}>Hotel Type : {BookingHotelTypesValue}</Text>
                    <Text style={styles.AboutListingText}>Starting Date : {StartingSelectedDate}</Text>
                    <Text style={styles.AboutListingText}>End Date : {EndingSelectedDate}</Text>
                    <View style={{height:10}}></View>
                </View>
        </View>
    )
}
renderNotLoggedInUserBookingSummaryUI = () =>
{
    let name = this.state.BookingName;
    let country = this.state.CountrySelected;
    let phone = this.state.BookingPhone; 
    let email = this.state.BookingEmail;

    let people = this.state.BookingNumberOfPeopleValue;
    let hotel = this.state.BookingHotelTypesValue;
    let fullPhone = this.state.PhoneCountryCode+phone;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;
    return (
        <View>
                <View style={{alignItems:'center'}}>
                    <Text style = {styles.HeadingOneText} > Booking Summary </Text>
                    <View style={{height:10}}></View>
                    <Text style = {styles.HeadingOneText} >Customer Details</Text>
                    <Text style={styles.AboutListingText}>Name : {name}</Text>
                    <Text style={styles.AboutListingText}>Country : {country}</Text>
                    <Text style={styles.AboutListingText}>Contact : {fullPhone}</Text>
                    <Text style={styles.AboutListingText}>Email : {email}</Text>

                    <View style={{height:30}}></View>
                    <Text style = {styles.HeadingOneText} >Booking Details</Text>
                    <Text style={styles.AboutListingText}>No Of People : {people}</Text>
                    <Text style={styles.AboutListingText}>Hotel Type : {hotel}</Text>
                    <Text style={styles.AboutListingText}>Starting Date : {startingDate}</Text>
                    <Text style={styles.AboutListingText}>End Date : {endingDate}</Text>
                    <View style={{height:10}}></View>
                </View>
        </View>
    )
}


renderLoggedInUserCarHiringSummaryUI = (UserFullName,UserCountry,UserPhone,UserEmail,CarHiringIndividual,CarHiringDriver,StartingSelectedDate,EndingSelectedDate) =>
{
    return (
        <View>
                <View style={{alignItems:'center'}}>
                    <Text style = {styles.HeadingOneText} > Car Hiring Summary </Text>
                    <View style={{height:10}}></View>
                    <Text style = {styles.HeadingOneText} >Customer Details</Text>
                    <Text style={styles.AboutListingText}>Name : {UserFullName}</Text>
                    <Text style={styles.AboutListingText}>Country : {UserCountry}</Text>
                    <Text style={styles.AboutListingText}>Contact : {UserPhone}</Text>
                    <Text style={styles.AboutListingText}>Email : {UserEmail}</Text>

                    <View style={{height:30}}></View>
                    <Text style = {styles.HeadingOneText} >Booking Details</Text>
                    <Text style={styles.AboutListingText}>No Of People : {CarHiringIndividual}</Text>
                    <Text style={styles.AboutListingText}>Hotel Type : {CarHiringDriver}</Text>
                    <Text style={styles.AboutListingText}>Starting Date : {StartingSelectedDate}</Text>
                    <Text style={styles.AboutListingText}>End Date : {EndingSelectedDate}</Text>
                    <View style={{height:10}}></View>
                </View>
        </View>
    )
}
renderNotLoggedInUserCarHiringSummaryUI = () =>
{
    let name = this.state.BookingName;
    let country = this.state.CountrySelected;
    let phone = this.state.BookingPhone; 
    let email = this.state.BookingEmail;

    let company = this.state.CarHiringIndividual;
    let driver = this.state.CarHiringDriver;
    let fullPhone = this.state.PhoneCountryCode+phone;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;
    return (
        <View>
                <View style={{alignItems:'center'}}>
                    <Text style = {styles.HeadingOneText} > Booking Summary </Text>
                    <View style={{height:10}}></View>
                    <Text style = {styles.HeadingOneText} >Customer Details</Text>
                    <Text style={styles.AboutListingText}>Name : {name}</Text>
                    <Text style={styles.AboutListingText}>Country : {country}</Text>
                    <Text style={styles.AboutListingText}>Contact : {fullPhone}</Text>
                    <Text style={styles.AboutListingText}>Email : {email}</Text>

                    <View style={{height:30}}></View>
                    <Text style = {styles.HeadingOneText} >Booking Details</Text>
                    <Text style={styles.AboutListingText}>Company : {company}</Text>
                    <Text style={styles.AboutListingText}>Driver: {driver}</Text>
                    <Text style={styles.AboutListingText}>Starting Date : {startingDate}</Text>
                    <Text style={styles.AboutListingText}>End Date : {endingDate}</Text>
                    <View style={{height:10}}></View>
                </View>
        </View>
    )
}


renderTourTripsListingUpcomingDetailsData = (Data) =>
{
    return(
        <View>
            <View style={styles.SafarisListingContainer}>
                
                    <View style={{height:10}} ></View>
                        {Data && Data.map((item, index)=>(
                            <View key={index}>
                                <View style={{height:10}} ></View>
                                <Image key={index} source={{uri: ImageUrl+item.Image}} style={styles.InlineImage} />
                                <View style={{height:10}} ></View>

                                <View style={styles.MainDescriptionView} >
                                    <Text style={styles.AboutListingText}>{item.Detail1}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail2}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail3}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail4}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail5}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail6}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail7}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail8}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail9}</Text>
                                    <Text style={styles.AboutListingText}>{item.Detail10}</Text>
                                </View>
                            </View>
                        ))}
            <View style={{height:10}} ></View>
            </View>
            <View style={{height:10}} ></View>
            </View>
    )
}
postLoggedInSafariInquireUs = async (Country) =>
{
    let country = this.state.UserCountry;
    let name = this.state.UserFullName;
    let phone = this.state.UserPhone;
    let email = this.state.UserEmail;
    let question = this.state.InquireUsQuestion;
    

    if ((name.length == 0) ||(email.length == 0) || (phone.length == 0) || (question.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariInquiry,
            {
                "Name":name,
                "Country":country,
                "Contact":phone,
                "Email":email,
                "Question":question,
                "Safari":Country
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Inquiry Status",name+"\n\n"+result);
        if (Country ==="Uganda"){this.showUgandaSafarisDetailsScreen();}
        else if (Country ==="Rwanda"){this.showRwandaSafarisDetailsScreen()}
    }

    catch (error){Alert.alert("Network Error ",NetworkErrorMsg)
                console.log(error)
    };
    }

}
postNotLoggedInSafariInquireUs = async (Country) =>
{
    let country = this.state.CountrySelected;
    let name = this.state.InquireUsName;
    let phone = this.state.InquireUsPhone;
    let email = this.state.InquireUsEmail;
    let phoneCode = this.state.PhoneCountryCode;
    let question = this.state.InquireUsQuestion;
    let fullPhone = phoneCode+phone;

    if ((name.length == 0) ||(email.length == 0) || (phone.length == 0) || (question.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariInquiry,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "Question":question,
                "Safari":Country
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Inquiry Status",name+"\n\n"+result);
        if (Country ==="Uganda"){this.showUgandaSafarisDetailsScreen();}
        else if (Country ==="Rwanda"){this.showRwandaSafarisDetailsScreen()}
    }

    catch (error){Alert.alert("Network Error ",NetworkErrorMsg)};
    }

}
postLoggedInUserSafariBooking = async (Country,StateName) =>
{
    let country = this.state.UserCountry;
    let name = this.state.UserFullName;
    let phone = this.state.UserPhone;
    let email = this.state.UserEmail;

    let packageName = this.state.BookingPackageName;
    let people = this.state.BookingNumberOfPeopleValue;
    let hotelType = this.state.BookingHotelTypesValue;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;

    // console.log(country);
    // console.log(name);
    // console.log(phone);
    // console.log(email);
    // console.log(packageName);
    // console.log(people);
    // console.log(hotelType);
    // console.log(startingDate);
    // console.log(endingDate);

    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":phone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
                "Safari":Country,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
        if (Country ==="Uganda"){this.setState({[StateName]:true});this.showUgandaSafarisDetailsScreen();}
        if (Country ==="Rwanda"){this.setState({[StateName]:true});this.showRwandaSafarisDetailsScreen()}
        
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }

}
postNotLoggedInUserSafariBooking = async (Country,StateName) =>
{
    let country = this.state.CountrySelected;
    let name = this.state.BookingName;
    let phone = this.state.BookingPhone;
    let email = this.state.BookingEmail;

    let phoneCode = this.state.PhoneCountryCode;
    let packageName = this.state.BookingPackageName;
    let people = this.state.BookingNumberOfPeopleValue;
    let hotelType = this.state.BookingHotelTypesValue;
    let fullPhone = phoneCode+phone;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;

    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
                "Safari":Country,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
        if (Country ==="Uganda"){ this.setState({[StateName]:true});this.showUgandaSafarisDetailsScreen();}
        if (Country ==="Rwanda"){this.setState({[StateName]:true});this.showRwandaSafarisDetailsScreen()}
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }

    
}
postLoggedInUserTourTripsBookNow =  async() =>
{
    let country = this.state.UserCountry;
    let name = this.state.UserFullName;
    let phone = this.state.UserPhone;
    let email = this.state.UserEmail;

    let numberOfPeople = this.state.BookingNumberOfPeopleValue;
    let bookingHotelTypesValue = this.state.BookingHotelTypesValue;
    let startDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;


    // console.log(country);
    // console.log(name);
    // console.log(phone);
    // console.log(email);
    // console.log(numberOfPeople);
    // console.log(bookingHotelTypesValue);
    // console.log(startDate);
    // console.log(endingDate);

    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }
}

postNotLoggedInUserTourTripsBookNow = async () =>
{
    let country = this.state.CountrySelected;
    let name = this.state.BookingName;
    let phone = this.state.BookingPhone;
    let phoneCode = this.state.PhoneCountryCode;
    let email = this.state.BookingEmail;
    let people = this.state.BookingNumberOfPeopleValue;
    let hotelType = this.state.BookingHotelTypesValue;
    let fullPhone = phoneCode+phone;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;


    // console.log(country);
    // console.log(name);
    // console.log(email);
    // console.log(people);
    // console.log(hotelType);
    // console.log(fullPhone);
    // console.log(startingDate);
    // console.log(endingDate);
    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }
}
postLoggedInUserTourTripsCarHiring = async () =>
{
    let country = this.state.UserCountry;
    let name = this.state.UserFullName;
    let phone = this.state.UserPhone;
    let email = this.state.UserEmail;
    let startDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;
    let individual = this.state.CarHiringIndividual;
    let driver = this.state.CarHiringDriver;

    // console.log(country);
    // console.log(name);
    // console.log(phone);
    // console.log(email);
    // console.log(individual);
    // console.log(driver);
    // console.log(startDate);
    // console.log(endingDate);
    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }
}

postNotLoggedInUserTourTripsCarHiring = async () =>
{
    let country = this.state.CountrySelected;
    let name = this.state.BookingName;
    let phone = this.state.BookingPhone;
    let phoneCode = this.state.PhoneCountryCode;
    let email = this.state.BookingEmail;
    let individual = this.state.CarHiringIndividual;
    let driver = this.state.CarHiringDriver;
    let fullPhone = phoneCode+phone;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;


    // console.log(country);
    // console.log(name);
    // console.log(email);
    // console.log(individual);
    // console.log(driver);
    // console.log(fullPhone);
    // console.log(startingDate);
    // console.log(endingDate);
    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }
}
postLoggedInUserWorldTravelBooking = async () =>
{
    let country = this.state.UserCountry;
    let name = this.state.UserFullName;
    let phone = this.state.UserPhone;
    let email = this.state.UserEmail;

    let vacation = this.state.VacationTypeValue;
    let people = this.state.BookingNumberOfPeopleValue;
    let hotelType = this.state.BookingHotelTypesValue;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;

    // console.log(country);
    // console.log(name);
    // console.log(phone);
    // console.log(email);
    // console.log(vacation);
    // console.log(people);
    // console.log(hotelType);
    // console.log(startingDate);
    // console.log(endingDate);
    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }

}
postNotLoggedInUserWorldTravelBooking = async () =>
{
    let country = this.state.CountrySelected;
    let name = this.state.BookingName;
    let phone = this.state.BookingPhone;
    let email = this.state.BookingEmail;

    let phoneCode = this.state.PhoneCountryCode;
    let vacation = this.state.VacationTypeValue;
    let people = this.state.BookingNumberOfPeopleValue;
    let hotelType = this.state.BookingHotelTypesValue;
    let fullPhone = phoneCode+phone;
    let startingDate = this.state.StartingSelectedDate;
    let endingDate = this.state.EndingSelectedDate;

    // console.log(country);
    // console.log(name);
    // console.log(fullPhone);
    // console.log(email);
    // console.log(vacation);
    // console.log(people);
    // console.log(hotelType);
    // console.log(startingDate);
    // console.log(endingDate);
    if ((packageName.length == 0) ||(people.length == 0) || (hotelType.length == 0)||(startingDate.length == 0)||(endingDate.length == 0))
    {Alert.alert('Warning',EmptyInputsErrorMsg)}
    else
    {
    try
    {
        const postRequest = await axios.post(APIPostSafariBooking,
            {
                "Name":name,
                "Country":country,
                "Contact":fullPhone,
                "Email":email,
                "HotelType":hotelType,
                "NoOfPeople":people,
                "FromDate":startingDate,
                "ToDate":endingDate,
                "Package":packageName,
            }
        )
        let result = postRequest.data.status;
        Alert.alert("Booking Status",name+"\n\n"+result);
    }

    catch (error)
        {
            Alert.alert("Network Error ",NetworkErrorMsg)
            console.log(error);
        };
    }
}
render() {
    const {CarHiringIndividual,CarHiringDriver,TourTripsListingUpcomingDetails} = this.state;
    // const {Countries,CountrySelectedValue,CountrySelected,PhoneCountryCode} = this.state;
    const {MainTopNavigationButtons,SafarisUgandaNames,SafarisRwandaNames,TravelSubMenus,WorldTravelSubMenus} = this.state;
    const {DoNotShowWorldTravelsPackagesScreen,DoNotShowWorldTravelsBookNowScreen} =this.state;
    const {DoNotShowUgandaSafarisScreen,DoNotShowRwandaSafarisScreen,DoNotShowUgandaParksScreen,DoNotShowRwandaParksScreen,DoNotShowVirtualTourScreen,DoNotShowTourTripsScreen}=this.state;
    const {DoNotShowUgandaBirdingScreen,DoNotShowUgandaGorillasScreen,DoNotShowUgandaChimpanzeeScreen,DoNotShowUgandaWildLifeScreen,DoNotShowUgandaHikingScreen,DoNotShowUgandaNatureScreen} = this.state;
    const {DoNotShowTourTripsSeeListingScreen,DoNotShowTourTripsAirTicketingScreen,DoNotShowTourTipsSeeUpcomingScreen,DoNotShowTourTripsSeeOffersScreen,DoNotShowTourTripsBookNowScreen,DoNotShowTourTripsCarHiringScreen,DoNotShowTourTripsTipsScreen} = this.state;
    const { DoNotShowTourTripsCarHiringDetailsScreen,DoNotShowTourTripsCarHiringHireScreen} = this.state;

    // Sub Sub Screens
    const {
            DoNotShowTourTripsBookNowSummaryScreen,DoNotShowTourTripsBookNowFormScreen,
            DoNotShowTourTripsSeeListingSummaryScreen,DoNotShowTourTripsSeeListingDetailsScreen,
            DoNotShowTourTipsSeeUpcomingSummaryScreen,DoNotShowTourTipsSeeUpcomingDetailsScreen,

            // Uganda Safaris
            DoNotShowRwandaSafarisBirdingBookNowFormScreen,DoNotShowRwandaSafarisBirdingBookNowSummaryScreen,
            DoNotShowRwandaSafarisGorillasBookNowFormScreen,DoNotShowRwandaSafarisGorillasBookNowSummaryScreen,
            DoNotShowRwandaSafarisWildLifeBookNowFormScreen,DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen,

            // Rwanda Safaris
            DoNotShowUgandaSafarisBirdingBookNowFormScreen,DoNotShowUgandaSafarisBirdingBookNowSummaryScreen,
            DoNotShowUgandaSafarisGorillasBookNowFormScreen,DoNotShowUgandaSafarisGorillasBookNowSummaryScreen,
            DoNotShowUgandaSafarisWildLifeBookNowFormScreen,DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen,
            DoNotShowUgandaSafarisChimpanzeeBookNowFormScreen,DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen,
            DoNotShowUgandaSafarisHikingBookNowFormScreen,DoNotShowUgandaSafarisHikingBookNowSummaryScreen,
            DoNotShowUgandaSafarisNatureBookNowFormScreen,DoNotShowUgandaSafarisNatureBookNowSummaryScreen,

            // World Travel
            DoNotShowWorldTravelsBookNowFormScreen,DoNotShowWorldTravelsBookNowSummaryScreen,

        } = this.state;
    // User Log In
    const {UserFullName,UserPhone,UserUserName,UserCountry,UserEmail,UserId} = this.state;

    // Booking 
    const {
        BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingDateDay,EndingDateDay,DateYearsNames,VacationTypeValue,StartingDateMonth,
        EndingDateMonth,SelectedDate,BookingPackageName,StartingDateYear,EndingDateYear,DateDay,DateMonth,DateYear,StartingSelectedDate,EndingSelectedDate} = this.state;
    const {DoNotShowUgandaSafarisDetailsScreen,DoNotShowUgandaSafarisInquireUsScreen,DoNotShowUgandaSafarisBookNowScreen,DoNotShowUgandaSafarisMoreInfoScreen,DoNotShowTourTripsCarHiringHireSummaryScreen} =this.state;

    // Safari - Rwanda 
    const {DoNotShowRwandaBirdingScreen,DoNotShowRwandaGorillasScreen,DoNotShowRwandaWildLifeScreen} = this.state;

    const {DoNotShowRwandaSafarisDetailsScreen,DoNotShowRwandaSafarisInquireUsScreen,DoNotShowRwandaSafarisBookNowScreen,DoNotShowRwandaSafarisMoreInfoScreen} =this.state;

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
            {DoNotShowUgandaSafarisScreen ?(<></>):(<>
                <View style = {styles.SubLinksLinksView} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {SafarisUgandaNames.map((item, index) => (
                            <View key={index} >
                                <View style={styles.CircleImageView}>
                                    <TouchableOpacity onPress={() => this.changeUgandaImageLinksBorderColor(item)}>
                                        <Image source={{uri: item.imageURL}} style={{
                                            height:CircleImageHight,width:CircleImageWidth,
                                            borderRadius:CircleImageBorderRadius,borderWidth:CircleImageBorderWidth,
                                            borderColor:item.imageBorderColor,
                                            }} />
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 18,marginLeft:20,fontWeight:'bold',color:item.imageNameTextColor}}>{item.imageName}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{height:10}}></View>

                {DoNotShowUgandaBirdingScreen?(<></>):(<>
                    {DoNotShowUgandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderUgandaAppContentDetails(UgandaBirdingImages,UgandaBirdingDescription)}</>)}
                    {DoNotShowUgandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        
                        <View style={styles.MainDescriptionView} >
                            <View style={{height:10}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {styles.SubmitButtonsText} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:10}} ></View>
                        </View>
                        <View style={{height:5}} ></View>
                        <View style={styles.MainDescriptionView} >
                            {UserFullName && UserFullName.length != 0?(<>
                                {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Uganda")}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    </>):(<>

                                {this.renderNotLoggedInUserInquiryUI()}
                                    <View>
                                        <View style={{height:10}} ></View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Uganda")}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>)}
                            <View style={{height:10}} ></View>
                        </View>
                        <View style={{height:10}} ></View>
                        </View>
                    </>)}
                    {DoNotShowUgandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderUgandaAppContentMoreInfo(UgandaBirdingText)}</>)}
                    {DoNotShowUgandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowUgandaSafarisBirdingBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Uganda Safaris Birding</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                                <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                        selectedValue={ BookingPackageName }
                                                        onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                            <Picker.Item label="Package Name"/> 
                                                            {UgandaBirdingText[0] && UgandaBirdingText[0].map((item,Index ) => (
                                                            <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                            ))}
                                                    </Picker>
                                                </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisBirdingBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaBirdingText[0] && UgandaBirdingText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisBirdingBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowUgandaSafarisBirdingBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisBirdingBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisBirdingBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisBirdingBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisBirdingBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                        </>)}
                </>)}

                {DoNotShowUgandaGorillasScreen?(<></>):(<>
                    {DoNotShowUgandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderUgandaAppContentDetails(UgandaGorillasImages,UgandaGorillasDescription)}</>)}
                    {DoNotShowUgandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                    </>)}
                    {DoNotShowUgandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderUgandaAppContentMoreInfo(UgandaGorillasText)}</>)}
                    {DoNotShowUgandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowUgandaSafarisGorillasBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Uganda Safaris Gorillas</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                        selectedValue={ BookingPackageName }
                                                        onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                            <Picker.Item label="Package Name"/> 
                                                            {UgandaGorillasText[0] && UgandaGorillasText[0].map((item,Index ) => (
                                                            <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                            ))}
                                                    </Picker>
                                                </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisGorillasBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaGorillasText[0] && UgandaGorillasText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisGorillasBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowUgandaSafarisGorillasBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisGorillasBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisGorillasBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisGorillasBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisGorillasBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
            
                </>)}

                {DoNotShowUgandaWildLifeScreen?(<></>):(<>
                    {DoNotShowUgandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderUgandaAppContentDetails(UgandaWildLifeImages,UgandaWildLifeDescription)}</>)}
                    {DoNotShowUgandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>    
                    </>)}
                    {DoNotShowUgandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderUgandaAppContentMoreInfo(UgandaWildLifeText)}</>)}
                    {DoNotShowUgandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowUgandaSafarisWildLifeBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Uganda Safaris WildLife</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaWildLifeText[0] && UgandaWildLifeText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisWildLifeBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                    <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                        selectedValue={ BookingPackageName }
                                                        onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                            <Picker.Item label="Package Name"/> 
                                                            {UgandaWildLifeText[0] && UgandaWildLifeText[0].map((item,Index ) => (
                                                            <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                            ))}
                                                    </Picker>
                                                </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisWildLifeBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisWildLifeBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisWildLifeBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisWildLifeBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
                </>)}

                {DoNotShowUgandaChimpanzeeScreen?(<></>):(<>
                    {DoNotShowUgandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderUgandaAppContentDetails(UgandaChimpanzeeImages,UgandaChimpanzeeDescription)}</>)}
                    {DoNotShowUgandaSafarisInquireUsScreen?(<></>):(<>
                        
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                    </>)}
                    {DoNotShowUgandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderUgandaAppContentMoreInfo(UgandaChimpanzeeText)}</>)}
                    {DoNotShowUgandaSafarisBookNowScreen?(<></>):(<>
                        
                {DoNotShowUgandaSafarisChimpanzeeBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Uganda Safaris Chimpanzee</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaChimpanzeeText[0] && UgandaChimpanzeeText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisChimpanzeeBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaChimpanzeeText[0] && UgandaChimpanzeeText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisChimpanzeeBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisChimpanzeeBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisChimpanzeeBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisChimpanzeeBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
                </>)}

                {DoNotShowUgandaHikingScreen?(<></>):(<>
                    {DoNotShowUgandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderUgandaAppContentDetails(UgandaHikingImages,UgandaHikingDescription)}</>)}
                    {DoNotShowUgandaSafarisInquireUsScreen?(<></>):(<>
                        
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                    </>)}
                    {DoNotShowUgandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderUgandaAppContentMoreInfo(UgandaHikingText)}</>)}
                    {DoNotShowUgandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowUgandaSafarisHikingBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Uganda Safaris Hiking</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaHikingText[0] && UgandaHikingText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisHikingBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaHikingText[0] && UgandaHikingText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisHikingBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowUgandaSafarisHikingBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisHikingBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisHikingBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisHikingBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisHikingBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
                </>)}

                {DoNotShowUgandaNatureScreen?(<></>):(<>
                    {DoNotShowUgandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderUgandaAppContentDetails(UgandaNatureImages,UgandaNatureDescription)}</>)}
                    {DoNotShowUgandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Uganda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>    
                    </>)}
                    {DoNotShowUgandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderUgandaAppContentMoreInfo(UgandaNatureText)}</>)}
                    {DoNotShowUgandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowUgandaSafarisNatureBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Uganda Safaris Nature</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaNatureText[0] && UgandaNatureText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisNatureBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {UgandaNatureText[0] && UgandaNatureText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisNatureBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowUgandaSafarisNatureBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisNatureBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisNatureBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Uganda","DoNotShowUgandaSafarisNatureBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showUgandaSafarisNatureBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
                </>)}
            </>)}

            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowRwandaSafarisScreen?(<></>):(<>
                <View style = {styles.SubLinksLinksView} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {SafarisRwandaNames.map((item, index) => (
                            <View key={index} >
                                <View style={styles.CircleImageView}>
                                    <TouchableOpacity onPress={() => this.changeRwandaImageLinksBorderColor(item)}>
                                        <Image source={{uri: item.imageURL}} style={{
                                            height:CircleImageHight,width:CircleImageWidth,
                                            borderRadius:CircleImageBorderRadius,borderWidth:CircleImageBorderWidth,
                                            borderColor:item.imageBorderColor,
                                            }} />
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 18,marginLeft:20,fontWeight:'bold',color:item.imageNameTextColor}}>{item.imageName}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{height:10}}></View>

                {DoNotShowRwandaBirdingScreen?(<></>):(<>
                    {DoNotShowRwandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderRwandaAppContentDetails(RwandaBirdingImages,RwandaBirdingDescription)}</>)}
                    {DoNotShowRwandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Rwanda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Rwanda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                    </>)}
                    {DoNotShowRwandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderRwandaAppContentMoreInfo(RwandaBirdingText)}</>)}
                    {DoNotShowRwandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowRwandaSafarisBirdingBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Rwanda Safaris Birding</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {RwandaBirdingText[0] && RwandaBirdingText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisBirdingBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {RwandaBirdingText[0] && RwandaBirdingText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisBirdingBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowRwandaSafarisBirdingBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Rwanda","DoNotShowRwandaSafarisBirdingBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisBirdingBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Rwanda","DoNotShowRwandaSafarisBirdingBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisBirdingBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
                </>)}

                {DoNotShowRwandaGorillasScreen?(<></>):(<>
                    {DoNotShowRwandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderRwandaAppContentDetails(RwandaGorillasImages,RwandaGorillasDescription)}</>)}
                    {DoNotShowRwandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Rwanda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Rwanda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                    </>)}
                    {DoNotShowRwandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderRwandaAppContentMoreInfo(RwandaGorillasText)}</>)}
                    {DoNotShowRwandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowRwandaSafarisGorillasBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Rwanda Safaris Gorillas</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {RwandaGorillasText[0] && RwandaGorillasText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisGorillasBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                        <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {RwandaGorillasText[0] && RwandaGorillasText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisGorillasBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowRwandaSafarisGorillasBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Rwanda","DoNotShowRwandaSafarisGorillasBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisGorillasBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Rwanda","DoNotShowRwandaSafarisGorillasBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisGorillasBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                        </>)}
                </>)}

                {DoNotShowRwandaWildLifeScreen?(<></>):(<>
                    {DoNotShowRwandaSafarisDetailsScreen?(<></>):(<>
                        {this.renderRwandaAppContentDetails(RwandaWildLifeImages,RwandaWildLifeDescription)}</>)}
                    {DoNotShowRwandaSafarisInquireUsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserInquiryUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInSafariInquireUs("Rwanda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserInquiryUI()}
                                        <View>
                                            <View style={{height:10}} ></View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInSafariInquireUs("Rwanda")}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                    </>)}
                    {DoNotShowRwandaSafarisMoreInfoScreen?(<></>):(<>
                        {this.renderRwandaAppContentMoreInfo(RwandaWildLifeText)}</>)}
                    {DoNotShowRwandaSafarisBookNowScreen?(<></>):(<>
                        {DoNotShowRwandaSafarisWildLifeBookNowFormScreen?(<></>):(<>
                            <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            
                            <View style={styles.MainDescriptionView} >
                                <View style={{height:10}} ></View>
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisDetailsScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Booking For Rwanda Safaris WildLife</Text>
                            </View>
                            <View style={{height:5}} ></View>
                            <View style={styles.MainDescriptionView} >
                                {UserFullName && UserFullName.length != 0?(<>
                                    {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                        <View  style={{alignItems:'center'}}>
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {RwandaWildLifeText[0] && RwandaWildLifeText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisWildLifeBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        </>):(<>

                                    {this.renderNotLoggedInUserBookingUI()}
                                        <View style={{alignItems:'center'}} >
                                            <View style={[styles.bookingPickerSelectionInputView, styles.bookingPickerSelectionInputView1]}>
                                                <Picker style={styles.pickerSelectionInputs} dropdownIconColor= {COLORS.MainColorOne}
                                                    selectedValue={ BookingPackageName }
                                                    onValueChange={(itemValue) =>this.setBookingPackageValue(itemValue)}>
                                                        <Picker.Item label="Package Name"/> 
                                                        {RwandaWildLifeText[0] && RwandaWIldLifeText[0].map((item,Index ) => (
                                                        <Picker.Item key={Index } label={item.TitleName} value={item.TitleName} /> 
                                                        ))}
                                                </Picker>
                                            </View>
                                            <View style={{height:10}} ></View>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisWildLifeBookNowSummaryScreen()}>
                                                <View style={{alignItems:'center'}}>
                                                    <Text style = {styles.SubmitButtonsText} >Next</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </>)}
                                <View style={{height:10}} ></View>
                            </View>
                            <View style={{height:10}} ></View>
                            </View>
                            </>)}
                        </>)}

                        {DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen?(<></>):(<>
                            <View style={{height:10}}></View>
                                <View style={styles.SafarisListingContainer}>
                                <View style={{height:10}} ></View>
                                <View style={styles.MainDescriptionView} >
                                    <View style={{height:10}}></View>
                                    {UserFullName && UserFullName.length != 0?(<>
                                        {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserSafariBooking("Rwanda","DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen")} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisWildLifeBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                            </View>
                                        </>):(<>
                                        {this.renderNotLoggedInUserBookingSummaryUI()}
                                            <View>
                                                <View style={{alignItems:'center'}} >
                                                    <Text style={styles.AboutListingText}>Package : {BookingPackageName}</Text>
                                                </View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserSafariBooking("Rwanda","DoNotShowRwandaSafarisWildLifeBookNowSummaryScreen")}>
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:20}}></View>
                                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showRwandaSafarisWildLifeBookNowFormScreen()} >
                                                    <View style={{alignItems:'center'}}>
                                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={{height:10}}></View>
                                        </View>
                                    </>)}
                                    </View>
                                <View style={{height:10}}></View>
                            </View>
                    </>)}
                </>)}
            
            </>)}

            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowUgandaParksScreen ?(<></>):(<>
                {this.renderAppParksContent(UgandaParks)}</>)}

            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowRwandaParksScreen ?(<></>):(<>
                {this.renderAppParksContent(RwandaParks)}</>)}
            
            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowVirtualTourScreen?(<></>):(<>
                <View style={{height:10}} ></View>
                {VirtualTour[0] && VirtualTour[0].map((item, index)=>(
                    <View key={index}>
                        <View style={styles.SafarisListingContainer}>
                            <View style={{height:10}} ></View>
                            <Image key={index} source={{uri: ImageUrl+item.Image}} style={styles.InlineImage} />
                            <View style={{height:10}} ></View>
                            <View style={styles.InlineVideo}>
                                <YoutubePlayer  videoId={item.Video} height={230}  />
                            </View>
                            <View style={{height:10}} ></View>
                            <View style={styles.MainDescriptionView} >
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                            </View>
                            <View style={{height:15}} ></View>
                        </View>
                        <View style={{height:20}} ></View>
                    </View>
                ))}
            </>)}

            {/* 
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
            @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                
            */}
            {DoNotShowTourTripsScreen ?(<></>):(<>
                <View style = {styles.SubLinksLinksView} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                        {TravelSubMenus.map((item, index) => (
                            <View key={index} >
                                <View style={styles.CircleImageView}>
                                    <TouchableOpacity onPress={() => this.changeTravelsImageBorderColor (item)}>
                                        <Image source={{uri: item.imageURL}} style={{
                                            height:CircleImageHight,width:CircleImageWidth,
                                            borderRadius:CircleImageBorderRadius,borderWidth:CircleImageBorderWidth,
                                            borderColor:item.imageBorderColor,
                                            }} />
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 18,marginLeft:8,fontWeight:'bold',color:item.imageNameTextColor}}>{item.imageName}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={{height:20}} ></View>
                {DoNotShowTourTripsSeeListingScreen?(<></>):(<>
                    {DoNotShowTourTripsSeeListingSummaryScreen?(<></>):(<>
                    <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainBodyCardView} >
                            <View style={{height:5}}></View>
                            <View style={[styles.TravelLeftFloatView, styles.TravelLeftFloatView2]}>
                                <Text style={styles.TravelLeftFloatText}>On Going Tour Trips</Text>
                            </View>
                            {TravelListingOnGoing[0] && TravelListingOnGoing[0].map((item, index) => (
                                <View key={index}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View>
                                            <View style={styles.mainTableView}>
                                                <View style={styles.tableTrView} >
                                                    <Text  style={styles.trTdText}>{item.AreaName}</Text>
                                                </View>

                                                <View style={styles.tableTrView} >
                                                    <Text  style={styles.trTdText}>{item.Date}</Text>
                                                </View>

                                                <View style={styles.tableTrView} >
                                                    <Text  style={styles.trTdText}>{item.DaysNights}</Text>
                                                </View>
                                            
                                                <View style={styles.tableTrView}>
                                                    <View style={styles.detailsBtnView}>
                                                        <TouchableOpacity  style={styles.detailsBtn} onPress={()=>this.showTourTripsSeeListingDetailsScreen(item.id)} >
                                                            <Text style={styles.detailsBtnText} >Details</Text> 
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                                
                            ))}

                            <View style={[styles.TravelLeftFloatView, styles.TravelLeftFloatView2]}>
                                <Text style={styles.TravelLeftFloatText}>Past Tour Trips</Text>
                            </View>
                            {TravelListingFinished[0] && TravelListingFinished[0].map((item, index) => (
                                <View key={index}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        <View>
                                            <View style={styles.mainTableView}>
                                                <View style={styles.tableTrView} >
                                                    <Text  style={styles.trTdText}>{item.AreaName}</Text>
                                                </View>

                                                <View style={styles.tableTrView} >
                                                    <Text  style={styles.trTdText}>{item.Date}</Text>
                                                </View>

                                                <View style={styles.tableTrView} >
                                                    <Text  style={styles.trTdText}>{item.DaysNights}</Text>
                                                </View>
                                            
                                                <View style={styles.tableTrView}>
                                                    <View style={styles.detailsBtnView}>
                                                        <TouchableOpacity style={styles.detailsBtn} onPress={()=>this.showTourTripsSeeListingDetailsScreen(item.id)} >
                                                            <Text style={styles.detailsBtnText} >Details</Text> 
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                                
                            ))}
                        </View>
                        <View style={styles.MainBodyCardViewSpace}></View>
                        <View style={{height:10}} ></View>
                    </View>
                    </>)}

                    {DoNotShowTourTripsSeeListingDetailsScreen?(<></>):(<>
                        {this.renderTourTripsListingUpcomingDetailsData(TourTripsListingUpcomingDetails)}</>)}
                </>)}

                {DoNotShowTourTripsSeeOffersScreen?(<></>):(<>
                    <View style={styles.SafarisListingContainer}>
                        <CustomSlider images={OffersImages[0]} />
                        <View style={{height:5}} ></View>
                        <View style={styles.MainDescriptionView} >
                            {OffersText[0] && OffersText[0].map((item, index)=>(
                                <View key={index}>
                                    <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph6}</Text>
                                </View>
                            ))}
                        </View>
                    <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                </>)}

                {DoNotShowTourTipsSeeUpcomingScreen?(<></>):(<>
                    {DoNotShowTourTipsSeeUpcomingSummaryScreen?(<></>):(<>
                        <View style={{height:10}} ></View>
                        <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainBodyCardView} >

                        <View style={{height:5}}></View>
                        <View style={[styles.TravelLeftFloatView, styles.TravelLeftFloatView2]}>
                            <Text style={styles.TravelLeftFloatText}>Soon Tour Trips</Text>
                        </View>
                        {TravelUpcomingSoon[0] && TravelUpcomingSoon[0].map((item, index) => (
                            <View key={index}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View>
                                        <View style={styles.mainTableView}>
                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.AreaName}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.Date}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.DaysNights}</Text>
                                            </View>
                                        
                                            <View style={styles.tableTrView}>
                                                <View style={styles.detailsBtnView}>
                                                    <TouchableOpacity  style={styles.detailsBtn} onPress={()=>this.showTourTipsSeeUpcomingDetailsScreen(item.id)} >
                                                        <Text style={styles.detailsBtnText} >Details</Text> 
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        ))}

                        <View style={[styles.TravelLeftFloatView, styles.TravelLeftFloatView2]}>
                            <Text style={styles.TravelLeftFloatText}>Tour Trips Line Up</Text>
                        </View>
                        {TravelUpcomingNotSoon[0] && TravelUpcomingNotSoon[0].map((item, index) => (
                            <View key={index}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View>
                                        <View style={styles.mainTableView}>
                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.AreaName}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.Date}</Text>
                                            </View>

                                            <View style={styles.tableTrView} >
                                                <Text  style={styles.trTdText}>{item.DaysNights}</Text>
                                            </View>
                                        
                                            <View style={styles.tableTrView}>
                                                <View style={styles.detailsBtnView}>
                                                    <TouchableOpacity  style={styles.detailsBtn} onPress={()=>this.showTourTipsSeeUpcomingDetailsScreen(item.id)} >
                                                        <Text style={styles.detailsBtnText} >Details</Text> 
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        ))}
                        
                        </View>
                        <View style={styles.MainBodyCardViewSpace}></View>
                        <View style={{height:10}}></View>
                        </View>
                        <View style={{height:10}}></View>
                    </>)}

                    {DoNotShowTourTipsSeeUpcomingDetailsScreen?(<></>):(<>
                        {this.renderTourTripsListingUpcomingDetailsData(TourTripsListingUpcomingDetails)}</>)}
                </>)}

                {DoNotShowTourTripsBookNowScreen?(<></>):(<>
                    {DoNotShowTourTripsBookNowFormScreen?(<></>):(<>
                    <View style={styles.SafarisListingContainer}>
                    <View style={{height:10}} ></View>
                    <View style={styles.MainDescriptionView} >
                        <Text style = {styles.HeadingOneText} >Book Now For A Travel Trip</Text>
                    </View>
                    <View style={{height:5}} ></View>
                    <View style={styles.MainDescriptionView} >
                        {UserFullName && UserFullName.length != 0?(<>
                            {this.renderLoggedInUserBookingUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsBookNowSummaryScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Next</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                </>):(<>

                            {this.renderNotLoggedInUserBookingUI()}
                            <View>
                                    <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsBookNowSummaryScreen()}>
                                        <View style={{alignItems:'center'}}>
                                            <Text style = {styles.SubmitButtonsText} >Next</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </>)}
                        <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                    </View>
                    </>)}
                    
                    
                    {DoNotShowTourTripsBookNowSummaryScreen?(<></>):(<>
                        <View style={{height:10}}></View>
                        <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainDescriptionView} >
                            <View style={{height:10}}></View>
                            {UserFullName && UserFullName.length != 0?(<>
                                {this.renderLoggedInUserBookingSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,BookingNumberOfPeopleValue,BookingHotelTypesValue,StartingSelectedDate,EndingSelectedDate)}
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserTourTripsBookNow()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:20}}></View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsBookNowFormScreen()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:10}}></View>
                                    </View>
                                </>):(<>
                                {this.renderNotLoggedInUserBookingSummaryUI()}
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserTourTripsBookNow()}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:20}}></View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsBookNowFormScreen()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:10}}></View>
                                </View>
                            </>)}
                            </View>
                        <View style={{height:10}}></View>
                    </View>
                    </>)}
                    <View style={{height:10}}></View>
                </>)}

            {DoNotShowTourTripsAirTicketingScreen  ?(<></>):(<>
                <View style={{height:10}} ></View>
                <View style={styles.SafarisListingContainer}>
                    <CustomSlider images={AirTicketingImages[0]} />
                    <View style={{height:5}} ></View>
                    <View style={styles.MainDescriptionView} >
                        {AirTicketingText[0] && AirTicketingText[0].map((item, index)=>(
                            <View key={index}>
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph6}</Text>
                            </View>
                        ))}
                        
                    <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                    </View>

            </>)}

                {DoNotShowTourTripsCarHiringScreen?(<></>):(<>
                <ScrollView showsHorizontalScrollIndicator={false} >
                    {DoNotShowTourTripsCarHiringDetailsScreen?(<></>):(<>
                        <View style={styles.SafarisListingContainer}>
                            <CustomSlider images={CarHiringImages[0]} />
                        
                        <View style={{height:5}} ></View>
                        <View style={styles.MainDescriptionView} >
                            {CarHiringText[0] && CarHiringText[0].map((item, index)=>(
                                <View key={index}>
                                    <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                                    <Text style={styles.AboutListingText}>{item.Paragraph6}</Text>
                                </View>
                            ))}
                        
                            <View style={{height:20}} ></View>
                            <View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsCarHiringHireScreen()} >
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {styles.SubmitButtonsText} >Hire A Car  Now</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{height:10}} ></View>
                        </View>
                        <View style={{height:10}} ></View>
                        </View>
                    </>)}
                    
                    {DoNotShowTourTripsCarHiringHireScreen?(<></>):(<>
                        <View style={{height:10}} ></View>
                        <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainDescriptionView} >
                            <View style={{alignItems:'center'}}>
                                <View style={{height:10}} ></View>
                                <Text style = {styles.HeadingOneText} >Car Hiring Details</Text>
                            </View>
                                {UserFullName && UserFullName.length != 0?(<>
                                {this.renderLoggedInUserCarHiringUI (UserFullName,UserPhone,UserCountry,UserEmail)}
                                    <View style={{alignItems:'center'}}>
                                        <View style={{height:10}} ></View>
                                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setCarHiringIndividual(text)} selectionColor={COLORS.MainColorOne}
                                        placeholder="Company Name Or Individual " placeholderTextColor ={COLORS.MainColorOne}/>

                                        <View style={{height:10}} ></View>
                                        <TextInput style={styles.TextInputs} onChangeText={text=>this.setCarHiringDriver(text)} selectionColor={COLORS.MainColorOne}
                                        placeholder="Driver Guide" placeholderTextColor ={COLORS.MainColorOne}/>
                                    </View>
                                    <View style={{height:15}} ></View>

                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsCarHiringHireSummaryScreen()}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Next</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    </>):(<>

                                {this.renderNotLoggedInUserCarHiringUI()}
                                <View style={{alignItems:'center'}}>
                                    <View style={{height:10}} ></View>
                                    <TextInput style={styles.TextInputs} onChangeText={text=>this.setCarHiringIndividual(text)} selectionColor={COLORS.MainColorOne}
                                    placeholder="Company Name Or Individual " placeholderTextColor ={COLORS.MainColorOne}/>
                                    <View style={{height:10}} ></View>
                                    <TextInput style={styles.TextInputs} onChangeText={text=>this.setCarHiringDriver(text)} selectionColor={COLORS.MainColorOne}
                                    placeholder="Driver Guide" placeholderTextColor ={COLORS.MainColorOne}/>
                                </View>
                                <View style={{height:15}} ></View>
                                <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsCarHiringHireSummaryScreen()}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Next</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </>)}
                                <View style={{height:20}}></View>
                                <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsCarHiringDetailsScreen()} >
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                    </View>
                                </TouchableOpacity>
                            <View style={{height:10}} ></View>
                        </View>
                        <View style={{height:10}} ></View>
                        </View>
                    </>)}

                    {DoNotShowTourTripsCarHiringHireSummaryScreen?(<></>):(<>
                        <View style={{height:10}}></View>
                        <View style={styles.SafarisListingContainer}>
                        <View style={{height:10}} ></View>
                        <View style={styles.MainDescriptionView} >
                            <View style={{height:10}}></View>
                            {UserFullName && UserFullName.length != 0?(<>
                                {this.renderLoggedInUserCarHiringSummaryUI(UserFullName,UserCountry,UserPhone,UserEmail,CarHiringIndividual,CarHiringDriver,StartingSelectedDate,EndingSelectedDate)}
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postLoggedInUserTourTripsCarHiring()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:20}}></View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsCarHiringHireScreen()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:10}}></View>
                                    </View>
                                </>):(<>
                                {this.renderNotLoggedInUserCarHiringSummaryUI()}
                                    <View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.postNotLoggedInUserTourTripsCarHiring()}>
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Submit</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:20}}></View>
                                        <TouchableOpacity style={[styles.SubmitButtons]} onPress={()=>this.showTourTripsCarHiringHireScreen()} >
                                            <View style={{alignItems:'center'}}>
                                                <Text style = {styles.SubmitButtonsText} >Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{height:10}}></View>
                                </View>
                            </>)}
                            </View>
                        <View style={{height:10}}></View>
                    </View>
                    </>)}
                    </ScrollView>
                </>)}

                {DoNotShowTourTripsTipsScreen?(<></>):(<>
                    <View style={{height:10}} ></View>
                    <View style={styles.SafarisListingContainer}>
                        <CustomSlider images={TipsImages[0]} />
                    <View style={{height:5}} ></View>
                    <View style={styles.MainDescriptionView} >
                        {TipsText[0] && TipsText[0].map((item, index)=>(
                            <View key={index}>
                                <Text style={styles.HeadingOneText} >{item.TitleName}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph1}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph2}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph3}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph4}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph5}</Text>
                                <Text style={styles.AboutListingText}>{item.Paragraph6}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={{height:10}} ></View>
                    </View>
                    <View style={{height:10}} ></View>
                </>)}
            </>)}
                
            </ScrollView>
        </View>
    );
}
}
