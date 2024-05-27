import PropType from 'prop-types';

import { useState } from 'react';
import { ResetPassword } from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-hot-toast';

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const { id, token } = useParams();
    const navigate = useNavigate();

    const updatePassword = async (id, token, password, password2) => {
        if (password === password2) {
            try {
                await ResetPassword(id, token, password, password2);
                toast.success('contraseña restablecida');
                navigate('/login');
            } catch (err) {
                toast.error(err.message);
            }
        } else {
            toast.error('las contraseñas no coinciden');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updatePassword(id, token, password, password2);
    };

    return (
        <main className="flex-grow ">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold m-8">Cambio de contraseña </h1>
                <form noValidate onSubmit={handleSubmit}   className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                    <fieldset className="mb-4">
                        <label htmlFor="password" className="block mb-4">Nueva Contraseña</label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </fieldset>
                    <div className='mb-4'>
                    <label htmlFor="password2"  className="block mb-4">Repita la Contraseña</label>
                    <input
                         className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                        type="text"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                    </div>

                    <button  className="w-full px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4">Enviar</button>
                </form>
            </div>
        </main>
    );
};

ResetPasswordForm.propTypes = {
    authRP: PropType.node.isRequired,
};

export default ResetPasswordForm;
