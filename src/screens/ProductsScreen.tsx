import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, Text,StyleSheet,TouchableOpacity, RefreshControl, } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigator/ProductsNavigator';
import { useNavigation } from '@react-navigation/native';


interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}





export const ProductsScreen = () => {

  const navigation = useNavigation()
  const [ isRefreshing, setIsRefreshing ] = useState(false)
  const { products, loadProducts } = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          activeOpacity={0.5}
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('ProductScreen', {}) }
        >
          <Text>Agregar</Text>

        </TouchableOpacity>
      )
    })
  }, [])

  const loadProductsFromBackend = async() => {
      setIsRefreshing(true);
      await loadProducts()
      setIsRefreshing(false)
  }

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
        <FlatList 
          data={products}
          keyExtractor={(p) => p._id}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre
              })}
            >
              <Text style={styles.productName}>{item.nombre}</Text>
            </TouchableOpacity>
          )}

          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          refreshControl={
          <RefreshControl 
              refreshing={isRefreshing}
              onRefresh={loadProductsFromBackend}
          />}
        />
    </View>
  )
}


const styles = StyleSheet.create({
    productName: {
      fontSize: 20
    },
    itemSeparator: {
      borderBottomWidth: 2,
      marginVertical: 5,
      borderBottomColor: 'rgba(0,0,0,0.1)'
    }
})