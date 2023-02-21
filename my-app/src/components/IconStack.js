import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const IconStack = ({ text, onPress, icon}) =>{
    return(
        <TouchableOpacity
        style={styles.buttonContainer}
        onPress={ onPress }>
            <Icon 
            name = { icon }
            style = {styles.icon}
            />
            <Text style={ styles.text }>{ text }</Text>
            </TouchableOpacity>
        

    );
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor: "#ffd1000",
        borderRadius: 10,
        marginBottom: 5,
        padding: 15,
        flexDirection: "row",

    },
    text:{
        marginLeft: 10,
        color: "#000"
    },
    icon:{
        fontSize:18,
        color: "#000"

    }

})

export default IconStack;
