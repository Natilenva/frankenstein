const {VITE_BASE_URL}= import.meta.env;

export const selectAllQuestionsService= async (searchParams) =>{
    const res=await fetch(`${VITE_BASE_URL}/questions?${searchParams}`);
    console.log(res);

    const body = await res.json();

    if(body.status==='error'){
        throw new Error(body.message);
    }

    return body.data;
};

export const selectQuestionByIdService = async (question_id)=>{
    const res=await fetch(`${VITE_BASE_URL}/question/${question_id}`);

    const body = await res.json();

    if(body.status==='error'){
        throw new Error(body.message);
    }

    return body.data.question;
}