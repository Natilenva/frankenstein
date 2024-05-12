import { Link } from "react-router-dom";
import useQuestions from "../../hooks/QuestionsHook/useQuestions.js";

import Loading from "../../components/loading";
import SearchForm from "../../forms/QuestionsForms/SearchQuestionForm";
import QuestionListItem from "../../components/QuestionsComponents/QuestionListItem";

const QuestionsPage=()=>{
    const{
        questions,
        setSearchParams,
        prevPage,
        currentPage,
        nextPage,
        loading,
    }= useQuestions();

    return(
        <main>
            <h2>Preguntas</h2>

            <SearchForm setSearchParams={setSearchParams} loading={loading}/>

            <div className="lg:flex lg:items-center lg:space-x-4 flex-wrap justify-start">
                <div className="lg:flex lg:items-center lg:space-x-4 flex-wrap justify-end">
                        <Link
                            to="/questions/newquestion"
                            className="text-black hover:text-red-300 bg-green-500"
                        >
                            Hacer una pregunta
                        </Link>
                </div>
            </div>

            <ul>
                {questions.length < 1 && loading ? (
                    <Loading/>
                ): questions.length === 0 ?(
                    <li>No se han encontrado preguntas</li>
                ):(
                    questions.map((question)=>{
                        console.log(question);
                        return <QuestionListItem key={question.question_id} question={question}/>;
                       
                    })
                )}
            </ul>
            
            <div >
                <button
                   
                    onClick={() => {
                        // Establecemos el query param con la página previa.
                        setSearchParams(
                            new URLSearchParams({
                                page: prevPage,
                            })
                        );
                    }}
                    disabled={!prevPage}>
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
                    disabled={!nextPage}>
                    ▶️
                </button>
            </div>

        </main>
    )
}

export default QuestionsPage;