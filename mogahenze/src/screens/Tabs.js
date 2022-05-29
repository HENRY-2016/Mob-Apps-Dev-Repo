import React,{useEffect,useState}  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo,AntDesign,Ionicons,FontAwesome } from '@expo/vector-icons';
import { Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Products from './Products';
import Profile from './Profile';
import Offers from './Offers';
import Orders from './Orders';
import Cart from './Cart';

const Tab = createBottomTabNavigator();



function Tabs() {

	const [NumberOfItems , setNumberOfItems] = useState('');
	useEffect(()=>{
        setInterval(getNumberOfItems,1000)
    },[]);
	const getNumberOfItems = () => 
    {
        try 
        {   AsyncStorage.getItem ('NumberOfItems')
            .then(value =>{if (value != null){setNumberOfItems(value)}})
			console.log("===== geting NumberOfItems")
        }catch (error) { console.log(error)}
    }; 

	const CustomTabBarButton = ({children,onPress}) => (
		<TouchableOpacity
			style={{top:-20,aligneItems:'center',justifyContent: 'center'}}
			onPress={onPress}
		>
			<View
			style={{width:58,height:58,marginTop:-20, borderRadius:30,backgroundColor:'#182568'}}
			>
					<Text  style={{marginLeft:25, fontSize:20, color:'#ffffff'}}>{NumberOfItems}</Text>
	
				{children}
			</View>
		</TouchableOpacity>
	);



    return (
		<Tab.Navigator screenOptions={{headerShown:false,tabBarShowLabel:false,
			tabBarStyle: {height: 75},
		}} 
			
		>
			<Tab.Screen name="Products" component={Products} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:-6}}>
						<Entypo name="home" size={24} style={{color:facused ? '#182568':'#182568'}} />
						<Text style={{color:facused ? '#182568':'#182568'}}>Kulakula</Text>
					</View>
				),
			}} />
			<Tab.Screen name="Offers" component={Offers} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:-6}}>
						<FontAwesome name="bell" size={24} style={{color:facused ? '#182568':'#182568'}} />
						<Text style={{color:facused ? '#182568':'#182568'}}>Offers</Text>
					</View>
				),tabBarStyle: { display: 'none' }
			}}/>
			
			<Tab.Screen name="Cart" component={Cart} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:-6}}>
						<Ionicons name="ios-cart" size={24} style={{color:facused ? '#ffffff':'#ffffff'}} />
						{/* <Text style={{color:facused ? '#BDB76B':'#BDB76B'}}></Text> */}
					</View>
				),tabBarStyle: { display: 'none' },
				tabBarButton:(props)=>(<CustomTabBarButton {...props} />)
			}} />
			<Tab.Screen name="Orders" component={Orders} options={{ unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:-6}}>
						<AntDesign name="profile" size={24} style={{color:facused ? '#182568':'#182568'}} />
						<Text style={{color:facused ? '#182568':'#182568'}}>Orders</Text>
					</View>
				),tabBarStyle: { display: 'none' }
			}} />
			<Tab.Screen name="Profile" component={Profile} options={{ unmountOnBlur:true, 
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:-6}}>
						<Entypo name="user" size={24} style={{color:facused ? '#182568':'#182568'}} />
						<Text style={{color:facused ? '#182568':'#182568'}}>Profile</Text>
					</View>
				),tabBarStyle: { display: 'none' }
			}}/>
		</Tab.Navigator>
    );
}

export default Tabs;

