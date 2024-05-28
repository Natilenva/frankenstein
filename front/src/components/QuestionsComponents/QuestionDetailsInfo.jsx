// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

// Inicializamos el componente.
const QuestionDetailsInfo = ({ question_title, question_technology, question_description, created_at }) => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            toast.error('Logeate para ver más');
        }
    }, [token, navigate]);

    return (
        <main className="max-w-3xl mx-auto p-6 bg-neutral-950 rounded-xl shadow-lg mt-4 overflow-hidden">
            <ul className="space-y-4">
                <li className="text-2xl font-bold text-white truncate">
                    Pregunta: {question_title}
                </li>
                <li className="text-sm font-medium text-neutral-400 truncate">
                    Tecnología: {question_technology}
                </li>
                <li className="text-base font-normal text-neutral-200 mt-2 break-words">
                    {question_description}
                </li>
                <li className="text-xs text-neutral-500">
                    Fecha de creación: {moment(created_at).format('DD/MM/YYYY [a las] HH:mm')}
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
