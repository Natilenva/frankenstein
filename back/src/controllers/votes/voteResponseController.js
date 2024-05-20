import insertVotesModel from '../../models/votes/insertVotesModel.js';
import selectResponseByIdModel from '../../models/responses/selectResponseByIdModel.js';

import {
    cannotVoteOwnEntryError,
    missingFieldsError,
    notValidVoteError,
} from '../../services/errorService.js';

const voteResponseController = async (req, res, next) => {
    try {
        const { response_id } = req.params;

        const { vote_value } = req.body;

        const responses = await selectResponseByIdModel(response_id);

        if (responses.register_id === req.userid) {
            cannotVoteOwnEntryError();
        }

        if (!vote_value) {
            missingFieldsError();
        }

        const validVotes = [1, 2, 3, 4, 5];

        if (!validVotes.includes(vote_value)) {
            notValidVoteError();
        }

        const votesAvg = await insertVotesModel(
            vote_value,
            responses.response_id,
            req.userId
        );

        res.status(201).send({
            status: 'ok',
            data: {
                entry: {
                    votes: votesAvg,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default voteResponseController;
