import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { selectAllResponsesByQuestionIdService } from '../../services/responsesService';

const useResponses = (question_id, idResponse) => {
    const [responses, setResponses] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                setLoading(true);
                const responses = await selectAllResponsesByQuestionIdService(
                    question_id
                );

                setResponses(responses);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchResponses();
    }, [question_id, idResponse]);

    const addResponseVote = (votesAvg) => {
        setResponses({
            ...responses,
            votes: votesAvg,
        });
    };

    return { responses, loading, addResponseVote };
};

export default useResponses;
