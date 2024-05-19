import { Link } from 'react-router-dom';
import { Auth } from './Auth';
// import { useProfile } from '../hooks/profilehook/useProfile';
//import HeaderMobile from './HeaderMobile';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import HamburgerMenuNoCssTw from './HamburgerMenuNoCssTw';

export const Header = () => {
    const { user } = useContext(AuthContext);
    // const { profile } = useProfile();
    // console.log(user.register_id);
    return (
        <header className="bg-black p-4 top-0 w-full lg:p-8 flex items-center justify-between shadow-md">
            {/* Logo en el lado izquierdo */}
            <div className="flex items-center">
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

                    <input
                        type="text"
                        placeholder="Buscar"
                        className="text-white bg-gray-800 px-2 py-1 rounded focus:outline-none focus:bg-gray-900"
                    />
                </div>
            </div>
            
            <div className='invisible sm:visible'>
                <Auth />
            </div>
            
            {/* <HeaderMobile /> */}

            <div className="sm:hidden">
                <HamburgerMenuNoCssTw  />
                {/* <main style={{ padding: '20px' }}>
                    <h1 style={{ color: '#333' }}>Welcome to My Website</h1>
                    <p style={{ color: '#666' }}>Click the hamburger menu to navigate.</p>
                </main> */}
            </div>

            
        </header>
    );
};
