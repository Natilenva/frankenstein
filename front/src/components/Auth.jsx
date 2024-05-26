import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {

    const { user, logout } = useContext(AuthContext);

    return user ? (

            <div >
                <Link
                    to="/"
                    className="bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
                >
                    <button onClick={() => logout()}>Salir</button>
                </Link>
            </div>

    ) : (
        <div className="flex space-x-4">
            <Link
                to="/login"
                className="bg-[#829821]  hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
            >
                Entrar
            </Link>
            <Link
                to="/register"
                className="bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
            >
                Registrate
            </Link>
        </div>
    );
};
