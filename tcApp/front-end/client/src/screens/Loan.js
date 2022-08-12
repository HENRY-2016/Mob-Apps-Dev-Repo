
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons,AntDesign,FontAwesome} from '@expo/vector-icons';
import { COLORS } from './Colours';
// import axios from "axios";
// import {APIlistAllBlackFridayProducts, imageurl} from './DataFileApis';

// import { formatNumberWithComma } from './Functions';

export default class Loan extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        Countries:[{countryName:'Uganda',countryCode:'+256'},{countryName:'Kenya',countryCode:'+257'},{countryName:'USA',countryCode:'666'},{countryName:'UK',countryCode:'555'}],
            
            // Screens
            DoNotShowHomeScreen:false,
            DoNotShowApplyScreen:true,
            DoNotShowAboutScreen:true,
            DoNotShowLogInScreen:true,

            // Inner Screens
            DoNotShowPersonInfoSectionScreen:false,
            DoNotShowLoanSectionScreen:true,
            DoNotShowGuarantorsSectionScreen:true,
            DoNotShowSecuritySectionScreen:true,


            // customer Loan application details
            CountrySelectedValue:'',
            PhoneCountryCode:'',
            CountrySelected:'',
            ApplicantFaceImage:null,
            ApplicantFrontId:null,
            ApplicantBackId:null,
            ApplicantName:'',
            ApplicantGender:'',
            ApplicantPhone:'',
            ApplicantDistrict:'',
            ApplicantSubCounty:'',
            ApplicantVillage:'',
            ApplicantBusinessType:'',
            ApplicantBusinessName:'',
            ApplicantBusinessLocation:'',

            ApplicantLoanPurpose:'',
            ApplicantEffectiveDate:'',
            ApplicantPaymentSource:'',
            ApplicantPeriod:'',

            GuarantorsFaceImage:null,
            GuarantorsFrontId:null,
            GuarantorsBackId:null,
            GuarantorsName:'',
            GuarantorsGender:'',
            GuarantorsPhone:'',
            GuarantorsDistrict:'',
            GuarantorsSubCounty:'',
            GuarantorsVillage:'',

            ApplicantSecurityType:'',
            
        }
        
    }
    
componentDidMount() {}





setApplicantName = (text) =>{this.setState({ApplicantName:text});}
setApplicantGender = (text) =>{this.setState({ApplicantGender:text});}
setApplicantPhone = (text) =>{this.setState({ApplicantPhone:text});}
setApplicantDistrict = (text) =>{this.setState({ApplicantDistrict:text});}
setApplicantSubCounty = (text) =>{this.setState({ApplicantSubCounty:text});}
setApplicantVillage = (text) =>{this.setState({ApplicantVillage:text});}
setApplicantBusinessType = (text) =>{this.setState({ApplicantBusinessType:text});}
setApplicantBusinessName = (text) =>{this.setState({ApplicantBusinessName:text});}
setApplicantBusinessLocation = (text) =>{this.setState({ApplicantBusinessLocation:text});}

setApplicantLoanPurpose = (text) =>{this.setState({ApplicantLoanPurpose:text});}
setApplicantEffectiveDate = (text) =>{this.setState({ApplicantEffectiveDate:text});}
setApplicantPaymentSource = (text) =>{this.setState({ApplicantPaymentSource:text});}
setApplicantPeriod = (text) =>{this.setState({ApplicantPeriod:text});}


setGuarantorsName = (text) =>{this.setState({GuarantorsName:text});}
setGuarantorsGender= (text) =>{this.setState({GuarantorsGender:text});}
setGuarantorsPhone = (text) =>{this.setState({GuarantorsPhone:text});}
setGuarantorsDistrict = (text) =>{this.setState({GuarantorsDistrict:text});}
setGuarantorsSubCounty = (text) =>{this.setState({GuarantorsSubCounty:text});}
setGuarantorsVillage = (text) =>{this.setState({GuarantorsVillage:text});}

setApplicantSecurityType = (text) =>{this.setState({ApplicantSecurityType:text});}

showHomeScreen = () =>
{
    this.setState({DoNotShowApplyScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowHomeScreen:false})
}
showApplyScreen = () =>
{
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowApplyScreen:false})
}
showLogInScreen = () =>
{
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowAboutScreen:true})
    this.setState({DoNotShowApplyScreen:true})
    this.setState({DoNotShowLogInScreen:false})
}

showAboutScreen = () =>
{
    this.setState({DoNotShowApplyScreen:true})
    this.setState({DoNotShowHomeScreen:true})
    this.setState({DoNotShowLogInScreen:true})
    this.setState({DoNotShowAboutScreen:false})
}

showPersonInfoSectionScreen = () =>
{
    // if (
    //     (this.state.ApplicantName.length == 0 ) ||
    //     (this.state.ApplicantGender.length == 0 ) ||
    //     (this.state.ApplicantPhone.length == 0 ) ||
    //     (this.state.ApplicantDistrict.length == 0 ) ||
    //     (this.state.ApplicantSubCounty.length == 0 ) ||
    //     (this.state.ApplicantVillage.length == 0 ) ||
    //     (this.state.ApplicantBusinessType.length == 0 ) ||
    //     (this.state.ApplicantBusinessName.length == 0 ) ||
    //     (this.state.ApplicantBusinessLocation.length == 0 )
    //     )
    //     {Alert.alert("Person Info Warning","\n \n  All Inputs Are Required \n\n And None Can Be Empty")}
    
    // else
    // {
        this.setState({DoNotShowLoanSectionScreen:true})
        this.setState({DoNotShowGuarantorsSectionScreen:true})
        this.setState({DoNotShowSecuritySectionScreen:true})
        this.setState({DoNotShowPersonInfoSectionScreen:false})
    // }

}

showPersonLoanSectionScreen = () =>
{
    // if (
    //         (this.state.ApplicantLoanPurpose.length == 0 ) ||
    //         (this.state.ApplicantEffectiveDate.length == 0 ) ||
    //         (this.state.ApplicantPaymentSource.length == 0 ) ||
    //         (this.state.ApplicantPeriod.length == 0 )
    //     )
    // {Alert.alert("Loan Section Warning","\n \n  All Inputs Are Required \n\n And None Can Be Empty")}
    // else
    // {
        this.setState({DoNotShowGuarantorsSectionScreen:true})
        this.setState({DoNotShowSecuritySectionScreen:true})
        this.setState({DoNotShowPersonInfoSectionScreen:true})
        this.setState({DoNotShowLoanSectionScreen:false})
    // }
}
showPersonGuarantorsSectionScreen = () =>
{
    // if (
    //     (this.state.GuarantorsName.length == 0 ) ||
    //     (this.state.GuarantorsGender.length == 0 ) ||
    //     (this.state.GuarantorsPhone.length == 0 ) ||
    //     (this.state.GuarantorsDistrict.length == 0 ) ||
    //     (this.state.GuarantorsSubCounty.length == 0 ) ||
    //     (this.state.GuarantorsVillage.length == 0 ) 
        
    //     )
    // {Alert.alert("Guarantor Section Warning","\n \n  All Inputs Are Required \n\n And None Can Be Empty")}
    // else
    // {
    this.setState({DoNotShowSecuritySectionScreen:true})
    this.setState({DoNotShowPersonInfoSectionScreen:true})
    this.setState({DoNotShowLoanSectionScreen:true})
    this.setState({DoNotShowGuarantorsSectionScreen:false})
    // }
}

showPersonSecuritySectionScreen = () =>
{
    // if (
    //     (this.state.SecurityType.length == 0 )
    //     )
    // {Alert.alert("Security Section Warning","\n \n  All Inputs Are Required \n\n And None Can Be Empty")}
    // else
    // {
    this.setState({DoNotShowPersonInfoSectionScreen:true})
    this.setState({DoNotShowLoanSectionScreen:true})
    this.setState({DoNotShowGuarantorsSectionScreen:true})
    this.setState({DoNotShowSecuritySectionScreen:false})
    // }
}


postLoanApplication = async () => 
{
    let name = this.state.ApplicantName;
    // let phone = this.state.MemberPhone;
    // let address = this.state.MemberAddress;
    // let email = this.state.MemberEmail;

    // PlotNumber:'',
    // PlotBlock:'',
    // PlotLocation:

    // console.log("Name ==> "+ name)
    // console.log("Phone ==> "+ phone)
    // console.log("address ==> "+ address)
    // console.log("service ==> "+ service)

    if ((name.length == 0))
    {Alert.alert("Warning"," \n\n Name, \n \n Can Not Be Empty")}

    else
    {
        console.log("Name ==> "+ name)
        
        
        Alert.alert("Applicant details","\n\n"+name)
        

        // try
        // {
        //     // post data
        //     const d = new Date();
        //     let month = d.getMonth();
        //     let day = d.getDay();
        //     let hour = d.getHours();  
        //     let minutes = d.getMinutes();
        //     let seconds = d.getSeconds();  
        //     let referance = "#"+month+day+hour+minutes+seconds;
        //     const postrequest = await axios.post(APICustomerServiceBooking,
        //         {
        //             "Name":name,
        //             "Phone":phone,
        //             "Address":Address,
        //             "Reference":referance,
        //             "ServiceName":ServiceNameValue,
        //         }
        //     )
            
        //     let result = postrequest.data.status;
        //     Alert.alert("Order Status",result);
        // }

        // catch (error)
        //     {Alert.alert("An Error","Host Not Found Or Check\n\nYour Network Connections\n\n"+error)};
    }
}

setCountrySelectedValue  = (text) =>
{
    const CountriesArr = [...this.state.Countries]
    let Index = text.split(':');
    console.log("======"+text)
    let country = Index[0]
    let arraryIndex = Index[1]
    console.log("======"+country)
    console.log("======"+arraryIndex)
    let code = CountriesArr[arraryIndex]
    let phoneCode = code.countryCode


    
    // countryCode

    this.setState({PhoneCountryCode:phoneCode});
    this.setState({CountrySelected:country});

}


openApplicantFacePhotoImage = async () => 
{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // base64:true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) 
        {this.setState({ApplicantFaceImage:result.uri});}
};

openApplicantFrontId = async () => 
{
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) 
        {this.setState({ApplicantFrontId:result.uri});}
};

openApplicantBackId = async () => 
{
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) 
        {this.setState({ApplicantBackId:result.uri});}
};





openGuarantorsFaceImage = async () => 
{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // base64:true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) 
        {this.setState({GuarantorsFaceImage:result.uri});}
};

openGuarantorsFrontId = async () => 
{
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) 
        {this.setState({GuarantorsFrontId:result.uri});}
};

openGuarantorsBackId = async () => 
{
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    console.log(result);

    if (!result.cancelled) 
        {this.setState({GuarantorsBackId:result.uri});}
};

render() {
    
    const {DoNotShowHomeScreen,DoNotShowAboutScreen,DoNotShowApplyScreen,DoNotShowLogInScreen } = this.state;
    const { Countries,CountrySelectedValue,CountrySelected,PhoneCountryCode} = this.state;
    const {DoNotShowPersonInfoSectionScreen,DoNotShowLoanSectionScreen,DoNotShowGuarantorsSectionScreen,DoNotShowSecuritySectionScreen} = this.state;

    const {ApplicantFaceImage,ApplicantFrontId,ApplicantBackId,GuarantorsFaceImage,GuarantorsFrontId,GuarantorsBackId} = this.state;
    const {
        ApplicantName,ApplicantGender,ApplicantPhone,ApplicantDistrict,ApplicantSubCounty,
        ApplicantVillage,ApplicantBusinessType,ApplicantBusinessName,ApplicantBusinessLocation } = this.state;

    const {ApplicantLoanPurpose,ApplicantEffectiveDate,ApplicantPaymentSource,ApplicantPeriod} = this.state;
    const {GuarantorsName,GuarantorsGender,GuarantorsPhone,GuarantorsDistrict,GuarantorsSubCounty,GuarantorsVillage,} = this.state;
    const {ApplicantSecurityType} = this.state;
    return (
        
        <View style={styles.mainView}>
            <View style={styles.topNavigationHeader}>
                <View style={styles.openDrawerMenuView} >
                    <View style={styles.mainMenuView}>
                        <TouchableOpacity style={styles.openDrawerbtn} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="navicon" size={28} color="black" style={styles.opeMenuIcone} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View style = { styles.productTopTitleNameView}>
                    <Text style = { styles.productTopTitleName}> Loan </Text>
                </View> */}
                <View style={styles.mainChatView}>
                    <TouchableOpacity style={styles.openChatBtn} onPress={() => this.props.navigation.navigate('Chat')}>
                        <Ionicons name="ios-chatbubble-ellipses-sharp" size={30} style={styles.opeMenuIcone} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={styles.MainTopHeaderView} >
                    <View style={styles.MainTopHeaderTextView}>
                        <Text style={styles.MainTopHeaderTextLabel}>  Loans </Text>
                    </View>
                </View>
                <View style={[styles.MainTopRadiusView,styles.MainTopRadiusView2]} ></View>
                <View style={styles.MainTopRadiusSpaceBottomView} ></View>

                <View style={styles.MainNavigationBtnView}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="rightcircle" size={30} style={styles.ArrowIcon} />
                        </View>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showHomeScreen} >
                            <Text style = {styles.btnText}> Home  </Text>
                        </TouchableOpacity>

                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showAboutScreen} >
                            <Text style = {styles.btnText}> About </Text>
                        </TouchableOpacity>

                        {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showApplyScreen} >
                            <Text style = {styles.btnText}> Apply </Text>
                        </TouchableOpacity> */}

                        {/* <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.showLogInScreen}  >
                            <Text style = {styles.btnText}> Log in </Text>
                        </TouchableOpacity> */}
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                        <View style={styles.ArrowMainView}>
                            <AntDesign name="leftcircle" size={30} style={styles.ArrowIcon} />
                        </View>
                        <View style={styles.MainNavigationBtnSpaceView} ></View>
                    </ScrollView>
                </View>
                <View style={{height:20}}></View>
    
                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Begin Home Screen
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                {DoNotShowHomeScreen ?<></>:(<>
                <Text style={styles.AboutTitleText} >Coming Soon</Text>

                </>) }

                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Begin About Screen
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                { DoNotShowAboutScreen ? <></>:(<>
                    <View style={{height:15}} ></View>
                    {/* <View style={styles.MainOuterCardListView} >
                        <View  style={styles.MainInnerCardAboutView}>

                        <Text style={styles.AboutTitleText} >About1</Text>
                            <Text style={styles.AboutText} >
                                About Information
                            </Text>
                        </View>
                    </View> */}

                    <View style={styles.MainOuterCardListView} >
                        <View  style={styles.MainInnerCardAboutView}>

                        {/* <Text style={styles.AboutTitleText} >Terms And Conditions Apply </Text>
                            <Text style={styles.AboutText} >
                            Conditions Apply Conditions Apply Conditions Apply
                            </Text> */}
                    <Text style={styles.AboutTitleText} >Coming Soon</Text>

                        </View>
                    </View>
                </>)}
                
                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Begin Apply Screen
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                { DoNotShowApplyScreen ?<></>:(<>
                    <View style={styles.orderListDetailsText} >

                    {DoNotShowPersonInfoSectionScreen ?<></>:(<>
                    <View style={styles.ApplyCardView} >
                        <View style={styles.LoanAppTitle}>
                            <View style={{height:10}} ></View>
                            <Text style = {[styles.myText, styles.myText1]}> Personal Information Section  </Text>
                        </View>
                        <View style={styles.pickerSelectionInputView}>
                            <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                selectedValue={CountrySelectedValue}
                                
                                onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                    <Picker.Item label="Select  African Country"/> 
                                    {Countries && Countries.map((iteam,Index ) => (
                                    <Picker.Item label={iteam.countryName} value={iteam.countryName+':'+Index} /> 
                                    ))}
                            </Picker>
                        </View>


                        <TextInput style={styles.input} placeholder="Country" editable = {false}  defaultValue={CountrySelected}
                        placeholderTextColor = "#5800c4" 
                        />

                        <View style={{height:20}}></View>
                        <View style={styles.uploadedImageView}>
                            <TouchableOpacity style={[styles.PhotoUploadBtn]} onPress={this.openApplicantFacePhotoImage} >
                                <Text style = {styles.PhotoUploadBtnText}> Passport Photo  </Text>
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            {ApplicantFaceImage && <Image source={{ uri: ApplicantFaceImage }} style={{ width: 200, height: 200 }} />}
                        </View>

                        <Text style ={[styles.myText, styles.myText2]}> Identification Type: Id, </Text>
                        <View style={{height:20}} ></View>
                        <Text style ={[styles.myText, styles.myText2]}> Passport, Driver’s Licence   </Text>
                        <View style={{height:20}}></View>
                        <View style={styles.uploadedImageView}>
                            <TouchableOpacity style={[styles.PhotoUploadBtn]} onPress={this.openApplicantFrontId} >
                                <Text style = {styles.PhotoUploadBtnText}> Front Side Photo </Text>
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            {ApplicantFrontId && <Image source={{ uri: ApplicantFrontId }} style={{ width: 200, height: 200 }} />}
                        </View>

                        <View style={{height:20}} ></View>
                            <View style={styles.uploadedImageView}>
                            <TouchableOpacity style={[styles.PhotoUploadBtn]} onPress={this.openApplicantBackId} >
                                <Text style = {styles.PhotoUploadBtnText}> Back Side Photo</Text>
                            </TouchableOpacity>
                            <View style={{height:20}}></View>
                            {ApplicantBackId && <Image source={{ uri: ApplicantBackId }} style={{ width: 200, height: 200 }} />}
                        </View>

                        <TextInput style={styles.input} placeholder="Full Name" onChangeText={text => this.setApplicantName(text)}  
                        placeholderTextColor = "#5800c4" 
                        />

                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs1} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={ApplicantGender}
                                
                                onValueChange={(itemValue) =>this.setApplicantGender(itemValue)}>
                                    <Picker.Item label="Select Gender"/> 
                                    <Picker.Item label="Male" value="Male" /> 
                                    <Picker.Item label="Female" value="Female" /> 
                            </Picker>
                        </View>


                            <View style={styles.PhoneInput} >
                                <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" onChangeText={text => this.setMemberPhone(text)}
                                placeholderTextColor = "#5800c4" 
                                />
                                <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Mobile Phone" onChangeText={text => this.setApplicantPhone(text)}
                                placeholderTextColor = "#5800c4" 
                                maxLength={9} keyboardType="numeric" 
                                />
                            </View>

                        
                            <TextInput style={styles.input} placeholder="District" onChangeText={text => this.setApplicantDistrict(text)}
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Sub County" onChangeText={text => this.setApplicantSubCounty(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <TextInput style={styles.input} placeholder="Village / Town" onChangeText={text => this.setApplicantVillage(text)}
                            placeholderTextColor = "#5800c4" 
                            />

                        <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs1} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={ApplicantBusinessType}
                                
                                onValueChange={(itemValue) =>this.setApplicantBusinessType(itemValue)}>
                                    <Picker.Item label="Business Type"/> 
                                    <Picker.Item label="Exporting" value="Exporting" /> 
                                    <Picker.Item label="Importing" value="Importing" /> 
                                    <Picker.Item label="Partnership" value="Partnership" /> 
                                    <Picker.Item label="Cooperative" value="Cooperative" /> 
                                    <Picker.Item label="Manufacturing" value="Manufacturing" /> 
                                    <Picker.Item label="Sole Proprietorship" value="Sole Proprietorship" /> 
                            </Picker>
                        </View>

                        <TextInput style={styles.input} placeholder="Name Of Business" onChangeText={text => this.setApplicantBusinessName(text)}
                        placeholderTextColor = "#5800c4" 
                        />
                        <TextInput style={styles.input} placeholder="Location" onChangeText={text => this.setApplicantBusinessLocation(text)}
                        placeholderTextColor = "#5800c4" 
                        />
                            <View style={{height:20}}></View>

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonLoanSectionScreen} >
                                <Text style = {styles.btnText}> Next  </Text>
                                <Text style = {styles.nextBtn}>
                                <AntDesign name="doubleright" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>
                            <View style={{height:10}}></View>
                        </View>
                        </>)}







                        {DoNotShowLoanSectionScreen ?<></>:(<>
                            <View style={styles.ApplyCardView} >
                            <View style={styles.LoanAppTitle}>
                                <View style={{height:10}} ></View>
                                <Text style = {[styles.myText, styles.myText1]}> Loan Section  </Text>
                            </View>

                            <TextInput style={styles.input} placeholder="Loan Purpose" onChangeText={text => this.setApplicantLoanPurpose(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <TextInput style={styles.input} placeholder="Effective  Date" onChangeText={text => this.setApplicantEffectiveDate(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <TextInput style={styles.input} placeholder="Repayment Source" onChangeText={text => this.setApplicantPaymentSource(text)}
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Loan Term / Period " onChangeText={text => this.setApplicantPeriod(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <View style={{height:20}}></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonInfoSectionScreen} >
                                <Text style = {styles.btnText}> Back  </Text>
                                <Text style = {styles.backBtn}>
                                <AntDesign name="doubleleft" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>
                            {/* <View style={{height:10}}></View> */}
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonGuarantorsSectionScreen} >
                                <Text style = {styles.btnText}> Next  </Text>
                                <Text style = {styles.nextBtn}>
                                <AntDesign name="doubleright" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>
                            <View style={{height:10}}></View>
                        </View>
                        </>)}
                        





                        {DoNotShowGuarantorsSectionScreen?<></>:(<>

                            <View style={styles.ApplyCardView} >
                            <View style={styles.LoanAppTitle}>
                                <View style={{height:10}} ></View>
                                <Text style = {[styles.myText, styles.myText1]}> Guarantors Section  </Text>
                            </View>

                            <TextInput style={styles.input} placeholder="Country" editable = {false}  defaultValue={CountrySelected}
                            placeholderTextColor = "#5800c4" 
                            />

                            <View style={{height:20}}></View>
                            <View style={styles.uploadedImageView}>
                                <TouchableOpacity style={[styles.PhotoUploadBtn]} onPress={this.openGuarantorsFaceImage} >
                                    <Text style = {styles.PhotoUploadBtnText}> Passport Photo  </Text>
                                </TouchableOpacity>
                                <View style={{height:20}}></View>
                                { GuarantorsFaceImage && <Image source={{ uri:  GuarantorsFaceImage }} style={{ width: 200, height: 200 }} />}
                            </View>

                            <Text style ={[styles.myText, styles.myText2]}> Identification Type: Id, </Text>
                            <View style={{height:20}} ></View>
                            <Text style ={[styles.myText, styles.myText2]}> Passport, Driver’s Licence   </Text>
                            <View style={{height:20}}></View>
                            <View style={styles.uploadedImageView}>
                                <TouchableOpacity style={[styles.PhotoUploadBtn]} onPress={this.openGuarantorsFrontId} >
                                    <Text style = {styles.PhotoUploadBtnText}> Front Side Photo </Text>
                                </TouchableOpacity>
                                <View style={{height:20}}></View>
                                {GuarantorsFrontId && <Image source={{ uri:GuarantorsFrontId}} style={{ width: 200, height: 200 }} />}
                            </View>

                            <View style={{height:20}} ></View>
                                <View style={styles.uploadedImageView}>
                                <TouchableOpacity style={[styles.PhotoUploadBtn]} onPress={this.openGuarantorsBackId} >
                                    <Text style = {styles.PhotoUploadBtnText}> Back Side Photo</Text>
                                </TouchableOpacity>
                                <View style={{height:20}}></View>
                                {GuarantorsBackId && <Image source={{ uri: GuarantorsBackId }} style={{ width: 200, height: 200 }} />}
                            </View>

                            <TextInput style={styles.input} placeholder="Full Name" onChangeText={text => this.setGuarantorsName(text)}  
                            placeholderTextColor = "#5800c4" 
                            />

                            <View style={styles.pickerSelectionInputView1}>
                                <Picker style={styles.pickerSelectioninputs1} dropdownIconColor= {COLORS.colourNumberOne}
                                    selectedValue={GuarantorsGender}
                                    
                                    onValueChange={(itemValue) =>this.setGuarantorsGender(itemValue)}>
                                        <Picker.Item label="Select Gender"/> 
                                        <Picker.Item label="Male" value="Male" /> 
                                        <Picker.Item label="Female" value="Female" /> 
                                </Picker>
                            </View>
                                <View style={styles.PhoneInput} >
                                    <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" onChangeText={text => this.setMemberPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    />
                                    <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Mobile Phone" onChangeText={text => this.setGuarantorsPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    maxLength={9} keyboardType="numeric" 
                                    />
                                </View>

                            
                                <TextInput style={styles.input} placeholder="District" onChangeText={text => this.setGuarantorsDistrict(text)}
                                placeholderTextColor = "#5800c4" 
                                />

                                <TextInput style={styles.input} placeholder="Sub County" onChangeText={text => this.setGuarantorsSubCounty(text)}
                                placeholderTextColor = "#5800c4" 
                                />
                                <TextInput style={styles.input} placeholder="Village / Town" onChangeText={text => this.setGuarantorsVillage(text)}
                                placeholderTextColor = "#5800c4" 
                                />

                                <View style={{height:20}}></View>

                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonLoanSectionScreen} >
                                    <Text style = {styles.btnText}> Back  </Text>
                                    <Text style = {styles.backBtn}>
                                    <AntDesign name="doubleleft" size={24} color="white" />
                                    </Text>
                                </TouchableOpacity>
                                {/* <View style={{height:10}} ></View> */}
                                <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonSecuritySectionScreen} >
                                    <Text style = {styles.btnText}> Next  </Text>
                                    <Text style = {styles.nextBtn}>
                                    <AntDesign name="doubleright" size={24} color="white" />
                                    </Text>
                                </TouchableOpacity>
                                <View style={{height:10}}></View>
                            </View>
                        </>)}
                        




                        {DoNotShowSecuritySectionScreen ?<></>:(<>
                            <View style={styles.ApplyCardView} >
                            <View style={styles.LoanAppTitle}>
                                <View style={{height:10}} ></View>
                                <Text style = {[styles.myText, styles.myText1]}> Security Section  </Text>
                            </View>
                            <View style={{height:10}} ></View>
                            <View style={styles.pickerSelectionInputView1}>
                            <Picker style={styles.pickerSelectioninputs1} dropdownIconColor= {COLORS.colourNumberOne}
                                selectedValue={ApplicantSecurityType}
                                
                                onValueChange={(itemValue) =>this.setApplicantSecurityType(itemValue)}>
                                    <Picker.Item label="Security Type"/> 
                                    <Picker.Item label="Land Title" value="Land Title" /> 
                                    <Picker.Item label="Land Title" value="Land Title" /> 
                                    <Picker.Item label="Land Title" value="Land Title" /> 
                                    <Picker.Item label="Land Title" value="Land Title" /> 
                                </Picker>
                            </View>
                            
                            <TextInput style={styles.input} placeholder="Loan Purpose" onChangeText={text => this.setMemberPhone(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <TextInput style={styles.input} placeholder="Effective  Date" onChangeText={text => this.setMemberPhone(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <TextInput style={styles.input} placeholder="Repayment Source" onChangeText={text => this.setMemberPhone(text)}
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Loan Term / Period " onChangeText={text => this.setMemberPhone(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <View style={{height:20}}></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonGuarantorsSectionScreen} >
                                <Text style = {styles.btnText}> Back  </Text>
                                <Text style = {styles.backBtn}>
                                <AntDesign name="doubleleft" size={24} color="white" />
                                </Text>
                            </TouchableOpacity>
                            <View style={{height:10}}></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showPersonLoanSectionScreen} >
                                <Text style = {styles.btnText}> Submit  </Text>
                            </TouchableOpacity>
                            <View style={{height:10}}></View>
                        </View>
                        </>)}
                    </View>
                </>)}
                
                {/* 
                    ====================================================================
                    ====================================================================
                    ====================================================================
                                Begin LogIn Screen
                    ====================================================================
                    ====================================================================
                    ====================================================================
                */}
                {DoNotShowLogInScreen ?<></>:(<>
                    <View style={styles.orderListDetailsText} >
                        <TextInput style={styles.input} placeholder=" Name"  
                        placeholderTextColor = "#5800c4" 
                        />

                        <TextInput style={styles.input} placeholder="Password" 
                        placeholderTextColor = "#5800c4" 
                        />

                        <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.showHomeScreen} >
                            <Text style = {styles.btnText}> Log In  </Text>
                        </TouchableOpacity>
                        <View style={{height:30}} ></View>
                    </View>
                </>)}
                
            <View style={styles.MainBottomSpaceView}></View>
            </ScrollView>

        </View>
    );
}
}


// There is a new version of expo-cli available (5.4.12).                │
// │   You are currently using expo-cli 5.4.9                                │
// │   Install expo-cli globally using the package manager of your choice;   │
// │   for example: `npm install -g expo-cli` to get the latest version  
// npm install -g npm