
import { useState, useEffect } from 'react';


import toast from 'react-hot-toast';


import { selectQuestionByIdService } from '../../services/questionService';

const useQuestion = (question_id) => {
    
    const [question, setQuestion] = useState(null);

  
    useEffect(() => {
        
        const fetchQuestion = async () => {
            try {
                
                const question = await selectQuestionByIdService(question_id);
               

              
                setQuestion(question);
            } catch (err) {
                toast.error(err.message);
            }
        };

       
        fetchQuestion();
    }, [question_id]);

    


    return {question};

};


export default useQuestion;
