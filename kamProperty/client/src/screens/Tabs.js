import React  from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {MaterialIcons,FontAwesome5,Foundation} from '@expo/vector-icons';
import { Text, View,TouchableOpacity,Image} from 'react-native';
import Services from './Services';
import About from './About';
// import Customers  from './Customers';
// import Testimony from './Testimony';

import ImageAbout from '../imgs/about.png';
import ImageServices from '../imgs/services.png';
// import ImageTestimony from '../imgs/testimony.png';
// import ImageCustomers from '../imgs/customers.png';

import { COLORS } from './Colours';

const Tab = createBottomTabNavigator();



function Tabs() {

	const CustomTabBarButton = ({children,onPress}) => (
		<View style={{backgroundColor:COLORS.colourNumberOne}} >
			<TouchableOpacity
				style={{top:-20,aligneItems:'center',justifyContent: 'center'}}
				onPress={onPress}
			>
				<View
				style={{width:55,height:55,marginTop:30, borderRadius:30,backgroundColor:COLORS.white}}
				>
						{/* <Text  style={{marginLeft:0, fontSize:18, color:'#ffffff'}}>Services</Text> */}
		
					{children}
				</View>
			</TouchableOpacity>
		</View>
	);

    return (
		<Tab.Navigator screenOptions={{headerShown:false,tabBarShowLabel:false,
			tabBarStyle: {height: 70}, tabBarItemStyle:{backgroundColor:COLORS.colourNumberOne},
			
		}} 			
		>
			

		

			<Tab.Screen name="Services" component={Services} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						{/* <FontAwesome5 name="hospital-symbol" size={30} style={{color:COLORS.white}} /> */}
						<Image source={ImageServices} style={{width: 35, height: 35,marginLeft:10}} />
						<Text style={{color:COLORS.white,fontSize:16}}>Services</Text>
					</View>
				),
			}} />

			{/* <Tab.Screen name="Customers" component={Customers} options={{unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						<Image source={ImageCustomers} style={{width: 35, height: 35,marginLeft:20}} />
						<Text style={{color:COLORS.white,fontSize:16}}>Customers</Text>
					</View>
				),
			}} />
			 */}

		


			<Tab.Screen name="About" component={About} options={{ unmountOnBlur:true,
				tabBarIcon:({facused}) =>(
					<View style={{aligneItems:'center',justifyContent: 'center',top:3}}>
						<Image source={ImageAbout} style={{width: 33, height: 33,marginLeft:5}} />
						<Text style={{color:COLORS.white,fontSize:16}}>About</Text>
					</View>
				)
			}} />

		</Tab.Navigator>
    );
}

export default Tabs;

