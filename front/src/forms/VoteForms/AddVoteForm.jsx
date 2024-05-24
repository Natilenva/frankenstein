import PropType from 'prop-types';
import toast from 'react-hot-toast';
import Stars from '../../components/Star/Star';
import { useState } from 'react';

const AddVoteForm = ({
    insertResponseVotesService,
    addResponseVote,
    votes,
    response_id,
    user,
    token,
}) => {
    const [votesAvg, setVotesAvg] = useState(votes);

    const handleAddVote = async (vote) => {
        try {
            if (user) {
                const newVotesAvg = await insertResponseVotesService(
                    vote,
                    response_id,
                    token
                );
                addResponseVote(newVotesAvg);
                setVotesAvg(newVotesAvg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div>
            <Stars votesAvg={votesAvg} handleAddVote={handleAddVote} />
            
        </div>
    );
};

AddVoteForm.propTypes = {
    insertResponseVotesService: PropType.func.isRequired,
    addResponseVote: PropType.func.isRequired,
    votes: PropType.number.isRequired,
    response_id: PropType.number.isRequired,
    user: PropType.object.isRequired,
    token: PropType.string.isRequired,
};

export default AddVoteForm;
