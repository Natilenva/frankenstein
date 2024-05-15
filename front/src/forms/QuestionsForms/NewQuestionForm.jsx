import PropType from 'prop-types';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';

import {toast} from 'react-hot-toast';

import { insertQuestionService } from '../../services/questionService';
import { AuthContext } from '../../context/AuthContext';

const NewQuestionForm = ()=>{
    const navigate= useNavigate();
    const {token}= useContext(AuthContext);

    const [question_title, setQuestion_title]= useState('');
    const [question_description, setQuestion_description]= useState('');
    const [technology, setTechnology]= useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit= async (e)=>{

        try {
            e.preventDefault();
            const data= new FormData(e.target);
            await insertQuestionService({data , token})


        setLoading(true);


        toast.success(data);

        navigate('/questions')
            
        } catch (err) {
            toast.error(err.message)
        }finally{
            setLoading(false);
        }

    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="question_title">Titulo:</label>
            <input 
                type="text"
                name='question_title'
                id='question_title'
                value={question_title}
                onChange={(e)=>setQuestion_title(e.target.value)} 
                required />

            <label htmlFor="technology">Tecnologia:</label>
            <input 
                type="text"
                name='technology'
                id='technology'
                value={technology}
                onChange={(e)=>setTechnology(e.target.value)} 
                required />

             <label htmlFor="question_description">Descripcion:</label>
            <input 
                type="text"
                name='question_description'
                id='question_description'
                value={question_description}
                onChange={(e)=>setQuestion_description(e.target.value)} 
                required />

            {loading?(
                <Loading/>
            ) : (
                <button disabled={loading}>Postear pregunta</button>
            )}


        </form>
    )



};


NewQuestionForm.propTypes={
    insertQuestionService: PropType.func.isRequired,
    token: PropType.string.isRequired,
};

export default NewQuestionForm;