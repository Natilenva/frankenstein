import PropType from 'prop-types';

import { useState } from 'react';
import { ResetPassword } from '../services/userService';
import { useNavigate, useParams } from 'react-router-dom';

import {toast} from 'react-hot-toast';

const ResetPasswordForm= ()=>{
    const [password, setPassword]= useState('');
    const [password2, setPassword2]= useState('');
    const {id, token} = useParams();
    const navigate= useNavigate();    
 
    const updatePassword= async (id, token, password, password2)=>{
        if(password===password2){
        try {
            await ResetPassword(id, token, password, password2);
            toast.success('contraseña restablecida')
            navigate('/login');
            
        } catch (err) {
            toast.error(err.message);
        }
        }else{
        toast.error('las contraseñas no coinciden')
         }
    }
   
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        updatePassword(id, token, password, password2);
      
      
    };

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="password">Nueva Contraseña</label>
                <input 
                    type="text"
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required />

                <label htmlFor="password2">Repita la Contraseña</label>
                <input 
                    type="text"
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={(e)=>setPassword2(e.target.value)}
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