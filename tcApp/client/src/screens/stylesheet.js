
import {StyleSheet} from 'react-native';
import {COLORS,FONTSIZES, OTHERS} from './Colours';

export default StyleSheet.create(
{
	BottomInvisibleView:{backgroundColor:'transparent',height:35},
	mainView: {
		flex:1,
		backgroundColor:COLORS.colourBodyColor,
		// backgroundColor:COLORS.colourNumberSix,

	},

	MainTopHeaderView:
	{
		backgroundColor:COLORS.colourNumberThree,
		height:180,
	},
	MainTopRadiusView:
	{
		backgroundColor:COLORS.colourBodyColor,
		// backgroundColor:COLORS.black,
		height:50,
		borderTopLeftRadius:80,
		borderTopRightRadius:80,
	},
	MainTopRadiusView1:{marginTop:-80,},
	MainTopRadiusView2:{marginTop:-60,},
	MainTopRadiusSpaceBottomView:
	{
		backgroundColor:COLORS.colourBodyColor,
		height:10,

	},
	MainNavigationBtnView1:
	{
		backgroundColor:COLORS.colourBodyColor,
		height:45,
	},
	MainNavigationBtnView:
	{
		backgroundColor:COLORS.colourBodyColor,
		// flexDirection:'row',
		// backgroundColor:COLORS.colourNumberOne,
		// height:50,
	},
	MainBottomSpaceView:{height:40},
	MainNavigationBtnSpaceView:{width:20,},
	MainNavigationBtn: 
	{
		// marginTop: 1,
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 43,borderRadius: 50,
		justifyContent: "center",
	},
	MainNavigationBtnAgency: 
	{
		// marginTop: 1,
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 43,borderRadius: 0,
		justifyContent: "center",
	},
	MainNavigationBtnClub: 
	{
		// marginTop: 1,
		// backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 43,borderRadius: 50,
		justifyContent: "center",
	},
	MainNavigationBtn1:{width:140,},
	MainNavigationBtn2:{width:170,},
	MainNavigationBtn3:{width:250,},
	MainNavigationBtn4:{width:"90%", margin: 15,},
	MainNavigationBtn5:{width:"25%", marginTop: 15, marginLeft:5,marginRight:18,},

	MainNavigationBtnClub1: {backgroundColor:COLORS.colourNumberOne,},
	MainNavigationBtnClub2: {backgroundColor:COLORS.semiActiveColor,},
	MainNavigationBtnClub3: {backgroundColor:COLORS.notActiveColor,},


	mainCardContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.colourNumberSix,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderTopEndRadius:15,borderTopLeftRadius:15,

	},
	mainBookingCardContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.colourNumberSix,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderRadius:15,

	},
	imageRightView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
	
		width:130,
		height:100,
		marginBottom:10, marginLeft:10,
		// backgroundColor: '#7a42f4',
	},
	productImage:
	{
		marginLeft:2,marginTop:10,marginBottom:10,
		height: 160,width: 160,  borderRadius:15,
		// backgroundColor: '#eeeeee'
	},
	textLableLeftView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
		marginLeft:0,
		alignSelf: 'center',
		width:130,height:190,
		// backgroundColor: '#eeeeee',
	},
	MainTopHeaderTextView:{marginTop:80,},
	MainTopHeaderTextView1:{marginTop:30,},
	MainTopHeaderTextLabel:
	{
		marginTop:-30,
		paddingLeft:40,
		fontSize:FONTSIZES.moduleTitleTextFontSize,
		color:COLORS.white,
	},
MainTopHeaderTextLabelClub:{paddingLeft:40,fontSize:25,color:COLORS.white, marginTop:-10,},
	textLabels:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.black,
	},
	profileEmailText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-20, marginLeft:-55,
		
	},
	btnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-20,
		justifyContent: "center",textAlign: "center",
	},
	btnText2: {
		color: COLORS.colourNumberOne,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-20,
		justifyContent: "center",textAlign: "center",
	},
	btnText3: {
		color: COLORS.colourNumberOne,
		fontSize: OTHERS.bigbtnfontsize,
		justifyContent: "center",textAlign: "center",
	},
	btnText4: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		justifyContent: "center",textAlign: "center",
	},
	
	chatInput: {
		margin: 15,
		height: 65,
		color:COLORS.colourNumberOne,
		fontSize:19,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colourNumberOne,
	
	},
	input: {
		margin: 15,
		height: 40,
		color:COLORS.colourNumberOne,
		fontSize:19,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colourNumberOne,
	
	},
	input1: {width:'60%',},
	phoneInput: {
		margin: 15,
		height: 40,
		color:COLORS.white,
		fontSize:18,
		textAlign:'left',
		borderBottomWidth:3,
		borderBottomColor:COLORS.colourNumberOne,
	
	},
bookingInput: {
	margin: 15,
	height: 40,
	width:'85%',
	color:COLORS.colourNumberOne,
	fontSize:18,
	textAlign:'center',
	borderBottomWidth:3,
	borderBottomColor:COLORS.colourNumberOne,

},
	phoneInput2: {
		margin: 15,
		height: 40,
		color:COLORS.white,
		fontSize:18,
		textAlign:'left',
		borderBottomWidth:3,
		borderTopWidth:3,
		
		borderBottomColor:COLORS.colourNumberOne,
	
	},
	phoneInput1: {width:'20%',},
	phoneInput2: {width:'50%',},
	
	orderListDetailsText:
	{
		backgroundColor:COLORS.colourNumberSix,
		
		borderRadius:15,
		width:'90%', marginLeft:20,
		marginTop:10,marginBottom :10,
	},
	nextbtnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-15,
		justifyContent: "center",textAlign: "center",
	},
	

	// Holiday Homes ====================================
	HolidayHomeHandleView:
	{
		backgroundColor:COLORS.colourNumberOne,
		height:40, width:100,marginLeft:10,
		borderTopRightRadius:25,
	},
	HolidayHomeMainCardView:
	{
		// backgroundColor:COLORS.black,
		// height:370,
		// paddingLeft:5, marginRight:5,
	},
	HolidayHomeHandleText:
	{
		color:COLORS.white,marginLeft:20,
		fontSize:20,marginTop:10,
	},
	HolidayHomeDetailsMainView:
	{
		backgroundColor:COLORS.colourNumberTwo,
		// height:300,

	},
	HolidayHomeActionView:
	{
		flexDirection:"row", marginTop:-100,
		// backgroundColor:COLORS.colourNumberTwo,

	},
	HolidayHomeVideoView:{flexDirection:"row", marginTop:-25,},
	HolidayHomeVideoBackView:{flexDirection:"row",},
	HolidayHomeVideoTopSpaceView:{backgroundColor:COLORS.colourBodyColor, height:20,},

	VideoBackBtn: 
	{
		width:200,marginLeft:30,
		// backgroundColor:COLORS.white,
		backgroundColor:COLORS.colourNumberOne,

		paddingTop: 15,
		height: 43,borderRadius: 50,
		justifyContent: "center",
	},
	ArrowMainView:
	{
		// backgroundColor:COLORS.colourNumberTwo,
		// backgroundColor:COLORS.black,
		marginTop:8,
	},

	ArrowIcon:{color:COLORS.colourNumberOne},
	ActionBtn: 
	{
		// marginTop: 1,
		backgroundColor:COLORS.white,
		paddingTop: 15,height: 43,borderRadius: 50,
		justifyContent: "center",
	},
	actionBtnText:
	{
		color: COLORS.colourNumberOne,
		fontSize: FONTSIZES.holidayHomesActionBtnTextFontSize,
		marginTop:-20,fontWeight: "bold",
		justifyContent: "center",textAlign: "center",
	},
	showListBtnText:
	{
		color: COLORS.white,
		fontSize: FONTSIZES.holidayHomesActionBtnTextFontSize,
		marginTop:-20,fontWeight: "bold",
		justifyContent: "center",textAlign: "center",
	},
	BottomSpaceView:{backgroundColor:COLORS.colourNumberTwo,height:15,},


	// MainInnerCardListView:{flexDirection:'row',},
	MainInnerCardAboutView:{flexDirection:"column"},
	MainInnerRightCardListText:{},
	// LeftUserIcons:{ width:40,height:40,},
	// InnerCardListView:{ 
	// 	justifyContent: "center",textAlign: "center",
	// 	height:50,backgroundColor:COLORS.white,
	// 	},

	// InnerCardListView1:
	// {
	// 	borderColor:COLORS.colourNumberOne,
	// 	borderWidth:3,padding:10,
	// },

	AboutTitleText:
	{
		fontSize:FONTSIZES.cardListTextFontSize, 
		color:COLORS.colourNumberOne,
		fontWeight:"bold",
		paddingLeft:15,paddingBottom:10,paddingRight:20,
	},
	// InnerCardListText:
	// {
	// 	fontSize:FONTSIZES.cardListTextFontSize, 
	// 	color:COLORS.colourNumberOne,
	// },
	AboutText:
	{
		fontSize:FONTSIZES.cardListTextFontSize, 
		color:COLORS.colourNumberOne,
		paddingLeft:30,paddingBottom:20,paddingRight:20,
	},

	// Silder 
	homeImageSlider:
	{
		height:230, width:'95%',
		marginLeft:5,marginBottom:20,
	},
	homeImageSlidingImgs:{width:'100%',},
	video: {
		alignSelf: 'center',
		width: 330,
		height: 300,
	},

// ================================================================
// ================================================================
// ================================================================

	// Home screen
// ================================================================
// ================================================================

TcNewsIconMainView:{width:'95%',},
TcNewsIcon:
{
	marginLeft:20,
	marginRight:60,
	width:300,
},
TcHomesIcon:{width:250,height:120,},
	
	// ================================================================
	// ================================================================
	// ================================================================

		// Screen screen
	// ================================================================
	// ================================================================

	introClubText:
	{
		marginLeft:-20,
		color: COLORS.colourNumberOne,
		fontSize: FONTSIZES.clubIntroTextFontSize,
		justifyContent: "center",textAlign: "center",
		paddingLeft:30,paddingBottom:20,paddingRight:20,

	},
	ApplyCardView:
	{
		backgroundColor:COLORS.colourNumberTwo,
		
		borderRadius:15,
		width:'95%', marginLeft:10,marginRight:15,
		
	},
	ApplyCardView2:
	{
		backgroundColor:COLORS.colourNumberTwo,
		width:'100%',
	},
	ApplyCardView3:
	{
		backgroundColor:COLORS.colourNumberOne,
		borderRadius:15,width:'95%', marginLeft:10,marginRight:15,
	},

	// ================================================================
	// ================================================================

		// Agency screen
	// ================================================================
	// ================================================================


	checkInCardView:
	{
		flexDirection:'row',
		// flexGrow: 1,
	},
	checkInCardLeftView:
	{
		height:30,
	},
	checkInCardLeftText:
	{
		color:COLORS.white,
		fontSize:20,
		marginLeft:25, marginTop:-5,
	},
	AgencyNameText: {
		color: COLORS.white,
		fontSize:20,
		marginTop:-20, paddingRight:20,
		justifyContent: "center",textAlign: "center",
	},
	AgencyImage:
	{
		marginLeft:1,marginTop:1,
		// ,marginRight:2, marginTop:8,marginBottom:8,
		height: 135,width: 135,  borderRadius:80,
		backgroundColor: COLORS.mainBgColour,
	},
	checkInCardRightText:
	{
		color:COLORS.white,
		fontSize:20,
		marginLeft:25, marginTop:-5,
	},
	checkOutCardText:
	{
		color:COLORS.checkOutColor,
		fontSize:20,
		marginLeft:25, marginTop:-5,
	},
	checkInLineCardVieW:
	{
		backgroundColor:COLORS.colourNumberOne,
		width:'95%',height:2,
		marginLeft:10,marginRight:20,
	},
	NoUserFound: {
		marginTop:10,
		fontSize: 20,
	},
	AgencyIcon:{width:120, height:120,},
	LogInTopHeaderView:
	{
		alignItems:'center',
		flexDirection:'row',
	},
	ArrowMainViewLogIn:{marginLeft:250},
	ArrowIconLogIn:{marginTop:-20,},

	// ================================================================
	// ================================================================

		// Profile screen
	// ================================================================
	// ================================================================

	LogInPinView:
	{
		flexDirection:'row',
	},
	// UserProfileView:
	// {
		
	// 	height:140,borderRadius:30,
	// 	marginLeft:9,marginRight:9,
	// 	flexDirection:"row"
	// },
	// UserProfileView1:{backgroundColor:COLORS.colourNumberThree,},
	// UserProfileView2:{backgroundColor:COLORS.semiActiveColor,},
	// UserProfileView3:{backgroundColor:COLORS.notActiveColor,},

	UserProfileImageView:
	{
		marginTop:10,marginLeft:10,
	},
	UserProfileNameView:
	{
		marginTop:30,marginLeft:10,
		
	},
	NameBtnText:
	{
		color:COLORS.white,
		fontSize:20,
		marginLeft:10, marginRight:10,
	},

	// DashBoardMainCardsView:
	// {
	// 	backgroundColor:COLORS.colourNumberTwo,
	// 	flexDirection:"row",
	// 	width:'100%'
	// },
	// DashBoardMainCardsView1:{ borderTopStartRadius:30,borderTopEndRadius:30},
	// DashBoardMainCardsView2:{ borderBottomStartRadius:30,borderBottomEndRadius:30},

	// DashBoardCardsView:
	// {
	// 	backgroundColor:COLORS.colourNumberThree,
	// 	borderRadius:20,
	// 	width:150,height: 165,
	// 	marginTop:8,marginLeft:8,
	// 	marginRight:8,marginBottom:8,
	// },
	// CardTextLabelInnerView1:{marginTop:40,},

// ============================= table
mainTableOuterView:
{
	marginRight:10,marginLeft:10,
},
mainTableTitleHandleView:
{
	borderRadius:0,
	backgroundColor:COLORS.colourNumberOne,
	borderBottomColor:COLORS.colourNumberTwo,
	borderBottomWidth:2,
	width:150,height: 45,
	marginLeft:10,
},

tableTitleHandleText: {
	color: COLORS.white,
	fontSize: 20,marginTop:8,
	justifyContent: "center",textAlign: "center",
},
mainTableView:
{
	flexDirection:'row',
	// backgroundColor: COLORS.colourNumberThree,
},

tableTrView:
{
	paddingBottom: 8, paddingTop:8,
	textAlign: "center",
	borderBottomColor:COLORS.colourNumberTwo,
	borderBottomWidth:2,
	height:65,
},
tableTrView2:
{
	paddingBottom: 8, paddingTop:8,
	textAlign: "center",
	borderBottomColor:COLORS.colourNumberThree,
	borderBottomWidth:2,
	height:65,
	// height:40,
},
trTdText:
{
	flexDirection: 'row',fontSize:18,
	paddingBottom:5,marginTop:8, 
	paddingLeft:10, paddingRight:10,
	color:COLORS.colourNumberThree,
},



// ================================================================
// ================================================================
	// chat screen
// ================================================================
// ================================================================
horizontalLine:
{

	borderBottomColor:COLORS.colourNumberTwo,
	borderBottomWidth:3,
},
chatRatings:
{
	// marginLeft:10,
},
ratingChatBtnView:
	{
		flexDirection: 'row', justifyContent: 'center',
		height: 30, marginTop:8, alignItems: 'center'
	},
ratingChatBtn: {
	width: 150,
	// marginTop: 10, marginBottom:10,

	backgroundColor:COLORS.colourNumberThree,
	height: 38,
	borderRadius: 50,
	
},
ratingChatBtn2: {
	width: 215,

	backgroundColor:COLORS.colourNumberThree,
	height: 38,
	borderRadius: 50,
	
},
ratingChatBtnText:
{
	color:COLORS.white,
	fontSize:OTHERS.bigbtnfontsize,
	marginLeft:30, marginTop:5,
},
ratingChatBtnText2:
{
	color:COLORS.white,
	fontSize:OTHERS.bigbtnfontsize,
	marginLeft:15, marginTop:5,
},

// ================================================================
// ================================================================
	// splash screen
// ================================================================
// ================================================================

mainViewSplah: {
	paddingTop: 23,
	flex:1,
	backgroundColor: COLORS.colourBodyColor,

},
clubHomeSScreenView:
{
	marginBottom:20,
	flexDirection:'column',
	marginLeft:'20%', marginRight:'20%',
	width:'60%',
},
clubHomeScreenImage:
{
	
	marginLeft:20,
	marginRight:20,
	width:180,height:180,
},
splashScreenView:
{
	marginTop:'50%',
	flexDirection:'column',
	justifyContent: 'center',
	alignContent:'center',
	width:'90%',
},
splashScreenImage:
{
	marginLeft:60,
	marginRight:60,
	width:240,height:240,
},

splashScreenTextView:
{
	flexDirection: 'row',
	justifyContent:'center',
	marginLeft:30,
	// marginRight:'20%'
},
splashScreenText:
{
	marginTop:30,
	fontSize:30,
	color:COLORS.colourNumberOne,
},

// Drawer items.......

drawerMainUserView:
{
	// width: 100, height: 100,
	marginBottom:10, marginTop:-10,
	backgroundColor:COLORS.colourNumberOne
},
drawerUserView:
{
	
	width: 100, height: 100,
	marginLeft:30, marginTop:10, marginBottom:20,
	
},

drawerIcon:
{
	width:120,height:120,
	marginLeft:20,

},
drawerUserName:
{
	marginLeft:30,fontSize:20,
	marginBottom:10,marginTop:15,
	color:COLORS.white, 
	fontWeight:'bold',

},



// ================================================================
// ================================================================
	// screen header
// ================================================================
// ================================================================
topNavigationHeader:
{
	flexDirection: 'row',
	backgroundColor: COLORS.colourNumberOne,
	height:65,
},
topNavigationHeaderTextView:
{
	height: 55,
},

topNavigationHeaderText:
{
	fontSize: 18, color: '#fff',
	marginLeft:5, marginTop:10,
},
openDrawerMenuView:
{
	width: 50, height: 50,
	marginLeft:-25,marginTop:5, marginBottom:10,
},
openChatBtn:
{
	width: 54, height: 54,
	// marginLeft:30,
	borderRadius:10,
	backgroundColor:COLORS.colourNumberThree,
},
mainChatView:
{
	flexDirection: 'row',
	justifyContent: 'center', 
	alignItems: 'center',
	width: 56, height: 56,
	position: 'absolute',right: 5,top: 5,
},
chatCustomerText: {
	paddingLeft:10,fontSize: 18,
	color: COLORS.colourNumberOne,
},
chatReplyText: {
	paddingLeft:10,fontSize: 18,
	color: COLORS.colourNumberFour,
},
mainMenuView:
{
	flexDirection: 'row',
	justifyContent: 'center', 
	alignItems: 'center',
	width: 54, height: 54,
	marginLeft:16,
},
openDrawerbtn:
{
	width: 54, height: 54,
	marginLeft:30,
	borderRadius:10,
	backgroundColor:COLORS.colourNumberThree,
},
opeMenuIcone:
{
	marginLeft:14,marginTop:10,
	color:COLORS.white,
},
productTopTitleNameView:
{
	flexDirection: 'row',
	justifyContent: 'center', 
	alignItems: 'center',
	marginLeft:'20%',
},
productTopTitleName:
{

	fontSize: OTHERS.fontsize20,
	color:COLORS.white,
},




ImageVideoMainCardView:
{
	marginLeft:10,marginRight:10,
	// borderBottomEndRadius:20,
	borderBottomLeftRadius:20,
	borderBottomRightRadius:20,
	borderTopRightRadius:20,
	// backgroundColor:COLORS.colourNumberTwo,
	backgroundColor:COLORS.colourNumberOne,
},
ServiceNameListMainView2:
{
	// backgroundColor:COLORS.colourNumberOne,
	backgroundColor:COLORS.white,
	paddingTop: 5,height: 40, marginLeft:20,marginRight:20,
	justifyContent: "center", marginTop:10,
	borderRadius:10, flexDirection:"row",
	// borderBottomEndRadius:2,
},
ServicesText1: 
{
	paddingLeft:5,paddingRight:5,
	color: COLORS.colourNumberOne,
	fontSize: 20,
	
	// justifyContent: "center",textAlign: "center",
},
EstateImage:
{
	width:'100%', borderRadius:20, marginTop:20, marginLeft:5, height:230,
},
ImageSliderView:
{
	height:230, width:'95%',
	marginLeft:5,marginBottom:20,
	// backgroundColor:COLORS.white,
},
ImageVideoTitleHandleView:
{
	backgroundColor:COLORS.colourNumberTwo,
	height:40, width:100,
	borderTopRightRadius:25,
},
ImageVideoHandleText:
{
	color:COLORS.white,marginLeft:20,
	fontSize:FONTSIZES.holidayHomesTitleTextFontSize,
},
ImageVideoView:
{
	// backgroundColor:COLORS.colourNumberTwo,
	// height:300,

},
VideoView:
{
	// backgroundColor:COLORS.colourNumberTwo,
	// height:300,
	marginTop:25,
	marginLeft:10,marginRight:10

},
iOSPickerSelectionInputView: {
	// itemStyle={{ margin: 15,Color:COLORS.white, borderColor:COLORS.colourNumberOne,height: 45,borderWidth: 3,width:'90%',borderRadius: 20, }}
	// margin: 5, flex: 1,
	// height: 40,
	// width:'90%',
	// textAlign:'left',
	// borderWidth: 3,
	// borderRadius: 50,
	// borderColor:COLORS.colourNumberOne,
	// backgroundColor:COLORS.colourNumberOne,
	// borderBottomWidth:3,
	// borderWidth: 3,
	// borderRadius: 50,
	// borderColor:COLORS.colourNumberOne,
},
iOSPickerSelectionInputs:
{
	// marginTop: -10,marginLeft:10,
	// height: 40,
	color:COLORS.colourNumberOne,
	// fontSize:20,width:'90%',
},
pickerSelectionInputView: {
	margin: 5, flex: 1,
	height: 40,
	width:'90%',
	textAlign:'left',
	// borderWidth: 3,
	// borderRadius: 50,
	// borderColor:COLORS.colourNumberOne,
	// borderBottomWidth:3,
	// borderWidth: 3,
	// borderRadius: 50,
	// borderColor:COLORS.colourNumberOne,
},

pickerSelectioninputs:
{
	marginTop: -10,marginLeft:10,
	height: 40,color:COLORS.colourNumberOne,
	fontSize:20,width:'90%',
},
pickerSelectionInputView1: 
{
	margin: 5, flex: 1,
	height: 40,
	width:'90%',
	textAlign:'center',
	borderWidth: 3,
	borderRadius: 50,
	borderColor:COLORS.colourNumberOne,
},
pickerSelectioninputs1:
{
	marginTop: -10, alignContent:'center',
	marginLeft:20,
	height: 40,color:COLORS.colourNumberOne,
	fontSize:20,width:'90%',
},

PhoneInput:
{
	flexDirection:'row',
},





// ================================================================
// ================================================================
	// Loan Screen
// ================================================================
// ================================================================

uploadedImageView:{ flex: 1, alignItems: 'center', justifyContent: 'center' },
LoanAppTitle:
{
	backgroundColor:COLORS.colourNumberOne,
height:50,
},

myText: 
{
	fontSize: OTHERS.bigbtnfontsize,
	justifyContent: "center",textAlign: "center",
},
myText1: {color:COLORS.white,},
myText2: {color:COLORS.colourNumberOne,},
nextBtn: {
	// color: COLORS.white,
	// fontSize: OTHERS.bigbtnfontsize,
	marginLeft:180,
	marginTop:-20,
	// justifyContent: "center",textAlign: "center",
},
backBtn: {
	marginLeft:30,
	marginTop:-20,
},

PhotoUploadBtn: 
{
	margin: 15,
	height: 40,
	color:COLORS.white,
	fontSize:18,
	width:'90%',
	textAlign:'center',
	borderWidth: 3,
	borderRadius: 50,
	borderColor:COLORS.colourNumberOne,
},
PhotoUploadBtnText: 
{
	color: COLORS.colourNumberOne,
	fontSize: 19,
	marginTop:0,
	justifyContent: "center",textAlign: "center",
},


// ================================================================
// ================================================================
	// Store Screen
// ================================================================
// ================================================================


ShoppingCardMainListView:
{

	flexDirection: 'row',
	height:180,
	// backgroundColor:COLORS.colourNumberThree,
	// marginLeft:10,marginRight:10, marginTop: 10,
	// borderTopEndRadius:15,borderTopLeftRadius:15,

},
ShoppingCardMainListView2:
{
	flexDirection: 'row',
	height:190,
},
ShoppingCardMainListView3:
{
	flexDirection: 'row',
	height:240,
},
ShoppingImageRightView:
{
	flexDirection: 'column', 
	// flexGrow: 1,
	width:130,height:100,
	marginBottom:10, marginLeft:10,
	// backgroundColor: '#7a42f4',
},

ShoppingTextLeftView:
{

	marginLeft:40,
	alignSelf: 'center',
	width:170,height:150,
	// backgroundColor: '#ff1a1a',
},
cartDeleteBtn:
{
	marginLeft:120, marginTop:30,
},
ShoppingTexts:
{
	paddingTop:10,
	fontSize:18,
	color:COLORS.black,
},
ShoppingImage:
{
	marginLeft:2,marginTop:10,marginBottom:10,
	height: 155,width: 155,
	//   borderRadius:15,
	// backgroundColor: '#eeeeee'
},


ShoppingAddToCartBtn: 
{
	width: 170,
	marginTop: 1,
	backgroundColor:COLORS.colourNumberThree,
	paddingTop: 15,
	height: 40,
	borderRadius: 10,
	justifyContent: "center",
	marginLeft:5,
},
cartAddSubtractionBtnView:
{
	flexDirection: 'row',
	// backgroundColor: "#8A2BE2",
	// marginLeft:'50%',
	// width:200,


	width: 170,
	// marginTop: 1,
	// color:COLORS.white,

	backgroundColor:COLORS.colourNumberThree,
	paddingTop: 8,
	height: 40,
	borderRadius: 10,
	// justifyContent: "center",
	// marginLeft:5,
},
cartQuantityText:
{
	
	color:COLORS.white,
	fontSize: 20,
	// marginTop:10,
	marginRight:5,
	marginLeft:5,
},
addSubtractIcons:{color: COLORS.white,},
deleteIcons:{ marginTop:-3,color: COLORS.white,},

cartSubtractionBtn:
{
	// borderColor: '#cccccc',
	marginRight:10,
	marginLeft:10,
	// marginTop:0,
},
cartAddBtn:
{
	// borderColor: COLORS.origincolour,
	// marginTop:9,
	marginRight:10,
	marginLeft:10,
},
cartCheckOutBottomView:
{
	borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5,
	backgroundColor:COLORS.colourNumberOne,
	position: 'absolute',
	bottom:0, width:'100%',
},
cartTotalText:
{
	fontSize:18,marginTop:10,
	color:COLORS.white,
},
cartCheckoutBtnView:
{
	flexDirection: 'row', justifyContent: 'flex-end', marginTop:-5,
	height: 32, paddingRight: 10, alignItems: 'center'
},
cartCheckoutBtn:
{
	backgroundColor:COLORS.colourNumberTwo, 
	width: 170,  height: 40,
	marginBottom:20, 
	borderRadius: 25,
},
cartCheckoutText:
{
	color:COLORS.white,
	fontSize:OTHERS.bigbtnfontsize,
	marginLeft:35, marginTop:5,
},
ScreenTitleText:
{
	color:COLORS.colourNumberOne,
	fontSize:OTHERS.bigbtnfontsize,
	marginLeft:35, marginTop:5,marginBottom:5,
},
ScreenTitleText1:{fontWeight: "bold",},
CartTypeText:
{
	color:COLORS.white,
	fontSize:OTHERS.bigbtnfontsize,
	marginLeft:30, marginTop:-5,marginBottom:5,
},



// ================================================================
// ================================================================
	// Check box Screen
// ================================================================
// ================================================================


checkBoxParagraph: 
{
	fontSize: 15,
	marginLeft:10,
	color:COLORS.colourNumberThree,
},


checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.colourNumberOne,
    backgroundColor: 'transparent',
},
checkboxChecked: {backgroundColor: COLORS.colourNumberOne,},

appContainer: 
{
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
},
appTitle: 
{
	marginVertical: 16,
	// fontWeight: 'bold',
	fontSize: 24,
},
checkboxContainer: {
// margin:8,
marginLeft:28,marginRight:8,
marginBottom:8,marginTop:8,
flexDirection: 'row',
alignItems: 'center',
},
checkboxLabel: {
marginLeft: 8,
// fontWeight: 500,
fontSize: 18,
},

// ================================================================
// ================================================================
	// Date Date
// ================================================================
// ================================================================

datePickerSelectionInputView: 
{
	height: 40,
	borderColor:COLORS.MainColorOne,
	borderWidth: 3,borderRadius: 50,
},
// pickerSelectionInputs:
// {
// 	marginTop: -10,marginLeft:10,
// 	height: 40,color:COLORS.MainColorOne,
// 	fontSize:20,
// 	width:'90%',
// },

datePickerSelectionInputView1: {width:110},
DateMainView:{flexDirection:'row',},
SelectDateView:{ marginLeft:20, width:160,},

});
