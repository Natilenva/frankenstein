import { Link } from "react-router-dom";
import useQuestions from "../../hooks/QuestionsHook/useQuestions.js";
import { useState } from "react";
import Loading from "../../components/loading";
import SearchForm from "../../forms/QuestionsForms/SearchQuestionForm";
import QuestionListItem from "../../components/QuestionsComponents/QuestionListItem";
import { FaSearch } from "react-icons/fa";



const QuestionsPage=()=>{
    const{
        questions,
        setSearchParams,
        prevPage,
        currentPage,
        nextPage,
        loading,
    }= useQuestions();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
       
        <main>
           
        <div className="flex gap-3 self-center px-3 pt-3.5 mt-2 leading-[133%] ">
       
        </div>
        <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-frankgreen p-2"
            >
                {<FaSearch className=" text-3xl hover:text-frankgreen" />}
            </button>
     

            {isOpen && (<SearchForm setSearchParams={setSearchParams} loading={loading}/>)
}
            <div className=" p-4">
                        <Link
                            to="/questions/newquestion"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4"
                        >
                            Hacer una pregunta
                        </Link>
                        </div>
          
            <div className="bg-black">
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
            </div>    
           
              
        </main>
      
    )
}

export default QuestionsPage;