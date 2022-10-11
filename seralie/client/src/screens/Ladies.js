
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import axios from "axios";
import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';

import { formatNumberWithComma } from './Functions';

export default class Ladies extends React.Component {
constructor(props){
    super(props);
    this.state = {
        HairStylesItem: [],
        BookedStyle:[],

        // Screens
        DoNotShowProductScreen:false,
        DoNotShowBookingScreen:true,

        // customer
        UserName:'',
        UserPhone:'',
        UserDate:'',
        UserTime:'',
    }
    
}

componentDidMount() {
    axios.get(APIlistAllBlackFridayProducts)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({HairStylesItem:[...JSON.parse(results)]})
        // console.log(this.state)
        })
    .catch(err=>{Alert.alert("Error","\n\n Can Not Load Products"+err)})


}


showProductScreen = () =>
{
    this.setState({DoNotShowBookingScreen:false})
    this.setState({DoNotShowProductScreen:true})
}
showBookingScreen = () =>
{
    this.setState({DoNotShowProductScreen:true})
    this.setState({DoNotShowBookingScreen:false})
}
setUserName = (text) =>{this.setState({UserName:text});}
setUserPhone = (text) =>{this.setState({UserPhone:text});}
setUserDate = (text) =>{this.setState({UserDate:text});}
setUserTime = (text) =>{this.setState({UserTime:text});}

bookNow = (image,Name,Description,Amount) =>
{
    let booked = []
    let clientStyle = {image:image,Name:Name, Description:Description, Amount:Amount};
    booked.push(clientStyle);
    this.setState({BookedStyle:[...booked]})
    setTimeout(this.showBookingScreen,2000);
    // console.log(this.state.BookedStyle);
}
postCustomerBookingDetails =  async () => 
{
    let customerBooking = this.state.BookedStyle;
    
    if (customerBooking.length == 0)
    {
        Alert.alert("Sorry","\n\n You Have No Items For Ordering \n\n Go To Products And Shop")
    }
    
    else
    {
        let styleBooked = JSON.stringify([...this.state.BookedStyle]);
        let userName = this.state.UserName;
        let userPhone = this.state.UserPhone;
        let userDate = this.state.UserDate;
        let userTime = this.state.UserTime;

        console.log(userName +"::"+ userPhone +"::"+ userDate+"::"+userTime);
        console.log(styleBooked);

        // try
        // {
        //     // post data
        //     console.log(APIpostCustomerOrder)
        //     const bookingRequest = await axios.post(APIpostCustomerOrder,
        //         {
        //             "Name":userName,
        //             "Phone":userPhone,
        //             "Date":userDate,
        //             "Time":userTime,
        //             "StyleBooked":styleBooked,
        //         }
        //     )
            
        //     let result = bookingRequest.data.status;
        //     Alert.alert("Order Status",result);
        //     // this.props.navigation.navigate('Home');
        // }

        // catch (error)
        //     {
        //         Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)
        //     };
    }

}

render() {
    
    const { HairStylesItem,BookedStyle} = this.state;
    const { DoNotShowProductScreen,DoNotShowBookingScreen } = this.state;

    return (
        
        <View style={styles.mainView}>
            <View style={{height:35}}></View>

            {DoNotShowProductScreen ?<></>:(<>
                <ScrollView>
                    {HairStylesItem && HairStylesItem.map((item, i) => (
                        <>
                        <View key={i} style={styles.mainCardContainerView}>

                            <View style={styles.imageRightView}>
                                <TouchableOpacity>
                                    <Image source={{uri: imageurl+item.image}} style={styles.productImage} />
                                </TouchableOpacity>
                            </View>

                                <View style={styles.textLableLeftView}>
                                    <Text numberOfLines={1} style={styles.textLabels}> {item.Name}</Text>
                                    <Text numberOfLines={1} style={styles.textLabels}> {item.Description}</Text>
                                    <Text numberOfLines={1} style={styles.textLabels}> {formatNumberWithComma(item.Amount)}</Text>

                                </View>
                        </View>
                        <View style={styles.bookNowBtnView}>
                            <TouchableOpacity style={[styles.bookNowBtn, styles.bookNowBtn1]} onPress={()=>this.bookNow(item.image, item.Name,item.Description,item.Amount)} >
                                <Text style = {styles.btnText}> Book Now </Text>
                            </TouchableOpacity>
                        </View>
                        
                    </>
                    ))}
                    <View style={{height:35}}></View>
                </ScrollView>
            </>)}


            {DoNotShowBookingScreen ?<></>:(<>
                <ScrollView>
                    {BookedStyle && BookedStyle.map((item, i) => (
                        <>
                        <View key={i} style={styles.mainBookingCardContainerView}>

                            <View style={styles.imageRightView}>
                                <TouchableOpacity>
                                    <Image source={{uri: imageurl+item.image}} style={styles.productImage} />
                                </TouchableOpacity>
                            </View>

                                <View style={styles.textLableLeftView}>
                                    <Text numberOfLines={1} style={styles.textLabels}> {item.Name}</Text>
                                    <Text numberOfLines={1} style={styles.textLabels}> {item.Description}</Text>
                                    <Text numberOfLines={1} style={styles.textLabels}> {formatNumberWithComma(item.Amount)}</Text>

                                </View>
                        </View>
                    </>
                    ))}

                        <View style={styles.orderListDetailsText} >
                            <View style={{height:20}} ></View>
                            <Text style={styles.nextbtnText} >Customer Booking Details</Text>
                            <TextInput style={styles.input} placeholder="Customer Name" onChangeText={text => this.setUserName(text)} 
                            placeholderTextColor = "#fff" />

                            <TextInput style={styles.input} placeholder="Phone Number" onChangeText={text => this.setUserPhone(text)} 
                            placeholderTextColor = "#fff" maxLength={10} keyboardType="numeric" />

                            <TextInput style={styles.input} placeholder="Date" onChangeText={text => this.setUserDate(text)} 
                            placeholderTextColor = "#fff" />

                            <TextInput style={styles.input} placeholder="Time" onChangeText={text => this.setUserTime(text)} 
                            placeholderTextColor = "#fff" />
                    
                            <View style={{height:30}} ></View>
                            <View style={{alignItems: "center"}}>
                                <TouchableOpacity onPress={() => this.postCustomerBookingDetails()}style={[styles.bookNowBtn, styles.bookNowBtn2]} >
                                    <Text style={styles.nextbtnText} >Submit</Text> 
                                </TouchableOpacity>
                            </View>
                            <View style={{height:30}} ></View>
                        </View>
                    <View style={{height:35}}></View>
                </ScrollView>
            </>)}
        </View>
    );
}
}
