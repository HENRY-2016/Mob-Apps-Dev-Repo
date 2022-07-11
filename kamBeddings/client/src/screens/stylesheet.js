
import { StyleSheet} from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import {COLORS, OTHERS} from './Colours';


export default StyleSheet.create(
{
	ItemInvisible:{backgroundColor:'transparent'},
	mainView: {
		flex:1,
		backgroundColor:COLORS.colourNumberFour,

	},
	mainViewTopSpace1:
	{
		backgroundColor:COLORS.colourNumberZero,
		height:20,
	},

	
	mainViewSplah: {
		paddingTop: 23,
		flex:1,
		backgroundColor:COLORS.origincolour,
	},

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
		height: 40,
		color:COLORS.white,
		fontSize:18,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderColor:COLORS.colourNumberOne,
	
	},
	pickerSelectionInputView: {
		margin: 15, flex: 1,
		height: 40,
		// color:COLORS.white,
		// fontSize:18,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderColor:COLORS.colourNumberOne,
	},
	pickerSelectioninputs:
	{
		marginTop: -5,marginLeft:10,
		height: 40,color:COLORS.white,
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
	  	justifyContent: "center",
	  },
	  navigationbuttonsTwo:{
			width: 50,
			marginTop: 20,
			backgroundColor: "#8A2BE2",
			padding: 15,
			marginLeft:200,
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
	profileTopView:
	{
		flexDirection: 'column', 
		backgroundColor: COLORS.colourNumberZero,
		width:'100%',
		marginBottom: 6, 
		height: 140
	},
	profileUsercard:
	{
		flexDirection: 'row', 
		backgroundColor: COLORS.profileColour,
		marginLeft:10,
		marginRight:10, 
		marginTop:8,
		marginBottom: 6, 
		height: 80
	},
	profileLinksView:
	{
		flexDirection: 'column', 
		// backgroundColor: '#BDB76B',
		marginTop:20,
		marginLeft:10,
		marginRight:10, 
		marginBottom: 6, 
		height: 212	
	},
	profileLinks1:
	{
		marginTop:6,
		flexDirection: 'row', 
		backgroundColor: COLORS.profileColour,
		marginBottom: 6, 
		width:'100%',
		height: 50,
		borderBottomWidth:1,
		borderColor:'#D7DBDD',
	},
	profileLinks2:
	{
		marginTop:-6,
		flexDirection: 'row', 
		backgroundColor: COLORS.profileColour,
		marginBottom: 6, 
		width:'100%',
		height: 50,
		borderBottomWidth:1,
		borderColor:'#D7DBDD',
	},
	
	profileLeftUserView:
	{
		marginTop:-5,
		marginLeft:5,
		marginTop:10,
		width: 100, 
		height: 100,
		
	},
	profileLeftUserIcones:
	{
		color:COLORS.white,
		
	},
	profileLeftIcones:
	{
		marginTop:-5,marginLeft:-10,marginBottom:30,
		width: 40,height: 40
	},
	profileLeftIconesIcones:
	{
		color:COLORS.mainBgColour,
			
	},
	profileLable:
	{
		color: COLORS.white,
		fontSize: 18,
		marginTop:12,
		marginLeft:20,
	},
	profileCardArrow:
	{
		color: "#000000",
		fontSize: 10,
		marginTop:70,
		marginLeft:50,
	},
	profileNaviArrowsView:
	{
		color: "#000000",
		fontSize: 18,
		marginTop:8,
		marginLeft:20,
		// alignSelf: 'flex-end',
		// position: 'absolute' ,
		// right: 0,
	},
	profileNaviArrows:
	{
		
		fontSize: 16,
		marginTop:5,
		marginLeft:155,
		width: 40, 
		height: 40
	},
	profileNaviArrows1:
	{
		
		fontSize: 16,
		marginTop:5,
		marginLeft:165,
		width: 40, 
		height: 40
	},
	profileNaviArrows3:
	{
		
		fontSize: 16,
		marginTop:5,
		marginLeft:130,
		width: 40, 
		height: 40
	},
	profileNaviArrows4:
	{
		
		fontSize: 16,
		marginTop:5,
		marginLeft:120,
		width: 40, 
		height: 40
	},



	//  Offers Screen
	centerElement: 
	{
		justifyContent: 'center', 
		alignItems: 'center'
	},
	offersMainContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.colourNumberSix,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderTopEndRadius:15,borderTopLeftRadius:15,

	},
	offersimageRightView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
	
		width:130,
		height:100,
		marginBottom:-20, marginLeft:10,
		// backgroundColor: '#7a42f4',
	},
	offersLableLeftView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
		marginLeft:0,
		alignSelf: 'center',
		width:130,height:190,
		// backgroundColor: '#eeeeee',
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
		width:160,height:150,
		borderRadius:20,
	},
	offersLables:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,
	},
	
	offersbtnsView:
	{
		marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
		
		height:55,width:'95%', 
		backgroundColor:COLORS.colourNumberOne,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
	},

	offersorderbtn: 
	{
		width: '50%',
		marginTop: 1,
		backgroundColor:COLORS.colourNumberSix,
		height: 45,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		borderTopLeftRadius:15,

		justifyContent: "center",
		marginLeft:'48%',marginRight:10,
		
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
		justifyContent: "center",
		marginRight:5,
	},

	offersProcedbtn: {
		width: '95%',
		marginTop: 10, marginBottom:10,

		backgroundColor:COLORS.colourNumberOne,
		padding: 15,height: 50,
		justifyContent: "center",
		
	},
	blankSpaceView: {height:90,},
	blankSpaceCartView:{height:20},
	nextbtnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
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
	cartAddSubtractionbtnsView:
	{

		flexDirection: 'row',
		marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
		
		height:50,width:'95%', 
		backgroundColor:COLORS.colourNumberOne,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
		
	},
	cartAddSubtractionbtnsinnerView:
	{
		flexDirection: 'row',
		// backgroundColor: "#8A2BE2",
		marginLeft:'50%',
		width:200,
	},
	cartsubtractionbtn:
	{
		borderColor: '#cccccc',
		marginRight:20,
		marginLeft:20,
		marginTop:9,
	},
	cartQuantityLable:
	{
		
		color:COLORS.white,
		fontSize: 20,
		marginTop:10,
	},
	cartAddbtn:
	{
		borderColor: COLORS.origincolour,
		marginTop:9,
		marginRight:20,
		marginLeft:20,
	},
	addsubtractincons:
	{
		color: COLORS.white,
	},
	cartDeletebtn:
	{
		width: 40, height: 40,
		marginTop:-120,
	},



	homeNavigationHeader:
	{
		flexDirection: 'row',
		backgroundColor: COLORS.mainBgColour,
		height:50,
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
		paddingLeft:12,
		marginRight:10,
		paddingTop:65,
	},
	homeproductImage:
	{
		marginLeft:5,marginTop:4,
		
		// ,marginRight:2, marginTop:8,marginBottom:8,
		// backgroundColor: COLORS.mainBgColour,
	},
	homeNavigationHeaderTexts:
	{
		fontSize:16,
		color:'#000000',
	},
	homeImageSlider:
	{
		// justifyContent: 'center',
		// alignContent:'center',
		// backgroundColor: '#eeeeee',
		height:230, width:'95%',

		marginLeft:5,
		marginBottom:20,
	},
	homeImageSlidingImgs:
	{
		width:'100%',
	},
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
	// homeCardView:
	// {
	// 	flexDirection: 'row', 
	// 	backgroundColor: COLORS.cardBgColour,
	// 	marginLeft:10,marginRight:10, 
	// 	marginTop:10, 
	// },
	homeCardView2:
	{
		flex: 1, 
		backgroundColor: COLORS.colourNumberSix,
		height: 280,
		marginLeft:10,marginRight:10,marginTop:8,marginBottom:40, 
		// height:Dimensions.get('window').width/ 2,
	},

	homeOrderBtn:
	{
		width: '85%', height: 40,
		backgroundColor:COLORS.colourNumberTwo,
		justifyContent: 'center', 
		alignItems: 'center',
	},
	productTextView:
	{
		marginLeft:0, marginTop:'5%',
		alignSelf: 'center', width:'95%',
		// backgroundColor:COLORS.black,
	},
	producttext:
	{
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,	
	},
	homeOrderbtnView:
	{

		flexDirection: 'row',
		marginTop:'5%',
		
		height:50,width:'100%', 
		backgroundColor:COLORS.colourNumberOne,
		// backgroundColor:COLORS.colourNumberSeven,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
		
	},
	feedbacktitleView:
	{

		flexDirection: 'row',
		
		height:50,width:'100%', 
		backgroundColor:COLORS.colourNumberOne,
		alignItems: 'center', justifyContent: 'center',
		
	},
	homeordersbtn:
	{
	
		fontSize: OTHERS.orderbtnfontsize, 
		marginTop:0, 
		color:'#f6f6f6'
	},
	


	
	cartCartIncon:
	{
		// color:"#eeeeee",
		color:COLORS.white,
	},
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
		backgroundColor:COLORS.colourNumberOne,
	},
	cartCheckoutBtnView:
	{
		flexDirection: 'row', justifyContent: 'flex-end', 
		height: 32, paddingRight: 10, alignItems: 'center'
	},
	cartCheckoutBtn:
	{
		backgroundColor:COLORS.colourNumberTwo, 
		width: 170,  height: 40,
		marginBottom:20, 
	},
	cartCheckoutText:
	{
		color:COLORS.white,
		fontSize:OTHERS.bigbtnfontsize,
		marginLeft:35, marginTop:5,
	},
	cartTotalText:
	{
		// paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,
	},
	// Orde list
	orderListDetailsView:
	{

		alignItems: 'center',
		justifyContent: 'center'
	},

	orderListDetailsText:
	{
		backgroundColor:COLORS.colourNumberSix,
		
		width:'90%',
		marginTop:10,marginBottom :10,
	},
	orderListLables:
	{
		paddingLeft:15,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,
	},
	feedbackLables:
	{
		paddingLeft:15,
		fontSize:20,
		color:COLORS.white,
	},
	orderListLableLeftView:
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
		backgroundColor:COLORS.colourNumberSix,
		marginLeft:10,marginRight:10, marginTop: 10,

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
	// topNavigationHeader 
	topNavigationHeader:
	{
		flexDirection: 'row',
		backgroundColor: COLORS.colourNumberOne,
		height:65,
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

	//Home
	homeNavigationView:
	{
		backgroundColor: COLORS.colourNumberZero,
		height: 260,
		marginBottom:30,
	},
	homeNavigationButtonMainView:
	{
		flexDirection:'row',
		backgroundColor: COLORS.mainBgColour,
		justifyContent: 'center',
		alignContent:'center',
	},
	homeorderstxt:
	{
	
		fontSize: OTHERS.orderbtnfontsize, 
		marginTop:-5, 
		color:'#f6f6f6'
	},
	
	subMenuNaviLinksTabView:
	{
		height: 63,bottom:0,
		position: 'absolute',  
	},
	subMenuNaviLinksTabSpaceView:
		{
			height: 8,
			backgroundColor: COLORS.subLinkNaviColour
		},

	// subMenuRightArrowView:
	// {
	// 	width:30,
	// 	backgroundColor: COLORS.white,
	// },
	subMenuNaviLinksMainIcones:
	{
		width: 30,height: 30,
		marginLeft:28,

	},
	subMenuNaviLinksMainIcones1:
	{
		width: 30,height: 30,
		marginLeft:48,

	},
	subMenuNaviLinksText:
	{
		marginLeft:10, 
		fontSize:16,
		color:COLORS.white
	},
	subMenuNaviLinksTextSmall:
	{
		marginLeft:20, 
		fontSize:16,
		color:COLORS.white
	},

	scrollHorizontalView:
	{
		height:30,
		// marginTop:30,
		backgroundColor:COLORS.profileColour,
	},

	scrollHorizontalView2:
	{
		height:30,
		// marginTop:30,
		backgroundColor:COLORS.homebtncard2,
	},
	
	// Header
	openDrawerMenuView:
	{
		width: 50, height: 50,
		marginLeft:-25,marginTop:5, marginBottom:10,
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
		// backgroundColor:COLORS.colourNumberTwo,
	},
	opeMenuIcone:
	{
		marginLeft:14,marginTop:10,
		color:COLORS.white,
	},
	mainCartView:
	{
		flexDirection: 'row',
		justifyContent: 'center', 
		alignItems: 'center',
		width: 56, height: 56,
		// marginLeft:'70%',
		position: 'absolute',right: 5,top: 5,
		// backgroundColor:COLORS.cartMainCartNaviView,
		
	},
	mainCartbtn:
	{
		flexDirection: 'row',
		justifyContent: 'center', 
		alignItems: 'center',
		width: 58, height: 58,
		// backgroundColor:COLORS.colourNumberTwo,
		
	},
	mainCartNumberTxt:
	{
		marginLeft:1, fontSize:20,color:COLORS.white,
	},
	sublinksTitleTxt:
	{
		marginLeft:'30%', fontSize:20, color:COLORS.white,
	},
	activityIdicaterView: 
	{
		flex: 1,
		justifyContent: 'center',
		},
	activityIdicatercontainer: 
	{
		flexDirection: 'column',
		justifyContent: 'space-around',
		marginLeft:20,
		// padding: 20,
	},
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
		marginLeft:20,
		// marginRight:'20%'
		width: '80%',
		height: 200,
		resizeMode: 'stretch',
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
		color:COLORS.white,
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
		// backgroundColor: '#BDB76B',
		height:20,

	},
	aboutTextLabels:
	{
		marginLeft:1, fontSize:17,color:COLORS.white,
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
		// flexGrow: 1,
		// marginLeft:-10,
		width:'100%',
		// backgroundColor: '#eeeeee',
		color:COLORS.profileColour,
	},
	orderListLables:
	{
		paddingLeft:20,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		// marginLeft:-20,
		color:COLORS.white,
	},

	orderdetailsBtn: {
		width: '50%',
		marginTop: 10, marginBottom:10,

		backgroundColor:COLORS.colourNumberOne,
		padding: 15,height: 50,
		// justifyContent: "center",
		
	},
	orderdetailsBtnText:
	{
		color:COLORS.white,
		fontSize:OTHERS.bigbtnfontsize,
		marginLeft:35, marginTop:-5,
	},
	ordersMainContainerView:
	{

		flexDirection: 'row',
		backgroundColor:COLORS.colourNumberSix,
		marginLeft:10,marginRight:10, marginTop: 10,
		// borderTopEndRadius:15,borderTopLeftRadius:15,

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
		// backgroundColor: COLORS.cardColor,
		backgroundColor: COLORS.black,
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
		backgroundColor:COLORS.colourNumberFour,
	},
	modalTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		marginLeft:18, marginRight:18, paddingBottom:5,paddingTop:5,
		color:COLORS.colourNumberTwo,
		
	},
	modalCloseBtnView:
	{
		backgroundColor:COLORS.modalCloseCOlour,
	},
	modalCloseTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		paddingBottom:5,paddingTop:5,
		color:COLORS.white,fontWeight: "bold",
		textAlign: "center"
	},
});
