

import  React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import Tabs from './src/screens/Tabs';


export default function App() {

    return (
        <>
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>
        </>
    );
}

// eas build -p android --profile preview
