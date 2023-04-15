import React from "react"

import { Text, View, StyleSheet,Dimensions, ScrollView, Image} from 'react-native';
import { COLORS } from './Colours';

const {width} = Dimensions.get("window");
const height = 230; 
// const height = width * 0.5; 

export default class CustomSlider extends React.Component{
    constructor(props){
        super(props);
        this.state = {ActiveSliderDot:0,}
    }

    change = ({nativeEvent}) =>
    {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if (slide !== this.state.ActiveSliderDot){this.setState({ActiveSliderDot:slide})}
    }

    render (){
        return (
            <View style={{marginTop:5}}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={this.change} style={{width,height}}>
                    {this.props.images && this.props.images.map((image,index) =>(
                        
                        <Image key={index} source={{uri: image}} style={{width,height, borderRadius:25,resizeMode:'cover'}} />
                        
                    ))}
                </ScrollView>
                <View style={{height:10}} ></View>
                <View  style={style.SliderImageDotView}>
                    {this.props.images && this.props.images.map((item,index) =>(
                        <Text key={index} style={ index==this.state.ActiveSliderDot? style.SliderImageActiveDotText:style.SliderImageDotText}>⬤</Text>
                    ))}
                </View>
            </View>
        )
    }

}

const style = StyleSheet.create(
{   
SliderImageDotView:
{
    flexDirection:"row",
    position:"relative",
    bottom:0,alignSelf:"center",
},
SliderImageDotText:{color:COLORS.colorNumberOne,fontSize:18,},
SliderImageActiveDotText:{color:COLORS.red,fontSize:18,},
}
)