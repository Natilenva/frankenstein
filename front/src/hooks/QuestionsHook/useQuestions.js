import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";

import { selectAllQuestionsService } from "../../services/questionService";


const useQuestions = () => {

    const[questions, setQuestions]= useState([]);

    const [searchParams, setSearchParams]= useSearchParams();

    const [prevPage, setPrevPage]= useState(null);
    const [currentPage, setCurrentPage]= useState(null);
    const [nextPage, setNextPage]= useState(null);

    const [loading, setLoading]= useState(false);

    useEffect(()=>{
        const fetchQuestions= async ()=>{
            try {
                setLoading(true);

                const {questions, prevPage, nextPage, currentPage}= await selectAllQuestionsService(searchParams);

                setQuestions(questions);
                
                setPrevPage(prevPage);
                setNextPage(nextPage);
                setCurrentPage(currentPage);
                
            } catch (err) {
                toast.error(err.message)
              
        }finally{
            setLoading(false);
        }
            
    }
    fetchQuestions()
}, [searchParams]);

    return{
        questions,
        setSearchParams,
        prevPage,
        currentPage,
        nextPage,
        loading,
    };

};

export default useQuestions;
