const {VITE_BASE_URL}= import.meta.env;

export const selectAllResponsesByQuestionIdService= async (id)=>{
  
  const res= await fetch(`${VITE_BASE_URL}/responses/${id}`);

  const body= await res.json();
  
  if(body.status==='error'){
    throw new Error(body.message);
}

return body.respuestas;
};


export const insertResponseVoteService = async(value, response_id, token)=>{
  const res= await fetch(`${VITE_BASE_URL}/responses/${response_id}/votes`, {
    method: 'post',
    headers:{
      Authorization: token,
      'Content-Type':'application/json',
    },
    body: JSON.stringify({
      vote_value: Number(value)
    }),
  });

  const body= await res.json();

  if(body.status==='error'){
    throw new Error(body.message);
  }

  return body.data.entry.votes;
};