
import { Alert, Linking,} from 'react-native';

export const updateApp = async () => {await Linking.openURL('https://play.google.com/store/apps/details?id=com.mogahenze.triplecare');};
export const OpenExternalLinks =async (url) => { await Linking.openURL(url)}

export const WebImagesSlider =  
    
`
    <!DOCTYPE html>
    <html lang="en">
    <head>

    <style>
    .slide 
    {
    margin-top: 20px;
    border-radius: 45px;

    width: 800px;
    height: 600px;
    overflow: hidden;
    position: relative;
    background-color: #000;
    }
    .slide > div 
    {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    animation: slide 25s infinite;
    opacity: 0;
    }
    .slide > div:nth-child(2) {animation-delay: 5s;}
    .slide > div:nth-child(3) {animation-delay: 10s;}
    .slide > div:nth-child(4) {animation-delay: 15s;}
    .slide > div:nth-child(5) {animation-delay: 20s;}

    @keyframes slide {
    10% {opacity: 1;}
    20% {opacity: 1;}
    30% {opacity: 0;}
    40% {transform: scale(1.1);}
    }
    </style>
    </head>
    <body>		
    <section>
    <center>                
    <div class="slide">
        <div style="background-image:url(img/image-1.jpg)"></div>
        <div style="background-image:url(img/image-2.jpg)"></div>
        <div style="background-image:url(img/image-3.jpg)"></div>
        <div style="background-image:url(img/image-4.jpg)"></div>
        <div style="background-image:url(img/image-5.jpg)"></div>
    </div>
    </center>
    </section>
    </body>
    </html>
`



