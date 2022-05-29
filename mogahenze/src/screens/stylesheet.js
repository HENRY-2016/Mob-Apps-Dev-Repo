
import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, OTHERS} from './Colours';

// White colour :: #fff
// yellow bg colour :: #BDB76B
// black:: #000000
white = '#fff'
export default StyleSheet.create(
{
	ItemInvisible:{backgroundColor:'transparent'},
	mainView: {
		flex:1,
		backgroundColor:COLORS.mainViewColour,

	},
	mainViewTopSpace:
	{
		backgroundColor:COLORS.mainBgColour,
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
		borderColor: '#7a42f4',
		borderWidth: 3,
		borderRadius: 50,
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
	profileTopView:
	{
		flexDirection: 'column', 
		backgroundColor: COLORS.mainBgColour,
		width:'100%',
		marginBottom: 6, 
		height: 200
	},
	profileUsercard:
	{
		flexDirection: 'row', 
		backgroundColor: COLORS.profileColour,
		borderRadius:20, 
		marginLeft:10,
		marginRight:10, 
		marginTop:10,
		marginBottom: 6, 
		height: 150
	},
	profileLinksView:
	{
		flexDirection: 'column', 
		// backgroundColor: '#BDB76B',
		marginTop:20,
		borderRadius:10, 
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
	profileLinks3:
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
	profileLinks4:
	{
		marginTop:-6,
		flexDirection: 'row', 
		backgroundColor: COLORS.profileColour,
		marginBottom: 6, 
		width:'100%',
		height: 50,
		borderBottomWidth:0,
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
		color:COLORS.mainBgColour,
		
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
		color: "#000000",
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
		backgroundColor:COLORS.cardBgColour,
		marginLeft:10,marginRight:10, marginTop: 10,
		borderTopEndRadius:15,borderTopLeftRadius:15,

	},
	offersimageRightView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
	
		width:130,
		height:100,
		marginBottom:10, marginLeft:10,
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
	productImage:
	{
		marginLeft:2,marginTop:10,marginBottom:10,
		height: 160,width: 160,  borderRadius:15,
		// backgroundColor: '#eeeeee'
	},
	offersLables:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.producttextcolour,
	},
	
	offersbtnsView:
	{
		// marginLeft:2,
		flexDirection: 'row',
		marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
		
		height:50,width:'95%', 
		backgroundColor:COLORS.offersViewColor,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
	},

	offersorderbtn: 
	{
		width: 130,
		marginTop: 1,
		backgroundColor:COLORS.orderbtnColour,
		paddingTop: 15,
		height: 43,
		borderRadius: 50,
		justifyContent: "center",
		marginLeft:5,
	},
	offersschedulebtn:
	{
		width: 130,
		marginTop: 1,
		color: "#BDB76B",
		borderColor:COLORS.orderbtnColour,
		borderWidth:4,
		paddingTop: 15,
		height: 43,
		borderRadius: 50,
		justifyContent: "center",
		marginRight:5,
	},

	offersProcedbtn: {
		width: '95%',
		marginTop: 10, marginBottom:10,

		backgroundColor:COLORS.nextBtnsColor,
		padding: 15,height: 50,
		borderRadius: 50,
		justifyContent: "center",
	},
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
		backgroundColor:COLORS.offersViewColor,
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
		
		color:COLORS.subtractAddBtnColor,
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
		color: COLORS.subtractAddBtnColor,
	},
	cartDeletebtn:
	{
		width: 40, height: 40,
		marginTop:-120,
	},

	// topNavigationHeader 
	topNavigationHeader:
	{
		flexDirection: 'row',
		backgroundColor: COLORS.mainBgColour,
		height:60,
	},
	homeNavigationHeader:
	{
		flexDirection: 'row',
		backgroundColor: COLORS.mainBgColour,
		height:50,
	},
	topNavigationHeaderArrowView:
	{
		width: 50, height: 50,
		marginLeft:10,marginTop:10,
	},
	topNavigationHeaderTextView:
	{
		height: 50,
	},
	topNavigationHeaderArrow:
	{
		color:'#fff',
	},
	topNavigationHeaderText:
	{
		fontSize: 18, color: '#fff',
		marginLeft:5, marginTop:10,
	},

	//Home
	homeNavigationView:
	{
		backgroundColor: COLORS.mainBgColour,
		height: 400,
		marginBottom:30,
	},
	homeNavigationButtonMainView:
	{
		flexDirection:'row',
		backgroundColor: COLORS.mainBgColour,
		justifyContent: 'center',
		alignContent:'center',
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
	homeImageSlider:
	{
		// justifyContent: 'center',
		// alignContent:'center',
		// backgroundColor: '#eeeeee',
		height:230, width:'90%',
		borderRadius:15,

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
	// 	borderRadius:20, width:'90%', height: 150, 
	// 	marginLeft:10,marginRight:10, 
	// 	marginTop:10, 
	// },
	homeCardView2:
	{
		flex: 1, 
		backgroundColor: COLORS.cardBgColour,
		borderRadius:20,
		height: 280,
		marginLeft:10,marginRight:10,marginTop:8,marginBottom:40, 
		// height:Dimensions.get('window').width/ 2,
	},

	homeOrderBtn:
	{
		width: '85%', height: 40,
		backgroundColor:COLORS.orderbtnColour,
		marginRight:5, borderRadius: 20,paddingTop:4,
		justifyContent: 'center', 
		alignItems: 'center',
	},
	productTextView:
	{
		marginLeft:-50, marginTop:'5%',
		alignSelf: 'center',
		// backgroundColor:COLORS.mainBgColour,
	},
	producttext:
	{
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.producttextcolour,	
	},
	homeOrderbtnView:
	{

		flexDirection: 'row',
		marginTop:'5%',
		
		height:50,width:'100%', 
		backgroundColor:COLORS.offersViewColor,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
		
	},
	homeordersbtn:
	{
	
		fontSize: OTHERS.orderbtnfontsize, 
		marginTop:0, 
		color:'#f6f6f6'
	},
	homeorderstxt:
	{
	
		fontSize: OTHERS.orderbtnfontsize, 
		marginTop:-5, 
		color:'#f6f6f6'
	},


	// cart screen
	cartCartInconView:
	{
		justifyContent: 'center', 
		alignItems: 'center',
		width: 50, height: 50,
		marginLeft:'14%',
		
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
		backgroundColor:COLORS.cartbottomBarViewColor,
	},
	cartCheckoutBtnView:
	{
		flexDirection: 'row', justifyContent: 'flex-end', 
		height: 32, paddingRight: 10, alignItems: 'center'
	},
	cartCheckoutBtn:
	{
		backgroundColor:COLORS.nextBtnsColor, 
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
		backgroundColor:COLORS.loginRegisterCardColour,
		borderRadius:15,
		width:'90%',
		marginTop:10,marginBottom :10,
	},
	orderListLables:
	{
		paddingLeft:15,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.producttextcolour,
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
		backgroundColor:COLORS.cardBgColour,
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
	activityIdicaterView: 
	{
		flex: 1,
		justifyContent: 'center',
		},
	activityIdicatercontainer: 
	{
		flexDirection: 'column',
		justifyContent: 'space-around',
		// size:50,
		padding: 20,
	},
	// splash screen
	splashScreenTextView:
	{
		flexDirection: 'row',
		justifyContent:'center',
	},
	splashScreenText:
	{
		marginTop:30,
		fontSize:30,
		color:COLORS.white,
	},
	// orders page
	odersLables:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.producttextcolour,
	},
	odersLableLeftView:
	{
		flexDirection: 'column', 
		flexGrow: 1,
		marginLeft:-10,
		alignSelf: 'center',
		width:130,height:190,
		// backgroundColor: '#eeeeee',
	},
	ordersDetailsBtnView:
	{
		flexDirection: 'row', justifyContent: 'center', marginTop:5,
		height: 32, paddingRight: 10, alignItems: 'center'
	},
});
