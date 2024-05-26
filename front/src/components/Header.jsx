import { Link } from 'react-router-dom';
import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import HeaderMobile from './HeaderMobile';
import { SearchBar } from './SearchComponents/SearchBar';


export const Header = () => {
    const { user } = useContext(AuthContext);

    return (
        <header className="bg-black p-4 top-0 flex items-center justify-between shadow-md sticky">
            {/* Logo en el lado izquierdo */}
            <div className=" items-center">
                <Link to="/">
                    <img
                        src="./../frankenstein.png"
                        className="h-8 lg:h-10 mr-2"
                        alt="Logo"
                    />
                </Link>
            </div>
            {/* <Auth /> */}
            {/* Menú y botones en el lado derecho */}
            <div className="lg:flex lg:items-center lg:space-x-4 flex-wrap justify-start">
                {/* Contenedor del menú */}
                <div className="hidden lg:flex lg:items-center lg:space-x-4 flex-wrap justify-end">
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
                            Mi Cuenta
                        </Link>
                    )}

                    <div>
                        <div >
                            <SearchBar/>
                           
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='invisible sm:visible'>
                <Auth />
            </div>

            <div className="sm:hidden">
                <HeaderMobile />
            </div>
           
        </header>
    );
};
