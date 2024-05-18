import { useState } from 'react';
import { registerUserService } from '../services';
import { useNavigate } from 'react-router-dom'; // hook para redirigir
import { toast } from 'react-hot-toast';
import { registerSchema } from '../../../back/src/schemas/registerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
export const RegisterPage = () => {
    const navigate = useNavigate(); //hook para redirigir
    const { register, handleSubmit, formState } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(registerSchema),
    });

    const [error, setError] = useState('');

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
                        id="email"
                        name="email"
                        className="w-full border rounded-md px-3 py-2"
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
                    <input
                        type="password"
                        id="register_password"
                        name="register_password"
                        className="w-full border rounded-md px-3 py-2"
                        {...register('register_password')}
                    />

                    <p className="h-4 text-sm text-rose-500">
                        {errors.register_password?.message}
                    </p>
                </fieldset>
                <p className="text-xs text-center mb-4">
                    Al hacer clic en registrarme certifico que tengo 16 años o
                    más y acepto las condiciones de uso, la política de
                    privacidad y la política de cookies.
                </p>
                <button
                    disabled={!isValid}
                    type="submit"
                    className="w-full bg-[#829821] text-white px-4 py-2 rounded-md"
                >
                    Registrarme
                </button>
                {error ? (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                ) : null}{' '}
                {/* si hay error, mostrarlo */}
            </form>
        </section>
    );
};
