import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Buttons from './UI/Buttons/Buttons';

export const Auth = () => {
    const { user, logout } = useContext(AuthContext);

    return user ? (
        <div>
            <Buttons text="Salir" id="logout" onClick={() => logout()} />
        </div>
    ) : (
        <div className="flex space-x-4">
            {/* <Buttons text="Entrar" id="login" onClick={() => logout()} /> */}
            <Link
                to="/login"
                className="bg-[#829821]  hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
            >
                Entrar
            </Link>
            {/* <Buttons text="Registrarme" id="register" onClick={() => logout()} /> */}
            <Link
                to="/register"
                className="bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
            >
                Registrate
            </Link>
        </div>
    );
};
