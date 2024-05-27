import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { loginUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { loginSchema } from '../../schemas/loginSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    AiOutlineQuestionCircle,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from 'react-icons/ai';

export const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(loginSchema),
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
        <main className="flex-grow">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold mb-4">
                    Conecta, aprende y muestra tus habilidades
                </div>
                <img
                    loading="Imagen"
                    src="../../public/franki-icono.png"
                    className="self-center mt-8 mb-10 w-20 md:w-24 lg:w-32"
                    alt="Imagen de Franki"
                />
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                >
                    <fieldset className="mb-4">
                        <label htmlFor="email" className="block mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            {...register('email')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.email?.message}
                        </p>
                    </fieldset>

                    <fieldset className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="pass" className="block mb-1">
                                Contraseña
                            </label>
                            <Link
                                to="/forgot-password"
                                className=" text-frankgreen hover:underline ml-2 block mb-1"
                            >
                                <AiOutlineQuestionCircle className="inline-block" />
                                Recuperar contraseña
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="register_password"
                                name="register_password"
                                className="w-full border rounded-md px-3 py-2 pr-10"
                                {...register('register_password')}
                            />

                            <div
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <AiOutlineEye className="text-frankgreen" />
                                ) : (
                                    <AiOutlineEyeInvisible className="text-frankgreen" />
                                )}
                            </div>
                        </div>
                        <p className="h-4 text-sm text-rose-500">
                            {errors.register_password?.message}
                        </p>
                    </fieldset>
                    <p className="text-xs text-center mt-2 mb-4">
                        Al hacer clic en entrar, certifico que tengo 16 años o
                        más y acepto las condiciones de uso, la política de
                        privacidad y la política de cookies.
                    </p>
                    <button
                        disabled={!isValid}
                        type="submit"
                        className="w-full bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                        Entrar
                    </button>
                    {error ? (
                        <p className="text-red-500 text-sm">{error}</p>
                    ) : null}
                </form>

                <div className="self-center mt-8 text-black">
                    <div className="text-center text-black mb-4">
                        ¿No tienes cuenta?{' '}
                        <Link
                            to="/register"
                            className="font-semibold text-[#829821] hover:text-[#a1bc28] cursor-pointer"
                        >
                            Regístrate
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};
