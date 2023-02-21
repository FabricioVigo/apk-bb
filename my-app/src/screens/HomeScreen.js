import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
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

export default HomeScreen;