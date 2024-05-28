import Loading from '../../components/loading';

import toast from 'react-hot-toast';
import { insertResponseService } from '../../services/responsesService';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import useQuestion from '../../hooks/QuestionsHook/useQuestion';
import { useProfile } from '../../hooks/profilehook/useProfile';

const NewResponseForm = () => {
    const navigate = useNavigate();
    const [response_text, setResponse_text] = useState('');

    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const { token, user } = useContext(AuthContext);

    const { question } = useQuestion(id, token);

    const { profile } = useProfile(user.register_id);

    const handleSubmit = async () => {
        try {
            // e.preventDefault();
            setLoading(true);

            await insertResponseService(
                response_text,
                token,
                question.question_id
            );
            console.log(token);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-grow">
            <div className="flex  md:px-6 lg:px-8 space-x-4 place-content-around">
                {profile.profile_role !== 'student' ||
                user.register_id === question.user_id ? (
                    <fieldset className="p-1">
                        <label htmlFor="response_text"></label>
                        <textarea
                            className="w-full px-3 py-2 bg-white rounded-md border border-solid border-zinc-200 text-neutral-700"
                            type="text"
                            name="response_text"
                            id="response_text"
                            value={response_text}
                            onChange={(e) => setResponse_text(e.target.value)}
                            required
                            placeholder="Responde a la pregunta"
                            rows="4"
                        />

                        {loading ? (
                            <Loading />
                        ) : (
                            <button
                                className="
                        px-1 
                        bg-frankgreen
                        hover:bg-lime-500 
                        rounded-md
                        text-white
                        font-myFontFamily
                        "
                                disabled={loading}
                            >
                                Responder
                            </button>
                        )}
                    </fieldset>
                ) : (
                    <p className="h-4 text-sm text-rose-500">
                        No tienes permiso para responder preguntas.
                    </p>
                )}
            </div>
        </form>
    );
};

export default NewResponseForm;
