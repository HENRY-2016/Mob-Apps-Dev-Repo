

export const PostingError = "Failed To Post Data\n\nMake Sure You Have \n\nInternet Connection";
export const TextInputError = "Sorry \n\n All Inputs Are Required";
export const LoadingError = "Failed To Load App Data\n\nMake Sure You Have \n\nInternet Connection";


export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

