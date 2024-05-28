import PropType from 'prop-types';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';

import { toast } from 'react-hot-toast';

import { insertQuestionService } from '../../services/questionService';
import { AuthContext } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { questionSchema } from '../../../schemas/questionSchema';
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
            //  setSending(true);
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }

            const question = await insertQuestionService({
                data: formData,
                token,
            });
            console.log(question);
            setLoading(true);

            // toast.success(data);
            toast.success('Pregunta creada exitosamente');

            navigate('/questions');
        } catch (err) {
            console.log(err);
            toast.error('Ha habido un problema al agregar la pregunta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex-grow mb-11">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold m-8">
                    Nueva pregunta
                </h1>
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full max-w-xs md:max-w-sm lg:max-w-md"
                >
                    <label htmlFor="question_title" className="block mb-4">
                        Titulo:
                    </label>
                    <input
                        className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                        type="text"
                        name="question_title"
                        id="question_title"
                        // value={question_title}
                        // onChange={(e) => setQuestion_title(e.target.value)}
                        // required
                        {...register('question_title')}
                    />
                    <p className="h-4 text-sm text-rose-500">
                        {errors.question_title?.message}
                    </p>
                    <div className="mb-4">
                        <label htmlFor="technology" className="block mb-1">
                            Tecnologia:
                        </label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            name="technology"
                            id="technology"
                            // value={technology}
                            // onChange={(e) => setTechnology(e.target.value)}
                            // required
                            {...register('technology')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.tecnology?.message}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="question_description"
                            className="block mb-4"
                        >
                            Descripcion:
                        </label>
                        <textarea
                            className="w-full px-3  bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            name="question_description"
                            id="question_description"
                            rows="4"
                            // value={question_description}
                            // onChange={(e) =>
                            //     setQuestion_description(e.target.value)
                            // }
                            // required
                            {...register('question_description')}
                        />
                        <p className="h-4 text-sm text-rose-500">
                            {errors.question_description?.message}
                        </p>
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                            className="w-full px-4 py-3 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4"
                            disabled={loading}
                        >
                            Postear pregunta
                        </button>
                    )}
                </form>
            </div>
        </main>
    );
};

NewQuestionForm.propTypes = {
    insertQuestionService: PropType.func.isRequired,
    token: PropType.string.isRequired,
};

export default NewQuestionForm;
