import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useNavigation } from '@react-navigation/native';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{}

export const ProductScreen = ({ route }: Props) => {

  const navigation = useNavigation()

  const { name= '', id } = route.params;


 useEffect(() => {
  navigation.setOptions({
    title: (name) ? name : 'Nuevo Producto'
  })
 }, [])

  return (
    <View>
        <Text>{id} {name}</Text>
    </View>
  )
}
