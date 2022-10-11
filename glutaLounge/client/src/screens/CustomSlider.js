import React from "react"

import { Text, View, StyleSheet,Dimensions, ScrollView, Image} from 'react-native';
import { COLORS } from './Colours';

const {width} = Dimensions.get("window");
const height = width * 0.6; 

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
            <View style={{marginTop:20}}>
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={this.change} style={{width,height}}>
                    {this.props.images && this.props.images.map((image,index) =>(
                        
                        <Image key={index} source={{uri: image}} style={{width,height, borderColor:COLORS.MainColorOne,borderWidth: 5,resizeMode:'cover'}} />
                        
                    ))}
                </ScrollView>
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
SliderImageDotText:{color:COLORS.MainColorOne,fontSize:25,},
SliderImageActiveDotText:{color:COLORS.white,fontSize:25,},
}
)