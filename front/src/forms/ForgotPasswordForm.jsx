import PropType from 'prop-types';

import { useState } from 'react';

import toast from 'react-hot-toast';


const ForgotPasswordForm=(mail)=>{
    const [email, setEmail] = useState('');

    const handleSubmit = (e)=>{
        try {
            e.preventDefault();     
            toast.success('Email enviado')
            mail(email)
        } catch (error) {
            toast.error('Ha ocurrido un problema')
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' value={email} onChange={(e)=> setEmail(e.target.value)} autoComplete='email' required/>
            <button >Enviar</button>
        </form>
       
    );

};

ForgotPasswordForm.propTypes={
    mail: PropType.func.isRequired,
};

export default ForgotPasswordForm;