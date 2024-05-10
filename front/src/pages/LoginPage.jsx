import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { loginUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
export const LoginPage = () => {
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
        <section style={{ background: '#D0ADF0' }}>
            <h1>Login</h1>
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor="pass">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>

                <button>Login</button>
                {error ? <p>{error}</p> : null}
            </form>
            <div className="flex space-x-4">
                            <Link 
                             to="/forgot-password"
                             className=" hover:bg-green-700 text-white px-4 py-1 rounded">
                            <button >
                            Recuperar contraseña
                            </button>
                            </Link>
                        </div>
        </section>
    );
};
