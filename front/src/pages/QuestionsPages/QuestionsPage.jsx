
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
       
        <main >
           
        <div className="flex gap-3 self-center px-3 pt-3.5 mt-2 leading-[133%] ">
       
        </div>
     

           <SearchForm setSearchParams={setSearchParams} loading={loading}/>

            <div className=" p-4">
                   
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
        
            
            <div   className="flex justify-between text-[#829821]"  >
          
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