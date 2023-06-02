import { createContext, useReducer } from "react";
import { Usuario } from "../interfaces/appInterfaces";
import { AuthState, authReducer } from "./authReducer";


type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    signIn: () => void;
    logOut: () => void;
    removeError: () => void;
};



const AuthContext = createContext({} as AuthContextProps);

const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}



export const AuthProvider = ( {children}: any) => {

    const [ state, dispatch ] = useReducer(authReducer, authInitialState);

    const      signUp = () => { };


    const     signIn = () => { };


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