import { Alert } from "react-native";
import axios from "axios";
import { COLORS } from "./Colors";
import {  NetworkErrorMsg} from "./Alerts";
import {
            APITestInternetConnectionToHost,ImageUrl,

            // About Screen
            APIListAboutNewsBlogs,APIListAboutUs,
            APIListAboutPolicies,APIListAboutUganda,APIListAboutRwanda,

            // Safari - Tour Trips
            APIListTravelListingOnGoing,APIListTravelListingFinished,
            APIListTravelUpcomingSoon,APIListTravelUpcomingNotSoon,
            APIListTravelTipsImages, APIListTravelTipsText,
            APIListTravelCarHiringImages,APIListTravelCarHiringText,
            APIListAirTicketingImages,APIListAirTicketingText,
            APIListTravelOffersImages,APIListTravelOffersText,

            // safari - Uganda
            APIListSafariUgandaBirdingText,APIListSafariUgandaBirdingImages,
            APIListSafariUgandaGorillasText,APIListSafariUgandaGorillasImages,
            APIListSafariUgandaWildLifeText,APIListSafariUgandaWildLifeImages,
            APIListSafariUgandaChimpanzeeText,APIListSafariUgandaChimpanzeeImages,
            APIListSafariUgandaHikingText,APIListSafariUgandaHikingImages,
            APIListSafariUgandaNatureText,APIListSafariUgandaNatureImages,

            // safari - Rwanda
            APIListSafariRwandaBirdingText,APIListSafariRwandaBirdingImages,
            APIListSafariRwandaGorillasText,APIListSafariRwandaGorillasImages,
            APIListSafariRwandaWildLifeText,APIListSafariRwandaWildLifeImages,

            // Safari - Parks
            APIListSafariUgandaParks,APIListSafariRwandaParks,
            APIListSafariVirtualTour,

            APIListSafariUgandaAppIcons,APIGetNotificationsNew,APIGetNotificationsAll,
    } from './DataFileApis';



// Icons

export const SafariUgandaAppIcons=[]; export const SafariRwandaAppIcons=[];export const TourTripsAppIcons=[];

// About Screen
export const NewsBlogsData=[]; export const PoliciesData=[];
export const AboutUgandaData=[]; export const  AboutRwandaData=[];
export const AboutUsData=[];

// Safari Screen
export const UgandaBirdingImages = []; export const UgandaGorillasImages= [];
export const UgandaWildLifeImages= []; export const UgandaChimpanzeeImages= [];
export const UgandaHikingImages= [];   export const UgandaNatureImages= [];
export const UgandaBirdingDescription= [];  export const UgandaGorillasDescription= [];
export const UgandaWildLifeDescription= []; export const UgandaChimpanzeeDescription= [];
export const UgandaHikingDescription= [];  export const UgandaNatureDescription= [];
export const UgandaBirdingText= [];  export const UgandaGorillasText= [];
export const UgandaWildLifeText= []; export const UgandaChimpanzeeText= [];
export const UgandaHikingText= [];   export const UgandaNatureText= [];

export const RwandaBirdingImages= [];  export const RwandaGorillasImages= [];
export const RwandaWildLifeImages= []; export const RwandaBirdingDescription= [];
export const RwandaGorillasDescription= []; export const RwandaWildLifeDescription= [];
export const RwandaBirdingText= []; export const RwandaGorillasText= []; export const RwandaWildLifeText= [];

// Safari Parks 
export const UgandaParks=[]; export const RwandaParks=[]; export const VirtualTour=[];

// Tour Trips
export const TravelUpcomingSoon=[]; export const TravelUpcomingNotSoon=[];
export const TravelListingOnGoing=[]; export const TravelListingFinished=[];
export const AirTicketingText=[]; export const AirTicketingImages=[];
export const CarHiringText=[]; export const CarHiringImages=[];
export const TipsText=[]; export const TipsImages=[];
export const OffersText=[]; export const OffersImages=[];
export const NotificationsNewData = []; export const NotificationsAllData = [];


export const initHomeNotificationAppData = () => 
{
    console.log(".....init Home Notifications Screen App Data.....");
    getTextDataFromServer(APIGetNotificationsNew,NotificationsNewData);
    getTextDataFromServer(APIGetNotificationsAll,NotificationsAllData);
}
export const initAboutNewsBlogsScreenAppData = () =>
{
    console.log(".....init About News Blogs Screen App Data.....");
    getDataNormalFromServer (APIListAboutNewsBlogs,NewsBlogsData);
}
export const initAboutPoliciesScreenAppData = () =>
{
    console.log(".....init About Policies Screen App Data.....");
    getDataNormalFromServer (APIListAboutPolicies,PoliciesData);
}
export const initAboutRwandaScreenAppData = () =>
{
    console.log(".....init About Policies Screen App Data.....");
    getDataNormalFromServer (APIListAboutRwanda,AboutRwandaData);
}
export const initAboutUgandaScreenAppData = () =>
{
    console.log(".....init About Uganda Screen App Data.....");
    getDataNormalFromServer (APIListAboutUganda,AboutUgandaData);
}
export const initAboutUsScreenAppData = () =>
{
    console.log(".....init About Us Screen App Data.....");
    getDataNormalFromServer (APIListAboutUs,AboutUsData);
}
export const  initSafarisScreenSafarisProfileAppData = () => 
{
    console.log(".....init Safaris Screen Safaris Profile App Data.....");
    
    // safari - Uganda
    getSafariProfileDataFromServer (APIListSafariUgandaBirdingImages,UgandaBirdingImages,UgandaBirdingDescription);
    getSafariProfileDataFromServer (APIListSafariUgandaGorillasImages,UgandaGorillasImages,UgandaGorillasDescription);
    getSafariProfileDataFromServer (APIListSafariUgandaWildLifeImages,UgandaWildLifeImages,UgandaWildLifeDescription);
    getSafariProfileDataFromServer (APIListSafariUgandaChimpanzeeImages,UgandaChimpanzeeImages,UgandaChimpanzeeDescription);
    getSafariProfileDataFromServer (APIListSafariUgandaHikingImages,UgandaHikingImages,UgandaHikingDescription);
    getSafariProfileDataFromServer (APIListSafariUgandaNatureImages,UgandaNatureImages,UgandaNatureDescription);
    // Safari - Rwanda
    getSafariProfileDataFromServer (APIListSafariRwandaBirdingImages,RwandaBirdingImages,RwandaBirdingDescription);
    getSafariProfileDataFromServer (APIListSafariRwandaGorillasImages,RwandaGorillasImages,RwandaGorillasDescription);
    getSafariProfileDataFromServer (APIListSafariRwandaWildLifeImages,RwandaWildLifeImages,RwandaWildLifeDescription);
    

}

export const initSafarisScreenSafarisMoreInfoAppData = () =>
{
    console.log(".....init Safaris Screen Safaris More info App Data.....");
    getTextDataFromServer (APIListSafariUgandaBirdingText,UgandaBirdingText);
    getTextDataFromServer (APIListSafariUgandaGorillasText,UgandaGorillasText);
    getTextDataFromServer (APIListSafariUgandaWildLifeText,UgandaWildLifeText);
    getTextDataFromServer (APIListSafariUgandaChimpanzeeText,UgandaChimpanzeeText);
    getTextDataFromServer (APIListSafariUgandaHikingText,UgandaHikingText);
    getTextDataFromServer (APIListSafariUgandaNatureText,UgandaNatureText);
    getTextDataFromServer (APIListSafariRwandaBirdingText,RwandaBirdingText);
    getTextDataFromServer (APIListSafariRwandaGorillasText,RwandaGorillasText);
    getTextDataFromServer (APIListSafariRwandaWildLifeText,RwandaWildLifeText); 
}

export const initSafarisScreenSafarisParksVirtualTourAppData = () =>
{
    console.log(".....init Safaris Screen Safaris Parks Virtual Tour App Data.....");
    getDataNormalFromServer (APIListSafariRwandaParks,RwandaParks);
    getDataNormalFromServer (APIListSafariUgandaParks,UgandaParks);
    getDataNormalFromServer (APIListSafariVirtualTour,VirtualTour);
}

export const initSafarisScreenSafarisTourTripsAppData = () =>
{
    console.log(".....init Safaris Screen Safaris Tour Trips App Data.....");

    // Safari Tour Trips
    // setTimeout(initSafarisScreenAppData(),1000)
    getDataNormalFromServer (APIListTravelListingOnGoing,TravelListingOnGoing);
    getDataNormalFromServer (APIListTravelListingFinished,TravelListingFinished);
    getDataNormalFromServer (APIListTravelUpcomingSoon,TravelUpcomingSoon);
    getDataNormalFromServer (APIListTravelUpcomingNotSoon,TravelUpcomingNotSoon);
    getTextDataFromServer (APIListAirTicketingText,AirTicketingText);
    getImagesDataFromServer (APIListAirTicketingImages,AirTicketingImages);
    getTextDataFromServer (APIListTravelOffersText,OffersText);
    getImagesDataFromServer (APIListTravelOffersImages,OffersImages);
    getTextDataFromServer (APIListTravelCarHiringText,CarHiringText);
    getImagesDataFromServer (APIListTravelCarHiringImages,CarHiringImages);
    getTextDataFromServer (APIListTravelTipsText,TipsText);
    getImagesDataFromServer (APIListTravelTipsImages,TipsImages);
}
const getSafariProfileDataFromServer = (APICall,Images,Description) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonResults =JSON.parse(results);
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image)
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        Images.push(imageSlider);
        Description.push(jsonResults);
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>")})
}

const getTextDataFromServer = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results);

        StateName.push(jsonResults)
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>")})
}
const getDataNormalFromServer = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonResults =JSON.parse(results);
        StateName.push(jsonResults);
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>")})
}

const getImagesDataFromServer = (APICall,StateName) =>
{
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonResults =JSON.parse(results);
        let imageSlider = [];
        imageSlider.push(ImageUrl+jsonResults[0].Image)
        imageSlider.push(ImageUrl+jsonResults[0].Image1)
        imageSlider.push(ImageUrl+jsonResults[0].Image2)
        imageSlider.push(ImageUrl+jsonResults[0].Image3)
        imageSlider.push(ImageUrl+jsonResults[0].Image4)
        imageSlider.push(ImageUrl+jsonResults[0].Image5)
        StateName.push(imageSlider)
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>")})
}


// const getAppIconsFromServer = (APICall,AppIconsName) =>
export const getSafariUgandaAppIconsFromServer = () =>
{
    console.log("func..............")
    axios.get(APIListSafariUgandaAppIcons)
    .then(res => {
        let results =JSON.stringify(res.data); 
        let jsonResults =JSON.parse(results);
        Names=
        [
            { imageId: '1', Action:'Birding',imageName: 'Birding', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+jsonResults[0].Image1},
            { imageId: '2', Action:'Gorillas',imageName: 'Gorillas', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+jsonResults[0].Image2},
            { imageId: '4', Action:'Wildlife',imageName: 'Wild Life', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+jsonResults[0].Image3},
            { imageId: '3', Action:'Chimpanzee', imageName: 'Chimpanzee', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white,imageURL:ImageUrl+jsonResults[0].Image4},
            { imageId: '5', Action:'Hiking', imageName: 'Hiking', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+jsonResults[0].Image5},
            { imageId: '6', Action:'Nature', imageName: 'Nature', imageNameTextColor:COLORS.white, imageBorderColor:COLORS.white, imageURL:ImageUrl+jsonResults[0].Image6},
        ]

        SafariUgandaAppIcons.push(Data);
        })
    .catch(err=>{console.log(err+"On "+"<==>"+APICall+"<==>")})
}

















export const checkInternetConnectionToHost = () =>
{
    axios.get(APITestInternetConnectionToHost)
    .then(res => {})
    .catch(err=>{Alert.alert("An Error",NetworkErrorMsg);})
}




