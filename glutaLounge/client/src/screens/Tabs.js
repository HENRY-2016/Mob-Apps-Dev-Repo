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
			tabBarStyle: {height: 60}, tabBarItemStyle:{backgroundColor:COLORS.MainColorOne},
		}}>

				<Tab.Screen name="Posts" component={Posts} options={{unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						backgroundColor:focused?COLORS.cardColor :COLORS.MainColorOne,
						height:focused?40:40,width:focused?70:70,
						borderRadius: focused?50:0,
					}}>
						<Text style={{color:COLORS.white,fontSize:16,marginLeft: focused?13:0,}}>Posts</Text>
					</View>
				),
			}} />

			<Tab.Screen name="Products" component={Products} options={{unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						backgroundColor:focused?COLORS.cardColor :COLORS.MainColorOne,
						height:focused?40:40,width:focused?95:95,
						borderRadius: focused?50:0,marginLeft: focused?-25:0,
					}}>
						<Text style={{color:COLORS.white,fontSize:16,marginLeft: focused?13:0,}}>Products</Text>
					</View>
				),
			}} />

			<Tab.Screen name="OurWork" component={OurWork} options={{ unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						backgroundColor:focused?COLORS.cardColor :COLORS.MainColorOne,
						height:focused?40:40,width:focused?95:95,
						borderRadius: focused?50:0,marginLeft: focused?-25:0,
					}}>
						<Text style={{color:COLORS.white,fontSize:16,marginLeft: focused?13:0,}}>Our Work</Text>
					</View>
				)
			}} />

			<Tab.Screen name="Account" component={Account} options={{unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						backgroundColor:focused?COLORS.cardColor :COLORS.MainColorOne,
						height:focused?40:40,width:focused?95:95,
						borderRadius: focused?50:0,marginLeft: focused?-10:0,
					}}>
						<Text style={{color:COLORS.white,fontSize:16,marginLeft: focused?13:0,}}>Account</Text>
					</View>
				),
			}} />

		</Tab.Navigator>
    );
}

export default Tabs;

