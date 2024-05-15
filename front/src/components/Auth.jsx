import { useContext } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
    /* const {token} = useContext(AuthContext); */
    const {user, logout} = useContext(AuthContext); 

    // Si existe user: 
    return user ? (
        <>
        <p className="text-white">Logged in as {user.email} </p> 
        <div className="flex space-x-4">
            <Link 
                to="/"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded">
                {/* <button onClick={logout}>
                Cerrar sesión
                </button> */}
                
                <button onClick={() => logout()}>LogOut</button>
            </Link>
        </div>
        
        </>

    ) : (
        <ul>
            {/* <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li> */}
            {/* <li>Token: {token}</li> */}

            {/* Contenedor de los botones */}

            <div className="lg:flex lg:items-center lg:space-x-4 flex-wrap justify-end">
            {/* <div className="flex space-x-4 mt-2 lg:mt-0"> */}
                <div className="flex space-x-4">
                    <Link
                        to="/login"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                    >
                        Register
                    </Link>
                </div>             
            </div>
        </ul>       
    );

    

};