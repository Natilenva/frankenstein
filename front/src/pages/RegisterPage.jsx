import { useState } from 'react';
import { registerUserService } from '../services';
import { useNavigate } from 'react-router-dom'; // hook para redirigir

export const RegisterPage = () => {
    const navigate = useNavigate(); //hook para redirigir

    //un estado para cada campo
    const [email, setEmail] = useState('');
    const [pass1, setPass1] = useState('');
    //const [pass2, setPass2] = useState("");

    /* const [error, setError] = useState("cualquier cosa aqui para mostrar"); */
    const [error, setError] = useState(''); //para mostrar el error con data de la API

    const handleForm = async (e) => {
        e.preventDefault();
        setError(''); //para borrar el error anterior, si lo hubiera, cuando envío el form(se hace el submit)

        // comprueba q las passwords de los 2 campos coincidan
        /* if (pass1 !== pass2) {
            setError("Passwords do not match");
            return;
        } */
        //console.log("email: ", email, "pass1: ", pass1, "pass2: ", pass2);

        //* comunicarnos con la ddbb para registrar el usuario
        try {
            //await registerUserService({ email, password: pass1 });
            await registerUserService({ email, register_password: pass1 });
            navigate('/login'); //hook para redirigir al login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section>
            <h1>Register</h1>
            {/* <p>Aquí irá el formulario de registro</p> */}
            {/* <form> */}
            <form onSubmit={handleForm}>
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        /* value={email} */
                        required
                        //un event en cada input para q cuando actualice el campo se actualice el estado
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="pass1">Password</label>
                    <input
                        type="password"
                        id="pass1"
                        name="pass1"
                        /* value={pass1} */
                        required
                        onChange={(e) => setPass1(e.target.value)}
                    />
                </fieldset>
                <button>Register</button>
                {error ? <p>{error}</p> : null} {/* si hay error, mostrarlo */}
            </form>
        </section>
    );
};
