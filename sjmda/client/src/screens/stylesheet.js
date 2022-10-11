
import { StyleSheet} from 'react-native';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import {COLORS, OTHERS} from './Colours';


export default StyleSheet.create(
{
	mainView: {
		flex:1,
		backgroundColor:COLORS.colourNumberOne,

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

	textlable:
	{
		color:'#7a42f4',
		fontSize: 26,
		fontFamily: 'normal'
	},
	input: {
		margin: 15,
		height: 40,
		color:COLORS.colourNumberTwo,
		fontSize:18,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colourNumberTwo,
	
	},
	logInBtn: {
		width: '95%',
		marginTop: 10, marginBottom:10,
		marginLeft:10,

		backgroundColor:COLORS.colourNumberFour,
		padding: 15,height: 50,
		borderRadius: 50,
		justifyContent: "center",
		
	},
	SplashScreenMainView:
	{
		marginLeft:20,marginRight:20,
		borderRadius:15,
		backgroundColor:COLORS.cardColor,
	},
	LogImageView:{marginLeft:50, marginTop:20,marginBottom:20,},
	LogImage:{width:200,height:200,},
	LoadingLabelView:{marginLeft:80, marginTop:20},
	LoadingIndicatorView:{marginLeft:-30, marginTop:20,marginBottom:20,},
	SplashLabelText:
	{
		fontSize:20,
		// paddingLeft:15, paddingBottom:10,paddingTop:10,
		marginBottom:20,marginTop:20,
		marginLeft:20,marginRight:20,
		color:COLORS.colourNumberTwo,
	},
	LoadingLabelText:
	{
		flexDirection: 'row',fontSize:25,
		marginLeft:10, paddingBottom:10,paddingTop:10,
		color:COLORS.colourNumberTwo,
	},

	btnText: {
		color: COLORS.colourNumberTwo,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-8,
		justifyContent: "center",textAlign: "center",
	},
	logOutbtnText: {
		color: COLORS.colourNumberTwo,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-8, marginLeft:-20,
		justifyContent: "center",textAlign: "center",
	},
	pickerSelectionInputView: {
		margin: 10, flex: 1,
		height: 55,
		// color:COLORS.white,
		// fontSize:18,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colourNumberTwo,
	},
	pickerSelectioninputs:
	{
		marginTop: -8,marginLeft:8,
		height: 40,
		color:COLORS.colourNumberTwo,
		fontSize:18,width:'90%',
	},
	headerSpaceOne:{height:20,},
	// Mani 
	selecteOptionsMainView:
	{
		flexDirection:'row',
		// height:40,
		// backgroundColor:COLORS.white, 
		
	},
	selectYearBtnView:
	{
		flexDirection:'row',
		height:60, borderRadius:10,
		backgroundColor:COLORS.colourNumberFour, 
		
	},
	logInCardView:
	{
		flexDirection:'column',
		width:'90%',
		borderRadius:15,
		backgroundColor:'#7B6CF6', 
		
	},
	logInCardView1:{marginTop:'30%',marginBottom:'30%',},
	logInCardView2: {marginTop:'10%',},

	logInImgView:
	{
		marginLeft:'30%',marginRight:'30%',
	},
	selecteOptionsBtnTitleView:
	{
		borderTopRightRadius:30,borderBottomRightRadius:30,
		marginLeft:10,flex:1, height:40, width:30,
		backgroundColor:COLORS.colourNumberFour,
	},
	yearSelectionView:
	{
	
		marginTop:-2,
		marginLeft:8,flex:1, height:60,
		// backgroundColor:COLORS.colourNumberFour,
	},
	arrowView:
	{
		marginTop:-30,
		marginLeft:125,
	},
	logInArrowView:
	{
		marginTop:-25,
		marginLeft:185,
	},
	logOutArrowView:
	{
		marginTop:-25,
		marginLeft:195,
	},
	selecteOptionsBtnView:
	{
		borderRadius:30,
		borderColor:COLORS.colourNumberFour,
		// borderWidth:5,
		marginLeft:10,flex:1,width:10, height:40,
		backgroundColor:COLORS.colourNumberFour,
	},

	selecteShowBtnView:
	{
		borderRadius:30,
		borderColor:COLORS.colourNumberTwo,
		borderWidth:3, marginTop:10,
		marginLeft:5,flex:1,width:10, height:39,
		backgroundColor:COLORS.colourNumberFour,
	},
	// Home
	innerHomeMainView:
	{
		borderBottomLeftRadius:15,borderBottomRightRadius:15,
		marginLeft:10,flex:1,width:'95%',
		backgroundColor:COLORS.colourNumberOne,
		// backgroundColor:COLORS.white,

		alignItems: 'center', justifyContent: 'center',
	},
	textLabels:
	{
		flexDirection: 'row',fontSize:18,
		marginLeft:10, paddingBottom:5,paddingTop:5,
		color:COLORS.colourNumberTwo,
	},
	showBtnTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		textAlign:'center',paddingBottom:5,paddingTop:5,
		color:COLORS.colourNumberTwo,
	},
	// Table
	tableTitleView:
	{
		// marginLeft:-140,
		height:40,
		backgroundColor:COLORS.colourNumberFour,
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
	},
	tableTitleView2:
	{
		marginLeft:-120,
		height:40,
		backgroundColor:COLORS.colourNumberFour,
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
	},
	tableTitleView3:{marginLeft:-150,},
	tableTitleView4:{marginLeft:-170,},
	tableTitleView5:{marginLeft:-90,},
	tableTitleView6:{marginLeft:-180,},
	tableTitleView7:{marginLeft:-140,},




	tableTitleTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		paddingBottom:5,paddingTop:5,
		paddingLeft:20,paddingRight:20,
		color:COLORS.colourNumberTwo,
	},
	tableHeaderView:
	{
		// marginLeft:-10,
		flexDirection:'row',
		height:70,
		backgroundColor:COLORS.tableThColor,
		borderTopColor:COLORS.colourNumberTwo,
		borderTopWidth:3,
	},
	tableHeaderView2:{marginLeft:-2,},
	trThText:
	{
		flexDirection: 'row',fontSize:18,
		// paddingBottom:5,paddingTop:5, 
		paddingLeft:15, paddingRight:15,
		color:COLORS.colourNumberTwo,
	},
	
	mainTableView:
	{
		flexDirection:'row', 
		// marginLeft:20,marginRight:20,
		backgroundColor: COLORS.cardColor,
	},
	// mainTableView2:{marginTop:-20,},
	trTdText:
	{
		flexDirection: 'row',fontSize:18,
		paddingBottom:5,paddingTop:5, 
		paddingLeft:15, paddingRight:15,
		color:COLORS.colourNumberTwo,
	},

	mainGridView:
	{
		flexDirection:'row',
		backgroundColor: COLORS.cardColor,
	},
	HomeInfoMainView:
	{
		// flexDirection:'row',
		backgroundColor: COLORS.cardColor,
	},
	
	titleView:
	{
		// borderRadius:30,
		height:40,
		backgroundColor:COLORS.colourNumberFour,
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
	},
	
	mainGridSpaceView:
	{
		width:20,
	},
	mainGridSpaceViewBottom:
	{
		height:20,
		backgroundColor: COLORS.cardColor,
		borderBottomLeftRadius:15,
		borderBottomRightRadius:15,
	},
	mainExpenditureGridSpaceViewBottom:
	{
		height:18,
		backgroundColor: COLORS.cardColor,
		// borderBottomLeftRadius:15,
		// borderBottomRightRadius:15,
	},
	underLineView:
	{
		borderBottomColor:COLORS.colourNumberTwo,
		borderBottomWidth:5,
		width:'100%'
	},
	mainExpenditureBottomSpaceLineView:{height:0,},

	floatLeftView:
	{
		alignContent: "center",
	},
	floatRightView:
	{
		alignContent: "center",

	},
	/// modal
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
		backgroundColor: COLORS.cardColor,
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
		borderRadius:30,width:200, 
		backgroundColor:COLORS.modalCloseCOlour,
	},
	modalCloseTextLabels:
	{
		flexDirection: 'row',fontSize:18,
		paddingBottom:5,paddingTop:5,
		color:COLORS.colourNumberTwo,fontWeight: "bold",
		textAlign: "center"
	},
	tableTrView:
	{
		paddingBottom: 8, paddingTop:8,
		textAlign: "center",
		borderBottomColor:COLORS.colourNumberTwo,
		borderBottomWidth:2,
	},

	// ProfileScreen
	DeveloperView:
	{
		backgroundColor:COLORS.cardColor,
		width:280,borderRadius:15,
	},
	DeveloperTitleView:
	{
		// marginLeft:-120,
		height:40,
		backgroundColor:COLORS.colourNumberFour,
		borderTopLeftRadius:15,
		borderTopRightRadius:15,
	},
	UserProfileView:
	{
		backgroundColor:COLORS.cardColor,
		width:230,borderRadius:15,
	},

	UserProfileIconeView:{ marginTop:10, marginLeft:70},
	UserProfileIconeView1:{ marginTop:10, marginLeft:110},
	UserProfileLabelView:{marginLeft:50},
	UserProfileLabelView2:{marginLeft:20},
	UserProfileLabelView1:{marginLeft:75},
	UserProfileLabel2View:{marginLeft:80},
	ProfiUserView:
	{
		
		width: 100, 
		marginLeft:60,
		height: 100,
	},
	profileUserIcones:
	{
		color:COLORS.white,

	},
});
