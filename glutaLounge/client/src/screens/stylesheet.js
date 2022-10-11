
import {StyleSheet} from 'react-native';
import {COLORS} from './Colours';

export default StyleSheet.create(
{
mainView: {
	flex:1,
	backgroundColor:COLORS.MainBodyBgColor,
},
//Home
MainHomeImageSliderView:
{
	// backgroundColor: COLORS.white,
	height: 238,
	marginBottom:30,
},

// ====================================================== Slider
HomeImageSliderView:
{
	height:210, width:'94%', 
	marginLeft:5,marginBottom:20,
},

ImagePaginationBoxStyle:
{
	position: "absolute",
	bottom: 0,padding: 0,
	alignItems: "center",
	alignSelf: "center",
	justifyContent: "center",
},
ImageSliderDotStyle:
{
	width: 10,height: 10,
	borderRadius: 5,marginHorizontal: 0,
	padding: 0,margin: 0,
	backgroundColor: COLORS.colourNumberOne,
},
ImageSliderImageComponentStyle:{width: 400, marginLeft:0, marginTop: 5},
PostsImageDetailsView:{flexDirection:'row',height:100,},

PostsImageView:
{
	// backgroundColor:COLORS.colourNumberThree,
	width:135,

},
PostsImage:
{
	width:120,height:120, 
	marginLeft:10, marginRight:10,
	borderRadius:60, marginTop:10,
}
,
PostsDetailsView:
{
	marginTop:10,
	width:200, height:100,
	// backgroundColor:COLORS.colourNumberThree,
},
PostsMainRowView:
{
	flexDirection: 'column',
	marginTop:0,marginBottom:0, marginLeft:10,marginRight:10,
	width:'95%',backgroundColor:COLORS.cardColor,borderRadius:10,
	// alignItems: 'center', justifyContent: 'center',
},

PostsMainRowView1:{height:200},
PostsMainRowView2:{height:150},

PostsMainRowBtnView:
{
	flexDirection: 'row',
	// marginTop:0,marginBottom:0, marginLeft:10,marginRight:10,
	
	// height:150,width:'95%', 
	// backgroundColor:COLORS.black,
	// borderRadius:10,
	alignItems: 'center', justifyContent: 'center',
},
PostsMainBtn:
{
	
	borderColor:COLORS.MainColorOne,
	backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,
	height: 43,
	borderRadius: 50,
	justifyContent: "center",
	marginRight:5,
},
PostsMainBtn1:{marginTop: 40,width: 105,},
PostsMainBtn2:{marginTop: 10,width: 150,},
// slider

SliderImages:
{
	// borderRadius:80,
	borderColor:COLORS.MainColorOne,borderWidth: 5,
	resizeMode:'cover',
	
	// backgroundColor: '#eeeeee'
},

PostsTexts:
{
	fontSize:18,
	color:COLORS.white,
	paddingLeft:10,paddingRight:10,
	paddingTop:10,paddingBottom:10
},
PostsTexts2:
{
	fontSize:19,
	color:COLORS.white,
	paddingLeft:10,paddingRight:10,
	paddingTop:5,paddingBottom:10
},
PostsTexts3:
{
	fontSize:19,color:COLORS.white,
	paddingLeft:10,paddingRight:10,
	// paddingTop:5,
},
// ====================================================== Products
ProductsCardMainListView:
{

	// flexDirection: 'column',
	// flexDirection:'column',

	height:300,
	backgroundColor:COLORS.cardColor,
	marginLeft:20,marginRight:20, marginTop: 70,
	borderRadius:10,
	// borderTopEndRadius:15,borderTopLeftRadius:15,

},
ProductsImageView:
{
	marginLeft:80,marginRight:15,marginTop:-80,
	// height: 50,width: 50,
	// height: 180,width: 180,
	borderRadius:90,
	// backgroundColor: '#7a42f4',
	
},

ProductsImage:
{
	height: 160,width: 160,
	borderRadius:80,
	borderColor:COLORS.MainColorOne,
    borderWidth: 5,
	
	// backgroundColor: '#eeeeee'
},
ProductsDescriptionMainView:
{
	// flexDirection: 'column', 
	// backgroundColor: '#ff1a1a',
	// alignSelf: 'center',



},
ProductsTextView:
{
	// flexDirection: 'column', 
	// flexGrow: 1,
	// marginLeft:20,
	// marginRight:10,
	// paddingRight:30,
	alignSelf: 'center',
	// width:170,height:150,
	// backgroundColor: '#ff1a1a',
},
ProductsTextView1:{ marginTop:10,},
ProductsTextView2:{marginLeft:0,},
ProductsTextView3:{paddingLeft:20,paddingRight:20},

ProductsTexts:
{
	// paddingTop:10,
	fontSize:18,
	color:COLORS.white,
},
btnText: {
	color: COLORS.white,
	fontSize: 19,
	marginTop:-20,
	justifyContent: "center",textAlign: "center",
},

MainInquiriesDetailsBtnView:
{
	flexDirection: 'row',
	marginTop:-10,marginBottom:0, marginLeft:10,marginRight:10,
	
	height:50,width:'95%', 
	backgroundColor:COLORS.colourNumberSeven,
	borderBottomEndRadius:15,borderBottomLeftRadius:15,
	alignItems: 'center', justifyContent: 'center',
},

InquiriesDetailsBtn:
{
	width: 130,
	marginTop: 1,
	color: "#BDB76B",
	borderColor:COLORS.MainColorOne,
	backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,
	height: 43,
	borderRadius: 50,
	justifyContent: "center",
	marginRight:5,
},

BookNowBtnView:{alignSelf: 'center',},
BookNowBtn: 
{
	width: 275,
	marginTop: 1,
	backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,
	height: 40,
	borderRadius: 50,
	justifyContent: "center",
	marginLeft:5,
},


// ========== Account ====================
DashboardCardProfileRowView:
{
	// flexDirection:'row',
	backgroundColor: COLORS.MainColorOne,
	borderRadius:28, height: 100,
	marginLeft:10,marginRight:10, 
},

ProfileTextLables:
{
	fontSize: 19,
	color:COLORS.white,
	marginLeft:20, marginTop:20,
	paddingLeft:10,
},
DashboardCardRowView:
{
	flexDirection:'row',
	backgroundColor: COLORS.cardColor,
	borderRadius:28, height: 115,
	marginLeft:10,marginRight:10, 
},
DashboardSpaceCard:{width:10,height: 180,},
DashboardCard:
{
	backgroundColor: COLORS.MainColorOne,
	borderRadius:90, width:102,height: 102,
	marginTop:10,
},
CardImageView:{marginLeft:55, marginTop:20,},
CardTextNumberView:{marginLeft:20, marginTop:2,},
CardTextNumberView1:{marginLeft:10, marginTop:2,},
CardTextNumberView2:{marginLeft:5, marginTop:0,},
CardTextAmountView1:{marginLeft:35, marginTop:8,},
CardTextAmountView2:{marginLeft:45, marginTop:8,},

TextLables:
{
fontSize: 18,
color:COLORS.white,
},
AboutMainView:{backgroundColor:COLORS.MainColorOne,},
AboutTitleTextLables:
{
paddingLeft:30, marginTop:30,
fontSize: 18,
color:COLORS.white,
fontWeight:'bold',
},
AboutTextLables:
{
paddingLeft:30, marginTop:10,
fontSize: 18,
color:COLORS.white,
},





/// ===================== modal =================================
centeredView: 
{
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	marginTop: 22,
},
modalView: 
{
	margin: 10,
	backgroundColor: COLORS.cardColor,
	borderRadius: 20,
	padding: 35,
	alignItems: "center",
	shadowColor: "#000",
	shadowOffset: {width: 0,height: 2},
	shadowOpacity: 0.25,shadowRadius: 4,elevation: 5
},
modalCloseBtnView:
{
	borderRadius:30,width:200, 
	marginTop: 1,
	backgroundColor:COLORS.MainColorOne,
	paddingTop: 15,
	height: 40,
	borderRadius: 50,
	justifyContent: "center",
	marginLeft:5,
},
modalCloseTextLabels:
{
	flexDirection: 'row',fontSize:18,
	paddingBottom:5,marginTop:-10,
	color:COLORS.white,fontWeight: "bold",
	textAlign: "center"
},

// ====================== Video ============

video: {alignSelf: 'center',width: 320,height: 200,},












	
});
