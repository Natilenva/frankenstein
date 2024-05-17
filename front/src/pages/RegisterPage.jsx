import { useState } from 'react';
import { registerUserService } from '../services';
import { useNavigate } from 'react-router-dom'; // hook para redirigir
import { toast } from 'react-hot-toast';

import { registerSchema } from '../../schemas/registerSchema';
export const RegisterPage = () => {
    const navigate = useNavigate(); //hook para redirigir

    //un estado para cada campo
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    //const [pass2, setPass2] = useState("");

    /* const [error, setError] = useState("cualquier cosa aqui para mostrar"); */
    const [error, setError] = useState(''); //para mostrar el error con data de la API

    const handleForm = async (e) => {
        e.preventDefault();
        setValidationErrors({});
        setError(''); //para borrar el error anterior, si lo hubiera, cuando envío el form(se hace el submit)

        // comprueba q las passwords de los 2 campos coincidan
        /* if (pass1 !== pass2) {
            setError("Passwords do not match");
            return;
        } */
        //console.log("email: ", email, "pass1: ", pass1, "pass2: ", pass2);

        //* comunicarnos con la ddbb para registrar el usuario
        try {
            const validationResult = registerSchema.safeParse({ email, pass1 });
            if (!validationResult.success) {
                const errors = {};
                validationResult.error.issues.forEach((err) => {
                    errors[err.path[0]] = err.message;
                });
                setValidationErrors(errors);
                return;
            }
            //await registerUserService({ email, password: pass1 });
            await registerUserService({ email, register_password: pass1 });
            navigate('/login'); //hook para redirigir al login
            toast.success('Activa tu cuenta en tu mail!', { duration: 6000 });
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-center mb-4">
                Conecta, aprende y muestra tus habilidades
            </h1>
            <h2 className="text-lg font-semibold mb-4">
                Regístrate con tu correo electrónico
            </h2>
            {/* <p>Aquí irá el formulario de registro</p> */}
            {/* <form> */}
            <form noValidate onSubmit={handleForm} className="w-full max-w-sm">
                <fieldset className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border rounded-md px-3 py-2"
                        /* value={email} */
                        required
                        //un event en cada input para q cuando actualice el campo se actualice el estado
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {validationErrors.email && (
                        <p className="h-4 text-sm text-rose-500">
                            {validationErrors.email}
                        </p>
                    )}
                </fieldset>
                <fieldset className="mb-4">
                    <label htmlFor="pass1" className="block mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="pass1"
                        name="pass1"
                        className="w-full border rounded-md px-3 py-2"
                        /* value={pass1} */
                        required
                        onChange={(e) => setPass1(e.target.value)}
                    />
                    {validationErrors.email && (
                        <p className="h-4 text-sm text-rose-500">
                            {validationErrors.email}
                        </p>
                    )}
                </fieldset>
                <p className="text-sm text-center mb-4">
                    Al hacer clic en registrarte certifico que tengo 16 años o
                    más y acepto las condiciones de uso, la política de
                    privacidad y la política de cookies.
                </p>
                <button
                    type="submit"
                    className="w-full bg-lime-600 text-white px-4 py-2 rounded-md"
                >
                    Registrarte
                </button>
                {error ? (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                ) : null}{' '}
                {/* si hay error, mostrarlo */}
            </form>
        </section>
    );
};
