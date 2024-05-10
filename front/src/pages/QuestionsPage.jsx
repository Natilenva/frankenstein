// import { Link } from "react-router-dom";
import useQuestions from "../hooks/useQuestions";

import Loading from "../components/loading";
import SearchForm from "../forms/SearchQuestionForm";
import QuestionListItem from "../components/QuestionListItem";

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

            <ul>
                {questions.length < 1 && loading ? (
                    <Loading/>
                ): questions.length === 0 ?(
                    <li>No se han encontrado preguntas</li>
                ):(
                    questions.map((question)=>{
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