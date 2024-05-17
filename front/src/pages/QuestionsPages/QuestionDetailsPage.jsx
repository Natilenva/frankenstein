
import { useParams } from "react-router-dom";
import useQuestion from "../../hooks/QuestionsHook/useQuestion.js";
import Loading from "../../components/loading.jsx";

import ResponsesListItem from "../../components/ResponsesComponents/ResponsesListItem.jsx";
import useResponses from "../../hooks/ResponsesHook/useResponses.js";


import QuestionDetailsInfo from "../../components/QuestionsComponents/QuestionDetailsInfo";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";


const QuestionDetailsPage =()=>{


  const {token}= useContext(AuthContext);

  const {id}= useParams();


  const{responses, loading}=useResponses(id);

  const {question}= useQuestion(id, token);

  return(
    
    <main >
      {question && (
        <>
          <h2>{question.question_title}</h2>

          <QuestionDetailsInfo
            question_title={question.question_title}
            question_technology={question.technology}
            question_description={question.question_description}
            created_at={question.created_at}
            response_text={question.response_text}
          
          />
             <ul className="bg-black">
                {responses.length < 1 && loading ? (
                    <Loading/>
                ): responses.length === 0 ?(
                    <li>No hay respuestas</li>
                ):(
                    responses.map((response)=>{
                      
                        return <ResponsesListItem key={response.response_id} response={response}/>;
                       
                    })
                )}
            </ul>
         

       
        </>
        
      )}
    </main>
  );
};

export default QuestionDetailsPage;
 
  
  