import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const HeaderMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="lg:hidden">
            <button
                onClick={toggleMenu}
                className="text-white hover:text-gray-300"
            >
                ☰
            </button>
            {isOpen && (
                <div className="bg-black absolute top-16 right-0 w-full">
                    <div className="flex flex-col items-center justify-center py-4">
                        {user ? (
                            <Link
                                to={`/profile/${user.register_id}`}
                                className="text-white hover:text-gray-300 my-2"
                            >
                                Mi Cuenta
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-white hover:text-gray-300 my-2"
                                    onClick={toggleMenu}
                                >
                                    Iniciar Sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-white hover:text-gray-300 my-2"
                                    onClick={toggleMenu}
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                        <Link
                            to="/projects"
                            className="text-white hover:text-gray-300 my-2"
                            onClick={toggleMenu}
                        >
                            Proyectos
                        </Link>
                        <Link
                            to="/questions"
                            className="text-white hover:text-gray-300 my-2"
                            onClick={toggleMenu}
                        >
                            Preguntas
                        </Link>
                        <div className="visible">
                            <Auth />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderMobile;
