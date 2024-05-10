// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';


// Inicializamos el componente.
const QuestionDetailsInfo = ({ question_title, question_technology, question_description, createdAt }) => {
    return (
        <ul>
            <li>
                <strong>Pregunta:</strong> {question_title}
            </li>
            <li>
                <strong>Tecnologia:</strong> {question_technology}
            </li>
            <li>
               {question_description}
            </li>
            
            <li>
                <strong>Fecha de creación:</strong>
                {moment(createdAt).format('DD/MM/YYYY [a las] HH:mm')}
            </li>
        </ul>
    );
};

// Validamos las props.
QuestionDetailsInfo.propTypes = {
    question_title: PropType.string.isRequired,
    question_technology: PropType.string.isRequired,
    question_description: PropType.string.isRequired,
    createdAt: PropType.string.isRequired,
};

export default QuestionDetailsInfo;