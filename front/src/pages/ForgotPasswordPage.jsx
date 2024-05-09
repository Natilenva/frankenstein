import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from 'react-hot-toast';

// import ForgotPasswordForm from "../forms/ForgotPasswordForm";
const ForgotPasswordPage=()=>{
    const {authFP}= useContext(AuthContext);
    const [email, setEmail] = useState('');

    const handleSubmit = (e)=>{
        try {
            e.preventDefault();     
            toast.success('Email enviado')
           authFP(email)
        } catch (error) {
            console.error('Ha ocurrido un problema')
        }
    };
    return(
        <main>
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' value={email} onChange={(e)=> setEmail(e.target.value)} autoComplete='email' required/>
            <button >Enviar</button>
        </form>  
        
        </main>
    )
};




export default ForgotPasswordPage;

