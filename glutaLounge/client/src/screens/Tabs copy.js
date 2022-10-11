import React  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialIcons, Entypo,Ionicons,FontAwesome5,Foundation} from '@expo/vector-icons';
import { Text, View,TouchableOpacity} from 'react-native';

import Posts from './Posts';
import Products  from './Products';
import Account from './Account';
import OurWork from './OurWork';

import { COLORS } from './Colours';

const Tab = createBottomTabNavigator();



function Tabs() {

	const CustomTabBarButton = ({children,onPress}) => (
		<View style={{backgroundColor:COLORS.MainColorOne}} >
			<TouchableOpacity
				style={{top:-20,aligneItems:'center',justifyContent: 'center'}}
				onPress={onPress}
			>
				<View
				style={{width:55,height:55,marginTop:30, borderRadius:30,backgroundColor:COLORS.white}}
				>
						{/* <Text  style={{marginLeft:0, fontSize:18, color:'#ffffff'}}>Home</Text> */}
		
					{children}
				</View>
			</TouchableOpacity>
		</View>
	);

    return (
		<Tab.Navigator initialRouteName="Posts" screenOptions={{headerShown:false,tabBarShowLabel:false,
			tabBarStyle: {height: 70}, tabBarItemStyle:{backgroundColor:COLORS.MainColorOne},
			
		}} 
			
		>

			<Tab.Screen name="Posts" component={Posts} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						{/* <FontAwesome5 name="hospital-symbol" size={30} style={{color:COLORS.white}} /> */}
						<Text style={{color:COLORS.white,fontSize:16}}>Posts</Text>
					</View>
				),
			}} />

		

			{/* <Tab.Screen name="Products" component={Products} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:-6}}>
						<Foundation name="home" size={30} style={{color:COLORS.MainColorOne}}  />
						<Text style={{color:COLORS.white,fontSize:16}}>Products</Text>
					</View>
				),
				tabBarButton:(props)=>(<CustomTabBarButton {...props} />)
			}} /> */}

			<Tab.Screen name="Products" component={Products} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						{/* <FontAwesome5 name="hospital-symbol" size={30} style={{color:COLORS.white}} /> */}
						<Text style={{color:COLORS.white,fontSize:16}}>Products</Text>
					</View>
				),
			}} />

			
			

			<Tab.Screen name="OurWork" component={OurWork} options={{ unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						{/* <MaterialIcons name="group-work" size={30} style={{color:COLORS.white}} /> */}
						<Text style={{color:COLORS.white,fontSize:16}}>Our Work</Text>
					</View>
				)
			}} />

			<Tab.Screen name="Account" component={Account} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						{/* <FontAwesome5 name="hospital-symbol" size={30} style={{color:COLORS.white}} /> */}
						<Text style={{color:COLORS.white,fontSize:16}}>Account</Text>
					</View>
				),
			}} />

		</Tab.Navigator>
    );
}

export default Tabs;

