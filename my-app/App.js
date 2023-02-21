import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerMenu from './src/navigation/Drawer';
import AddClient from './src/screens/AddClient'
import AddProduct from './src/screens/AddProduct';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
<NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name='Drawer' options={{headerShown:false}} component={ DrawerMenu } />
      <Stack.Screen name='AddClient' component={ AddClient } />
      <Stack.Screen name='AddProduct' component={ AddProduct } />

      </Stack.Navigator>


</NavigationContainer>
  );

  }
