
import { useParams } from "react-router-dom";
import useQuestion from "../../hooks/QuestionsHook/useQuestion.js";


import QuestionDetailsInfo from "../../components/QuestionsComponents/QuestionDetailsInfo";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const QuestionDetailsPage =()=>{

  const {token}= useContext(AuthContext);

  const {id}= useParams();

  const {question}= useQuestion(id, token);

  return(
    <main>
      {question && (
        <>
          <h2>{question.question_title}</h2>

          <QuestionDetailsInfo
            question_title={question.question_title}
            question_technology={question.question_technology}
            question_description={question.question_description}
            createdAt={question.created_at}
            
          
          />
        </>
      )}
    </main>
  );
};

export default QuestionDetailsPage;
 
  
  