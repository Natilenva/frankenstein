import PropType from 'prop-types';
//import moment from 'moment';
import { Link } from 'react-router-dom';
export const QuestionCard = ({ question }) => {
    //console.log('PersonQuestionCard, question: ', question);
    return (
        <article className="flex pt-4 pb-4"> {/* p-4 gap-4  */}
            
            <div className="shrink-0 ">
                {/* <img 
                    className="h-12 w-12 rounded-full" 
                    src="https://source.unsplash.com/random/face" 
                    alt="img"
                ></img>  */}
                ❓
            </div>

            <Link to={`/question/${question.question_id}`} >
            <div>
                <h1 className=" text-lg font-bold leading-tight text-white"> {question.question_title}</h1>             
                <p className="text-sm font-medium mt-2 text-neutral-200">{ question.question_description}</p>
                <p className="text-xs font-normal text-neutral-500">Tecnologia: { question.technology}</p>
                <time className="text-xs text-neutral-500">           
                    {/* {moment(question.createdAt).format(
                        'DD/MM/YYYY [a las] HH:mm'
                    )} */}
                    {new Date(question.created_at).toLocaleDateString()}
                </time>
            </div>
            </Link>

        </article> 
    );
};
/* <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4"> */
QuestionCard.propTypes = {
    question: PropType.object.isRequired,
};