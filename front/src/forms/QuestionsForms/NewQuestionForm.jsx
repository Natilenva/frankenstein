import PropType from 'prop-types';

import { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Loading from '../../components/loading';

import { toast } from 'react-hot-toast';

import { insertQuestionService } from '../../services/questionService';
import { AuthContext } from '../../context/AuthContext';

const NewQuestionForm = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const [question_title, setQuestion_title] = useState('');
    const [question_description, setQuestion_description] = useState('');
    const [technology, setTechnology] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const data = new FormData(e.target);
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
        <main className="flex-grow">
            <div className="flex flex-col items-center justify-center m-auto md:px-6 lg:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-black font-semibold m-8">
                    Nueva pregunta
                </h1>
                <form
                    onSubmit={handleSubmit}
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
                        value={question_title}
                        onChange={(e) => setQuestion_title(e.target.value)}
                        required
                    />
                    <div className="mb-4">
                        <label htmlFor="technology" className="block mb-1">
                            Tecnologia:
                        </label>
                        <input
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            name="technology"
                            id="technology"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                            required
                        />
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
                            value={question_description}
                            onChange={(e) =>
                                setQuestion_description(e.target.value)
                            }
                            required
                        />
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-frankgreen border border-transparent rounded-md shadow-sm hover:bg-frankgreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-frankgreen disabled:opacity-50 mb-4"
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
