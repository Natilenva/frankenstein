import PropTypes from 'prop-types';

// import { QuestionProfile } from './QuestionProfile';
import { QuestionCard } from './QuestionCard';

//recibe una prop, un array de objetos
export const QuestionsListProfile = ({ questionsProfile }) => {
    return questionsProfile.length ? (
        <section className="w-full">
            <ul className="flex flex-col flex-wrap justify-evenly">
                {questionsProfile.map((questionProfile) => (
                    <li
                        key={questionProfile.question_id}
                        className="flex-grow  px-8 py-4 bg-neutral-950"
                        style={{ flexBasis: '30%' }}
                    >
                        <QuestionCard question={questionProfile} />
                    </li>
                ))}
            </ul>
        </section>
    ) : (
        <p>Todavía no has hecho ninguna consulta... </p>
    );
};
QuestionsListProfile.propTypes = {
    questionsProfile: PropTypes.array,
};
