// Importamos las prop-types.
import PropType from 'prop-types';

// Importamos las dependencias.
import moment from 'moment';
import AddVoteForm from '../../forms/VoteForms/AddVoteForm';
import { insertResponseVoteService } from '../../services/responsesService';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useResponses from '../../hooks/ResponsesHook/useResponses';

// Inicializamos el componente.
const ResponsesListItem = ({ response }) => {
    const { user, token } = useContext(AuthContext);
    const { addResponseVote } = useResponses(response.response_id);
    console.log(user);

    return (
        <section className="w-full max-w-3xl mx-auto p-4">
            <div className="flex flex-col md:flex-row mt-4 w-full bg-black rounded-lg shadow-lg p-4 overflow-hidden">
                <div className="flex-1 p-4">
                    <div className="mb-4">
                        <p className="text-sm md:text-base text-white break-words">
                            {response.response_text}
                        </p>
                    </div>
                    <li className="text-sm md:text-base text-gray-400 mb-4 break-words">
                        <strong>Media de votos:</strong>{' '}
                        {!response.votes ? 'Sin votos' : response.votes}
                    </li>
                    <div className='mb-4'>
                        <AddVoteForm 
                            insertResponseVotesService={insertResponseVoteService}
                            addResponseVote={addResponseVote}
                            votes={response.votes}
                            response_id={response.response_id}
                            user={user}
                            token={token}
                        />
                    </div>
                    <div className="text-sm md:text-base text-gray-400">
                        <time>
                            {moment(response.created_at).format('DD/MM/YYYY [a las] HH:mm')}
                        </time>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Validamos las props.
ResponsesListItem.propTypes = {
    response: PropType.object.isRequired,
};

export default ResponsesListItem;
