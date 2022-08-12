


// var BaseUrl = "http://176.58.115.77:7676";
var BaseUrl = "http://192.168.0.157:8000";


export const ImageUrl = BaseUrl+"/images/";
export const VideoUrl = BaseUrl+"/videos/";

export const APIPostImg = BaseUrl+"/api/club/post/img";
export const APIListRatingChats = BaseUrl+"/api/ratings/list/all/by/card/No/";
export const APIPostRating = BaseUrl+"/api/ratings/update/row";
export const APIListAllCountries = BaseUrl+"/api/countries/list/all";
export const APIListAllHolidayHomes = BaseUrl+"/api/holiday/homes/list/all";
export const APIListAllNoticeBoard = BaseUrl+"/api/notice/board/list/all";
export const APIListAllNews = BaseUrl+"/api/news/list/all";

export const APIUpdateClubMemberPassword = BaseUrl+"/api/club/update/member/password";
export const APILogInClubMemberByCardNo = BaseUrl+"/api/club/member/log/in/by/card/No/";
export const APIClubMemberApplication = BaseUrl+"/api/club/membership/application";
export const APIClubMemberAllRenewals = BaseUrl+"/api/club/member/all/renewals/by/cardNo/";
export const APIClubMemberAllReferrals = BaseUrl+"/api/club/member/all/referrals/by/cardNo/";

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

