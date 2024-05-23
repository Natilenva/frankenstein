import PropType from 'prop-types';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';

import { toast } from 'react-hot-toast';

import { insertQuestionService } from '../../services/questionService';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionSchema } from '../../../schemas/questionShema';
const NewQuestionForm = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    // const [question_title, setQuestion_title] = useState('');
    // const [question_description, setQuestion_description] = useState('');
    // const [technology, setTechnology] = useState('');

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: zodResolver(questionSchema),
    });
    const onSubmit = async (data) => {
        try {
            // e.preventDefault();
            // const formData = new FormData();
            await insertQuestionService({ data, token });

            setLoading(true);

            toast.success(data);

            navigate('/questions');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="question_title">Titulo:</label>
            <input
                type="text"
                name="question_title"
                id="question_title"
                // value={question_title}
                // onChange={(e) => setQuestion_title(e.target.value)}
                {...register('question_title')}
            />
            <p className="h-4 text-sm text-rose-500">
                {errors.project_title?.message}
            </p>
            <label htmlFor="technology">Tecnologia:</label>
            <input
                type="text"
                name="technology"
                id="technology"
                // value={technology}
                // onChange={(e) => setTechnology(e.target.value)}
                // required
                {...register('technology')}
            />
            <p className="h-4 text-sm text-rose-500">
                {errors.project_description?.message}
            </p>
            <label htmlFor="question_description">Descripcion:</label>
            <input
                type="text"
                name="question_description"
                id="question_description"
                // value={question_description}
                // onChange={(e) => setQuestion_description(e.target.value)}
                // required
                {...register('question_description')}
            />
            <p className="h-4 text-sm text-rose-500">
                {errors.question_description?.message}
            </p>
            {loading ? (
                <Loading />
            ) : (
                <button disabled={loading}>Postear pregunta</button>
            )}
        </form>
    );
};

NewQuestionForm.propTypes = {
    insertQuestionService: PropType.func.isRequired,
    token: PropType.string.isRequired,
};

export default NewQuestionForm;
