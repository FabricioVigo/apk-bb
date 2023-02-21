import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Plus = ({ text, onPress})=>{

    return(

    <TouchableOpacity
        style = { styles.buttonContainer }
        onPress = { onPress }
        
        >
        <Text style={styles.textButton}>{ text }</Text>
    </TouchableOpacity>

    );
}


const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 70,
      backgroundColor: "#066EA2",
      width: 50,
      height: 50,
      fontWeigth: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton:{
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding:5,
        

    }
})

export default Plus;












