import PropType from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { createContext, useEffect, useState } from 'react';


//contexto global, objeto global de contexto
export const AuthContext = createContext();

import toast from 'react-hot-toast';

import { forgotPassword } from '../services/userService';




//componente normal de React
//para envolver nuestra app en el proveedor de contexto 
/* export const AuthProviderComponent = () => {
    return <p>este es el proveedor de contexto</p>
} */


//componente de React con children q viene de main.jsx
/* export const AuthProviderComponent = ({children}) => {
    return children;
} */


//AuthContext.Provider es el proveedor de contexto
/* export const AuthProviderComponent = ({children}) => {
    return <AuthContext.Provider> {children} </AuthContext.Provider> ;
} */


/* export const AuthProviderComponent = ({children}) => {
    const [color, setColor] = useState("green");
    //toda la lógica aquí se la pasamos al provider como value 
    //toda la app podría leer este value 
    return <AuthContext.Provider value={{color}}> {children} </AuthContext.Provider> ;
} */
//para acceder a este value en cualquier componente, ej. voy a Header
// a través de un hook useContext() 


export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [authLoading, setAuthLoading]= useState(false);

    //const [token, setToken] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    //cada vez q cambie el token, se ejecuta el useEffect
    useEffect(() => {
        /* setToken(localStorage.getItem("token")); */
        localStorage.setItem("token", token);
    }, [token]);

    const authFP= async(email)=>{
        try {
            const message= await forgotPassword(email);
            toast.success(message);
            navigate('/')
        } catch (err) {
            toast.error(err.message);
        }
    };



    // TODO Qué info queremos guardar además del token, la info del usuario ?



    return (
        <AuthContext.Provider
         value={{
            token,
             setToken,
             authFP,
             authLoading,
             setAuthLoading
            }}> 
            {children} 
        </AuthContext.Provider> 
    );    
};

AuthProvider.propTypes={
    children: PropType.node.isRequired,
};



