
import {Image} from 'react-native';


export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

export const HeaderTopRightIcon = ({image}) => 
    {return <Image source={image} style={{width: 40, height: 40}} />;};
export const NavigationIcon = ({image}) => 
    {return<Image source={image} style={{width: 30, height: 30}} />;};

