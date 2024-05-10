import PropType from 'prop-types';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';

import {toast} from 'react-hot-toast';

const NewQuestionForm = ({insertQuestionService, token})=>{
    const navigate= useNavigate();

    const [question_title, setQuestion_title]= useState('');
    const [question_description, setQuestion_description]= useState('');
    const [technology, setTechnology]= useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit= async (e)=>{

        try {
            e.preventDefault();

        setLoading(true);
        

        const message= await insertQuestionService({
            question_title,
            question_description,
            technology,
            token,
        });

        toast.success(message);

        navigate('/')
            
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