import { useState } from 'react';
import { registerUserService } from '../services';
import { useNavigate } from 'react-router-dom'; // hook para redirigir
import { toast } from 'react-hot-toast';
import { registerSchema } from '../../../back/src/schemas/registerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export const RegisterPage = () => {
    const navigate = useNavigate(); //hook para redirigir
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); //no esta funcionando!!!

    const { errors, isValid } = formState;

    const onSubmit = async (data) => {
        setError('');
        //* comunicarnos con la ddbb para registrar el usuario
        try {
            await registerUserService({
                email: data.email,
                register_password: data.register_password,
            });
            navigate('/login'); //hook para redirigir al login
            toast.success('Activa tu cuenta en tu mail!', { duration: 6000 });
        } catch (error) {
            toast.error(error.response?.data?.error || error.message);
            // setError(errorMessage); // Establece el mensaje de error en el estado
            // toast.error(errorMessage); // Muestra el mensaje de error en una notificación
        }
    };

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
                    className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
                >
                    <fieldset className="mb-4">
                        <label htmlFor="email" className="block mb-1">
                            Regístrate con tu correo electrónico
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full  px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            {...register('email')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.email?.message}
                        </p>
                    </fieldset>
                    <fieldset className="mb-4">
                        <label htmlFor="pass1" className="block mb-1">
                            Contraseña
                        </label>
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
                        Al hacer clic en registrarme certifico que tengo 16 años
                        o más y acepto las condiciones de uso, la política de
                        privacidad y la política de cookies.
                    </p>

                    <button
                        disabled={!isValid}
                        type="submit"
                        className="w-full bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                        Registrarme
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p> // Muestra un error personalizado si existe
                    )}
                </form>
                <div className="self-center mt-8 text-black">
                    ¿Ya tienes una cuenta?{' '}
                    <span
                        className="font-semibold text-[#829821] hover:text-[#a1bc28] cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Inicia sesión
                    </span>
                </div>
            </div>
        </main>
    );
};
