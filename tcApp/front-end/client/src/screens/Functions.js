
// import {Constants,FileSystem } from 'expo';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';

export const formatNumberWithComma = (numb) => {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}



export const downLoadFile = () => {
console.log(' Downloading....');

let pdfUrl = 'https://raw.githubusercontent.com/HENRY-2016/TcNewsPdfs/main/1.pdf'
// let pdfUrl = 'https://raw.githubusercontent.com/HENRY-2016/TcNewsPdfs/main/TC-NEWS-UG-AUGUST-POTRAIT-1.pdf'

FileSystem.downloadAsync( pdfUrl,
    FileSystem.documentDirectory + 'news.pdf'
)
    .then(({ uri }) => {
    // console.log('Finished downloading to ', uri);
    Alert.alert("Massage","\n\nFinished Downloading File To \n\n"+uri);
    })
    .catch(error => {
    // console.error(error);
    Alert.alert("Error","\n\nWhen Downloading File  \n\n"+error);

    });
}

