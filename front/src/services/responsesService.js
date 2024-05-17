const {VITE_BASE_URL}= import.meta.env;

export const selectAllResponsesByQuestionIdService= async (id)=>{

  const res= await fetch(`${VITE_BASE_URL}/responses/${id}`);

  const body= await res.json();
  
  if(body.status==='error'){
    throw new Error(body.message);
}

return body.respuestas;
}