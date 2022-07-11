
import {Image} from 'react-native';

export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}


export const ServicesIcons = ({image}) => 
    {return<Image source={image} style={{width: 45, height: 45, marginLeft:30}} />;};
