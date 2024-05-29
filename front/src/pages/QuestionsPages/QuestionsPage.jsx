import useQuestions from '../../hooks/QuestionsHook/useQuestions.js';

import Loading from '../../components/loading';
import SearchForm from '../../forms/QuestionsForms/SearchQuestionForm';
// import QuestionListItem from '../../components/QuestionsComponents/QuestionListItem';
import { QuestionCard } from '../../components/QuestionsComponents/QuestionCard.jsx';

const QuestionsPage = () => {
    const {
        questions,
        setSearchParams,
        prevPage,
        currentPage,
        nextPage,
        loading,
    } = useQuestions();

    return (
        <main className="flex-grow">
            <div className="flex gap-3 self-center px-3 pt-3.5 mt-2 leading-[133%] "></div>

            <SearchForm setSearchParams={setSearchParams} loading={loading} />

            <div className=" p-4"></div>

            <div className="bg-black">
                <div className="flex justify-between text-[#829821]">
                    <button
                        onClick={() => {
                            // Establecemos el query param con la página previa.
                            setSearchParams(
                                new URLSearchParams({
                                    page: prevPage,
                                })
                            );
                        }}
                        disabled={!prevPage}
                    >
                        ◀️
                    </button>

                    <span>{currentPage}</span>
                    <button
                        onClick={() => {
                            // Establecemos el query param con la página previa.
                            setSearchParams(
                                new URLSearchParams({
                                    page: nextPage,
                                })
                            );
                        }}
                        disabled={!nextPage}
                    >
                        ▶️
                    </button>
                </div>
                <ul className=" mb-20">
                    {questions.length < 1 && loading ? (
                        <Loading />
                    ) : questions.length === 0 ? (
                        <li>No se han encontrado preguntas</li>
                    ) : (
                        questions.map((question) => {
                            return (
                                <li
                                    key={question.question_id}
                                    className="flex-grow  px-8 py-4 bg-neutral-950"
                                >
                                    <QuestionCard
                                        key={question.question_id}
                                        question={question}
                                    />
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </main>
    );
};

export default QuestionsPage;
