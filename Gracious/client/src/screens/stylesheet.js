
import {StyleSheet} from 'react-native';
import {COLORS} from './Colors';

export default StyleSheet.create(
{
mainView: {
flex:1,
backgroundColor:COLORS.MainBodyBgColor,
// backgroundColor:COLORS.OrangeBackGroundColor,
position:'absolute',top:0,
height:'100%',width:'100%'
},

CircleImageView:
{
	marginLeft:10,marginRight:15,
	borderRadius:50,
},

CircleImage:
{
	height: 95,width: 95,
	borderRadius:80,
	borderColor:COLORS.redColor,
    borderWidth: 5,
	
	// backgroundColor: '#eeeeee'
},
SafarisListingContainer:
{
	backgroundColor:COLORS.SafarisBigCardColor,
	borderRadius:10,
},
CircleImageText:
{
	fontSize: 18,
	color:COLORS.MainColorOne,
	marginLeft:20,
},
MainBodyCardView:
{
	backgroundColor:COLORS.MainCardColor,width:'100%',
	borderTopLeftRadius:20,borderTopRightRadius:20,
},
MainBodyCardViewSpace:
{
	backgroundColor:COLORS.MainCardColor,width:'100%',height:20,
	borderBottomLeftRadius:20,borderBottomRightRadius:20,
},
MainDescriptionView:
{
	backgroundColor:COLORS.MainCardColor,
	marginLeft:10,marginRight:10,
	width:'95%',
	borderRadius: 10,
},
MainDescriptionView2:
{
	marginLeft:10,marginRight:10,
	width:'95%',borderRadius: 10,
},
MainDescriptionFullScreenView:
{
	backgroundColor:COLORS.MainCardColor,
	width:'100%',borderRadius: 30,
},
MainDescriptionFullScreenText:
{
	paddingTop:6, paddingBottom:10,
	paddingRight:10,paddingLeft:15,
	fontSize: 18,color:COLORS.HoverColor,
},
HeadingOneText:
{
	padding:6,
	fontSize: 18,
	fontWeight:'bold',
	color:COLORS.HoverColor,
	marginLeft:20,
},
HeadingOneText2:
{
	padding:6,
	fontSize: 18,
	fontWeight:'bold',
	color:COLORS.HoverColor,
	marginLeft:30,
},

btnText: {
	color: COLORS.TabsTextActiveColor,
	fontSize: 19, fontWeight:'bold',
	marginTop:-20,
	justifyContent: "center",textAlign: "center",
},
MainLinksBtn:
{
	//marginLeft:10, marginRight:10, 
	backgroundColor:COLORS.OrangeBackGroundColor,
	paddingBottom:10,
},
SubLinksLinksView:{
	//marginLeft:10, marginRight:10,
	backgroundColor:COLORS.OrangeBackGroundColor,
	paddingBottom:10,
},
TextInputs: {
	height: 45,color:COLORS.white,
	fontSize:19, width:'80%',
	textAlign:'center',
	borderWidth: 3, borderRadius: 15,
	borderColor:COLORS.MainColorOne,

},
InquireTextInputs: {
	height: 70,color:COLORS.white,
	fontSize:19, width:'80%',
	textAlign:'center',
	borderWidth: 3, borderRadius: 15,
	borderColor:COLORS.MainColorOne,

},

DateTextInputs: {
	// marginLeft: margin: 18,
	height: 45,
	// color:COLORS.TabsTextActiveColor,
	color:COLORS.white,
	fontSize:19,
	width:160,
	textAlign:'center',
	// backgroundColor:COLORS.MainColorOne,
	borderWidth: 3,
	borderRadius: 15,
	// borderColor:COLORS.HoverColor,
	borderColor:COLORS.MainColorOne,

},
PackageText:
{
	// paddingTop:6, 
	marginTop:-5,
	fontSize: 18, fontWeight:'bold',
	color:COLORS.white,
	// marginLeft:40,
},
SubmitButtons:
{
	marginLeft: 15,
	backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,borderRadius: 10,
	height: 43,width:'90%',
	// justifyContent: "center"
	// marginRight:5, 
},
SubmitButtonsText:
{
	// paddingTop:6, 
	marginTop:-5,
	fontSize: 18, fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	// marginLeft:40,
},
AccountSettingsButtons:
{
	// marginLeft: 15,
	backgroundColor:COLORS.MainColorOne,
	// paddingTop: 15,borderRadius: 10,
	// height: 43,
	width:200,
	
	height: 43,color:COLORS.white,
	fontSize:19,
	// textAlign:'center',
	// borderWidth: 3, 
	borderRadius: 10,
	// borderColor:COLORS.MainColorOne,
},
UpdateButtonsText:
{
	// paddingTop:6, 
	marginTop:8,
	fontSize: 18, fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	marginLeft:40,
},
SettingsButtonsText:
{
	// paddingTop:6, 
	marginTop:-30,
	fontSize: 18, fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	marginLeft:100,
},
LogOutButtonsText:
{
	// paddingTop:6, 
	marginTop:-10,marginLeft:50,
	fontSize: 18, fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	width:100,
},
ChatIcon:{width:50, height:50, marginTop:4,},
AccountIcons:{width:120, height:120,},
TravelIcons:{width:120, height:120,},
SettingsIcon:{width:38, height:38, marginLeft:50, marginTop:-11,},

InlineImage:
{
	width:'95%',height:210, marginLeft:10, 
	borderColor:COLORS.TabsTextActiveColor, 
	borderRadius:20, borderWidth: 5,resizeMode:'cover'
},
InlineVideo:
{
	width:'95%',height:230, marginLeft:10, 
	borderColor:COLORS.TabsTextActiveColor, 
	borderRadius:20, borderWidth: 5
},
MainBtn:
{
	
	borderColor:COLORS.MainColorOne,
	backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,
	height: 43,
	borderRadius: 50,
	justifyContent: "center",
	marginRight:5,
},
MainBtn1:{marginTop: 40,width: 105,},
MainBtn2:{marginTop: 10,width: 150,},
MainBtn3:
{
	marginLeft: 10,backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,borderRadius: 10,height: 43,width: '98%',
	justifyContent: "center",marginRight:5, 
},
DateMainView:{flexDirection:'row',},
PhoneCodeMainView:{marginLeft:20, width:100},
PhoneLengthMainView:{width:220},
SelectDateView:{ marginLeft:20, width:160,},
SelectDateText:{marginTop:10,fontSize: 18, fontWeight:'bold',color:COLORS.MainColorOne,},

countryPickerSelectionInputView: {
	textAlign:'left',height: 40,color:COLORS.white,
	fontSize:19,width:'80%',
	borderWidth: 3,borderRadius: 15,
	borderColor:COLORS.MainColorOne,
},
datePickerSelectionInputView: 
{
	height: 40,
	borderColor:COLORS.MainColorOne,
	borderWidth: 3,borderRadius: 50,
},
datePickerSelectionInputView1: {width:110},
datePickerSelectionInputView2: {width:165},
datePickerSelectionInputView3: {width:118},
pickerSelectionInputs:
{
	marginTop: -10,marginLeft:10,
	height: 40,color:COLORS.MainColorOne,
	fontSize:20,
	width:'90%',
},

bookingPickerSelectionInputView: 
{
	margin: 5, flex: 1,height: 45,textAlign:'left',
	borderWidth: 3,borderRadius: 10,
	borderColor:COLORS.MainColorOne,
},
bookingPickerSelectionInputView1: {width:'80%'},

ActionBtnMainView:
{
	marginLeft:15,borderRadius:20,
	height:60,width:'90%',
	flexDirection:'row',alignItems:'center',
	backgroundColor:COLORS.ActionBtnCard
},
HomeNotificationMainView:
{
	backgroundColor:COLORS.OrangeBackGroundColor,
	paddingBottom:8,
},
HomeNotificationView:
{
	// marginTop: 20,
	flexDirection:'row',
	backgroundColor:COLORS.MainCardColor,
	marginLeft:8,marginRight:10,
	width:'96%',height:73,
	borderColor:COLORS.MainColorOne,
	//TabsTextActiveColor,
	borderWidth:4,
	borderTopLeftRadius:50,borderTopRightRadius:30,
	borderBottomRightRadius:30
},


NotificationTitleView:
{
	// marginLeft:-10,
},
NotificationTitleText:
{
	marginTop:15, fontSize: 18,
	fontWeight:'bold',
	color:COLORS.HoverColor,
	marginLeft:15,
},
NotificationOldView:
{
	backgroundColor:COLORS.MainColorOne,
	width:60, height:60,
	marginLeft:50,
	borderRadius:40,
	borderWidth:5, borderColor:COLORS.MainCardColor,
	
},
NotificationText:
{
	paddingTop:6, 
	fontSize: 15,
	fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	marginLeft:15,
},
NotificationNumberText:
{
	fontSize: 16,
	fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	marginLeft:20,marginTop:-5,
},
ChatNumberText:
{
	fontSize: 20,fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	marginLeft:15, marginTop:-45,
},
HomeDescriptionView:
{
	// backgroundColor:COLORS.MainColorOne,
	backgroundColor:COLORS.MainCardColor,
	marginLeft:10,marginRight:10,
	width:'50%',
	borderRadius: 10,
},
homeScreenImagesView:
{
	marginLeft:10,marginRight:10,
	borderWidth:5,borderRadius:50,
	borderColor:COLORS.MainColorOne,
	
},
homeScreenImages:
{
	borderRadius:50,borderWidth:5,
	borderColor:COLORS.MainCardColor,
	width:'100%',height:180,
},

MainListingView:
{
	flexDirection:'row',
},

ListingLeftView:
{
	marginLeft:20, height:66,width:66,
	borderRadius:50,borderWidth:5,
	borderColor:COLORS.MainColorOne,
},
ListingRightView:
{

	backgroundColor:COLORS.MainColorOne,
	borderBottomRightRadius:10,
	borderTopRightRadius:10,
},

// ====================== Home Screen ============
HorizontalRow:{flexDirection:'row',},
HorizontalCircle:
{
	backgroundColor:COLORS.MainColorOne,

	marginTop:-1,marginRight:0,
	borderRadius:10,
	width:50, height:55,
},
WelcomeTitleText:
{
	padding:6, fontWeight:'bold',
	fontSize: 18,color:COLORS.HoverColor,
	marginLeft:10, 
},
HorizontalTitleText:
{
	paddingTop:6, paddingBottom:7, fontWeight:'bold',
	fontSize: 18,color:COLORS.HoverColor,
	marginLeft:65, marginTop:-60,
},
BellIcon:{width:30, height:30, marginTop:10,marginLeft:10},
EyeIcon:{width:30, height:30, marginTop:5,marginLeft:10},
HorizontalMiddleView:
{
	marginLeft:10,
	marginTop:10,width:'95%', height:55,
	backgroundColor:COLORS.MainCardColor,
	borderRadius:10,
},

HorizontalViewBtn:
{
	marginTop:9,marginLeft:-50,
	borderRadius:10,
	width:50, height:55,
	backgroundColor:COLORS.MainColorOne,
},
HorizontalText:
{
	fontSize: 16,color:COLORS.TabsTextActiveColor,
	marginLeft:5, marginTop:-8, fontWeight:'bold',
},
// ====================== About Screen ============
AboutMainCardView:
{
	backgroundColor:COLORS.MainCardColor,
	marginLeft:10,marginRight:10,
	width:'95%',borderRadius: 10,
},
AboutMainCardView1:{height:220},
AboutScreenLogoImage:
{
	marginLeft:14,marginRight:10,
	marginBottom:10,marginTop:10,
	width:310,height:200,
	borderRadius:10,
},
AboutListingText:
{
	padding:6,
	fontSize: 18,color:COLORS.HoverColor,
	marginLeft:40,
},

LogIcon:
{
	height:180,width:180,
	borderRadius:10,borderWidth:5,
	borderColor:COLORS.MainColorOne
},
ContactsIcon:{height:50,width:50,marginLeft:8,marginTop:8,},
SocialMediaIcon:{height:50,width:50,marginLeft:30,marginTop:10,},
ContactsText:
{
	paddingTop:6, paddingBottom:7,
	fontSize: 18,
	fontWeight:'bold',
	color:COLORS.HoverColor,
	marginLeft:15,
},
MainContactUsView:
{
	backgroundColor:COLORS.MainCardColor,
	marginLeft:10,marginRight:10,
	width:'95%',
	borderRadius: 10,
},
MainContactUsRowView:{flexDirection:'row'},
// ====================== Splash Screen ============

mainViewSplash: {
	flex:1,borderWidth:8,
	backgroundColor:COLORS.SplashScreenBgColor,
	borderColor:COLORS.OrangeBackGroundColor,
},
mainInnerViewSplash:
{
	flex:1,borderWidth:2,
	backgroundColor:COLORS.SplashScreenBgColor,
	borderColor:COLORS.TabsTextActiveColor,
},
mainInner2ViewSplash:
{
	flex:1,borderWidth:8,
	backgroundColor:COLORS.SplashScreenBgColor,
	borderColor:COLORS.MainColorOne,
},
splashScreenView:{marginTop:0,flexDirection:'column',},

SplashHeadingOneText:
{
	paddingTop:6, paddingBottom:7,
	fontSize: 30,
	fontWeight:'bold',
	color:COLORS.OrangeColor,
	marginLeft:20,
},

splashScreenLogoIcon:
{
	marginLeft:'10%',marginRight:'10%',
	marginBottom:'6%',marginTop:'6%',
	width:200,height:200,
},

splashScreenTextView:
{
	flexDirection: 'row',
	justifyContent:'center',
	marginLeft:30,
},
splashScreenTitleText:
{
	marginTop:30,
	fontSize:35,
},
splashScreenTitleText1:{color:COLORS.MainColorOne,},
splashScreenTitleText2:{color:COLORS.MainColorOne,},
splashScreenText:
{
	marginTop:5,fontSize:30,
	color:COLORS.MainColorOne,
},
activityIndicatorView: 
{
flex: 1,marginTop:20,
justifyContent: 'center',
},
activityIndicatorContainer: 
{
	flexDirection: 'column',
	justifyContent: 'space-around',
	marginLeft:20, 
},

//  table
TravelLeftFloatView:
{ 
	marginTop:15,
	borderTopRightRadius:20,borderBottomRightRadius:20,
	backgroundColor:COLORS.MainColorOne, 
},
TravelLeftFloatView1:{width:200,},
TravelLeftFloatView2:{width:210,},
TravelLeftFloatText:
{
	paddingTop:6, paddingBottom:7,
	fontSize: 18,fontWeight:'bold',
	color:COLORS.TabsTextActiveColor,
	marginLeft:20,
},
mainTableView:{flexDirection:'row',},
tableTrView:
{
	paddingBottom: 8, paddingTop:8,
	textAlign: "center",
	borderBottomColor:COLORS.MainColorOne,
	borderBottomWidth:2,height:65,
},

trTdText:
{
	flexDirection: 'row',fontSize:18,
	paddingBottom:5,marginTop:8, 
	paddingLeft:10, paddingRight:10,
	color:COLORS.HoverColor,
},
detailsBtnView:
{
	flexDirection: 'row', justifyContent: 'center',
	height: 30, marginTop:8, alignItems: 'center'
},
detailsBtn: {width: 120,height: 38,borderRadius: 50,backgroundColor:COLORS.MainColorOne,},
detailsBtnText:{color:COLORS.TabsTextActiveColor, fontWeight:'bold',fontSize:18,marginLeft:30, marginTop:5,},
	
});
