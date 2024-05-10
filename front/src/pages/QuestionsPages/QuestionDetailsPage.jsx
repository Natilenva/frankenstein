
import { useParams } from "react-router-dom";
import useQuestion from "../../hooks/QuestionsHook/useQuestion.js";


import QuestionDetailsInfo from "../../components/QuestionsComponents/QuestionDetailsInfo";

const QuestionDetailsPage =()=>{

  const {question_id}= useParams();

  const {question}= useQuestion(question_id);

  return(
    <main>
      {question && (
        <>
          <h2>{question.question_title}</h2>

          <QuestionDetailsInfo
            question_technology={question.question_technology}
            question_description={question.question_description}
            createdAt={question.createdAt}
            
          
          />
        </>
      )}
    </main>
  );
};

export default QuestionDetailsPage;
 
  
  