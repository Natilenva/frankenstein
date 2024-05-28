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
    const {user, token}= useContext(AuthContext)
    const {addResponseVote}= useResponses(response.response_id)
    console.log(user);



    return (
        <section>
            
            <div className="flex mt-3.5 w-full max-w-[305px]">
                <div className="flex flex-col flex-1 px-5">
              
                        <div className="bg-black">
                            <div>
                                <p className="text-xs leading-4 text-white text-opacity-50">
                                    {response.response_text}
                                </p>
                            </div>
                            <li className="text-xs leading-4 text-white text-opacity-50">
                                <strong>Media de votos:</strong>{' '}
                                {!response.votes ? 'Sin votos' : response.votes}
                            </li>
                            <div className='text-white'>
                            <AddVoteForm 
                                insertResponseVotesService={insertResponseVoteService}
                                addResponseVote={addResponseVote}
                                votes={response.votes}
                                response_id={response.response_id}
                                user={user}
                                token={token}
                            />
                            </div>

                          
                 

                            <div className="text-xs leading-4 text-white text-opacity-50">
                                <time>
                                    {moment(response.created_at).format(
                                        'DD/MM/YYYY [a las] HH:mm'
                                    )}
                                </time>
                            </div>
                        </div>
                
                </div>
            </div>
        </section>
    );
};

// Validamos las props.
ResponsesListItem.propTypes = {
    response: PropType.object,
};

export default ResponsesListItem;
