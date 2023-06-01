import React from 'react';
import { Text, View, TextInput, Platform, TouchableOpacity } from 'react-native' ;
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';

export const LoginScreens = () => {
  return (
    <>
        {/* Background */}
        <Background />

      <View style={loginStyles.formContainer}>

        {/* Keyboard avoid view */}
        <WhiteLogo />

        <Text style={loginStyles.title}>Login</Text>

        <Text style={loginStyles.label}>Email:</Text>
        <TextInput
          placeholder='Ingrese su email'
          placeholderTextColor='rgba(255,255,255,0.4)'
          keyboardType='email-address'
          underlineColorAndroid='white'
          style={[
            loginStyles.inputField,
            (Platform.OS === 'ios') && loginStyles.inputFieldIos
          ]}
          selectionColor='white'
          
          // Onchange, value

          autoCapitalize='none'
          autoCorrect={false}
        />



        

        <Text style={loginStyles.label}>Contraseña:</Text>
        <TextInput
          placeholder='********'
          placeholderTextColor='rgba(255,255,255,0.4)'
          underlineColorAndroid='white'
          style={[
            loginStyles.inputField,
            (Platform.OS === 'ios') && loginStyles.inputFieldIos
          ]}
          selectionColor='white'

          // Onchange, value

          autoCapitalize='none'
          autoCorrect={false}
        />


        {/* Boton Login */}

        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
          > 
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Crear una nueva cuenta */}

        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('press')}
          >
            <Text style={loginStyles.buttonText}>Crear cuenta </Text>

          </TouchableOpacity>
        </View>
      </View>
    </>
  )
};
