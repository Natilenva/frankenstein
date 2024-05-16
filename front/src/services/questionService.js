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

export const selectQuestionByIdService = async (id, token)=>{
    const res=await fetch(`${VITE_BASE_URL}/question/${id}`,{
    headers: {
        Authorization: token,
    }}
    );

    const body = await res.json();

    if(body.status==='error'){
        throw new Error(body.message);
    }

    return body.data.questionSelected;
};

export const insertQuestionService= async({
  data, token
})=>{

    const res= await fetch(`${VITE_BASE_URL}/newquestion`, {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: data,
    });

    const body= await res.json();

    return body.message;
};