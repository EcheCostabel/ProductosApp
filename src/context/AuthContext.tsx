import { createContext, useEffect, useReducer } from "react";
import { LoginData, LoginResponse, Usuario } from "../interfaces/appInterfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState, authReducer } from "./authReducer";
import cafeApi from "../api/cafeApi";


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    signIn: ( loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
};



export const AuthContext = createContext({} as AuthContextProps);

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}



export const AuthProvider = ( {children}: any) => {

    const [ state, dispatch ] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async( ) => {
       const token = await  AsyncStorage.getItem('token');

       //Si no tengo el token entonces dispatch del noAuthenticated
       if(!token) return dispatch({type: 'notAuthenticated'});

       //Si hay token
        const resp = await cafeApi.get('/auth');
        if(resp.status !== 200) {
            dispatch({type: 'notAuthenticated'})
        }

        await AsyncStorage.setItem('token', resp.data.token)

       dispatch({
        type: 'signUp',
        payload: {
            token: resp.data.token,
            user: resp.data.usuario
        }
    })
           
    }

    
    const  signIn = async({correo, password}: LoginData) => {
        try {
            
            const resp = await cafeApi.post<LoginResponse>('/auth/login', {correo, password});
            dispatch({
                type: 'signUp',
                payload: {
                    token: resp.data.token,
                    user: resp.data.usuario
                }
            })

            await AsyncStorage.setItem('token', resp.data.token)
            
        } catch (error) { 
            console.log(error);
            dispatch({
                type: 'addError',
                payload: 'Informacion incorrecta'
            })
        }
    };

    const signUp = () => {
      
     };


    const logOut = async() => { 

        await AsyncStorage.removeItem('token')
        dispatch({type: 'logout'})

     };


    const removeError = () => { 
        dispatch({type: 'removeError'})
    };    



    return (
        <AuthContext.Provider value={{   
            ...state, 
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}