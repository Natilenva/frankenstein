
import { useState, useEffect } from 'react';


import toast from 'react-hot-toast';


import { selectQuestionByIdService } from '../../services/questionService';

const useQuestion = (question_id, token) => {
    
    const [question, setQuestion] = useState(null);

  
    useEffect(() => {
        
        const fetchQuestion = async () => {
            try {
                
                const question = await selectQuestionByIdService(question_id, token);

              
                setQuestion(question);
            } catch (err) {
                toast.error(err.message);
            }
        };

       
        fetchQuestion();
    }, [question_id, token]);

    


    return {question};

};


export default useQuestion;
