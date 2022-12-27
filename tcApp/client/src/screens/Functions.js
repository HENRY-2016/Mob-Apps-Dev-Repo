
import { Alert, Linking,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

export const updateApp = async () => {await Linking.openURL('https://play.google.com/store/apps/details?id=com.mogahenze.triplecare');};
export const viewPdfFile =async (url) => { await Linking.openURL(url)}

export const convertToUpperCase = (word) => {
    const lower = word.toUpperCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
}
export const convertToLowerCase = (word) => {
    const lower = word.toLowerCase();
    //Convert To Small Letter
    const word2 = word.charAt(0).toUpperCase() + lower.slice(1);
    // Capitalize the First Letter
    return word2.charAt(0).toUpperCase() + word2.slice(1);
}
export const  getTime =  () =>

{
    let today = new Date();
    

    let hours = today.getHours();
    let minutes = today.getMinutes();
    let secs = today.getSeconds();
    let AMPM = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let time = hours + ':' +minutes+':'+secs+' ' + AMPM;

    // console.log(time);
    return time;

}
export const  getDay =  () =>
{
    let today = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = today.getDay();
    // console.log(days[day])
    return days[day];

}
export const  getDate =  () =>
{
    let today = new Date();
    let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(); // add a zero
    return date;
    // console.log(date);

}
export const  clearNumberOfItemsFromStorage = async () =>
{
    try {await AsyncStorage.removeItem ('NumberOfItems');}
    catch (error) { console.log(error)}
}

export const removeCatItemsStorageDetails = async () => 
{
    try{await AsyncStorage.removeItem ('cartItems');}
    catch (error) { console.log(error)}
};

export const addItemsToCart = (index,ProductsArray,StoreType) => 
{
    // console.log("Adding to cart ------")
    const newItems = [...ProductsArray]; // clone the array

    let product = newItems[index];
    let id = index;
    let name = product.Name;
    let status = product.Text;
    let amount = product.Amount;
    let type = StoreType;
    // let image = JSON.stringify(product.thumbnailImage);
    let image = product.image;
    let qty = 1;
    let CartItem={ id: id, name: name, status:status, amount:amount, qty:qty,image:image,type:type}
    // console.log("====="+JSON.stringify(CartItem))

    AsyncStorage.getItem('cartItems').then((CartData)=>{
            if (CartData !== null) 
            {
                // We have data!!
                const cart = JSON.parse(CartData)
                cart.push(CartItem)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                Alert.alert("Massage","Your Product Has Been \n\n Added To Cart");

            }
            else{
                const cart  = []
                cart.push(CartItem)
                AsyncStorage.setItem('cartItems',JSON.stringify(cart));
                Alert.alert("Massage","Your Product Has Been \n\n Added To Cart");
            }
        })
        .catch((err)=>{console.log(err)})

        // NumberOfItems
        AsyncStorage.getItem('NumberOfItems').then((number)=>{
            if (number !== null) 
            {
                // We have data!!
                const value = JSON.parse(number)
                let NewNumber = parseInt(value) + 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(NewNumber));
            }
            else{
                let NewNumber = 1;
                AsyncStorage.setItem('NumberOfItems',JSON.stringify(NewNumber));
            }
        })
        .catch((err)=>{console.log(err)})
}


// ERRORS
export const LOADING_ERROR = "Can Not Load App Data"+"\n\n"+"Connect To Internet And Open App Again";
export const LOGIN_ERROR = "Un Able To Log In"+"\n\n"+"Check Your Network Connections\n";
export const LOGOUT_MSG ="You Have Successfully Logged Out \n\n Thank You";
export const POSTING_ERROR = "Network Error \n\n Un Able To Post Data\nCheck Your Network Connections\n";
export const NO_USER_FOUND_ERROR = "No Records Found \n\n Check In And Try Again";
export const HEALTH_NO_USER_FOUND_ERROR = "No Requests Records Found \n\n Your  Insurance Requests Will Be \n\n Listed Here After Submitting \n\nYour Request Thank You";
export const EMPTY_INPUTS_ERROR = "Please \n\n UserName And Password Are Required \n\n Try Again";
