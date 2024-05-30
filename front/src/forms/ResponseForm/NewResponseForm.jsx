import Loading from '../../components/loading';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { insertResponseService } from '../../services/responsesService';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useQuestion from '../../hooks/QuestionsHook/useQuestion';
import { useProfile } from '../../hooks/profilehook/useProfile';

const NewResponseForm = ({ setIdResponse }) => {
    const [response_text, setResponse_text] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { token, user } = useContext(AuthContext);
    const { question } = useQuestion(id, token);
    const { profile } = useProfile(user.register_id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await insertResponseService(
                response_text,
                token,
                question.question_id
            );
            console.log('prueba', data);

            setIdResponse(data.resposeID);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        user &&
        question && (
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl mx-auto p-4"
            >
                <div className="flex flex-col space-y-4 md:space-y-6 lg:space-y-8 place-content-around">
                    {profile.profile_role !== 'student' ||
                    user.register_id === question.user_id ? (
                        <fieldset className="p-4 bg-white rounded-lg shadow-md">
                            <label htmlFor="response_text" className="sr-only">
                                Respuesta
                            </label>
                            <textarea
                                className="w-full px-4 py-3 bg-white rounded-md border border-solid border-gray-300 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-[#829821]"
                                name="response_text"
                                id="response_text"
                                value={response_text}
                                onChange={(e) =>
                                    setResponse_text(e.target.value)
                                }
                                required
                                placeholder="Responde a la pregunta"
                                rows="4"
                            />
                            {loading ? (
                                <Loading />
                            ) : (
                                <button
                                    className="w-full mt-4 px-4 py-2 bg-[#829821] hover:bg-[#829821] rounded-md text-white font-semibold disabled:opacity-50"
                                    disabled={loading}
                                >
                                    Responder
                                </button>
                            )}
                        </fieldset>
                    ) : (
                        <p className="text-sm text-rose-500">
                            No tienes permiso para responder preguntas.
                        </p>
                    )}
                </div>
            </form>
        )
    );
};
NewResponseForm.propTypes = {
    setIdResponse: PropTypes.any,
};

export default NewResponseForm;
