

export const mainNavigationBtnStyle = () =>
{return{paddingTop: 15,height: 43,borderRadius: 50,justifyContent: "center",}}

export const mainNavigationBtnWidth1 = () =>{return{width:140}}
export const mainNavigationBtnWidth2 = () =>{return{width:170}}
export const mainNavigationBtnWidth3 = () =>{return{width:250}}
export const mainNavigationBtnWidth4 = () =>{return{width:"90%", margin: 15,}}

export const mainTableTitleHandleView = () =>
{return{borderRadius:0,borderBottomWidth:2,width:150,height: 45,marginLeft:10,}}
export const mainTableTitleHandleViewCredit = () =>
{return{borderRadius:0,borderBottomWidth:2,height: 45,width:230,marginLeft:10,}}
export const userProfileView = () =>
{return{height:140,borderRadius:30,marginLeft:9,marginRight:9,flexDirection:"row"}}
export const aboutText = () =>
{return{fontSize:19, paddingLeft:30,paddingBottom:20,paddingRight:20,}}
export const aboutTitleText = () =>
{return{fontSize:19,fontWeight:"bold",paddingLeft:15,paddingBottom:10,paddingRight:20,}}
export const introClubText = () =>
{return{marginLeft:-20,fontSize:19,justifyContent: "center",textAlign: "center",paddingLeft:30,paddingBottom:20,paddingRight:20,}}
export const trTdText = () =>
{return{flexDirection: 'row',fontSize:18,paddingBottom:5,marginTop:8,paddingLeft:10, paddingRight:10,}}
export const tableTrView = () =>
{return{paddingBottom: 8, paddingTop:8,textAlign: "center",borderBottomWidth:2,height:65,}}




export const getPlainColor = (status) => 
{
    if(status == "Active" ) {return {color:'#5800c4'}}
    else if(status == "Semi Active" ) {return {color:'#964b00'}}
    else if(status == "Not Active" ) {return {color:'#FF0000'}} 
    else {return{color:'#FF0000'}}
}
export const getBorderBottomColor = (status) => 
{
    if(status == "Active" ) {return {borderBottomColor:'#5800c4'}}
    else if(status == "Semi Active" ) {return {borderBottomColor:'#964b00'}}
    else if(status == "Not Active" ) {return {borderBottomColor:'#FF0000'}} 
    else {return{color:'#FF0000'}}
}
export const getBackgroundColor = (status) => 
{
    if(status == "Active" ) {return {backgroundColor:'#5800c4'}}
    else if(status == "Semi Active" ) {return {backgroundColor:'#964b00'}}
    else if(status == "Not Active" ) {return {backgroundColor:'#FF0000'}} 
    else {return{backgroundColor:'#FF0000'}}
}