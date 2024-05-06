/* export const LoginPage = () =>{
    return (
      <section>
          <h1>Login</h1>
          <p>Formulario de Login</p>
      </section>
    )
  } */

import { useContext, useState } from 'react';
import { loginUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    //cargar contexto
    const { setToken } = useContext(AuthContext);
    // const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault();
        /* console.log({ email, password }); */
        setError('');

        try {
            const data = await loginUserService({
                email,
                register_password: password,
            });
            console.log(data); // devuelve el token

            setToken(data);
            // login(data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section style={{ background: 'orange', border: '4px dotted red' }}>
            <h1>Login</h1>
            {/* <p>Aquí irá el formulario de Login</p> */}
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
        </section>
    );
};
