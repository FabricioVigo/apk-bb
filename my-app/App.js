import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import AddClient from './src/screens/AddClient'
import AddProduct from './src/screens/AddProduct';
import { BottomTab } from './src/navigation/BottomTab';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='BottomTab' options={{headerShown:false}} component={ BottomTab } />
      <Stack.Screen name='AddClient' component={ AddClient } />
      <Stack.Screen name='AddProduct' component={ AddProduct } />

      </Stack.Navigator>


</NavigationContainer>
  );

  }
