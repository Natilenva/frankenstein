import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
    /* const {token} = useContext(AuthContext); */
    const { user, logout } = useContext(AuthContext);
    //const isMobile = window.innerWidth <= 680;

    /*  const renderAuthButtons = () => {
        if (!isMobile) {
            return (
                <div className="lg:flex lg:items-center lg:space-x-4 flex-wrap justify-end">
                    <Link
                        to="/login"
                        className="bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
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
        } else {
            return null; // No renderizar botones de entrada y registro en dispositivos móviles
        }

        return <>{renderAuthButtons()}</>;
    }; */

    return user ? (
        <>
            <p className="text-white">Logged in as {user.email} </p>
            <div className="flex space-x-4">
                <Link
                    to="/"
                    className="bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-1 rounded"
                >
                    <button onClick={() => logout()}>Salir</button>
                </Link>
            </div>
        </>
    ) : (
        <ul>
            <div className="lg:flex lg:items-center lg:space-x-4 flex-wrap justify-end">
                {/* <div className="flex space-x-4 mt-2 lg:mt-0"> */}
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
            </div>
        </ul>
    );
};
