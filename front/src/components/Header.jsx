import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import HeaderMobile from './HeaderMobile';
import { SearchBar } from './UI/SearchBar';

// import frankFavicon32 from '/favicon-32x32.png';

export const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="bg-black p-4 top-0 flex items-center justify-between shadow-md sticky z-50">
            <div className="flex items-center">
                <Link to="/">
                    <img
                        src="./../frankenstein.png"
                        className="h-8 sm:h-10 lg:h-12 mr-2"
                        alt="Logo"
                    />
                </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-4">
                <div className="flex items-center space-x-4">
                    <Link
                        to="/projects"
                        className="text-white hover:text-[#829821]"
                    >
                        Proyectos
                    </Link>

                    <Link
                        to="/questions"
                        className="text-white hover:text-[#829821]"
                    >
                        Preguntas
                    </Link>

                    {user && (
                        <Link
                            to="/crear"
                            className="text-white hover:text-[#829821]"
                        >
                            Crear
                        </Link>
                    )}

                    {user && (
                        <Link
                            to={`/profile/${user.register_id}`}
                            className="text-white hover:text-[#829821]"
                        >
                            Cuenta
                        </Link>
                    )}

                    {/* <input
                        type="text"
                        placeholder="Buscar"
                        className="text-black bg-white px-2 py-1 rounded focus:inline focus:bg-black focus:text-white"
                    /> */}

                    <div>
                        <div>
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>

            <div className="invisible sm:visible">
                <Auth />
            </div>

            <div className="sm:hidden">
                <HeaderMobile />
            </div>
        </header>
    );
};
