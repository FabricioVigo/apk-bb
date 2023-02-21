import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';

import "react-native-gesture-handler"

import HomeScreen from '../screens/HomeScreen';
import MenuButtonItem from '../components/MenuButtonItem';


const Drawer = createDrawerNavigator();



export default function DrawerMenu() {
  return (
    
    
        
        <Drawer.Navigator initialRouteName='Homescreen'
        drawerContent = {(props)=> <MenuItems {...props} />}
        >
            <Drawer.Screen name='Home' component={HomeScreen} />

        </Drawer.Navigator>
        
    
  );
}

const MenuItems = ({ navigation })=>{
    return(
        <DrawerContentScrollView
        style={ styles.container }>
            <Text style={ styles.title }>Mi menu</Text>
            <MenuButtonItem 
            icon="home"
            text="Home"
            onPress = {()=> navigation.navigate('Home')}
            />
        </DrawerContentScrollView>
    )}

    const styles= StyleSheet.create({
        container:{
            padding:15,
            backgroundColor: "#066EA2"
        },
         /* #7f00b8 */
        title:{
            fontSize:20,
            fontWeight:'bold',
            marginBottom: 20,
            color: "#fff"
        },
        products:{
            marginTop: 25,
            marginBottom:10,
            fontWeight:'bold',
            fontSize:18,
            color:"#fff"
        }
    })