import Loading from '../../components/loading';

import toast from 'react-hot-toast';
import { insertResponseService } from '../../services/responsesService';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useQuestion from '../../hooks/QuestionsHook/useQuestion';
import { useProfile } from '../../hooks/profilehook/useProfile';

const NewResponseForm = () => {
    // const navigate = useNavigate();
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
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {profile.profile_role !== 'student' ||
            user.register_id === question.user_id ? (
                <fieldset>
                    <label htmlFor="response_text"></label>
                    <input
                        type="text"
                        name="response_text"
                        id="response_text"
                        value={response_text}
                        onChange={(e) => setResponse_text(e.target.value)}
                        required
                        placeholder="Responde a la pregunta"
                    />

                    {loading ? (
                        <Loading />
                    ) : (
                        <button disabled={loading}>Responder</button>
                    )}
                </fieldset>
            ) : (
                <p className="h-4 text-sm text-rose-500">
                    No tienes permiso para responder preguntas.
                </p>
            )}
        </form>
    );
};

export default NewResponseForm;
