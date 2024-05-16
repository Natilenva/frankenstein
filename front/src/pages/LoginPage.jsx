import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { loginUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { loginSchema } from '../../schemas/loginSchema ';
export const LoginPage = () => {
    // const { register, formState } = useForm({
    //     mode: 'onTouched',
    //     resolver: zodResolver(loginSchema),
    // });
    // const { errors, isValid } = formState;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //cargar contexto
    const { login } = useContext(AuthContext); // importo login

    //redireccionar
    const navigate = useNavigate();

    //login ---------------------------------------------------------------------------
    const handleForm = async (e) => {
        e.preventDefault();
        /* console.log({ email, password }); */
        setError('');

        try {
            const data = await loginUserService({
                email,
                register_password: password,
            });
            //console.log(data);// devuelve el token
            login(data); // click Login, ejecuto fn login (del Contexo) pasándole el token
            navigate('/');
            toast.success('Usuario logueado!');
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };
    // -------------------------------------------------------------------------------
    return (
        <section className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-2xl font-bold text-center mb-10">
                Conecta, aprende y muestra tus habilidades
            </h1>
            <h2 className="text-lg font-semibold mb-4">
                Inicia sesión con tu correo electrónico
            </h2>
            <form onSubmit={handleForm} className="w-full max-w-sm">
                <fieldset className="mb-4">
                    <label htmlFor="email" className="block mb-1">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded py-2 px-3 mb-2"
                    />
                    {/* <p className="h-4 text-sm text-rose-500">
                        {errors.email?.message}
                    </p> */}
                </fieldset>

                <fieldset className="mb-4 relative flex">
                    <label htmlFor="pass" className="block mb-1 flex-1">
                        Contraseña
                    </label>

                    <Link
                        to="/forgot-password"
                        className="text-sm text-lime-600 hover:underline mt-1 ml-auto"
                    >
                        Recuperar contraseña
                    </Link>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded py-2 px-3 mb-2"
                    />
                    {/* <p className="h-4 text-sm text-rose-500">
                        {errors.password?.message}
                    </p> */}
                </fieldset>

                <p className="text-sm text-center mb-4">
                    Al hacer clic en entrar, certifico que tengo 16 años o más y
                    acepto las condiciones de uso, la política de privacidad y
                    la política de cookies.
                </p>
                <button className="w-full bg-lime-600 text-white font-bold py-2 px-4 rounded mb-4">
                    Entrar
                </button>
                {error ? <p className="text-red-500 text-sm">{error}</p> : null}
            </form>
        </section>
    );
};
