
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import { Video} from 'expo-av';
import { SliderBox } from "react-native-image-slider-box";
import { ServicesIcons } from './Functions';
import styles from "./stylesheet";
// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';
import ImageNext from "../imgs/next.png";
import ImageBack from "../imgs/back.png";
import ImagePointer from "../imgs/pointer.png";
import ImageMenu from "../imgs/menu.png";
import ServiceImage from '../imgs/testimony.png';


// import { DemoImages } from './DataFileApis';
export default class Testimony extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                // Images
                ImagesOfScreen0:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen1:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen2:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen3:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen4:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen5:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen6:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                ImagesOfScreen7:[
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-1.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-2.jpeg?raw=true",
                    "https://github.com/HENRY-2016/Development-Repo/blob/main/kam-app-3.jpeg?raw=true",
                ],
                

                // Videos
                VideoOfScreen0:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen1:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen2:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen3:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen4:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen5:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen6:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",
                VideoOfScreen7:"https://raw.githubusercontent.com/HENRY-2016/Development-Repo/main/kam-app-2.mp4",


            // Screens
                DonNotShowMainServiceListScreen:false,
                DonNotShowServiceListScreen0:true,
                DonNotShowServiceListScreen1:true,
                DonNotShowServiceListScreen2:true,
                DonNotShowServiceListScreen3:true,
                DonNotShowServiceListScreen4:true,
                DonNotShowServiceListScreen5:true,
                DonNotShowServiceListScreen6:true,
                DonNotShowServiceListScreen7:true,



            // customer
        }
        
    }
    
componentDidMount() {}
    
showMainServiceListScreen = () =>
{
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowMainServiceListScreen:false})

}
showServiceListScreen0 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen0:false})
}
showServiceListScreen1 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen1:false})
}
showServiceListScreen2 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen2:false})
}
showServiceListScreen3 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen3:false})
}
showServiceListScreen4 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen4:false})
}
showServiceListScreen5 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen5:false})
}
showServiceListScreen6 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen7:true})
    this.setState({DonNotShowServiceListScreen6:false})
}
showServiceListScreen7 = () =>
{
    this.setState({DonNotShowMainServiceListScreen:true})
    this.setState({DonNotShowServiceListScreen0:true})
    this.setState({DonNotShowServiceListScreen1:true})
    this.setState({DonNotShowServiceListScreen2:true})
    this.setState({DonNotShowServiceListScreen3:true})
    this.setState({DonNotShowServiceListScreen4:true})
    this.setState({DonNotShowServiceListScreen5:true})
    this.setState({DonNotShowServiceListScreen6:true})
    this.setState({DonNotShowServiceListScreen7:false})
}
    render() {
        
        // const { HairStylesItem,BookedStyle} = this.state;
        const { DonNotShowMainServiceListScreen, DonNotShowServiceListScreen0,DonNotShowServiceListScreen1,DonNotShowServiceListScreen2} = this.state;
        const { DonNotShowServiceListScreen3,DonNotShowServiceListScreen4,DonNotShowServiceListScreen5,DonNotShowServiceListScreen6,DonNotShowServiceListScreen7} = this.state;


        const { ImagesOfScreen0, ImagesOfScreen1,ImagesOfScreen2,ImagesOfScreen3,ImagesOfScreen4,
                ImagesOfScreen5,ImagesOfScreen6, ImagesOfScreen7,} = this.state;
        const { VideoOfScreen0,VideoOfScreen1,VideoOfScreen2,VideoOfScreen3,VideoOfScreen4,
                VideoOfScreen5,VideoOfScreen6,VideoOfScreen7} = this.state;
        return (
            <View style={styles.mainView}>
                
                    <View style={[styles.ModuleNameOuterTopView]} >
                        <View style={[styles.ModuleNameInnerTopView]}>
                        <View style={{height:30}}></View>

                            <View style={[styles.ModuleNameIconTextView]}>
                                <ServicesIcons image={ServiceImage}  />

                                <Text style={styles.ModuleNameTitleTextLabel}> Testimonies </Text>
                            </View>
                        </View>
                    </View>
                <ScrollView>
                {DonNotShowMainServiceListScreen ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView1]}>
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen0}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Our Estates  </Text>
                                </ScrollView>
                            </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView2]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen1}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Selling Land  </Text>
                                </ScrollView>
                            </TouchableOpacity>

                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView3]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView3]}>
                            
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen2}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Land Services  </Text>
                                </ScrollView>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView4]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView4]}>
                            
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen3}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Property Services </Text>
                                </ScrollView>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView5]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView5]}>
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen4} >
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Land Title Services </Text>
                                </ScrollView>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView6]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView6]}>
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen5} >
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> On Site Land Services  </Text>
                                </ScrollView>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView7]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView7]}>
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen6} >
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Construction Services </Text>
                                </ScrollView>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.MainOuterServiceCardView,styles.MainOuterServiceCardView8]} >
                        <View style={[styles.MainInnerServiceCardView,styles.MainInnerServiceCardView8]}>
                            <View style={styles.MainNavigationBtnView} >
                            <TouchableOpacity onPress={this.showServiceListScreen7}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={[styles.PointerBtn]}  >
                                    <Image source={ImagePointer} style={[styles.PointerIcons]} ></Image>
                                </View>
                                <Text style={styles.MainCardTitleTextLabel}> Letters of Administration </Text>
                                </ScrollView>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </>)}


                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 0
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                    {DonNotShowServiceListScreen0 ? <></>:(<>
                        <View style={[styles.MainOuterServiceCardView1]} >
                            <View style={{height:3}} ></View>
                            <View  style={styles.BackToMainListScreenView} >
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                    <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                    <Text style = {styles.MenuBtnText}> Menu  </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <View style={{height:30}} ></View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> Buying </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                    <Text style = {styles.btnText}> Other-1 </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}> Other-1 </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                                <View style={{height:30}} ></View>

                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen0} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen0}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Buy Now </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}


                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 1
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                {DonNotShowServiceListScreen1 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView1]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <View style={{height:20}} ></View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> We Buy Land</Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                    <Text style = {styles.btnText}> Other-1 </Text>
                                </TouchableOpacity>


                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen1} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen1}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Buy My Land </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 2
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                {DonNotShowServiceListScreen2 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView1]} >
                        <View style={{height:3}} ></View>
                        <View  style={styles.BackToMainListScreenView} >
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                <Text style = {styles.MenuBtnText}> Menu  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <View style={{height:20}} ></View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> Surveying </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                    <Text style = {styles.btnText}>  Grading </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen2} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen2}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Book For Service </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}

                                {/* 
                ====================================================================
                ====================================================================
                ====================================================================
                            Screen 3
                ====================================================================
                ====================================================================
                ====================================================================
            */}

            {DonNotShowServiceListScreen3 ? <></>:(<>
                <View style={[styles.MainOuterServiceCardView1]} >
                    <View style={{height:3}} ></View>
                    <View  style={styles.BackToMainListScreenView} >
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                            <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                            <Text style = {styles.MenuBtnText}> Menu  </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                    <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                        <View >
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <View style={{height:20}} ></View>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                <Text style = {styles.btnText}>Planning </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                <Text style = {styles.btnText}> Valuation </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                <Text style = {styles.btnText}> Renovation </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                <Text style = {styles.btnText}> Management </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                        </View>
                    </View>
                </View>

                <View style={styles.ImageVideoMainCardView}>
                    <View style={styles.ImageVideoView}>
                        <View style={styles.ImageSliderView}>
                                <View style={{height:20}}></View>
                                <SliderBox style={styles.ImageSliderView}
                                    images={ImagesOfScreen3} sliderBoxHeight={200}
                                    dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                    paginationBoxVerticalPadding={20}
                                    autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                    paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                    dotStyle={styles.ImageSliderDotStyle}
                                    ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                    imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                    /> 
                        </View> 

                        <View style={styles.VideoView}>
                            <View style={{width:15}} ></View>
                            <Video
                                style={styles.video}
                                source={{uri: VideoOfScreen3}}
                                useNativeControls resizeMode="contain" isLooping
                            />
                        </View>
                        
                        <View style={styles.HolidayHomeActionView}>
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> More Info </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}> Book For Service </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                            </ScrollView>
                        </View>   
                        <View style={styles.BottomSpaceView} ></View>
                    </View>
                </View> 
            </>)}

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 4
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                {DonNotShowServiceListScreen4 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView1]} >
                        <View style={{height:3}} ></View>
                        <View  style={styles.BackToMainListScreenView} >
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                <Text style = {styles.MenuBtnText}> Menu  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>

                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <View style={{height:20}} ></View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> Processing </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                    <Text style = {styles.btnText}> Subdivisions  </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}> Title Transfers  </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}> Cartography Work </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen4} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen4}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Book For Service </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 5
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                {DonNotShowServiceListScreen5 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView1]} >
                        <View style={{height:3}} ></View>
                        <View  style={styles.BackToMainListScreenView} >
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                <Text style = {styles.MenuBtnText}> Menu  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>

                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <View style={{height:20}} ></View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> LandScaping </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                    <Text style = {styles.btnText}> Topography </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}> Demarcation </Text>
                                </TouchableOpacity>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}>Boundary Opening </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen5} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen5}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Book For Service </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 6
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                {DonNotShowServiceListScreen6 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView1]} >
                        <View style={{height:3}} ></View>
                        <View  style={styles.BackToMainListScreenView} >
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                <Text style = {styles.MenuBtnText}> Menu  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>

                            
                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                
                                <View style={{height:20}} ></View>

                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                    <Text style = {styles.btnText}> House Plans </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn2]}  >
                                    <Text style = {styles.btnText}> Plan Approvals </Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}> Build Houses</Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                    <Text style = {styles.btnText}>Advise on House</Text>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                    <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                </TouchableOpacity>

                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen6} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen6}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Book For Service </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Screen 7
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}

                {DonNotShowServiceListScreen7 ? <></>:(<>
                    <View style={[styles.MainOuterServiceCardView1]} >
                        <View style={{height:3}} ></View>
                        <View  style={styles.BackToMainListScreenView} >
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  onPress={this.showMainServiceListScreen} >
                                <Image source={ImageMenu} style={[styles.MenuIcon]} ></Image> 
                                <Text style = {styles.MenuBtnText}> Menu  </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.MainScreenOuterServiceCardView,styles.MainOuterServiceCardView1]} >
                        <View style={[styles.MainScreenInnerServiceCardView,styles.MainInnerServiceCardView2]}>
                            <View >
                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                                
                                <View style={{height:20}} ></View>
                                
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]}  >
                                        <Text style = {styles.btnText}> Letter Processing </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]}  >
                                        <Text style = {styles.btnText}> Certified True Copies  </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]}  >
                                        <Text style = {styles.btnText}> Verification Of Letters </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn5]}  >
                                        <Text style = {styles.btnText}> Certificate Of No Objection </Text>
                                    </TouchableOpacity>


                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    </ScrollView>
                            </View>
                        </View>
                    </View>

                    <View style={styles.ImageVideoMainCardView}>
                        <View style={styles.ImageVideoView}>
                            <View style={styles.ImageSliderView}>
                                    <View style={{height:20}}></View>
                                    <SliderBox style={styles.ImageSliderView}
                                        images={ImagesOfScreen7} sliderBoxHeight={200}
                                        dotColor= {styles.ImageSliderDotColor} inactiveDotColor= {styles.ImageSliderInactiveDotColor}
                                        paginationBoxVerticalPadding={20}
                                        autoplay circleLoop resizeMethod={'resize'} resizeMode={'cover'}
                                        paginationBoxStyle={styles.ImagePaginationBoxStyle}
                                        dotStyle={styles.ImageSliderDotStyle}
                                        ImageComponentStyle={ styles.ImageSliderImageComponentStyle}
                                        imageLoadingColor={styles.ImageSliderImageLoadingColor}
                                        /> 
                            </View> 

                            <View style={styles.VideoView}>
                                <View style={{width:15}} ></View>
                                <Video
                                    style={styles.video}
                                    source={{uri: VideoOfScreen7}}
                                    useNativeControls resizeMode="contain" isLooping
                                />
                            </View>
                            
                            <View style={styles.HolidayHomeActionView}>
                                <View style={styles.MainNavigationBtnSpaceView} ></View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageNext} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]}  >
                                        <Text style = {styles.btnText}> More Info </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn3]}  >
                                        <Text style = {styles.btnText}> Book For Service </Text>
                                    </TouchableOpacity>

                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                    <TouchableOpacity style={[styles.ScreenArrowBtn]}  >
                                        <Image source={ImageBack} style={[styles.ScreenArrowIcons]} ></Image>
                                    </TouchableOpacity>
                                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                                </ScrollView>
                            </View>   
                            <View style={styles.BottomSpaceView} ></View>
                        </View>
                    </View> 
                </>)}









































                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
    

            </View>
        );
    }
}
