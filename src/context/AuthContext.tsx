import { createContext, useReducer } from "react";
import { LoginData, LoginResponse, Usuario } from "../interfaces/appInterfaces";
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

    
    const  signIn = async({correo, password}: LoginData) => {
        try {
            
            const resp = await cafeApi.post<LoginResponse>('/auth/login', {correo, password});
            console.log(resp.data)
            
        } catch (error) { 
            console.log(error)
        }
    };

    const      signUp = () => {
      
     };


    const     logOut = () => { };


    const     removeError = () => { };    



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