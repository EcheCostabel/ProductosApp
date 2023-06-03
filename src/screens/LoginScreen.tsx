import React, { useContext } from 'react';
import { Text, View, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native' ;
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any, any> {}

export const LoginScreens = ({navigation}: Props) => {

  const { signIn } = useContext(AuthContext)

  const { email, onChange, password } = useForm({
    email: '',
    password: ''
  });

  const onLogin = ( ) => {
    console.log({email, password});
    Keyboard.dismiss();

    signIn({correo: email, password})
  };


  return (
    <>
        {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={( Platform.OS === 'ios') ? 'padding': 'height'}
      >


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
          
          onChangeText={(value) => onChange(value.toString(), 'email')}
          value={email}
          onSubmitEditing={onLogin}

          autoCapitalize='none'
          autoCorrect={false}
        />



        

        <Text style={loginStyles.label}>Contraseña:</Text>
        <TextInput
          placeholder='********'
          placeholderTextColor='rgba(255,255,255,0.4)'
          underlineColorAndroid='white'
          secureTextEntry
          style={[
            loginStyles.inputField,
            (Platform.OS === 'ios') && loginStyles.inputFieldIos
          ]}
          selectionColor='white'

          onChangeText={(value) => onChange(value.toString(), 'password')}
          value={password}
          onSubmitEditing={onLogin}

          autoCapitalize='none'
          autoCorrect={false}
        />


        {/* Boton Login */}

        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={loginStyles.button}
            onPress={onLogin}
          > 
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Crear una nueva cuenta */}

        <View style={loginStyles.newUserContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('RegisterScreen')}
          >
            <Text style={loginStyles.buttonText}>Crear cuenta </Text>

          </TouchableOpacity>
        </View>
        
      </View>
      </KeyboardAvoidingView>

    </>
  )
};
