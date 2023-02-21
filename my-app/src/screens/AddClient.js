import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateUsers = () => {

  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({
        headerTitle: 'Agregar Cliente',
        headerStyle:{
          backgroundColor: "#066EA2"
        },
        headerTitleStyle:{
          color:"#ffffff"
        }
    })
})
  return(
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Nombre del cliente" 
        onChangeText={(value) => handleChangeText('name', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Direccion del cliente" 
        onChangeText={(value) => handleChangeText('direccion', value)}/>
      </View>
      <View>
        <Button title="Guardar Cliente" onPress={()=> AddNewUser()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:35,
  },
  inputGroup: {
    flex: 1,
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
});



const Clientes = () => {
    return (
    <CreateUsers />
    );
}

export default Clientes;