import React, { useState, useEffect } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateProduct = () => {

  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({
        headerTitle: 'Agregar Producto',
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
        <TextInput placeholder="Nombre del producto" 
        onChangeText={(value) => handleChangeText('name', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Precio" 
        onChangeText={(value) => handleChangeText('precio', value)}/>
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Unidad de medida" 
        onChangeText={(value) => handleChangeText('Um', value)}/>
      </View>
      <View>
        <Button title="Guardar Producto" onPress={()=> AddNewProduct()} />
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



const Products = () => {
    return (
    <CreateProduct />
    );
}

export default Products;