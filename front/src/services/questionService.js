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
};

export const insertQuestionService= async({
    question_title,
    question_description,
    technology, 
    userId,
})=>{
    const formData = new FormData();

    formData.append('question_title', question_title);
    formData.append('question_description', question_description);
    formData.append('technology', technology);

    const res=  fetch(`${VITE_BASE_URL}/newquestion`, {
        method: 'POST',
        headers: {
            Authorization: userId,
        },
        body: formData,
    });

    const body= await res.json();

    return body.message;
};