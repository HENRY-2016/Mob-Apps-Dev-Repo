

import axios from "axios";

import {imageUrl,APIHomeProducts,APIAbout,APIBabies,

        APIlistAllOffersProducts,
        APIBathRoomBathRobsProducts,APIBathRoomCurtainsProducts,
        APIBathRoomTowelsProducts, APIBathRoomDoorMatsProducts,

        APIBedRoomBedsProducts, APIBedRoomBedSidesProducts,
        APIBedRoomBedSheetsProducts,APIBedRoomMattressProducts,
        APIBedRoomMattressProtectorsProducts,

        APIBedRoomNetsProducts,APIBedRoomPillowsProducts,
        APIBedRoomCussionsProducts,APIBedRoomBedCoversProducts,
        APIBedRoomBlanketsProducts,

        APIBedRoomClosetProducts,APIBedRoomShoeRackProducts,
        APIBedRoomMirrorsProducts, APIBedRoomNightWareProducts,
        APIBedRoomSandalsProducts,

        APILivingRoomCurtainsProducts, APILivingRoomSeatsProducts,
        APILivingRoomSideBoardsProducts, APILivingRoomTablesProducts,
        APILivingRoomCarpetsProducts, APILivingRoomIroningBoardProducts,

        } from "./DataFileApis";


export const HomeData=[];export const AboutTextData=[];
export const OffersData=[]; export const BabiesData=[];

export const BathRoomBathRobsData=[];export const BathRoomTowelsData=[];
export const BathRoomDoorMatsData=[];export const BathRoomCurtainsData=[];


export const BedRoomOneBedsData = []; export const BedRoomOneBedSidesData = [];
export const BedRoomOneBedSheetsData = []; export const BedRoomOneMattressData = [];
export const BedRoomOneMattressProtectorsData = [];

export const BedRoomTwoNetsData =[]; export const BedRoomTwoPillowsData =[]
export const BedRoomTwoCussionsData =[]; export const BedRoomTwoBedCoversData =[];
export const BedRoomTwoBlanketsData =[];

export const BedRoomThreeClosetData =[]; export const BedRoomThreeShoeRackData = [];
export const BedRoomThreeMirrorsData =[];export const BedRoomThreeNightWareData =[];
export const BedRoomThreeSandalsData =[];

export const LivingRoomCurtainsData = []; export const LivingRoomSeatsData = [];
export const LivingRoomSideBoardsData = []; export const LivingRoomTablesData = [];
export const LivingRoomCarpetsData = []; export const LivingRoomIroningBoardData = []

export const LoadBabiesData = () =>{getAppData(APIBabies,BabiesData)}
export const LoadOffersData = () =>{getAppData(APIlistAllOffersProducts,OffersData)}
export const LoadAboutTextData = () =>{getAppData(APIAbout,AboutTextData)}
export const LoadHomeData = () =>{getAppData(APIHomeProducts,HomeData)}

export const LoadBathRoomBathRobsData = () =>{getAppData(APIBathRoomBathRobsProducts,BathRoomBathRobsData)}
export const LoadBathRoomTowelsData = () =>{getAppData(APIBathRoomTowelsProducts,BathRoomTowelsData)}
export const LoadBathRoomDoorMatsData = () =>{getAppData(APIBathRoomDoorMatsProducts,BathRoomDoorMatsData)}
export const LoadBathRoomCurtainsData = () =>{getAppData(APIBathRoomCurtainsProducts,BathRoomCurtainsData)}

export const LoadLivingRoomCurtainsData = () =>{getAppData(APILivingRoomCurtainsProducts,LivingRoomCurtainsData)}
export const LoadLivingRoomSeatsData = () =>{getAppData(APILivingRoomSeatsProducts,LivingRoomSeatsData)}
export const LoadLivingRoomSideBoardsData = () =>{getAppData(APILivingRoomSideBoardsProducts,LivingRoomSideBoardsData)}
export const LoadLivingRoomTablesData = () =>{getAppData(APILivingRoomTablesProducts,LivingRoomTablesData)}
export const LoadLivingRoomCarpetsData = () =>{getAppData(APILivingRoomCarpetsProducts,LivingRoomCarpetsData)}
export const LoadLivingRoomIroningBoardData = () =>{getAppData(APILivingRoomIroningBoardProducts,LivingRoomIroningBoardData)}


export const LoadBedRoomOneBedsData = () =>{getAppData(APIBedRoomBedsProducts,BedRoomOneBedsData)}
export const LoadBedRoomOneBedSheetData = () =>{getAppData(APIBedRoomBedSheetsProducts,BedRoomOneBedSheetsData)}
export const LoadBedRoomOneBedSidesData = () =>{getAppData(APIBedRoomBedSidesProducts,BedRoomOneBedSidesData)}
export const LoadBedRoomOneMattressData = () =>{getAppData(APIBedRoomMattressProducts,BedRoomOneMattressData)}
export const LoadBedRoomOneMattressProtectorsData = () =>{getAppData(APIBedRoomMattressProtectorsProducts,BedRoomOneMattressProtectorsData)}

export const LoadBedRoomTwoNetsData = () =>{getAppData(APIBedRoomNetsProducts,BedRoomTwoNetsData)}
export const LoadBedRoomTwoPillowsData = () =>{getAppData(APIBedRoomPillowsProducts,BedRoomTwoPillowsData)}
export const LoadBedRoomTwoCussionsData = () =>{getAppData(APIBedRoomCussionsProducts,BedRoomTwoCussionsData)}
export const LoadBedRoomTwoBedCoversData = () =>{getAppData(APIBedRoomBedCoversProducts,BedRoomTwoBedCoversData)}
export const LoadBedRoomTwoBlanketsData = () =>{getAppData(APIBedRoomBlanketsProducts,BedRoomTwoBlanketsData)}


export const LoadBedRoomThreeClosetData = () =>{getAppData(APIBedRoomClosetProducts,BedRoomThreeClosetData)}
export const LoadBedRoomThreeShoeRackData = () =>{getAppData(APIBedRoomShoeRackProducts,BedRoomThreeShoeRackData)}
export const LoadBedRoomThreeMirrorsData = () =>{getAppData(APIBedRoomMirrorsProducts,BedRoomThreeMirrorsData)}
export const LoadBedRoomThreeNightWareData = () =>{getAppData(APIBedRoomNightWareProducts,BedRoomThreeNightWareData)}
export const LoadBedRoomThreeSandalsData = () =>{getAppData(APIBedRoomSandalsProducts,BedRoomThreeSandalsData)}




const  getAppData = (APICall,StateName) =>
{
    console.log("===================>>>>>>>")
    axios.get(APICall)
    .then(res => {
        let results =JSON.stringify(res.data);
        let jsonResults =JSON.parse(results); 
        StateName.push(jsonResults)
        })
    .catch(err=>{console.log(err);})
}

export const LoadLivingRoomItemsData = () => {
    // Create Functions Into Array And Call Dem Through A Loop 
    var LivingRoomArrayFunctions = [];
    LivingRoomArrayFunctions.push(LoadLivingRoomCurtainsData);
    LivingRoomArrayFunctions.push(LoadLivingRoomSeatsData);
    LivingRoomArrayFunctions.push(LoadLivingRoomSideBoardsData);
    LivingRoomArrayFunctions.push(LoadLivingRoomTablesData);
    LivingRoomArrayFunctions.push(LoadLivingRoomCarpetsData);
    LivingRoomArrayFunctions.push(LoadLivingRoomIroningBoardData);

    for (var i = 0; i<LivingRoomArrayFunctions.length; i++){
        LivingRoomArrayFunctions[i]();}
}

export const LoadBathRoomItemsData = () => {
    var BathRoomArrayFunctions = [];
    BathRoomArrayFunctions.push(LoadBathRoomBathRobsData);
    BathRoomArrayFunctions.push(LoadBathRoomTowelsData);
    BathRoomArrayFunctions.push(LoadBathRoomDoorMatsData);
    BathRoomArrayFunctions.push(LoadBathRoomCurtainsData);

    for (var i = 0; i<BathRoomArrayFunctions.length; i++){
        BathRoomArrayFunctions[i]();}
}
export const BedRoomOneItemsData = () =>{
    var BedRoomOneArrayFunctions =[];
    BedRoomOneArrayFunctions.push(LoadBedRoomOneBedsData);
    BedRoomOneArrayFunctions.push(LoadBedRoomOneBedSheetData);
    BedRoomOneArrayFunctions.push(LoadBedRoomOneBedSidesData); 
    BedRoomOneArrayFunctions.push(LoadBedRoomOneMattressData);
    BedRoomOneArrayFunctions.push(LoadBedRoomOneMattressProtectorsData);
    
    for (var i = 0; i<BedRoomOneArrayFunctions.length; i++){
        BedRoomOneArrayFunctions[i]();}
}

export const BedRoomTwoItemsData = () =>{
    var BedRoomTwoArrayFunctions =[];
    BedRoomTwoArrayFunctions.push(LoadBedRoomTwoNetsData);
    BedRoomTwoArrayFunctions.push(LoadBedRoomTwoPillowsData);
    BedRoomTwoArrayFunctions.push(LoadBedRoomTwoCussionsData);
    BedRoomTwoArrayFunctions.push(LoadBedRoomTwoBedCoversData);
    BedRoomTwoArrayFunctions.push(LoadBedRoomTwoBlanketsData);

    for (var i = 0; i<BedRoomTwoArrayFunctions.length; i++){
        BedRoomTwoArrayFunctions[i]();}
}
export const BedRoomThreeItemsData = () =>{
    var BedRoomThreeArrayFunctions =[];
    BedRoomThreeArrayFunctions.push(LoadBedRoomThreeClosetData);
    BedRoomThreeArrayFunctions.push(LoadBedRoomThreeShoeRackData);
    BedRoomThreeArrayFunctions.push(LoadBedRoomThreeMirrorsData);
    BedRoomThreeArrayFunctions.push(LoadBedRoomThreeNightWareData);
    BedRoomThreeArrayFunctions.push(LoadBedRoomThreeSandalsData);

    for (var i = 0; i<BedRoomThreeArrayFunctions.length; i++){
        BedRoomThreeArrayFunctions[i]();}
}