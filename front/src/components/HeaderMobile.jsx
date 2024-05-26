import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { SearchBar } from './SearchComponents/SearchBar';

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
                className="text-white hover:text-frankgreen p-2"
            >
                {<AiOutlineMenu className=" text-3xl hover:text-frankgreen" />}
            </button>

            {isOpen && (
                <div className="bg-black absolute top-16 right-0 w-full">
                    <div className="flex flex-col items-center justify-center py-4">

                        <SearchBar/>

                        {user && (
                            <Link
                                to="/crear"
                                className="text-white hover:text-frankgreen my-2"
                            >
                                Crear
                            </Link>
                        )}

                        {user ? (
                            <Link
                                to={`/profile/${user.register_id}`}
                                className="text-white hover:text-frankgreen my-2"
                            >
                                Mi Cuenta
                            </Link>
                        ) : null}

                        <Link
                            to="/projects"
                            className="text-white hover:text-frankgreen my-2"
                            onClick={toggleMenu}
                        >
                            Proyectos
                        </Link>
                        <Link
                            to="/questions"
                            className="text-white hover:text-frankgreen my-2"
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
