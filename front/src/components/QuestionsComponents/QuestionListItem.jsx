// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';

// Importamos los componentes.
import { Link } from 'react-router-dom';



// Inicializamos el componente.
const QuestionListItem = ({ question }) => {

    return (
   

        <section className="flex pt-4 pb-4" >

            <div className="shrink-0 ">❓</div>

            <Link to={`/question/${question.question_id}`} >

                <div className='text-white'>
                    <h3 className=" text-lg font-bold leading-tight text-white">{question.question_title}</h3>

                    <p className="text-sm font-medium mt-2">
                            { question.question_description}
                    </p>



                    <p className="text-xs font-normal text-neutral-500">
                        Tecnologia: {question.technology}
                    </p>

                 
                    <time className="text-xs text-neutral-500">
                        {moment(question.created_at).format(
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
