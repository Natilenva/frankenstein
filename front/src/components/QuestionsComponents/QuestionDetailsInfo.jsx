// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

import { useContext } from 'react';
import toast from 'react-hot-toast';


// Inicializamos el componente.
const QuestionDetailsInfo = ({ question_title, question_technology, question_description, created_at }) => {
    
    const {token}= useContext(AuthContext);


    const navigete= useNavigate();

    if(!token){
        navigete('/login')
        toast.error('Logeate para ver más')
    }
    
    return (
        <main  className="m-1 p-1  mx-auto rounded-xl shadow-lg   bg-neutral-950">
        <ul className="pt-4 pb-4">
          
            <li className=" text-lg font-bold leading-tight text-white">
                Pregunta: {question_title}
            </li>
            <li  className="text-xs font-normal text-neutral-500">
                Tecnologia: {question_technology}
            </li>
            <li className="text-sm font-medium mt-2 text-neutral-200">
               {question_description}
            </li>
            
            <li className="text-xs text-neutral-500">
                Fecha de creación:
                {moment(created_at).format('DD/MM/YYYY [a las] HH:mm')}
            </li>
        </ul>
     

        </main>
     
    );
};

// Validamos las props.
QuestionDetailsInfo.propTypes = {
    question_title: PropType.string.isRequired,
    question_technology: PropType.string.isRequired,
    question_description: PropType.string.isRequired,
    created_at: PropType.string.isRequired,

};

export default QuestionDetailsInfo;
