import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";

//* Crear contexto global --------------------------------------------- 

export const AuthContext = createContext(); // objeto del contexto 

export const AuthProviderComponent = ({children}) => {
    // const [token, setToken] = useState(null);
    
    // inicializa token 
    const [token, setToken] = useState(localStorage.getItem("token"));

    // inicializa user
    const [user, setUser] = useState(null);
    

    // guarda token en localStorage
    useEffect(() => {
        /* setToken(localStorage.getItem("token")); */
        localStorage.setItem("token", token);
    }, [token]);


    // Carga data de user, setear user con su info 
    useEffect(() => { 
        const getUserData = async () => {

            try {
                const data = await getMyUserDataService({token});
                setUser(data);
            } catch (error) {
                logout();
            }
            
        }
        if (token) getUserData();
    }, [token]);

    // login 
    const login = (token) => {
        setToken(token);
    };

    // logout
    const logout = () => {
        setToken("");
        setUser(null);
    };

    //exportamos al Context: token, user, login, logout
    return (
        <AuthContext.Provider value={{token, user, login, logout}}> 
            {children} 
        </AuthContext.Provider> 
    );    
};



