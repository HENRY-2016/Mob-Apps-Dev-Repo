
import {StyleSheet} from 'react-native';
import {COLORS, OTHERS} from './Colours';

export default StyleSheet.create(
{
	BottomInvisibleView:{backgroundColor:'transparent',height:35},
	mainView: {
		flex:1,
		backgroundColor:COLORS.colourNumberFour,

	},
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
	textLabels:
	{
		paddingLeft:40,paddingTop:20,
		fontSize:OTHERS.producttextfontsize,
		color:COLORS.white,
	},
	bookNowBtnView:
	{
		flexDirection: 'row',
		marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
		
		height:50,width:'95%', 
		backgroundColor:COLORS.colourNumberOne,
		borderBottomEndRadius:15,borderBottomLeftRadius:15,
		alignItems: 'center', justifyContent: 'center',
	},

	bookNowBtn: 
	{
		marginTop: 1,
		backgroundColor:COLORS.colourNumberTwo,
		paddingTop: 15,height: 43,
		borderRadius: 50,
		justifyContent: "center",
		marginLeft:5,
	},
	bookNowBtn1: {width: 130},
	bookNowBtn2: {width: 300},

	btnText: {
		color: COLORS.white,
		fontSize: OTHERS.bigbtnfontsize,
		marginTop:-8,
		justifyContent: "center",textAlign: "center",
	},


	input: {
		margin: 15,
		height: 40,
		color:COLORS.white,
		fontSize:18,
		width:'90%',
		textAlign:'center',
		borderWidth: 3,
		borderRadius: 50,
		borderColor:COLORS.colourNumberTwo,
	
	},
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
		marginTop:-8,
		justifyContent: "center",textAlign: "center",
	},


});
