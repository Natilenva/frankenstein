import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { validateRegisterService } from '../services/userService';
import { toast } from 'react-hot-toast';

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
        <form className="flex flex-col items-center h-screen mt-12">
            <h1 className="text-2xl font-bold text-center mb-10">
                Usuario validado correctamente
            </h1>
            <p className="text-sm  mb-4 mx-10">
                Frankenstein es una Red Social diseñada para fomentar la
                colaboración, el aprendizaje y el crecimiento profesional entre
                creativos y desarrolladores (su modalidad es: conecta, aprende y
                muestra tus habilidades). Ofrece una variedad de herramientas y
                funciones diseñadas para ayudar a los usuarios a mostrar su
                trabajo creativo, conectarse con otros profesionales del sector,
                explorar oportunidades laborales y expandir su red de contactos.
            </p>
            <p>Gracias por tu tiempo.</p>
            <p>Atentamente: Equipo Frankenstein</p>
            <Link
                className="w-40 bg-lime-600 text-white font-bold text-center m-4  py-2 px-4 rounded mb-4"
                to="http://localhost:5173/login"
            >
                Entra
            </Link>
            <h4>
                Soporte:{' '}
                <a href="mailto:frankensteinhack2024@gmail.com">
                    frankensteinhack2024@gmail.com
                </a>
            </h4>
            {error ? <p>{error}</p> : <p>Activando tu cuenta...</p>}
        </form>
    );
};
