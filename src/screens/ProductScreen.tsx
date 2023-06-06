import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { useCategorias } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route }: Props) => {


  const [selectedLanguage, setSelectedLanguage] = useState();

  const { name= '', id= '' } = route.params;

  const { categories } = useCategorias();
  const { loadProductById } = useContext(ProductsContext)

  const { _id, categoriaId, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: ''
  })

  const navigation = useNavigation();



 useEffect(() => {
  navigation.setOptions({
    title: (name) ? name : 'Nuevo Producto'
  })
 }, []);

 useEffect(() => {
  loadProduct()
 }, [])

 const loadProduct = async() => {
  if(id.length === 0 ) return;
   const product = await loadProductById(id);
  setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre
  })

 }



  return (
    <View style={styles.container}>
        <ScrollView>

          <Text style={styles.label}>Nombre del producto:</Text>
          <TextInput
            placeholder='Producto'
            style={styles.textInput}
            value={nombre}
            onChangeText={(value) => onChange(value, 'nombre')}
          />

          {/* Picker */}
          <Text style={styles.label}>Categoria:</Text>

          <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
              >

                {
                  categories.map(cat => (
                    <Picker.Item 
                        label={cat.nombre} 
                        value={cat._id}
                        key={cat._id}
                    />

                  ))
                }
             
          </Picker>


          <Button
            title='Guardar'
            onPress={() => {}}
            color='#5856D6'
          />

          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>

              <Button
                title='Camara'
                onPress={() => {}}
                color='#5856D6'
              />
              <View style={{width: 10,}} />

              <Button
                title='Galeria'
                onPress={() => {}}
                color='#5856D6'
              />

          </View>

            <Text>
              {JSON.stringify(form, null, 5)}
            </Text>


        </ScrollView>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20
  },
  label: {
    fontSize: 18
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15
  }
})
