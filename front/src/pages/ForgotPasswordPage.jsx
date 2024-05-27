import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// import ForgotPasswordForm from "../forms/ForgotPasswordForm";
const ForgotPasswordPage = () => {
    const { authFP } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            toast.success('Email enviado');
            authFP(email);
            navigate('/');
        } catch (error) {
            toast.error('Ha ocurrido un problema');
        }
    };
    return (
        <main className="flex-grow">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-center text-black font-semibold m-6">
                    Recuperar contraseña
                </div>
                <form
                    noValidate
                    onSubmit={handleSubmit}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md m-6"
                >
                    <fieldset className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="email" className="block mb-1 mx-3">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                        </div>
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-[#829821] hover:bg-[#a1bc28] text-white px-4 py-2 rounded-md cursor-pointer m-6"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </main>
    );
};

export default ForgotPasswordPage;
