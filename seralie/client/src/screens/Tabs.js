import React  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo,Ionicons,FontAwesome } from '@expo/vector-icons';
import { Text, View} from 'react-native';

import Ladies from './Ladies';
import Children  from './Children';
import Gents from './Gents';
import { COLORS } from './Colours';

const Tab = createBottomTabNavigator();



function Tabs() {


    return (
		<Tab.Navigator screenOptions={{headerShown:false,tabBarShowLabel:false,
			tabBarStyle: {height: 70}, tabBarItemStyle:{backgroundColor:COLORS.colourNumberOne}
		}} 
			
		>
			<Tab.Screen name="Ladies" component={Ladies} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						<Ionicons name="woman" size={30} style={{color:COLORS.white}} />
						<Text style={{color:COLORS.white,fontSize:16}}>Ladies</Text>
					</View>
				),
			}} />

			<Tab.Screen name="Children" component={Children} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						<FontAwesome name="child" size={30} style={{color:COLORS.white,marginLeft:15}} />
						<Text style={{color:COLORS.white, fontSize:16}}>Children</Text>
					</View>
				)
			}}/>
			
		
			<Tab.Screen name="Gents" component={Gents} options={{ unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						<Entypo name="man" size={30} style={{color:COLORS.white}} />
						<Text style={{color:COLORS.white,fontSize:16}}>Gents</Text>
					</View>
				)
			}} />

		</Tab.Navigator>
    );
}

export default Tabs;

