import PropType from 'prop-types';

import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const ResetPasswordForm= ()=>{
    const [password, setPassword]= useState('');
    const [repeatPassword, setRepeatPassword]= useState('')
    const {authRP}= useContext(AuthContext)

    const handleSubmit = (e)=>{
        e.preventDefault();
        authRP(password, repeatPassword)
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Nueva Contraseña</label>
                <input 
                    type="text"
                    id='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required />

                <label htmlFor="password">Repita la Contraseña</label>
                <input 
                    type="text"
                    id='rpassword'
                    value={repeatPassword}
                    onChange={(e)=>setRepeatPassword(e.target.value)}
                    required />

                <button>Enviar</button>
            </form>
        
        </>
    )

};


ResetPasswordForm.propTypes={
    authRP: PropType.node.isRequired
};

export default ResetPasswordForm;