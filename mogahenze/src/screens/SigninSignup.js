
import  React  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "./Signup";
import Products from "./Products";

const Stack = createNativeStackNavigator();

function SigninSignup () 
{
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Signup" component={Signup} />
            {/* <Stack.Screen name="Products" component={Products} /> */}
            {/* <Products/> */}
        </Stack.Navigator>
    );
}

export default SigninSignup;

