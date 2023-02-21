 import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'


import HomeScreen from '../screens/HomeScreen';
import ProductFormScreen from '../screens/ProductFormScreen'
import AddRegister from '../screens/AddRegister'
import Orders from '../screens/Orders'

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
    <Tab.Navigator
        screenOptions = {({ route }) =>({
            tabBarIcon:({ focused, color, size })=>{
                let iconName = '';
                color = focused ? '#0404B4' : '#A9A9A9';
                switch (route.name){
                    case 'home':
                iconName = 'home';

                break;
                case 'nuevo':
                    iconName = 'plus';
                   
                    break;
                case 'stock':
                    iconName = 'folder';

                    break;
                    case 'Orders':
                    iconName = 'book';
                    
                    break;
                    
                }
                return <Icon name={iconName} size={size} color={color} />
            }

        })}
        >
        <Tab.Screen name="home" component= { HomeScreen } /> 
        <Tab.Screen name= 'nuevo' component= { AddRegister } />
        <Tab.Screen name= 'stock' component= { ProductFormScreen } />
        <Tab.Screen name= 'Orders' component= { Orders } />



        </Tab.Navigator>
        
    );
}