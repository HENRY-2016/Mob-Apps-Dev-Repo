
import {StyleSheet} from 'react-native';
import {COLORS,FONTSIZES, OTHERS} from './Colours';

export default StyleSheet.create(
{
	BottomInvisibleView:{backgroundColor:'transparent',height:35},
	mainView: {
		flex:1,
		backgroundColor:COLORS.colourNumberSix,

	},
	splashScreenMainView:{flex:1,backgroundColor:COLORS.white,},

	ModuleNameTitleTextLabel:
	{
		paddingLeft:10,
		fontSize:FONTSIZES.moduleTitleTextFontSize,
		color:COLORS.white,
	},
	ModuleNameIconTextView:{flexDirection:'row'},
	// MainBottomSpaceView:{height:20},
	MainNavigationBtnView:{marginLeft:30},
	BackToMainListScreenView:{marginLeft:'30%',},
	ModuleNameOuterTopView:{backgroundColor:COLORS.colourNumberOne,height:90,},
	ModuleNameInnerTopView:{backgroundColor:COLORS.colourModuleNameColorCard,height:90,
		borderBottomRightRadius:80,},
	

	MainOuterServiceCardView:{height:80,},
	MainOuterServiceCardAboutView:{height:100,},
	MainOuterServiceScreen2CardView:{backgroundColor:COLORS.colourNumberSix,},
	MainOuterServiceCardView1:{backgroundColor:COLORS.colourServiceColorCard2,},
	MainOuterServiceCardView2:{backgroundColor:COLORS.colourServiceColorCard3,},
	MainOuterServiceCardView3:{backgroundColor:COLORS.colourServiceColorCard4,},
	MainOuterServiceCardView4:{backgroundColor:COLORS.colourServiceColorCard5,},
	MainOuterServiceCardView5:{backgroundColor:COLORS.colourServiceColorCard6,},
	MainOuterServiceCardView6:{backgroundColor:COLORS.colourServiceColorCard7,},
	MainOuterServiceCardView7:{backgroundColor:COLORS.colourServiceColorCard8,},
	MainOuterServiceCardView8:{backgroundColor:COLORS.colourServiceEndColorCard,},
	// MainOuterServiceCardView9:{backgroundColor:COLORS.colourServiceColorCard10,},



	MainInnerServiceCardView:{flexDirection:'row', height:80, borderBottomLeftRadius:100,},
	MainInnerServiceScreen2CardView:{backgroundColor:COLORS.colourNumberSix,},
	MainInnerServiceCardView1:{backgroundColor:COLORS.colourServiceColorCard1,},
	MainInnerServiceCardView2:{backgroundColor:COLORS.colourServiceColorCard2,},
	MainInnerServiceCardView3:{backgroundColor:COLORS.colourServiceColorCard3,},
	MainInnerServiceCardView4:{backgroundColor:COLORS.colourServiceColorCard4,},
	MainInnerServiceCardView5:{backgroundColor:COLORS.colourServiceColorCard5,},
	MainInnerServiceCardView6:{backgroundColor:COLORS.colourServiceColorCard6,},
	MainInnerServiceCardView7:{backgroundColor:COLORS.colourServiceColorCard7,},
	MainInnerServiceCardView8:{backgroundColor:COLORS.colourServiceColorCard8,},
	MainInnerServiceCardView9:{backgroundColor:COLORS.colourServiceEndColorCard,},
	// MainInnerServiceCardView10:{backgroundColor:COLORS.colourServiceColorCard10,},

	// BtnMainScrollViewView:{backgroundColor:COLORS.colourNumberThree,height:100},
	
	MainNavigationBtnSpaceView:{width:20,},
	// MainNavigationBtnSpaceView1:{width:10,},
	MainNavigationBtn: 
	{
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 43,borderRadius: 50,
		justifyContent: "center",
	},
	GooglePinBtn: 
	{
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 43,borderRadius: 50,
		justifyContent: "center", marginLeft:30,
	},
	ServicesText: 
	{
		paddingLeft:10,paddingRight:10,
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		
		// justifyContent: "center",textAlign: "center",
	},
	ServicesText1: 
	{
		paddingLeft:5,paddingRight:5,
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		
		// justifyContent: "center",textAlign: "center",
	},
	MainNavigationBtn1:{width:140,},
	MainNavigationBtn2:{width:170,},
	MainNavigationBtn3:{width:200,},
	MainNavigationBtn4:{width:255,},
	MainNavigationBtn5:{width:270,},

	MainServiceNameArrowView:
	{
		// backgroundColor:COLORS.black,
		// height:90,
	},
	ServiceNameArrow: 
	{
		backgroundColor:COLORS.colourServiceColorCard1,
		paddingTop: 15,height: 43, marginLeft:10,
		justifyContent: "center",
		borderBottomRightRadius:20,
		borderTopRightRadius:20,
	},
	ServiceNameListMainView:
	{
		backgroundColor:COLORS.colourServiceColorCard1,
		paddingTop: 15,height: 60, marginLeft:10,marginRight:10,
		justifyContent: "center",
		borderRadius:10,
		// borderBottomEndRadius:2,
	},
	ServiceNameListMainView2:
	{
		backgroundColor:COLORS.colourServiceColorCard1,
		paddingTop: 5,height: 40, marginLeft:20,marginRight:20,
		justifyContent: "center",
		borderRadius:10, flexDirection:"row",
		// borderBottomEndRadius:2,
	},
	// ServiceNameListText: {
	// 	color: COLORS.colourNumberOne,
	// 	fontSize: OTHERS.bigbtnfontsize,
	// 	marginTop:-20,
	// 	justifyContent: "center",textAlign: "center",
	// },
	ServiceNameArrowBtn1:{width:160,},
	ServiceNameArrowBtn2:{width:230,},
	ServiceNameArrowBtn3:{width:200,},
	ServiceNameArrowBtn4:{width:270,},



	

	ArrowBtn: 
	{
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 45,width:45,borderRadius: 50,
		justifyContent: "center", marginTop:10,
	},
	
	PointerIcons:
	{
		width:38,height:38,
		marginTop:-18, marginLeft:8,
	},
	PointerBtn: 
	{
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 45,width:50,borderRadius: 50,
		justifyContent: "center", marginTop:15,
	},
	ArrowIcons:
	{
		width:30,height:30,
		marginTop:-18, marginLeft:8,
	},

	ScreenArrowBtn: 
	{
		backgroundColor:COLORS.colourNumberOne,
		paddingTop: 15,height: 45,width:45,borderRadius: 50,
		justifyContent: "center", marginTop:0,
	},
	ScreenArrowBtn1: 
	{
		paddingTop: 15,height: 45,width:45,
		justifyContent: "center", marginTop:-5,
	},
	ScreenArrowIcons:
	{
		width:30,height:30,
		marginTop:-18, marginLeft:8,
	},
	// MenuIconView:{marginTop:0, marginLeft:8,},
	MenuIcon:
	{
		width:28,height:28,
		marginTop:-20, marginLeft:20,
	},
	MenuBtnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-30, paddingLeft:30,
		justifyContent: "center",textAlign: "center",
	},

	// MainScreenOuterServiceCardView:{height:100,},
	MainScreenInnerServiceCardView:{height:85,},


	btnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-20,
		justifyContent: "center",textAlign: "center",
	},
	video: {alignSelf: 'center',width: 330,height: 300,},
	
	MainCardTitleTextLabel:
	{
		paddingLeft:20, paddingTop:20,
		fontSize:FONTSIZES.moduleTitleTextFontSize,
		color:COLORS.white,
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


	textLabels:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.black,
	},
	MainSmallBtnView:
	{
		flexDirection: 'column',
		marginTop:'35%',marginBottom:'35%', marginLeft:10,marginRight:10,
		
		height:50,width:'95%', 
		// backgroundColor:COLORS.colourNumberOne,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
	},

	// SmallBtnOne: 
	// {
	// 	marginTop: 1,
	// 	backgroundColor:COLORS.colourNumberOne,
	// 	paddingTop: 15,height: 43,
	// 	borderRadius: 50,
	// 	justifyContent: "center",
	// 	marginLeft:5,
	// },
	// SmallBtnOne1: {width: 210},
	// SmallBtnOne2: {width: 250},

	
	

	input: {
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
	BookingScreenText: 
	{
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		justifyContent: "center",textAlign: "center",
	},
	BookingCardMainView:
	{
		backgroundColor:COLORS.colourServiceColorCard2,
		
		borderRadius:15,
		width:'90%', marginLeft:20,
		marginTop:10,marginBottom :10,
		alignContent:'center',
	},
	pickerSelectionInputView: {
		margin: 15, flex: 1,
		height: 40,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colourNumberOne,
	},
	pickerSelectioninputs:
	{
		marginTop: -10,marginLeft:10,
		height: 40,color:COLORS.white,
		fontSize:18,width:'90%',

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
	BottomSpaceView:{backgroundColor:COLORS.colourNumberSix,height:15,},


	
	
	
	// Club ====================
	introClubText:
	{
		color: COLORS.colourNumberOne,
		fontSize: FONTSIZES.clubIntroTextFontSize,
		paddingLeft:10, paddingRight:10,
		justifyContent: "center",textAlign: "center",
	},



	// ======================= Splash screen
	mainViewSplah: {
		paddingTop: 23,flex:1,
		marginTop:'35%', marginLeft:30, marginBottom:20,
	},
	splashScreenView:
	{
		marginTop:30, marginLeft:20,
		flexDirection:'column',
		// backgroundColor: '#BDB76B',
		justifyContent: 'center',
		alignContent:'center',
		width:'90%',
	},
	splashScreenImage: {
		width: '80%',
		height: 200,
		resizeMode: 'stretch',
	},
	splashScreenTextView:{flexDirection: 'row',justifyContent:'center',},
	splashScreenText:
	{
		marginTop:30,
		fontSize:30,
		color:COLORS.colourNumberOne,
	},
	activityIdicaterView: {flex: 1,justifyContent: 'center',},
	activityIdicatercontainer: 
	{
		flexDirection: 'column',
		justifyContent: 'space-around',
		padding: 20,
	},
	// ================================= About ========================
	MainOuterServiceCardAboutView1:{height:360,},
	MainInnerServiceCardAboutView1:{flexDirection:'row', height:360, borderBottomLeftRadius:100,},

	MainOuterServiceCardAboutView2:{height:300,},
	MainInnerServiceCardAboutView:{flexDirection:'row', height:300, borderBottomLeftRadius:100,},

	AboutTextLabel:
	{
		paddingLeft:20, 
		fontSize:FONTSIZES.aboutTextFontSize,
		color:COLORS.white,
	},
	
	//  =============== Video Image Screen
	// ImageVideoMainCardView:{marginTop:200,},
	ImageVideoMainCardView:
	{
		marginLeft:10,marginRight:10,borderRadius:20,
		backgroundColor:COLORS.colourServiceColorCard1,
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
	// Silder 
	ImageSliderView:
	{
		height:230, width:'90%',
		marginLeft:5,marginBottom:20,
		// backgroundColor:COLORS.white,
	},
	EstateImage:
	{
		width:'100%', borderRadius:20, marginTop:20, marginLeft:10, height:230,
	},
	ImagePaginationBoxStyle:
	{
		position: "absolute",
		bottom: 0,  padding: 0,
		alignItems: "center",
		alignSelf: "center",
		justifyContent: "center",
	},
	ImageSliderDotStyle:
	{
		width: 10,
		height: 10,
		borderRadius: 5,
		marginHorizontal: 0,
		padding: 0,
		margin: 0,
		backgroundColor: "rgba(128, 128, 128, 0.92)"
	},
	ImageSliderDotColor:{color:"#7a42f4"},
	ImageSliderInactiveDotColor:{color:COLORS.colourNumberOne},
	ImageSliderImageLoadingColor:{color:"#2196F3"},
	ImageSliderImageComponentStyle:{width: 400, marginLeft:0, marginTop: 5},


	homeImageSlidingImgs:
	{
		width:'100%',
	},
	VideoView:{ marginTop:-25,},
	video: {alignSelf: 'center',width: 330,height: 300,},






// ==========================================================
// ==========================================================
// 								Modal
// ==========================================================
// ==========================================================

centeredView: 
{
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	marginTop: 22,
},
modalView: 
{
	margin: 20,
	backgroundColor: COLORS.colourServiceColorCard2,
	borderRadius: 20,
	padding: 35,
	// alignItems: "center",
	shadowColor: "#0530ad",
	shadowOffset: {width: 0,height: 2},
	shadowOpacity: 0.25,
	shadowRadius: 4,
	elevation: 5
},

modalText: {
marginBottom: 15,
textAlign: "center"
},
modalOptionsBtnView:
{
	borderRadius:30,marginLeft:10,
	backgroundColor:COLORS.colourNumberFour,
},
modalTextLabels:
{
	flexDirection: 'row',fontSize:18,
	marginLeft:18, marginRight:18, paddingBottom:5,paddingTop:5,
	color:COLORS.colourNumberTwo,
	
},














});
