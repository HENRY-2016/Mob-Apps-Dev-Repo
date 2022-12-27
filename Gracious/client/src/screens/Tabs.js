import React  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View,TouchableOpacity} from 'react-native';

import Home  from './Home';
import Book from './BookNow';
import Safaris from './Safaris';
import About from './About';

import { COLORS } from './Colors';

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
		<Tab.Navigator initialRouteName="Home" screenOptions={{headerShown:false,tabBarShowLabel:false,
			tabBarStyle: {height: 60}, tabBarItemStyle:{backgroundColor:COLORS.MainColorOne},
		}}>

				<Tab.Screen name="Home" component={Home} options={{unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						
						backgroundColor:focused?COLORS.HoverColor:COLORS.MainColorOne,
						height:focused?40:40,width:focused?85:80,
						borderRadius: focused?50:0,marginLeft: focused?15:10,marginRight: focused?10:10,
					}}>
						<Text style={{fontWeight:focused?'bold':'',color:focused?COLORS.TabsTextActiveColor:COLORS.white,fontSize:18,marginLeft: focused?18:15,}}>Home</Text>
					</View>
				),
			}} />



			<Tab.Screen name="Safaris" component={Safaris} options={{unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						backgroundColor:focused?COLORS.HoverColor:COLORS.MainColorOne,
						height:focused?40:40,width:focused?85:90,
						borderRadius: focused?50:0,marginLeft: focused?-10:10,marginRight: focused?20:0,
						
					}}>
						<Text style={{fontWeight:focused?'bold':'', color:focused?COLORS.TabsTextActiveColor:COLORS.white,fontSize:18,marginLeft: focused?12:5,}}>Safaris</Text>
					</View>
				),
			}} />


			

			<Tab.Screen name="About" component={About} options={{unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						
						backgroundColor:focused?COLORS.HoverColor:COLORS.MainColorOne,
						height:focused?40:40,width:focused?80:80,
						borderRadius: focused?50:0,marginLeft: focused?-15:5,marginRight: focused?20:0,
					}}>
						<Text style={{fontWeight:focused?'bold':'',color:focused?COLORS.TabsTextActiveColor:COLORS.white,fontSize:18,marginLeft: focused?15:-10}}>About</Text>
					</View>
				),
			}} />
			

			<Tab.Screen name="Book" component={Book} options={{ unmountOnBlur:true,
				tabBarIcon:({focused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:0,
						backgroundColor:focused?COLORS.HoverColor:COLORS.MainColorOne,
						height:focused?40:40,width:focused?108:95,
						borderRadius: focused?50:0,marginLeft: focused?-10:10,marginRight: focused?20:20,
					}}>
						<Text style={{fontWeight:focused?'bold':'',color:focused?COLORS.TabsTextActiveColor:COLORS.white,fontSize:18,marginLeft: focused?10:-10,marginRight: focused?15:15} }>Book Now</Text>
					</View>
				)
			}} />
		</Tab.Navigator>
    );
}

export default Tabs;

