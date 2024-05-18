import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { loginUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginSchema } from '../../schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
export const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { errors, isValid } = formState;
    //cargar contexto
    const { login } = useContext(AuthContext); // importo login

    //redireccionar
    const navigate = useNavigate();

    //login ---------------------------------------------------------------------------
    const onSubmit = async (data) => {
        setError('');

        try {
            const responseData = await loginUserService({
                email: data.email,
                register_password: data.register_password,
            });
            //console.log(data);// devuelve el token
            login(responseData); // click Login, ejecuto fn login (del Contexo) pasándole el token

            navigate('/');

            toast.success('Usuario logueado!');
        } catch (error) {
            setError(error.message);
            toast.error(error.response?.data?.error || error.message);
        }
    };
    // -------------------------------------------------------------------------------
    return (
        <section className="flex flex-col justify-center items-center h-screen px-4 sm:px-0">
            <h1 className="text-2xl font-bold text-center mb-8">
                Conecta, aprende y muestra tus habilidades
            </h1>
            <h2 className="text-lg font-semibold mb-4">
                Inicia sesión con tu correo electrónico
            </h2>
            <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm"
            >
                <fieldset className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full border rounded py-2 px-3 mb-2"
                        {...register('email')}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.email?.message}
                    </p>
                </fieldset>

                <fieldset className="mb-4 flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="pass" className="block mb-1">
                            Contraseña
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-sm text-[#829821] hover:underline ml-2"
                        >
                            Recuperar contraseña
                        </Link>
                    </div>
                    <input
                        type="password"
                        name="register_password"
                        id="register_password"
                        className="w-full border rounded py-2 px-3 mb-2"
                        {...register('register_password')}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.register_password?.message}
                    </p>
                </fieldset>

                <p className="text-sm text-center mb-4">
                    Al hacer clic en entrar, certifico que tengo 16 años o más y
                    acepto las condiciones de uso, la política de privacidad y
                    la política de cookies.
                </p>

                <button
                    disabled={!isValid}
                    className="w-full bg-[#829821] text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Entrar
                </button>
                {error ? <p className="text-red-500 text-sm">{error}</p> : null}
            </form>
        </section>
    );
};
