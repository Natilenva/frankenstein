// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los componentes.
import { Link } from 'react-router-dom';



// Inicializamos el componente.
const QuestionListItem = ({ question }) => {

    return (
    <section>
         <div className="flex gap-2 self-center mt-3.5 w-full max-w-[305px]">
        <div className="justify-center items-center px-1.5 my-auto w-8 h-8 text-xl leading-8 text-center text-white whitespace-nowrap rounded-2xl bg-white bg-opacity-10 text-ellipsis">
            ❓
        </div>
        <div className="flex flex-col flex-1 px-5">
        <Link to={`/question/${question.question_id}`} >
            <li>
                
                <div>
                    <div>
                        <h3 className="text-sm leading-5 text-white underline">{question.question_title}</h3>

                        <p className="text-xs leading-4 text-white text-opacity-50">
                            <strong>Tecnologia:</strong> {question.technology}
                        </p>

                        <p className="text-xs leading-4 text-white text-opacity-50">
                             { question.question_description}
                        </p>
                    </div>
                    <div className="text-xs leading-4 text-white text-opacity-50">
                        <time>
                            {moment(question.createdAt).format(
                                'DD/MM/YYYY [a las] HH:mm'
                            )}
                        </time>
                    </div>
                </div>
            </li>
        </Link>
        </div>
        </div>

    </section>
    );
};

// Validamos las props.
QuestionListItem.propTypes = {
    question: PropType.object.isRequired,
};

export default QuestionListItem;
