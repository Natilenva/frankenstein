import { useParams } from 'react-router-dom';
import useQuestion from '../../hooks/QuestionsHook/useQuestion.js';
import Loading from '../../components/loading.jsx';

import ResponsesListItem from '../../components/ResponsesComponents/ResponsesListItem.jsx';
import useResponses from '../../hooks/ResponsesHook/useResponses.js';
import NewResponseForm from '../../forms/ResponseForm/NewResponseForm.jsx';

import QuestionDetailsInfo from '../../components/QuestionsComponents/QuestionDetailsInfo';
import { useState } from 'react';

const QuestionDetailsPage = () => {
    const [idResponse, setIdResponse] = useState(null);
    const { id } = useParams();

    const { responses, loading } = useResponses(id, idResponse);

    const { question } = useQuestion(id);

    return (
        <main>
            {question && (
                <>
                    <QuestionDetailsInfo
                        question_title={question.question_title}
                        question_technology={question.technology}
                        question_description={question.question_description}
                        created_at={question.created_at}
                    />

                    <NewResponseForm setIdResponse={setIdResponse} />

                    <ul className="bg-black">
                        {responses.length < 1 && loading ? (
                            <Loading />
                        ) : responses.length === 0 ? (
                            <li className="text-white">No hay respuestas</li>
                        ) : (
                            responses.map((response) => {
                                return (
                                    <ResponsesListItem
                                        key={response.response_id}
                                        response={response}
                                    />
                                );
                            })
                        )}
                    </ul>
                </>
            )}
        </main>
    );
};

export default QuestionDetailsPage;
