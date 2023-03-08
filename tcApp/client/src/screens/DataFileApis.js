


// var BaseUrl = "https://triplecareapps.com";
var BaseUrl = "http://192.168.0.157:8000";
// var BaseUrl = "http://192.168.1.157:8000"; // MTN


export const ImageUrl = BaseUrl+"/images/";
export const VideoUrl = BaseUrl+"/videos/";

export const APIPostImg = BaseUrl+"/api/club/post/img";
export const APIUpdateUserEmailAndNumber= BaseUrl+"/api/club/update/user/email/and/number";
export const APIPostLogIns = BaseUrl+"/api/users/login/post";
export const APIListRatingChats = BaseUrl+"/api/ratings/list/all/by/card/No/";
export const APIListTalkTheWalk = BaseUrl+"/api/list/talk/the/walk/all";
export const APIListFunny = BaseUrl+"/api/list/funny/all";
export const APIPostRating = BaseUrl+"/api/ratings/update/row";
export const APIPostHomesOrders = BaseUrl+"/api/holiday/homes/order/post";
export const APIPostHomesFeedBacks = BaseUrl+"/api/holiday/homes/feed/back/post";
export const APIListAllCountries = BaseUrl+"/api/countries/list/all";
export const APIListAllHolidayHomes = BaseUrl+"/api/holiday/homes/list/all";
export const APIListAllNoticeBoard = BaseUrl+"/api/notice/board/list/all";

//  Store
export const APIListAllStoreItems = BaseUrl+"/api/store/list/all/store/items";
export const APIListAllDealsItems = BaseUrl+"/api/store/list/all/deals/items";
export const APIPostCustomerOrder = BaseUrl+"/api/store/post/customer/order";

export const APIUpdateClubMemberPassword = BaseUrl+"/api/club/update/member/password";
export const APIUpdateClubMemberEmail = BaseUrl+"/api/club/update/member/email";
export const APIUpdateClubMemberNumber = BaseUrl+"/api/club/update/member/number";
export const APILogInClubMemberByCardNo = BaseUrl+"/api/club/member/log/in/by/card/No/";
export const APIAccountStatusByCardNo = BaseUrl+"/api/club/member/account/status/by/card/No/";
export const APIClubMemberApplication = BaseUrl+"/api/club/membership/application";
export const APIClubMemberAllRenewals = BaseUrl+"/api/club/member/all/renewals/by/cardNo/";
export const APIClubMemberCredit = BaseUrl+"/api/club/member/list/member/credit/by/cardNo/";
export const APIClubMemberAllReferrals = BaseUrl+"/api/club/member/all/referrals/by/cardNo/";

// News 
export const APIListAllNews = BaseUrl+"/api/news/list/all";
export const APIPostNewsOrder = BaseUrl+"/api/news/order/post";

// Chats APIs
export const APIListAllChats = BaseUrl+"/api/chats/list/all/chats/by/card/No/";
export const APIMemberChatsLogIn = BaseUrl+"/api/chats/member/log/in/by/card/No/";
export const APIMemberChatsPost = BaseUrl+"/api/chats/member/post/chat";

// Providers APIs
export const APIProvidersListAll = BaseUrl+"/api/provider/list/all";
export const APIPostProviderUpdate = BaseUrl+"/api/provider/update/services/row";
export const APIProviderMemberByCardNo = BaseUrl+"/api/provider/member/log/in/by/card/No/";
export const APIListProviderDetailsByCardNo = BaseUrl+"/api/provider/list/all/details/by/card/No/";
export const APIProviderServicesClearedByCardNo = BaseUrl+"/api/provider/list/all/services/cleared/by/card/No/";
export const APIProviderServicesPendingByCardNo = BaseUrl+"/api/provider/list/all/services/pending/by/card/No/";
export const APIProviderServicesPaymentsByCardNo = BaseUrl+"/api/provider/list/all/services/payments/by/card/No/";

// Agency 
export const APIAgencyUserLogIn = BaseUrl+"/api/agency/user/login/";
export const APIAgencyUserCheckIn = BaseUrl+"/api/agency/user/check/in/post";
export const APIAgencyUserCheckOut = BaseUrl+"/api/agency/user/check/out/post/update";
export const APIAgencyUserHasNotCheckedOutDetails = BaseUrl+"/api/agency/user/has/not/check/out/by/number/";
export const APIAgencyUserCheckedInDetails = BaseUrl+"/api/agency/user/check/in/by/number/";
export const APIAgencyUserCheckedOutDetails = BaseUrl+"/api/agency/user/check/out/view/by/number/";
export const APIAgencyUserDeleteCheckedIn = BaseUrl+"/api/delete/agency/check/in/record/by/id/";

export const APIGetAgencyJobs = BaseUrl+"/api/agency/jobs/all";
export const APIUpdateAgencyJobs = BaseUrl+"/api/agency/jobs/booked/update";
export const APIGetUserBookedDetailsById = BaseUrl+"/api/agency/jobs/user/booked/jobs/by/number/";

export const APIAgencyAdminLogIn = BaseUrl+"/api/agency/admin/login/";
export const APIAdminCheckedInDetails = BaseUrl+"/api/agency/admin/checked/in/details/by/number/";
export const APIAgencyAdminCheckInApproval = BaseUrl+"/api/agency/admin/user/check/in/approval/update";
export const APIAdminViewUserDetails = BaseUrl+"/api/agency/admin/view/user/details/by/number/";
export const APIAdminPendingCheckedInDetails = BaseUrl+"/api/agency/admin/pending/checked/in/details/by/number/";
export const APIAdminCheckedOutDetails = BaseUrl+"/api/agency/admin/checked/out/details/by/number/";


// Health
export const APIHealthUserLogIn = BaseUrl+"/api/health/user/login/";
export const APIListHealthHospitals = BaseUrl+"/api/health/hospitals";
export const APIListHealthInsurances = BaseUrl+"/api/health/insurances";
export const APIPostHealthRequest = BaseUrl+"/api/health/user/requests/post";
export const APIGetHealthRequestDetails = BaseUrl+"/api/health/user/requests/by/number/";


// Transport
export const APIPostTransportOrder = BaseUrl+"/api/transport/user/tc/boda/taxi/post";
export const APIGetTransportTaxiOrders = BaseUrl+"/api/transport/user/tc/taxi/orders/by/number/";
export const APIGetTransportBodaOrders = BaseUrl+"/api/transport/user/tc/boda/orders/by/number/";
export const APIImageUpload = BaseUrl+"/api/image/post";
