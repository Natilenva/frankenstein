import PropTypes from 'prop-types';

import { QuestionProfile } from './QuestionProfile';

//recibe una prop, un array de objetos
export const QuestionsListProfile = ({ questionsProfile }) => {
    return questionsProfile.length ? (
        <main>
            <h1>Mis consultas</h1>
            <ul className="flex">
                {questionsProfile.map((questionProfile) => (
                    <li key={questionProfile.question_id}>
                        <QuestionProfile questionProfile={questionProfile} />
                    </li>
                ))}
            </ul>
        </main>
    ) : (
        <p>There are no questions yet ... </p>
    );
};
QuestionsListProfile.propTypes = {
    questionsProfile: PropTypes.array,
    // removeProjectProfile: PropTypes.func,
};
