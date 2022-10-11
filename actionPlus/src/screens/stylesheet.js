
import {StyleSheet} from 'react-native';
import {COLORS,FONTSIZES, OTHERS} from './Colours';

export default StyleSheet.create(
{
	ItemInvisible:{backgroundColor:'transparent'},

	mainView: {
		flex:1,
		backgroundColor:COLORS.colorBodyColor,
		// backgroundColor:COLORS.colorNumberSix,

	},

	MainBodyView:{ marginTop:10, marginLeft:5,marginRight:5},
	MainTopRadiusView:
	{
		backgroundColor:COLORS.colorBodyColor,
		// backgroundColor:COLORS.black,
		height:50,
		borderTopLeftRadius:80,
		borderTopRightRadius:80,
	},
	MainTopRadiusView1:{marginTop:-80,},
	MainTopRadiusView2:{marginTop:-60,},


// ========================================================

	MainNavigationBtnSpaceView:{width:15,},
	MainNavigationBtnView:
	{
		backgroundColor:COLORS.colorBodyColor,
	},
	MainNavigationBtn: 
	{
		backgroundColor:COLORS.colorNumberOne,
		// backgroundColor:COLORS.orangeColor,
		// color:COLORS.white,
		paddingTop: 15,height: 43,
		borderRadius: 10,
		justifyContent: "center",
	},
	MainNavigationBtn1:{width:140,},
	MainNavigationBtn2:{width:170,},
	MainNavigationBtn3:{width:250,},
	MainNavigationBtn4:{width:"90%", margin: 15,},
	MainNavigationBtn5:{width:"25%", marginTop: 15, marginLeft:5,marginRight:18,},

	TextLabels:
	{
		fontSize:18, 
		paddingLeft:15,paddingBottom:10,paddingTop:10,paddingRight:20,
	},

	TextLabels1:{color:COLORS.orangeColor,},
	TextLabels2:{color:COLORS.darkBlack},
	TextLabels3:{color:COLORS.orangeColor},
	TextLabels4:{color:COLORS.black,},

	btnText: {
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-20,
		justifyContent: "center",textAlign: "center",
	},
	btnText1: {color: COLORS.darkBlack,},
	
	

	input: {
		margin: 15,
		height: 40,
		color:COLORS.darkBlack,
		fontSize:19,
		width:'90%',
		textAlign:'left',
		borderBottomColor:COLORS.orangeColor,
		borderBottomWidth:3,
	
	},
	// input1: {width:'60%',},
	phoneInput: {
		// margin: 15,
		
		height: 40,
		color:COLORS.darkBlack,
		fontSize:18,
		textAlign:'left',
		borderBottomWidth:3,
		borderBottomColor:COLORS.orangeColor,
	
	},
	phoneInput1: {marginLeft:10,width:'20%',},
	phoneInput2: {width:'70%',},
	orderListDetailsText:
	{
		backgroundColor:COLORS.colorNumberSix,
		
		borderRadius:15,
		width:'90%', marginLeft:20,
		marginTop:10,marginBottom :10,
	},
	nextbtnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-8,
		justifyContent: "center",textAlign: "center",
	},
	

// ================================================================
// ================================================================
	// Events Screen
// ================================================================
// ================================================================

MainHorizontalCardView:
{
	flexDirection:'row',
	marginLeft:10,marginRight:10,
	backgroundColor:COLORS.white,
},
LeftHorizontalCardView:
{
	width:30,
	backgroundColor:COLORS.white,
},
SeparatorHorizontalCardView:
{
	width:8,
	marginTop:10,marginBottom:10,
	backgroundColor:COLORS.homeBtnColor,
},
RightHorizontalCardView:
{
	width:'89%',
	backgroundColor:COLORS.white,
},
HorizontalCardBtn:
{
	width:93,height:40,
	marginLeft:205,marginTop:-39,
	borderBottomLeftRadius:20,
	borderTopLeftRadius:20,
	backgroundColor:COLORS.homeBtnColor,
},
HorizontalCardBtn2:
{
	width:130,height:40,
	marginLeft:10,marginTop:9,
	borderBottomRightRadius:20,
	borderTopRightRadius:20,
	backgroundColor:COLORS.homeBtnColor,
},

HorizontalCardBtnText:
	{
		fontSize:FONTSIZES.TextFontSize19, 
		color:COLORS.red,marginTop:-5,
		paddingLeft:15,paddingBottom:10,paddingTop:10,paddingRight:20,
	},
// ================================================================
// ================================================================
	// Our Team Screen
// ================================================================
// ================================================================

DetailsHeaderCard:
{
	flexDirection:'row',
	// backgroundColor:COLORS.red,

},
NameTitleDescriptionView:
{
	// backgroundColor:COLORS.white,
	width:192,height:70,


},
ImageCardView:
{
	marginLeft:10,
	backgroundColor:COLORS.simCircleColor,
	borderTopRightRadius:10,borderTopLeftRadius:10,
},
ImageCardView1:{width:138,height:70,borderBottomRightRadius:60,borderBottomLeftRadius:60,},
ImageCardView2:{width:315,height:195,borderBottomRightRadius:20,borderBottomLeftRadius:20,},

ImageImage:
{
	marginLeft:9,marginBottom:5,
	width:120,height:120,marginTop:-55,
	borderRadius:60,
},
ImageImage2:
{
	marginLeft:9,marginBottom:5,
	width:300,height:250,marginTop:-60,
	borderRadius:20,
},

DetailsCard:
{
	marginLeft:5,marginRight:5,
	borderRadius:20,
	// borderBottomRightRadius:20,
	// borderBottomLeftRadius:20,
	
	backgroundColor:COLORS.white
},
SliderCaptionCard:
{
	marginLeft:10,marginRight:10, marginBottom:10,
	borderRadius:20,
	backgroundColor:COLORS.white,
	borderColor:COLORS.orangeColor,borderWidth: 4
},
// ================================================================
// ================================================================
	// Partners  screen
// ================================================================
// ================================================================

GridCard:
	{
		backgroundColor: COLORS.colorCard2Color,
		borderRadius:10,
		height: 200, width:'85%',
		marginLeft:30,
		// marginRight:10,marginTop:8,marginBottom:10, 
	},

GridImage:
	{
		marginLeft:10,marginTop:10,marginRight:10,marginBottom:10,
		height: 180,width: 260,  
		borderRadius:15,
		backgroundColor: COLORS.mainBgColour,
	},
HeadingsView:
{
	borderRadius:25,
	marginLeft:10,marginRight:10,
	backgroundColor:COLORS.white,	
},

// ================================================================
// ================================================================
	// splash screen
// ================================================================
// ================================================================
mainViewSplah: {
	paddingTop: 23,
	flex:1,
	backgroundColor: COLORS.colorBodyColor,

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
	color:COLORS.colorNumberOne,
},


// Drawer items.......

drawerMainUserView:
{
	// width: 100, height: 100,
	marginBottom:10, marginTop:-10,
	backgroundColor:COLORS.colorNumberOne
},
drawerUserView:
{
	
	width: 100, height: 100,
	marginLeft:30, marginTop:10, marginBottom:20,
	
},

drawerIcon:
{
	color:COLORS.white,
	width:120,height:120,
	marginLeft:20,

},

DrawerMenuText:
	{
		fontSize:23, 
		color:COLORS.white,
		marginLeft:10,
	},
drawerUserName:
{
	marginLeft:30,fontSize:20,
	marginBottom:10,marginTop:15,
	color:COLORS.black, 

},



// ================================================================
// ================================================================
	// screen header
// ================================================================
// ================================================================
topNavigationHeader:
{
	flexDirection: 'row',
	backgroundColor: COLORS.colorNumberOne,
	height:65,
},
topNavigationHeaderTextView:
{
	height: 55,
},

mainMenuView:
{
	flexDirection: 'row',
	justifyContent: 'center', 
	alignItems: 'center',
	width: 54, height: 54,
	marginLeft:16,
},
topNavigationHeaderText:
{
	fontSize: 18, color: '#fff',
	marginLeft:5, marginTop:10,
},
openDrawerMenuView:
{
	width: 60, height: 60,
	marginLeft:-25,marginTop:5, marginBottom:10,
	
},

openDrawerbtn:
{
	width: 80, height: 80,
	marginLeft:30,marginTop:10,
	borderRadius:10,
},
mainChatView:
{
	flexDirection: 'row',
	justifyContent: 'center', 
	alignItems: 'center',
	width: 56, height: 56,
	position: 'absolute',right: 5,top: 5,
},
mainCartNumberTxt:
{
	marginTop:15, fontSize:20,color:COLORS.white,
},
opeMenuIcone:
{
	marginLeft:14,marginTop:10,
	color:COLORS.white,
},

openChatBtn:
{
	width: 54, height: 54,
	// marginLeft:30,
	borderRadius:10,
	backgroundColor:COLORS.colorNumberThree,
},
NotificationIcon:
{
	marginLeft:14,marginTop:-30,
	color:COLORS.white,
},
pickerSelectionInputView: {
	margin: 5, flex: 1,
	height: 40,
	width:'90%',
	textAlign:'left',
	// borderWidth: 3,
	// borderRadius: 50,
	// borderColor:COLORS.colorNumberOne,
	// borderBottomWidth:3,
	// borderWidth: 3,
	// borderRadius: 50,
	// borderColor:COLORS.colorNumberOne,
},
pickerSelectioninputs:
{
	marginTop: -10,marginLeft:10,
	height: 40,color:COLORS.black,
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
	borderColor:COLORS.colorNumberOne,
},
pickerSelectioninputs1:
{
	marginTop: -10, alignContent:'center',
	marginLeft:20,
	height: 40,color:COLORS.black,
	fontSize:20,width:'90%',
},

PhoneInput:
{
	flexDirection:'row',
},


MainBtnView:{flexDirection:'row'},
LogInBtnText: {
	color: COLORS.white,
	fontSize: OTHERS.bigbtnfontsize,
	marginTop:-18, 
	justifyContent: "center",textAlign: "center",
},





// ============================= table
mainTableOuterView:
{
	marginRight:10,marginLeft:10,
},
mainTableTitleHandleView:
{
	backgroundColor:COLORS.colourNumberThree,
	borderRadius:0,
	borderBottomColor:COLORS.colourNumberTwo,
	borderBottomWidth:2,
	width:150,height: 45,
	marginLeft:10,
},

mainTableTitleHandleView2:
{
	backgroundColor:COLORS.colourNumberThree,
	borderRadius:0,
	borderBottomColor:COLORS.colourNumberTwo,
	borderBottomWidth:2,
	height: 45,
	marginLeft:10,
},
mainTableTitleHandleView3:{width:220},
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
	borderBottomColor:COLORS.orangeColor,
	borderBottomWidth:2,
	height:65,
},

trTdText:
{
	flexDirection: 'row',fontSize:18,
	paddingBottom:5,marginTop:8, 
	paddingLeft:10, paddingRight:10,
	color:COLORS.colourNumberThree,
},
















});
