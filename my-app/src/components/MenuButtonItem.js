import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const MenuButtonItem = ({ text, onPress, icon}) =>{
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
        color: "#fff"
    },
    icon:{
        fontSize:18,
        color: "#f1f1f1"

    }

})

export default MenuButtonItem;
