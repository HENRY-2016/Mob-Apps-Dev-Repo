


var baseUrl = "http://mogahenze.com:8787";

// var baseUrl = "http://192.168.0.157:8000";

export const imageurl = baseUrl+"/images/";

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
