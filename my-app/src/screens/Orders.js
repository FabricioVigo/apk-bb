import React, { useEffect } from 'react';
import { Text, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Orders = () => {

  useEffect(()=>{
    navigation.setOptions({
        headerTitle: 'Pedidos',
        headerStyle:{
          backgroundColor: "#0404B4"
        },
        headerTitleStyle:{
          color:"#ffffff"
        } 
    })
    StatusBar.setBarStyle('default');
})
const navigation = useNavigation();
    return(
        <>
        <Text style={styles.container}>Hola mundo</Text>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Orders;