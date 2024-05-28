// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los componentes.
import { Link } from 'react-router-dom';

// Inicializamos el componente.
const QuestionListItem = ({ question }) => {
    return (
        <section className="flex flex-col md:flex-row items-start md:items-center p-4 bg-neutral-900 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-neutral-800">
            <div className="shrink-0 text-3xl mr-4 md:mr-6 text-[#829821]">❓</div>

            <Link to={`/question/${question.question_id}`} className="flex-1 text-white no-underline">
                <h3 className="text-lg md:text-xl font-bold leading-tight text-white break-words">
                    {question.question_title}
                </h3>
                <p className="text-sm md:text-base font-medium mt-2 break-words">
                    {question.question_description}
                </p>
                <p className="text-xs md:text-sm font-normal text-neutral-400 mt-1">
                    Tecnología: {question.technology}
                </p>
                <time className="text-xs md:text-sm text-neutral-400 mt-1">
                    {moment(question.created_at).format('DD/MM/YYYY [a las] HH:mm')}
                </time>
            </Link>
        </section>
    );
};

// Validamos las props.
QuestionListItem.propTypes = {
    question: PropType.object.isRequired,
};

export default QuestionListItem;
