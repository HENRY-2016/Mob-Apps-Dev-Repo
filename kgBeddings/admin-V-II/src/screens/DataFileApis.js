

// https://expo.dev/accounts/henry-2021/projects/admin/builds/d1b40b62-2355-4ca2-aec8-8eb364f308cb

var baseUrl = "http://mogahenze.com:9595";

// var baseUrl = "http://192.168.0.157:8000";

export const imageUrl = baseUrl+"/images/";

// // dashboard orders
export const APIListDashboardAppStatics = baseUrl+"/api/app/googl/play/list/app/statics";
export const APIListDashboardClearedPayments = baseUrl+"/api/dashboard/list/all/cleared/order/payments";
export const APIListDashboardNotClearedPayments = baseUrl+"/api/dashboard/list/all/not/cleared/order/payments";
export const APIListDashboardNewOrders = baseUrl+"/api/dashboard/list/all/new/orders";
export const APIListDashboardTotalOrders = baseUrl+"/api/dashboard/list/all/total/orders";
// // dashboard payments
export const APIListDashboardNewPayments = baseUrl+"/api/dashboard/list/all/new/payments";
export const APIListDashboardPendingPayments = baseUrl+"/api/dashboard/list/all/pending/payments";
export const APIListDashboardHalfPayments = baseUrl+"/api/dashboard/list/all/half/payments";
export const APIListDashboardFullPayments = baseUrl+"/api/dashboard/list/all/full/payments";
export const APIListDashboardTotalPayments = baseUrl+"/api/dashboard/list/all/total/payments";

// Others
export const APIListNewOrders =  baseUrl+"/api/orders/list/all/new/orders";
export const APIListPendingOrders =  baseUrl+"/api/orders/list/all/pending/orders";
export const APIListClearedOrders =  baseUrl+"/api/orders/list/all/cleared/orders";
export const APIListAllCustomerOrders  = baseUrl+"/api/orders/list/all/customer/orders/by/phone/";

// // payments 
export const APIListClearedPayments =  baseUrl+"/api/payments/list/all/cleared";
export const APIListNotClearedPayments =  baseUrl+"/api/payments/list/all/not/cleared";
export const APIListNewPayments =  baseUrl+"/api/payments/list/all/new/payment";
export const APIListFullPayments =  baseUrl+"/api/payments/list/all/full/payment";
export const APIListHalfPayments =  baseUrl+"/api/payments/list/all/half/payment";

//
export const APIListCustomerOrderListArray  = baseUrl+"/api/orders/list/customer/order/list/array/by/id/";


// A// =====>  dding Items 
export const URLAddOthersHome   = baseUrl+"/mobile/others/home/add";
export const URLAddOthersOffers   = baseUrl+"/mobile/others/offers/add";
export const URLAddOthersSlider  = baseUrl+"/mobile/others/slider/add";
export const URLAddOthersBabies  = baseUrl+"/mobile/others/babies/add";

export const URLAddBathroomRobs   = baseUrl+"/mobile/bath/room/robs/add";
export const URLAddBathRoomTowels   = baseUrl+"/mobile/bath/room/towels/add";
export const URLAddBathRoomDoorMat   = baseUrl+"/mobile/bath/room/door/mats/add";
export const URLAddBathRoomCurtains   = baseUrl+"/mobile/bath/room/curtains/add";

export const URLAddLivingRoomCurtains   = baseUrl+"/mobile/living/room/curtains/add";
export const URLAddLivingRoomSeats   = baseUrl+"/mobile/living/room/seats/add";
export const URLAddLivingRoomSideBoards   = baseUrl+"/mobile/living/room/side/boards/add";
export const URLAddLivingRoomTables  = baseUrl+"/mobile/living/room/tables/add";
export const URLAddLivingRoomCarpets   = baseUrl+"/mobile/living/room/carpets/add";
export const URLAddLivingRoomBoards   = baseUrl+"/mobile/living/room/ironing/boards/add";

export const URLAddBedRoomOneBeds   = baseUrl+"/mobile/bed/room/one/beds/add";
export const URLAddBedRoomOneBedSide  = baseUrl+"/mobile/bed/room/one/bed/sides/add";
export const URLAddBedRoomOneBedSheets   = baseUrl+"/mobile/bed/room/one/bed/sheets/add";
export const URLAddBedRoomOneMattress  = baseUrl+"/mobile/bed/room/one/mattress/add";
export const URLAddBedRoomOneProtector = baseUrl+"/mobile/bed/room/one/protector/add";

export const URLAddBedRoomTwoNets  = baseUrl+"/mobile/bed/room/two/nets/add";
export const URLAddBedRoomTwoPillows   = baseUrl+"/mobile/bed/room/two/pillows/add";
export const URLAddBedRoomTwoCussions  = baseUrl+"/mobile/bed/room/two/cussions/add";
export const URLAddBedRoomTwoCovers   = baseUrl+"/mobile/bed/room/two/bed/covers/add";
export const URLAddBedRoomTwoBlankets  = baseUrl+"/mobile/bed/room/two/blankets/add";

export const URLAddBedRoomThreeClosets   = baseUrl+"/mobile/bed/room/three/closets/add";
export const URLAddBedRoomThreeShoeRack   = baseUrl+"/mobile/bed/room/three/shoe/rack/add";
export const URLAddBedRoomThreeMirrors   = baseUrl+"/mobile/bed/room/three/mirrors/add";
export const URLAddBedRoomThreeNightWear  = baseUrl+"/mobile/bed/room/three/night/wear/add";
export const URLAddBedRoomThreeSandals = baseUrl+"/mobile/bed/room/three/sandals/add";


// =====> Viewing Items  
export const URLViewOthersHome  = baseUrl+"/MobileAppHomeCrud";
export const URLViewOthersOffers  = baseUrl+"/MobileAppOffersCrud";
export const URLViewOthersSlider  = baseUrl+"/MobileAppSliderCrud";
export const URLViewOthersBabies  = baseUrl+"/MobileAppBabiesCrud";

export const URLViewBathroomRobs   = baseUrl+"/MobileAppBathRobsCrud";
export const URLViewBathRoomTowels   = baseUrl+"/MobileAppTowelsCrud";
export const URLViewBathRoomDoorMat   = baseUrl+"/MobileAppDoorMatsCrud";
export const URLViewBathRoomCurtains   = baseUrl+"/MobileAppBathRoomCurtainsCrud";

export const URLViewLivingRoomCurtains   = baseUrl+"/MobileAppCurtainsCrud";
export const URLViewLivingRoomSeats   = baseUrl+"/MobileAppSeatsCrud";
export const URLViewLivingRoomSideBoards   = baseUrl+"/MobileAppSideBoardsCrud";
export const URLViewLivingRoomTables  = baseUrl+"/MobileAppTablesCrud";
export const URLViewLivingRoomCarpets   = baseUrl+"/MobileAppCarpetsCrud";
export const URLViewLivingRoomIroningBoards   = baseUrl+"/MobileAppIroningBoardCrud";

export const URLViewBedRoomOneBeds   = baseUrl+"/MobileAppBedsCrud";
export const URLViewBedRoomOneBedSide  = baseUrl+"/MobileAppBedSidesCrud";
export const URLViewBedRoomOneBedSheets   = baseUrl+"/MobileAppBedSheetsCrud";
export const URLViewBedRoomOneMattress  = baseUrl+"/MobileAppMattressCrud";
export const URLViewBedRoomOneProtector = baseUrl+"/MobileAppMattressProtectorsCrud";

export const URLViewBedRoomTwoNets  = baseUrl+"/MobileAppNetsCrud";
export const URLViewBedRoomTwoPillows   = baseUrl+"/MobileAppPillowsCrud";
export const URLViewBedRoomTwoCussions  = baseUrl+"/MobileAppCussionsCrud";
export const URLViewBedRoomTwoCovers   = baseUrl+"/MobileAppBedsCoversCrud";
export const URLViewBedRoomTwoBlankets  = baseUrl+"/MobileAppBlanketsCrud";

export const URLViewBedRoomThreeClosets   = baseUrl+"/MobileAppClosetCrud";
export const URLViewBedRoomThreeShoeRack   = baseUrl+"/MobileAppShoeRackCrud";
export const URLViewBedRoomThreeMirrors   = baseUrl+"/MobileAppMirrorsCrud";
export const URLViewBedRoomThreeNightWear  = baseUrl+"/MobileAppNightWareCrud";
export const URLViewBedRoomThreeSandals = baseUrl+"/MobileAppSandalsCrud";

