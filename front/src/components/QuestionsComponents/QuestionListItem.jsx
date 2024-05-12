// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los componentes.
import { Link } from 'react-router-dom';

// Inicializamos el componente.
const QuestionListItem = ({ question }) => {
    return (
        <Link to={`/question/${question.question_id}`} >
            <li>
                
                <div>
                    <div>
                        <h3>{question.question_title}</h3>

                        <p>
                            <strong>Tecnologia:</strong> {question.technology}
                        </p>

                        <p>
                             { question.question_description}
                        </p>
                    </div>
                    <div>
                        <time>
                            {moment(question.createdAt).format(
                                'DD/MM/YYYY [a las] HH:mm'
                            )}
                        </time>
                    </div>
                </div>
            </li>
        </Link>
    );
};

// Validamos las props.
QuestionListItem.propTypes = {
    question: PropType.object.isRequired,
};

export default QuestionListItem;
