// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los componentes.
import { Link } from 'react-router-dom';



// Inicializamos el componente.
const QuestionListItem = ({ question }) => {

    return (
      </div>

        <section className="flex gap-2" >

            <div className="flex gap-2">❓</div>

            <Link to={`/question/${question.question_id}`} >

                <div className='text-white'>
                    <h3 className="text-sm leading-5 underline">{question.question_title}</h3>

                    <p className="text-xs leading-4  text-opacity-50">
                        <strong>Tecnologia:</strong> {question.technology}
                    </p>

                    <p className="text-xs leading-4  text-opacity-50">
                            { question.question_description}
                    </p>

                    <time className="text-xs leading-4  text-opacity-50">
                        {moment(question.createdAt).format(
                            'DD/MM/YYYY [a las] HH:mm'
                        )}
                    </time>


                </div>

            </Link>

        </section>
    );
};

// Validamos las props.
QuestionListItem.propTypes = {
    question: PropType.object.isRequired,
};

export default QuestionListItem;
