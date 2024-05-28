import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { validateRegisterService } from '../services/userService';
import { toast } from 'react-hot-toast';
// import { FaRegCheckCircle } from 'react-icons/fa';

export const ValidatePage = () => {
    const { registrationCode } = useParams();

    const [error, setError] = useState(null);
    useEffect(() => {
        try {
            validateRegisterService(registrationCode);
            toast.success('Tu cuenta ya está activada!');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    }, [registrationCode]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <form className="flex flex-col items-center bg-white p-8  max-w-lg w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold mb-4">
                    ¡Bienvenido a nuestra plataforma!
                </h1>
                <img
                    loading="Imagen"
                    src="../../public/franki-icono.png"
                    className="self-center mt-8 mb-10 w-20 sm:w-24 lg:w-32"
                    alt="Imagen de Franki"
                />
                <p className="text-center mb-4 mx-4">
                    Tú usuario ha sido validado correctamente
                </p>

                <p className="text-center mb-4 mx-4">
                    Antes de comenzar, necesitamos un poco más de información.
                    Esto nos ayudará a personalizar tu experiencia en la
                    plataforma y a proporcionarte contenido relevante.
                </p>

                <Link
                    className="w-40 bg-frankgreen text-white font-bold text-center py-2 px-4 rounded mb-4 hover:text-[#a1bc28] transition-colors"
                    to="/"
                >
                    Comencemos
                </Link>
                <h4 className="text-center">
                    Soporte:{' '}
                    <a
                        href="mailto:frankensteinhack2024@gmail.com"
                        className="text-blue-600 underline"
                    >
                        frankensteinhack2024@gmail.com
                    </a>
                </h4>
                {error ? (
                    <p className="text-red-500 mt-4">{error}</p>
                ) : (
                    <p className="text-white mt-4"></p>
                )}
            </form>
        </div>
    );
};
