
import { StyleSheet} from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import {COLORS, OTHERS} from './Colours';


export default StyleSheet.create(
{
	ItemInvisible:{backgroundColor:'transparent'},
	mainView: {
		flex:1,
		backgroundColor:COLORS.MainBgColor,

	},

	mainViewTopSpace:
	{
		backgroundColor:COLORS.colorNumberOne,
		height:28,
	},

	
mainSplashScreenView: {flex:1,marginTop:-35,},

	mainViewSignin: {

		// flex:1,
		flexDirection:'column',
		backgroundColor:COLORS.mainViewColour,
		alignItems: 'center',
		justifyContent: 'center'
	},

    navigetionBar: {

		flex:1,
		backgroundColor:'#00479e',
        height: 40,
	},
	textlable:
	{
		color:'#7a42f4',
		fontSize: 26,
		fontFamily: 'normal'
	},
	input: {
		margin: 15,
		height: 40,width:'90%',
		color:COLORS.black,
		fontSize:18,
		textAlign:'center',
		borderWidth: 3,borderRadius: 50,
		borderColor:COLORS.colorNumberOne,
	
	},
	pickerSelectionInputView: {
		margin: 15, flex: 1,
		height: 40,
		// color:COLORS.white,
		// fontSize:18,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colorNumberOne,
	},
	pickerSelectionInputs:
	{
		marginTop: -5,marginLeft:10,
		height: 40,color:COLORS.black,
		fontSize:18,width:'90%',

	},
	submitButton: {
		backgroundColor: '#7a42f4',
		padding: 50,

		margin: 15,
		height: 20,
	},
	button: {
		width: 300,
		marginTop: 20,
		backgroundColor: "#8A2BE2",
		padding: 15,
		height: 50,
		borderRadius: 50,
		justifyContent: "center",
	},


	btnText: {
		color: "white",
		fontSize: 18,
		marginTop:-15,
		justifyContent: "center",
		textAlign: "center",
	},
	
	closeModalText: {
		fontSize: 24,
		color: '#00479e',
		textAlign: 'center',
	  },
	  navigationbuttons: {
	  	width: 100,
	  	marginTop: 20,
	  	backgroundColor: "#8A2BE2",
	  	padding: 15,
	  	borderRadius: 50,
	  	justifyContent: "center",
	  },
	  navigationbuttonsTwo:{
			width: 50,
			marginTop: 20,
			backgroundColor: "#8A2BE2",
			padding: 15,
			marginLeft:200,
			borderRadius: 50,
			justifyContent: "center"
	},
	 bottomViewNavigetionTwo:{
		width: '50%',
			marginTop:20,
		    height: 50,
		    backgroundColor: '#8A2BE2',
		    // justifyContent: 'center',
		    // alignItems: 'center',
		    position: 'absolute', //Here is the trick
		    bottom: 0, //Here is the trick
			right: 0

	  },
	  bottomViewNavigetion:{
		  	width: '100%',
			marginTop:20,
		    height: 50,
		    backgroundColor: '#7a42f4',
		    // justifyContent: 'center',
		    // alignItems: 'center',
		    position: 'absolute', //Here is the trick
		    bottom: 0, //Here is the trick

	  },

	  OrderNowBtn:{
		width: '100%',
		marginTop:20,
		height: 50,
		backgroundColor: '#7a42f4',
		// justifyContent: 'center',
		// alignItems: 'center',
		position: 'absolute', //Here is the trick
		bottom: 0, //Here is the trick
		},


	  // start

	// Profile screen
	// profileTopView:
	// {
	// 	flexDirection: 'column', 
	// 	backgroundColor: COLORS.sideBarNavBgColor,
	// 	width:'100%',
	// 	marginBottom: 6, 
	// 	height: 140
	// },
	// profileUserCard:
	// {
	// 	flexDirection: 'row', 
	// 	backgroundColor: COLORS.sideBarNavBgColor,
	// 	borderRadius:20, marginLeft:10,
	// 	marginRight:10, marginTop:8,
	// 	marginBottom: 6, height: 80
	// },
	// profileLinksView:
	// {
	// 	flexDirection: 'column', 
	// 	// backgroundColor: '#BDB76B',
	// 	marginTop:20,
	// 	borderRadius:10, 
	// 	marginLeft:10,
	// 	marginRight:10, 
	// 	marginBottom: 6, 
	// 	height: 212	
	// },
	// profileLinks1:
	// {
	// 	marginTop:6,
	// 	flexDirection: 'row', 
	// 	backgroundColor: COLORS.profileColour,
	// 	marginBottom: 6, 
	// 	width:'100%',
	// 	height: 50,
	// 	borderBottomWidth:1,
	// 	borderColor:'#D7DBDD',
	// },
	// profileLinks2:
	// {
	// 	marginTop:-6,
	// 	flexDirection: 'row', 
	// 	backgroundColor: COLORS.profileColour,
	// 	marginBottom: 6, 
	// 	width:'100%',
	// 	height: 50,
	// 	borderBottomWidth:1,
	// 	borderColor:'#D7DBDD',
	// },
	
	// profileLeftUserView:
	// {
	// 	marginTop:-5,
	// 	marginLeft:5,
	// 	marginTop:10,
	// 	width: 100, 
	// 	height: 100,
		
	// },
	// profileLeftUserIcones:
	// {
	// 	color:COLORS.white,
		
	// },
	// profileLeftIcones:
	// {
	// 	marginTop:-5,marginLeft:-10,marginBottom:30,
	// 	width: 40,height: 40
	// },
	// profileLeftIconesIcones:
	// {
	// 	color:COLORS.mainBgColour,
			
	// },
	// profileLabel:
	// {
	// 	color: COLORS.white,
	// 	fontSize: 18,
	// 	marginTop:12,
	// 	marginLeft:20,
	// },
	// profileCardArrow:
	// {
	// 	color: "#000000",
	// 	fontSize: 10,
	// 	marginTop:70,
	// 	marginLeft:50,
	// },
	// profileNaviArrowsView:
	// {
	// 	color: "#000000",
	// 	fontSize: 18,
	// 	marginTop:8,
	// 	marginLeft:20,
	// 	// alignSelf: 'flex-end',
	// 	// position: 'absolute' ,
	// 	// right: 0,
	// },
	// profileNaviArrows:
	// {
		
	// 	fontSize: 16,
	// 	marginTop:5,
	// 	marginLeft:155,
	// 	width: 40, 
	// 	height: 40
	// },
	// profileNaviArrows1:
	// {
		
	// 	fontSize: 16,
	// 	marginTop:5,
	// 	marginLeft:165,
	// 	width: 40, 
	// 	height: 40
	// },
	// profileNaviArrows3:
	// {
		
	// 	fontSize: 16,
	// 	marginTop:5,
	// 	marginLeft:130,
	// 	width: 40, 
	// 	height: 40
	// },
	// profileNaviArrows4:
	// {
		
	// 	fontSize: 16,
	// 	marginTop:5,
	// 	marginLeft:120,
	// 	width: 40, 
	// 	height: 40
	// },



	//  Offers Screen
	centerElement: 
	{
		justifyContent: 'center', 
		alignItems: 'center'
	},
	offersMainContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.white,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderTopEndRadius:15,borderTopLeftRadius:15,

	},
	offersImageRightView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
	
		width:130,
		height:100,
		marginBottom:10, marginLeft:10,
		// backgroundColor: '#7a42f4',
	},
	cartLabelLeftView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
		marginLeft:0,
		alignSelf: 'center',
		width:130,height:190,
		// backgroundColor: '#eeeeee',
	},
	offersLabelLeftView:
	{
		flexDirection: 'column', 
		flexGrow: 1,smarginLeft:0,
		alignSelf: 'center',
		width:130,height:235,
		backgroundColor: COLORS.sideBarNavBgColor,
	},
	feedbackLableView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
		marginLeft:0,
		alignSelf: 'center',
		width:130,
		// backgroundColor: '#eeeeee',
	},
	productImage:
	{
		marginLeft:2,marginTop:10,marginBottom:10,
		height: 160,width: 160,  borderRadius:15,
		// backgroundColor: '#eeeeee'
	},
	offersLabels:
	{
		paddingLeft:30,
		fontSize:18,
		color:COLORS.black,
	},
	
	offersBtnView:
	{
		flexDirection: 'row',
		marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
		
		height:52,width:'95%', 
		backgroundColor:COLORS.darkGreyColor,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
	},

	offersOrderBtn: 
	{
		width: 130,height: 40, marginTop: 1,
		backgroundColor:COLORS.colorNumberOne,
		paddingTop: 15,
		
		borderRadius: 50,
		justifyContent: "center",
		marginLeft:5,
	},
	offersschedulebtn:
	{
		width: 130,
		marginTop: 1,
		color: "#BDB76B",
		borderColor:COLORS.colourNumberTwo,
		borderWidth:4,
		paddingTop: 15,
		height: 43,
		borderRadius: 50,
		justifyContent: "center",
		marginRight:5,
	},

	offersProceedBtn: {
		width: '95%',
		marginTop: 10, marginBottom:10,

		backgroundColor:COLORS.colorNumberOne,
		padding: 15,height: 50,
		borderRadius: 50,
		justifyContent: "center",
		
	},
	blankSpaceView: {height:50,},
	blankSpaceCartView:{height:20},
	nextBtnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-8,
		justifyContent: "center",textAlign: "center",
	},
	nextBtnText1: {
		color: COLORS.black,
		fontSize: 18,
		marginTop:-8,
		justifyContent: "center",textAlign: "center",
	},

	// Cart Screen
	cartimageView:
	{
		flexDirection: 'row', 
		flexGrow: 1,
		// flexShrink: 1, 
		// alignSelf: 'center',
		// marginTop:10,
		// marginBottom:20,
		width:130,
		height:200,
		backgroundColor: "#8A2BE2",
	},
	cartAddSubtractionBtnView:
	{

		flexDirection: 'row',
		marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
		
		height:50,width:'95%', 
		backgroundColor:COLORS.darkGreyColor,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
		
	},
	cartAddSubtractionBtnInnerView:
	{
		flexDirection: 'row',
		// backgroundColor: "#8A2BE2",
		marginLeft:'50%',
		width:200,
	},
	cartSubtrActionBtn:
	{
		borderColor: '#cccccc',
		marginRight:20,
		marginLeft:20,
		marginTop:9,
	},
	cartQuantityLabel:
	{
		
		color:COLORS.colorNumberOne,
		fontSize: 20,
		marginTop:10,
	},
	cartAddBtn:
	{
		borderColor: COLORS.origincolour,
		marginTop:9,
		marginRight:20,
		marginLeft:20,
	},
	addSubtractImgs:{color: COLORS.colorNumberOne,},
	cartDeleteBtn:
	{
		width: 40, height: 40,
		marginTop:-120,
	},



	homeNavigationHeader:
	{
		flexDirection: 'row',
		backgroundColor: COLORS.darkGreyColor,
		height:50,
	},
	
	topNavigationHeaderTextView:{height: 18,},
	
	topNavigationHeaderText:
	{
		fontSize: 18, color: '#fff',
		marginLeft:5, marginTop:10,
	},

	
	homeNavigationButtonMainView2:
	{
		flexDirection:'row',
		backgroundColor: COLORS.mainBgColour,
		justifyContent: 'center',
		alignContent:'center',
		marginTop:10,
		// marginBottom:-50,
	},
	homeNavigationBtns:
	{
		backgroundColor: COLORS.homebtncard2,
		height:110, width:125,
		borderRadius:10,
		paddingLeft:12,
		marginRight:10,
		paddingTop:65,
	},
	homeproductImage:
	{
		marginLeft:5,marginTop:4,
		// ,marginRight:2, marginTop:8,marginBottom:8,
		height: 160,width: 150,  borderRadius:15,
		backgroundColor: COLORS.mainBgColour,
	},
	homeNavigationHeaderTexts:
	{
		fontSize:16,
		color:'#000000',
	},
	
	// homeImageSlidingImgs:
	// {
	// 	width:'100%',
	// },
	ordersText:
	{
		marginLeft:50,
		marginTop:50,
		color:'#000000',
	},
	homespaceView:
	{
		height:40,

	},
	
	homeCardView2:
	{
		flex: 1, 
		backgroundColor: COLORS.white,
		borderRadius:20,
		height: 345,
		marginLeft:10,marginRight:10,marginTop:8,marginBottom:40, 
	},
	aboutCardView:
	{
		flex: 1, 
		backgroundColor: COLORS.white,
		borderRadius:20,
		// height: 350,
		width:'95%',
		marginLeft:10,marginRight:10,marginTop:8,marginBottom:40, 
	},
	aboutCardRowView:{flexDirection:'row',alignItems:'center'},
	aboutCardRowColumn:{marginLeft:20},
	aboutCardIcons:{marginLeft:20},
	socialMediaTextLabels:
	{
		marginLeft:1, fontSize:17,color:COLORS.colorNumberOne,
	},

	homeOrderBtn:
	{
		width: '85%', height: 40,
		backgroundColor:COLORS.colorNumberOne,
		marginRight:5, borderRadius: 20,paddingTop:4,
		justifyContent: 'center', 
		alignItems: 'center',
	},
	productTextView:
	{
		marginLeft:5, marginTop:'5%',
		alignSelf: 'center', width:'95%',
	},
	productText:
	{
		fontSize:16,
		color:COLORS.black,	
	},
	whatsAppView:{flexDirection:'row'},
	whatsAppText:
	{
		color:COLORS.whatsAppColor,
		marginLeft:30, marginTop:-22,
		fontSize:18,
	},
	whatsAppIcon:
	{
		marginLeft:5,
	},
	homeOrderBtnView:
	{

		flexDirection: 'row',
		marginTop:'5%',
		
		height:60,width:'100%', 
		backgroundColor:COLORS.darkGreyColor,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
		
	},
	feedbacktitleView:
	{

		flexDirection: 'row',
		
		height:50,width:'100%', 
		backgroundColor:COLORS.colorNumberOne,
		borderRadius:15,
		alignItems: 'center', justifyContent: 'center',
		
	},
	homeOrdersBtn:
	{
		fontSize:18, marginTop:0, 
		color:COLORS.colorNumberOne,
	},
	


	
cartCartIncon:{color:COLORS.white,},
	cartCartNumberView:
	{
		justifyContent: 'center', 
		alignItems: 'center',
		marginLeft:-20, marginTop:-5,
		color:COLORS.itemsCartNumberColor,

	},
	cartCartNumberText:
	{
		color:COLORS.white,
		marginLeft:20,
		fontSize:20,
	},

	// sign up Screen
	signupView:
	{
		justifyContent: 'center', 
		alignItems: 'center',
	},

	
	loginTextView:
	{
		marginTop:50,
		marginBottom:50,
	},
	signupText:
	{
		color:COLORS.black,
		marginLeft:20,
		fontSize:20,
		
		marginBottom:20,
	},
	signUpTitleView:
	{
		marginTop:20,
	},
	signUpTitleText:
	{
		color:COLORS.nextBtnsColor,
		marginLeft:20,
		fontSize:23,
		
		marginBottom:10,
	},
	signUpDetailsView:
	{
		backgroundColor:COLORS.loginRegisterCardColour,
		borderRadius:15,
		width:'90%',
		marginTop:10,
		marginBottom :10,
	},
	phoneInputView:
	{
		marginTop:-30, marginBottom:30,
	},
	signUpBtnsView:
	{
		// marginTop:200,
		marginBottom :20,
	},
	signuphoneInput:
	{
		width:'100%',
		
	},
	

	// cart screen
	cartCheckOutBottomView:
	{
		borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5,
		backgroundColor:COLORS.darkGreyColor,
	},
	cartCheckoutBtnView:
	{
		flexDirection: 'row', justifyContent: 'flex-end', 
		height: 32, paddingRight: 10, alignItems: 'center'
	},
	cartCheckoutBtn:
	{
		backgroundColor:COLORS.colorNumberOne, 
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
	cartTotalText:
	{
		fontSize:18,
		color:COLORS.colorNumberOne,
	},
	// Orde list
	orderListDetailsView:
	{

		alignItems: 'center',
		justifyContent: 'center'
	},

	orderListDetailsText:
	{
		backgroundColor:COLORS.darkGreyColor,
		borderRadius:15,
		width:'90%',
		marginTop:10,marginBottom :10,
	},
	orderListLabelLeftView:
	{
		marginLeft:5, marginTop:'5%',
		alignSelf: 'center', width:'95%',
	},
	customerOrderDetailsLabels:
	{
		marginLeft:15,paddingTop:10,
		fontSize:18,color:COLORS.black,
	},
	orderListLabels:
	{
		paddingLeft:15,paddingTop:2,
		fontSize:18,
		color:COLORS.black,
	},
	// feedbackLables:
	// {
	// 	paddingLeft:15,
	// 	fontSize:20,
	// 	color:COLORS.white,
	// },
	orderListLabelLeftView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
		marginLeft:0,
		alignSelf: 'center',
		width:130,height:190,
		// backgroundColor: '#eeeeee',
	},
	orderListMainContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.darkGreyColor,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderRadius:15,

	},
	ordeListCartInconView:
	{
		justifyContent: 'center', 
		alignItems: 'center',
		width: 50, height: 50,
		// marginLeft:'5%',
		
	},
	
	// orders page
	odersLables:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.producttextcolour,
	},
	
	ordersDetailsBtnView:
	{
		flexDirection: 'row', justifyContent: 'center', marginTop:5,
		height: 32, paddingRight: 10, alignItems: 'center'
	},




	////////////////////////////
	topNavigationHeader:
	{
		flexDirection: 'row',
		backgroundColor: COLORS.colorNumberOne,
		// backgroundColor: COLORS.darkGreyColor,
		height:45,
	},
	productTopTitleNameView:
	{
		marginLeft:'20%', marginTop:5,
	},
	productTopTitleName:
	{
	
		fontSize: OTHERS.fontsize20,
		color:COLORS.white,
	},
	ItemDetailsMainView:
	{
		marginTop:10,
		// backgroundColor:COLORS.black,
	},
	//Home
	// homeNavigationView:
	// {
	// 	// backgroundColor: COLORS.white,
	// 	// backgroundColor: COLORS.white,
	// 	height: 255,
	// 	marginBottom:30,
	// },
	homeNavigationButtonMainView:
	{
		flexDirection:'row',
		backgroundColor: COLORS.mainBgColour,
		justifyContent: 'center',
		alignContent:'center',
	},
	homeOrdersTxt:
	{
	
		fontSize:18, 
		marginTop:-5, 
		color:'#f6f6f6'
	},
	
	subMenuNavLinksTabView:
	{
		height: 63,bottom:0,
		position: 'absolute',  
	},
	subMenuNavLinksTabSpaceView:
		{
			height: 10,
			backgroundColor: COLORS.subLinkNavColor
		},
	OfflineMainView:
	{
		// flexDirection: 'row',
		justifyContent: 'center', 
		alignItems: 'center',
		marginTop:50,
		backgroundColor:COLORS.white,
	},
	OfflineIcon:{width:120,height:120 },
	OfflineLabel:{fontSize:21,color:'red'},
	RefreshLabel:{marginLeft:80,marginTop:-10, fontSize:20,color:COLORS.white},
	RefreshBtn: 
	{
		width: '80%',height: 40, marginTop: 1,
		backgroundColor:COLORS.colorNumberOne,
		paddingTop: 15,
	
		borderRadius: 10,marginLeft:5,
	},
	subMenuNavLinksMainIcons:
	{
		width: 30,height: 30,
		marginLeft:20,
		tintColor:COLORS.black,
	},
	ActiveIconTintColor:
	{
		width: 30,height: 30,
		marginLeft:20,
		tintColor:COLORS.colorNumberOne
	},
	ActiveSubMenuNavLinksText:
	{
		marginLeft:20, 
		fontSize:16,
		color:COLORS.colorNumberOne
	},

	// subMenuNavLinksMainIcons1:
	// {
	// 	width: 30,height: 30,
	// 	marginLeft:48,

	// },
	subMenuNavLinksText:
	{
		marginLeft:10, 
		marginLeft:18, 
		fontSize:16,
		color:COLORS.black
	},
	// subMenuNaviLinksTextSmall:
	// {
	// 	marginLeft:20, 
	// 	fontSize:16,
	// 	color:COLORS.white
	// },

	scrollHorizontalView:
	{
		borderRadius:25,
		height:30,
		// marginTop:30,
		backgroundColor:COLORS.profileColour,
	},

	scrollHorizontalView2:
	{
		borderRadius:25,
		height:30,
		// marginTop:30,
		backgroundColor:COLORS.homebtncard2,
	},
	
	// Header
	openDrawerMenuView:
	{
		width: 50, height: 50,
		marginLeft:-25,marginTop:-15, marginBottom:10,
	},
	
	
	mainMenuView:{},
	openDrawerbtn:
	{
		width: 54, height: 54,
		marginLeft:30,marginTop:10,
	},
	opeMenuIcone:
	{
		marginLeft:14,marginTop:10,
		color:COLORS.white,
	},
	mainCartView:
	{
		flexDirection: 'row',
		marginRight:20,marginTop:-15,
		width: 56, height: 56,
		position: 'absolute',right: 5,top: 5,
		
	},
	mainCartbtn:
	{
		flexDirection: 'row',
		justifyContent: 'center', 
		alignItems: 'center',
		width: 58, height: 58,
	},
	mainCartNumberTxt:
	{
		marginLeft:1, fontSize:20,color:COLORS.white,
	},

activityIndicatorView: {marginTop:20,},
activityIndicatorContainer: {marginLeft:20,},
// splash screen
splashScreenView:
{
	marginTop:'35%',
	flexDirection:'column',
	// backgroundColor: '#BDB76B',
	justifyContent: 'center',
	alignContent:'center',
	width:'100%',
},
	splashScreenImage:
	{
		marginLeft:'20%',marginRight:'20%',
		width:230,height:230,
	},
	splashScreenTextView:
	{
		flexDirection: 'row',
		justifyContent:'center',
		marginLeft:30, marginTop:-20,
		// marginRight:'20%'
	},
	splashScreenText:
	{
		marginTop:30,fontSize:25,
		color:COLORS.colorNumberOne,
	},

	// Drawer items.......
	drawerUserView:
	{
		
		width: 100, 
		marginLeft:60,
		height: 100,
	},
	draweUserIcones:
	{
		color:COLORS.white,
	},
	drawerUserName:
	{
		marginLeft:60,fontSize:18,
		marginBottom:10,marginTop:10,
		color:COLORS.white
	},
	// About 
	aboutMainView:
	{
		flexDirection: 'row',
		// justifyContent: 'center',
		marginLeft:10,
		marginRight:10,
		// backgroundColor: '#BDB76B',
	},
	aboutMainSpaceView:
	{
		height:20,

	},
	aboutTextLabels:
	{
		marginLeft:1, fontSize:17,color:COLORS.black,
	},
	customerOrderDetailsLablesTitles:
	{
		paddingLeft:40,paddingTop:10,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,
	},
	customerOrderDetailsLables:
	{
		paddingLeft:50,paddingTop:8,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,
	},
	// orders view
	
	orderListView:
	{
		flexDirection: 'column', 
		width:'100%',
		backgroundColor:COLORS.sideBarNavBgColor,
	},

	orderDetailsBtn: {
		width: '50%',
		marginTop: 10, marginBottom:10,

		backgroundColor:COLORS.colorNumberOne,
		padding: 15,height: 50,
		borderRadius: 50,
		// justifyContent: "center",
		
	},
	orderDetailsBtnText:
	{
		color:COLORS.white,
		fontSize:20,
		marginLeft:35, marginTop:-5,
	},
	ordersMainContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.sideBarNavBgColor,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderRadius:15,

	},



	// ====================================================== Slider
	// ====================================================== Slider
// Silder 
// HomeImageSliderView:
// {
// 	height:210, width:'94%', 
// 	marginLeft:5,marginBottom:20,
// },
// ImageSliderView:
// {
// 	height:250, width:'94%', 
// 	marginLeft:5,marginBottom:20,
// },
// ImagePaginationBoxStyle:
// {
// 	position: "absolute",
// 	bottom: 0,padding: 0,
// 	alignItems: "center",
// 	alignSelf: "center",
// 	justifyContent: "center",
// },
// ImageSliderDotStyle:
// {
// 	width: 10,height: 10,
// 	borderRadius: 5,marginHorizontal: 0,
// 	padding: 0,margin: 0,
// 	backgroundColor: COLORS.colorNumberOne,
// },

// ImageSliderImageComponentStyle:{width: 400, marginLeft:0, marginTop: 5},
/// ================================================ ================Video
/// ================================================ ================ Video

// VideoView:{flexDirection:"row", marginTop:-25,},
// video: {alignSelf: 'center',width: 330,height: 300,},
// VideoText:{marginLeft:50,fontSize:20,color:COLORS.white,},



/// ================================================ ================Item Details screen
/// ================================================ ================Item Details screen

MainTextDetailsView:
{

	flexDirection:'column',
	backgroundColor:COLORS.white,
	marginLeft:10,marginRight:10, marginTop: 10,
	borderTopEndRadius:15,borderTopLeftRadius:15,

},
TextDetailsView:{height:210,},
TextDetails:
{
	paddingLeft:30, paddingTop:20,
	fontSize:18,
	color:COLORS.black,
},

	/// ================================================ ================modal
	/// ================================================ ================modal
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
		// backgroundColor: COLORS.darkGreyColor,
		backgroundColor: COLORS.black,
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
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
		backgroundColor:COLORS.lightGreyColor,
	},
	modalTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		marginLeft:18, marginRight:18, paddingBottom:5,paddingTop:5,
		color:COLORS.colourNumberTwo,
		
	},
	modalCloseBtnView:
	{
		borderRadius:30,width:200, 
		backgroundColor:COLORS.modalCloseCOlour,
	},
	modalCloseTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		paddingBottom:5,paddingTop:5,
		color:COLORS.white,fontWeight: "bold",
		textAlign: "center"
	},

	searchMainView:{margin: 15,width:'90%',},


// changes == 30/07/2022
MainCardRowView:
{
	flexDirection:'row'
},
MainCardView:
{
	flexDirection:'column', 
	backgroundColor: COLORS.darkGreyColor,
	borderRadius:20, width:165, height: 298, 
	marginLeft:5,marginRight:5,marginTop:10, 
},
productImage:
{
	marginLeft:7,marginTop:7,
	// ,marginRight:2, marginTop:8,marginBottom:8,
	height: 160,width: 150,  borderRadius:15,
	backgroundColor: COLORS.mainBgColour,
},

// search screen
searchBar:
{
	flexDirection:'row',
	// backgroundColor:COLORS.black,
	height:80,
},
searchBarLeftView:
{
	width:300,height:60, 
	marginTop:10,marginLeft:30,

},
// searchBarRightView:
// {
// 	width:300,
// },
searchPickerSelectionInputView: {
	margin: 5, flex: 1,
	height: 10,
	width:'90%',
	textAlign:'left',
	borderWidth: 1,
	borderRadius: 50,
	borderColor:COLORS.colorNumberOne,
	backgroundColor:COLORS.colorNumberOne,
},
searchPickerSelectionInputs:
{
	marginTop: -5,marginLeft:10,
	height: 40,color:COLORS.black,
	fontSize:18,width:'90%',
	

},
// searchBtn: {
// 	width: 60,height: 60,
// 	marginTop: 10, marginBottom:10,

// 	backgroundColor:COLORS.colorNumberOne,
// 	padding: 15,
// 	borderRadius: 50,
// 	justifyContent: "center",
	
// },
});
