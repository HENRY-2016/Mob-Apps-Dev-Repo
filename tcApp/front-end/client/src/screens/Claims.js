
import React from 'react';
import { Text, View, Alert,TextInput,TouchableOpacity, ScrollView, Image} from 'react-native';
import styles from "./stylesheet";
import {Picker} from '@react-native-picker/picker';
import { AntDesign,FontAwesome} from '@expo/vector-icons';

import axios from "axios";
import { COLORS } from './Colours';
import { APIListAllCountries} from './DataFileApis';

// import { formatNumberWithComma } from './Functions';

export default class Claims extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Countries:[],
            ClubClaims:[{claimName:'Hospital',claimCode:'570'},{claimName:'Accident',claimCode:'666'},{claimName:'Dental',claimCode:'402'}],
    
            // Screens
            DoNotTreatmentsDetailsScreen:false,
            DoNotTreatmentsApplyScreen:true,
            // customer

            CountrySelectedValue:'',
            PhoneCountryCode:'',
            CountrySelected:'',
        }
        
    }
    
componentDidMount() {
    axios.get(APIListAllCountries)
    .then(res => {
        let results =JSON.stringify(res.data); 
        this.setState({Countries:[...JSON.parse(results)]})
        // this.setState({ClubMemberName:})
        })
    .catch(err=>{Alert.alert("Error","\n\nCan Not Load App Data"+"\n\n"+"Connect To Internet And Open App Again");})
    
}
    
TreatmentsDetailsScreen = () =>
{
    this.setState({DoNotShowEmployeeScreen:true})
    this.setState({DoNotTreatmentsApplyScreen:true})
    this.setState({DoNotShowEmployerScreen:true})
    this.setState({DoNotTreatmentsDetailsScreen:false})
}
TreatmentsApplyScreen = () =>
{
    this.setState({DoNotShowEmployeeScreen:true})
    this.setState({DoNotTreatmentsDetailsScreen:true})
    this.setState({DoNotShowEmployerScreen:true})
    this.setState({DoNotTreatmentsApplyScreen:false})
}

setCountrySelectedValue  = (text) =>
{
    const CountriesArr = [...this.state.Countries]
    let Index = text.split(':');
    let country = Index[0]
    let arraryIndex = Index[1]
    let code = CountriesArr[arraryIndex]
    let phoneCode = code.countryCode
    // countryCode
    this.setState({PhoneCountryCode:phoneCode});
    this.setState({CountrySelected:country});
}


    
    render() {
        
        const {Countries,CountrySelectedValue,CountrySelected,PhoneCountryCode,ClubClaims} = this.state;
        const {DoNotTreatmentsDetailsScreen,DoNotTreatmentsApplyScreen,DoNotShowEmployeeScreen,DoNotShowEmployerScreen } = this.state;
    
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

                    <View style = { styles.productTopTitleNameView}>
                        <Text style = { styles.productTopTitleName}> Claims </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.MainTopHeaderView} >
                        <View style={styles.MainTopHeaderTextView}>
                            <Text style={styles.MainTopHeaderTextLabel}> Claims </Text>
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
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.TreatmentsDetailsScreen} >
                                <Text style = {styles.btnText}> Claims  </Text>
                            </TouchableOpacity>

                            <View style={styles.MainNavigationBtnSpaceView} ></View>
                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn1]} onPress={this.TreatmentsApplyScreen} >
                                <Text style = {styles.btnText}> Apply </Text>
                            </TouchableOpacity>

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
                    {DoNotTreatmentsDetailsScreen ?<></>:(<>
                        {/* <View style={styles.ApplyCardView} >
                            <Text style={styles.AboutText} >Will Show List</Text> 
                            <Text style={styles.AboutText} >Code : Name Format</Text> 
                        </View> */}
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
                    { DoNotTreatmentsApplyScreen ? <></>:(<>
                        <View style={{height:10}}></View>
                    <Text style={styles.AboutTitleText} >Coming Soon</Text>

                            {/* <View style={styles.ApplyCardView} >
                            <View style={{height:30}}></View>
                            <Text style = {styles.btnText}> Your Details </Text>

                            <View style={styles.pickerSelectionInputView}>
                                <Picker style={styles.pickerSelectioninputs} dropdownIconColor= {COLORS.white}
                                    selectedValue={CountrySelectedValue}
                                    onValueChange={(itemValue) =>this.setCountrySelectedValue(itemValue)}>
                                        <Picker.Item label="Select Country"/> 
                                        {Countries && Countries.map((iteam,Index ) => (
                                        <Picker.Item label={iteam.countryName} value={iteam.countryName+':'+Index} /> 
                                        ))}
                                </Picker>
                            </View>
                    
                            <TextInput style={styles.input} placeholder="Country" editable = {false}  defaultValue={CountrySelected}
                            placeholderTextColor = "#5800c4" 
                            />

                            {CountrySelected == "USA" || CountrySelected =="UK" ?(<>
                            <View style={styles.PhoneInput} >
                                <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" onChangeText={text => this.setMemberPhone(text)}
                                placeholderTextColor = "#5800c4" 
                                />
                                <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Mobile Phone 11 digits" onChangeText={text => this.setMemberNominatePhone1(text)}
                                placeholderTextColor = "#5800c4" 
                                maxLength={11} keyboardType="numeric" 
                                />
                            </View></>):(<>

                                <View style={styles.PhoneInput} >
                                    <TextInput style={[styles.phoneInput,styles.phoneInput1]}  editable = {false}  defaultValue={PhoneCountryCode} placeholder="Code" onChangeText={text => this.setMemberPhone(text)}
                                    placeholderTextColor = "#5800c4" 
                                    />
                                    <TextInput style={[styles.phoneInput,styles.phoneInput2]} placeholder="Mobile Phone 9 digits" onChangeText={text => this.setMemberNominatePhone1(text)}
                                    placeholderTextColor = "#5800c4" 
                                    maxLength={9} keyboardType="numeric" 
                                    />
                                </View>
                                <View style={{height:10}}></View>
                                </>)}

                            

                            <TextInput style={styles.input} placeholder="Full Name" onChangeText={text => this.setMemberNominateName1(text)}  
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Tc Number" onChangeText={text => this.setMemberNominateDOB1(text)}
                            placeholderTextColor = "#5800c4" 
                            />

                            <TextInput style={styles.input} placeholder="Treatment Code" onChangeText={text => this.setMemberNominateEmail1(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            <TextInput style={styles.input} placeholder="Treatment Date" onChangeText={text => this.setMemberNominateEmail1(text)}
                            placeholderTextColor = "#5800c4" 
                            />
                            </View>

                            

                            <TouchableOpacity style={[styles.MainNavigationBtn, styles.MainNavigationBtn4]} onPress={this.postMembershipApplication} >
                                <Text style = {styles.btnText}> Send  </Text>
                            </TouchableOpacity>  */}
                            <View style={{height:10}} ></View>
                    </>)}
                    
                    {/* 
                        ====================================================================
                        ====================================================================
                        ====================================================================
                                    Begin Employee Screen
                        ====================================================================
                        ====================================================================
                        ====================================================================
                    */}

                    
                <View style={styles.MainBottomSpaceView}></View>
                </ScrollView>
    
            </View>
        );
    }
}
